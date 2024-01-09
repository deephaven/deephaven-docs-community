---
id: rollup-table
title: How to create a hierarchical rollup table
sidebar: Create a rollup table
---

This guide will show you how to create a hierarchical rollup table. A rollup table combines Deephaven's powerful aggregations with a hierarchical structure as in tree tables. The introduction of hierarchy to Deephaven's aggregations API is a powerful combination for real-time data processing.

A rollup table performs specified aggregations, then creates a hierarchical table that re-aggregates using one less `by` column on each level. A re-aggregation aggregates the results of the preceding aggregation one level down. A column that is no longer part of the aggregation key is replaced with a null value on each level.

The basic syntax is as follows:

```
result = source.rollup(aggregations..., includeConstituents, byColumns...)
```

In the result table, only the root and first-level nodes are initially expanded. Nodes can be expanded by clicking on the right-facing arrow in a corresponding `by` column.

## Usage

A rollup table takes three arguments.

1. The first input argument when creating a rollup table is one or more aggregations.

The following aggregations are supported:

- [Average](../reference/table-operations/group-and-aggregate/AggAvg.md)
- [Count](../reference/table-operations/group-and-aggregate/AggCount.md)
- [Count distinct](../reference/table-operations/group-and-aggregate/AggCountDistinct.md)
- [First](../reference/table-operations/group-and-aggregate/AggFirst.md)
- [Last](../reference/table-operations/group-and-aggregate/AggLast.md)
- [Max](../reference/table-operations/group-and-aggregate/AggMax.md)
- [Min](../reference/table-operations/group-and-aggregate/AggMin.md)
- [Standard Deviation](../reference/table-operations/group-and-aggregate/AggStd.md)
- [Sum](../reference/table-operations/group-and-aggregate/AggSum.md)
- [Unique](../reference/table-operations/group-and-aggregate/AggUnique.md)
- [Variance](../reference/table-operations/group-and-aggregate/AggVar.md)
- [Weighted Sum](../reference/table-operations/group-and-aggregate/AggWSum.md)

The following aggregations are _not_ supported:

- [Group](../reference/table-operations/group-and-aggregate/AggGroup.md)
- [Partition](../reference/table-operations/group-and-aggregate/partitionBy.md)
- [Median](../reference/table-operations/group-and-aggregate/AggMed.md)
- [Percent](../reference/table-operations/group-and-aggregate/AggPct.md)
- [Weighted Average](../reference/table-operations/group-and-aggregate/AggWAvg.md)

In the case of a rollup table with a single aggregation, that aggregation can be on its own or in a single-element list. When more than one aggregation is used, the aggregations must be in a list. The aggregation(s) can be defined outside of the `rollup` call just like with [combined aggregations](./combined-aggregations.md#syntax).

2. The second input argument to `rollup` is `includeConstituents`. It determines whether or not to include the constituent rows at the leaf level.

3. (Optional) The last input arguments when creating a rollup table defines the hierarchy of grouped columns. These columns are what you will be able to manually expand and collapse with the downward and right-facing arrows in the table. The hierarchy is determined in a left-to-right order, so if the columns are specified `"ColumnOne", "ColumnTwo"`, `ColumnOne` can be expanded to show all values of `ColumnTwo` that belong to each unique value in `ColumnOne`.

## Examples

### Static data

In our [examples repository](https://github.com/deephaven/examples), we have an [insurance dataset](https://github.com/deephaven/examples/tree/main/Insurance) that can show a simple real-world use case of aggregations and hierarchy.

In this example, two rollup tables are created. The first performs zero aggregations, but creates hierarchy from the `region` and `age` columns. The second calculates an aggregated average of the `bmi` and `expenses` columns. Each rollup table specifies `true` as the second argument to ensure constituent nodes at the leaf level are included.

```groovy order=insurance,insuranceRollup
import static io.deephaven.csv.CsvTools.readCsv
import io.deephaven.api.agg.spec.AggSpec
import io.deephaven.api.agg.Aggregation

insurance = readCsv("https://media.githubusercontent.com/media/deephaven/examples/main/Insurance/csv/insurance.csv")

aggList = [Aggregation.of(AggSpec.avg(), "bmi", "expenses")]

testRollup = insurance.rollup([], true, "region", "age")
insuranceRollup = insurance.rollup(aggList, true, "region", "age")
```

### Real-time data

In this example, a rollup table is created from simulated real-time ticking data. The aggregated average of the `Value` column and the aggregated sum of the `Weight` column are calculated. The `N` and `M` columns are the `by` columns, meaning hierarchy is created from those two in that order. The rollup table ticks in turn with the underlying source data.

```groovy ticking-table order=null
import io.deephaven.api.agg.spec.AggSpec
import io.deephaven.api.agg.Aggregation

aggList = [Aggregation.of(AggSpec.avg(), "Value"), Aggregation.of(AggSpec.sum(), "Weight")]

rows = emptyTable(1_000_000).updateView("Group = i", "N = i % 347", "M = i % 29")
changes = timeTable("PT00:00:00.0001").view("Group = i % 1_000_000", "LastModified = Timestamp", "Value = (i * Math.sin(i)) % 6977", "Weight = (i * Math.sin(i)) % 7151").lastBy("Group")

source = rows.join(changes, "Group")

result = source.rollup(aggList, false, "N", "M")
```

![img](../../../../core/docs/assets/how-to/rollup-table-realtime.gif)

## Related documentation

- [How to create a hierarchical tree table](./tree-table.md)
- [How to perform dedicated aggregations](./dedicated-aggregations.md)
- [How to perform combined aggregations](./combined-aggregations.md)
- [How to select, view, and update data in tables](./use-select-view-update.md)
- [`emptyTable`](../reference/table-operations/create/emptyTable.md)
- [`timeTable`](../reference/table-operations/create/timeTable.md)
