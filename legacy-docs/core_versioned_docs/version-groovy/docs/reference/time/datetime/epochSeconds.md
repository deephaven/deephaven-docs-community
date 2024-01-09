---
id: epochSeconds
title: epochSeconds
---

Returns seconds from the Epoch for a date-time value.

## Syntax

```
epochSeconds(instant)
epochSeconds(dateTime)
```

## Parameters

<ParamTable>
<Param name="instant" type="Instant">

Instant to compute the Epoch offset for.

</Param>
<Param name="dateTime" type="ZonedDateTime">

ZonedDateTime to compute the Epoch offset for.

</Param>
</ParamTable>

## Returns

Seconds from the Epoch.

## Examples

```groovy order=null
datetime = parseInstant("2022-01-01T05:04:02 ET")
println epochSeconds(datetime)
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#epochSeconds(java.time.Instant)>)
