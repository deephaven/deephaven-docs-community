---
id: toLocalDate
title: toLocalDate
---

The `toLocalDate` method converts the supplied variables into a [LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html).

A `LocalDate` is a Java object that represents a date with no time zone - for example, "1995-05-23".

## Syntax

```
toLocalDate(instant, timeZone)
toLocalDate(dateTime)
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

A [LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html).

## Examples

```groovy order=null
println toLocalDate(now(), timeZone("UTC"))
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`timeZone`](./timeZone.md)
- [LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#toLocalDate(java.time.Instant,java.time.ZoneId)>)
