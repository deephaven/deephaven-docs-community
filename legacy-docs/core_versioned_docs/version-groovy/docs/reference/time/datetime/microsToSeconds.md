---
id: microsToSeconds
title: microsToSeconds
---

`microsToSeconds` returns the number of seconds equivalent to the specified microseconds value.

## Syntax

```
microsToSeconds(micros)
```

## Parameters

<ParamTable>
<Param name="micros" type="long">

The amount of microseconds to convert to seconds.

</Param>
</ParamTable>

## Returns

The number of seconds equivalent to the specified microseconds value. Null input values will return `NULL_LONG`.

## Examples

```groovy order=null
micros = 5000
println micros

println microsToSeconds(micros)
```

## Related documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#microsToSeconds(long)>)
