---
id: to_time
title: to_time
---

`to_time` converts a Java date-time to a `datetime.time`.

## Syntax

```python syntax
to_time(dt: Union[None, LocalTime, ZonedDateTime]) -> datetime.time
```

## Parameters

<ParamTable>
<Param name="dt" type="Union[None, LocalDate, ZonedDateTime]">

A Java date-time to convert to a `datetime.time`. If `None` is provided, `None` is returned.

</Param>
</ParamTable>

## Returns

Returns a `datetime.time`.

## Examples

```python order=null
from deephaven.time import to_j_local_time, to_time

local_time = to_j_local_time("11:11:11.23142")

time = to_time(local_time)

print(time)
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.to_time)
