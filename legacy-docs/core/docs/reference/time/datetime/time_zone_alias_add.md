---
id: time_zone_alias_add
title: time_zone_alias_add
---

`time_zone_alias_add` adds a new time zone alias.

## Syntax

```python syntax
time_zone_alias_add(alias: str, tz: str)
```

## Parameters

<ParamTable>
<Param name="alias" type="str">

The new alias.

</Param>
<Param name="tz" type="TimeZone">

A time zone name.

</Param>
</ParamTable>

## Returns

Adds a new time zone alias.

## Examples

```python reset
from deephaven.time import time_zone_alias_add, to_j_time_zone, time_zone_alias_rm

time_zone_alias_rm("ET")
time_zone_alias_add("ET", "America/New_York")

j_tz = to_j_time_zone("ET")

print(j_tz)
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.time_zone_alias_add)
