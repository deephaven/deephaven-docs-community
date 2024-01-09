---
id: category-histogram
title: How to create category histograms
sidebar_label: Create category histograms
---

This guide shows you how to use the [`catHistPlot`](../../reference/plot/catHistPlot.md) method to create category histograms, which is used to show how frequently a set of discrete values (categories) occur.

## Data sourcing

### From a table

When data is sourced from a Deephaven table, the following syntax can be used:

`.catHistPlot(seriesName, source, valueCol).show()`

- `catHistPlot` is the method used to create a category histogram.
- `seriesName` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart itself.
- `source` is the table that holds the data you want to plot.
- `valueCol` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) containing the discrete values.
- `show()` tells Deephaven to draw the plot in the console.

```groovy order=source,result default=result
source = newTable(
    intCol("Keys", 3, 2, 2, 1, 1, 1)
)

result = catHistPlot("Keys Count", source, "Keys")
    .chartTitle("Count Of Each Key")
    .show()
```

### From an array

When data is sourced from an array, the following syntax can be used:

`.catHistPlot(seriesName, values).show()`

- `catHistPlot` is the method used to create a category histogram.
- `seriesName` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the plot itself.
- `values` is the array containing the discrete values.
- `show` tells Deephaven to draw the plot in the console.

```groovy
def values = [3, 2, 2, 1, 1, 1] as int[]

result = catHistPlot("Values", values)
    .chartTitle("Count Of Values")
    .show()
```

## Related documentation

- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to create XY series plots](./xy-series.md)
- [How to create category plots](./category.md)
- [How to create histograms](./histogram.md)
- [How to create pie charts](./pie.md)
- [Arrays](../../reference/query-language/types/arrays.md)
- [catHistPlot](../../reference/plot/catHistPlot.md)
