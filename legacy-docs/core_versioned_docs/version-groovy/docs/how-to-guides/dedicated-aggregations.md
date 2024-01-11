---
id: dedicated-aggregations
title: How to perform dedicated aggregations for groups
sidebar_label: Perform dedicated aggregations
---

This guide will show you how to compute summary information on groups of data using dedicated data aggregations.

Often when working with data, you will want to break the data into subgroups and then perform calculations on the grouped data. For example, a large multi-national corporation may want to know their average employee salary by country, or a teacher might want to calculate grade information for groups of students or in certain subject areas.

The process of breaking a table into subgroups and then performing a single type of calculation on the subgroups is known as "dedicated aggregation." The term comes from most operations creating a summary of data within a group (aggregation) and from a single type of operation being computed at once (dedicated).

## Why use dedicated aggregations?

Deephaven provides many dedicated aggregations, such as [`maxBy`](../reference/table-operations/group-and-aggregate/maxBy.md) and [`minBy`](../reference/table-operations/group-and-aggregate/minBy.md). These aggregations are good options if only one type of aggregation is needed. If more than one type of aggregation is needed or if you have a custom aggregation, [combined aggregations](./combined-aggregations.md) are a more efficient and more flexible solution.

## Syntax

The general syntax follows:

The `columnNames` parameter determines the column(s) by which to group data.

- `NULL` uses the whole table as a single group
- `"X"` will output the desired value for each group in column `X`.
- `"X", "Y"` will output the desired value for each group designated from the `X` and `Y` columns.

## What aggregations are available?

Each dedicated aggregator performs one calculation at a time:

- [`avgBy`](../reference/table-operations/group-and-aggregate/avgBy.md) - Average (mean) of each group.
- [`countBy`](../reference/table-operations/group-and-aggregate/countBy.md) - Number of rows in each group.
- [`firstBy`](../reference/table-operations/group-and-aggregate/firstBy.md) - First row of each group.
- [`groupBy`](../reference/table-operations/group-and-aggregate/groupBy.md) - Array of values in each group.
- [`headBy`](../reference/table-operations/group-and-aggregate/headBy.md) - First `n` rows of each group.
- [`lastBy`](../reference/table-operations/group-and-aggregate/lastBy.md) - Last row of each group.
- [`maxBy`](../reference/table-operations/group-and-aggregate/maxBy.md) - Maximum value of each group.
- [`medianBy`](../reference/table-operations/group-and-aggregate/medianBy.md) - Median of each group.
- [`minBy`](../reference/table-operations/group-and-aggregate/minBy.md) - Minimum value of each group.
- [`stdBy`](../reference/table-operations/group-and-aggregate/stdBy.md) - Standard deviation of each group.
- [`sumBy`](../reference/table-operations/group-and-aggregate/sumBy.md) - Sum of each group.
- [`tailBy`](../reference/table-operations/group-and-aggregate/tailBy.md) - Last `n` rows of each group.
- [`varBy`](../reference/table-operations/group-and-aggregate/varBy.md) - Variance of each group.

## Dedicated aggregators

In the following examples, we have test results in various subjects for some students. We want to summarize this information to see if students perform better in one class or another.

```groovy test-set=1
source = newTable(
    stringCol("Name", "James", "James", "James", "Lauren", "Lauren", "Lauren", "Zoey", "Zoey", "Zoey"),
    stringCol("Subject", "Math", "Science", "Art", "Math", "Science", "Art", "Math", "Science", "Art"),
    intCol("Number", 95, 100, 90, 72, 78, 92, 100, 98, 96),
)
```

### `firstBy` and `lastBy`

In this example, we want to know the first and the last test results for each student. To achieve this, we can use [`firstBy`](../reference/table-operations/group-and-aggregate/firstBy.md) to return the first test value and [`lastBy`](../reference/table-operations/group-and-aggregate/lastBy.md) to return the last test value. The results are grouped by `Name`.

```groovy test-set=1 order=first,last
first = source.firstBy("Name")
last = source.lastBy("Name")
```

### `headBy` and `tailBy`

In this example, we want to know the first two and the last two test results for each student. To achieve this, we can use [`headBy`](../reference/table-operations/group-and-aggregate/headBy.md) to return the first `n` test values and [`tailBy`](../reference/table-operations/group-and-aggregate/tailBy.md) to return the last `n` test value. The results are grouped by `Name`.

```groovy test-set=1 order=head,tail
head = source.headBy(2, "Name")
tail = source.tailBy(2, "Name")
```

### `countBy`

In this example, we want to know the number of tests each student completed. [`countBy`](../reference/table-operations/group-and-aggregate/countBy.md) returns the number of rows in the table as grouped by `Name` and stores that in a new column, `NumTests`.

