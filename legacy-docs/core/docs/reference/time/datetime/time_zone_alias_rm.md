---
id: time_zone_alias_rm
title: time_zone_alias_rm
---

`time_zone_alias_rm` removes a time zone alias.

## Syntax

```python syntax
time_zone_alias_rm(alias: str)
```

## Parameters

<ParamTable>
<Param name="alias" type="str">

The alias to remove.

</Param>
</ParamTable>

## Returns

Removes a time zone alias.

## Examples

```python reset
from deephaven.time import time_zone_alias_rm
time_zone_alias_rm("MT")
```

## Related Documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.time_zone)
