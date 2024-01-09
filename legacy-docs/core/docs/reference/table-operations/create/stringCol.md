---
id: stringCol
title: string_col
---

The `string_col` method creates a column containing string object values.

:::note

This method is commonly used with [`new_table`](./newTable.md) to create tables.

:::

## Syntax

```python syntax
string_col(name: str, data: Sequence[str]) -> InputColumn
```

## Parameters

<ParamTable>
<Param name="name" type="str">

The name of the new column.

</Param>
<Param name="data" type="Sequence[str]">

The column values. This can be any sequence of compatible data, e.g., list, tuple, ndarray, pandas series, etc.

</Param>
</ParamTable>

## Returns

An [`InputColumn`](https://deephaven.io/core/pydoc/code/deephaven.column.html#deephaven.column.InputColumn).

## Example

The following examples use [`new_table`](./newTable.md) to create a table with a single column of strings named `Strings`.

```python
from deephaven import new_table
from deephaven.column import string_col

result = new_table([
    string_col("Strings", ["Deephaven", "3.14", "Community"])
])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [`new_table`](./newTable.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#stringCol(java.lang.String,java.lang.String...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.column.html?highlight=string#deephaven.column.string_col)
