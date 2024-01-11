---
id: intCol
title: intCol
---

The `intCol` method creates a column containing Java primitive integer values.

:::note

This method is commonly used with [`newTable`](./newTable.md) to create tables.

:::

:::important

Integer columns do not support infinite and not-a-number (NaN) values.

:::

## Syntax

```
intCol(name, data...)
```

## Parameters

<ParamTable>
<Param name="name" type="String">

The name of the new column.

</Param>
<Param name="data" type="int...">

The column values.

</Param>
</ParamTable>

## Returns

A [`ColumnHolder`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/ColumnHolder.html).

## Example

The following examples use [`newTable`](./newTable.md) to create a table with a single column of integers named `Integers`.

```groovy
result = newTable(
    intCol("Integers", 1, 2, 3, 4, 5)
)
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [`newTable`](./newTable.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#intCol(java.lang.String,int...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.TableTools.html?highlight=intcol#deephaven.TableTools.intCol)