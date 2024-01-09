---
id: drop-move-rename-columns
title: How to drop, move, and rename columns
sidebar_label: Drop, move, and rename columns
---

This guide shows you how to perform some basic adjustments to the columns in your tables.

We'll cover the following methods:

- [`drop_columns`](../reference/table-operations/select/drop-columns.md)
- [`move_columns`](../reference/table-operations/select/move-columns.md)
- [`move_columns_down`](../reference/table-operations/select/move-columns-down.md)
- [`move_columns_up`](../reference/table-operations/select/move-columns-up.md)
- [`rename_columns`](../reference/table-operations/select/rename-columns.md)

The examples in this guide use a table called `students` that contains data on four students in a class. If you're unfamiliar with the [`new_table`](../reference/table-operations/create/newTable.md) method, check out our guide [Create a new table](./new-table.md).

```python test-set=1
from deephaven import new_table
from deephaven.column import int_col, double_col, string_col

students = new_table([
    string_col("Name", ["Andy", "Claire", "Jane", "Steven"]),
    int_col("StudentID", [1, 2, 3, 4]),
    int_col("TestGrade", [85, 95, 88, 72]),
    int_col("HomeworkGrade", [85, 95, 90, 95]),
    double_col("GPA", [3.0, 4.0, 3.7, 2.8])
])
```

## Remove columns from a table

[`drop_columns`](../reference/table-operations/select/drop-columns.md) removes columns from a table when you supply the names of the columns you want to remove. [`select`](../reference/table-operations/select/select.md) and [`view`](../reference/table-operations/select/view.md) also remove columns; however, for these methods, you supply the names of the columns you'd like to _keep_. Unlike [`select`](../reference/table-operations/select/select.md) and [`view`](../reference/table-operations/select/view.md), however, [`drop_columns`](../reference/table-operations/select/drop-columns.md) won't change column types. See [Choose the right selection method](../conceptual/choose-select-view-update.md) for more details.

### `drop_columns`

The [`drop_columns`](../reference/table-operations/select/drop-columns.md) method creates a table with the same number of rows as the source table, but omits any columns included in its argument. This method is useful when you only want to eliminate a small number of columns from the source table, or in cases where you need to add a column for some operation, but then no longer need it after the operation is complete.

In the following example, we drop the `StudentID` column by providing its name as an argument to the [`drop_columns`](../reference/table-operations/select/drop-columns.md) method.

```python test-set=1
students_no_ID = students.drop_columns(cols=["StudentID"])
```

## Move columns within the table

### `move_columns`

The [`move_columns`](../reference/table-operations/select/move-columns.md) method moves a specified column (or a set of columns) to a different location in the resulting table determined by a specific column index value.

In the following example, we move the "GPA" to column index 1. Deephaven uses a zero-based index model, so this moves the column to the second position in the table.

```python test-set=1
move_GPA = students.move_columns(idx=1, cols=["GPA"])
```

Column sets can also be moved. In the following example, we move the "TestGrade" and "HomeworkGrade" columns to position 3, so they become the last two columns in the table. The first column specified in the [`move_columns`](../reference/table-operations/select/move-columns.md) argument takes the index position, and additional columns will be placed to its right, as shown below.

```python test-set=1
move_grades = students.move_columns(idx=3, cols=["TestGrade", "HomeworkGrade"])
```

### `move_columns_up`

The [`move_columns_up`](../reference/table-operations/select/move-columns-up.md) method moves a column (or a set of columns) to the zero column index position in the resulting table. Unlike [`move_columns`](../reference/table-operations/select/move-columns.md), the argument for [`move_columns_up`](../reference/table-operations/select/move-columns-up.md) does not require the column index number.

In the following example, "StudentID" becomes the first column in the table.

```python test-set=1
move_up_student_ID = students.move_columns_up(cols=["StudentID"])
```

### `move_columns_down`

The [`move_columns_down`](../reference/table-operations/select/move-columns-down.md) method moves a column (or a set of columns) to the end of the resulting table.

In the following example, `StudentID` becomes the last column in the table.

```python test-set=1
move_down_student_id = students.move_columns_down(cols=["StudentID"])
```

## Rename columns in a table

Deephaven provides several options to rename columns in your table. In more complex queries, you might do this when performing [joins](./overview-joins.md) or other calculations on your data. However, the [`rename_columns`](../reference/table-operations/select/rename-columns.md) method will rename specified columns without altering the data in any way.

### `rename_columns`

The [`rename_columns`](../reference/table-operations/select/rename-columns.md) method renames a specified column or columns. The order within the argument is `newColumnName = oldColumnName`.

In the following example, we rename the `StudentID` column to simply `ID`.

```python test-set=1
rename_student_id = students.rename_columns(cols=["ID = StudentID"])
```

## Related documentation

- [Choose the right selection method](../conceptual/choose-select-view-update.md)
- [Create a new table](./new-table.md)
- [How to select, view, and update data](./use-select-view-update.md)
- [`drop_columns`](../reference/table-operations/select/drop-columns.md)
- [`move_columns`](../reference/table-operations/select/move-columns.md)
- [`move_columns_down`](../reference/table-operations/select/move-columns-down.md)
- [`move_columns_up`](../reference/table-operations/select/move-columns-up.md)
- [`rename_columns`](../reference/table-operations/select/rename-columns.md)
