---
id: to_j_local_time
title: to_j_local_time
---

`to_j_local_time` converts a date-time value into a Java `LocalTime`, which is the time that would be read from a clock and does not have a date or time zone.

## Syntax

```python syntax
to_j_local_time(dt: Union[None, LocalTime, int, str, datetime.time.datetime.datetime, numpy.datetime64, pandas.Timestamp]) -> LocalTime
```

## Parameters

<ParamTable>
<Param name="dt" type="Union[None, LocalTime, int, str, datetime.time.datetime.datetime, numpy.datetime64, pandas.Timestamp]">

A Python local time or local time string.

Time strings can be formatted as `hh:mm:ss[.nnnnnnnnn]`.

</Param>
</ParamTable>

## Returns

Returns a `LocalTime`.

## Examples

```python
from deephaven.time import to_j_local_time

local_time = to_j_local_time("11:11:11.23142")
print(local_time)
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.to_j_local_time)
