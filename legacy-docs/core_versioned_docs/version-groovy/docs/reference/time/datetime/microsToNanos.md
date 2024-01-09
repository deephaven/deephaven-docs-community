---
id: microsToNanos
title: microsToNanos
---

`microsToNanos` returns the equivalent number of nanoseconds as the specified microseconds value.

## Syntax

```
microsToNanos(micros)
```

## Parameters

<ParamTable>
<Param name="micros" type="long">

The amount of microseconds to convert to nanoseconds.

</Param>
</ParamTable>

## Returns

The equivalent number of nanoseconds as the specified microseconds. Null input values will return `NULL_LONG`.

## Examples

In the following example, a new column (`Nanos`) is added that converts the specified microseconds into nanoseconds.

```groovy order=null
micros = 5000
println micros

println microsToNanos(micros)
```

## Related documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#microsToNanos(long)>)
