---
id: merge-tables
title: How to vertically stack tables
sidebar_label: Vertically stack tables
---

This guide discusses how to stack ([`merge`](../reference/table-operations/merge/merge.md)) tables one on top of the other into one aggregate table.

The basic syntax follows.

`t = merge(tables...)`

- all of the source tables must have the same schema - column names and column types.
- `NULL` inputs are ignored.

:::note

Python users need to import the appropriate method: `from deephaven import merge`

:::

The resulting table is all of the source tables stacked vertically. If the source tables dynamically change, such as for ticking data, rows will be inserted _within_ the stack. For example, if a row is added to the end of the third source table, in the resulting table, that new row appears after all other rows from the third source table and before all rows from the fourth source table.

## Source tables

Let's start with the following source tables:

```python test-set=1 order=source1,source2,source3
from deephaven import merge, merge_sorted, new_table
from deephaven.column import  int_col, string_col

source1 = new_table([string_col("Letter", ["A", "B", "D"]), int_col("Number", [1, 2, 3])])
source2 = new_table([string_col("Letter", ["C", "D", "E"]), int_col("Number", [14, 15, 16])])
source3 = new_table([string_col("Letter", ["E", "F", "A"]), int_col("Number", [22, 25, 27])])
```

The sections below discuss basic merge operations, and how to merge tables effectively, especially when you have many tables to combine.

## Merge tables

The above source tables can be combined, or vertically stacked, by providing each table as an argument to the [`merge`](../reference/table-operations/merge/merge.md) method.

:::note

The columns for each table need to have the same names and types, or a column mismatch error will occur.

:::

The following query merges two tables:

```python test-set=1 order=result
result = merge([source1, source2])
```

The following query merges three tables:

```python test-set=1 order=result
result = merge([source1, source2, source3])
```

## Perform efficient merges

When performing more than one [`merge`](../reference/table-operations/merge/merge.md) operation, it is best to perform all the merges at the same time, rather than nesting several merges.

In this example, a table named `result` is initialized. As new tables are generated, the results are merged at every iteration. Calling the [`merge`](../reference/table-operations/merge/merge.md) method on each iteration makes this example inefficient.

```python order=result
from deephaven import merge, new_table
from deephaven.column import int_col, string_col

result = None

for i in range(5):
   new_result = new_table([string_col("Code", [f"A{i}", f"B{i}"]), int_col("Val", [i, 10*i])])
   if result is None:
       result = new_result
   else:
       result = merge([result, new_result])
```

Instead, we can make the operation more efficient by calling the [`merge`](../reference/table-operations/merge/merge.md) method just once. Here [`merge`](../reference/table-operations/merge/merge.md) is applied to an array containing all of the source tables.

```python order=result
from deephaven import merge, new_table
from deephaven.column import int_col, string_col

table_array = []

for i in range(5):
   new_result = new_table([string_col("Code", [f"A{i}", f"B{i}"]), int_col("Val", [i, 10*i])])
   table_array.append(new_result)

result = merge(table_array)
```

## Related documentation

- [Create a new table](./new-table.md)
- [`merge`](../reference/table-operations/merge/merge.md)
- [`merge_sorted`](../reference/table-operations/merge/merge-sorted.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#merge(java.util.Collection)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.TableTools.html?highlight=merge#deephaven.TableTools.merge)
