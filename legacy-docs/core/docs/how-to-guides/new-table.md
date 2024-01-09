---
id: new-table
title: Create a table with new_table
sidebar_label: Create a new table
---

This guide will show you how to create a new in-memory user table.

Deephaven stores data in tables, which are composed of rows and columns of data. Methods such as [`int_col`](../reference/table-operations/create/intCol.md) create a column of data. Each data column contains only one type of data, for example, `int`. The [`new_table`](../reference/table-operations/create/newTable.md) method creates a new table from one or more data columns.

Here, we will make a simple two-column table. Copy and run the following code in your console:

```python
from deephaven import new_table

from deephaven.column import string_col, int_col

result = new_table([
   string_col("Name_Of_String_Col", ["Data String 1", 'Data String 2', "Data String 3"]),
   int_col("Name_Of_Int_Col", [4, 5, 6])
])
```

This produces a table with a String column, an integer column, and three rows.

We will walk you through the query step-by-step.

1. We are using the [`new_table`](../reference/table-operations/create/newTable.md) method. Its arguments will define our column names, types, and contents.
2. We define a string column using the method [`string_col`](../reference/table-operations/create/stringCol.md):
   - the first argument is the column name, `Name_Of_String_Col`. Column names are typically capitalized.
   - the next arguments are the column contents, written as a comma-separated list. Since these are String values, they are enclosed in quotation marks.
3. We define a second column using the method [`int_col`](../reference/table-operations/create/intCol.md):
   - the first argument is the column name, `Name_Of_Int_Col`
   - the next arguments are the column contents, written as a comma-separated list of integers.

Now that you have data in columns, it can be manipulated in several ways in the UI. For instance, right-clicking a column header or the table data opens menus with options to filter, sort, and copy content.

## Related documentation

- [Create an empty table](./empty-table.md)
- [`new_table`](../reference/table-operations/create/newTable.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#newTable(io.deephaven.engine.table.impl.util.ColumnHolder...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.TableTools.html?highlight=tabletools#module-deephaven.TableTools)