```groovy test-set=1
count = source.countBy("NumTests", "Name")
```

## Summary statistics aggregators

In the following examples, we start with the same source table containing students' test results as used above.

:::caution

Applying these aggregations to a column where the average cannot be computed will result in an error. For example, the average is not defined for a column of string values. For more information on removing columns from a table, see [`dropColumns`](../reference/table-operations/select/drop-columns.md). The syntax for using [`dropColumns`](../reference/table-operations/select/drop-columns.md) is:

:::

### `sumBy`

In this example, [`sumBy`](../reference/table-operations/group-and-aggregate/sumBy.md) calculates the total sum of test scores for each `Name`. Because a sum cannot be computed for the string column `Subject`, this column is dropped before applying [`sumBy`](../reference/table-operations/group-and-aggregate/sumBy.md).

```groovy test-set=1
sum = source.dropColumns("Subject").sumBy("Name")
```

### `avgBy`

In this example, [`avgBy`](../reference/table-operations/group-and-aggregate/avgBy.md) calculates the average (mean) of test scores for each `Name`. Because an average cannot be computed for the string column `Subject`, this column is dropped before applying [`avgBy`](../reference/table-operations/group-and-aggregate/avgBy.md).

```groovy test-set=1
mean = source.dropColumns("Subject").avgBy("Name")
```

### `stdBy`

In this example, [`stdBy`](../reference/table-operations/group-and-aggregate/stdBy.md) calculates the standard deviation of test scores for each `Name`. Because a standard deviation cannot be computed for the string column `Subject`, this column is dropped before applying [`stdBy`](../reference/table-operations/group-and-aggregate/stdBy.md).

```groovy test-set=1
stdDev = source.dropColumns("Subject").stdBy("Name")
```

### `varBy`

In this example, [`varBy`](../reference/table-operations/group-and-aggregate/varBy.md) calculates the variance of test scores for each `Name`. Because a variance cannot be computed for the string column `Subject`, this column is dropped before applying [`varBy`](../reference/table-operations/group-and-aggregate/varBy.md).

```groovy test-set=1
var = source.dropColumns("Subject").varBy("Name")
```

### `medianBy`

In this example, [`medianBy`](../reference/table-operations/group-and-aggregate/medianBy.md) calculates the median of test scores for each `Name`. Because a median cannot be computed for the string column `Subject`, this column is dropped before applying [`medianBy`](../reference/table-operations/group-and-aggregate/medianBy.md).

```groovy test-set=1
median = source.dropColumns("Subject").medianBy("Name")
```

### `minBy`

In this example, [`minBy`](../reference/table-operations/group-and-aggregate/minBy.md) calculates the minimum of test scores for each `Name`. Because a minimum cannot be computed for the string column `Subject`, this column is dropped before applying [`minBy`](../reference/table-operations/group-and-aggregate/minBy.md).

```groovy test-set=1
minimum = source.dropColumns("Subject").minBy("Name")
```

### `maxBy`

In this example, [`maxBy`](../reference/table-operations/group-and-aggregate/maxBy.md) calculates the maximum of test scores for each `Name`. Because a maximum cannot be computed for the string column `Subject`, this column is dropped before applying [`maxBy`](../reference/table-operations/group-and-aggregate/maxBy.md) .

```groovy test-set=1
maximum = source.dropColumns("Subject").maxBy("Name")
```

## Related documentation

- [How to create multiple summary statistics for groups](./combined-aggregations.md)
- [`avgBy`](../reference/table-operations/group-and-aggregate/avgBy.md)
- [`countBy`](../reference/table-operations/group-and-aggregate/countBy.md)
- [`dropColumns`](../reference/table-operations/select/drop-columns.md)
- [`firstBy`](../reference/table-operations/group-and-aggregate/firstBy.md)
- [`headBy`](../reference/table-operations/group-and-aggregate/headBy.md)
- [`lastBy`](../reference/table-operations/group-and-aggregate/lastBy.md)
- [`maxBy`](../reference/table-operations/group-and-aggregate/maxBy.md)
- [`medianBy`](../reference/table-operations/group-and-aggregate/medianBy.md)
- [`minBy`](../reference/table-operations/group-and-aggregate/minBy.md)
- [`stdBy`](../reference/table-operations/group-and-aggregate/stdBy.md)
- [`sumBy`](../reference/table-operations/group-and-aggregate/sumBy.md)
- [`tailBy`](../reference/table-operations/group-and-aggregate/tailBy.md)
- [`varBy`](../reference/table-operations/group-and-aggregate/varBy.md)