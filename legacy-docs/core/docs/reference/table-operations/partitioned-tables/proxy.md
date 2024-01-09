---
id: proxy
title: proxy
---

The `proxy` method creates a new `PartitionedTableProxy` from the provided `PartitionedTable`.

A `PartitionedTableProxy` is a table operation proxy object for the underlying `PartitionedTable`. The `PartitionedTableProxy` gives users access to a variety of Deephaven table operations that are not available to a `PartitionedTable`. When a user has made all the desired changes to the `PartitionedTableProxy`, they can call the `target` method to return the underlying `PartitionedTable` with the changes applied.

A query can achieve the same results by using either `transform` or a partitioned table proxy. The proxy object is a convenience method that makes it simpler to apply transformations to a partitioned table, but with less control. Consider the level of control you need over your partitioned tables when choosing between the two.

## Syntax

```python syntax
PartitionedTable.proxy(
  require_matching_keys: bool = True,
  sanity_check_joins: bool = True
) -> PartitionedTableProxy
```

## Parameters

<ParamTable>
<Param name="require_matching_keys" type="bool">

Whether to ensure that both `PartitionedTable`s have all the same keys present when an operation uses this `PartitionedTable` and another `PartitionedTable` as inputs for a `partitioned_transform()`. The default is `True`.

</Param>
<Param name="sanity_check_joins" type="bool">

Whether to check that for proxied join operations, a given join key only occurs in exactly one constituent table of the underlying `PartitionedTable`. If the other table argument is also a `PartitionedTableProxy`, its constituents will be subjected to this sanity check.

</Param>
</ParamTable>

## Returns

A `PartitionedTableProxy`.

## Methods available to PartitionedTableProxy

The following methods are available to a `PartitionedTableProxy`:

:::note

The following links are for the `Table` version of each of these methods. The `PartitionedTableProxy` version of each method is identical, except that it returns a `PartitionedTableProxy` instead of a `Table`.

:::

- [`target`]
- [`require_matching_keys`]
- [`sanity_check_joins`]
- [`abs_sum_by()`](../group-and-aggregate/AbsSumBy.md)
- [`agg_all_by()`](../group-and-aggregate/AggAllBy.md)
- [`agg_by()`](../group-and-aggregate/aggBy.md)
- [`aj()`](../join/aj.md)
- [`avg_by()`](../group-and-aggregate/avgBy.md)
- [`count_by()`](../group-and-aggregate/countBy.md)
- [`exact_join()`](../join/exact-join.md)
- [`first_by()`](../group-and-aggregate/firstBy.md)
- [`group_by()`](../group-and-aggregate/groupBy.md)
- [`head()`](../filter/head.md)
- [`is_refreshing`](../metadata/is_refreshing.md)
- [`join()`](../join/join.md)
- [`last_by()`](../group-and-aggregate/lastBy.md)
- [`max_by()`](../group-and-aggregate/maxBy.md)
- [`median_by()`](../group-and-aggregate/medianBy.md)
- [`min_by()`](../group-and-aggregate/minBy.md)
- [`natural_join()`](../join/natural-join.md)
- [`raj()`](../join/raj.md)
- [`reverse()`](../sort/reverse.md)
- [`select()`](../select/select.md)
- [`select_distinct()`](../select/select-distinct.md)
- [`snapshot()`](../snapshot/snapshot.md)
- [`snapshot_when()`](../snapshot/snapshot-when.md)
- [`sort()`](../sort/sort.md)
- [`sort_descending()`](../sort/sort-descending.md)
- [`std_by()`](../group-and-aggregate/stdBy.md)
- [`sum_by()`](../group-and-aggregate/sumBy.md)
- [`tail()`](../filter/tail.md)
- [`update()`](../select/update.md)
- [`update_by()`](../update-by-operations/updateBy.md)
- [`update_graph`](../metadata/update_graph.md)
- [`update_view()`](../select/update-view.md)
- [`var_by()`](../group-and-aggregate/varBy.md)
- [`view()`](../select/view.md)
- [`weighted_avg_by()`](../group-and-aggregate/weighted-avg-by.md)
- [`weighted_sum_by()`](../group-and-aggregate/weighted-sum-by.md)
- [`where()`](../filter/where.md)
- [`where_in()`](../filter/where-in.md)
- [`where_not_in()`](../filter/where-not-in.md)

## Example

In this example, we create a `PartitionedTable`, then create a `PartitionedTableProxy` so that we can call `reverse` to reverse the order of our results. Finally, we call `get_constituent` to return the table we want to look at.

```python order=result,source
from deephaven import empty_table

source = empty_table(5).update(["IntCol = i", "StrCol = (IntCol < 2) ? `A` : `B`"])
partitioned_table = source.partition_by(["StrCol"])

proxy = partitioned_table.proxy()

result = proxy.reverse().target.get_constituent("B")
```

## Related documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html#deephaven.table.PartitionedTable.proxy)
