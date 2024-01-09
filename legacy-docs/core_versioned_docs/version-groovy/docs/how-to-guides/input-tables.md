---
id: input-tables
title: How to create and use Input Tables
sidebar_label: Create Input Tables
---

Input tables allow users to enter data into tables through the UI.

[Input tables](../reference/table-operations/create/InputTable.md) come in two flavors:

- [`AppendOnlyArrayBackedMutableTable`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/AppendOnlyArrayBackedMutableTable.html) - An append-only table allows users to add rows to the end of the table and does not support edits or deletions.

- [`KeyedArrayBackedMutableTable`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/KeyedArrayBackedMutableTable.html) - A keyed table has keys for each row, allowing modification of pre-existing values.

## Create an append-only input table

To create an append-only input table from a source table, simply import the [`AppendOnlyArrayBackedMutableTable`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/AppendOnlyArrayBackedMutableTable.html) class and call the [`make`](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/AppendOnlyArrayBackedMutableTable.html#make(io.deephaven.engine.table.TableDefinition)>) method.

```groovy order=source,result
import io.deephaven.engine.table.impl.util.AppendOnlyArrayBackedMutableTable

source = newTable(
    doubleCol("Doubles", 3.1, 5.45, -1.0),
    stringCol("Strings", "Creating", "New", "Tables")
)

result = AppendOnlyArrayBackedMutableTable.make(source)
```

## Create a keyed input table

To create a keyed input table, import [`KeyedArrayBackedMutableTable`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/KeyedArrayBackedMutableTable.html) and call [`make`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/KeyedArrayBackedMutableTable.html), using a source table and at least one key column as arguments.

```groovy order=source,result
import io.deephaven.engine.table.impl.util.KeyedArrayBackedMutableTable

source = newTable(
    doubleCol("Doubles", 3.1, 5.45, -1.0),
    stringCol("Strings", "Creating", "New", "Tables")
)

result = KeyedArrayBackedMutableTable.make(source, "Strings")
```

## Add data to the table

### Add data programmatically

To add data to an input table programmatically, you will need to create a `MutableInputTable` object using your input table's `INPUT_TABLE_ATTRIBUTE`. This object can be used to add or remove data from the associated table.

```groovy order=source,result
// import the needed MutableInputTable classes
import io.deephaven.engine.table.impl.util.KeyedArrayBackedMutableTable
import io.deephaven.engine.util.config.MutableInputTable

// create tables
source = newTable(
    doubleCol("Doubles", 1.0, 2.0, -3.0),
    stringCol("Strings", "Aaa", "Bbb", "Ccc")
)

table2 = newTable(
    doubleCol("Doubles", 6.9343, 1.45, -4.0),
    stringCol("Strings", "Ggg", "Hhh", "Iii")
)

// create a keyed input table
result = KeyedArrayBackedMutableTable.make(source, "Strings")

// create a MutableInputTable object with the result table's input table attribute
mit = (MutableInputTable)result.getAttribute(Table.INPUT_TABLE_ATTRIBUTE)

// add the second table to the input table
mit.add(table2)
```

### Add data manually

To manually add data to an input table, simply click on the cell in which you wish to enter data. Type the value into the cell, hit enter, and it will appear.

![img](../assets/how-to/input-table-keyed-edit-existing.gif)

Note that a `KeyedArrayBackedMutableTable` will allow you to edit existing rows, while an `AppendOnlyArrayBackedMutableTable` will only allow you to add new rows.

:::important

Added rows aren't final until you hit the **Commit** button. If you edit an existing row in a keyed input table, the result is immediate.

:::

Here are some things to consider when manually entering data into an input table:

- Manually entered data in a table will not be final until the **Commit** button at the bottom right of the console is clicked.
- Data added manually to a table must be of the correct type for its column. For instance, attempting to add a string value to an int column will fail.
- Entering data in between populated cells and hitting **Enter** will add the data to the bottom of the column.

## Related documentation

- [MutableInputTable](https://deephaven.io/core/javadoc/io/deephaven/engine/util/config/MutableInputTable.html)
- [`emptyTable`](../reference/table-operations/create/emptyTable.md)
- [Table types](../conceptual/table-types.md)
- [Input Table](../reference/table-operations/create/InputTable.md)
