---
id: empty-table
title: Create a table with empty_table
sidebar_label: Create an empty table
---

This guide will show you how to create an empty, in-memory user table. Empty tables contain rows but no columns. Selection methods can be used to add columns to empty tables.

<!--TODO: add link to selection overview https://github.com/deephaven/deephaven.io/issues/474 -->

Here, we will use the [`empty_table`](../reference/table-operations/create/emptyTable.md) method to create a table with five rows and zero columns. The sole argument is the number of rows to be included in the new table. Copy and run the following code in your console:

```python test-set=1
from deephaven import empty_table

empty = empty_table(5)
```

Now you can update your table to contain data.

The examples below use the [`update`](../reference/table-operations/select/update.md) method to create a new column. The column type will reflect the data specified in the [selection method's](../how-to-guides/use-select-view-update.md) argument; in other words, if your data is a set of integers, an int column is created automatically.

<!--TODO: add link to selection overview https://github.com/deephaven/deephaven.io/issues/474 -->

In the following query, we add a new column (`X`), which contains the same integer value (5) in each row.

```python test-set=1
result = empty.update(formulas=["X = 5"])
```

In the following query, we create a new column (`X`), which contains the values from array `a`. The [special variable `i`](../reference/query-language/variables/special-variables.md) is the row index.

```python test-set=1
a = [1, 2, 3, 4, 10]

result2 = empty.update(formulas=["X = (int)a[i]"])
```

## Related documentation

- [Create a new table](./new-table.md)
- [How to use select, view, and update](../how-to-guides/use-select-view-update.md)
- [`empty_table`](../reference/table-operations/create/emptyTable.md)
- [`update`](../reference/table-operations/select/update.md)
