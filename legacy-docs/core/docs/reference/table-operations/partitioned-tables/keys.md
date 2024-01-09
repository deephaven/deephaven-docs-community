---
id: keys
title: keys
---

The `keys` method returns a Table containing the keys of a `PartitionedTable`.

## Syntax

```python syntax
PartitionedTable.keys() -> Table
```

## Parameters

This method takes no parameters.

## Returns

A Table containing the keys of a `PartitionedTable`.

## Example

```python order=keys,source
from deephaven import empty_table

source = empty_table(5).update(["IntCol = randomInt(1, 4)", "StrCol = i%2==0 ? `A` : `B`", "IntCol2 = i*2"])
partitioned_table = source.partition_by(["IntCol", "StrCol"])

keys = partitioned_table.keys()
```

## Related documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html#deephaven.table.PartitionedTable.keys)
