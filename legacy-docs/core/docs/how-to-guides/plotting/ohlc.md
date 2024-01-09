---
id: ohlc
title: How to create Open, High, Low, Close (OHLC) plots
sidebar_label: Create OHLC plots
---

This guide shows you how to use the [`ohlcPlot`](../../reference/plot/ohlcPlot.md) method to create Open, High, Low and Close (OHLC) plots. These typically show four prices of a security or commodity per time slice: the open and close of the time slice, and the highest and lowest values reached during the time slice.

This plotting method requires a dataset that includes one column containing the values for the X axis (time), and one column for each of the corresponding four values (open, high, low, close).

## Data sourcing

### From a table

When data is sourced from a table, the following syntax can be used:

`.plot_ohlc(series_name="series_name", t, x="X", open="Open", high="High",low="Low", close="Close").show()`

- `plot_ohlc` is the method used to create an OHLC chart.
- `"series_name"` is the name (as a [string](../../reference/query-language/types/strings.md)) you want to use to identify the series on the chart itself.
- `source` is the table that holds the data you want to plot.
- `"X"` is the name (as a [string](../../reference/query-language/types/strings.md)) of the column to be used for the X axis.
- `"Open"` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) holding the opening price.
- `"High"` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) holding the highest price.
- `"Low"` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) holding the lowest price.
- `"Close"` is the name of the column (as a [string](../../reference/query-language/types/strings.md)) holding the closing price.
- `show` tells Deephaven to draw the plot in the console.

```python test-set=1 order=ohlc_plot,crypto_trades,btc_bin,t_ohlc
from deephaven.plot.figure import Figure
from deephaven import agg as agg
from deephaven import read_csv


crypto_trades = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/CryptoCurrencyHistory/CSV/CryptoTrades_20210922.csv")


agg_list = [
    agg.last(cols=["CloseTime = Timestamp"]),\
    agg.first(cols=["OpenTime = Timestamp"]),\
    agg.max_(cols=["High = Price"]),\
    agg.min_(cols=["Low = Price"]),
]

btc_bin = crypto_trades.where(filters=["Instrument=`BTC/USD`"])\
    .update(formulas=["TimestampBin = lowerBin(Timestamp, MINUTE)"])

t_ohlc = btc_bin.agg_by(agg_list, by=["TimestampBin"]).\
    join(table=btc_bin, on=["CloseTime = Timestamp"], joins=["Close = Price"]).\
    join(table=btc_bin, on=["OpenTime = Timestamp"], joins=["Open = Price"])

ohlc_plot = Figure()\
    .figure_title("BTC OHLC - Aug 22 2021")\
    .plot_ohlc(series_name="BTC", t=t_ohlc, x="TimestampBin", open="Open", high="High", low="Low", close="Close")\
    .show()
```

This query plots the OHLC chart as follows:

- `ohlc_plot` is the name of the variable that will hold the chart.
- `plot_ohlc` is the method.
- `"BTC"` is the name of the series to be used in the chart.
- `t_ohlc` is the table from which our data is being pulled.
- `TimestampBin` is the name of the column to be used for the X axis.
- `"Open"`, `"High"`, `"Low"`, and `"Close"`, are the names of the columns containing the four respective data points to be plotted on the Y axis.

## Shared Axes

Just like XY series plots, the Open, High, Low and Close plot can also be used to present multiple series on the same chart, including the use of multiple X or Y axes. We can build on the previous example:

```python test-set=1 order=btc_bin,eth_bin,btc_ohlc,eth_ohlc,ohlc_plot default=ohlc_plot
from deephaven import agg
from deephaven.plot.figure import Figure

btc_bin = crypto_trades.where(filters=["Instrument=`BTC/USD`"])\
        .update(formulas=["TimestampBin = lowerBin(Timestamp, MINUTE)"])

eth_bin = crypto_trades.where(filters=["Instrument=`ETH/USD`"])\
        .update(formulas=["TimestampBin = lowerBin(Timestamp, MINUTE)"])

agg_list = [
    agg.last(cols=["CloseTime = Timestamp"]),\
    agg.first(cols=["OpenTime = Timestamp"]),\
    agg.max_(["High = Price"]),\
    agg.min_(["Low = Price"]),
]

btc_ohlc = btc_bin.agg_by(agg_list, by=["TimestampBin"]).\
 join(table=btc_bin, on=["CloseTime = Timestamp"],joins=["Close = Price"]).\
 join(table=btc_bin,  on=["OpenTime = Timestamp"], joins=["Open = Price"])

eth_ohlc = eth_bin.agg_by(agg_list, by=["TimestampBin"]).\
 join(table=eth_bin, on=["CloseTime = Timestamp"],joins=["Close = Price"]).\
 join(table=eth_bin,  on=["OpenTime = Timestamp"], joins=["Open = Price"])

ohlc_plot = Figure()\
    .figure_title("BTC and ETC OHLC - Aug 22 2021")\
    .plot_ohlc(series_name="BTC", t=btc_ohlc, x="TimestampBin", open="Open", high="High", low="Low", close="Close")\
    .x_twin()\
    .plot_ohlc(series_name="ETH", t=eth_ohlc, x="TimestampBin", open="Open", high="High", low="Low", close="Close")\
    .show()
```

This query plots the OHLC chart as follows:

- `ohlc_plot` is the name of the variable that will hold the chart.
  - `plot_ohlc` plots the first series.
  - `"BTC"` is the name of the first series to be used in the chart.
  - `btc_ohlc` is the table from which the data is being pulled.
  - ``where("Instrument=`BTC/USD`")`` filters the table to only the AAPL Ticker.
  - `TimestampBin` is the name of the column to be used for the X axis.
  - `"Open"`, `"High"`, "`Low"`, and `"Close"`, are the names of the columns containing the four respective data points to be plotted on the Y axis.
- `x_twin` is used to show different Y axes.
- `plot_ohlc` plots the second series.
  - `"ETH"` is the name of the second series to be used in the chart.
  - `eth_ohlc` is the table from which the data is being pulled.
  - ``where("Instrument=`ETH/USD`")`` filters the table to only the MSFT Ticker.
  - `TimestampBin` is the name of the column to be used for the X axis.
  - `"Open"`, `"High"`, `"Low"`, and `"Close"`, are the names of the columns containing the four respective data points to be plotted on the Y axis.
- `figure_title()` provides the title for the chart.

In this plot, the opening, high, low and closing price of BTC and ETH are plotted. The `x_twin` method is used to show the value scale for BTC on the left Y axis and the value scale for ETH on the right Y axis.

## Related documentation

- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to create XY series plots](./xy-series.md)
- [How to create category plots](./category.md)
- [How to create histograms](./category-histogram.md)
- [How to create category histograms](./histogram.md)
- [How to create pie charts](./pie.md)
- [Arrays](../../reference/query-language/types/arrays.md)
- [`plot_ohlc`](../../reference/plot/ohlcPlot.md)
