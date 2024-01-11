---
id: diffMinutes
title: diffMinutes
---

`diffDays` returns the difference in minutes between two date-time values, as a `double`.

## Syntax

```
diffDays(start, end)
```

## Parameters

<ParamTable>
<Param name="start" type="Instant">

The start time of the range.

</Param>
<Param name="start" type="ZonedDateTime">

The start time of the range.

</Param>
<Param name="end" type="Instant">

The end time of the range.

</Param>
<Param name="end" type="ZonedDateTime">

The end time of the range.

</Param>
</ParamTable>

## Returns

Returns the difference in minutes between the supplied start and end values.

## Examples

```groovy order=null
d1 = parseInstant("2022-01-01T00:00:00 ET")
d2 = parseInstant("2022-01-02T00:00:00 ET")

difference = diffMinutes(d1, d2)
println difference
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseInstant`](./parseInstant.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#diffMinutes(java.time.Instant,java.time.Instant)>)