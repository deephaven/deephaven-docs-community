---
id: dh_time_zone
title: dh_time_zone
---

`dh_time_zone` returns the current Deephaven system time zone.

:::important

In query strings, users should choose the built-in [`timeZone`](../../../../../core_versioned_docs/version-groovy/docs/reference/time/datetime/timeZone.md) function instead of `dh_time_zone`. The built-in equivalent is pure Java and queries will be more efficient because of fewer [Python/Java boundary crossings](../../../conceptual/python-java-boundary.md).

:::

## Syntax

```python syntax
time_zone() -> TimeZone
```

## Parameters

This function takes no parameters.

## Returns

Returns a Java TimeZone.

## Examples

```python order=null
from deephaven.time import dh_time_zone

tz = dh_time_zone()

print(tz)
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.dh_time_zone)
