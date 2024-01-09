---
id: use-dynamic-plots
title: How to create and use dynamic plots
sidebar_label: Create dynamic plots
---

Plots configured with a [`SelectableDataSetOneClick`](../../reference/query-language/types/SelectableDataSetOneClick.md) can be paired with Deephaven's [Input Filter](../../how-to-guides/user-interface/filters.md#input-filters), [Linker feature](../../how-to-guides/user-interface/filters.md#linker), or drop-down filters. As the input changes, the paired plot will dynamically update to reflect the filtered dataset.

## `oneClick`

To create a dynamically updating plot - a plot that updates with "one click" in the console -, the data source must be a [`SelectableDataSetOneClick`](../../reference/query-language/types/SelectableDataSetOneClick.md). This is easily accomplished with the use of the [`oneClick`](../../reference/plot/oneClick.md) method:

```
oneClick(pTable)
oneClick(pTable, requireAllFiltersToDisplay)
oneClick(t, requireAllFiltersToDisplay, byColumns)
oneClick(t, byColumns...)
```

- `pTable` is a partitioned table containing the data.
- `t` is the table containing the data.
- `byColumns` is a list of strings, where each string is the name of a column to be made available for input filtering.
- `requireAllFiltersToDisplay`, when set to `true`, will display a prompt explaining that filter controls must be added to the resulting plot. By default (`false`), this message will not be displayed.

```groovy skip-test
import static io.deephaven.csv.CsvTools.readCsv

source = readCsv("https://media.githubusercontent.com/media/deephaven/examples/main/CryptoCurrencyHistory/CSV/CryptoTrades_20210922.csv")
oc = oneClick(source, "Instrument")
plot = plot("Plot", oc, "Timestamp", "Price").show()
```

![img](../../assets/how-to/oc-result-unfiltered.png)

## Input Filters

To pair your dynamic plot with an [Input Filter](../../how-to-guides/user-interface/filters.md#input-filters), navigate to **Input Filter** in the **Controls** menu in the upper right-hand corner of the UI, or select **Add Input Filters** in the console.

![img](../../assets/how-to/ui-input-filter-gr.gif)

:::note
The Input Filter feature filters _every_ open table and dynamic plot in the console.
:::

## Linker Tool

Alternatively, you can use the [Linker](../../how-to-guides/user-interface/filters.md#linker) tool to pair the dynamic plot with a table by clicking the **Open Linker Tool** button in the console or choosing the **Linker** option from the **Controls** menu.

![img](../../assets/how-to/linker-button.png)

![img](../../assets/how-to/linker-tool.gif)

Connect the input column button in the dynamic plot to the matching column in the trigger table. Double-clicking on any row in the trigger table will filter the target (the dynamic plot) to match the input column's value in that row.

## Related documentation

- [`oneClick`](../../reference/plot/oneClick.md)
- [`SelectableDataSetOneClick`](../../reference/query-language/types/SelectableDataSetOneClick.md)
