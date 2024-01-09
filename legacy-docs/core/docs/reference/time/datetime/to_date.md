---
id: to_date
title: to_date
---

`to_date` converts a Java date-time to a `datetime.date`.

## Syntax

```python syntax
to_date(dt: Union[None, LocalDate, ZonedDateTime]) -> datetime.date
```

## Parameters

<ParamTable>
<Param name="dt" type="Union[None, LocalDate, ZonedDateTime]">

A Java date-time to convert to a `datetime.date`. If `None` is provided, `None` is returned.

</Param>
</ParamTable>

## Returns

Returns a `datetime.date`.

## Examples

```python order=null
from deephaven.time import dh_today, to_j_local_date, to_date

date_str = dh_today()

zdt = to_j_local_date(date_str)

date = to_date(zdt)

print(date)
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.to_date)
