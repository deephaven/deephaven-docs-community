---
id: ohlc
title: How to create Open, High, Low, Close (OHLC) plots
sidebar_label: Create OHLC plots
---

This guide shows you how to use the [`ohlcPlot`](../../reference/plot/ohlcPlot.md) method to create Open, High, Low and Close (OHLC) plots. These typically shows four prices of a security or commodity per time slice: the open and close of the time slice, and the highest and lowest values reached during the time slice.

This plotting method requires a dataset that includes one column containing the values for the X axis (time), and one column for each of the corresponding four values (open, high, low, close).

## Data sourcing

### From a table

When data is sourced from a table, the following syntax can be used:

`.ohlcPlot("SeriesName", source, "X", "Open", "High", "Low", "Close").show()`

- `ohlcPlot` is the method used to create an OHLC chart.
- `"SeriesName"` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart itself.
- `source` is the table that holds the data you want to plot.
- `"X"` is the name (as a [string](../../reference/query-language/types/strings.md)) of the column to be used for the X axis.
- `"Open"` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) holding the opening price.
- `"High"` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) holding the highest price.
- `"Low"` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) holding the lowest price.
- `"Close"` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) holding the closing price.
- `show` tells Deephaven to draw the plot in the console.

```groovy test-set=1 order=cryptoTrades,btcBin,tOHLC,plotOHLC default=plotOHLC
import static io.deephaven.csv.CsvTools.readCsv
import static io.deephaven.api.agg.Aggregation.AggAvg

cryptoTrades = readCsv("https://media.githubusercontent.com/media/deephaven/examples/main/CryptoCurrencyHistory/CSV/CryptoTrades_20210922.csv")

agg_list = [
    AggLast("CloseTime = Timestamp"),\
    AggFirst("OpenTime = Timestamp"),\
    AggMax("High = Price"),\
    AggMin("Low = Price"),
]

btcBin = cryptoTrades.where("Instrument=`BTC/USD`").update("TimestampBin = lowerBin(Timestamp, MINUTE)")
tOHLC = btcBin.aggBy(agg_list, "TimestampBin").\
 join(btcBin,"CloseTime = Timestamp","Close = Price").\
 join(btcBin,"OpenTime = Timestamp","Open = Price")


plotOHLC = ohlcPlot("BTC", tOHLC, "TimestampBin", "Open", "High", "Low", "Close")\
   .chartTitle("BTC OHLC - Aug 22 2021")\
   .show()
```

This query plots the OHLC chart as follows:

- `plotOHLC` is the name of the variable that will hold the chart.
- `ohlcPlot` is the method.
- `"BTC"` is the name of the series to be used in the chart.
- `tOHLC` is the table from which our data is being pulled.
- `TimestampBin` is the name of the column to be used for the X axis.
- `"Open"`, `"High"`, `"Low"`, and `"Close"`, are the names of the columns containing the four respective data points to be plotted on the Y axis.
- `lineStyle()` and `chartTitle()` provide component formatting to the table. `2` refers to line width.

## Shared Axes

Just like XY series plots, the Open, High, Low and Close plot can also be used to present multiple series on the same chart, including the use of multiple X or Y axes. An example of this follows:

```groovy test-set=1 order=btcBin,ethBin,btcOHLC,ethOHLC,plotOHLC default=plotOHLC
btcBin = cryptoTrades.where("Instrument=`BTC/USD`").update("TimestampBin = lowerBin(Timestamp, MINUTE)")
ethBin = cryptoTrades.where("Instrument=`ETH/USD`").update("TimestampBin = lowerBin(Timestamp, MINUTE)")

agg_list = [
    AggLast("CloseTime = Timestamp"),\
    AggFirst("OpenTime = Timestamp"),\
    AggMax("High = Price"),\
    AggMin("Low = Price"),
]

btcOHLC = btcBin.aggBy(agg_list, "TimestampBin").\
 join(btcBin,"CloseTime = Timestamp","Close = Price").\
 join(btcBin,"OpenTime = Timestamp","Open = Price")

ethOHLC = ethBin.aggBy(agg_list, "TimestampBin").\
 join(ethBin,"CloseTime = Timestamp","Close = Price").\
 join(ethBin,"OpenTime = Timestamp","Open = Price")

plotOHLC = ohlcPlot("BTC", btcOHLC, "TimestampBin", "Open", "High", "Low", "Close")\
   .chartTitle("BTC and ETC OHLC - Aug 22 2021")\
   .twinX()\
   .ohlcPlot("ETH", ethOHLC, "TimestampBin", "Open", "High", "Low", "Close")\
   .show()
```

This query plots the OHLC chart as follows:

- `plotOHLC` is the name of the variable that will hold the chart.
  - `ohlcPlot` plots the first series.
  - `"BTC"` is the name of the first series to be used in the chart.
  - `btcOHLC` is the table from which the data is being pulled.
  - ``where("Instrument=`BTC/USD`")`` filters the table to only the AAPL Ticker.
  - `TimestampBin` is the name of the column to be used for the X axis.
  - `"Open"`, `"High"`, "`Low"`, and `"Close"`, are the names of the columns containing the four respective data points to be plotted on the Y axis.
- `twinX` is used to show different Y axes.
- `ohlcPlot` plots the second series.
  - `"ETH"` is the name of the second series to be used in the chart.
  - `ethOHLC` is the table from which the data is being pulled.
  - ``where("Instrument=`ETH/USD`")`` filters the table to only the MSFT Ticker.
  - `TimestampBin` is the name of the column to be used for the X axis.
  - `"Open"`, `"High"`, `"Low"`, and `"Close"`, are the names of the columns containing the four respective data points to be plotted on the Y axis.
- `chartTitle()` provides the title for the chart.

In this plot, the opening, high, low and closing price of BTC and ETH are plotted. The `twinX()` method is used to show the value scale for BTC on the left Y axis and the value scale for ETH on the right Y axis.

## Related documentation

- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to create XY series plots](./xy-series.md)
- [How to create category plots](./category.md)
- [How to create histograms](./category-histogram.md)
- [How to create category histograms](./histogram.md)
- [How to create pie charts](./pie.md)
- [Arrays](../../reference/query-language/types/arrays.md)
- [`ohlcPlot`](../../reference/plot/ohlcPlot.md)
