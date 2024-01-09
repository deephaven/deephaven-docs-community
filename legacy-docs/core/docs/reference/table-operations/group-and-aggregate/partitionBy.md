---
id: partitionBy
title: partition_by
---

`partition_by` partitions a table into subtables. The resultant `PartitionedTable` can be visualized as a list of tables with the same schema stacked vertically. Like a list of tables, a partitioned table can be merged to form a new table.

## Syntax

```
table.partition_by(by: Union[str, list[str]], drop_keys: bool = False) -> PartitionedTable
```

## Parameters

<ParamTable>
<Param name="by" type="Union[str, list[str]]">

The column(s) by which to group data.

</Param>
<Param name="drop_keys" type="bool" optional>

Whether to drop key columns in the constituent tables. Default is `False`.

</Param>
</ParamTable>

## Returns

A `PartitionedTable` containing a subtable for each group.

## Examples

The following example creates a partitioned table from a source table. A single key column is used. Note that `partitioned_table` does not appear in the UI; we call `constituent_tables` to see its various constituent tables.

```python order=source,partition_keys,const_table1,const_table2,const_table3
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "N", "O", "N", "P", "M", "O", "P", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

partitioned_table = source.partition_by(by="X")

partition_keys = partitioned_table.keys()

const_table1 = partitioned_table.constituent_tables[0]
const_table2 = partitioned_table.constituent_tables[1]
const_table3 = partitioned_table.constituent_tables[2]
```

The following example creates a partitioned table from a source table. Multiple key columns are used. This time, [`get_constituent`](../partitioned-tables/get-constituent.md) is used to see one of its constituent tables.

```python order=source,result_a_m
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "N", "O", "N", "P", "M", "O", "P", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

partitioned_table = source.partition_by(by=["X", "Y"])

result_a_m = partitioned_table.get_constituent(key_values=["A", "M"])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to group and ungroup data](../../../how-to-guides/grouping-data.md)
- [How to partition a table into subtables](../../../how-to-guides/partition-by.md)
- [`from_constituent_tables`](../partitioned-tables/from-constituent-tables.md)
- [`from_partitioned_table`](../partitioned-tables/from-partitioned-table.md)
- [`get_constituent`](../partitioned-tables/get-constituent.md)
- [`agg_by`](./aggBy.md)
- [`partitioned_agg_by`](./partitionedAggBy.md)
- [`ungroup`](./ungroup.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/Table.html#partitionBy(java.lang.String...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html?highlight=partition#deephaven.table.Table.partition_by)
