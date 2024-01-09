---
id: snapshot-when
title: snapshot_when
---

`snapshot_when` produces an in-memory copy of a source table that adds a new snapshot when another table, the trigger table, changes.

:::note

The trigger table is often a [time table](../create/timeTable.md), a special type of table that adds new rows at a regular, user-defined interval. The sole column of a [time table](../create/timeTable.md) is `Timestamp`.

:::

:::caution

Columns from the trigger table appear in the result table. If the trigger and source tables have columns with the same name, an error will be raised. To avoid this problem, omit duplicates via stamp columns or rename conflicting columns.

:::

## Syntax

```
source.snapshot_when(
    trigger_table: Union[Table, PartitionedTableProxy],
    stamp_cols: list[str],
    initial: bool = False,
    incremental: bool = False,
    history: bool = False,
) -> PartitionedTableProxy
```

## Parameters

<ParamTable>
<Param name="trigger_table" type="Union[Table, PartitionedTableProxy">

The table that triggers the snapshot.

</Param>
<Param name="stamp_cols" type="list[str]">

One or more column names to act as stamp keys. If only one column, a string or list can be used. If more than one column, a list must be used.

</Param>
<Param name="initial" type="bool" optional>

Defines whether an initial snapshot is taken upon construction. The default value is `False`

</Param>
<Param name="incremental" type="bool" optional>

Defines whether the resulting table should be incremental. The default value is `False`. When `False`, all rows have the latest stamp key. When `True`, only rows that have been added or updated will have the latest stamp key.

</Param>
<Param name="history" type="bool" optional>

Defines whether the resulting table should keep history. The default value is `False`. When `True`, a full snapshot of the table and the stamp key is appended. When `False`, only updating existing rows are appended. If this is `True`, `incremental` and `initial` must be `False`.

</Param>
</ParamTable>

## Returns

A new table that captures a snapshot of the source table whenever the trigger table updates.

## Examples

In the following example, the `source` table updates once every second. The `trigger` table updates once every five seconds. Thus, the `result` table updates once every five seconds. The `Timestamp` column in the `trigger` is [renamed](/core/docs/reference/table-operations/select/rename-columns/) to avoid a name conflict error. Notice how the `result` table only contains the values from the most recent row in the `trigger` table.

```python ticking-table order=null
from deephaven import time_table

source = time_table("PT1S").update_view(["X = i"])
trigger = time_table("PT5S").rename_columns(["TriggerTimestamp = Timestamp"]).update_view(["Y = Math.sin(0.1 * i)"])
result = source.snapshot_when(trigger_table=trigger)
```

![img](../../../assets/reference/table-operations/snapshot-when-1.gif)

In the following example, the code is nearly identical to the one above it. However, in this case, the `Y` column is given as the stamp key. Thus, the `Timestamp` column in the `trigger` table is omitted from the `result` table, which avoids a name conflict error. This is typically a more elegant way to avoid name conflicts than renaming columns.

```python ticking-table order=null
from deephaven import time_table

source = time_table("PT1S").update_view(["X = i"])
trigger = time_table("PT5S").update_view(["Y = i"])
result = source.snapshot_when(trigger_table=trigger, stamp_cols=["Y"])
```

![img](../../../assets/reference/table-operations/snapshot-when-2.gif)

In the following example, `history` is set to `True`. The `result` table is appended with a full snapshot every time `trigger` ticks, rather than just new rows.

```python ticking-table order=null
from deephaven import time_table

source = time_table("PT1S").update_view(["X = i"])
trigger = time_table("PT5S").update_view(["Y = i"])
result = source.snapshot_when(trigger_table=trigger, stamp_cols=["Y"])
```

![img](../../../assets/reference/table-operations/snapshot-when-3.gif)

In the following example, `incremental` is set to `True`. Thus, the `result` table keeps previous values from the `Y` column in the `trigger` table.

```python ticking-table order=null
from deephaven import time_table

source = time_table("PT1S").update_view(["X = i"])
trigger = time_table("PT5S").update_view(["Y = i"])
result = source.snapshot_when(trigger_table=trigger, stamp_cols=["Y"], incremental=True)
```

![img](../../../assets/reference/table-operations/snapshot-when-4.gif)

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [Capture the history of a ticking table](../../../how-to-guides/capture-table-history.md)
- [How to reduce the update frequency of ticking tables](../../../how-to-guides/reduce-update-frequency.md)
- [`time_table`](../create/timeTable.md)
- [`update`](../select/update.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/QueryTable.html#snapshotWhen(io.deephaven.engine.table.Table,io.deephaven.api.snapshot.SnapshotWhenOptions)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html?highlight=snapshot#deephaven.table.Table.snapshot_when)
