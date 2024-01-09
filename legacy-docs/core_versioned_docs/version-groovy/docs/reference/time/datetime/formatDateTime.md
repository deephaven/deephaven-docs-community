---
id: formatDateTime
title: formatDateTime
---

`formatDateTime` returns a [string](../../query-language/types/strings.md) representation of a date-time for a specified time zone, formatted as `yyyy-MM-ddThh:mm:ss.SSSSSSSSS TZ`.

## Syntax

```
formatDateTime(instant, timeZone)
formatDateTime(dateTime)
```

## Parameters

<ParamTable>
<Param name="instant" type="Instant">

The Instant to format as a string.

</Param>
<Param name="timeZone" type="ZoneId">

The time zone used when formatting the string.

</Param>
<Param name="dateTime" type="ZonedDateTime">

The time to format as a string.

</Param>
</ParamTable>

## Returns

The time, formatted as a `yyyy-MM-ddThh:mm:ss.SSSSSSSSS TZ` string.

## Examples

```groovy order=null
datetime = parseInstant("2022-01-01T00:00:00 ET")

formatted_date = formatDateTime(datetime, timeZone("ET"))
println formatted_date
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [`timeZone`](./timeZone.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#formatDateTime(java.time.Instant,java.time.ZoneId)>)
