---
id: performance-tables
title: How to use Deephaven's performance tables for system monitoring
sidebar_label: Use performance tables
---

This guide shows how to use Deephaven's internal performance tables.

Deephaven provides several options to enable users to monitor query performance and resolve issues as they arise. Many of these methods are available directly in the user interface. For example, users can see how long a query has been running by opening the History Panel and looking at the command details or hovering over the console command: the tooltip will show the formatted duration of the query. The most common performance issues are slow initialization, a query failing to update quickly, or a sluggish user interface.

If a query seems to be taking too long or throws an error, looking at the process and worker information in Deephaven's internal tables is a great place to start. Performance tables are a powerful tool for analyzing performance and debugging issues in Deephaven. This information is intended to help you troubleshoot queries independently. If you need more help, we encourage you to visit our Community [Discussions](https://github.com/deephaven/deephaven-core/discussions) page or contact us on [Slack](https://deephaven.io/slack). You can also send us your logs and/or Exception messages.

## Creating the tables

The [`deephaven.perfmon`](https://deephaven.io/core/pydoc/code/deephaven.perfmon.html?module-deephaven.perfmon) package contains various methods to create and open performance tables in the Deephaven IDE.

```python order=upl,qopl,qpl,pml,pil,ssl
import deephaven.perfmon as pm

upl = pm.update_performance_log()
qopl = pm.query_operation_performance_log()
qpl = pm.query_performance_log()
pml = pm.process_metrics_log()
pil = pm.process_info_log()
ssl = pm.server_state_log()
```

## Table descriptions

### Update Performance Log

This table describes what the query spent time on during its data refresh cycle. This data is written in predefined intervals - the default is one minute, but it can also be configured per query. At the end of each performance monitoring interval, a query logs every operation whose results were updated, and how much time it spent performing that update throughout the interval.

The `EntryDescription` column tells what query operation is running, and the `EntryIntervalUsage` tells the query resource usage. Sorting by `EntryIntervalUsage` is a good first start to finding queries that may be taking a lot of resources. This table includes internal query operations as well, defined by the `EntryCallerLine`.

### Query Operation Performance Log

This table describes performance details on initialization times and memory usage of operations.

The `DurationNanos` column tells how long initialization took for a query, and `FreeMemoryChange` and `TotalMemoryChange` tell memory usage. The difference in these two columns is that `FreeMemoryChange` tracks memory usage within the JVM, while `TotalMemoryChange` tracks total memory allocated to the entire JVM.

### Query Performance Log

This table contains details on query-level performance for each worker. A given worker may be running multiple queries; each will have its own set of query performance log entries.

The `ProcessUniqueId` column provides a unique identifier for the process, and the `EvaluationNumber` column tells how many times each process has been evaluated. The `StartTime` and `EndTime` columns define the time range of the evaluation, and the other columns memory and CPU usage metrics for the evaluation.

### Process Metrics Log

This table gives insight to process statistics such as heap usage and page fault counts.

### Process Info Log

This table contains JVM parameters. This is useful to check your application's configuration.

### Server State Log

This table shows a top-level view of the free (amount of memory in the JVM allocated for new objects) and total (amount of memory allocated to the JVM) memory available to the process. This updates on a roughly 15 second interval.

## Get help

If you can’t find an obvious cause for an error or slow performance in your query, you may have uncovered a bug. In this case, you should file a bug report at https://github.com/deephaven/deephaven-core/issues. Be sure to include the following with your bug report:

- The version of the Deephaven system.
- The complete stack trace, not just the list of Caused By expressions.
- A code snippet or a description of the query.
- Any logs from your user console or, if running Docker, from your terminal.
- Support logs exported from the browser. In the Settings menu, click the Export Logs button to download a zip with the browser logs and the current state of the application.

You can also get help by asking questions in our GitHub Discussions forum or Slack Community.

## Related Documentation

- [How to triage errors in queries](../triage-errors.md)
- [Performance tables cheat sheet](../../reference/cheat-sheets/performance-tables-cheat-sheet.md)
- [`deephaven.perfmon`](https://deephaven.io/core/pydoc/code/deephaven.perfmon.html?module-deephaven.perfmon)
- [Learning session on Performance Analysis](https://youtu.be/bz0mQasSNcg)
