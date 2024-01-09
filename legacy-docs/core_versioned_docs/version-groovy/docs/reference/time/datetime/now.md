---
id: now
title: now
---

`now` provides the current [date-time](../../query-language/types/date-time.md) as an Instant. The resultant [date-time](../../query-language/types/date-time.md) has a millisecond resolution according to the current clock.

## Syntax

```
now()
```

## Parameters

This method takes no arguments.

## Returns

The current [date-time](../../query-language/types/date-time.md).

## Examples

```groovy order=null
println now()
```

## Related documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#now()>)
