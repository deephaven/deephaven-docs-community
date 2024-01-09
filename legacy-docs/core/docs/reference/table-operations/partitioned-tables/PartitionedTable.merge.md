---
id: partitioned-table-merge
title: merge
---

The `merge` method vertically stacks all constituent tables of a `PartitionedTable` to produce a new table in the same way that [`merge`](../merge/merge.md) vertically stacks a list of tables.

## Syntax

```python syntax
PartitionedTable.merge() -> Table
```

## Parameters

This method takes no parameters.

## Returns

A new table with all the constituent tables of a `PartitionedTable`.

## Example

In the following example, we call `merge` to create a new table with all the constituent tables of our `PartitionedTable`. No operations are applied to the `PartitionedTable` between the partition and merge, so this yields a result identical to the source table.

```python order=result,source
from deephaven import empty_table

source = empty_table(5).update(["IntCol = i", "StrCol = `value`"])
partitioned_table = source.partition_by(["IntCol"])

result = partitioned_table.merge()
```

## Related documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html#deephaven.table.PartitionedTable.merge)
