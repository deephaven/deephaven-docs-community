---
id: secondOfDay
title: secondOfDay
---

`secondOfDay` returns the number of seconds that have elapsed since the top of the day (midnight) for the specified [date-time](../../query-language/types/date-time.md).

## Syntax

```
secondOfDay(instant, timeZone)
secondOfDay(dateTime)
```

## Parameters

<ParamTable>
<Param name="instant" type="Instant">

The [date-time](../../query-language/types/date-time.md) from which to return the number of seconds.

</Param>
<Param name="timeZone" type="ZoneId">

The time zone.

</Param>
<Param name="dateTime" type="ZonedDateTime">

The [date-time](../../query-language/types/date-time.md) from which to return the number of seconds.

</Param>
</ParamTable>

## Returns

The specified [date-time](../../query-language/types/date-time.md) converted into seconds. Null input values will return `NULL_LONG`.

## Examples

```groovy order=null
datetime = parseInstant("2022-03-01T12:34:56 ET")

second = secondOfDay(datetime, timeZone("ET"))

println second
```

## Related documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#secondOfDay(java.time.ZonedDateTime)>)
