---
id: today
title: today
---

Provides the current date string according to the current clock. If no time zone is provided, the default time zone will be used.

## Syntax

```
today()
today(timeZone)
```

## Parameters

<ParamTable>
<Param name="timeZone" type="ZoneId">

The time zone.

</Param>
</ParamTable>

## Returns

The current date string.

## Examples

```groovy order=null
println today()
println today(timeZone("UTC"))
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`timeZone`](./timeZone.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#today()>)
