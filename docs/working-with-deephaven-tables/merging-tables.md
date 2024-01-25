---
id: merging-tables
title: Merging tables
---

This guide discusses how to merge tables in Deephaven.

:::note

Merge operations combine two tables by stacking the tables one on top of the other (vertically). To combine tables (or specific columns from tables) horizontally, see [How to join tables in Deephaven](*LINK*).

:::

## Syntax

There are two methods for merging tables in Deephaven: `merge` and `merge_sorted`. 

### `merge`

The `merge` method simply stacks one or more tables on top of another.

```python syntax
t = merge(tables: List[Table])
```

:::note

The columns for each table need to have the same names and types, or a column mismatch error will occur. `NULL` inputs are ignored.

:::

### `merge_sorted`

The `merge_sorted` method is similar to the `merge` method, but it sorts the result table after merging the data. The `merge_sorted` method is more efficient than using `merge` followed by `sort`.

```python syntax
t = merge_sorted(tables: List[Table], order_by: str)
```

## Examples

The following code block initializes three tables, each with two columns. We will use these tables in the following examples.

```python test-set=1 order=source1,source2,source3,result_merged,result_merge_sorted
from deephaven import merge, merge_sorted, new_table
from deephaven.column import  int_col, string_col

source1 = new_table([string_col("Letter", ["A", "B", "D"]), int_col("Number", [1, 2, 3])])
source2 = new_table([string_col("Letter", ["C", "D", "E"]), int_col("Number", [14, 15, 16])])
source3 = new_table([string_col("Letter", ["E", "F", "A"]), int_col("Number", [22, 25, 27])])
```

### `merge`

Next, let's merge two of our tables using the `merge` method.

```python test-set=1 order=result
result = merge([source1, source2])
```

The resulting table `result_merged` is all of the source tables stacked vertically. If the source tables dynamically change, such as for ticking data, rows will be inserted within the stack. For example, if a row is added to the end of the third source table, in the resulting table, that new row appears after all other rows from the third source table and before all rows from the fourth source table.

### `merge_sorted`

The `merge_sorted` method is similar to the `merge` method, but it sorts the result table after merging the data. The `merge_sorted` method is more efficient than using `merge` followed by `sort`.

```python test-set=1 order=result
result = merge_sorted([source1, source2, source3], "Number")
```

The resulting table is all of the source tables stacked vertically and sorted by the `Number` column.

## Perform efficient merges

When performing more than one merge operation, it is best to perform all the merges at the same time, rather than nesting several merges.

In this example, a table named `result` is initialized. As new tables are generated, the results are merged at every iteration. Calling the merge method on each iteration makes this example inefficient.

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

If you are sorting the data you want to merge, it is more efficient to use the `merge_sorted` method instead of `merge` followed by `sort`. Your code will be easier to read, too.

```python order=null
from deephaven import merge, merge_sorted, new_table
from deephaven.column import int_col, string_col

source1 = new_table([string_col("Letter", ["A", "B", "D"]), int_col("Number", [1, 2, 3])])
source2 = new_table([string_col("Letter", ["C", "D", "E"]), int_col("Number", [14, 15, 16])])
source3 = new_table([string_col("Letter", ["E", "F", "A"]), int_col("Number", [22, 25, 27])])

# using `merge` followed by `sort`
t_merged = merge(tables=[source1, source2, source3]).sort(order_by="Number")

# using `merge_sorted`
result = merge_sorted(tables=[source1,source2,source3], order_by="Number")
```

![img](../assets/working-with-deephaven-tables/merge-n-sort-vs-merge-sorted.png)