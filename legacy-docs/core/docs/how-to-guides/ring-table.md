---
id: ring-table
title: How to create a ring table
sidebar_label: Create a ring table
---

This guide will show you how to create a [ring table](../conceptual/table-types.md#ring) from a [blink table](../conceptual/table-types.md#blink) or an [append-only table](../conceptual/table-types.md#append-only).

Ring tables are much less memory-intensive than append-only tables. While append-only tables can grow infinitely in size, ring tables only hold on to as many rows as the user tells them to - once a row passes out of that range, it is eligible to be deleted from memory.

Ring tables are mostly used with blink tables, which do not retain their own data for more than an update cycle. For example, a blink table only stores rows from the current update cycle, but could be converted to a ring table that preserves the last 5000 rows instead.

## Examples

In this example, we'll create a ring table with a 3-row capacity from a simple append-only time table.

```python ticking-table order=null
from deephaven import time_table, ring_table

source = time_table("PT00:00:01")
result = ring_table(parent=source, capacity=3)
```

![img](../assets/how-to/ring-table-1.gif)

A more common use case is to create a ring table from a blink table to preserve some data history. The following example creates a ring table from a blink time table. In `source`, old data is removed from memory as soon as new data enters the table. In `result`, 5 rows are kept, which preserves 4 more rows than `source`.

```python ticking-table order=null
from deephaven import time_table, ring_table

source = time_table(period="PT00:00:01", start_time=None, blink_table=True)
result = ring_table(parent=source, capacity=5)
```

![img](../assets/how-to/ring-table.gif)

The following example creates a ring table from a time table that starts with 5 rows. The `initialize` argument is not set, and so is `True` by default. This means the ring table initially starts with all 5 rows populated.

```python ticking-table order=null
from deephaven import empty_table, time_table, ring_table, merge

static_source = empty_table(5).update(["X = i"])
dynamic_source = time_table("PT00:00:01").update(["X = i + 5"]).drop_columns(["Timestamp"])
source = merge([static_source, dynamic_source])
result = ring_table(parent=source, capacity=5)
```

![img](../assets/how-to/ring-table-2.gif)

The following example is identical to the one above, except `initialize` is set to `False`. Thus, when the query is first run, `result` is empty.

```python ticking-table order=null
from deephaven import empty_table, time_table, ring_table, merge

static_source = empty_table(5).update(["X = i"])
dynamic_source = time_table("PT00:00:01").update(["X = i + 5"]).drop_columns(["Timestamp"])
source = merge([static_source, dynamic_source])
result = ring_table(parent=source, capacity=5, initialize=False)
```

![img](../assets/how-to/ring-table-3.gif)

## Related documentation

- [How to create an empty table](./empty-table.md)
- [How to create a time table](./time-table.md)
- [Table types](../conceptual/table-types.md)
- [`drop_columns`](../reference/table-operations/select/drop-columns.md)
- [`merge`](../reference/table-operations/merge/merge.md)
- [`ring_table`](../reference/table-operations/create/ringTable.md)
- [`tail`](../reference/table-operations/filter/tail.md)
- [`update`](../reference/table-operations/select/update.md)
