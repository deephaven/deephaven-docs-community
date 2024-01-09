---
id: xy-series
title: How to create XY series plots
sidebar_label: Create XY series plots
---

This guide shows you how to use the [`plot`](../../reference/plot/plot.md) method to create XY series plots.

XY series plots are generally used to show values over a continuum, such as time. XY Series plots can be represented as a line, a bar, an area or as a collection of points. The X axis is used to show the domain, while the Y axis shows the related values at specific points in the range.

## Data sourcing

XY Series plots can be created using data from Deephaven [tables](#from-a-table), [arrays](#from-an-array) and [functions](#from-a-function).

### From a table

When data is sourced from a Deephaven table, the following syntax can be used to create an XY series plot:

`.plot("SeriesName", source, "xCol", "yCol").show()`

- [`plot`](../../reference/plot/plot.md) is the method used to create an XY series plot.
- `"SeriesName"` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the plot itself.
- `source` is the table that holds the data you want to plot.
- `"xCol"` is the name of the column of data to be used for the X value.
- `"yCol"` is the name of the column of data to be used for the Y value.
- `show` tells Deephaven to draw the plot in the console.

The example query below will create an XY series plot that shows the high of Bitcoin for September 8, 2021.

:::note
Python users must import the appropriate module: `from deephaven import Plot` or `from deephaven import Plot as plt`
:::

```groovy test-set=1 order=source,plot_single default=plot_single
import static io.deephaven.csv.CsvTools.readCsv

//source the data
source = readCsv("https://media.githubusercontent.com/media/deephaven/examples/main/MetricCentury/csv/metriccentury.csv")

//plot the data
plot_single = plot("Distance",  source.where("SpeedKPH > 0"), "Time", "DistanceMeters").show()
```

<!--

### From an array

When data is sourced from an [array](../../reference/query-language/types/arrays.md), the following syntax can be used to create an XY series plot:

`.plot("SeriesName", [x], [y]).show()`

- `plot` is the method used to create an XY series plot.
- `"SeriesName"` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the plot itself.
- `[x]` is the [array](../../reference/query-language/types/arrays.md) containing the data to be used for the X value.
- `[y]` is the [array](../../reference/query-language/types/arrays.md) containing the data to be used for the Y value.
- `show` tells Deephaven to draw the plot in the console.

### From a function

When data is sourced from a [function](../../reference/query-language/formulas/user-defined-functions.md), the following syntax can be used to create an XY Series plot:

`.plot("SeriesName", function).show()`

- `plot` is the method used to create an XY series plot.
- `"SeriesName"` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the plot itself.
- `function` is a mathematical operation that maps one value to another. Examples of Groovy functions and their formatting follow:
  - `{x->x+100}` adds 100 to the value of x.
  - `{x->x*x}` squares the value of x.
  - `{x->1/x}` uses the inverse of x.
  - `{x->x*9/5+32}` Fahrenheit to Celsius conversion.
- `show` tells Deephaven to draw the plot in the console.

If you are plotting a function in a plot by itself, consider applying a range for the function using the `funcRange` or `xRange` method. Otherwise, the default value (`[0,1]`) will be used, which may not meet your requirements:

`.plot("Function", {x->x*x} ).funcRange(0,10).show()`

If the function is being plotted with other data series, the `funcRange` method is not needed, and the range will be obtained from the other data series.

When using a function plot, you may also want to increase or decrease the granularity of the plot by declaring the number of points to include in the range. This is configurable using the `funcNPoints` method:

`.plot("Function", {x->x*x} ).funcRange(0,10).funcNPoints(55).show()`

-->

## Shared axes

You can compare multiple series over the same period of time by creating an XY series plot with shared axes. In the following example, two series are plotted, thereby creating two line graphs on the same plot.

```groovy test-set=1
plot_shared_axis = plot("Altitude", source, "Time", "AltitudeMeters")\
    .plot("Speed", source, "Time", "SpeedKPH")\
    .show()
```

:::tip
You can choose to hide one or more series in the plot. Simply click the name of the series at the right of the plot to hide that series; click the name again to restore it.
:::

Subsequent series can be added to the plot by adding additional `plot` methods to the query.

## Multiple X or Y Axes

When plotting multiple series in a single plot, the range of the Y axis is an important factor to watch. As the range of the Y axis increases, value changes become harder to assess.

When the scale of the Y axis needs to cover an extremely wide range, the plot may result in relatively flat lines with barely distinguishable differences in values or trend.

This issue can be easily remedied by adding a second Y axis to the plot via the `twinX` method.

### `twinX`

The `twinX` method enables you to use one Y axis for some of the series being plotted and a second Y axis for the others, while sharing the same X axis:

`PlotName = figure().plot(...).twinX().plot(...).show()`

- The plot(s) for the series placed _before_ the `twinX()` method share a common Y axis (on the left).
- The plot(s) for the series listed _after_ the `twinX()` method share a common Y axis (on the right).
- All plots share the same X axis.

```groovy test-set=1
plotSharedTwinX = plot("Altitude", source, "Time", "AltitudeMeters")\
    .twinX()\
    .plot("Speed", source, "Time", "SpeedKPH")\
    .show()
```

The value range for the high value is shown on the left axis and the value range for the low value is shown on the right axis.

### `twinY`

The `twinY` method enables you to use one X axis for one set of the values being plotted and a second X axis for another, while sharing the same Y axis:

`PlotName = figure().plot(...).twinY().plot(...).show()`

- The plot(s) for the series placed _before_ the `twinY()` method use the lower X axis.
- The plot(s) for the series listed _after_ the `twinY()` method use the upper X axis.

## Multiple series

Multiple plot methods can be used within the same query to produce a chart with multiple series. However, the `plotBy` methods include an additional argument that enables users to specify the grouping column to be used to plot multiple series. This greatly simplifies and shortens the query structure:

```syntax
.plotBy("Series1", source, "xCol", "yCol", "groupByCol").show()

.catPlotBy("SeriesName", source, "CategoryCol", "ValueCol", "groupByCol").show()

.ohlcPlotBy("SeriesName", source, "Time", "Open", "High", "Low", "Close" "groupByCol").show()
```

```groovy test-set=2 order=source,plotBy default=plotBy
import static io.deephaven.csv.CsvTools.readCsv

//source the data
source = readCsv("https://media.githubusercontent.com/media/deephaven/examples/main/CryptoCurrencyHistory/CSV/CryptoTrades_20210922.csv")

//plot the data
plotBy = plotBy("Sept22", source, "Timestamp", "Price", "Instrument").show()
```

## Plot styles

The XY series plot in Deephaven defaults to a line plot. However, Deephaven's [`plotStyle`](../../reference/plot/plotStyle.md) method can be used to format XY series plots as area charts, stacked area charts, bar charts, stacked bar charts, scatter charts and step charts.

In any of the examples below, you can simply swap out the `plotStyle` argument with the appropriate name; e.g., `("area")`, `("stacked_area")`, `("step")`, etc.

### XY Series as a stacked area plot

In any of the examples below, you can simply swap out the `plotStyle` argument with the name `("stacked_area")`, `("step")`, etc.

```groovy test-set=1
plot_single_stacked_area= plot("Heart_rate", source, "Time", "HeartRate").plotStyle("stacked_area")\
    .show()
```

### XY Series as a scatter plot

In the example below, the `.plotStyle` argument has the name `("scatter")`. Other parameters are defined to show the fine tuning detail under control.

```groovy test-set=1
plotXYScatter = plot("Speed", source, "Time", "SpeedKPH")\
    .plotStyle("scatter")\
    .pointSize(0.5)\
    .pointColor(colorRGB(0,0,255,50))\
    .pointShape("circle")\
    .twinX()\
    .plot("Distance", source, "Time", "DistanceMeters")\
    .plotStyle("scatter")\
    .pointSize(0.8)\
    .pointColor(colorRGB(255,0,0,100))\
    .pointShape("up_triangle")\
    .chartTitle("Speed and Distance")\
    .show()
```

### XY Series as a step plot

In the example below, the `.plotStyle` argument has the name `("step")`. Other parameters are defined to show the fine tuning detail under control.

```groovy test-set=1
plot_step = plot("HeartRate", source, "Time", "HeartRate")\
    .plotStyle("Step")\
    .lineStyle(lineStyle(3))\
    .show()
```

## Related documentation

- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to create category plots](./category.md)
- [How to create histograms](./histogram.md)
- [How to create pie charts](./pie.md)
- [How to create category histograms](./category-histogram.md)
- [`plot`](../../reference/plot/plot.md)
- [`plotStyle`](../../reference/plot/plotStyle.md)
- [Arrays](../../reference/query-language/types/arrays.md)
- [User-Defined Functions](../../reference/query-language/formulas/user-defined-functions.md)
