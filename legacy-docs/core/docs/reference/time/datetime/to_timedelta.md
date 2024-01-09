---
id: to_timedelta
title: to_timedelta
---

`to_timedelta` converts a Java time duration to a `datetime.timedelta`.

## Syntax

```python syntax
to_timedelta(dt: Union[None, Duration]) -> datetime.timedelta
```

## Parameters

<ParamTable>
<Param name="dt" type="Union[None, Duration]">

A Java Duration to convert to a `datetime.timedelta`. If `None` is provided, `None` is returned.

</Param>
</ParamTable>

## Returns

Returns a `datetime.timedelta`.

## Examples

```python order=null
from deephaven.time import to_j_duration, to_timedelta

duration = to_j_duration("PT42M")

td = to_timedelta(duration)

print(td, type(td))
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.to_timedelta)
