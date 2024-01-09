---
id: dh_now
title: dh_now
---

`dh_now` provides the current datetime as an [Instant](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/Instant.html).

:::important

In query strings, users should choose the [built-in](../../query-language/query-library/auto-imported-functions.md) `now` function instead of `dh_now`. The built-in function is pure Java and will be more efficient than the Python version because it does not require as many [Java/Python boundary crossings](../../../conceptual/python-java-boundary.md).

:::

## Syntax

```python syntax
dh_now(
    system: bool = false,
    resolution: str = 'ns',
) -> Instant
```

## Parameters

<ParamTable>
<Param name="system" type="bool" optional>

`True` to use the system clock; `False` to use the default clock. Under most circumstances, the default clock will return the current system time, but during replay simulations, the default clock can return the replay time. The default is `False`.

</Param>
<Param name="resolution" type="str" optional>

The resolution of the returned time. The default ‘ns’ will return nanosecond resolution times if possible. ‘ms’ will return millisecond resolution times.

</Param>
</ParamTable>

## Returns

An Instant representation of the current time.

## Examples

```python
from deephaven.time import dh_now

print(dh_now())
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.dh_now)
