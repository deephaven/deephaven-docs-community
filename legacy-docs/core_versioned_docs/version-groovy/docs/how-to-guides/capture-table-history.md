---
id: capture-table-history
title: How to capture the history of ticking tables
sidebar_label: Capture the history of ticking tables
---

This guide will show you how to capture the history of ticking tables.

Append-only tables are very simple. New rows are added at the bottom of the table, and rows are never deleted or modified. This makes examining the history of append-only tables very easy. If a table is not append-only, rows are added, deleted, and modified, which makes examining the history more complex. By using [`snapshotWhen`](../reference/table-operations/snapshot/snapshot-when.md), you can capture the history of a table, even if it is not append-only.

## Syntax

[`snapshotWhen`](../reference/table-operations/snapshot/snapshot-when.md) produces an in-memory table that can contain the history of the source table. Values are added to the history every time the trigger table ticks.

:::note

The trigger table is often a [time table](../reference/table-operations/create/timeTable.md), a special type of table that adds new rows at a regular, user-defined interval. The sole column of a time table is `Timestamp`.

:::

:::caution

Columns from the trigger table appear in the result table. If the trigger and source tables have columns with the same name, an error will be raised. To avoid this problem, rename conflicting columns, or omit them using stamp keys.

:::

:::caution

When [`snapshotWhen`](../reference/table-operations/snapshot/snapshot-when.md) saves history, it stores a copy of the source table for every trigger event. This means that large source tables or rapidly changing trigger tables can result in large memory usage.

:::

## Include a history

In this example, there are two input tables. The `source` table updates every 0.01 seconds with new data. The `trigger` table updates every second, triggering a new snapshot of the `source` table to be added to the `result` table. This design pattern is useful for examining the history of a table.

```groovy ticking-table order=null
import io.deephaven.api.snapshot.SnapshotWhenOptions

myOpts = SnapshotWhenOptions.of(false, false, true)

source = timeTable("PT00:00:00.1").update("X = i%2 == 0 ? `A` : `B`", "Y = new Random().nextInt(100)", "Z = sqrt(Y)").lastBy("X")
trigger = timeTable("PT00:00:02").renameColumns("TriggerTimestamp = Timestamp")
result = source.snapshotWhen(trigger, myOpts)
```

<LoopedVideo src={require('../assets/how-to/snapshot3.mp4')} />

## Related documentation

- [Create a time table](../how-to-guides/time-table.md)
- [Reduce the update frequency of ticking tables](./reduce-update-frequency.md)
- [`renameColumn`](../reference/table-operations/select/rename-columns.md)
- [`snapshot`](../reference/table-operations/snapshot/snapshot.md)
- [`snapshotWhen`](../reference/table-operations/snapshot/snapshot-when.md)
- [`timeTable`](../reference/table-operations/create/timeTable.md)
- [`update`](../reference/table-operations/select/update.md)
