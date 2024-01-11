---
id: capture-table-history
title: How to capture the history of ticking tables
sidebar_label: Capture the history of ticking tables
---

This guide will show you how to capture the history of ticking tables.

Append-only tables are simple. New rows are added at the bottom of the table, and rows are never deleted or modified. This makes examining the history of append-only tables very easy. If a table is not append-only, rows are added, deleted, and modified, which makes examining the history more complex. By using [`snapshot_when`](../reference/table-operations/snapshot/snapshot-when.md), you can capture the history of a table, even if it is not append-only.

## Syntax

[`snapshot_when`](../reference/table-operations/snapshot/snapshot-when.md) can produce an in-memory table containing the history of the source table if `history` is set to `True` in the input. Values are added to the history every time the trigger table ticks.

```python syntax
result = source.snapshot_when(trigger_table=trigger, history=True)
result = source.snapshot_when(trigger_table=trigger, stamp_cols=stamp_keys, history=True)
```

:::note

The trigger table is often a [time table](../reference/table-operations/create/timeTable.md), a special type of table that adds new rows at a regular, user-defined interval. The sole column of a time table is `Timestamp`.

:::

:::caution

Columns from the trigger table appear in the result table. If the trigger and source tables have columns with the same name, an error will be raised. To avoid this problem, rename conflicting columns.

:::

:::caution

When using [`snapshot_when`](../reference/table-operations/snapshot/snapshot.md) to capture full table history, it stores a copy of the source table for every trigger event. Large source tables or rapidly changing trigger tables can result in intensive memory usage.

:::

## Include a history

In this example, there are two input tables. The `source` table updates every 0.01 seconds with new data. The `trigger` table updates every second, triggering a new snapshot of the `source` table to be added to the `result` table. This design pattern is useful for examining the history of a table.

```python ticking-table order=null
from deephaven import time_table
import random

source = time_table("PT0.2S").update(formulas=["X = i%2 == 0 ? `A` : `B`", "Y = (int)random.randint(0, 100)", "Z = sqrt(Y)"]).last_by(by=["X"])

trigger = time_table("PT2S")

result = source.snapshot_when(trigger_table=trigger, stamp_cols=[], history=True)
```

![img](../assets/how-to/snapshot-when-history.gif)

## Related documentation

- [Create a time table](../how-to-guides/time-table.md)
- [Reduce the update frequency of ticking tables](./reduce-update-frequency.md)
- [`rename_column`](../reference/table-operations/select/rename-columns.md)
- [`snapshot`](../reference/table-operations/snapshot/snapshot.md)
- [`snapshot_when`](../reference/table-operations/snapshot/snapshot-when.md)
- [`time_table`](../reference/table-operations/create/timeTable.md)
- [`update`](../reference/table-operations/select/update.md)