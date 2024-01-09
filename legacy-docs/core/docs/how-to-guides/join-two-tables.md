---
id: join-two-tables
title: How to join two tables together
sidebar_label: Join two tables
---

This guide discusses how to join two tables in Deephaven. There are several methods to choose from; while the basic syntax is the same, this article demonstrates the differences between each join. Please see our conceptual guide, [Choose a join method](../conceptual/choose-joins.md), to learn more about which join is right for your use case.

Frequently, related data is stored in multiple tables. For example, a company might save its employee data in one table, and its department data in another, as shown below.

```python order=employee_table,department_table
from deephaven import new_table
from deephaven.column import string_col, int_col
from deephaven.constants import NULL_INT

employee_table = new_table([
    string_col("LastName", ["Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"]),
    int_col("DeptID", [31, 33, 33, 34, 34, NULL_INT]),
    string_col("Telephone", ["(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", None, None])
])

department_table = new_table([
    int_col("DeptID", [31, 33, 34, 35]),
    string_col("DeptName", ["Sales", "Engineering", "Clerical", "Marketing"]),
])
```

However, there may be instances where you would like to combine - or join - certain columns of data from multiple, related tables. For example, you might want a single table that lists employee phone numbers along with their associated department names and department phone numbers.

Deephaven provides several join methods that cater to common use cases.

| Join Type                                                                | Method              |
| ------------------------------------------------------------------------ | ------------------- |
| [As-of Join](../reference/table-operations/join/aj.md)                   | `aj()`              |
| [Exact Join](../reference/table-operations/join/exact-join.md)           | `exact_join()`      |
| [Full Outer Join](../reference/table-operations/join/full-outer-join.md) | `full_outer_join()` |
| [Join](../reference/table-operations/join/join.md)                       | `join()`            |
| [Left Outer Join](../reference/table-operations/join/left-outer-join.md) | `left_outer_join()` |
| [Natural Join](../reference/table-operations/join/natural-join.md)       | `natural_join()`    |
| [Range Join](../reference/table-operations/join/range-join.md)           | `range_join()`      |
| [Reverse As-of Join](../reference/table-operations/join/raj.md)          | `raj()`             |

## Syntax

Most join methods combine data from two tables. These tables are usually referred to as the "left table" and the "right table":

- The left table is the base table to which data is added.
- The right table is the source of data added to the left table.

In most cases, one or more columns (`ColumnsToMatch`) will be used as keys to match data between the left and right tables. This format is fundamental for writing join statements in Deephaven. However, there are variations in the syntax for different circumstances.

Here is the basic format and syntax for all join methods:

```python syntax
result = left_table.join_method(table=right_table, on=["ColumnsToMatch, ColumnsToAdd"])

result = left_table.join_method(table=right_table, on=["ColumnsToMatch"], joins=["ColumnsToJoin"])
```

The left table is followed by the specific join method we want to use. The arguments of the join method are:

1. Right table, expressed as `table = Table`,
2. the column or columns on which to match, expressed as `on = ["ColumnToMatch1, ColumnToMatch2, ..."]`, and
3. (Optional) the column or columns in the right table to join to the left table, expressed as `joins = ["ColumnToJoin1, ColumnToJoin2, ..."]`. If excluded, all columns are joined.

## Add all columns

Using the tables below, we want to get data from the `department_table` (the right table) and join it to the `employee_table` (the left table). Both tables have `DeptID` as a common column that we can use as a key to join the content from the right table to the left table.

If we want to join _all_ the columns from the right table, we use the two-argument join method:

```python syntax
result_table = left_table.join_method(table=right_table, on=["ColumnsToMatch"])
```

Let's use [`natural_join`](../reference/table-operations/join/natural-join.md):

```python order=employee_table,department_table,combined
from deephaven import new_table
from deephaven.column import string_col, int_col
from deephaven.constants import NULL_INT

employee_table = new_table([
    string_col("LastName", ["Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"]),
    int_col("DeptID", [31, 33, 33, 34, 34, NULL_INT]),
    string_col("Telephone", ["(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", None, None]),
])

department_table = new_table([
    int_col("DeptID", [31, 33, 34, 35]),
    string_col("DeptName", ["Sales", "Engineering", "Clerical", "Marketing"]),
    string_col("DeptManager", ["Martinez", "Williams", "Garcia", "Lopez"]),
    int_col("DeptGarage", [33, 52, 22, 45])
])

combined = employee_table.natural_join(table=department_table, on=["DeptID"])
```

