---
id: bollinger-bands
title: How to compute Bollinger Bands
sidebar_label: Compute Bollinger Bands
---

This guide will show you how to calculate Bollinger Bands in Deephaven. Bollinger Bands are one standard deviation enveloped around a moving average. They are frequently used in financial applications.

Three steps are required to compute Bollinger Bands.

1. Compute the moving average.
2. Compute the moving standard deviation.
3. Compute the upper and lower envelopes.

The moving average and moving standard deviations are most easily computed using [`update_by`](../reference/table-operations/update-by-operations/updateBy.md).

## Time-based Bollinger Bands

When computing time-based Bollinger bands, [`update_by`](../reference/table-operations/update-by-operations/updateBy.md), [`ema_time`](../reference/table-operations/update-by-operations/ema-time.md) and [`emstd_time`](../reference/table-operations/update-by-operations/emstd-time.md) are used to compute the average and envelope. Here `decay_time` is the moving average decay rate in time and is used to specify the weighting of new data points.

```python order=f_abc,f_xyz,source,result
from deephaven import empty_table
from deephaven.updateby import ema_time, emstd_time
from deephaven.plot import Figure

# Generate some random example data

source = empty_table(1000) \
    .update([
      "Timestamp='2023-01-13T12:00 ET' + i*MINUTE",
      "Ticker = i%2==0 ? `ABC` : `XYZ`",
      "Price = i%2==0 ? 100*sin(i/40)+100*random() : 100*cos(i/40)+100*random()+i/2",
    ])

# Compute the Bollinger Bands

decay_time = "PT00:20:00"

result = source.update_by([
      ema_time("Timestamp", decay_time, "EMA=Price"),
      emstd_time("Timestamp", decay_time, "STD=Price"),
    ], by=["Ticker"]) \
    .update([
      "Upper = EMA + STD",
      "Lower = EMA - STD"
    ])

# Plot the Bollinger Bands

def plot_bollinger(t, ticker):
    d = t.where(f"Ticker=`{ticker}`")

    return Figure() \
      .plot_xy(series_name="Price", t=d, x="Timestamp", y="Price") \
      .plot_xy(series_name="EMA", t=d, x="Timestamp", y="EMA") \
      .plot_xy(series_name="Upper", t=d, x="Timestamp", y="Upper") \
      .plot_xy(series_name="Lower", t=d, x="Timestamp", y="Lower") \
      .show()

f_abc = plot_bollinger(result, "ABC")
f_xyz = plot_bollinger(result, "XYZ")
```

## Tick-based Bollinger Bands

When computing tick-based Bollinger bands, [`update_by`](../reference/table-operations/update-by-operations/updateBy.md), [`ema_tick`](../reference/table-operations/update-by-operations/ema-tick.md) and [`emstd_tick`](../reference/table-operations/update-by-operations/emstd-tick.md) are used to compute the average and envelope. Here `decay_ticks` is the moving average decay rate in ticks and is used to specify the weighting of new data points.

```python order=f_abc,f_xyz,source,result
from deephaven import empty_table
from deephaven.updateby import ema_tick, emstd_tick
from deephaven.plot import Figure

# Generate some random example data

source = empty_table(1000) \
    .update([
      "Timestamp='2023-01-13T12:00 ET' + i*MINUTE",
      "Ticker = i%2==0 ? `ABC` : `XYZ`",
      "Price = i%2==0 ? 100*sin(i/40)+100*random() : 100*cos(i/40)+100*random()+i/2",
    ])

# Compute the Bollinger Bands

decay_ticks = 20

result = source.update_by([
      ema_tick(decay_ticks, "EMA=Price"),
      emstd_tick(decay_ticks, "STD=Price"),
    ], by=["Ticker"]) \
    .update([
      "Upper = EMA + STD",
      "Lower = EMA - STD"
    ])

# Plot the Bollinger Bands

def plot_bollinger(t, ticker):
    d = t.where(f"Ticker=`{ticker}`")

    return Figure() \
      .plot_xy(series_name="Price", t=d, x="Timestamp", y="Price") \
      .plot_xy(series_name="EMA", t=d, x="Timestamp", y="EMA") \
      .plot_xy(series_name="Upper", t=d, x="Timestamp", y="Upper") \
      .plot_xy(series_name="Lower", t=d, x="Timestamp", y="Lower") \
      .show()

f_abc = plot_bollinger(result, "ABC")
f_xyz = plot_bollinger(result, "XYZ")
```

## Related documentation

- [How to use EMAs](../how-to-guides/ema-how-to.md)
- [`update_by`](../reference/table-operations/update-by-operations/updateBy.md)
- [`ema_time`](../reference/table-operations/update-by-operations/ema-time.md)
- [`ema_tick`](../reference/table-operations/update-by-operations/ema-tick.md)
- [`emstd_tick`](../reference/table-operations/update-by-operations/emstd-tick.md)
- [`emstd_time`](../reference/table-operations/update-by-operations/emstd-time.md)
