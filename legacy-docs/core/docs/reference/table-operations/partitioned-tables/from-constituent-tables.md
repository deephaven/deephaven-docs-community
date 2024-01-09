---
id: from-constituent-tables
title: from_constituent_tables
---

The `from_constituent_tables` method creates a new `PartitionedTable` with a single column named `__CONSTITUENT__`, containing the provided constituent tables.

The resultant partitioned table has no key columns. Its `unique_keys` and `constituent_changes_permitted` attributes are `False`.

## Syntax

```python syntax
PartitionedTable.from_constituent_tables(
  tables: List[Table],
  constituent_table_columns: List[Column]
) -> PartitionedTable
```

## Parameters

<ParamTable>
<Param name="tables" type="List[Table]">

The constituent tables.

</Param>
<Param name="constituent_table_columns" type="List[Column]">

A list of column definitions compatible with all the constituent tables. Default is `None`. When `constituent_table_columns` is not provided, it will be set to the column definitions of the first table in the provided constituent tables.

</Param>
</ParamTable>

## Returns

A `PartitionedTable` with a single column named `__CONSTITUENT__`, containing the provided constituent tables. The resulting `PartitionedTable` has no key columns, and both its `unique_keys` and `constituent_changes_permitted` properties are set to `False`.

## Examples

The following example uses `from_constituent_tables` to create a new partitioned table from a partitioned table and source tables. Since `constituent_table_columns` is not given, the column definitions are taken from the first given in the `tables` argument.

```python order=result,source,source2
from deephaven import empty_table

source = empty_table(10).update(["IntCol = randomInt(1, 4)", "StrCol = `value`"])
source2 = empty_table(5).update(["IntCol = randomInt(3, 6)", "StrCol = `value`"])

partitioned_table = source.partition_by(["IntCol"])

pt = partitioned_table.from_constituent_tables(tables=[source, source2])

result = pt.merge()
```

## Related documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html#deephaven.table.PartitionedTable.from_constituent_tables)
