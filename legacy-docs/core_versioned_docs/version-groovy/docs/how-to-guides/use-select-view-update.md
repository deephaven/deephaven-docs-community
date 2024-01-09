---
id: use-select-view-update
title: How to select, view, and update data in tables
sidebar_label: Select, view, and update data
---

Analysis of data in queries often requires creating new tables from some or all of the columns in existing tables. The Deephaven API offers a variety of methods that can achieve this. In this guide, five are discussed:

- [`select`](../reference/table-operations/select/select.md)
- [`view`](../reference/table-operations/select/view.md)
- [`update`](../reference/table-operations/select/update.md)
- [`updateView`](../reference/table-operations/select/update-view.md)
- [`lazyUpdate`](../reference/table-operations/select/lazy-update.md)

:::note

The methods in this guide store results in different ways that can have a huge impact on query performance. The purpose of this guide is to show how to use these methods, not how to pick the best one for your needs.See our concept guide [Choosing the right selection method](../conceptual/choose-select-view-update.md) for more insight.

:::

The examples in this guide use a table called `students` created using [`newTable`](../reference/table-operations/create/newTable.md). The `students` table contains data on four students in a class. If you are unfamiliar with the method, check out our guide [Create a new table](./new-table.md).

```groovy test-set=1
students = newTable(
    stringCol("Name", "Andy", "Claire", "Jane", "Steven"),
    intCol("StudentID", 1, 2, 3, 4),
    intCol("TestGrade", 85, 95, 88, 72),
    intCol("HomeworkGrade", 85, 95, 90, 95),
    doubleCol("GPA", 3.0, 4.0, 3.7, 2.8)
)
```

## Create a table from columns of a source table

The [`select`](../reference/table-operations/select/select.md) and [`view`](../reference/table-operations/select/view.md) methods allow the user to create a new table containing columns derived from columns in a source table. The examples below show how to use these methods to select two columns from the source table and create a third to determine if a student passed the class.

Notice how the tables `studentsPassedSelect` and `studentsPassedView` contain the same data. The [`select`](../reference/table-operations/select/select.md) and [`view`](../reference/table-operations/select/view.md) methods return tables that appear identical, but they differ in how they store their results.

- [`select`](../reference/table-operations/select/select.md) computes and stores the result in memory.
- [`view`](../reference/table-operations/select/view.md) saves formulas that are recomputed from data in the source table every time a cell is accessed.

### `select`

```groovy test-set=1
studentsPassedSelect = students.select("Name", "GPA", "Passed = GPA >= 3.0")
```

### `view`

```groovy test-set=1
studentsPassedView = students.view("Name", "GPA", "Passed = GPA >= 3.0")
```

## Add columns to a table

The [`update`](../reference/table-operations/select/update.md), [`updateView`](../reference/table-operations/select/update-view.md), and [`lazyUpdate`](../reference/table-operations/select/lazy-update.md) methods allow the user to add one or more columns to a source table. The examples below show how these three methods keep all of the data from the source table and add an additional column.

Notice how `studentsPassedUpdate`, `studentsPassedUpdateView`, and `studentsPassedLazyUpdate` contain all columns from the `students` table and one additional column. The [`update`](../reference/table-operations/select/update.md), [`updateView`](../reference/table-operations/select/update-view.md), and [`lazyUpdate`](../reference/table-operations/select/lazy-update.md) methods return tables that appear identical, but they differ in how they store their results.

- [`update`](../reference/table-operations/select/update.md) computes and stores the new columns in memory.
- [`updateView`](../reference/table-operations/select/update-view.md) saves the new columns as formulas that are recomputed from data in the source table every time a cell is accessed.
- [`lazyUpdate`](../reference/table-operations/select/lazy-update.md) caches new column formula evaluations so that each set of formula inputs is computed at most once.

### `update`

```groovy test-set=1
studentsPassedUpdate = students.update("Passed = GPA >= 3.0")
```

### `updateView`

```groovy test-set=1
studentsPassedUpdateView = students.updateView("Passed = GPA >= 3.0")
```

### `lazyUpdate`

```groovy test-set=1
studentsPassedLazyUpdate = students.lazyUpdate("Passed = GPA >= 3.0")
```

## Related documentation

- [Choosing the right selection method](../conceptual/choose-select-view-update.md)
- [Create a new table](./new-table.md)
- [Drop, move, or rename columns](./drop-move-rename-columns.md)
- [`select`](../reference/table-operations/select/select.md)
- [`view`](../reference/table-operations/select/view.md)
- [`update`](../reference/table-operations/select/update.md)
- [`updateView`](../reference/table-operations/select/update-view.md)
- [`lazyUpdate`](../reference/table-operations/select/lazy-update.md)
