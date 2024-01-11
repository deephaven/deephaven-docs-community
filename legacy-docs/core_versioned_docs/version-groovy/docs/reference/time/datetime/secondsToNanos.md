---
id: secondsToNanos
title: secondsToNanos
---

`secondsToNanos` returns the equivalent number of nanoseconds to the specified `seconds` value.

## Syntax

```
secondsToNanos(seconds)
```

## Parameters

<ParamTable>
<Param name="seconds" type="long">

The amount of seconds to convert to nanoseconds.

</Param>
</ParamTable>

## Returns

The equivalent number of nanoseconds to the specified `seconds` value. Null input values will return `NULL_LONG`.

## Examples

In the following example, a new column (`Nanos`) is added that converts the specified seconds into a [DateTime](../../query-language/types/date-time.md).

```groovy order=null
seconds = 132

println secondsToNanos(seconds)
```

## Related documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#secondsToNanos(long)>)