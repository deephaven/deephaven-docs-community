---
id: drop-move-rename-columns
title: How to drop, move, and rename columns
sidebar_label: Drop, move, and rename columns
---

This guide shows you how to perform some basic adjustments to the columns in your tables.

We'll cover the following methods:

- [`dropColumns`](../reference/table-operations/select/drop-columns.md)
- [`moveColumns`](../reference/table-operations/select/move-columns.md)
- [`moveColumnsDown`](../reference/table-operations/select/move-columns-down.md)
- [`moveColumnsUp`](../reference/table-operations/select/move-columns-up.md)
- [`renameColumns`](../reference/table-operations/select/rename-columns.md)

The examples in this guide use a table called `students` that contains data on four students in a class. If you're unfamiliar with the [`newTable`](../reference/table-operations/create/newTable.md) method, check out our guide [Create a new table](./new-table.md).

```groovy test-set=1
students = newTable(
    stringCol("Name", "Andy", "Claire", "Jane", "Steven"),
    intCol("StudentID", 1, 2, 3, 4),
    intCol("TestGrade", 85, 95, 88, 72),
    intCol("HomeworkGrade", 85, 95, 90, 95),
    doubleCol("GPA", 3.0, 4.0, 3.7, 2.8)
)
```

## Remove columns from a table

[`dropColumns`](../reference/table-operations/select/drop-columns.md) removes columns from a table when you supply the names of the columns you want to remove. [`select`](../reference/table-operations/select/select.md) and [`view`](../reference/table-operations/select/view.md) also remove columns; however, for these methods, you supply the names of the columns you'd like to _keep_. Unlike [`select`](../reference/table-operations/select/select.md) and [`view`](../reference/table-operations/select/view.md), however, [`dropColumns`](../reference/table-operations/select/drop-columns.md) won't change column types. See [Choose the right selection method](../conceptual/choose-select-view-update.md) for more details.

### `dropColumns`

The [`dropColumns`](../reference/table-operations/select/drop-columns.md) method creates a table with the same number of rows as the source table, but omits any columns included in its argument. This method is useful when you only want to eliminate a small number of columns from the source table, or in cases where you need to add a column for some operation, but then no longer need it after the operation is complete.

In the following example, we drop the `StudentID` column by providing its name as an argument to the [`dropColumns`](../reference/table-operations/select/drop-columns.md) method.

```groovy test-set=1
studentsNoId = students.dropColumns("StudentID")
```

## Move columns within the table

### `moveColumns`

The [`moveColumns`](../reference/table-operations/select/move-columns.md) method moves a specified column (or a set of columns) to a different location in the resulting table determined by a specific column index value.

In the following example, we move the "GPA" to column index 1. Deephaven uses a zero-based index model, so this moves the column to the second position in the table.

```groovy test-set=1
moveGPA = students.moveColumns(1, "GPA")
```

Column sets can also be moved. In the following example, we move the "TestGrade" and "HomeworkGrade" columns to positions 3, so they become the last two columns in the table. The first column specified in the [`moveColumns`](../reference/table-operations/select/move-columns.md) argument takes the index position, and additional columns will be placed to its right, as shown below.

```groovy test-set=1
moveGrades = students.moveColumns(3, "TestGrade", "HomeworkGrade")
```

### `moveColumnsUp`

The [`moveColumnsUp`](../reference/table-operations/select/move-columns-up.md) method moves a column (or a set of columns) to the zero column index position in the resulting table. Unlike [`moveColumns`](../reference/table-operations/select/move-columns.md), the argument for [`moveColumnsUp`](../reference/table-operations/select/move-columns-up.md) does not require the column index number.

In the following example, "StudentID" becomes the first column in the table.

```groovy test-set=1
moveUpStudentID = students.moveColumnsUp("StudentID")
```

### `moveColumnsDown`

The [`moveColumnsDown`](../reference/table-operations/select/move-columns-down.md) method moves a column (or a set of columns) to the end of the resulting table.

In the following example, `StudentID` becomes the last column in the table.

```groovy test-set=1
moveDownStudentID = students.moveColumnsDown("StudentID")
```

## Rename columns in a table

Deephaven provides several options to rename columns in your table. In more complex queries, you might do this when performing [joins](./joins-overview.md) or other calculations on your data. However, the [`renameColumns`](../reference/table-operations/select/rename-columns.md) method will rename specified columns without altering the data in any way.

### `renameColumns`

The [`renameColumns`](../reference/table-operations/select/rename-columns.md) method renames a specified column or columns. The order within the argument is `newColumnName = oldColumnName`.

In the following example, we rename the `StudentID` column to simply `ID`.

```groovy test-set=1
renameStudentID = students.renameColumns("ID = StudentID")
```

## Related documentation

- [Choose the right selection method](../conceptual/choose-select-view-update.md)
- [Create a new table](./new-table.md)
- [How to select, view, and update data](./use-select-view-update.md)
- [`dropColumns`](../reference/table-operations/select/drop-columns.md)
- [`moveColumns`](../reference/table-operations/select/move-columns.md)
- [`moveColumnsDown`](../reference/table-operations/select/move-columns-down.md)
- [`moveColumnsUp`](../reference/table-operations/select/move-columns-up.md)
- [`renameColumns`](../reference/table-operations/select/rename-columns.md)
