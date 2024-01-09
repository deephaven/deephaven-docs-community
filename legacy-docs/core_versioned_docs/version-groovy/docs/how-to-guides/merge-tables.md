---
id: merge-tables
title: How to vertically stack tables
sidebar_label: Vertically stack tables
---

This guide discusses how to stack tables one on top of the other into one aggregate table. This can be accomplished using any of the `merge` methods:

- [`merge`](../reference/table-operations/merge/merge.md)
- [`mergeSorted`](../reference/table-operations/merge/merge-sorted.md)

The basic syntax for `merge` follows.

`t = merge(tables...)`

- all of the source tables must have the same schema - column names and column types.
- `NULL` inputs are ignored.

The resulting table is all of the source tables stacked vertically. If the source tables dynamically change, such as for ticking data, rows will be inserted _within_ the stack. For example, if a row is added to the end of the third source table, in the resulting table, that new row appears after all other rows from the third source table and before all rows from the fourth source table.

## Source tables

Let's start with the following source tables:

```groovy test-set=1 order=source1,source2,source3
source1 = newTable(stringCol("Letter", "A", "B", "D"), intCol("Number", 1, 2, 3))
source2 = newTable(stringCol("Letter", "C", "D", "E"), intCol("Number", 14, 15, 16))
source3 = newTable(stringCol("Letter", "E", "F", "A"), intCol("Number", 22, 25, 27))
```

The sections below discuss basic merge operations, and how to merge tables effectively, especially when you have many tables to combine.

## Merge tables

The above source tables can be combined, or vertically stacked, by providing each table as an argument to the [`merge`](../reference/table-operations/merge/merge.md) method.

:::note

The columns for each table need to have the same names and types, or a column mismatch error will occur.

:::

The following query merges two tables:

```groovy test-set=1
result = merge(source1, source2)
```

The following query merges three tables:

```groovy test-set=1
result = merge(source1, source2, source3)
```

Similarly, [`merge`](../reference/table-operations/merge/merge.md) can be applied to an array of tables.

```groovy test-set=1
tables=[source1, source2, source3]
result = merge(tables)
```

### Merge with null tables

When merging tables, null tables are ignored.

In this case, `result` will contain the same data as `source`.

```groovy order=source,result
source = newTable(col("Letter", "A", "B", "D"), col("Number", 1, 2, 3))

result = merge(null, source)
```

## Perform efficient merges

When performing more than one [`merge`](../reference/table-operations/merge/merge.md) operation, it is best to perform all the merges at the same time, rather than nesting several merges.

In this example, a table named `result` is initialized. As new tables are generated, the results are merged at every iteration. Calling the [`merge`](../reference/table-operations/merge/merge.md) method on each iteration makes this example inefficient.

```groovy order=result
result = null

for(i = 0; i < 5; i++) {
   newResult = newTable(stringCol("Code", "A${i}", "B${i}"), intCol("Val", i, 10*i))
   result = merge(result, newResult)
}
```

Instead, we can make the operation more efficient by calling the [`merge`](../reference/table-operations/merge/merge.md) method just once. Here [`merge`](../reference/table-operations/merge/merge.md) is applied to an array containing all of the source tables.

```groovy order=result
tableArray = []

for(i = 0; i < 5; i++) {
   newResult = newTable(stringCol("Code", "A${i}", "B${i}"), intCol("Val", i, 10*i))
   tableArray.add(newResult)
}

result = merge(tableArray)
```

## Sort tables while merging

The `mergeSorted` method merges tables just like `merge`, but also sorts the tables by a specified key column.

The basic syntax is:
`t = mergeSorted(keyColumn, tables...)`

In this example, three source tables are created. They are then merged into two new tables, one sorted by `Number` and the other sorted by `Letter`.

```groovy order=source1,source2,source3,result
source1 = newTable(col("Letter", "A", "C", "G"), col("Number", 1, 6, 9))
source2 = newTable(col("Letter", "B", "D", "G"), col("Number", 3, 5, 8))
source3 = newTable(col("Letter", "D", "E", "F"), col("Number", 2, 4, 7))

result = mergeSorted("Number", source1, source2, source3)
result2 = mergeSorted("Letter", source1, source2, source3)
```

## Related documentation

- [Create a new table](./new-table.md)
- [`merge`](../reference/table-operations/merge/merge.md)
- [`mergeSorted`](../reference/table-operations/merge/merge-sorted.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#merge(java.util.Collection)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.TableTools.html?highlight=merge#deephaven.TableTools.merge)
