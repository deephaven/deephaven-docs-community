---
id: to_np_timedelta64
title: to_np_timedelta64
---

`to_np_timedelta64` converts a Java time duration to a `numpy.timedelta64`.

## Syntax

```python syntax
to_np_timedelta64(dt: Union[None, Duration, Period]) -> numpy.timedelta64
```

## Parameters

<ParamTable>
<Param name="dt" type="Union[None, Duration, Period]">

A Java time duration to convert to a `numpy.timedelta64`. If `None` is provided, `None` is returned.

</Param>
</ParamTable>

## Returns

Returns a `numpy.timedelta64`.

## Examples

```python order=null
from deephaven.time import to_j_duration, to_np_timedelta64

duration = to_j_duration("PT42M")

np_td = to_np_timedelta64(duration)

print(np_td, type(np_td))
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.to_np_timedelta64)
