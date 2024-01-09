---
id: epochNanos
title: epochNanos
---

Returns nanoseconds from the Epoch for a date-time value.

## Syntax

```
epochNanos(instant)
epochNanos(dateTime)
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

Nanoseconds from the Epoch.

## Examples

```groovy order=null
datetime = parseInstant("2022-01-01T05:04:02 ET")
println epochNanos(datetime)
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#epochNanos(java.time.Instant)>)
