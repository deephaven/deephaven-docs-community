---
id: dh_today
title: dh_today
---

`dh_today` provides the current date string according to the current clock.

:::note
Under most circumstances, this method will return the date according to current system time, but during replay simulations, this method can return the date according to replay time.
:::

In query strings, users should choose the built-in [`today`](../../query-language/query-library/auto-imported-functions.md) function instead of `dh_today`. The built-in function is pure Java and will be more efficient than the Python version because it does not require as many [Java/Python boundary crossings](../../../conceptual/python-java-boundary.md).

## Syntax

```python syntax
dh_today() -> str
```

## Returns

A string representation of the current date-time.

## Examples

```python
from deephaven.time import dh_today

today = dh_today()

print(today)
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.dh_today)
