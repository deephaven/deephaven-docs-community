---
id: excelToZonedDateTime
title: excelToZonedDateTime
---

`excelToZonedDateTime` converts an Excel date-time to a ZonedDateTime.

## Syntax

```
excelToZonedDateTime(excel, timeZone)
```

## Parameters

<ParamTable>
<Param name="excel" type="double">

Excel time, represented as a double.

</Param>
<Param name="timeZone" type="ZoneId">

The time zone.

</Param>
</ParamTable>

## Returns

A date-time as a ZonedDateTime.

## Examples

```groovy order=null
datetime = excelToZonedDateTime(1641013200000, timeZone("ET"))
println datetime
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`timeZone`](./timeZone.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#excelToZonedDateTime(double,java.time.ZoneId)>)
