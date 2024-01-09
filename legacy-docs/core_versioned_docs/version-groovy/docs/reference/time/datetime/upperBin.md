---
id: upperBin
title: upperBin
---

`upperBin` returns a [date-time](../../query-language/types/date-time.md) value, which is at the ending (upper) end of a time range defined by the interval nanoseconds. For example, a `5*MINUTE` intervalNanos value would return the instant value for the end of the five-minute window that contains the input instant.

## Syntax

```
upperBin(instant, intervalNanos)
upperBin(dateTime, intervalNanos)
upperBin(instant, intervalNanos, offset)
upperBin(dateTime, intervalNanos, offset)
```

## Parameters

<ParamTable>
<Param name="instant" type="Instant">

The [date-time](../../query-language/types/date-time.md) for which to evaluate the end of the containing window.

</Param>
<Param name="dateTime" type="ZonedDateTime">

The [date-time](../../query-language/types/date-time.md) for which to evaluate the end of the containing window.

</Param>
<Param name="intervalNanos" type="long">

The time interval represented as nanoseconds.

</Param>
<Param name="offset" type="long">

The window end offset in nanoseconds. For example, a value of MINUTE would offset all windows by one minute.

</Param>
</ParamTable>

## Returns

A [date-time](../../query-language/types/date-time.md) representing the end of the window.

## Example

The following example converts a [date-time](../../query-language/types/date-time.md) to the upper end of a 15-minute interval. Output is shown for no offset and an offset of 2 minutes.

<!-- TODO: Add test back in (there is currently some weird bug) -->

```groovy skip-test
import io.deephaven.time.DateTimeUtils
datetime = parseInstant("2020-01-01T00:35:00 ET")
nanos_bin = MINUTE * 15
nanos_offset = "PT2M"
result1 = upperBin(datetime, nanos_bin)
println result1
result2 = upperBin(datetime, nanos_bin, nanos_offset)
println result2
```

## Related documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#upperBin(java.time.ZonedDateTime,long,long)>)
