---
id: histogram
title: How to create histograms
sidebar_label: Create histograms
---

This guide shows you how to use the [`histPlot`](../../reference/plot/histPlot.md) method to create histograms.

The histogram is used to show how frequently different data values occur. The data is divided into logical intervals (or bins) , which are then aggregated and charted with vertical bars. Unlike bar charts (category plots), bars in histograms do not have spaces between them unless there is a gap in the data.

## Data sourcing

### From a table

When data is sourced from a table, the following syntax can be used:

`.histPlot(seriesName, source, valueCol, nbins).show()`

- `histPlot` is the method used to create a histogram.
- `seriesName` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart itself.
- `source` is the table that holds the data you want to plot.
- `valueCol` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) of data to be used for the X values.
- `nbins` is the number of intervals to use in the chart.
- `show` tells Deephaven to draw the plot in the console.

```groovy order=source,result default=result
source = newTable(
    intCol("Values", 1, 2, 2, 3, 3, 3, 4, 4, 5)
)

result = histPlot("Histogram Values", source, "Values", 5)
    .chartTitle("Histogram Of Values")
    .show()
```

The [`histPlot`](../../reference/plot/histPlot.md) method assumes you want to plot the entire range of values in the dataset. However, you can also set the minimum and maximum values of the range using `rangeMin` and `rangeMax` respectively:

`.histPlot(seriesName, source, valueCol, rangeMin, rangeMax, nbins).show()`

- `histPlot` is the method used to create a histogram.
- `seriesName` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart itself.
- `source` is the table that holds the data you want to plot.
- `valueCol` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) of data to be used for the X values.
- `rangeMin` is the minimum value (as a double) of the range to be included.
- `rangeMax` is the maximum value (as a double) of the range to be included.
- `nbins` is the number of intervals to use in the chart.
- `show` tells Deephaven to draw the plot in the console.

```groovy order=source,result default=result
source = newTable(
    intCol("Values", 1, 2, 2, 3, 3, 3, 4, 4, 5)
)

result = histPlot("Histogram Values", source, "Values", 2, 4, 5)
    .chartTitle("Histogram Of Values")
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

```groovy
source = [1, 2, 2, 3, 3, 3, 4, 4, 5] as int[]

result = histPlot("Histogram Values", source, 5)
    .chartTitle("Histogram Of Values")
    .show()
```

Just like with a Deephaven table, you can also set the minimum and maximum values of the range using `rangeMin` and `rangeMax` respectively:

`.histPlot(seriesName, x, rangeMin, rangeMax, nbins).show()`

- `histPlot` is the method used to create a histogram.
- `seriesName` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart itself.
- `x` is the array containing the data to be used for the X values.
- `rangeMin` is the minimum value (as a double) of the range to be included.
- `rangeMax` is the maximum value (as a double) of the range to be included.
- `nbins` is the number of the intervals to use in the chart.
- `show` tells Deephaven to draw the plot in the console.

```groovy
source = [1, 2, 2, 3, 3, 3, 4, 4, 5] as int[]

result = histPlot("Histogram Values", source, 2, 4, 5)
    .chartTitle("Histogram Of Values")
    .show()
```

## Related documentation

- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to create XY series plots](./xy-series.md)
- [How to create category plots](./category.md)
- [How to create category histograms](./category-histogram.md)
- [How to create pie charts](./pie.md)
- [Arrays](../../reference/query-language/types/arrays.md)
- [`histPlot`](../../reference/plot/histPlot.md)
