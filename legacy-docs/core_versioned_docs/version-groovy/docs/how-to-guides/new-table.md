---
id: new-table
title: Create a table with newTable
sidebar_label: Create a new table
---

This guide will show you how to create a new, in-memory user table.

Deephaven stores data in tables, which are composed of rows and columns of data. Methods such as [`intCol`](../reference/table-operations/create/intCol.md) create a column of data. Each data column contains only one type of data, for example, `int`. The [`newTable`](../reference/table-operations/create/newTable.md) method creates a new table from one or more data columns.

Here, we will make a simple two-column table. Copy and run the following code in your console:

```groovy
result = newTable(
   stringCol("NameOfStringCol", "Data String 1", 'Data String 2', "Data String 3"),
   intCol("NameOfIntCol", 4, 5, 6)
)
```

This produces a table with a String column, an integer column, and three rows.

We will walk you through the query step-by-step.

:::note

Groovy users need to import the [TableTools](https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html) package.

:::

1. We are using the [`newTable`](../reference/table-operations/create/newTable.md) method. Its arguments will define our column names, types, and contents.
2. We define a string column using the method [`stringCol`](../reference/table-operations/create/stringCol.md):
   - the first argument is the column name, `NameOfStringCol`. Column names are typically capitalized.
   - the next arguments are the column contents, written as a comma-separated list. Since these are String values, they are enclosed in quotation marks.
3. We define a second column using the method [`intCol`](../reference/table-operations/create/intCol.md):
   - the first argument is the column name, `NameOfIntCol`
   - the next arguments are the column contents, written as a comma-separated list of integers.

:::note

The `TableTools` class contains methods to create many different types of columns, such as:

- [`byteCol`](../reference/table-operations/create/byteCol.md)
- [`shortCol`](../reference/table-operations/create/shortCol.md)
- [`intCol`](../reference/table-operations/create/intCol.md)
- [`longCol`](../reference/table-operations/create/longCol.md)
- [`floatCol`](../reference/table-operations/create/floatCol.md)
- [`doubleCol`](../reference/table-operations/create/doubleCol.md)
- [`stringCol`](../reference/table-operations/create/stringCol.md)
- [`instantCol`](../reference/table-operations/create/instantCol.md)

:::

Now that you have data in columns, it can be graphically manipulated in several ways in the UI. For instance, right-clicking a column header or the table data opens menus with options to filter, sort, and copy content.

## Related documentation

- [Create an empty table](./empty-table.md)
- [`newTable`](../reference/table-operations/create/newTable.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#newTable(io.deephaven.engine.table.impl.util.ColumnHolder...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.TableTools.html?highlight=tabletools#module-deephaven.TableTools)
