---
id: partitioned-transform
title: partitioned_transform
---

`partitioned_transform` transforms a given partition table along with another based on a transformation function. Typically, a transformation function will join the two partitioned tables together in the manner prescribed, and possibly apply other operations before returning a new partitioned table. The transformation function _must_ take two tables as input and return a single table.

:::note

If the Tables underlying this `PartitionedTable` or `other` change, a corresponding change will propagate to the result.

:::

## Syntax

```python syntax
PartitionedTable.partitioned_transform(
  other: PartitionedTable,
  func: Callable[[Table, Table], Table]
) -> PartitionedTable
```

## Parameters

<ParamTable>
<Param name="other" type="PartitionedTable">

The other `PartitionedTable`, whose constituent tables will be passed in as the second argument to the provided function.

</Param>
<Param name="func" type="Callable[[Table, Table], Table]">

A function that takes two Tables as arguments and returns a new Table.

</Param>
</ParamTable>

## Returns

A `PartitionedTable`.

## Example

The following example:

- Creates two partitioned tables, `source` and `source2`.
  - `source` contains fake cryptocurrency price data for different real-world exchanges and coins.
  - `source2` contains fake cryptocurrency trade data for different real-world exchanges and coins.
- Defines a transformation function, `partitioned_transform_func`, which [joins](../join/join.md) two tables to return a single table.
  - The `join` is done from within an execution context.
- Uses `partitioned_transform` to apply `partitioned_transform_func` to `pt` and `pt2`.
- Calls `merge` on the resultant partitioned table to get the resultant table.

```python order=result,source,source2
from deephaven.column import double_col, string_col
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

trade_exchanges = ["Coinbase", "Coinbase", "Kraken", "Kraken", "Kraken", "Coinbase"]
trade_coins = ["DOGE", "BTC", "BTC", "BTC", "ETH", "ETH"]
trade_prices = [0.061, 30082.21, 30101.01, 30094.65, 1739.99, 1744.02]
trade_sizes = [250.97, 0.3464, 0.0987, 1.1213, 0.811, 2.348]

source2 = new_table(cols=[
    string_col(name="Exchange", data=trade_exchanges),
    string_col(name="Coin", data=trade_coins),
    double_col(name="TradePrice", data=trade_prices),
    double_col(name="Size", data=trade_sizes)
])

pt2 = source2.partition_by(by=["Exchange", "Coin"])

from deephaven.execution_context import get_exec_ctx

ctx = get_exec_ctx()

def partitioned_transform_func(t1, t2):
    with ctx:
        return t1.join(t2, ["Exchange", "Coin"])

pt_new = pt.partitioned_transform(other=pt2, func=partitioned_transform_func)

result = pt_new.merge()
```

## Related documentation

- [Execution context](../../../conceptual/execution-context.md)
- [`empty_table`](../create/emptyTable.md)
- [`partition_by`](../group-and-aggregate/partitionBy.md)
- [`natural_join`](../join/natural-join.md)
- [`join`](../join/join.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html#deephaven.table.PartitionedTable.partitioned_transform)
