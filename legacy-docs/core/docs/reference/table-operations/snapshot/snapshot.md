---
id: snapshot
title: snapshot
---

`snapshot` produces an static, in-memory copy of a source table.

## Syntax

```
result = source.snapshot() -> Table
```

## Returns

A static copy of a source table.

## Examples

In the following example, the `source` table updates every second with new data. After some time, a snapshot is taken.

```python skip-test
from deephaven import time_table

source = time_table("PT1S")

# Some time later...
result = source.snapshot()
```

![img](../../../assets/reference/table-operations/snapshot.gif)

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to capture the history of ticking tables](../../../how-to-guides/capture-table-history.md)
- [How to reduce the update frequency of ticking tables](../../../how-to-guides/reduce-update-frequency.md)
- [`time_table`](../create/timeTable.md)
- [`update`](../select/update.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/QueryTable.html#snapshot()>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html?highlight=snapshot#deephaven.table.Table.snapshot)
