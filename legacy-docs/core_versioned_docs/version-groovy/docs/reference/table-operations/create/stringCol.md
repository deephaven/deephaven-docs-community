---
id: stringCol
title: stringCol
---

The `stringCol` method creates a column containing string object values.

:::note

This method is commonly used with [`newTable`](./newTable.md) to create tables.

:::

## Syntax

```
stringCol(name, data...)
```

## Parameters

<ParamTable>
<Param name="name" type="String">

The name of the new column.

</Param>
<Param name="data" type="String...">

The column values.

</Param>
</ParamTable>

## Returns

A [`ColumnHolder`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/ColumnHolder.html).

## Example

The following examples use [`newTable`](./newTable.md) to create a table with a single column of strings named `Strings`.

```groovy
result = newTable(
    stringCol("Strings", "Deephaven", "3.14", "Community")
)
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [`newTable`](./newTable.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#stringCol(java.lang.String,java.lang.String...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.TableTools.html?highlight=stringcol#deephaven.TableTools.stringCol)
