---
id: category
title: How to create category plots
sidebar_label: Create category plots
---

This guide shows you how to use the [`plot_cat`](../../reference/plot/catPlot.md) method to create category plots, which display data values from different discrete categories.

## Data sourcing

### From a table

When data is sourced from a Deephaven table, the following syntax can be used:

`.plot_cat(series_name="series_name", t, category="Category", y="Y", y_low="YLow", y_high="YHigh", by=["GroupingColumn"])`

- `plot_cat` is the method used to create a category plot.
- `series_name` is the name of the series on the plot.
- `t` is the name of the table that holds the data you want to plot.
- `category` is the column in the source table with the category values.
- `y` is the column in the source table with the y values.
- `y_low` is a lower y error bar.
- `y_high` is a higher y error bar.
- `by` is a list of one or more columns that hold grouping data.

```python order=source,plot1 default=plot1
from deephaven.column import int_col, string_col
from deephaven.plot.figure import Figure
from deephaven import new_table

source = new_table([
    string_col("Categories", ["A", "B", "C"]),
    int_col("Values", [1, 3, 5])
])

plot1 = Figure()\
    .plot_cat(series_name="Categories", t=source, category="Categories", y="Values")\
    .show()
```

<!-- I'm having issues getting this to run, I'll leave it commented out for now
### From an array
When data is sourced from an [array](../../reference/query-language/types/arrays.md), the following syntax can be used to create a category:
`.catPlot(seriesName, category, values).show()`
- `catPlot` is the method used to create a category plot.
- `seriesName` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart itself.
- `category` is the array containing the data to be used for the X values.
- `values` is the array containing the data to be used for the Y values.
- `show` tells Deephaven to draw the plot in the console.

```python
from deephaven.plot import Figure

categories = ["A", "B", "C"]
values = [1, 3, 5]

result = Figure()\
    .plot_cat("Categories", categories, values)\
    .chart_title("Categories and Values")\
    .show()
```

NOTE: 12/12/2022 - I (JJ) still cannot get this to work with new plotting stuff.

-->

## Categories with shared axes

You can also compare multiple categories by creating a category plot with shared axes. In the following example, a second category plot has been added to the previous example, thereby creating bar graphs on the same chart:

```python order=new_plot,source_one,source_two
from deephaven.plot.figure import Figure
from deephaven.column import int_col, string_col
from deephaven import new_table

source_one = new_table([
    string_col("Categories", ["A", "B", "C"]),
    int_col("Values", [1, 3, 5])
])
source_two = new_table([
    string_col("Categories", ["A", "B", "C"]),
    int_col("Values", [2, 4, 6])
])

new_plot = Figure()\
    .plot_cat(series_name="source_one", t=source_one, category="Categories", y="Values")\
    .plot_cat(series_name="source_two", t=source_two, category="Categories", y="Values")\
    .show()
```

Subsequent categories can be added to the chart by adding additional [`plot_cat`](../../reference/plot/catPlot.md) methods to the query.

## Plot styles

By default, values are presented as vertical bars. Deephaven's [`PlotStyle`](../../reference/plot/plotStyle.md) method allows you to use other styles for your plots.

In any of the examples below, you can simply use the [`PlotStyle`](../../reference/plot/plotStyle.md) class with the appropriate value (e.g., `STACKED_BAR`, `HISTOGRAM`, etc.).

### Category plot with Stacked Bar

```python order=new_plot,source_one,source_two
from deephaven.plot.figure import Figure
from deephaven.plot import PlotStyle
from deephaven.column import int_col, string_col
from deephaven import new_table

source_one = new_table([
    string_col("Categories", ["A", "B", "C"]),
    int_col("Values", [1, 3, 5])
])
source_two = new_table([
    string_col("Categories", ["A", "B", "C"]),
    int_col("Values", [2, 4, 6])
])

new_plot = Figure()\
    .axes(plot_style=PlotStyle.STACKED_BAR)\
    .plot_cat(series_name="Categories1", t=source_one, category="Categories", y="Values")\
    .plot_cat(series_name="Categories2", t=source_two, category="Categories", y="Values")\
    .show()
```

## Related documentation

- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to create XY series plots](./xy-series.md)
- [How to create category histograms](./category-histogram.md)
- [How to create histograms](./histogram.md)
- [How to create pie charts](./pie.md)
- [How to create OHLC plots](./ohlc.md)
- [Arrays](../../reference/query-language/types/arrays.md)
- [`plot_cat`](../../reference/plot/catPlot.md)
- [PlotStyle](../../reference/plot/plotStyle.md)
- [Subplots](./subplots.md)
