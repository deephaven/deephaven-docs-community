---
id: replay-data
title: How to replay table data in Deephaven
sidebar_label: Replay historical table data
---

This guide will show you how to replay historical data as live data in Deephaven.

Deephaven excels at handling live data. Integrating historical data into real-time analysis is common in a multitude of fields including machine learning, validation, modeling, simulation, and forecasting. In this guide, we will take historical data and play it back as real-time data based on timestamps in a table. This example could be easily extended towards a variety of real-world applications.

## Get a historical data table

In order to replay historical data, we need a table with timestamps in [`DateTime`](../reference/query-language/types/date-time.md) format. Let's grab one in Deephaven's [examples](https://github.com/deephaven/examples/) repository. We'll use data from a 100 km bike ride in a file called `metriccentury.csv`.

```python test-set=1 order=null
from deephaven import read_csv

metric_century = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/MetricCentury/csv/metriccentury.csv")
```

## Replay the data

The data is in memory. We can replay it with the following steps:

- Import [`TableReplayer`](../reference/table-operations/create/Replayer.md).
- Set a start and end time for data replay.
  - These times correspond to those in the table itself.
- Create the replayer using the start and end time.
- Call [`add_table`](../reference/table-operations/create/Replayer.md#methods) to prepare the replayed table.
  - This takes two inputs: the table and the `DateTime` column name.
- Call [`start`](../reference/table-operations/create/Replayer.md#methods) to start replaying data.

```python test-set=1 order=null ticking-table
from deephaven.replay import TableReplayer
from deephaven.time import to_j_instant

start_time = to_j_instant("2019-08-25T15:34:55Z")
end_time = to_j_instant("2019-08-25T17:10:22Z")

replayer = TableReplayer(start_time, end_time)
replayed_table = replayer.add_table(metric_century, "Time")
replayer.start()
```

## Add date-times to a table

Some historical data tables don't have a date-time column.

```python test-set=2 order=null
from deephaven import read_csv

iris = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/Iris/csv/iris.csv")
```

In such a case, they can be added.

```python test-set=2 order=null
from deephaven.time import to_j_instant

start_time = to_j_instant("2022-01-01T00:00:00 ET")

iris_with_datetimes = iris.update(["Timestamp = start_time + i * SECOND"])
```

Then, the data can be replayed just as before.

```python test-set=2 order=null ticking-table
from deephaven.replay import TableReplayer
from deephaven.time import to_j_instant

start_time = to_j_instant("2022-01-01T00:00:00 ET")
end_time = to_j_instant("2022-01-01T00:02:30 ET")

replayer = TableReplayer(start_time, end_time)
replayed_iris = replayer.add_table(iris_with_datetimes, "Timestamp")
replayer.start()
```

## Related documentation

- [How to work with date-times](./work-with-date-time.md)
- [TableReplayer](../reference/table-operations/create/Replayer.md)