However, to reduce the number of columns in the output table, we can specify columns to add via the third argument (`ColumnsToJoin`). `ColumnsToJoin` is a comma-separated list (an array) of column names:

```python syntax
left_table.join_method(table=right_table, on=["ColumnsToMatch"], joins=["ColumnToJoin1, ColumnToJoin2"])
```

```python order=employee_table,department_table,combined
from deephaven import new_table
from deephaven.column import string_col, int_col
from deephaven.constants import NULL_INT

employee_table = new_table([
    string_col("LastName", ["Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"]),
    int_col("DeptID", [31, 33, 33, 34, 34, NULL_INT]),
    string_col("Telephone", ["(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", None, None]),
])

department_table = new_table([
    int_col("DeptID", [31, 33, 34, 35]),
    string_col("DeptName", ["Sales", "Engineering", "Clerical", "Marketing"]),
    string_col("DeptManager", ["Martinez", "Williams", "Garcia", "Lopez"]),
    int_col("DeptGarage", [33, 52, 22, 45])
])

combined = employee_table.natural_join(table=department_table, on=["DeptID"], joins=["DeptName, DeptManager"])
```

## Use multiple match columns

It is possible to join tables on multiple key columns. This is done by listing all of the key columns within the `ColumnsToMatch` argument as comma-separated values.

For a join with two different `ColumnsToMatch`, the format would look like this, with each matching column listed and separated by commas within the quotes containing the second argument:

```python syntax
left_table.join_method(table=right_table, on=["ColumnToMatch1, ColumnToMatch2, ..."], joins=["ColumnsToJoin"])
```

In the example below, only one element matches for both `DeptID` and `DeptGarage`:

```python order=employee_table,department_table,combined
from deephaven import new_table
from deephaven.column import string_col, int_col
from deephaven.constants import NULL_INT

employee_table = new_table([
    string_col("LastName", ["Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"]),
    int_col("DeptID", [31, 33, 33, 34, 34, NULL_INT]),
    string_col("Telephone", ["(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", None, None]),
    int_col("DeptGarage", [33, 33, 33, 52, 52, 22])
])

department_table = new_table([
    int_col("DeptID", [31, 33, 34, 35]),
    string_col("DeptName", ["Sales", "Engineering", "Clerical", "Marketing"]),
    string_col("DeptManager", ["Martinez", "Williams", "Garcia", "Lopez"]),
    int_col("DeptGarage", [33, 52, 22, 45])
])

combined = employee_table.natural_join(table = department_table, on =["DeptID, DeptGarage"])
```

## Match columns with different names

When joining data from two different tables, you may need to match on columns that do not have the same name. For example, in the tables below, the column representing the department number has a different name in each table.

To join the two tables based on this common column, we must use the equals sign (`=`) to indicate which pairs of columns should be matched. `DeptID` is the name of the column containing the matching criteria in the left table, and `DeptNumber` is the name of the column containing the matching criteria in the right table. Therefore,`"DeptID = DeptNumber"` is used for the `ColumnsToMatch` argument.

The basic syntax looks like this:

```python syntax
result = left_table.join_method(table=right_table, on=["ColumnToMatchLeft = ColumnToMatchRight"], joins=["ColumnsToJoin"])
```

```python order=employee_table,department_table,combined
from deephaven import new_table
from deephaven.column import string_col, int_col
from deephaven.constants import NULL_INT

employee_table = new_table([
    string_col("LastName", ["Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"]),
    int_col("DeptNumber", [31, 33, 33, 34, 34, NULL_INT]),
    string_col("Telephone", ["(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", None, None]),
])

department_table = new_table([
    int_col("DeptID", [31, 33, 34, 35]),
    string_col("DeptName", ["Sales", "Engineering", "Clerical", "Marketing"]),
])

combined = employee_table.natural_join(table = department_table, on = ["DeptNumber=DeptID"])
```

## Rename appended columns

When joining data from two different tables, you may want to rename a column from the right table before adding it to the left table. For example, both tables below have a column labeled `Telephone`. When adding data from the right table, `Telephone` can be renamed to `DeptTelephone` to avoid a conflict with the `Telephone` column inherited from the left table.

