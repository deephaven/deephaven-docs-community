---
id: empty-table
title: Create a table with emptyTable
sidebar_label: Create an empty table
---

This guide will show you how to create an empty, in-memory user table. Empty tables contain rows but no columns. Selection methods can be used to add columns to empty tables.

<!--TODO: add link to selection overview https://github.com/deephaven/deephaven.io/issues/474 -->

Here, we will use the [`emptyTable`](../reference/table-operations/create/emptyTable.md) method to create a table with five rows and zero columns. The sole argument is the number of rows to be included in the new table. Copy and run the following code in your console:

```groovy test-set=1
empty = emptyTable(5)
```

:::note

Groovy users need to import the [TableTools](https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html) package.

:::

Now you can update your table to contain data.

The examples below use the [`update`](../reference/table-operations/select/update.md) method to create a new column. The column type will reflect the data specified in the [selection method's](../how-to-guides/use-select-view-update.md) argument; in other words, if your data is a set of integers, an int column is created automatically.

<!--TODO: add link to selection overview https://github.com/deephaven/deephaven.io/issues/474 -->

In the following query, we add a new column (`X`), which contains the same integer value (5) in each row.

```groovy test-set=1
result = empty.update("X = 5")
```

In the following query, we create a new column (`X`), which contains the values from array `a`. The [special variable `i`](../reference/query-language/variables/special-variables.md) is the row index.

```groovy test-set=1
a = [1, 2, 3, 4, 10] as int[]

result2 = empty.update("X = a[i]")
```

<!--TODO: https://github.com/deephaven/deephaven.io/issues/487 -->

## Related documentation

- [Create a new table](./new-table.md)
- [How to use `select`, `view`, and `update`](../how-to-guides/use-select-view-update.md)
- [`emptyTable`](../reference/table-operations/create/emptyTable.md)
- [`update`](../reference/table-operations/select/update.md)
