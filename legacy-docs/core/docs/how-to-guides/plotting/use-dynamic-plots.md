---
id: use-dynamic-plots
title: How to create and use dynamic plots
sidebar_label: Create dynamic plots
---

Plots configured with a [`SelectableDataSet`](../../reference/query-language/types/SelectableDataSet.md) can be paired with Deephaven's [Input Filter](../user-interface/filters.md#input-filters), [Linker feature](../user-interface/filters.md#linker), or [drop-down filters](../user-interface/filters.md#dropdown-filter). As the input changes, the paired plot will dynamically update to reflect the filtered dataset.

## `one_click`

To create a dynamically updating plot - a plot that updates with "one click" in the console -, the data source must be a [`SelectableDataSet`](../../reference/query-language/types/SelectableDataSet.md). This is easily accomplished with the use of the [`one_click`](../../reference/plot/one-click.md) method:

```python syntax
one_click(t: Table, by: list[str] = None, require_all_filters: bool = False) -> SelectableDataSet
```

- `t` is the table containing the data.
- A list of strings, where each string is the name of a column to be made available for input filtering.
- `require_all_filters`, when set to `True`, will display a prompt explaining that filter controls must be added to the resulting plot. By default (`False`), this message will not be displayed.

```python order=null
from deephaven import read_csv
from deephaven.plot.selectable_dataset import one_click
from deephaven.plot.figure import Figure

source = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/CryptoCurrencyHistory/CSV/CryptoTrades_20210922.csv")
oc = one_click(t=source, by=["Instrument"])
plot = Figure().plot_xy(series_name="Plot", t=oc, x="Timestamp", y="Price").show()
```

![img](../../assets/how-to/ui/one-click-unfiltered.png)

<!--TODO: Add `one_click_to_partitioned_table` -->

## Input Filters

To pair your dynamic plot with an [Input Filter](../user-interface/filters.md#input-filters), navigate to **Input Filter** in the **Controls** menu in the upper right-hand corner of the UI, or select **Add Input Filters** in the console.

![img](../../assets/how-to/ui/ui-input-filter-dropdown.gif)

:::note
The Input Filter feature filters _every_ open table and dynamic plot in the console.
:::

## Linker Tool

Alternatively, you can use the [Linker](../user-interface/filters.md#linker) tool to pair the dynamic plot with a table by clicking the **Open Linker Tool** button in the console or choosing the **Linker** option from the **Controls** menu.

![img](../../assets/how-to/ui/linker-dropdown.png)

![img](../../assets/how-to/ui/linker-howto.gif)

Connect the input column button in the dynamic plot to the matching column in the trigger table. Double-clicking on any row in the trigger table will filter the target (the dynamic plot) to match the input column's value in that row.

## Related documentation

- [`one_click`](../../reference/plot/one-click.md)
- [`one_click_partitioned_table`](../../reference/plot/one-click-partitioned-table.md)
- [`SelectableDataSet`](../../reference/query-language/types/SelectableDataSet.md)