```python order=employee_table,department_table,combined
from deephaven import new_table
from deephaven.column import string_col, int_col
from deephaven.constants import NULL_INT

employee_table = new_table([
    string_col("LastName", ["Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"]),
    int_col("DeptID", [31, 33, 33, 34, 34, NULL_INT]),
    string_col("Telephone", ["(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", None, None]),
])

department_table = new_table([
    int_col("DeptID", [31, 33, 34, 35]),
    string_col("DeptName", ["Sales", "Engineering", "Clerical", "Marketing"]),
    string_col("Telephone", ["(303) 555-0136", "(303) 555-0162", "(303) 555-0175", "(303) 555-0171"])
])

combined = employee_table.natural_join(table = department_table, on = ["DeptID"], joins = ["DeptName, DeptTelephone=Telephone"])
```

So far, we have demonstrated the basic syntax for joining two tables with [`natural_join`](../reference/table-operations/join/natural-join.md). Let's take a quick look at Deephaven's other join methods.

## Inexact (time-series) joins

Often called "time-series joins" because they are frequently used to join tables on timestamp columns, inexact joins come in three varieties:

- [As-of join (`aj`)](../reference/table-operations/join/aj.md): joins data from the right table as close as possible to the time of an event in the left table, without going over. In other words, it joins data from the right table _before_ or _at_ the time of an event in the left table.
- [Reverse as-of join (`raj`)](../reference/table-operations/join/raj.md): joins data from the right table as close as possible to the time of an event in the left table, without going under. In other words, it joins data from the right table _after_ or _at_ the time of an event in the left table.
- [`range_join`](../reference/table-operations/join/range-join.md): creates a new table containing all the rows and columns of the left table, plus additional columns containing aggregated data from the right table.

In the following example, we join two tables using [`aj`](../reference/table-operations/join/aj.md) and [`raj`](../reference/table-operations/join/raj.md).

```python order=result_aj,result_raj,trades,quotes
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col, datetime_col
from deephaven.time import to_j_instant

trades = new_table([
    string_col("Ticker", ["AAPL", "AAPL", "AAPL", "IBM", "IBM"]),
    datetime_col("Timestamp", [to_j_instant("2021-04-05T09:10:00 ET"), to_j_instant("2021-04-05T09:31:00 ET"), to_j_instant("2021-04-05T16:00:00 ET"), to_j_instant("2021-04-05T16:00:00 ET"), to_j_instant("2021-04-05T16:30:00 ET")]),
    double_col("Price", [2.5, 3.7, 3.0, 100.50, 110]),
    int_col("Size", [52, 14, 73, 11, 6])
])

quotes = new_table([
    string_col("Ticker", ["AAPL", "AAPL", "IBM", "IBM", "IBM"]),
    datetime_col("Timestamp", [to_j_instant("2021-04-05T09:11:00 ET"), to_j_instant("2021-04-05T09:30:00 ET"), to_j_instant("2021-04-05T16:00:00 ET"), to_j_instant("2021-04-05T16:30:00 ET"), to_j_instant("2021-04-05T17:00:00 ET")]),
    double_col("Bid", [2.5, 3.4, 97, 102, 108]),
    int_col("BidSize", [10, 20, 5, 13, 23]),
    double_col("Ask", [2.5, 3.4, 105, 110, 111]),
    int_col("AskSize", [83, 33, 47, 15, 5]),
])

result_aj = trades.aj(table=quotes, on=["Ticker", "Timestamp"])

result_raj = trades.raj(table=quotes, on=["Ticker", "Timestamp"])
```

See the difference in behavior? Since the timestamp in the first row is one second later in the `quotes` table than in the `trades` table, `aj` doesn't join data from the `quotes` table for that row, instead leaving those cells blank. `raj` does the opposite, joining data from the `quotes` table for rows 1, 4, and 5 (but not rows 2 and 3), because in those rows the timestamp in the `quotes` table is _before_ the timestamp in the `trades` table.

The following example performs a [range join](../reference/table-operations/join/range-join.md) on two source tables.

```python order=left,right,result_range_joined
from deephaven import empty_table
from deephaven.agg import group
from deephaven.table import Table

left = empty_table(20).update_view(["X=ii", "Y=X % 5", "LStartValue=ii / 0.5", "LEndValue=ii / 0.1"])
right = empty_table(20).update_view(["X=ii", "Y=X % 5", "RValue=ii / 0.25"])

result_range_joined = left.range_join(table=right, on=["Y", "LStartValue < RValue < LEndValue"], aggs=group("X"))
```

## Exact match joins

Our first examples on this page use [`natural_join`](../reference/table-operations/join/natural-join.md), which requires exact matches. If you want to join on exact matches, you have a few options at your disposal:

