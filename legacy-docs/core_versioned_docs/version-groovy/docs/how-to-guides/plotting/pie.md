---
id: pie
title: How to create pie charts
sidebar_label: Create pie charts
---

This guide shows you how to use the [`piePlot`](../../reference/plot/piePlot.md) method to create pie charts, which show data as sections of a circle to represent the relative proportion for each of the categories that make up the entire dataset being plotted.

## Data sourcing

### From a table

When data is sourced from a table, the following syntax can be used to create a pie plot:

`.piePlot(seriesName, source, categoryCol, valueCol).show()`

- `piePlot` is the method used to create a pie plot.
- `seriesName` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the plot itself.
- `source` is the table that holds the data you want to plot.
- `categoryCol` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) to be used for the categories.
- `valueCol` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) to be used for the values.
- `show` tells Deephaven to draw the plot in the console.

```groovy order=totalInsurance,regionInsurance,pieChart default=pieChart
import static io.deephaven.csv.CsvTools.readCsv

totalInsurance = readCsv("https://media.githubusercontent.com/media/deephaven/examples/main/Insurance/csv/insurance.csv")

regionInsurance = totalInsurance.view("region", "expenses").sumBy("region")

pieChart = piePlot("Expense per region", regionInsurance, "region", "expenses")\
     .chartTitle("Expenses per region")\
     .show()
```

<!--

This doesn't seem to work also
## From an array

When data is sourced from an array, the following syntax can be used:

`.piePlot(seriesName, category, values).show()`

- `piePlot` is the method used to create a pie chart.
- `seriesName` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart.
- `category` is the array containing the data to be used for the categories.
- `values` is the array containing the data to be used for the values.
- `show` tells Deephaven to draw the plot in the console.
-->

## Related documentation

- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to create XY series plots](./xy-series.md)
- [How to create category plots](./category.md)
- [How to create histograms](./category-histogram.md)
- [How to create category histograms](./histogram.md)
- [Arrays](../../reference/query-language/types/arrays.md)
- [`piePlot`](../../reference/plot/piePlot.md)
