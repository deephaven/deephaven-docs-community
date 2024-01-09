---
id: category-histogram
title: How to create category histograms
sidebar_label: Create category histograms
---

This guide shows you how to use the [`plot_cat_hist`](../../reference/plot/catPlot.md) method to create category histograms, which is used to show how frequently a set of discrete values (categories) occur.

## Basic category histogram

When data is sourced from a Deephaven table, the following syntax can be used:

`.plot_cat_hist(series_name="series_name", t, category="Category").show()`

- `plot_cat_hist` is the method used to create a category histogram.
- `series_name` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart itself.
- `t` is the table that holds the data you want to plot.
- `category` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) containing the discrete values.
- `show()` tells Deephaven to draw the plot in the console.

```python order=source,new_plot default=new_plot
from deephaven import new_table
from deephaven.column import int_col
from deephaven.plot.figure import Figure

source = new_table([
    int_col("Keys", [3, 2, 2, 1, 1, 1])
])


new_plot = Figure()\
    .plot_cat_hist(series_name="Category Histogram", t=source, category="Keys")\
    .show()
```

### From an array

When data is sourced from an array, the following syntax can be used:

`.plot_cat_hist(series_name, category).show()`

- `plot_cat_hist` is the method used to create a category histogram.
- `series_name` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the plot itself.
- `category` is a list containing the discrete values.
- `show` tells Deephaven to draw the plot in the console.

```python order=new_plot
from deephaven.plot.figure import Figure
import numpy as np

values = np.array([3, 2, 2, 1, 1, 1])

new_plot = Figure()\
    .plot_cat_hist(series_name="Values", category=list(values))\
    .chart_title(title="Count of Values")\
    .show()
```

## Related documentation

- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to create XY series plots](./xy-series.md)
- [How to create category plots](./category.md)
- [How to create histograms](./histogram.md)
- [How to create pie charts](./pie.md)
- [Arrays](../../reference/query-language/types/arrays.md)
- [`plot_cat`](../../reference/plot/catPlot.md)
