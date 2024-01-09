---
id: joins-overview
title: How to join tables
sidebar_label: Join tables
---

This guide discusses how to join tables in Deephaven. There are several methods to choose from; while the basic syntax is the same, this article demonstrates the differences between each join. Please see our conceptual guide, [Choose a join method](../conceptual/choose-joins.md), to learn more about which join is right for your use case.

Frequently, related data is stored in multiple tables. For example, a company might save its employee data in one table, and its department data in another, as shown below.

```groovy order=employeeTable,departmentTable
employeeTable = newTable(
    stringCol("LastName", "Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"),
    intCol("DeptID", 31, 33, 33, 34, 34, NULL_INT),
    stringCol("Telephone", "(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", null, null)
)

departmentTable = newTable(
    intCol("DeptID", 31, 33, 34, 35),
    stringCol("DeptName", "Sales", "Engineering", "Clerical", "Marketing"),
)
```

However, there may be instances where you would like to combine - or join - certain columns of data from multiple, related tables. For example, you might want a single table that lists employee phone numbers along with their associated department names and department phone numbers.

Deephaven provides several join methods that cater to common use cases.

| Join Type                                                                | Method            |
| ------------------------------------------------------------------------ | ----------------- |
| [As-of Join](../reference/table-operations/join/aj.md)                   | `aj()`            |
| [Exact Join](../reference/table-operations/join/exact-join.md)           | `exactJoin()`     |
| [Full Outer Join](../reference/table-operations/join/full-outer-join.md) | `fullOuterJoin()` |
| [Join](../reference/table-operations/join/join.md)                       | `join()`          |
| [Left Outer Join](../reference/table-operations/join/left-outer-join.md) | `leftOuterJoin()` |
| [Natural Join](../reference/table-operations/join/natural-join.md)       | `naturalJoin()`   |
| [Range Join](../reference/table-operations/join/rangeJoin.md)            | `rangeJoin()`     |
| [Reverse As-of Join](../reference/table-operations/join/raj.md)          | `raj()`           |

## Syntax

Most join methods combine data from two tables. These tables are usually referred to as the "left table" and the "right table":

- The left table is the base table data is added to.
- The right table is the source of data added to the left table.

In most cases, there will be one or more columns used as keys to match data (`columnsToMatch`) between the left and right tables. This format is fundamental for writing join statements in Deephaven. However, there are variations in the syntax for different circumstances.

Here is the basic format and syntax for all join methods:

The left table is followed by the specific join method we want to use. The arguments of the join method are:

1. Right table,
2. Column or columns on which to match, and
3. (Optional) Column or columns in the right table to join to the left table. If excluded, all columns are joined.

### Add all columns

Using the tables shown below, we want to get data from the `departmentTable` (the right table) and join it to the `employeeTable` (the left table). Both tables have `DeptID` as a common column which we can use as a key to join the content from the right table to the left table.

If we want to join _all_ the columns from the right table, we use the two-argument join method:

`resultTable = leftTable.joinMethod(rightTable, "columnsToMatch")`

```groovy order=employeeTable,departmentTable,combined
employeeTable = newTable(
    stringCol("LastName", "Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"),
    intCol("DeptID", 31, 33, 33, 34, 34, NULL_INT),
    stringCol("Telephone", "(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", null, null),
)

departmentTable = newTable(
    intCol("DeptID", 31, 33, 34, 35),
    stringCol("DeptName", "Sales", "Engineering", "Clerical", "Marketing"),
    stringCol("DeptManager", "Martinez", "Williams", "Garcia", "Lopez"),
    intCol("DeptGarage", 33, 52, 22, 45)
)

combined = employeeTable.naturalJoin(departmentTable, "DeptID")
```

However, to reduce the number of columns in the output table, we can specify columns to add via the third argument (`columnsToAdd`). `columnsToAdd` is a comma-separated list of column names:

`leftTable.joinMethod(rightTable, "columnsToMatch", "columnToJoin1, columnToJoin2")`

```groovy order=employeeTable,departmentTable,combined
employeeTable = newTable(
    stringCol("LastName", "Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"),
    intCol("DeptID", 31, 33, 33, 34, 34, NULL_INT),
    stringCol("Telephone", "(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", null, null),
)

departmentTable = newTable(
    intCol("DeptID", 31, 33, 34, 35),
    stringCol("DeptName", "Sales", "Engineering", "Clerical", "Marketing"),
    stringCol("DeptManager", "Martinez", "Williams", "Garcia", "Lopez"),
    intCol("DeptGarage", 33, 52, 22, 45)
)

combined = employeeTable.join(departmentTable, "DeptID", "DeptName, DeptManager" )
```

