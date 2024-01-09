---
id: minuteOfDay
title: minuteOfDay
---

`minuteOfDay` returns the minutes since the top of the day (midnight) in the specified time zone.

## Syntax

```
minuteOfDay(instant, timeZone)
minuteOfDay(dateTime)
```

## Parameters

<ParamTable>
<Param name="instant" type="Instant">

The [date-time](../../query-language/types/date-time.md) from which to return the number of minutes.

</Param>
<Param name="timeZone" type="ZoneId">

The time zone.

</Param>
<Param name="dateTime" type="ZonedDateTime">

The [date-time](../../query-language/types/date-time.md) from which to return the number of minutes.

</Param>
</ParamTable>

## Returns

Returns an int value of minutes since midnight for a specified [date-time](../../query-language/types/date-time.md).

## Examples

```groovy order=null
datetime = parseInstant("2022-01-01T12:34:56 ET")

minute = minuteOfDay(datetime, timeZone("ET"))

println minute
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#minuteOfDay(java.time.Instant,java.time.ZoneId)>)
