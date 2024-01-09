---
id: dedicated-aggregations
title: How to perform dedicated aggregations for groups
sidebar_label: Perform dedicated aggregations
---

This guide will show you how to compute summary information on groups of data using dedicated data aggregations.

Often when working with data, you will want to break the data into subgroups and then perform calculations on the grouped data. For example, a large multi-national corporation may want to know their average employee salary by country, or a teacher might want to calculate grade information for groups of students or in certain subject areas.

The process of breaking a table into subgroups and then performing a single type of calculation on the subgroups is known as "dedicated aggregation." The term comes from most operations creating a summary of data within a group (aggregation) and from a single type of operation being computed at once (dedicated).

## Why use dedicated aggregations?

Deephaven provides many dedicated aggregations, such as [`max_by`](../reference/table-operations/group-and-aggregate/maxBy.md) and [`min_by`](../reference/table-operations/group-and-aggregate/minBy.md). These aggregations are good options if only one type of aggregation is needed. If more than one type of aggregation is needed or if you have a custom aggregation, [combined aggregations](./combined-aggregations.md) are a more efficient and more flexible solution.

## Syntax

The general syntax follows:

```python skip-test
result = source.DEDICATED_AGG(by=["GroupingColumns"])
```

The `by = ["GroupingColumns"]` parameter determines the column(s) by which to group data.

- `DEDICATED_AGG` should be substituted with one of the chosen aggregations below
- `[]` uses the whole table as a single group.
- `["X"]` will output the desired value for each group in column `X`.
- `["X", "Y"]` will output the desired value for each group designated from the `X` and `Y` columns.

## What aggregations are available?

Each dedicated aggregator performs one calculation at a time:

- [`abs_sum_by`](../reference/table-operations/group-and-aggregate/AbsSumBy.md) - Sum of absolute values of each group.
- [`avg_by`](../reference/table-operations/group-and-aggregate/avgBy.md) - Average (mean) of each group.
- [`count_by`](../reference/table-operations/group-and-aggregate/countBy.md) - Number of rows in each group.
- [`first_by`](../reference/table-operations/group-and-aggregate/firstBy.md) - First row of each group.
- [`group_by`](../reference/table-operations/group-and-aggregate/groupBy.md) - Group column content into vectors.
- [`head_by`](../reference/table-operations/group-and-aggregate/headBy.md) - First `n` rows of each group.
- [`last_by`](../reference/table-operations/group-and-aggregate/lastBy.md) - Last row of each group.
- [`max_by`](../reference/table-operations/group-and-aggregate/maxBy.md) - Maximum value of each group.
- [`median_by`](../reference/table-operations/group-and-aggregate/medianBy.md) - Median of each group.
- [`min_by`](../reference/table-operations/group-and-aggregate/minBy.md) - Minimum value of each group.
- [`std_by`](../reference/table-operations/group-and-aggregate/stdBy.md) - Sample standard deviation of each group.
- [`sum_by`](../reference/table-operations/group-and-aggregate/sumBy.md) - Sum of each group.
- [`tail_by`](../reference/table-operations/group-and-aggregate/tailBy.md) - Last `n` rows of each group.
- [`var_by`](../reference/table-operations/group-and-aggregate/varBy.md) - Sample variance of each group.
- [`weighted_avg_by`](../reference/table-operations/group-and-aggregate/weighted-sum-by.md) - Weighted average of each group.
- [`weighted_sum_by`](../reference/table-operations/group-and-aggregate/weighted-sum-by.md) - Weighted sum of each group.

## Dedicated aggregators

In the following examples, we have test results in various subjects for some students. We want to summarize this information to see if students perform better in one class or another.

```python test-set=1
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col

source = new_table([
    string_col("Name", ["James", "James", "James", "Lauren", "Lauren", "Lauren", "Zoey", "Zoey", "Zoey"]),
    string_col("Subject", ["Math", "Science", "Art", "Math", "Science", "Art", "Math", "Science", "Art"]),
    int_col("Number", [95, 100, 90, 72, 78, 92, 100, 98, 96]),
])
```

### `first_by` and `last_by`

In this example, we want to know the first and the last test results for each student. To achieve this, we can use [`first_by`](../reference/table-operations/group-and-aggregate/firstBy.md) to return the first test value and [`last_by`](../reference/table-operations/group-and-aggregate/lastBy.md) to return the last test value. The results are grouped by `Name`.

```python test-set=1 order=first,last
first = source.first_by(by=["Name"])
last = source.last_by(by=["Name"])
```

### `head_by` and `tail_by`

In this example, we want to know the first two and the last two test results for each student. To achieve this, we can use [`head_by`](../reference/table-operations/group-and-aggregate/headBy.md) to return the first two test values and [`tail_by`](../reference/table-operations/group-and-aggregate/tailBy.md) to return the last two test values (`num_rows=2`). The results are grouped by `Name`.

```python test-set=1 order=head,tail
head = source.head_by(2, by=["Name"])
tail = source.tail_by(2, by=["Name"])
```

