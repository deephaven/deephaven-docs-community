---
id: datetime-cheat-sheet
title: Time operations cheat sheet
sidebar_label: Time operations
---

## Formats

### hh:mm:ss

Deephaven [time tables](../table-operations/create/timeTable.md) use timestamps in the format of a [Duration](../../reference/query-language/types/durations.md) to specify ticking intervals.

```python order=null ticking-table
from deephaven import time_table

result = time_table("PT1S")
```

### yyyy-mm-ddT:hh:mm:ss.[millis|micros|nanos] TZ

Deephaven [time tables](../table-operations/create/timeTable.md) may also use the `yyyy-mm-ddT:hh:mm:ss.[millis|micros|nanos] TZ` format to specify a start date.

`TZ` represents the time zone. A few examples are:

- `UTC`
- `ET` (America/New York)
- `PT` (America/Los Angeles)

```python order=null ticking-table
from deephaven import time_table

result = time_table("PT1S", "2021-08-06T13:21:00 ET")
```

## Convert string to Deephaven date-time object

Deephaven supports converting a string to a Deephaven date-time object via the `to_j_instant` or `to_j_zdt` method.

Strings should be in the `yyyy-mm-ddT:hh:mm:ss.[millis|micros|nanos] TZ` format.

```python
from deephaven.time import to_j_instant

datetime_object = to_j_instant("2021-07-04T08:00:00 ET")
```

## Date-time columns

Deephaven tables have built-in support for Deephaven date-time objects via the [`datetime_col`](../table-operations/create/dateTimeCol.md) method.

```python
from deephaven.time import to_j_instant
from deephaven import new_table
from deephaven.column import datetime_col

first_time = to_j_instant("2021-07-04T08:00:00 ET")
second_time = to_j_instant("2021-09-06T12:30:00 ET")
third_time = to_j_instant("2021-12-25T21:15:00 ET")

result = new_table([
    datetime_col("DateTimes", [first_time, second_time, third_time])
])
```

## Timestamp comparison

Deephaven's filtering has support for timestamp comparisons.

:::note

Query strings require single quotes `'` around timestamps.

:::

```python order=result,filtered
from deephaven.time import to_j_instant
from deephaven import new_table
from deephaven.column import datetime_col

first_time = to_j_instant("2021-07-04T08:00:00 ET")
second_time = to_j_instant("2021-09-06T12:30:00 ET")
third_time = to_j_instant("2021-12-25T21:15:00 ET")
result = new_table([
    datetime_col("DateTimes", [first_time, second_time, third_time])
])
filtered = result.where(filters=["DateTimes >= '2021-09-06T12:30:00 ET'"])
```

See our [How to use filters](../../how-to-guides/use-filters.md) guide for more information.

## Time zones

```python
from deephaven.time import dh_time_zone, to_j_instant

system_tz = dh_time_zone()

print(system_tz)
```

See our full list of [time zones](https://deephaven.io/core/javadoc/io/deephaven/time/TimeZone.html)

## Downsampling temporal data via time binning

Downsampling time series data may be accomplished by calculating binning-intervals for time values and using appropriate aggregation methods, grouped by the binned interval.

```python order=data_table,binned_table,grouped_upper,grouped_lower
from deephaven.time import to_j_instant
from deephaven import new_table
from deephaven.column import datetime_col, int_col
from deephaven import agg

first_time = to_j_instant("2021-09-06T12:29:58 ET")
second_time = to_j_instant("2021-09-06T12:30:00 ET")
third_time = to_j_instant("2021-09-06T12:30:01 ET")
fourth_time = to_j_instant("2021-09-06T12:30:05 ET")
fifth_time = to_j_instant("2021-09-06T12:30:09 ET")
data_table = new_table([
    datetime_col("DateTimes", [first_time, second_time, third_time, fourth_time, fifth_time]),
    int_col("DataCol", [0, 1, 2, 3, 4]),
])
binned_table = data_table.update_view(formulas=["UpperBin=upperBin(DateTimes, 5 * SECOND)", "LowerBin=lowerBin(DateTimes, 5 * SECOND)"])

grouped_upper = binned_table.agg_by([agg.first(cols=["FirstDateTime=DateTimes"])], by=["UpperBin"])

grouped_lower = binned_table.agg_by([agg.first(cols=["FirstDateTime=DateTimes"])], by=["LowerBin"])
```
