---
id: yearOfCentury
title: yearOfCentury
---

`yearOfCentury` returns the two-digit year for a [date-time](../../query-language/types/date-time.md).

## Syntax

```
yearOfCentury(instant, timeZone)
yearOfCentury(dateTime)
```

## Parameters

<ParamTable>
<Param name="instant" type="Instant">

The [date-time](../../query-language/types/date-time.md) from which to return the year.

</Param>
<Param name="timeZone" type="ZoneId">

The time zone.

</Param>
<Param name="dateTime" type="ZonedDateTime">

The [date-time](../../query-language/types/date-time.md) from which to return the year.

</Param>
</ParamTable>

## Returns

Returns an int value of the two-digit year for a [date-time](../../query-language/types/date-time.md).

## Examples

```groovy order=null
datetime = parseInstant("2021-07-04T08:00:00 ET")

year = yearOfCentury(datetime, timeZone("ET"))
println year
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [`timeZone`](./timeZone.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#yearOfCentury(java.time.Instant,java.time.ZoneId)>)
