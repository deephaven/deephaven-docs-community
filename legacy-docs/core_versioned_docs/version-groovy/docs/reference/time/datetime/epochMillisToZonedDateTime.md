---
id: epochMillisToZonedDateTime
title: epochMillisToZonedDateTime
---

`epochMillisToZonedDateTime` converts an offset from the Epoch to a ZonedDateTime.

## Syntax

```
epochMillisToZonedDateTime(millis, timeZone)
```

## Parameters

<ParamTable>
<Param name="millis" type="long">

The milliseconds from the Epoch.

</Param>
<Param name="timeZone" type="TimeZoneId">

The time zone.

</Param>
</ParamTable>

## Returns

A ZonedDateTime.

## Examples

```groovy order=null
datetime = epochMillisToZonedDateTime(1641013200000, timeZone("ET"))
println datetime
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`timeZone`](./timeZone.md)
- [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#epochMillisToZonedDateTime)
