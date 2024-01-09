---
id: work-with-date-time
title: How to work with date-times
sidebar_label: Work with date-times
---

This guide will show you how to work with [date-times](../reference/query-language/types/date-time.md). This is particularly important for time-series use cases, which are very common in Deephaven queries.

## Date and time measurement

There are several possible ways to describe and measure dates and times.

### Specific date-times

Deephaven uses [`java.time.Instant`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/Instant.html) to represent specific points in time to the nearest nanosecond.

To see the current date and time on your system, run the following:

```python order=null
from deephaven.time import dh_now

print(dh_now())
```

This will print out a date and time in the default format, such as `2021-09-09T11:58:41.041000000 ET`. The default format consists of the following fields:

`yyyy-MM-ddThh:mm:ss.ffffff TZ`

- `yyyy` - the year
- `MM` - the month
- `dd` - the day
- `T` - the separator between the date and time
- `hh` - the hour of the day
- `mm` - the minute of the hour
- `ss` - the second of the minute
- `ffffff` - the fraction of a second
- `TZ` - the time zone

Deephaven stores [date-times](../reference/query-language/types/date-time.md) using the [`java.time.Instant`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/Instant.html) class. Internally, this stores the date-time as a signed 64-bit long, which contains the number of nanoseconds since the Unix epoch (January 1, 1970, 00:00:00 GMT). You can create these directly (like in the code [above](#specific-date-times)) and use dates and times directly in the query language, including adding and subtracting them.

<!--

The following example shows the creation of two specific points in time, `time1` and `time2`, exactly one year apart from each other. We then calculate the difference between these two date/time instances, resulting in 31,536,000,000,000,000 nanos (there are 31,536,000 seconds in a year).

```python
from deephaven.time import to_j_instant

time1 = to_j_instant("2020-08-01T12:00:00 ET")
time2 = to_j_instant("2021-08-01T12:00:00 ET")

time_diff = diff_nanos(time1, time2)
print(time_diff)
```

-->

### Local dates and times

A local date is a date without a time or time zone. A local time is the time that would be read from a clock and does not have a date or time zone.

### Periods and Durations

Periods and durations represent spans of time that can be either positive or negative. A period represents a span of time that is greater than one day - lengths of time one would normally count on a calendar. A duration represents a span of time that is less than one day in length - spans of time one would normally count on a clock (but accurate down to the millisecond!). Deephaven implements periods using the [`Period`](../reference/query-language/types/periods.md) class, and durations using the [`Duration`](../reference/query-language/types/durations.md) class.

Durations are prefixed by a `PT`, whereas periods are prefixed by the letter `P`.

Duration strings can be formatted either as `"PT00h00m00.0000000s"` or `"PT00:00:00.0000000"`. The `h/m/s` delimiters are not case-sensitive.

The following query demonstrates several query operations using [periods](../reference/query-language/types/periods.md) and [durations](../reference/query-language/types/durations.md).

:::note

In the example below, we've set the default format for `Timestamp` columns to `YYYY-MM-DDThh:mm:ss.fff`. See [How to set date-time format](./set-date-time-format.md) to learn how.

:::

```python order=source,result1,result2,result3,result4
from deephaven.time import to_j_instant, to_j_duration, to_j_period
from deephaven import empty_table

base_time = to_j_instant("2023-01-01T00:00:00 UTC")

source = empty_table(10).update(["Timestamp = base_time + i * SECOND"])
hour_duration = to_j_duration("PT1H")
day_period = to_j_period("P1D")
result1 = source.update(formulas=["TS2 = plus(Timestamp, hour_duration)"])
result2 = source.update(formulas=["TS2 = plus(Timestamp, day_period)"])
result3 = source.update(formulas=["TS2 = Timestamp + 'PT1H'"])
result4 = source.update(formulas=["TS2 = Timestamp + 'P-1D'"])
```

The above example creates a `source` table from an [`Instant`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/Instant.html) called `base_time`. Each row of the `source` table is one second after the previous. A one hour duration and one day period are then instantiated. From there, four resultant tables are derived from `source`:

- `result1` uses the query language's built-in `plus` method to add `hour_duration` to `Timestamp`, so the `TS2` column contains timestamps one hour after those in the `Timestamp` column.
- `result2` uses the same built-in `plus` method, but adds `day_period` instead. Thus, `TS2` contains timestamps one day after those in the `Timestamp` column.
- `result3` uses the overloaded `+` operator to add a one hour duration to `Timestamp` again. Thus, `TS2` looks identical to that in the `result1` table.
- `result4` uses the overloaded `+` operator to add a negative day-long period to `Timestamp`. Thus, `TS2` looks identical to that in the `result2` table.

Durations use the following suffixes for different units of time:

- `-`: Negative
- `H`: Hour
- `M`: Minute
- `S`: Second

Alternatively, the `H/M/S` delimiters can be replaced with a colon (`:`). For example, `PT1H1M1S` is equivalent to `PT1:01:01`.

Periods use the following suffixes for different units of time:

- `-`: Negative
- `Y`: Year
- `M`: Month
- `D`: Day

For example, a duration of `PT1H1M-1S` means one second short of one hour and one minute. Equivalently, a period of `P1Y1M-1D` means one day short of one year and one month.

<!--

The following example creates an instant, then adds a positive and negative period and duration to it.

```python
from deephaven.time import to_j_instant, to_j_period, to_j_duration, plus_periodFIXME:

time1 = to_j_instant("2020-04-01T12:00:00 ET")

pos_period = to_j_period("P5D")
neg_period = to_j_period("P-5D")
pos_duration = to_j_duration("PT1H1M1S")
neg_duration = to_j_duration("PT-5H1M5S")

print(plus_period(time1, pos_period))
print(plus_period(time1, neg_period))
print(plus_period(time1, pos_duration))
print(plus_period(time1, neg_duration))
```

-->

<!--

## Time zones

FIXME: find new time zone DH stuff, rewrite this part
Deephaven uses its own `TimeZone` class to store time zone information. Time zones in instants use abbreviations, such as `ET` for US Eastern time, `UTC` or `Z` for coordinated universal time (UTC), etc.

```python
from deephaven.time import time_zone

print(time_zone("ET"))
print(time_zone("PT"))
print(time_zone("UTC"))
```

By default, Deephaven uses the US Eastern time zone (`"America/New_York"`) as the time zone for database operations. For example, when writing a CSV from a table which includes [`DateTime`](https://deephaven.io/core/javadoc/io/deephaven/time/DateTime.html) columns, the New York time zone will be used unless a different time zone is passed in to the [`write_csv`](../reference/data-import-export/CSV/writeCsv.md) call.

The following example prints a time in the Denver time zone, and in the New York time zone. The printed values end with `Z` (UTC), so the two hour difference between the two time zones is apparent.

```python order=null
from deephaven.time import to_j_instant

time1 = to_j_instant("2021-01-01T01:00 ET")
time2 = to_j_instant("2021-01-01T01:00 MT")

print(time1)
print(time2)
```

-->

## Utility methods

There are numerous methods that can be used to create, manipulate, and gather information about [date-times](../reference/query-language/types/date-time.md), periods, and time/durations. All of the functions handle null values.

These methods are automatically imported by default when using Groovy as your scripting language. When using Python, you'll need to include the `from deephaven.time` statement in the query to import the [module](https://deephaven.io/core/pydoc/code/deephaven.time.html).

:::note

Specific functions from [`time`](https://deephaven.io/core/javadoc/io/deephaven/time/package-summary.html), such as [`dh_now`](../reference/time/datetime/dh_now.md), can be imported into Python and then referenced directly. For example:

`from deephaven.time import dh_now`
:::

| Method                                                                                | Description                                                      |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [`dh_now(system, resolution)`](../reference/time/datetime/dh_now.md)                  | Provides the current datetime.                                   |
| [`dh_time_zone`](../reference/time/datetime/dh_time_zone.md)                          | Provides the current Deephaven system time zone.                 |
| [`dh_today`](../reference/time/datetime/dh_today.md)                                  | Provides the current date string according to the current clock. |
| [`time_zone_alias_add(alias, tz)`](../reference/time/datetime/time_zone_alias_add.md) | Adds a new time zone alias.                                      |
| [`time_zone_alias_rm(alias)`](../reference/time/datetime/time_zone_alias_rm.md)       | Removes a time zone alias.                                       |
| [`to_date`](../reference/time/datetime/to_date.md)                                    | Converts a Java date-time to a datetime.date.                    |
| [`to_datetime`](../reference/time/datetime/to_datetime.md)                            | Converts a Java date-time to a datetime.datetime.                |
| [`to__j_duration`](../reference/time/datetime/to_j_duration.md)                       | Converts a time duration value to a Java Duration.               |
| [`to_j_instant`](../reference/time/datetime/to_j_instant.md)                          | Converts a date-time value to a Java Instant.                    |
| [`to_j_local_date`](../reference/time/datetime/to_j_local_date.md)                    | Converts a date-time value to a Java LocalDate.                  |
| [`to_j_local_time`](../reference/time/datetime/to_j_local_time.md)                    | Converts a date-time value to a Java LocalTime.                  |
| [`to_j_period`](../reference/time/datetime/to_j_period.md)                            | Converts a time-duration value to a Java Period.                 |
| [`to_j_time_zone`](../reference/time/datetime/to_j_time_zone.md)                      | Converts a time zone value to a Java TimeZone.                   |
| [`to_j_zdt`](../reference/time/datetime/to_j_zdt.md)                                  | Converts a date-time value to a Java ZonedDateTime.              |
| [`to_np_datetime64`](../reference/time/datetime/to_np_datetime64.md)                  | Converts a Java date time to a numpy.datetime64.                 |
| [`to_np_timedelta64`](../reference/time/datetime/to_np_timedelta64.md)                | Converts a Java time durationto a numpy.timedelta64.             |
| [`to_pd_timedelta`](../reference/time/datetime/to_pd_timedelta.md)                    | Converts a Java time duration to a pandas.Timedelta.             |
| [`to_pd_timestamp`](../reference/time/datetime/to_pd_timestamp.md)                    | Converts a Java date time to a pandas.Timestamp.                 |
| [`to_time`](../reference/time/datetime/to_time.md)                                    | Converts a Java date time to a datetime.time.                    |
| [`to_timedelta`](../reference/time/datetime/to_timedelta.md)                          | Converts a Java time duration to a datetime.timedelta.           |

See the [date-time reference section](../reference/time/datetime/dh_now.md) for more information.

<!--TODO: update with an appropriate overview link-->

## Examples

In this section, we create a table to contain events, then demonstrate the date and time methods described above.

:::note

The examples in this section depend upon the `events` table.

:::

First, we create a simple table with four rows. Note: our times are all based in NY.

```python test-set=1
from deephaven import new_table
from deephaven.column import string_col, datetime_col
from deephaven.time import to_j_instant

time1 = to_j_instant("2020-04-01T09:00:00 ET")
time2 = to_j_instant("2020-04-01T10:28:32 ET")
time3 = to_j_instant("2020-04-01T12:00:00 ET")
time4 = to_j_instant("2020-04-01T16:59:59 ET")

events = new_table([
   datetime_col("EventDateTime", [time1, time2, time3, time4]),
   string_col("Level", ["Info", "Error", "Warning", "Info"]),
   string_col("Event", ["System starting", "Something bad happened", "Invalid login", "System stopping"]),
])
```

The following query returns all events after 10AM 2020-04-01. Note that comparison [operators](../reference/query-language/formulas/operators.md) on [date-times](../reference/query-language/types/date-time.md) are supported in query language strings. In order to use a comparison [operator](../reference/query-language/formulas/operators.md) on a date-time string, the date-time string must be wrapped in single quotes `’`.

```python test-set=1
events_after_ten = events.where(filters=["EventDateTime > '2020-04-01T10:00 ET'"])
```

:::note

To construct [date-times](../reference/query-language/types/date-time.md) in Deephaven query expressions, use the single quote.

:::

The following example returns all events between 10AM - 4PM on 2020-04-01, using a [formula](../reference/query-language/formulas/formulas.md) within the query [string](../reference/query-language/types/strings.md).

```python test-set=1
events_middle_day_1 = events.where(filters=["EventDateTime >= '2020-04-01T10:00 ET' && EventDateTime <= '2020-04-01T16:00 ET'"])
```

The following example returns all dates between 10AM - 4PM on 2020-04-01, using the `inRange` method.

```python test-set=1
events_middle_day_2 = events.where(filters=["inRange(EventDateTime, '2020-04-01T10:00 ET', '2020-04-01T16:00 ET')"])
```

<!-- TODO: link inRange once primitive library is updated https://github.com/deephaven/deephaven-core/issues/72 -->

[Date-times](../reference/query-language/types/date-time.md) support simple operands as well. The following example filters the table to a 10AM starting time, with an ending time of that plus six hours.

```python test-set=1
base_time = to_j_instant("2020-04-01T10:00:00 ET")
events_middle_day_3 = events.where(filters=["EventDateTime >= '2020-04-01T10:00 ET' && EventDateTime <= (base_time + 6 * HOUR)"])
```

The following example recreates the table from our earlier example, and then creates a table with a new column consisting of the hour of the day in which the events occurred, in the UTC time zone.

```python test-set=1 order=events,events_with_UTC_hour
from deephaven import new_table
from deephaven.column import string_col, datetime_col
from deephaven.time import to_j_instant, to_j_time_zone

time1 = to_j_instant("2020-04-01T09:00:00 ET")
time2 = to_j_instant("2020-04-01T10:28:32 ET")
time3 = to_j_instant("2020-04-01T12:00:00 ET")
time4 = to_j_instant("2020-04-01T16:59:59 ET")

events = new_table([
   datetime_col("EventDateTime", [time1, time2, time3, time4]),
   string_col("Level", ["Info", "Error", "Warning", "Info"]),
   string_col("Event", ["System starting", "Something bad happened", "Invalid login", "System stopping"]),
])

tz = to_j_time_zone("UTC")

events_with_UTC_hour = events.update(formulas=["HourOfDayUTC = hourOfDay(EventDateTime, tz)"])
```

The following example creates a table showing the event's offset in millis after midnight New York time, first using a variable, then by performing the midnight calculation directly in the formula.

```python test-set=1 order=events_with_offset_1,events_with_offset_2
from deephaven.time import to_j_time_zone, to_j_instant

et = to_j_time_zone("ET")

midnight = to_j_instant("2020-04-01T00:00:00 ET")

events_with_offset_1 = events.update(formulas=["OffsetMillis = (EventDateTime - midnight) / 1_000_000"])
events_with_offset_2 = events.update(formulas=["OffsetMillis = (EventDateTime - atMidnight(EventDateTime, et)) / 1_000_000"])
```

## Related documentation

- [How to use filters](./use-filters.md)
- [How to work with strings](./work-with-strings.md)
- [date-time](../reference/query-language/types/date-time.md)
- [update](../reference/table-operations/select/update.md)
- [where](../reference/table-operations/filter/where.md)
