---
id: epochMillisToInstant
title: epochMillisToInstant
---

`epochMillisToInstant` converts a value of milliseconds from Epoch to a [date-time](../../query-language/types/date-time.md).

## Syntax

```
epochMillisToInstant(millis)
```

## Parameters

<ParamTable>
<Param name="millis" type="long">

The milliseconds since Epoch.

</Param>
</ParamTable>

## Returns

A [date-time](../../query-language/types/date-time.md) representing milliseconds since Epoch.

## Examples

```groovy order=null
datetime = epochMillisToInstant(1641013200000)
println datetime
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#epochMillisToInstant(long)>)
