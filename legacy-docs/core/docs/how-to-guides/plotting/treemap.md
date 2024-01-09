---
id: treemap
title: How to create treemap charts
sidebar_label: Create treemap charts
---

This guide shows you how to use the [`plot_treemap`](../../reference/plot/treemapPlot.md) method to create treemap charts, which show data in a hierarchical view where each element takes up a proportional amount based on its value.

## Data sourcing

### From a formatted table

Your table may already be formatted in the structure `plot_treemap` requires. At a minimum, you need to include the item IDs and parents for the structure of the treemap. When data is already structured in the source table (i.e. all parents are defined with a specific root) sourced from a table, the following syntax can be used to create a treemap plot:

```python order=s_and_p,source
from deephaven import read_csv
from deephaven.plot.figure import Figure

# source the data
source = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/StandardAndPoors500Financials/csv/s_and_p_500_market_cap.csv")

# plot the data
s_and_p = Figure().plot_treemap(series_name = "S&P 500 Companies by Sector", t = source, id = "Label", parent = "Parent").show()
```

You can interact with this plot by clicking on the group headers and cells. Clicking on a header will expand that group; clicking again reverts to the full view. Clicking on an individual cell expands its contents.

- `s_and_p` is a treemap plot created with the [`plot_treemap`](../../reference/plot/treemapPlot.md) method.
- `Figure` is the class in which treemap plotting functionalities live.
- `series_name` is the name that will be displayed on the plot.
- `t` is the table in which data will be sourced from.
- `id` is the name of the column which holds the item IDs to use in structuring the treemap chart.
- `parent` is the name of the column which holds the parent IDs each item is under to use in the treemap chart. There should only be one root.
- `show` tells Deephaven to draw the plot in the console.

By default, the colors selected for each section are selected from a default theme, and the label is simply the ID displayed.

You can provide other parameters to display more information:

```python order=s_and_p_marketcap,source
from deephaven import read_csv
from deephaven.plot.figure import Figure

# source the data
source = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/StandardAndPoors500Financials/csv/s_and_p_500_market_cap.csv")

# plot the data
s_and_p_marketcap = Figure().plot_treemap(series_name = "S&P 500 Market Cap", t = source, id = "Label", parent = "Parent", label = "Label", value = "Value", hover_text = "HoverText", color = "Color").show()
```

- `s_and_p_marketcap` is a treemap plot created with the [`plot_treemap`](../../reference/plot/treemapPlot.md) method.
- `Figure` is the class in which treemap plotting functionalities live.
- `series_name` is the name that will be displayed on the plot.
- `t` is the table from which data will be sourced.
- `id` is the name of the column that holds the item IDs to use in structuring the treemap chart.
- `parent` is the name of the column that holds the parent IDs each item is under to use in the treemap chart. There should only be one root.
- `label` is the label to use as display text instead of the raw ID.
- `value` is how large the sector should be compared to other sectors.
- `hover_text` is the text to display when hovering over a sector.
- `color` is the color to use for the sector.
- `show` tells Deephaven to draw the plot in the console.

### From raw data table

Sometimes when you pull data, it may not have the parent/child relationships defined. You can use Deephaven functions to format the table correctly:

```python reset order=s_and_p_treemap,source,financials,sectors,sector_items,stock_items,items
from deephaven import read_csv, merge
from deephaven.plot.figure import Figure

# Source the data
source = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/StandardAndPoors500Financials/csv/s_and_p_500_companies_financials.csv")

# Get a view of just the data we need
financials = source\
    .view([
        "Symbol",
        "Name",
        "Sector",
        "MarketCap=Market_Cap"
    ])

# Find the distinct sectors defined in the data
sectors = financials\
    .select_distinct(["Sector"])\
    .sort(["Sector"])

# Define `root` as the top parent, use sectors as the first level of children
sector_items = sectors\
    .view([
        "Parent=`root`",
        "Label=Sector",
        "Value=(long)0",
        "Color=`#373438`",
        "HoverText=Sector"
    ])

# Define our heat map function that will provide a color based on the percent change provided
def heatmap_daily_perc(perc):
    if perc < -0.02:
        return '#f95d84'
    if perc < -0.01:
        return '#f37e3f'
    if perc > 0.01:
        return '#9edc6f'
    return '#fcd65b'

# Update our data with random percent changes for display purposes
stock_items = financials\
    .update([
        "Perc=randomGaussian(0, 2)/100.0",
        "PercLabel=String.format(`%.1f%%`, Perc*100)"
    ])\
    .view([
        "Parent=Sector",
        "Label=Symbol",
        "Value=(long)MarketCap",
        "Color=(String)heatmap_daily_perc(Perc)",
        "HoverText=Name + `: ` + PercLabel"
    ])

# Merge the topmost sectors with the rest of the stock items
items = merge([sector_items, stock_items])

# Plot the data
s_and_p_treemap = Figure().plot_treemap(
    series_name = "S&P 500 Daily Change",
    t = items,
    id = "Label",
    parent = "Parent",
    label = "Label",
    value = "Value",
    hover_text = "HoverText",
    color = "Color",
).show()
```

- `financials` is the source table with the raw data.
- `sectors` is a table of the top-level distinct sectors in the raw data.
- `sector_items` is a table of the top-level sectors with label and color information associated with them.
- `heatmap_daily_perc` is a function that returns a color based on the percent change provided.
- `stock_items` is a table with all the stock items and their associated labels.
- `s_and_p_treemap` is a treemap plot created with the [`plot_treemap`](../../reference/plot/treemapPlot.md) method.
- `Figure` is the class in which treemap plotting functionalities live.
- `series_name` is the name that will be displayed on the plot.
- `t` is the table from which data will be sourced.
- `id` is the name of the column which holds the item IDs to use in structuring the treemap chart.
- `parent` is the name of the column which holds the parent IDs each item is under to use in the treemap chart. There should only be one root.
- `label` is the label to use as display text instead of the raw ID.
- `value` is how large the sector should be compared to other sectors.
- `hover_text` is the text to display when hovering over a sector.
- `color` is the color to use for the sector.
- `show` tells Deephaven to draw the plot in the console.

## Related documentation

- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to create XY series plots](./xy-series.md)
- [How to create category plots](./category.md)
- [How to create histograms](./category-histogram.md)
- [How to create category histograms](./histogram.md)
- [Arrays](../../reference/query-language/types/arrays.md)
- [`plot_pie`](../../reference/plot/piePlot.md)
