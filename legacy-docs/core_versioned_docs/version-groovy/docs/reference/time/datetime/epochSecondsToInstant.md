---
id: epochSecondsToInstant
title: epochSecondsToInstant
---

`epochSecondsToInstant` converts a value of seconds from Epoch to a date-time Instant.

## Syntax

```
epochSecondsToInstant(seconds)
```

## Parameters

<ParamTable>
<Param name="seconds" type="long">

The seconds since Epoch.

</Param>
</ParamTable>

## Returns

A date-time representing seconds since Epoch.

## Examples

```groovy order=null
datetime = epochSecondsToInstant(1641013200000)
println datetime
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#epochSecondsToInstant(long)>)
