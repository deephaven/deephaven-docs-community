---
id: to_np_datetime64
title: to_np_datetime64
---

`to_np_datetime64` converts a Java date-time to a `numpy.datetime64`.

## Syntax

```python syntax
to_np_datetime64(dt: Union[None, Instant, ZonedDateTime]) -> numpy.datetime64
```

## Parameters

<ParamTable>
<Param name="dt" type="Union[None, Instant, ZonedDateTime]">

A Java date-time to convert to a `numpy.datetime64`. If `None` is provided, `None` is returned.

</Param>
</ParamTable>

## Returns

Returns a `numpy.datetime64`.

## Examples

```python order=null
from deephaven.time import dh_now, to_np_datetime64

instant = dh_now()

np_dt = to_np_datetime64(instant)

print(np_dt, type(np_dt))
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.to_np_datetime64)
