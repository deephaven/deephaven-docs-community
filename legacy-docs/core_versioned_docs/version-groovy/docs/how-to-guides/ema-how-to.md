---
id: ema-how-to
title: How to use EMA
sidebar_label: Use EMA
---

This guide will show you how to work with Exponential Moving Averages (EMA) in the Deephaven Query Language.

Deephaven offers built-in ways to compute averages. With real-time data, you might want to update these with new data as it comes in. A moving average will change based on the most current desired window, but to give more weight to recent values, use an EMA.

The general equation we use for the new EMA value is given as:

$$
\text{EMA}_t =  e^{- dt / \tau }  \text{ EMA}_{t-1} + \left(1 -  e^{- dt / \tau } \right)  P_t
$$

- $dt$ is the elapsed time from the prior EMA calculation to the new EMA if the mode is `TIME`; otherwise, in `TICK`, this value is 1.
- $\tau$ is the time used for the window of the EMA.
- $P_t$ is the new data value to include in the EMA.

There are two types of EMAs that one might be interested in:

- `LEVEL`, where the first EMA value is set to the first value recorded.
- `DIFFERENCE`, where the first value is zero assuming the change is initially zero.

We can also choose from two different EMA modes:

- `TICK` - uses each new entry of data to determine the EMA window.
- `TIME` - uses time to determine the EMA window.

For a `TICK` based EMA, the number of rows are treated the same, regardless of time. For example, if many ticks come in during 1 second, that second will have a higher weight than another time because there are more ticks. A `TIME` based EMA guarantees each time interval of time is treated the same.

## Examples

The following example calculates the EMA of a ticking table with random data. EMA is calculated for each unique character in a column called `Sym`, which emulates a real-time feed of stock, crypto, or other asset symbols.

This example uses the [`timeTable`](../reference/table-operations/create/timeTable.md) and [`update`](../reference/table-operations/select/update.md) methods to simulate an actual real-time feed of data, as well as a plot to visualize what the 5-second EMA looks like for a single unique value in the `Sym` column. For more information, see [How to create XY series plots](./plotting/xy-series.md).

```groovy order=null
rand = new Random()

// create a list of characters
list = new ArrayList<String>(["A", "B", "C"])

// create a random generator for characters
randomChar = {ArrayList<String> input ->
    bound = list.size()
    num = rand.nextInt(bound)
    return list.get(num) }

// create a time table
result = timeTable("PT00:00:00.25").update("Sym = randomChar(list)", "Numbers = rand.nextInt(100)")

// create an EMA table
result_w_ema = result.updateBy([Ema("Timestamp", 5 * SECOND, "EmaTimeNum = Numbers")], "Sym").reverse()

// only track the EMA for the character "A"
ema_A = result_w_ema.where("Sym == `A`")

// create a figure and plot the data
ema_fig = figure()
ema_plot = ema_fig\
    .plot(series_name="Numbers", t=ema_A, x="Timestamp", y="Numbers")\
    .plot(series_name="EMA", t=ema_A, x="Timestamp", y="EmaTimeNum")\
    .show()
```

![img](../assets/how-to/ema-plot-groovy.gif)

## Related documentation

- [Create a time table](./time-table.md)
- [How to use `select`, `view`, and `update`](./use-select-view-update.md)
- [How to use `updateBy`](../how-to-guides/use-update-by.md)
- [Formulas](../reference/query-language/formulas/formulas.md)
- [User-Defined Functions](../reference/query-language/formulas/user-defined-functions.md)
- [Handle nulls, infs, and NaNs](./handle-null-inf-nan.md)
