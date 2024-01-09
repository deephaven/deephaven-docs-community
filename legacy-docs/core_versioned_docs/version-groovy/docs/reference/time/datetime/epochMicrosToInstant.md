---
id: epochMicrosToInstant
title: epochMicrosToInstant
---

`epochMicrosToInstant` converts a value of microseconds from Epoch to a date-time.

## Syntax

```
epochMicrosToInstant(micros)
```

## Parameters

<ParamTable>
<Param name="micros" type="long">

The microseconds since Epoch.

</Param>
</ParamTable>

## Returns

A date-time representing microseconds since Epoch.

## Examples

```groovy order=null
datetime = epochMicrosToInstant(1641013200000)
println datetime
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#epochMicrosToInstant(long)>)
