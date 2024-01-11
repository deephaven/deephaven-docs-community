---
id: jobj_col
title: jobj_col
---

The `jobj_col` method creates a column containing Java objects.

:::note

This method is commonly used with [`new_table`](./newTable.md) to create tables.

:::

:::caution

The `jobj_col` method is significantly slower than other methods that create columns. When creating a column with data of one type, use the corresponding specialized method (e.g., for ints, use [`int_col`](./intCol.md)).

:::

## Syntax

```python syntax
jobj_col(name: str, data: Sequence[Any]) -> InputColumn
```

## Parameters

<ParamTable>
<Param name="name" type="str">

The name of the new column.

</Param>
<Param name="data" type="Sequence[Any]">

The column values.

</Param>
</ParamTable>

## Returns

An [`InputColumn`](https://deephaven.io/core/pydoc/code/deephaven.column.html#deephaven.column.InputColumn).

## Example

The following examples use [`new_table`](./newTable.md) to create a table with a single column of Java objects named `Values`.

```python
from deephaven import new_table
from deephaven.column import jobj_col

result = new_table([
    jobj_col("Values", ["a", 1, -5.5])
])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [`new_table`](./newTable.md)
- [`pyobj_col`](./pyobj_col.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#col(java.lang.String,T...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.column.html?highlight=jobj#deephaven.column.jobj_col)