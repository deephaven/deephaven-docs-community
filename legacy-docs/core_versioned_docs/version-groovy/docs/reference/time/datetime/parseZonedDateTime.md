---
id: parseZonedDateTime
title: parseZonedDateTime
---

The `parseZonedDateTime` method parses the supplied string as a time zone.
Date-time strings are formatted according to the ISO-8601 format `yyyy-MM-ddThh:mm:ss[.SSSSSSSSS] TZ` and others.

## Syntax

```
parseZonedDateTime(s)
```

## Parameters

<ParamTable>
<Param name="s" type="string">

The string to be converted.

</Param>
</ParamTable>

## Returns

A ZonedDateTime.

## Examples

```groovy order=null
println parseZonedDateTime("1982-09-23T11:23:00 ET")
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#parseZonedDateTime(java.lang.String)>)