- [`exact_join`](../reference/table-operations/join/exact-join.md): joins _only_ the rows from the right table with matching rows in the left table. If there are no exact matches or multiple exact matches, your query will raise an error.
- [`natural_join`](../reference/table-operations/join/natural-join.md): joins _only_ the rows from the right table with matching rows in the left table. If there are multiple exact matches, your query will raise an error. If there are zero matches, your table will include null values.
- [`join`](../reference/table-operations/join/join.md): performs an inner join, and returns all possible combinations having matching records in both tables. Rows without matches in both tables are omitted, and rows with multiple matches appear multiple times in the result.
- [`left_outer_join`](../reference/table-operations/join/left-outer-join.md): returns a new table containing _all_ rows from the left table, as well as the rows from the right table that have matching keys in the identifier column(s).
- [`full_outer_join`](../reference/table-operations/join/full-outer-join.md): returns a new table containing all rows from the left and right table without duplicates. Null values are inserted where data is missing from the left and right tables.

In this example, we join two tables using [`exact_join`](../reference/table-operations/join/exact-join.md) and [`natural_join`](../reference/table-operations/join/natural-join.md).

```python order=result_exact,result_natural,result_natural_nulls,left,right
from deephaven import new_table
from deephaven.column import string_col, int_col
from deephaven.constants import NULL_INT

left = new_table([
    string_col("LastName", ["Rafferty", "Jones", "Steiner", "Robins", "Smith"]),
    int_col("DeptID", [31, 33, 33, 34, 34]),
    string_col("Telephone", ["(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", ""]),
])

right = new_table([
    int_col("DeptID", [31, 33, 34, 35]),
    string_col("DeptName", ["Sales", "Engineering", "Clerical", "Marketing"]),
    string_col("DeptTelephone", ["(303) 555-0136", "(303) 555-0162", "(303) 555-0175", "(303) 555-0171"])
])

right_with_nulls = new_table([
    int_col("DeptID", [31, NULL_INT, 34, 35]),
    string_col("DeptName", ["Sales", None, "Clerical", "Marketing"]),
    string_col("DeptTelephone", ["(303) 555-0136", "(303) 555-0162", "(303) 555-0175", "(303) 555-0171"])
])

result_exact = left.exact_join(table=right, on=["DeptID"])

result_natural = left.natural_join(table=right, on=["DeptID"])

# running this would result in an error
# result_exact = left.exact_join(table=right_with_nulls, on=["DeptID"])

result_natural_nulls = left.natural_join(table=right_with_nulls, on=["DeptID"])
```

The following example creates a `left` and `right` table, which are joined on the `Letter` column to show the result. [`join`](../reference/table-operations/join/join.md), [`left_outer_join`](../reference/table-operations/join/left-outer-join.md), and [`full_outer_join`](../reference/table-operations/join/full-outer-join.md) are used to join the tables.

```python order=result,result_left_joined,result_full_joined,left,right
from deephaven.experimental.outer_joins import full_outer_join, left_outer_join
from deephaven import new_table
from deephaven.column import string_col, int_col
from deephaven.constants import NULL_INT

left = new_table([
    string_col("Letter", ["A", "B", "C"]),
    int_col("Number", [5, 3, 2])
])

right = new_table([
    string_col("Letter", ["A", "A", "B", "B", "D"]),
    int_col("Code", [10, 12, 14, NULL_INT, 16]),
])

result = left.join(table=right, on=["Letter"])

result_left_joined = left_outer_join(l_table=left, r_table=right, on=["Letter"])

result_full_joined = full_outer_join(l_table=left, r_table=right, on=["Letter"])
```

As you can see:

![img](../assets/how-to/join-method-compare.png)

- `join` results in a table that contains all possible combinations of rows from the left and right tables that have matching rows from both tables. In this example our "C" row is dropped, because rows without matches in both tables are omitted.
- `left_outer_join` results in a table that contains _all_ rows from the left table, as well as the rows from the right table that have matching keys in the identifier column(s). In this example our "D" row is dropped, because it does not have a match in the left table. However, the "C" row is included because it appears in the left table, even though it has no match in the right table.
- `full_outer_join` results in a table that contains all rows from the left and right table without duplicates. Null values are inserted where data is missing from the left and right tables. In this example both our "C" and "D" rows are included, because they appear in the left and right tables, respectively, even though they do not have matches in the other table.

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
