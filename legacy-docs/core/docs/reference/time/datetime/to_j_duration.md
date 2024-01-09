---
id: to_j_duration
title: to_j_duration
---

`to_j_duration` converts a time duration value to a Java `Duration`, which is a unit of time in terms of clock time (counting days, hours, minutes, seconds, and nanoseconds).

## Syntax

```
parse_duration(dt) -> Duration
```

## Parameters

<ParamTable>
<Param name="dt" type="Union[None, Duration, int, str, datetime.timedelta, numpy.timedelta64, pandas.Timedelta]">

A date-time value to convert to a Java Duration.

Strings can be formatted according to the ISO-8601 standard, which is `"[-]PTnHnMnS.nnnnnn"`, with `n` being numeric values; e.g., `PT1H` for one hour, `PT1M` for one minute, or `-PT1M5.5S` for negative one minute and 5.5 seconds.

Strings can also be formatted as `"[-]PT00:00:00.000000"`.

</Param>
</ParamTable>

## Returns

Returns a [`Duration`](../../query-language/types/durations.md) representation of the duration string.

## Examples

```python
from deephaven.time import to_j_duration

duration = to_j_duration("PT1H5M-5S")
print(duration)
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.parse_duration)
