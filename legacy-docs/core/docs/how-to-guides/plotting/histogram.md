---
id: histogram
title: How to create histograms
sidebar_label: Create histograms
---

This guide shows you how to use the [`plot_xy_hist`](../../reference/plot/histPlot.md) method to create histograms.

The histogram is used to show how frequently different data values occur. The data is divided into logical intervals (or bins) , which are then aggregated and charted with vertical bars. Unlike bar charts (category plots), bars in histograms do not have spaces between them unless there is a gap in the data.

## Data sourcing

### From a table

When data is sourced from a table, the following syntax can be used:

`.plot_xy_hist(series_name="series_name", t, x="XCol", nbins).show()`

- `plot_xy_hist` is the method used to create a histogram.
- `series_name` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart itself.
- `t` is the table that holds the data you want to plot.
- `x` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) of data to be used for the X values.
- `nbins` is the integer number of intervals to use in the chart.
- `show` tells Deephaven to draw the plot in the console.

```python order=new_plot,source
from deephaven.plot.figure import Figure
from deephaven import new_table
from deephaven.column import int_col

source = new_table([
    int_col("Values", [1, 2, 2, 3, 3, 3, 4, 4, 5])
])

new_plot = Figure()\
    .plot_xy_hist(series_name="Histogram Values", t=source, x="Values", nbins=5)\
    .chart_title(title="Histogram of Values")\
    .show()
```

The [`plot_xy_hist`](../../reference/plot/histPlot.md) method assumes you want to plot the entire range of values in the dataset. However, you can also set the minimum and maximum values of the range using `xmin` and `xmax` respectively:

`.plot_xy_hist(series_name, t, x, xmin, xmax, nbins).show()`

- `plot_xy_hist` is the method used to create a histogram.
- `series_name` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart itself.
- `t` is the table that holds the data you want to plot.
- `x` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) of data to be used for the X values.
- `xmin` is a floating point minimum value in the `x` column you want to include in the plot.
- `xmax` is a floating point maximum value in the `x` column you want to include in the plot.
- `nbins` is the number of intervals to use in the chart.
- `show` tells Deephaven to draw the plot in the console.

```python order=new_plot,source
from deephaven.plot.figure import Figure
from deephaven import new_table
from deephaven.column import int_col

source = new_table([
    int_col("Values", [1, 2, 2, 3, 3, 3, 4, 4, 5])
])

new_plot = Figure()\
    .plot_xy_hist(series_name="Histogram Values", t=source, x="Values", xmin=2., xmax=4., nbins=5)\
    .chart_title(title="Histogram of Values")\
    .show()
```

### From an array

When data is sourced from an array, the following syntax can be used:

`.histPlot(seriesName, x, nbins).show()`

- `histPlot` is the method used to create a histogram.
- `seriesName` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart itself.

- `x` is the array containing the data to be used for the X values.
- `nbins` is the number of intervals to use in the chart.
- `show` tells Deephaven to draw the plot in the console.

```python order=new_plot
from deephaven.plot.figure import Figure
from numpy import array

source = array([1, 2, 2, 3, 3, 3, 4, 4, 5])

new_plot = Figure()\
    .plot_xy_hist(series_name="Histogram Values", x=list(source), nbins=5)\
    .chart_title(title="Histogram of Values")\
    .show()
```

Just like with a Deephaven table, you can also set the minimum and maximum values of the range using `xmin` and `xmax` respectively:

`.plot_xy_hist(series_name, x, xmin, xmax, nbins).show()`

- `plot_xy_hist` is the method used to create a histogram.
- `series_name` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart itself.
- `x` is the array containing the data to be used for the X values.
- `xmin` is the minimum value (as a double) of the range to be included.
- `xmax` is the maximum value (as a double) of the range to be included.
- `nbins` is the integer number of the intervals to use in the chart.
- `show` tells Deephaven to draw the plot in the console.

```python order=new_plot
from deephaven.plot.figure import Figure
from numpy import array

source = array([1, 2, 2, 3, 3, 3, 4, 4, 5])

new_plot = Figure()\
    .plot_xy_hist(series_name="Histogram Values", x=list(source), xmin=2., xmax=4., nbins=5)\
    .chart_title(title="Histogram of Values")\
    .show()
```

## Related documentation

- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to create XY series plots](./xy-series.md)
- [How to create category plots](./category.md)
- [How to create category histograms](./category-histogram.md)
- [How to create pie charts](./pie.md)
- [Arrays](../../reference/query-language/types/arrays.md)
- [`plot_xy_hist`](../../reference/plot/histPlot.md)
