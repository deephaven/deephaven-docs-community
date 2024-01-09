---
id: millisOfDay
title: millisOfDay
---

`millisOfDay` returns the number of milliseconds since midnight for a specified [date-time](../../query-language/types/date-time.md).

## Syntax

```
millisOfDay(instant, timeZone)
millisOfDay(dateTime)
```

## Parameters

<ParamTable>
<Param name="instant" type="Instant">

The [date-time](../../query-language/types/date-time.md) from which to return the elapsed time.

</Param>
<Param name="timeZone" type="ZoneId">

The time zone.

</Param>
<Param name="dateTime" type="ZonedDateTime">

The [date-time](../../query-language/types/date-time.md) from which to return the elapsed time.

</Param>
</ParamTable>

## Returns

Returns the number of milliseconds since midnight for the [date-time](../../query-language/types/date-time.md), or `NULL_INT` if dt is `None`.

## Examples

```groovy order=null
datetime = parseInstant("2023-09-09T12:34:56.123456 ET")

millis = millisOfDay(datetime, timeZone("ET"))

println millis
```

## Related documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#millisOfDay(java.time.ZonedDateTime)>)
