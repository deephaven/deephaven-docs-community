---
id: partitioned-table-sort
title: sort
---

`sort` returns a new `PartitionedTable` in which the rows are ordered based on values in a specified set of columns.

:::warning

A partitioned table cannot be sorted on its `__CONSTITUENT__` column.

:::

## Syntax

```python syntax
PartitionedTable.sort(
  order_by: Union[str, Sequence[str]],
  order: Union[SortDirection, Sequence[SortDirection]] = None
) -> PartitionedTable
```

## Parameters

<ParamTable>
<Param name="order_by" type="Union[str, Sequence[str]]">

The column(s) to be sorted on. Cannot include the `__CONSTITUENT__` column.

</Param>
<Param name="order" type="Union[SortDirection, Sequence[SortDirection]]">

The sort order(s). Default is `SortDirection.ASCENDING`.

</Param>
</ParamTable>

## Returns

A sorted `PartitionedTable`.

## Examples

The following example partitions a source table on a single column. The partitioned table is then sorted on that key column in descending order.

```python order=result,source
from deephaven import empty_table
from deephaven import SortDirection

source = empty_table(25).update(["IntCol = randomInt(1, 5)", "StrCol = `value`"])
partitioned_table = source.partition_by(["IntCol"])

result = partitioned_table.sort(order_by="IntCol", order=SortDirection.DESCENDING).table
```

The following example partitions a source table on two columns. The partitioned table is then sorted in ascending order on `Exchange` and descending order on `Coin`.

```python order=result,source
from deephaven.column import double_col, string_col
from deephaven import SortDirection
from deephaven import new_table

exchanges = ["Kraken", "Coinbase", "Coinbase", "Kraken", "Kraken", "Kraken", "Coinbase"]
coins = ["BTC", "ETH", "DOGE", "ETH", "DOGE", "BTC", "BTC"]
prices = [30100.5, 1741.91, 0.068, 1739.82, 0.065, 30097.96, 30064.25]

source = new_table(cols=[
    string_col(name="Exchange", data=exchanges),
    string_col(name="Coin", data=coins),
    double_col(name="Price", data=prices)
])

pt = source.partition_by(by=["Exchange", "Coin"])

result = pt.sort(order_by=["Exchange", "Coin"], order=[SortDirection.ASCENDING, SortDirection.DESCENDING]).table
```

## Related documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html#deephaven.table.PartitionedTable.sort)
