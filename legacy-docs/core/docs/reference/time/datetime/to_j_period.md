---
id: to_j_period
title: to_j_period
---

`to_j_period` converts a date-time value into a Java `Period`, which is a length of time expressed as `PnYnMnWnD`, with `n` being numeric values for years, months, weeks, and days.

## Syntax

```
to_j_period(dt: Union[None, Period, str, datetime.timedelta, numpy.timedelta64, pandas.Timedelta]) -> Period
```

## Parameters

<ParamTable>
<Param name="s" type="str">

A Python period or period string.

Period strings should be in the form of `PnYnMnWnD`, with `n` being numeric values; e.g., P1W for one week, P1M for one month, or P1W5D for one week plus five days.

</Param>
</ParamTable>

## Returns

Returns a Java `Period`.

## Examples

```python
from deephaven.time import to_j_period

period = to_j_period("P1W5D")
print(period)
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.to_j_period)
