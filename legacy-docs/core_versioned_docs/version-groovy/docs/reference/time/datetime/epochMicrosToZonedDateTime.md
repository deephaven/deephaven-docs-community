---
id: epochMicrosToZonedDateTime
title: epochMicrosToZonedDateTime
---

`epochMicrosToZonedDateTime` converts an offset from the Epoch to a ZonedDateTime.

## Syntax

```
epochMicrosToZonedDateTime(micros, timeZone)
```

## Parameters

<ParamTable>
<Param name="micros" type="long">

The microseconds from the Epoch.

</Param>
<Param name="timeZone" type="TimeZoneId">

The time zone.

</Param>
</ParamTable>

## Returns

A ZonedDateTime.

## Examples

```groovy order=null
datetime = epochMicrosToZonedDateTime(1641013200000, timeZone("ET"))
println datetime
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#epochMicrosToZonedDateTime)
