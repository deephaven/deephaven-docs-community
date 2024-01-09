---
id: longCol
title: long_col
---

The `long_col` method creates a column containing Java primitive long values.

:::note

This method is commonly used with [`new_table`](./newTable.md) to create tables.

:::

## Syntax

```python syntax
long_col(name: str, data: Sequence[int]) -> InputColumn
```

## Parameters

<ParamTable>
<Param name="name" type="str">

The name of the new column.

</Param>
<Param name="data" type="Sequence[int]">

The column values.

</Param>
</ParamTable>

## Returns

An [`InputColumn`](https://deephaven.io/core/pydoc/code/deephaven.column.html#deephaven.column.InputColumn).

## Example

The following examples use [`new_table`](./newTable.md) to create a table with a single column of longs named `Longs`.

```python
from deephaven import new_table
from deephaven.column import long_col

result = new_table([
    long_col("Longs", [10000000, 987654321, -314159265])
])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [`new_table`](./newTable.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#longCol(java.lang.String,long...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.column.html?highlight=long#deephaven.column.long_col)
