---
id: to_j_zdt
title: to_j_zdt
---

`to_j_zdt` converts a date-time value to a Java `ZonedDateTime`.

## Syntax

```
to_j_zdt(dt: Union[None, ZonedDateTime, str, datetime.datetime, numpy.datetime64, pandas.Timestamp]) -> ZonedDateTime
```

## Parameters

<ParamTable>
<Param name="dt" type="Union[None, ZonedDateTime, str, datetime.datetime, numpy.datetime64, pandas.Timestamp]">

A date-time value to convert to a Java `ZonedDateTime`.

ZonedDateTime strings should be formatted according to the ISO-8601 standard, which is `yyyy-MM-ddThh:mm:ss[.SSSSSSSSS] TZ`, where `TZ` is the time zone offset from UTC; e.g., `2022-01-01T00:00:00 ET`.

</Param>
</ParamTable>

## Returns

Returns a `ZonedDateTime` representation of the date-time string.

## Examples

```python
from deephaven.time import to_j_zdt

zdt = to_j_zdt("1995-03-22T11:11:11.23142 UTC")
print(zdt)
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.to_j_zdt)
