---
id: downsampling
title: How to downsample data
sidebar_label: Downsample data
---

This guide will show you how to downsample data in Deephaven. Downsampling is done in Deephaven by deciding how to group your data, and then using an appropriate aggregation on the grouped data.

## Downsampling categorical data

Let's say we have a data set used to track credit card purchases. Each entry in this dataset has a purchase amount and a purchase category.

This example shows how to downsample this type of data by using [`sum_by`](../reference/table-operations/group-and-aggregate/sumBy.md) on the purchase category column.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    int_col("PurchasePrice", [30, 45, 35, 55, 25, 35]),
    string_col("PurchaseCategory", ["Groceries", "Utilities", "Utilities", "Dining", "Groceries", "Dining"])
])

result = source.sum_by(by=["PurchaseCategory"])
```

The resulting data set is smaller than the source, which achieves one of the main goals of downsampling. Categorical data is easy to downsample because we already have the data separated into discrete and expected categories.

## Downsampling time data

Now we've decided to add a [date-time](../reference/query-language/types/date-time.md) stamp to our purchases data, and we want to sum them by the day and the category. How can we downsample this data now that we have a column that will almost always be a unique value?

Deephaven has two built-in methods, [`lowerBin`](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#lowerBin(java.time.ZonedDateTime,long)>) and [`upperBin`](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#upperBin(java.time.ZonedDateTime,long)>), that group our date-time data into bins. Bin intervals can be any timed value, such as a second, minute, hour, day, and so on.

This example shows how to bin our data by the day, and then use [`sum_by`](../reference/table-operations/group-and-aggregate/sumBy.md) to downsample the data. The bin operations use nanoseconds, so we are binning by one day and offsetting by five hours.

:::note

Because we are using [`sum_by`](../reference/table-operations/group-and-aggregate/sumBy.md) to aggregate our data, we need to make sure to drop all columns that are not being either summed or used to group data.

:::

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col, datetime_col
from deephaven.time import to_j_instant

t1 = to_j_instant("2021-01-01T01:00:00 ET")
t2 = to_j_instant("2021-01-01T05:00:00 ET")
t3 = to_j_instant("2021-01-01T10:00:00 ET")
t4 = to_j_instant("2021-01-02T01:00:00 ET")
t5 = to_j_instant("2021-01-02T05:00:00 ET")
t6 = to_j_instant("2021-01-02T10:00:00 ET")

source = new_table([
    int_col("PurchasePrice", [30, 45, 35, 55, 25, 35]),
    string_col("PurchaseCategory", ["Groceries", "Utilities", "Utilities", "Dining", "Groceries", "Dining"]),
    datetime_col("TimeStamps", [t1, t2, t3, t4, t5, t6])
])

result = source\
    .update(["TimeStampsBinned = lowerBin(TimeStamps, 24 * HOUR, 5 * HOUR)"])\
    .drop_columns(cols=["TimeStamps"])\
    .sum_by(by=["PurchaseCategory", "TimeStampsBinned"])
```