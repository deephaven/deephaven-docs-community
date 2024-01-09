---
id: millisToMicros
title: millisToMicros
---

`millisToMicros` returns the equivalent number of microseconds from a given millisecond value.

## Syntax

```
millisToMicros(millis)
```

## Parameters

<ParamTable>
<Param name="millis" type="long">

The amount of milliseconds to convert to microseconds.

</Param>
</ParamTable>

## Returns

The number of microseconds equivalent to the specified milliseconds. Null input values will return `NULL_LONG`.

## Examples

```groovy order=null
micros = millisToMicros(1641013200000)
println micros
```

## Related documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#millisToMicros(long)>)
