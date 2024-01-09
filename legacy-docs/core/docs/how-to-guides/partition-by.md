---
id: partition-by
title: How to partition a table into subtables
sidebar_label: Partition a table into subtables
---

This guide will show you how to use [`partition_by`](../reference/table-operations/group-and-aggregate/partitionBy.md) to partition tables into subtables by key columns.

Subtables are useful for:

- [Parallelizing queries](../conceptual/query-engine/parallelization.md) across multiple threads
- Quickly retrieving subtables in a user interface
- Improving the performance of filters iteratively called within loops <!-- TODO: https://github.com/deephaven/deephaven.io/issues/342 Conceptual: fast table partitioning -->

:::note

Subtable partitioning via [`partition_by`](../reference/table-operations/group-and-aggregate/partitionBy.md) should not be confused with [grouping and aggregation](./dedicated-aggregations.md), which is used to compute statistics over subsets of data.

:::

## Create subtables from a source table

Subtables are created by calling [`partition_by`](../reference/table-operations/group-and-aggregate/partitionBy.md) with a list of key columns. All rows from the input table with the same key values are grouped together into a subtable. The resulting subtables are stored in a `PartitionedTable`.

```python test-set=2 order=source
from deephaven import empty_table

source = empty_table(5).update(["IntCol = i", "StrCol = `value`"])
partitioned_table = source.partition_by(["IntCol"])
```

## Retrieve a subtable from a `PartitionedTable`

The `get_constituent` method on the `PartitionedTable` is used to retrieve a subtable. A list of key values is used to retrieve the constituent. The order of the list must correspond to key values from the key columns used to partition the table.

```python test-set=2 order=sub_table
sub_table = partitioned_table.get_constituent([3])
```

## Retrieve all subtables from a `PartitionedTable`

The `constituent_tables` property on the `PartitionedTable` returns all subtables for the partitioned table.

```python test-set=2 order=subtable_0,subtable_1,subtable_2,subtable_3,subtable_4
tables = partitioned_table.constituent_tables

index = 0
for table in tables:
    globals()[f"subtable_{index}"] = table
    index += 1
```

## Identify key columns in a `PartitionedTable`

The `key_columns` property on the `PartitionedTable` provides the names of all of the current key columns in the `PartitionedTable`.

```python test-set=2 order=null
print(partitioned_table.key_columns)
```

## Get keys in a `PartitionedTable`

You can create a table containing all of the keys by calling a `select_distinct` with the key columns on the `Table` representation of the `PartitionedTable`.

```python test-set=2 order=keys
keys = partitioned_table.table.select_distinct(partitioned_table.key_columns)
```

## Examples

The examples in this guide use a table called `houses` that contains data on several fictitious homes. It is created using [`new_table`](../reference/table-operations/create/newTable.md).

```python test-set=1
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col

houses = new_table([
    string_col("HomeType", ["Colonial", "Contemporary", "Contemporary", "Condo", "Colonial", "Apartment"]),
    int_col("HouseNumber", [1, 3, 4, 15, 4, 9]),
    string_col("StreetName", ["Test Drive", "Test Drive", "Test Drive", "Deephaven Road", "Community Circle", "Community Circle"]),
    int_col("SquareFeet", [2251, 1914, 4266, 1280, 3433, 981]),
    int_col("Price", [450000, 400000, 1250000, 300000, 600000, 275000]),
    double_col("LotSizeAcres", [0.41, 0.26, 1.88, 0.11, 0.95, 0.10])
])
```

### Partition a table using one column

The example below partitions the `houses` table into subtables by `HomeType`. Printing the keys shows that there is one key for each unique value in the `HomeType` column. Using `get_constituent` to retrieve the `Colonial` subtable results in the `colonial_homes` table, which contains only Colonial style homes from the `houses` table.

```python test-set=1 order=colonial_homes
houses_by_type = houses.partition_by(["HomeType"])

print(houses_by_type.key_columns)

colonial_homes = houses_by_type.get_constituent(["Colonial"])
```

### Partition a table using more than one column

The example below partitions the `houses` table into subtables by `HomeType` and `StreetName`. Printing the keys shows that there is one key for each unique pair of values in the `HomeType` and `StreetName` columns.

```python test-set=1 order=contemporary_homes_on_test_drive,colonial_homes_on_community_circle
houses_by_street_and_type = houses.partition_by(["StreetName", "HomeType"])

print(houses_by_street_and_type.key_columns)

contemporary_homes_on_test_drive = houses_by_street_and_type.get_constituent(["Test Drive", "Contemporary"])
colonial_homes_on_community_circle = houses_by_street_and_type.get_constituent(["Community Circle", "Colonial"])
```

## Related documentation

- [Create a new table](../how-to-guides/new-table.md)
- [`partition_by`](../reference/table-operations/group-and-aggregate/partitionBy.md)
- [`PartitionedTable` PyDocs](https://deephaven.io/core/pydoc/code/deephaven.table.html?#deephaven.table.PartitionedTable)
- [Parallelizing queries](../conceptual/query-engine/parallelization.md)
  <!-- TODO: https://github.com/deephaven/deephaven.io/issues/342 Conceptual: fast table partitioning -->
