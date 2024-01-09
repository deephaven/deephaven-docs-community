---
id: microsOfSecond
title: microsOfSecond
---

`microsOfSecond` returns the number of microseconds that have elapsed since the top of the second.

## Syntax

```
microsOfSecond(instant, timeZone)
microsOfMilli(dateTime)
```

## Parameters

<ParamTable>
<Param name="instant" type="Instant">

The date-time from which to return the elapsed time.

</Param>
<Param name="timeZone" type="ZoneId">

The time zone.

</Param>
<Param name="dateTime" type="ZonedDateTime">

The date-time from which to return the elapsed time.

</Param>
</ParamTable>

## Returns

The number of microseconds that have elapsed since the start of the second represented by the provided date-time.
:::note
Microseconds are rounded, not dropped.
:::

## Examples

```groovy order=null
datetime = parseInstant("2023-09-09T12:34:56.123456 ET")

micros = microsOfSecond(datetime, timeZone("ET"))

println micros
```

## Related documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#microsOfSecond(java.time.ZonedDateTime)>)