### `count_by`

In this example, we want to know the number of tests each student completed. [`count_by`](../reference/table-operations/group-and-aggregate/countBy.md) returns the number of rows in the table as grouped by `Name` and stores that in a new column, `NumTests`.

```python test-set=1
count = source.count_by("NumTests", by=["Name"])
```

## Summary statistics aggregators

In the following examples, we start with the same source table containing students' test results as used above.

:::caution

Applying these aggregations to a column where the average cannot be computed will result in an error. For example, the average is not defined for a column of string values. For more information on removing columns from a table, see [`drop_columns`](../reference/table-operations/select/drop-columns.md). The syntax for using [`drop_columns`](../reference/table-operations/select/drop-columns.md) is:

```
result = source.drop_columns(cols=["Col1", "Col2"]).sum_by(by=["Col3", "Col4"])
```

:::

### `sum_by`

In this example, [`sum_by`](../reference/table-operations/group-and-aggregate/sumBy.md) calculates the total sum of test scores for each `Name`. Because a sum cannot be computed for the string column `Subject`, this column is dropped before applying [`sum_by`](../reference/table-operations/group-and-aggregate/sumBy.md).

```python test-set=1
sum_table = source.drop_columns(cols=["Subject"]).sum_by(by=["Name"])
```

### `avg_by`

In this example, [`avg_by`](../reference/table-operations/group-and-aggregate/avgBy.md) calculates the average (mean) of test scores for each `Name`. Because an average cannot be computed for the string column `Subject`, this column is dropped before applying [`avg_by`](../reference/table-operations/group-and-aggregate/avgBy.md).

```python test-set=1
mean = source.drop_columns(cols=["Subject"]).avg_by(by=["Name"])
```

### `std_by`

In this example, [`std_by`](../reference/table-operations/group-and-aggregate/stdBy.md) calculates the sample standard deviation of test scores for each `Name`. Because a sample standard deviation cannot be computed for the string column `Subject`, this column is dropped before applying [`std_by`](../reference/table-operations/group-and-aggregate/stdBy.md).

```python test-set=1
std_dev = source.drop_columns(cols=["Subject"]).std_by(by=["Name"])
```

### `var_by`

In this example, [`var_by`](../reference/table-operations/group-and-aggregate/varBy.md) calculates the sample variance of test scores for each `Name`. Because sample variance cannot be computed for the string column `Subject`, this column is dropped before applying [`var_by`](../reference/table-operations/group-and-aggregate/varBy.md).

```python test-set=1
var = source.drop_columns(cols=["Subject"]).var_by(by=["Name"])
```

### `median_by`

In this example, [`median_by`](../reference/table-operations/group-and-aggregate/medianBy.md) calculates the median of test scores for each `Name`. Because a median cannot be computed for the string column `Subject`, this column is dropped before applying [`median_by`](../reference/table-operations/group-and-aggregate/medianBy.md).

```python test-set=1
median = source.drop_columns(cols=["Subject"]).median_by(by=["Name"])
```

### `min_by`

In this example, [`min_by`](../reference/table-operations/group-and-aggregate/minBy.md) calculates the minimum of test scores for each `Name`. Because a minimum cannot be computed for the string column `Subject`, this column is dropped before applying [`min_by`](../reference/table-operations/group-and-aggregate/minBy.md).

```python test-set=1
minimum = source.drop_columns(cols=["Subject"]).min_by(by=["Name"])
```

### `max_by`

In this example, [`max_by`](../reference/table-operations/group-and-aggregate/maxBy.md) calculates the maximum of test scores for each `Name`. Because a maximum cannot be computed for the string column `Subject`, this column is dropped before applying [`max_by`](../reference/table-operations/group-and-aggregate/maxBy.md) .

```python test-set=1
maximum = source.drop_columns(cols=["Subject"]).max_by(by=["Name"])
```

## Related documentation

- [How to create multiple summary statistics for groups](./combined-aggregations.md)
- [`avg_by`](../reference/table-operations/group-and-aggregate/avgBy.md)
- [`count_by`](../reference/table-operations/group-and-aggregate/countBy.md)
- [`drop_columns`](../reference/table-operations/select/drop-columns.md)
- [`first_by`](../reference/table-operations/group-and-aggregate/firstBy.md)
- [`head_by`](../reference/table-operations/group-and-aggregate/headBy.md)
- [`last_by`](../reference/table-operations/group-and-aggregate/lastBy.md)
- [`max_by`](../reference/table-operations/group-and-aggregate/maxBy.md)
- [`median_by`](../reference/table-operations/group-and-aggregate/medianBy.md)
- [`min_by`](../reference/table-operations/group-and-aggregate/minBy.md)
- [`std_by`](../reference/table-operations/group-and-aggregate/stdBy.md)
- [`sum_by`](../reference/table-operations/group-and-aggregate/sumBy.md)
- [`tail_by`](../reference/table-operations/group-and-aggregate/tailBy.md)
- [`var_by`](../reference/table-operations/group-and-aggregate/varBy.md)
