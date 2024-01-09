---
id: currentTimeNanos
title: currentTimeNanos
---

`currentTimeNanos` returns the number of nanoseconds since the epoch (1970-01-01T00:00:00Z).

The resolution is greater than or equal to [`currentTimeMicros`](./currentTimeMicros.md) and [`currentTimeMillis`](./currentTimeMillis.md).

## Syntax

```
currentTimeNanos()
```

## Parameters

This method takes no arguments.

## Returns

The number of nanoseconds since the epoch (1970-01-01T00:00:00Z).

## Examples

```groovy order=null
println currentClock().currentTimeNanos()
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/base/clock/Clock.html#currentTimeNanos()>)
