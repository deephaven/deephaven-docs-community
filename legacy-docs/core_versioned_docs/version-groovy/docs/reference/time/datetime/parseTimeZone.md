---
id: parseTimeZone
title: parseTimeZone
---

The `parseTimeZone` method parses the supplied string as a time zone.

## Syntax

```
parseTimeZone(s)
```

## Parameters

<ParamTable>
<Param name="s" type="string">

The string to be converted.

</Param>
</ParamTable>

## Returns

A ZoneId.

## Examples

```groovy order=null
tz = parseTimeZone("America/Los_Angeles")

println epochMillisToZonedDateTime(100, tz)
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md) -[`epochMillisToZonedDateTime`](./epochMillisToZonedDateTime.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#parseTimeZone(java.lang.String)>)
