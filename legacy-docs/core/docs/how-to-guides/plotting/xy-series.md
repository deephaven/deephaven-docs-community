---
id: xy-series
title: How to create XY series plots
sidebar_label: Create XY series plots
---

This guide shows you how to use the [`plot_xy`](../../reference/plot/plot.md) method to create XY series plots.

XY series plots are generally used to show values over a continuum, such as time. XY Series plots can be represented as a line, a bar, an area or as a collection of points. The X axis is used to show the domain, while the Y axis shows the related values at specific points in the range.

## Data sourcing

XY Series plots can be created using data from Deephaven [tables](#from-a-table), [arrays](#from-an-array) and [functions](#from-a-function).

### From a table

When data is sourced from a Deephaven table, the following syntax can be used to create an XY series plot:

`.plot_xy("series_name", t, "x", "y").show()`

- [`plot_xy`](../../reference/plot/plot.md) is the method used to create an XY series plot.
- `"series_name"` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the plot itself.
- `t` is the table that holds the data you want to plot.
- `"x"` is the name of the column of data to be used for the X value.
- `"y"` is the name of the column of data to be used for the Y value.
- `show` tells Deephaven to draw the plot in the console.

The example query below will create an XY series plot that shows the high of Bitcoin for September 8, 2021.

```python test-set=1 order=source,plot_single default=plot_single
from deephaven import read_csv
from deephaven.plot.figure import Figure

# source the data
source = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/MetricCentury/csv/metriccentury.csv")

# plot the data
plot_single = Figure().plot_xy(series_name="Distance", t=source.where(filters=["SpeedKPH > 0"]), x="Time", y="DistanceMeters").show()
```

<!--
### From an array
When data is sourced from an [array](../../reference/query-language/types/arrays.md), the following syntax can be used to create an XY series plot:
`.plot("series_name", [x], [y]).show()`
- `plot` is the method used to create an XY series plot.
- `"series_name"` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the plot itself.
- `[x]` is the [array](../../reference/query-language/types/arrays.md) containing the data to be used for the X value.
- `[y]` is the [array](../../reference/query-language/types/arrays.md) containing the data to be used for the Y value.
- `show` tells Deephaven to draw the plot in the console.
### From a function
When data is sourced from a [function](../../reference/query-language/formulas/user-defined-functions.md), the following syntax can be used to create an XY Series plot:

`.plot("Function", {x->x*x} ).funcRange(0,10).funcNPoints(55).show()`

-->

## Plot by some key

You may want to create a plot with multiple series grouped by a particular key. This can be accomplished using the `by` parameter.

An individual XY series is plotted for each unique group in the identifier columns.

```python order=null
from deephaven.plot.figure import Figure
from deephaven import empty_table

source = empty_table(20).update(["Letter = (i % 2 == 0) ? `A` : `B`", "X = 0.1 * i", "Y = randomDouble(0.0, 5.0)"])

plot = Figure().plot_xy(series_name="Random numbers", t=source, x="X", y="Y", by=["Letter"]).show()
```

![img](../../assets/how-to/plots/plot_by.png)

## Shared axes

You can compare multiple series over the same period of time by creating an XY series plot with shared axes. In the following example, two series are plotted, thereby creating two line graphs on the same plot.

```python test-set=1 order=plot_shared_axis
# plot the data
plot_shared_axis = Figure()\
    .plot_xy(series_name="Altitude", t=source, x="Time", y="AltitudeMeters")\
    .plot_xy(series_name="Speed", t=source,  x="Time",  y="SpeedKPH")\
    .show()
```

:::tip
You can choose to hide one or more series in the plot. Simply click the name of the series at the right of the plot to hide that series; click the name again to restore it.
:::

Subsequent series can be added to the plot by adding additional `plot_xy` methods to the query.

## Multiple X or Y Axes

When plotting multiple series in a single plot, the range of the Y axis is an important factor to watch. As the range of the Y axis increases, value changes become harder to assess.

When the scale of the Y axis needs to cover an extremely wide range, the plot may result in relatively flat lines with barely distinguishable differences in values or trend.

This issue can be easily remedied by adding a second Y axis to the plot via the `x_twin` method.

### `x_twin`

The [`x_twin`](https://deephaven.io/core/pydoc/code/deephaven.plot.figure.html#deephaven.plot.figure.Figure.x_twin) method enables you to use one Y axis for some of the series being plotted and a second Y axis for the others, while sharing the same X axis:

`PlotName = Figure().plot_xy(...).x_twin().plot_xy(...).show()`

- The plot(s) for the series placed _before_ the `x_twin()` method share a common Y axis (on the left).
- The plot(s) for the series listed _after_ the `x_twin()` method share a common Y axis (on the right).
- All plots share the same X axis.

```python test-set=1 order=plot_shared_twin_x
plot_shared_twin_x = Figure().plot_xy(series_name="Altitude", t=source, x="Time", y="AltitudeMeters")\
    .x_twin()\
    .plot_xy(series_name="Speed", t=source,  x="Time",  y="SpeedKPH")\
    .show()
```

The value range for the high value is shown on the left axis and the value range for the low value is shown on the right axis.

### `y_twin`

The [`y_twin`](https://deephaven.io/core/pydoc/code/deephaven.plot.figure.html#deephaven.plot.figure.Figure.y_twin) method enables you to use one X axis for one set of the values being plotted and a second X axis for another, while sharing the same Y axis:

`plot_name = Figure().plot_xy(...).y_twin().plot_xy(...).show()`

- The plot(s) for the series placed _before_ the `y_twin()` method use the lower X axis.
- The plot(s) for the series listed _after_ the `y_twin()` method use the upper X axis.

## Plot styles

The XY series plot in Deephaven defaults to a line plot. However, Deephaven's `plot_style` method can be used to format XY series plots as area charts, stacked area charts, bar charts, stacked bar charts, scatter charts and step charts.

In any of the examples below, you can simply swap out the `plot_style` argument with the appropriate name; e.g., `("AREA")`, `("STACKED_BAR")`, `("LINE")`, etc.

### XY Series as a stacked area plot

In any of the examples below, you can simply swap out the `plot_style` argument with the name `("BAR")`, `("STACKED_BAR")`, `("LINE")`, `("AREA")`, `("STACKED_AREA")`, `("ERROR_BAR")`, etc.

```python test-set=1 order=plot_single_stacked_area
from deephaven.plot import PlotStyle

plot_single_stacked_area = Figure()\
    .axes(plot_style=PlotStyle.STACKED_AREA)\
    .plot_xy(series_name="Heart_rate", t=source, x="Time", y="HeartRate")\
    .show()
```

### XY Series as a scatter plot

In the example below, a scatter plot style is used. Additionally, `x_twin` has been specified to for both plots to share the same X axis.

```python test-set=1 order=plot_xy_scatter
from deephaven.plot.figure import Figure
from deephaven.plot import PlotStyle
from deephaven.plot import Color, Colors
from deephaven.plot import font_family_names, Font, FontStyle, Shape

plot_xy_scatter = Figure()\
    .plot_xy(series_name="Speed", t=source, x="Time", y="SpeedKPH")\
    .axes(plot_style=PlotStyle.SCATTER)\
    .x_twin()\
    .plot_xy(series_name="Distance", t=source, x="Time", y="DistanceMeters")\
    .axes(plot_style=PlotStyle.SCATTER)\
    .show()
```

### XY Series as a scatter plot with markers

In the example below, the scatter plot includes markers. First, `twin` method is used to clone the x- and y-axes. Then, the `SCATTER` PlotStyle is applied to the new axes. The `points` method draws the plot markers.

```python order=null
from deephaven import time_table
from deephaven.plot.figure import Figure
from deephaven.plot import PlotStyle
from deephaven.plot import Color, Colors
from deephaven.plot import font_family_names, Font, FontStyle, Shape

data = time_table("PT00:00:01") \
    .update(["Open = 10*sin(0.2*ii) + 2*random()","High = Open + 1", "Low = Open - 1", "Close = Open + 0.5"])

points = data \
    .where("i%5 = 0") \
    .view(["Timestamp", "Type= i%3==0 ? `Sell` : `Buy`", "Point = i%3==0 ? High+1 : Low-1"])

plot = Figure()\
    .figure_title("OHLC + Points")\
    .plot_xy(series_name="OHLC", t=data, x="Timestamp", y_high="High", y_low="Low", y="Close") \
    .twin() \
    .axes(plot_style=PlotStyle.SCATTER) \
    .plot_xy(series_name="Buy", t=points.where("Type=`Buy`"), x="Timestamp", y="Point") \
    .plot_xy(series_name="Sell", t=points.where("Type=`Sell`"), x="Timestamp", y="Point") \
   .show()
```

<LoopedVideo className="w-100" src={require('../../assets/how-to/plots/plot-point-overlay.mp4')} />

### XY Series as a step plot

In the example below, the `.plot_style` argument has the name `("STEP")`. Other parameters are defined to show the fine tuning detail under control.

```python test-set=1 order=plot_step
from deephaven.plot import LineEndStyle, LineJoinStyle, LineStyle

plot_step = Figure()\
    .axes(plot_style=PlotStyle.STEP)\
    .plot_xy(series_name="HeartRate", t=source, x="Time", y="HeartRate")\
    .line(style=LineStyle(width=1.0, end_style=LineEndStyle.ROUND))\
    .show()
```

## Plot multiple series in a loop

It's common in data analysis to have multiple series that share an X-axis. In such a case, a for loop can make things easier for plotting. The following example plots three different series on the same plot in a for loop.

```python order=source,plot
from deephaven.plot.figure import Figure
from deephaven import empty_table

source = empty_table(10).update(["X = i", "Y1 = randomInt(1, 10)", "Y2 = randomInt(3, 11)", "Y3 = randomInt(5, 15)"])

fig = Figure()

for idx in range(1, 4):
    fig = fig.plot_xy(series_name=f"Y{idx}", t=source, x="X", y=f"Y{idx}")

plot = fig.show()
```

## Related documentation

- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to create category plots](./category.md)
- [How to create histograms](./histogram.md)
- [How to create pie charts](./pie.md)
- [How to create category histograms](./category-histogram.md)
- [`plot_xy`](../../reference/plot/plot.md)
- [plotStyle](../../reference/plot/plotStyle.md)
- [Arrays](../../reference/query-language/types/arrays.md)
- [User-Defined Functions](../../reference/query-language/formulas/user-defined-functions.md)
