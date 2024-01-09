---
id: to_j_instant
title: to_j_instant
---

`to_j_instant` converts a date-time value to Java `Instant`.

## Syntax

```python syntax
to_j_instant(
  dt: Union[None, Instant, int, str, datetime.datetime, numpy.datetime64, pandas.Timestamp]
  ) -> Instant
```

## Parameters

<ParamTable>
<Param name="dt" type="Union[None, Instant, int, str, datetime.datetime, numpy.datetime64, pandas.Timestamp]">

A date-time value to convert to a Java Instant.

Instant strings should be formatted according to the ISO-8601 standard, which is `yyyy-MM-ddThh:mm:ss[.SSSSSSSSS] TZ`, where `TZ` is the time zone offset from UTC; e.g., `2022-01-01T00:00:00 ET`.

</Param>
</ParamTable>

## Returns

Returns an `Instant`.

## Examples

```python
from deephaven.time import to_j_instant

datetime = to_j_instant("2022-01-01T00:00:00 ET")
print(datetime)
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.to_j_instant)
