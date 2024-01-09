---
id: lowerBin
title: lowerBin
---

`lowerBin` returns a [date-time](../../query-language/types/date-time.md) value, which is at the starting (lower) end of a time range defined by the interval nanoseconds. For example, calculating the lower bin of a time given a 15 minute interval value would return the [date-time](../../query-language/types/date-time.md) value for the start of the fifteen-minute window (00-15, 15-30, 30-45, 45-60) that contains the input date-time.

## Syntax

```
lowerBin(instant, intervalNanos)
lowerBin(dateTime, intervalNanos)
lowerBin(instant, intervalNanos, offset)
lowerBin(dateTime, intervalNanos, offset)
```

## Parameters

<ParamTable>
<Param name="instant" type="Instant">

The [date-time](../../query-language/types/date-time.md) for which to evaluate the start of the containing window.

</Param>
<Param name="dateTime" type="ZonedDateTime">

The [date-time](../../query-language/types/date-time.md) for which to evaluate the start of the containing window.

</Param>
<Param name="intervalNanos" type="long">

The time interval represented as nanoseconds.

</Param>
<Param name="offset" type="long">

The window start offset in nanoseconds. For example, a value of MINUTE would offset all windows by one minute.

</Param>
</ParamTable>

## Returns

A [date-time](../../query-language/types/date-time.md) representing the start of the window.

## Example

The following example converts a [date-time](../../query-language/types/date-time.md) to the lower end of a 15-minute interval. Output is shown for no offset, and an offset of 2 minutes.

<!-- TODO: Add test back in (there is currently some weird bug) -->

```groovy skip-test
import io.deephaven.time.DateTimeUtils
datetime = parseInstant("2020-01-01T00:35:00 ET")
nanos_bin = MINUTE * 15
nanos_offset = "PT2M"
result1 = lowerBin(datetime, nanos_bin)
println result1
result2 = lowerBin(datetime, nanos_bin, nanos_offset)
println result2
```

## Related documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#lowerBin(java.time.ZonedDateTime,long)>)
