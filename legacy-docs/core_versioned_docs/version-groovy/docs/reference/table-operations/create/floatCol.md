---
id: floatCol
title: floatCol
---

The `floatCol` method creates a column containing Java primitive float values.

:::note

This method is commonly used with [`newTable`](./newTable.md) to create tables.

:::

## Syntax

```
floatCol(name, data...)
```

## Parameters

<ParamTable>
<Param name="name" type="String">

The name of the new column.

</Param>
<Param name="data" type="float...">

The column values.

</Param>
</ParamTable>

## Returns

A [`ColumnHolder`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/ColumnHolder.html).

## Example

The following examples use [`newTable`](./newTable.md) to create a table with a single column of floats named `Floats`.

```groovy
result = newTable(
    floatCol("Floats", (float)9.9, (float)8.8, (float)7.7)
)
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [`newTable`](./newTable.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#floatCol(java.lang.String,float...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.TableTools.html?highlight=floatcol#deephaven.TableTools.floatCol)
