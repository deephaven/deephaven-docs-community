---
id: get-constituent
title: get_constituent
---

The `get_constituent` method returns a single constituent table according to the specified key column value(s). If there are no matching rows, the result is `None`. If there are multiple matching rows, a DHError is thrown.

## Syntax

```python syntax
PartitionedTable.get_constituent(key_values: Union[Any, Sequence[Any]]) -> Table
```

## Parameters

<ParamTable>
<Param name="key_values" type="Union[Any, Sequence[Any]]">

The values for key column(s) to match.

</Param>
</ParamTable>

## Returns

The specified constituent table, or `None`.

## Example

In the following example, we use `get_constituent` to retrieve the constituent table with key value `3`.

```python order=result,source
from deephaven import empty_table

source = empty_table(5).update(["IntCol = i", "StrCol = `value`"])
partitioned_table = source.partition_by(["IntCol"])

result = partitioned_table.get_constituent(3)
```

In the following example, we partition our source table by both the `IntCol` and `StrCol` columns. We then use `get_constituent` to retrieve the constituent table with key values `A` and `2`.

```python order=result,source
from deephaven import empty_table

source = empty_table(5).update(["IntCol = i", "StrCol = i%2==0 ? `A` : `B`"])
partitioned_table = source.partition_by(["StrCol", "IntCol"])

result = partitioned_table.get_constituent(key_values=['A', 2])
```

## Related documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html#deephaven.table.PartitionedTable.get_constituent)
