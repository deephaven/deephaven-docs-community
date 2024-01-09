---
id: year
title: year
---

`year` returns the year for a [date-time](../../query-language/types/date-time.md) in the specified time zone.

## Syntax

```
year(instant, timeZone)
year(dateTime)
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

Returns an int value of the year for a [date-time](../../query-language/types/date-time.md).

## Examples

```groovy order=null
datetime = parseInstant("2021-06-22T08:00:00 ET")

year = year(datetime, timeZone("ET"))
println year
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [`timeZone`](./timeZone.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#year(java.time.Instant,java.time.ZoneId)>)
