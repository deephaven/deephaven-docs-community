---
id: work-with-date-time
title: How to work with date-times
sidebar_label: Work with date-times
---

This guide will show you how to work with [date-times](../reference/query-language/types/date-time.md). This is particularly important for time-series use cases, which are very common in Deephaven queries.

## Date and time measurement

There are several possible ways to describe and measure dates and times.

### Specific date-times

Deephaven uses [`java.time.Instant`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/Instant.html) to represent specific points in time in queries. An Instant is accurate to the nearest nanosecond.

To see the current date and time on your system, run the following:

```groovy
println now()
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

Deephaven stores [dates-times](../reference/query-language/types/date-time.md) using the [`java.time.Instant`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/Instant.html) class. Internally, this stores the date-time as a signed 64-bit long, which contains the number of nanoseconds since the Unix epoch (January 1, 1970, 00:00:00 GMT). You can create these directly (like in the code [above](#specific-date-times)) and use dates and times directly in the query language, including adding and subtracting them.

The following example shows the creation of two specific points in time, `time1` and `time2`, exactly one year apart from each other. We then calculate the difference between these two date/time instances, resulting in 31,536,000,000,000,000 nanos (there are 31,536,000 seconds in a year).

```groovy
time1 = parseInstant("2020-08-01T12:00:00 ET")
time2 = parseInstant("2021-08-01T12:00:00 ET")

timeDiff = diffNanos(time2, time1)
println timeDiff
```

### Periods and Durations

Periods and durations represent spans of time that can be either positive or negative. A period represents a span of time that is greater than one day - lengths of time one would normally count on a calendar. A duration represents a span of time that is less than one day in length - spans of time one would normally count on a clock (but accurate down to the millisecond!). Deephaven implements periods using the [`Period`](https://deephaven.io/core/javadoc/io/deephaven/time/Period.html) class, and durations using the `Duration` class.

Durations are prefixed by a `PT`, whereas Periods are prefixed by the letter `P`.

The following query demonstrates several query operations using periods and durations.

:::note

In the example below, we've set the default format for `Timestamp` columns to `YYYY-MM-DDThh:mm:ss.fff`. See [How to set date-time format](./set-date-time-format.md) to learn how.

:::

```groovy ticking-table order=source,result1,result2,result3,result4
base_time = parseInstant("2023-01-01T00:00:00 UTC")

source = emptyTable(10).update("Timestamp = base_time + i * SECOND")
hour_duration = parseDuration("PT1H")
day_period = parsePeriod("P1D")
result1 = source.update("TS2 = plus(Timestamp, hour_duration)")
result2 = source.update("TS2 = plus(Timestamp, day_period)")
result3 = source.update("TS2 = Timestamp + 'PT1H'")
result4 = source.update("TS2 = Timestamp + 'P-1D'")
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

Periods use the following suffixes for different units of time:

- `-` - Negative
- `Y` - Year
- `M` - Month
- `D` - Day

For example, a duration of `PT1H1M-1S` means one second short of one hour and one minute. Equivalently, a period of `P1Y1M-1D` means one day short of one year and one month.

The following example creates an instant, then adds a positive and negative period and duration to it.

```groovy order=null
time1 = parseInstant("2020-04-01T12:00:00 ET")

posPeriod = parsePeriod("P5D")
negPeriod = parsePeriod("P-5D")
posDuration = parseDuration("PT1H1M1S")
negDuration = parseDuration("PT-5H1M5S")


println plus(time1, posPeriod)
println plus(time1, negPeriod)
println plus(time1, posDuration)
println plus(time1, negDuration)
```

## Time zones

Deephaven uses its own `TimeZone` class to store time zone information. Time zones in instants use abbreviations, such as `ET` for US Eastern time, `UTC` or `Z` for coordinated universal time (UTC), etc.

```groovy order=null
println timeZone("ET")
println timeZone("PT")
println timeZone("UTC")
```

