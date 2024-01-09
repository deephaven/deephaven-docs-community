---
id: intCol
title: int_col
---

The `int_col` method creates a column containing Java primitive integer values.

:::note

This method is commonly used with [`new_table`](./newTable.md) to create tables.

:::

:::important

Integer columns do not support infinite and not-a-number (NaN) values.

:::

## Syntax

```python syntax
int_col(name: str, data: Sequence[int]) -> InputColumn
```

## Parameters

<ParamTable>
<Param name="name" type="str">

The name of the new column.

</Param>
<Param name="data" type="Sequence[int]">

The column values. This can be any sequence of compatible data, e.g., list, tuple, ndarray, pandas series, etc.

</Param>
</ParamTable>

## Returns

An [`InputColumn`](https://deephaven.io/core/pydoc/code/deephaven.column.html#deephaven.column.InputColumn).

## Example

The following examples use [`new_table`](./newTable.md) to create a table with a single column of integers named `Integers`.

```python
from deephaven import new_table
from deephaven.column import int_col

result = new_table([
    int_col("Integers", [1, 2, 3, 4, 5])
])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [`new_table`](./newTable.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#intCol(java.lang.String,int...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.column.html?highlight=int_col#deephaven.column.int_col)
