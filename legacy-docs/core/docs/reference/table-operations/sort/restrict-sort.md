---
id: restrict-sort
title: restrict_sort_to
---

`restrict_sort_to` only allows sorting on specified table columns. This can be useful to prevent users from accidentally performing expensive sort operations as they interact with tables in the UI.

## Syntax

```
restrict_sort_to(cols: Union[str, Sequence[str]]) -> Table
```

## Parameters

<ParamTable>
<Param name="cols" type="Union[str, Sequence[str]]">

The column(s) on which sorting is allowed.

</Param>
</ParamTable>

## Returns

A new table that only allows sorting on the columns specified in the `columnNames` argument.

## Examples

```python test-set=1 order=result,ticker_sorted,exchange_sorted
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("Ticker", ["AAPL", "AAPL", "IBM", "IBM", "GOOG", "GOOG"]),
    string_col("Exchange", ["Nyse", "Arca", "Nyse", "Arca", "Nyse", "Arca"]),
    int_col("Price", [75, 80, 110, 100, 25, 30]),
])

result = source.restrict_sort_to(cols=["Ticker", "Exchange"])

ticker_sorted = result.sort(order_by=["Ticker"])
exchange_sorted = result.sort(order_by=["Exchange"])
```

The table can be sorted by the columns `Ticker` or `Exchange` with success:

An attempt to sort a column outside the arguments of `restrictSortTo` will result in an error:

<!-- Skip because this intentionally errors -->

```python test-set=1 order=price_sorted should-fail
price_sorted = result.sort(order_by=["Price"])
```

![img](../../../assets/reference/sorts/restrict_sort2.png)

<!-- TODO: issue 594 - error fix; update image https://github.com/deephaven/deephaven-core/issues/594 -->

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/Table.html#restrictSortTo(java.lang.String...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html?highlight=sort#deephaven.table.Table.restrict_sort_to)
