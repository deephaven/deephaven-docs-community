---
id: pyobj_col
title: pyobj_col
---

The `pyobj_col` method creates a column containing Python objects.

:::note

This method is commonly used with [`new_table`](./newTable.md) to create tables.

:::

:::caution

The `pyobj_col` method is significantly slower than other methods that create columns. When creating a column with data of one type, use the corresponding specialized method (e.g., for ints, use [`int_col`](./intCol.md)).

:::

## Syntax

```python syntax
pyobj_col(name: str, data: Sequence[Any]) -> InputColumn
```

## Parameters

<ParamTable>
<Param name="name" type="str">

The name of the new column.

</Param>
<Param name="data" type="Sequence[Any]">

The column values. Must be a sequence of Python objects.

</Param>
</ParamTable>

## Returns

An [`InputColumn`](https://deephaven.io/core/pydoc/code/deephaven.column.html#deephaven.column.InputColumn).

## Example

The following examples use [`new_table`](./newTable.md) to create a table with a single column of Python objects named `Values`.

```python
from deephaven import new_table
from deephaven.column import pyobj_col

result = new_table([
    pyobj_col("Values", ["a", 1, -5.5])
])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [`new_table`](./newTable.md)
- [`jobj_col`](./jobj_col.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#col(java.lang.String,T...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.column.html?highlight=pyobj#deephaven.column.pyobj_col)