By default, Deephaven uses the US East time zone (`"America/New_York"`) as the time zone for database operations. For example, when writing a CSV from a table which includes [`DateTime`](https://deephaven.io/core/javadoc/io/deephaven/time/DateTime.html) columns, the New York time zone will be used unless a different time zone is passed in to the [`write_csv`](../reference/data-import-export/CSV/writeCsv.md) call.

The following example prints a time in the Denver time zone and in the New York time zone. The printed values end with `Z` (UTC), so the two-hour difference between the two time zones is apparent.

```groovy order=null
time1 = parseInstant("2021-01-01T01:00 ET")
time2 = parseInstant("2021-01-01T01:00 MT")

println time1
println time2
```

## Predefined date-time variables

Deephaven provides a number of predefined date/time variables which represent specified time periods in nanoseconds. These can be used in formulas.

Predefined [date-time](../reference/query-language/types/date-time.md) variables are:

- `YEAR_365`
- `YEAR_AVG`
- `WEEK`
- `DAY`
- `HOUR`
- `MINUTE`
- `SECOND`

The following example shows these variables and how to use them, both in a simple calculation and when manipulating a table. Notice that the timestamps in TS2 are one minute after the timestamps in the original table. A user will not typically call [`plus`](../reference/time/datetime/plus.md) directly; the Deephaven Query Language will do that automatically when times are summed, as in the `source`/`result` part of the example.

```groovy order=source,result
println YEAR_365
println YEAR_AVG
println WEEK
println DAY
println HOUR
println MINUTE
println SECOND

time1 = parseInstant("2020-04-01T12:00:00 ET")
time2 = plus(time1, WEEK)
println time1
println time2

source = timeTable("PT1S")

result = source.update("TS2 = Timestamp + MINUTE")
```

## Utility methods

There are numerous static methods that can be used to create, manipulate, and gather information about [date-times](../reference/query-language/types/date-time.md), periods, and time/durations. All of the functions handle null values.

These methods are automatically imported by default when using Groovy as your scripting language. When using Python, you'll need to include the `from deephaven import DateTimeUtils` statement in the query to import the [`DateTimeUtils`](https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html) module.

| Method                                                                                              | Description                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`atMidnight(instant, timeZone)`](../reference/time/datetime/atMidnight.md)                         | Returns a date-time for the requested date-time at midnight in the specified time zone.                                                                                                              |
| [`currentClock()`](../reference/time/datetime/currentClock.md)                                      | Returns the clock used to compute the current time.                                                                                                                                                  |
| [`dayOfMonth(instant, timeZone)`](../reference/time/datetime/dayOfMonth.md)                         | Returns the day of the month of the specified date-time and time zone.                                                                                                                               |
| [`dayOfWeek(instant, timeZone)`](../reference/time/datetime/dayOfWeek.md)                           | Returns the day of the week of the specified date-time and time zone (1 = Monday, 7 = Sunday).                                                                                                       |
| [`dayOfYear(instant, timeZone)`](../reference/time/datetime/dayOfYear.md)                           | Returns the day of the year (Julian date) of the specified date-time and time zone.                                                                                                                  |
| [`diffDays(start, end)`](../reference/time/datetime/diffDays.md)                                    | Calculates the difference between two date-times in days. Both values must be of the same type.                                                                                                      |
| [`diffMicros(start, end)`](../reference/time/datetime/diffMicros.md)                                | Calculates the difference between two date-times in microseconds. Both values must be of the same type.                                                                                              |
| `diffMillis(start, end)`                                                                            | Calculates the difference between two date-times in milliseconds. Both values must be of the same type.                                                                                              |
| [`diffMinutes(start, end)`](../reference/time/datetime/diffMinutes.md)                              | Calculates the difference between two date-times in milliseconds. Both values must be of the same type.                                                                                              |
| [`diffNanos(start, end)`](../reference/time/datetime/diffNanos.md)                                  | Returns the difference in nanoseconds between two DateTime values.                                                                                                                                   |
| [`diffSeconds(start, end)`](../reference/time/datetime/diffSeconds.md)                              | Calculates the difference between two date-times in seconds. Both values must be of the same type.                                                                                                   |
| [`diff_years_365(start, end)`](../reference/time/datetime/diffYears365.md)                          | Calculates the difference between two date-times in years. Years are defined in terms of 365 day years. Both values must be of the same type.                                                        |
| [`diff_years_avg(start, start)`](../reference/time/datetime/diffYearsAvg.md)                        | Calculates the difference between two date-times in years. Years are defined in terms of 365.2425 day years. Both values must be of the same type.                                                   |
| [`epochAutoToEpochNanos(epochOffset)`](../reference/time/datetime/epochAutoToEpochNanos.md)         | Converts an offset from the Epoch to a nanoseconds from the Epoch. The offset can be in milliseconds, microseconds, or nanoseconds. Expected date ranges are used to infer the units for the offset. |
| [`epochAutoToInstant(epochOffset)`](../reference/time/datetime/epochAutoToInstant.md)               | Converts an offset from the Epoch to an Instant. The offset can be in milliseconds, microseconds, or nanoseconds. Expected date ranges are used to infer the units for the offset.                   |
| [`epochAutoToZonedDateTime(epochOffset)`](../reference/time/datetime/epochAutoToZonedDateTime.md)   | Converts an offset from the Epoch to a ZonedDateTime. The offset can be in milliseconds, microseconds, or nanoseconds. Expected date ranges are used to infer the units for the offset.              |
| [`epochMicros(instant)`](../reference/time/datetime/epochMicros.md)                                 | Returns microseconds from the Epoch for a date-time value.                                                                                                                                           |
| [`epochMicrosToInstant(micros)`](../reference/time/datetime/epochMicrosToInstant.md)                | Converts a value of microseconds from Epoch in the UTC time zone to a date-time.                                                                                                                     |
| [`epochMicrosToZonedDateTime(micros)`](../reference/time/datetime/epochMicrosToZonedDateTime.md)    | Converts microseconds from the Epoch to a ZonedDateTime.                                                                                                                                             |
| [`epochMillis(instant)`](../reference/time/datetime/epochMillis.md)                                 | Returns milliseconds from the Epoch for a date-time value.                                                                                                                                           |
| [`epochMillisToInstant(millis)`](../reference/time/datetime/epochMillisToInstant.md)                | Converts a value of milliseconds from Epoch in the UTC time zone to a date-time.                                                                                                                     |
| [`epochMillisToZonedDateTime(millis)`](../reference/time/datetime/epochMillisToZonedDateTime.md)    | Converts milliseconds from the Epoch to a ZonedDateTime.                                                                                                                                             |
| [`epochNanos(instant)`](../reference/time/datetime/epochNanos.md)                                   | Returns nanoseconds from the Epoch for an Instant value.                                                                                                                                             |
| [`epochNanosToInstant(nanos)`](../reference/time/datetime/epochNanosToInstant.md)                   | Converts a nanoseconds-since-epoch value to an instant.                                                                                                                                              |
| [`epochNanosToZonedDateTime(nanos)`](../reference/time/datetime/epochNanosToZonedDateTime.md)       | Converts nanoseconds from the Epoch to a ZonedDateTime.                                                                                                                                              |
| [`epochSeconds(instant)`](../reference/time/datetime/epochSeconds.md)                               | Returns seconds from the Epoch for a date-time value.                                                                                                                                                |
| [`epochSecondsToInstant(seconds)`](../reference/time/datetime/epochSecondsToInstant.md)             | Converts a seconds-since-epoch value to an instant.                                                                                                                                                  |
| [`epochSecondsToZonedDateTime(seconds)`](../reference/time/datetime/epochSecondsToZonedDateTime.md) | Converts seconds from the Epoch to a ZonedDateTime.                                                                                                                                                  |
| [`excelToInstant(excel, timeZone)`](../reference/time/datetime/excelToInstant.md)                   | Converts an Excel time represented as a double to an Instant.                                                                                                                                        |
| [`excelToZonedDateTime(excel, timeZone)`](../reference/time/datetime/excelToZonedDateTime.md)       | Converts an Excel time represented as a double to a ZonedDateTime.                                                                                                                                   |
| [`formatDate(instant, timeZone)`](../reference/time/datetime/formatDate.md)                         | Returns a formatted String (date only) for a date-time.                                                                                                                                              |
| [`formatDateTime(instant, timeZone)`](../reference/time/datetime/formatDateTime.md)                 | Returns a string date-time representation formatted as “yyyy-MM-ddThh:mm:ss.SSSSSSSSS TZ”.                                                                                                           |
| [`formatDurationNanos(nanos)`](../reference/time/datetime/formatDurationNanos.md)                   | Returns a nanosecond duration formatted as a `“[-]PThhh:mm:ss.nnnnnnnnn”` string.                                                                                                                    |
| [`hourOfDay(instant, timeZone)`](../reference/time/datetime/hourOfDay.md)                           | Returns the hour of the day for a date-time in the specified time zone. The hour is on a 24 hour clock (0 - 23).                                                                                     |
| [`isAfter(instant1, instant2)`](../reference/time/datetime/isAfter.md)                              | Evaluates whether one date-time value is later than a second date-time value.                                                                                                                        |
| [`isAfterOrEqual(instant1, instant2)`](../reference/time/datetime/isAfterOrEqual.md)                | Evaluates whether one date-time value is later than or equal to a second date-time value. Both values must be of the same type.                                                                      |
| [`isBefore(instant1, instant2)`](../reference/time/datetime/isBefore.md)                            | Evaluates whether one date0time value is before a second date-time value.                                                                                                                            |
| [`isBeforeOrEqual(instant1, instant2)`](../reference/time/datetime/isBeforeOrEqual.md)              | Evaluates whether one date time value is before or equal to a second date time value. Both values must be of the same type.                                                                          |
| [`lowerBin(interval, intervalNanos)`](../reference/time/datetime/lowerBin.md)                       | Returns a date-time value, which is at the starting (lower) end of a time range defined by the interval nanoseconds.                                                                                 |
| [`microsOfMilli`](../reference/time/datetime/microsOfMilli.md)                                      | Returns the number of microseconds that have elapsed since the start of the millisecond represented by the provided dateTime in the specified time zone.                                             |
| [`microsOfSecond(instant, timeZone)`](../reference/time/datetime/microsOfSecond.md)                 | Returns the number of microseconds that have elapsed since the top of the second.                                                                                                                    |
| [`microsToMillis(micros)`](../reference/time/datetime/microsToMillis.md)                            | Converts microseconds to milliseconds.                                                                                                                                                               |
| [microsToNanos`](../reference/time/datetime/microsToNanos.md)                                       | Converts milliseconds to nanoseconds.                                                                                                                                                                |
| `microsToSeconds(micros)`                                                                           | Converts microseconds to seconds.                                                                                                                                                                    |
| [`millisOfDay(dateTime, timeZone)`](../reference/time/datetime/millisOfDay.md)                      | Returns the milliseconds since midnight of the specified date-time and time zone.                                                                                                                    |
| [`millisOfSecond(dateTime, timeZone)`](../reference/time/datetime/millisOfSecond.md)                | Returns the milliseconds since the start of the second of the specified date-time and time zone.                                                                                                     |
| [`millisToMicros(millis)`](../reference/time/datetime/millisToMicros.md)                            | Converts milliseconds to microseconds.                                                                                                                                                               |
| [`millisToNanos(millis)`](../reference/time/datetime/millisToNanos.md)                              | Converts milliseconds to nanoseconds.                                                                                                                                                                |
| [`millisToSeconds(millis)`](../reference/time/datetime/millisToSeconds.md)                          | Converts milliseconds to seconds.                                                                                                                                                                    |
| [`minus`](../reference/time/datetime/minus.md)                                                      | Subtracts one unit of time from another. Multiple overloads.                                                                                                                                         |
| [`minuteOfDay(instant, timeZone)`](../reference/time/datetime/minuteOfDay.md)                       | Returns the minutes since midnight of the specified date-time and time zone.                                                                                                                         |
| [`minuteOfHour(instant, timeZone)`](../reference/time/datetime/minuteOfHour.md)                     | Returns the minutes since the top of the hour of the specified date-time and time zone.                                                                                                              |
| [`monthOfYear(instant, timeZone)`](../reference/time/datetime/monthOfYear.md)                       | Returns the month of the year of the specified date-time and time zone (January=1).                                                                                                                  |
| [`nanosOfDay(instant, timeZone)`](../reference/time/datetime/nanosOfDay.md)                         | Returns the nanoseconds since midnight of the specified date-time and time zone.                                                                                                                     |
| [`nanosOfMilli(instant)`](../reference/time/datetime/nanosOfMilli.md)                               | Returns the number of nanoseconds that have elapsed since the top of the millisecond.                                                                                                                |
| [`nanosOfSecond(instant, timeZone)`](../reference/time/datetime/nanosOfSecond.md)                   | Returns the number of nanoseconds that have elapsed since the top of the second.                                                                                                                     |
|                                                                                                     |
| [`nanosToMicros(nanos)`](../reference/time/datetime/nanosToMicros.md)                               | Returns the microsecond equivalent of the specified nanoseconds.                                                                                                                                     |
| [`nanosToMillis(nanos)`](../reference/time/datetime/nanosToMillis.md)                               | Returns the millisecond equivalent of the specified nanoseconds.                                                                                                                                     |
| [`nanosToSeconds(nanos)`](../reference/time/datetime/nanosToSeconds.md)                             | Returns the second equivalent of the specified nanoseconds.                                                                                                                                          |
| [`now()`](../reference/time/datetime/now.md)                                                        | Provides the current datetime.                                                                                                                                                                       |
| [`nowMillisResolution()`](../reference/time/datetime/nowMillisResolution.md)                        | Provides the current instant with millisecond resolution according to the current clock.                                                                                                             |
| [`nowSystem()`](../reference/time/datetime/nowSystem.md)                                            | Provides the current instant with nanosecond resolution according to the system clock.                                                                                                               |
| [`nowSystemMillisResolution()`](../reference/time/datetime/nowSystemMillisResolution.md)            | Provides the current instant with millisecond resolution according to the system clock.                                                                                                              |
| [`parseDuration(s)`](../reference/time/datetime/parseDuration.md)                                   | Parses the string argument as a duration, which is a unit of time in terms of clock time (24-hour days, hours, minutes, seconds, and nanoseconds).                                                   |
| [`parseDurationNanos(s)`](../reference/time/datetime/parseDurationNanos.md)                         | Parses the string argument as a time duration in nanoseconds.                                                                                                                                        |
| [`parseDurationNanosQuiet(s)`](../reference/time/datetime/parseDurationNanosQuiet.md)               | Parses the string argument as a time duration in nanoseconds.                                                                                                                                        |
| [`parseDurationQuiet(s)`](../reference/time/datetime/parseDurationQuiet.md)                         | Parses the string argument as a duration, which is a unit of time in terms of clock time (24-hour days, hours, minutes, seconds, and nanoseconds).                                                   |
| [`parseEpochNanos(s)`](../reference/time/datetime/parseEpochNanos.md)                               | Parses the string argument as nanoseconds since the Epoch.                                                                                                                                           |
| [`parseEpochNanosQuiet(s)`](../reference/time/datetime/parseEpochNanosQuiet.md)                     | Parses the string argument as a nanoseconds since the Epoch.                                                                                                                                         |
| [`parseInstant(s)`](../reference/time/datetime/parseInstant.md)                                     | Parses the string argument as an Instant.                                                                                                                                                            |
| [`parseInstantQuiet(s)`](../reference/time/datetime/parseInstantQuiet.md)                           | Parses the string argument as an Instant.                                                                                                                                                            |
| [`parseLocalDate(s)`](../reference/time/datetime/parseLocalDate.md)                                 | Parses the string argument as a local date, which is a date without a time or time zone.                                                                                                             |
| [`parseLocalDateQuiet(s)`](../reference/time/datetime/parseLocalDateQuiet.md)                       | Parses the string argument as a local date, which is a date without a time or time zone.                                                                                                             |
| [`parseLocalTime(s)`](../reference/time/datetime/parseLocalTime.md)                                 | Parses the string argument as a local time, which is the time that would be read from a clock and does not have a date or timezone.                                                                  |
| [`parseLocalTimeQuiet(s)`](../reference/time/datetime/parseLocalTimeQuiet.md)                       | Parses the string argument as a local time, which is the time that would be read from a clock and does not have a date or timezone.                                                                  |
| [`parsePeriod(s)`](../reference/time/datetime/parsePeriod.md)                                       | Parses the string argument as a period, which is a unit of time in terms of calendar time (days, weeks, months, years, etc.).                                                                        |
| [`parsePeriodQuiet(s)`](../reference/time/datetime/parsePeriodQuiet.md)                             | Parses the string argument as a period, which is a unit of time in terms of calendar time (days, weeks, months, years, etc.).                                                                        |
| [`parseTimePrecision(s)`](../reference/time/datetime/parseTimePrecision.md)                         | Returns a ChronoField indicating the level of precision in a time, datetime, or period nanos string.                                                                                                 |
| [`parseTimePrecisionQuiet(s)`](../reference/time/datetime/parseTimePrecisionQuiet.md)               | Returns a ChronoField indicating the level of precision in a time or datetime string.                                                                                                                |
| [`parseTimeZone(s)`](../reference/time/datetime/parseTimeZone.md)                                   | Parses the string argument as a time zone.                                                                                                                                                           |
| [`parseTimeZoneQuiet(s)`](../reference/time/datetime/parseTimeZoneQuiet.md)                         | Parses the string argument as a time zone.                                                                                                                                                           |
| [`parseZonedDateTime(s)`](../reference/time/datetime/parseZonedDateTime.md)                         | Parses the string argument as a ZonedDateTime.                                                                                                                                                       |
| [`parseZonedDateTimeQuiet(s)`](../reference/time/datetime/parseZonedDateTimeQuiet.md)               | Parses the string argument as a ZonedDateTime.                                                                                                                                                       |
| [`plus`](../reference/time/datetime/plus.md)                                                        | Adds a time period to a ZonedDateTime or Instant.                                                                                                                                                    |
| [`secondOfDay(instant, timeZone)`](../reference/time/datetime/secondOfDay.md)                       | Returns the seconds since midnight of the specified date-time and time zone.                                                                                                                         |
| [`secondOfMinute(instant, timeZone)`](../reference/time/datetime/secondOfMinute.md)                 | Returns the seconds since the top of the minute of the specified date-time and time zone.                                                                                                            |
| [`secondsToMicros(seconds)`](../reference/time/datetime/secondsToMicros.md)                         | Converts seconds to microseconds.                                                                                                                                                                    |
| [`secondsToMillis(seconds)`](../reference/time/datetime/secondsToMillis.md)                         | Converts seconds to milliseconds.                                                                                                                                                                    |
| [`secondsToNanos(seconds)`](../reference/time/datetime/secondsToNanos.md)                           | Converts seconds to nanoseconds.                                                                                                                                                                     |
| [`setClock(clock)`](../reference/time/datetime/setClock.md)                                         | Set the clock used to compute the current time.                                                                                                                                                      |
| [`timeZone()`](../reference/time/datetime/timeZone.md)                                              | Gets the system default time zone.                                                                                                                                                                   |
| [`timeZoneAliasAdd(alias, timeZone)`](../reference/time/datetime/timeZoneAliasAdd.md)               | Adds a new time zone alias.                                                                                                                                                                          |
| [`timeZoneAliasRm(alias)`](../reference/time/datetime/timeZoneAliasRm.md)                           | Removes a time zone alias.                                                                                                                                                                           |
| [`today()`](../reference/time/datetime/today.md)                                                    | Provides the current date string according to the current clock and the default time zone.                                                                                                           |
| [`toExcelTime(instant, timeZone)`](../reference/time/datetime/toExcelTime.md)                       | Converts a date-time to an Excel time represented as a double.                                                                                                                                       |
| [`toInstant(dateTime)`](../reference/time/datetime/toInstant.md)                                    | Converts a date-time string to an instant.                                                                                                                                                           |
| [`toLocalDate(instant, timeZone)`](../reference/time/datetime/toLocalDate.md)                       | Converts a date-time to a local date.                                                                                                                                                                |
| [`toLocalTime(instant, timeZone)`](../reference/time/datetime/toLocalTime.md)                       | Converts a date-time to a LocalTime.                                                                                                                                                                 |
| [`toZonedDateTime(instant, timeZone)`](../reference/time/datetime/toZonedDateTime.md)               | Converts a date-time string to a Zoned date-time.                                                                                                                                                    |
| [`upperBin(instant, intervalNanos)`](../reference/time/datetime/upperBin.md)                        | Returns the upper bin; bins the date-times according to the `intervalNanos`.                                                                                                                         |
| [`year(instant, timeZone)`](../reference/time/datetime/year.md)                                     | Returns the year of the specified date-time and time zone.                                                                                                                                           |
| [`yearOfCentury(instant, timeZone)`](../reference/time/datetime/yearOfCentury.md)                   | Returns the year of the century of the specified date time and time zone.                                                                                                                            |

<!--TODO: update with an appropriate overview link-->

## Examples

In this section, we create a table to contain events, then demonstrate the date and time methods described above.

:::note
The examples in theis section depend on the `events` table.
:::

First, we create a simple table with four rows. Note that all of our times are based in NY.

```groovy test-set=1 order=events

time1 = parseInstant("2020-04-01T09:00:00 ET")
time2 = parseInstant("2020-04-01T10:28:32 ET")
time3 = parseInstant("2020-04-01T12:00:00 ET")
time4 = parseInstant("2020-04-01T16:59:59 ET")

events = newTable(
   instantCol("EventDateTime", time1, time2, time3, time4),
   stringCol("Level", "Info", "Error", "Warning", "Info"),
   stringCol("Event", "System starting", "Something bad happened", "Invalid login", "System stopping"),
)
```

The following query returns all events after 10AM 2020-04-01. Note that comparison [operators](../reference/query-language/formulas/operators.md) on [date-times](../reference/query-language/types/date-time.md) are supported in query language strings. In order to use a comparison operator on a date-time string, the date-time string must be wrapped in single quotes `’`.

```groovy test-set=1 order=eventsAfterTen
eventsAfterTen = events.where("EventDateTime > '2020-04-01T10:00 ET'")
```

:::note
To construct date-times in DQL, use the single quote.
:::

The following example returns all events between 10AM - 4PM on 2020-04-01, using a [formula](../reference/query-language/formulas/formulas.md) within the query [string](../reference/query-language/types/strings.md).

```groovy test-set=1 order=eventsMiddleDay1
eventsMiddleDay1 = events.where("EventDateTime >= '2020-04-01T10:00 ET' && EventDateTime <= '2020-04-01T16:00 ET'")
```

The following example returns all dates between 10AM - 4PM on 2020-04-01, using the `inRange` method.

```groovy test-set=1 order=eventsMiddleDay2
eventsMiddleDay2 = events.where("inRange(EventDateTime, '2020-04-01T10:00 ET', '2020-04-01T16:00 ET')")
```

[Date-times](../reference/query-language/types/date-time.md) support simple operands as well. The following example filters the table to a 10AM starting time, with an ending time of that plus six hours.

```groovy test-set=1 order=eventsMiddleDay3
baseTime = parseInstant("2020-04-01T10:00:00 ET")
eventsMiddleDay3 = events.where("EventDateTime >= baseTime && EventDateTime <= (baseTime + 6 * HOUR)")
```

The following example creates a table with a new column consisting of the [hour of the day](../reference/time/datetime/hourOfDay.md) in which the events occurred, in the UTC time zone.

```groovy test-set=1 order=eventsWithUTCHour

tz = timeZone("UTC")

eventsWithUTCHour = events.update("HourOfDayUTC = hourOfDay(EventDateTime, tz)")
```

The following example creates a table showing the event's offset in millis after midight New York time by performing the midnight calculation directly in the formula.

```groovy test-set=1 order=eventsWithOffset1,eventsWithOffset2
instant = parseInstant("2020-04-01T12:00:00 ET")

tz = timeZone("ET")

midnight = atMidnight(instant, tz)

eventsWithOffset1 = events.update("OffsetMillis = (EventDateTime - midnight) / 1_000_000")

eventsWithOffset2 = events.update("OffsetMillis = (EventDateTime - atMidnight(EventDateTime, tz)) / 1_000_000")
```

## Related documentation

- [How to use filters](./use-filters.md)
- [How to work with strings](./work-with-strings.md)
- [date-time](../reference/query-language/types/date-time.md)
- [`update`](../reference/table-operations/select/update.md)
- [`where`](../reference/table-operations/filter/where.md)
