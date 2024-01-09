---
id: rollup-table
title: How to create a hierarchical rollup table
sidebar_label: Create a rollup table
---

<!-- TODO: Link to conceptual guide on hierarchy https://github.com/deephaven/deephaven.io/issues/2079 -->

This guide will show you how to create a hierarchical rollup table. A rollup table combines Deephaven's powerful aggregations with a hierarchical structure as in tree tables. The introduction of hierarchy to Deephaven's aggregations API is a potent combination for real-time data processing.

A rollup table performs specified aggregations, then creates a hierarchical table that re-aggregates using one less `by` column on each level. A re-aggregation aggregates the results of the preceding aggregation one level down. A column that is no longer part of the aggregation key is replaced with a null value on each level.

The basic syntax is as follows:

```
result = source.rollup(aggs=agg_list, by=by_list, include_constituents)
```

In the result table, only the root and first-level nodes are initially expanded. Nodes can be expanded by clicking on the right-facing arrow in a corresponding `by` column.

## Usage

Rollup tables take three arguments. The first two are required, while the third is optional.

1. One or more aggregations.

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

The following aggregations are _not_ currently supported:

- [Group](../reference/table-operations/group-and-aggregate/AggGroup.md)
- [Partition](../reference/table-operations/group-and-aggregate/partitionBy.md)
- [Median](../reference/table-operations/group-and-aggregate/AggMed.md)
- [Percent](../reference/table-operations/group-and-aggregate/AggPct.md)
- [Weighted Average](../reference/table-operations/group-and-aggregate/AggWAvg.md)

In the case of a rollup table with a single aggregation, that aggregation can be on its own or in a single-element list. When more than one aggregation is used, the aggregations must be in a list. The aggregation(s) can be defined outside of the `rollup` call just like with [combined aggregations](./combined-aggregations.md#syntax).

2. A set of `by` columns that defines the hierarchy of grouped columns. These columns are what you will be able to manually expand and collapse with the downward and right-facing arrows in the table. The hierarchy is determined in a left-to-right order, so if the columns are specified `["ColumnOne", "ColumnTwo"]`, `ColumnOne` can be expanded to show all values of `ColumnTwo` that belong to each unique value in `ColumnOne`.

3. (Optional) A boolean to indicate whether or not to include constituent rows at the leaf level called `include_constituents`. Its default value is `False`.

## Examples

### Static data

In our [examples repository](https://github.com/deephaven/examples), we have an [insurance dataset](https://github.com/deephaven/examples/tree/main/Insurance) that can show a simple real-world use case of aggregations and hierarchy.

In this example, two rollup tables are created. The first performs zero aggregations, but creates hierarchy from the `region` and `age` columns. The second calculates an aggregated average of the `bmi` and `expenses` columns. Each rollup table specifies `include_constituents=True` as the second argument to ensure constituent nodes at the leaf level are included.

```python order=insurance,insurance_rollup
from deephaven import read_csv, agg

insurance = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/Insurance/csv/insurance.csv")

agg_list = [agg.avg(cols=["bmi", "expenses"])]
by_list = ["region", "age"]

test_rollup = insurance.rollup(aggs=[], by=by_list, include_constituents=True)
insurance_rollup = insurance.rollup(aggs=agg_list, by=by_list, include_constituents=True)
```

### Real-time data

The following example creates ticking source data that simulates groups, weights, and values. An aggregated average is calculated for each value, and an aggregated sum is calculated for each weight. The table is rolled up by the `N` and `M` columns, respectively.

```python ticking-table order=null
from deephaven import empty_table, time_table
from deephaven import agg

agg_list = [agg.avg(cols=["Value"]), agg.sum_(cols=["Weight"])]
by_list = ["N", "M"]

rows = empty_table(1_000_000).update_view(["Group = i", "N = i % 347", "M = i % 29"])
changes = time_table("PT0.0001S").view(["Group = i % 1_000_000", "LastModified = Timestamp", "Value = (i * Math.sin(i)) % 6977", "Weight = (i * Math.sin(i)) % 7151"]).last_by("Group")

source = rows.join(changes, "Group")

result = source.rollup(aggs=agg_list, by=by_list)
```

![img](../assets/how-to/rollup-table-realtime.gif)

## Related documentation

- [How to create a hierarchical tree table](./tree-table.md)
- [How to perform dedicated aggregations](./dedicated-aggregations.md)
- [How to perform combined aggregations](./combined-aggregations.md)
- [How to select, view, and update data in tables](./use-select-view-update.md)
- [`empty_table`](../reference/table-operations/create/emptyTable.md)
- [`time_table`](../reference/table-operations/create/timeTable.md)
