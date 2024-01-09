---
id: special-variables
title: Special variables
---

Special variables inside the query language allow access to the row index of a table.

- `i` is a row index, as a primitive int.
- `ii` is a row index, as a primitive long.
- `k` is a Deephaven internal indexing value, as a primitive long.

:::note

The variables `i` and `ii` both represent row numbers. Integers are limited to values up to 2^31-1 (2,147,483,647), while longs can represent values up to 2^63-1. In other words, to avoid precision problems, use the `ii` variable, unless an `int` needs to be passed to another function. Using the `i` variable in a table with more than 2 billion rows will result in an error.

:::

:::note

`k` does not correspond to traditional row numbers and should only be used in limited circumstances, such as debugging or advanced query operations.

:::

:::caution

These variables are unreliable within a ticking table. Inconsistent results occur since previously created row indexes do not automatically update.

:::

Row numbers `i` and `ii` are frequently used with the [`_` and `[]`](../../query-language/types/arrays.md) operators to retrieve values from prior or future rows in the table. For example, `Column_[ii-1]` references the value in `Column` one row before the current row.

## Examples

In the following example, a table is created with the row index as an `i` int, `ii` long and `k` long. The meta-data is assessed to see the variable types.

```python order=result,meta
from deephaven import empty_table

result = empty_table(10).update(formulas=["I = i", "II = ii", "K = k"])

meta = result.meta_table
```

In the following example, row indices, `i` and `ii`, are used to access the rows before and after the current row in the table by using the [`_` and `[]`](../../query-language/types/arrays.md) operators.

:::caution

Because `i` and `ii` are used, this example will not reliably work on dynamic tables.

:::

```python order=source,result
from deephaven import empty_table

source = empty_table(10).update(formulas=["X = i"])

result = source.update(formulas=["A = X_[i-1]", "B = X_[i+1]", "C = X_[i+2]", "D = sqrt(X_[i-1] + X_[i+1])"])
```

## Related documentation

- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [`empty_table`](../../table-operations/create/emptyTable.md)
- [operators](../formulas/operators.md)
- [`update`](../../table-operations/select/update.md)
