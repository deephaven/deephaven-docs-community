---
id: to_datetime
title: to_datetime
---

`to_datetime` converts a Java date-time to a `datetime.datetime`.

## Syntax

```python syntax
to_datetime(dt: Union[None, Instant, ZonedDateTime]) -> datetime.date
```

## Parameters

<ParamTable>
<Param name="dt" type="Union[None, Instant, ZonedDateTime]">

A Java date-time to convert to a `datetime.datetime`. If `None` is provided, `None` is returned.

</Param>
</ParamTable>

## Returns

Returns a `datetime.datetime`.

## Examples

```python order=null
from deephaven.time import dh_now, to_datetime

java_date = dh_now()

datetime = to_datetime(java_date)

print(datetime)
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.to_datetime)
