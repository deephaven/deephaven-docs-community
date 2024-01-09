---
id: hourOfDay
title: hourOfDay
---

`hourOfDay` returns an int representing the hour of the input [date-time](../../query-language/types/date-time.md). Hours are from 0-23, with times between midnight and 1AM on a given day returning the hour `0`.

:::note
On days when daylight savings time events occur, results may be different from what is expected based upon the local time. For example, on daylight savings time change days, 9:30AM may be earlier or later in the day based upon if the daylight savings time adjustment is forwards or backwards.
:::

## Syntax

```
hourOfDay(instant, timeZone)
hourOfDay(dateTime)
```

## Parameters

<ParamTable>
<Param name="instant" type="Instant">

The time for which to find the hour of the day.

</Param>
<Param name="timeZone" type="TimeZone">

The time zone to use when interpreting the [date-time](../../query-language/types/date-time.md).

</Param>
<Param name="dateTime" type="ZonedDateTime">

The zoned date-time for which to find the hour of the day.

</Param>
</ParamTable>

## Returns

Returns a 0-based int value of the hour of the day.

## Examples

```groovy order=null
datetime = parseInstant("2024-02-29T01:23:45 ET")
datetime_zoned = toZonedDateTime(datetime, timeZone("MT"))

hour = hourOfDay(datetime, timeZone("ET"))
hour_zoned = hourOfDay(datetime_zoned)

println hour
println hour_zoned
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [`timeZone`](./timeZone.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#hourOfDay(java.time.Instant,java.time.ZoneId)>)
