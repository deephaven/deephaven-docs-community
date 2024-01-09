---
id: to_pd_timestamp
title: to_pd_timestamp
---

`to_pd_timestamp` converts a Java date-time to a `pandas.Timestamp`.

## Syntax

```python syntax
to_pd_timestamp(dt: Union[None, Instant, ZonedDateTime]) -> pandas.Timestamp
```

## Parameters

<ParamTable>
<Param name="dt" type="Union[None, Instant, ZonedDateTime]">

A Java date-time to convert to a `pandas.Timestamp`. If `None` is provided, `None` is returned.

</Param>
</ParamTable>

## Returns

Returns a `pandas.Timestamp`.

## Examples

```python order=null
from deephaven.time import dh_now, to_pd_timestamp

instant = dh_now()

pd_ts = to_pd_timestamp(instant)

print(pd_ts, type(pd_ts))
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.to_pd_timestamp)
