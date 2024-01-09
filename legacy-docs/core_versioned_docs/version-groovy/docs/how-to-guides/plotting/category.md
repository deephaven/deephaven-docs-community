---
id: category
title: How to create category plots
sidebar_label: Create category plots
---

This guide shows you how to use the [`catPlot`](../../reference/plot/catPlot.md) method to create category plots, which display data values from different discrete categories.

## Data sourcing

### From a table

When data is sourced from a Deephaven table, the following syntax can be used:

`.catPlot(seriesName, source, categoryCol, valueCol).show()`

- `catPlot` is the method used to create a category plot.
- `seriesName` is the name ([string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the plot itself.
- `source` is the table that holds the data you want to plot.
- `categoryCol` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) to be used for the categories.
- `valueCol` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) to be used for the values.
- `show` tells Deephaven to draw the plot in the console.

```groovy order=source,result default=result
source = newTable(
    stringCol("Categories", "A", "B", "C"),
    intCol("Values", 1, 3, 5)
)

result = catPlot("Categories Plot", source, "Categories", "Values")
    .chartTitle("Categories And Values")
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

```groovy result
categories = ["A", "B", "C"] as String[]
values = [1, 3, 5] as int[]

result = catPlot("Categories Plot", categories, values)
    .chartTitle("Categories And Values")
    .show()
```
-->

## Categories with shared axes

You can also compare multiple categories over the same period of time by creating a category plot with shared axes. In the following example, a second category plot has been added to the previous example, thereby creating bar graphs on the same chart:

```groovy order=sourceOne,sourceTwo,result default=result
sourceOne = newTable(
    stringCol("Categories", "A", "B", "C"),
    intCol("Values", 1, 3, 5)
)
sourceTwo = newTable(
    stringCol("Categories", "A", "B", "C"),
    intCol("Values", 2, 4, 6)
)

result = catPlot("Categories Plot One", sourceOne, "Categories", "Values")
    .catPlot("Categories Plot Two", sourceTwo, "Categories", "Values")
    .chartTitle("Categories And Values")
    .show()
```

Subsequent categories can be added to the chart by adding additional [`catPlot`](../../reference/plot/catPlot.md) methods to the query.

## Plot styles

By default, values are presented as vertical bars. However, by using Deephaven's [`plotStyle`](../../reference/plot/plotStyle.md) method, the data can be represented as a bar, a stacked bar, a line, an area or a stacked area.

In any of the examples below, you can simply swap out the [`plotStyle`](../../reference/plot/plotStyle.md) argument with the appropriate name; e.g., `("Area")`, `("stacked_area")`, etc.

### Category plot with Stacked Bar

```groovy order=sourceOne,sourceTwo,result default=result
sourceOne = newTable(
    stringCol("Categories", "A", "B", "C"),
    intCol("Values", 1, 3, 5)
)
sourceTwo = newTable(
    stringCol("Categories", "A", "B", "C"),
    intCol("Values", 2, 4, 6)
)

result = catPlot("Categories Plot One", sourceOne, "Categories", "Values")
    .catPlot("Categories Plot Two", sourceTwo, "Categories", "Values")
    .plotStyle("stacked_bar")
    .chartTitle("Categories And Values")
    .show()
```

## Related documentation

- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to create XY series plots](./xy-series.md)
- [How to create category histograms](./category-histogram.md)
- [How to create histograms](./histogram.md)
- [How to create pie charts](./pie.md)
- [Arrays](../../reference/query-language/types/arrays.md)
- [`catPlot`](../../reference/plot/catPlot.md)
- [`plotStyle`](../../reference/plot/plotStyle.md)
