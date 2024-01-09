---
id: partition-by
title: How to partition a table into subtables
sidebar_label: Partition a table into subtables
---

This guide will show you how to use [`partitionBy`](../reference/table-operations/group-and-aggregate/partitionBy.md) to partition tables into subtables by key columns.

Subtables are useful for:

- [Parallelizing queries](../conceptual/query-engine/parallelization.md) across multiple threads
- Quickly retrieving subtables in a user interface
- Improving the performance of filters iteratively called within loops <!-- TODO: https://github.com/deephaven/deephaven.io/issues/342 Conceptual: fast table partitioning -->

:::note

Subtable partitioning via [`partitionBy`](../reference/table-operations/group-and-aggregate/partitionBy.md) should not be confused with [grouping and aggregation](./dedicated-aggregations.md), which is used to compute statistics over subsets of data.

:::

## Create subtables from a source table

Subtables are created by calling [`partitionBy`](../reference/table-operations/group-and-aggregate/partitionBy.md) with a list of key columns. All rows from the input table with the same key values are grouped together into a subtable. The resulting subtables are stored in a [`PartitionedTable`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/PartitionedTable.html).

```groovy test-set=2 order=source
source = emptyTable(5).update("IntCol = i", "StrCol = `value`")
partitionedTable = source.partitionBy("IntCol")
```

## Retrieve a subtable from a `PartitionedTable`

The [`constituentFor`](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/PartitionedTable.html#constituentFor(java.lang.Object...)>) method on the [`PartitionedTable`](https://deephaven.io/core/javadoc/io/deephaven/engine/table/PartitionedTable.html) is used to retrieve a subtable. A variable number of key values are used to retrieve the constituent. The order of the key values must correspond to key values from the key columns used to partition the table.

```groovy test-set=2 order=subTable
subTable = partitionedTable.constituentFor(3)
```

## Retrieve all subtables from a `PartitionedTable`

The [`constituents`](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/PartitionedTable.html#constituents()>) method returns all subtables for the partitioned table.

```groovy test-set=2 order=subTableZero,subTableOne
subTables = partitionedTable.constituents()

subTableZero = subTables[0]
subTableOne = subTables[1]
```

## Identify key columns in a `PartitionedTable`

The [`keyColumnNames`](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/PartitionedTable.html#keyColumnNames()>) method provides the names of all of the current key columns in the `PartitionedTable`.

```groovy test-set=2
println partitionedTable.keyColumnNames()
```

## Get keys in a `PartitionedTable`

<!--TODO: Figure out how to use keyColumnNames() for this-->

You can create a table containing all of the keys by calling `selectDistinct` with the key columns on the `Table` representation of the `PartitionedTable`.

```groovy test-set=2 order=keys
keys = partitionedTable.table().selectDistinct("IntCol")
```

## Examples

The examples in this guide use a table called `houses` that contains data on several fictitious homes. It is created using [`newTable`](../reference/table-operations/create/newTable.md).

```groovy test-set=1
houses = newTable(
    stringCol("HomeType", "Colonial", "Contemporary", "Contemporary", "Condo", "Colonial", "Apartment"),
    intCol("HouseNumber", 1, 3, 4, 15, 4, 9),
    stringCol("StreetName", "Test Drive", "Test Drive", "Test Drive", "Deephaven Road", "Community Circle", "Community Circle"),
    intCol("SquareFeet", 2251, 1914, 4266, 1280, 3433, 981),
    intCol("Price", 450000, 400000, 1250000, 300000, 600000, 275000),
    doubleCol("LotSizeAcres", 0.41, 0.26, 1.88, 0.11, 0.95, 0.10)
)
```

### Partition a table using one column

The example below partitions the `houses` table into subtables by `HomeType`. Printing the keys shows that there is one key for each unique value in the `HomeType` column. Using [`constituentFor`](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/PartitionedTable.html#constituentFor(java.lang.Object...)>) to retrieve the `Colonial` subtable results in the `colonialHomes` table, which contains only Colonial style homes from the `houses` table.

```groovy test-set=1 order=colonialHomes
housesByType = houses.partitionBy("HomeType")

println housesByType.keyColumnNames()

colonialHomes = housesByType.constituentFor("Colonial")
```

### Partition a table using more than one column

The example below partitions the `houses` table into subtables by `HomeType` and `StreetName`. Printing the keys shows that there is one key for each unique pair of values in the `HomeType` and `StreetName` columns.

```groovy test-set=1 order=contemporaryHomesOnTestDrive,colonialHomesOnCommunityCircle
housesByStreetAndType = houses.partitionBy("StreetName", "HomeType")

println housesByStreetAndType.keyColumnNames()

contemporaryHomesOnTestDrive = housesByStreetAndType.constituentFor("Test Drive", "Contemporary")
colonialHomesOnCommunityCircle = housesByStreetAndType.constituentFor("Community Circle", "Colonial")
```

## Related documentation

- [Create a new table](../how-to-guides/new-table.md)
- [partitionBy](../reference/table-operations/group-and-aggregate/partitionBy.md)
- [PartitionedTable Javadoc](https://deephaven.io/core/javadoc/io/deephaven/engine/table/PartitionedTable.html)
- [Parallelizing queries](../conceptual/query-engine/parallelization.md)
  <!-- TODO: https://github.com/deephaven/deephaven.io/issues/342 Conceptual: fast table partitioning -->
