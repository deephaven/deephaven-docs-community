---
id: pie
title: How to create pie charts
sidebar_label: Create pie charts
---

This guide shows you how to use the [`plot_pie`](../../reference/plot/piePlot.md) method to create pie charts, which show data as sections of a circle to represent the relative proportion for each of the categories that make up the entire dataset being plotted.

## Data sourcing

### From a table

When data is sourced from a table, the following syntax can be used to create a pie plot:

```python syntax
from deephaven.plot.figure import Figure

new_fig = Figure().plot_pie(series_name="Series", t=source_table, category="CategoryColumn", y="ValueColumn").show()
```

- `Figure` is the class in which pie plotting functionalities live.
- `new_fig` is a pie plot created with the [`plot_pie`](../../reference/plot/piePlot.md) method.
- `series_name` is the name that will be displayed on the plot.
- `t` is the table in which data will be sourced from.
- `category` is the name of the column which holds the categories to place in the pie chart.
- `y` is the name of the column in which the values for each category exist.
- `show` tells Deephaven to draw the plot in the console.

```python order=new_plot,insurance,insurance_by_region
from deephaven.plot.figure import Figure
from deephaven import read_csv

insurance = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/Insurance/csv/insurance.csv")
insurance_by_region = insurance.view(formulas=["region", "expenses"]).sum_by(["region"])

new_plot = Figure()\
    .plot_pie(series_name="Insurance charges by region", t=insurance_by_region, category="region", y="expenses")\
    .show()
```

## From an array

When data is sourced from an array, the following syntax can be used:

`.plot_pie(series_name, category, y).show()`

- `plot_pie` is the method used to create a pie chart.
- `series_name` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart.
- `category` is a list containing the data to be used for the categories.
- `y` is a list containing the data to be used for the values.
- `show` tells Deephaven to draw the plot in the console.

## Related documentation

- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to create subplots](./subplots.md)
- [How to create XY series plots](./xy-series.md)
- [How to create category plots](./category.md)
- [How to create histograms](./category-histogram.md)
- [How to create category histograms](./histogram.md)
- [How to create a treemap](./treemap.md)
- [Arrays](../../reference/query-language/types/arrays.md)
- [`plot_pie`](../../reference/plot/piePlot.md)
