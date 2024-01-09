---
id: InputTable
title: Input Table
---

Input Tables are in-memory Deephaven tables that allow users to manually edit the data in cells. They come in two flavors:

- [`AppendOnlyArrayBackedMutableTable`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/AppendOnlyArrayBackedMutableTable.html) - An append-only table allows users to add rows to the end of the table and does not support edits or deletions.

- [`KeyedArrayBackedMutableTable`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/KeyedArrayBackedMutableTable.html) - A keyed table has keys for each row, allowing modification of pre-existing values.

## Syntax

### Append-Only

```groovy syntax
AppendOnlyArrayBackedMutableTable.make(definition)
AppendOnlyArrayBackedMutableTable.make(definition, enumValues)
AppendOnlyArrayBackedMutableTable.make(initialTable)
AppendOnlyArrayBackedMutableTable.make(initialTable, enumValues)
```

### Keyed

```groovy syntax
KeyedArrayBackedMutableTable.make(definition)
KeyedArrayBackedMutableTable.make(definition, enumValues)
KeyedArrayBackedMutableTable.make(initialTable)
KeyedArrayBackedMutableTable.make(initialTable, enumValues)
```

## Parameters

<ParamTable>
<Param name="definition" type="TableDefinition">

The definition of the new table.

</Param>
<Param name="enumValues" type="Map<String, Object[]>">

A map of column names to enum values.

</Param>
<Param name="initialTable" type="Table">

The initial Table to copy into the append-only or keyed Input Table.

</Param>
</ParamTable>

## Returns

An append-only or keyed Input Table.

## Examples

In this example, we will create an append-only input table from a source table.

```groovy order=source,result
import io.deephaven.engine.table.impl.util.AppendOnlyArrayBackedMutableTable

source = newTable(
    doubleCol("Doubles", 3.1, 5.45, -1.0),
    stringCol("Strings", "Creating", "New", "Tables")
)

result = AppendOnlyArrayBackedMutableTable.make(source)
```

In this example, we will create a keyed input table from a source table.

```groovy order=source,result
import io.deephaven.engine.table.impl.util.KeyedArrayBackedMutableTable

source = newTable(
    doubleCol("Doubles", 3.1, 5.45, -1.0),
    stringCol("Strings", "Creating", "New", "Tables")
)

result = KeyedArrayBackedMutableTable.make(source, "Strings")
```

## Add data to the table

To [manually add data](../../../how-to-guides/input-tables.md#add-data-to-the-table) to an input table, simply click on the cell in which you wish to enter data. Type the value into the cell, hit enter, and it will appear.

![img](../../../assets/how-to/groovy-input-table-ui.gif)

:::important

Added rows are not final until you hit the **Commit** button.

:::

## Related documentation

- [`emptyTable`](./emptyTable.md)
- [Table types](../../../conceptual/table-types.md)
- [AppendOnlyArrayBackedMutableTable Javadoc](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/AppendOnlyArrayBackedMutableTable.html)
- [KeyedArrayBackedMutableTable Javadoc](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/KeyedArrayBackedMutableTable.html)
