---
id: to_j_time_zone
title: to_j_time_zone
---

`to_j_time_zone` converts a time zone value into a Java `TimeZone`.

## Syntax

```
to_j_time_zone(tz: Union[None, TimeZone, str, datetime.tzinfo, datetime.datetime, pandas.Timestamp]) -> TimeZone
```

## Parameters

<ParamTable>
<Param name="tz" type="Union[None, TimeZone, str, datetime.tzinfo, datetime.datetime, pandas.Timestamp]">

The time zone value to convert to a Java `TimeZone`.

</Param>
</ParamTable>

## Returns

Returns a `TimeZone`.

## Examples

```python
from deephaven.time import to_j_time_zone

tz = to_j_time_zone("ET")
print(tz)
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.to_j_time_zone)
