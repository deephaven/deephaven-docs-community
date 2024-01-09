---
id: from-partitioned-table
title: from_partitioned_table
---

The `from_partitioned_table` method creates a new `PartitionedTable` from the provided `PartitionedTable`, with added specifications such as which key columns to include, whether to allow changes to constituent tables, and more.

:::warning

The `key_cols`, `unique_keys`, `constituent_column`, `constituent_table_columns`, and `constituent_changes_permitted` parameters must either _all_ be `None`, or must _all_ have values.

:::

## Syntax

```python syntax
PartitionedTable.from_partitioned_table(
  table: Table,
  key_cols: Union[str, List[str]] = None,
  unique_keys: bool = None,
  constituent_column: str = None,
  constituent_table_columns: List[Column] = None,
  constituent_changes_permitted: bool = None,
) -> PartitionedTable
```

## Parameters

<ParamTable>
<Param name="table" type="Table">

The underlying `PartitionedTable`.

</Param>
<Param name="key_cols" type="Union[str, List[str]]" optional>

The key column(s) of `table`.

If `None`, the names of _all_ columns with a non-Table data type will be used as key columns.

</Param>
<Param name="unique_keys" type="bool" optional>

Whether the keys in `table` are guaranteed to be unique.

If `None`, the value defaults to `False`.

</Param>
<Param name="constituent_column" type="str" optional>

The constituent column name in `table`.

If `None`, the value defaults to the name of the first column with a Table data type (usually `__CONSTITUENT__`).

</Param>
<Param name="constituent_table_columns" type="List[Column]" optional>

The column definitions of the constituent table.

If `None`, the value defaults to the column definitions of the first cell (constituent table) in the constituent column. Consequently, the constituent column cannot be empty.

</Param>
<Param name="constituent_changes_permitted" type="bool" optional>

Whether the constituent tables can be changed.

If `None`, the value defaults to the result of `table.is_refreshing`.

</Param>
</ParamTable>

## Returns

A `PartitionedTable`.

## Example

```python order=result_from_pt,result,source,source2
from deephaven import empty_table

source = empty_table(5).update(["IntCol = i"])
source2 = empty_table(5).update(["IntCol = i * 3"])
partitioned_table = source.partition_by(["IntCol"])
partitioned_table2 = source2.partition_by(["IntCol"])

print(partitioned_table.key_columns)

result = partitioned_table.table

result_from_pt = partitioned_table.from_partitioned_table(table=partitioned_table2.table).table
```

<!--TODO: better example, + second example that uses the other parameters.-->

## Related documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html#deephaven.table.PartitionedTable.from_partitioned_table)
