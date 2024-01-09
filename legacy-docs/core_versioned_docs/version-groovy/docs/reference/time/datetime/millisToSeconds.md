---
id: millisToSeconds
title: millisToSeconds
---

`millisToSeconds` returns the equivalent number of seconds from a given millisecond value.

## Syntax

```
millisToSeconds(millis)
```

## Parameters

<ParamTable>
<Param name="millis" type="long">

The amount of milliseconds to convert to seconds.

</Param>
</ParamTable>

## Returns

The number of seconds equivalent to the specified milliseconds. Null input values will return `NULL_LONG`.

## Examples

```groovy order=null
nanos = millisToSeconds(1641013200000)
println nanos
```

## Related documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#millisToSeconds(long)>)
