---
id: to_j_local_date
title: to_j_local_date
---

`to_j_local_date` converts a date-time value into a Java `LocalDate`, which is a date without a time or time zone.

## Syntax

```python syntax
to_j_local_date(
  dt: Union[None, LocalDate, str, datetime.date, datetime.time, datetime.datetime, numpy.datetime64, pandas.Timestamp]
  ) -> LocalDate
```

## Parameters

<ParamTable>
<Param name="dt" type="Union[None, LocalDate, str, datetime.date, datetime.time, datetime.datetime, numpy.datetime64, pandas.Timestamp]">

The date-time value to convert to a Java LocalDate.

A string in the form of `[-]PTnHnMnS`, with `n` being numeric values; e.g., `PT1H` for one hour, `PT1M` for one minute, or `-PT1M5.5S` for negative one minute and 5.5 seconds.

</Param>
</ParamTable>

## Returns

Returns a `LocalDate`.

## Examples

```python
from deephaven.time import to_j_local_date, dh_today

ld = to_j_local_date(dh_today())
print(ld)
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.to_j_local_date)
