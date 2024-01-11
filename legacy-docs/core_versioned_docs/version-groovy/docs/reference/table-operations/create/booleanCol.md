---
id: booleanCol
title: booleanCol
---

The `booleanCol` method creates a column containing Java primitive boolean values.

:::note

This method is commonly used with [`newTable`](./newTable.md) to create tables.

:::

## Syntax

```
booleanCol(name, data...)
```

## Parameters

<ParamTable>
<Param name="name" type="String">

The name of the new column.

</Param>
<Param name="data" type="boolean...">

The column values.

</Param>
</ParamTable>

## Returns

A [`ColumnHolder`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/ColumnHolder.html).

## Example

The following examples use [`newTable`](./newTable.md) to create a table with a single column of booleans named `Booleans`.

```groovy
result = newTable(
    booleanCol("Booleans", true, false, false, true)
)
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [`newTable`](./newTable.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#booleanCol(java.lang.String,java.lang.Boolean...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.column.html#deephaven.column.bool_col)