---
id: nanosToMillis
title: nanosToMillis
---

`nanosToMillis` returns the equivalent number of milliseconds from a given nanosecond value.

## Syntax

```
nanosToMillis(nanos)
```

## Parameters

<ParamTable>
<Param name="nanos" type="long">

The amount of nanoseconds to convert to milliseconds.

</Param>
</ParamTable>

## Returns

The equivalent number of milliseconds as the specified nanoseconds. Null input values will return `NULL_LONG`.

## Examples

```groovy order=null

millis = nanosToMillis(1641013200000)
println millis
```

## Related documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#nanosToMillis(long)>)
