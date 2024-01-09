---
id: nanosOfDay
title: nanosOfDay
---

`nanosOfDay` returns the number of nanoseconds that have elapsed since the top of the day (midnight) for the specified [date-time](../../query-language/types/date-time.md).

## Syntax

```
nanosOfDay(dateTime, timeZone)
```

## Parameters

<ParamTable>
<Param name="instant" type="Instant">

The [date-time](../../query-language/types/date-time.md) from which to return the number of nanoseconds.

</Param>
<Param name="timeZone" type="ZoneId">

The time zone.

</Param>
<Param name="dateTime" type="ZonedDateTime">

The [date-time](../../query-language/types/date-time.md) from which to return the number of nanoseconds.

</Param>
</ParamTable>

## Returns

The specified [date-time](../../query-language/types/date-time.md) converted into nanoseconds. Null input values will return `NULL_LONG`.

## Examples

```groovy order=null
datetime = parseInstant("2022-03-01T12:34:56 ET")

nanos = nanosOfDay(datetime, timeZone("ET"))

println nanos
```

## Related documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [`timeZone`](./timeZone.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#nanosOfDay(java.time.Instant,java.time.ZoneId)>)
