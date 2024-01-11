---
id: doubleCol
title: doubleCol
---

The `doubleCol` method creates a column containing Java primitive double values.

:::note

This method is commonly used with [`newTable`](./newTable.md) to create tables.

:::

## Syntax

```
doubleCol(name, data...)
```

## Parameters

<ParamTable>
<Param name="name" type="String">

The name of the new column.

</Param>
<Param name="data" type="double...">

The column values.

</Param>
</ParamTable>

## Returns

A [`ColumnHolder`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/ColumnHolder.html).

## Example

The following examples use [`newTable`](./newTable.md) to create a table with a single column of doubles named `Doubles`.

```groovy
result = newTable(
    doubleCol("Doubles", 0.1, 0.2, 0.3)
)
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [`newTable`](./newTable.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#doubleCol(java.lang.String,double...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.TableTools.html?highlight=doublecol#deephaven.TableTools.doubleCol)