### Use multiple match columns

It is possible to join tables on multiple key columns. This is done by listing all of the key columns within the `columnsToMatch` argument as comma-separated values.

For a join with two different `columnsToMatch`, the format would look like this, with each matching column listed and separated by commas within the quotes containing the second argument:

`leftTable.joinMethod(rightTable, "columnToMatch1, columnToMatch2", "columnsToAdd")`

In the example below, only one element matches for both `DeptID` and `DeptGarage`:

```groovy order=employeeTable,departmentTable,combined
employeeTable = newTable(
    stringCol("LastName", "Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"),
    intCol("DeptID", 31, 33, 33, 34, 34, NULL_INT),
    stringCol("Telephone", "(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", null, null),
    intCol("DeptGarage", 33, 33, 33, 52, 52, 22)
)

departmentTable = newTable(
    intCol("DeptID", 31, 33, 34, 35),
    stringCol("DeptName", "Sales", "Engineering", "Clerical", "Marketing"),
    stringCol("DeptManager", "Martinez", "Williams", "Garcia", "Lopez"),
    intCol("DeptGarage", 33, 52, 22, 45)
)

combined = employeeTable.naturalJoin(departmentTable, "DeptID, DeptGarage")
```

### Match columns with different names

When joining data from two different tables, you may need to match on columns that do not have the same name. For example, in the tables below, the column representing the department number has a different name in each table.

To join the two tables based on this common column, we need to use the equals sign (`=`) to indicate which pairs of columns should be matched. `DeptID` is the name of the column containing the matching criteria in the left table, and `DeptNumber` is the name of the column containing the matching criteria in the right table. Therefore, the following argument would be used for the `columnsToMatch` argument: `"DeptID = DeptNumber"`.

The basic syntax looks like this:

`result = leftTable.joinMethod(rightTable, "columnToMatchLeft = columnToMatchRight", "columnsToJoin")`

```groovy order=employeeTable,departmentTable,combined
employeeTable = newTable(
    stringCol("LastName", "Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"),
    intCol("DeptNumber", 31, 33, 33, 34, 34, NULL_INT),
    stringCol("Telephone", "(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", null, null),
)

departmentTable = newTable(
    intCol("DeptID", 31, 33, 34, 35),
    stringCol("DeptName", "Sales", "Engineering", "Clerical", "Marketing"),
)

combined = employeeTable.naturalJoin(departmentTable, "DeptNumber = DeptID")
```

### Rename appended columns

When joining data from two different tables, you may want to rename a column from the right table before adding it to the left table. For example, both tables below have a column labeled `Telephone`. When adding data from the right table, `Telephone` can be renamed to `DeptTelephone` to avoid a conflict with the `Telephone` column inherited from the left table.

```groovy order=employeeTable,departmentTable,combined
employeeTable = newTable(
    stringCol("LastName", "Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"),
    intCol("DeptID", 31, 33, 33, 34, 34, NULL_INT),
    stringCol("Telephone", "(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", null, null),
)

departmentTable = newTable(
    intCol("DeptID", 31, 33, 34, 35),
    stringCol("DeptName", "Sales", "Engineering", "Clerical", "Marketing"),
    stringCol("Telephone", "(303) 555-0136", "(303) 555-0162", "(303) 555-0175", "(303) 555-0171")
)

combined = employeeTable.naturalJoin(departmentTable,"DeptID", "DeptName, DeptTelephone = Telephone")
```

## Related documentation

- [Create a new table](./new-table.md)
- [Choose a join method](../conceptual/choose-joins.md)
- [As-of Join](../reference/table-operations/join/aj.md)
- [Exact Join](../reference/table-operations/join/exact-join.md)
- [Full Outer Join](../reference/table-operations/join/full-outer-join.md)
- [Join](../reference/table-operations/join/join.md)
- [Left Outer Join](../reference/table-operations/join/left-outer-join.md)
- [Natural Join](../reference/table-operations/join/natural-join.md)
- [Reverse As-of Join](../reference/table-operations/join/raj.md)
