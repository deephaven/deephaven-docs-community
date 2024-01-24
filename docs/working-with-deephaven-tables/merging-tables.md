---
id: merging-tables
title: How to merge tables in Deephaven
sidebar_label: Merging tables in Deephaven
---

This guide discusses how to merge tables in Deephaven.

:::note

Merge operations combine two tables by stacking the tables one on top of the other (vertically). To combine tables (or specific columns from tables) horizontally, see [How to join tables in Deephaven](*LINK*).

:::

The basic `merge` syntax follows:

```syntax
t = merge(tables...)
```

All of the source tables must have the same schema (column names and column types), and `NULL` inputs will be ignored.

The resulting table is all of the source tables stacked vertically. If the source tables dynamically change, such as for ticking data, rows will be inserted within the stack. For example, if a row is added to the end of the third source table, in the resulting table, that new row appears after all other rows from the third source table and before all rows from the fourth source table.

## Examples

Next we will demonstrate Deephaven's `merge` methods with some examples. First, we will create some source tables to use in the following examples:

```python order=source1,source2,source3
from deephaven import merge, merge_sorted, new_table
from deephaven.column import  int_col, string_col

source1 = new_table([string_col("Letter", ["A", "B", "D"]), int_col("Number", [1, 2, 3])])
source2 = new_table([string_col("Letter", ["C", "D", "E"]), int_col("Number", [14, 15, 16])])
source3 = new_table([string_col("Letter", ["E", "F", "A"]), int_col("Number", [22, 25, 27])])
```

The sections below discuss basic merge operations, and how to merge tables effectively, especially when you have many tables to combine.

### `merge`

The above source tables can be combined, or vertically stacked, by providing each table as an argument to the merge method.

:::note

The columns for each table need to have the same names and types, or a column mismatch error will occur.

:::

The following query merges two tables:

```python order=result
result = merge([source1, source2])
```

The following query merges three tables:

```python order=result
result = merge([source1, source2, source3])
```

### `merge_sorted`

The `merge_sorted` method is similar to the `merge` method, but it sorts the result table after merging the data. The `merge_sorted` method is more efficient than using `merge` followed by `sort`.

```python order=result
result = merge([source1, source2, source3], "Number")
```

## Perform efficient merges

When performing more than one merge operation, it is best to perform all the merges at the same time, rather than nesting several merges.

In this example, a table named result is initialized. As new tables are generated, the results are merged at every iteration. Calling the merge method on each iteration makes this example inefficient.

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

Instead, we can make the operation more efficient by calling the `merge` method just once. Here `merge` is applied to an array containing all of the source tables:

```python order=result
from deephaven import merge, new_table
from deephaven.column import int_col, string_col

table_array = []

for i in range(5):
   new_result = new_table([string_col("Code", [f"A{i}", f"B{i}"]), int_col("Val", [i, 10*i])])
   table_array.append(new_result)

result = merge(table_array)
```
