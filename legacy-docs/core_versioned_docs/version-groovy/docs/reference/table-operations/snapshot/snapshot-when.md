---
id: snapshot-when
title: snapshotWhen
---

`snapshotWhen` produces an in-memory copy of a source table that adds a new snapshot when another table, the trigger table, changes.

:::note

The trigger table is often a [time table](../create/timeTable.md), a special type of table that adds new rows at a regular, user-defined interval. The sole column of a [time table](../create/timeTable.md) is `Timestamp`.

:::

:::caution

Columns from the trigger table appear in the result table. If the trigger and source tables have columns with the same name, an error will be raised. To avoid this problem, omit duplicates using stamp columns or rename conflicting columns.

:::

:::caution

When `snapshotWhen` stores table history, itstores a copy of the source table for every trigger event. This means that large source tables or rapidly changing trigger tables can result in large memory usage.

:::

## Syntax

```
result = source.snapshotWhen(trigger)
result = source.snapshotWhen(trigger, features...)
result = source.snapshotWhen(trigger, features, stampColumns...)
result = source.snapshotWhen(trigger, options)
```

## Parameters

<ParamTable>
<Param name="trigger" type="Table">

The table that triggers the snapshot.

</Param>
<Param name="features" type="SnapshotWhenOptions.Flag...">

The snapshot features.

</Param>
<Param name="features" type="Collection<SnapshotWhenOptions.Flag>">

The snapshot features.

</Param>
<Param name="stampColumns" type="String...">

The stamp columns.

</Param>
<Param name="options" type="SnapshotWhenOptions">

The options that dictate whether to take an initial snapshot, do incremental snapshots, keep history, and set stamp columns.

</Param>
</ParamTable>

## Returns

An in-memory history of a source table that adds a new snapshot when the trigger table updates.

## Examples

Examples below that set snapshot options construct these options using `SnapshotWhenOptions.of(...)`. The syntax is given below.

```
import io.deephaven.api.snapshot.SnapshotWhenOptions

myOpts = SnapshotWhenOptions.of(INITIAL, INCREMENTAL, HISTORY, stampColumns)
```

Where `INITIAL`, `INCREMENTAL`, and `HISTORY` are booleans and `stampColumns` is one or more string values corresponding to columns in the `trigger` table.

:::note

If `HISTORY` is `true`, `INITIAL` and `INCREMENTAL` _must_ be `false`.

:::

In the following example, the `source` table updates once every second. The `trigger` table updates once every five seconds. Thus, the `result` table results once every five seconds. In order to avoid a name conflict, the `Timestamp` column in the `trigger` table is renamed. Notice how the the `result` table only contains the values from the most recent row in the `trigger` table.

```groovy ticking-table order=null
source = timeTable("PT00:00:01").updateView("X = i")
trigger = timeTable("PT00:00:05").renameColumns("TriggerTimestamp = Timestamp").updateView("Y = Math.sin(0.1 * i)")
result = source.snapshotWhen(trigger)
```

![img](../../../../../../core/docs/assets/reference/table-operations/snapshot-when-1.gif)

In the following example, options are given to set the `Y` column in the `trigger` table as the stamp column. Thus, the `Timestamp` column is omitted from the `result` table. This is typically a more elegant way to avoid name conflicts than renaming columns.

```groovy ticking-table order=null
import io.deephaven.api.snapshot.SnapshotWhenOptions

myOpts = SnapshotWhenOptions.of(false, false, false, "Y")

source = timeTable("PT00:00:01").updateView("X = i")
trigger = timeTable("PT00:00:05").updateView("Y = Math.sin(0.1 * i)")
result = source.snapshotWhen(trigger, myOpts)
```

![img](../../../../../../core/docs/assets/reference/table-operations/snapshot-when-2.gif)

In the following example, options are given such that the history is kept on every snapshot rather than just new rows since the last update.

```groovy ticking-table order=null
import io.deephaven.api.snapshot.SnapshotWhenOptions

myOpts = SnapshotWhenOptions.of(false, false, true, "Y")

source = timeTable("PT00:00:01").updateView("X = i")
trigger = timeTable("PT00:00:05").updateView("Y = Math.sin(0.1 * i)")
result = source.snapshotWhen(trigger, myOpts)
```

![img](../../../../../../core/docs/assets/reference/table-operations/snapshot-when-3.gif)

In the following example, options are given such that the snapshots are incremental. Thus, the `result` table keeps previous values from the `Y` column in the `trigger` table.

```groovy ticking-table order=null
import io.deephaven.api.snapshot.SnapshotWhenOptions

myOpts = SnapshotWhenOptions.of(false, true, false, "Y")

source = timeTable("PT00:00:01").updateView("X = i")
trigger = timeTable("PT00:00:05").updateView("Y = Math.sin(0.1 * i)")
result = source.snapshotWhen(trigger, myOpts)
```

![img](../../../../../../core/docs/assets/reference/table-operations/snapshot-when-4.gif)

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [Capture the history of a ticking table](../../../how-to-guides/capture-table-history.md)
- [How to reduce the update frequency of ticking tables](../../../how-to-guides/reduce-update-frequency.md)
- [`snapshot`](./snapshot.md)
- [`timeTable`](../create/timeTable.md)
- [`update`](../select/update.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/QueryTable.html#snapshotWhen(io.deephaven.engine.table.Table,io.deephaven.api.snapshot.SnapshotWhenOptions)>)
