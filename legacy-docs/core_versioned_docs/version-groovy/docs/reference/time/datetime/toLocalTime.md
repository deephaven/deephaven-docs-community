---
id: toLocalTime
title: toLocalTime
---

The `toLocalTime` method converts the supplied variables into a [LocalTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalTime.html).

A [LocalTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalTime.html) is a Java object that represents a time, often viewed as hour-minute-second. A [LocalTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalTime.html) can have up to nanosecond precision - for example, "10:15:30.123456789".

## Syntax

```
toLocalTime(instant, timeZone)
toLocalTime(dateTime)
```

## Parameters

<ParamTable>
<Param name="instant" type="Instant">

The Instant to convert.

</Param>
<Param name="timeZone" type="ZoneId">

The time zone.

</Param>
<Param name="dateTime" type="ZonedDateTime">

The zoned date-time to convert.

</Param>
</ParamTable>

## Returns

A LocalTime.

## Examples

```groovy order=null
println toLocalTime(now(), timeZone("UTC"))
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`timeZone`](./timeZone.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#toLocalTime(java.time.Instant,java.time.ZoneId)>)