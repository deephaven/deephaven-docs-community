---
id: ema-how-to
title: How to use EMA
sidebar_label: Use EMA
---

This guide will show you how to calculate the Exponential Moving Average (EMA) of data in Deephaven.

The [`update_by`](../reference/table-operations/update-by-operations/updateBy.md) table operation can implement many operations, including EMA. This includes a time-based EMA, where the decay rate is determined by a timestamp column, as well as a tick-based EMA, where the decay rate depends on a number of rows (ticks).

The equations for an EMA is as follows:

$a = e^{\frac{-dt}{\tau}}$

$\epsilon_{n} = a*\epsilon_{n - 1} + (1 - a)*x$

Where:

- $dt$ is the time since the previous observation for time-based EMA, and 1 for tick-based EMA.
- $\tau$ is the decay rate, an [input parameter](#parameters) to the method.
- $\epsilon$ is the EMA.
- $x$ is the current value.
- $n$ denotes the step. The current step is $n$, and the previous step is $n - 1$.

## Examples

The following examples calculate the EMA of a table with random data. EMA is calculated for each unique character in a column called `Sym`, which emulates a real-time feed of stock, crypto, or other asset symbols.

Each example uses [`empty_table`](../reference/table-operations/create/emptyTable.md) and [`update`](../reference/table-operations/select/update.md) to populate a table with data. The EMA is calculated using [`update_by`](../reference/table-operations/update-by-operations/updateBy.md). Plots are created to visualize what the 10 second EMA looks like for a single unique value in the `Sym` column. For more information on XY series plots, see [How to create XY series plots](./plotting/xy-series.md).

## Time-based EMA

This first example calculates a time-based EMA via [`ema_time`](../reference/table-operations/update-by-operations/ema-time.md). A 10-second decay rate has been chosen. The EMA is stored in the output column `NumbersEMA`.

```python order=result,result_w_ema,ema_A,ema_plot
from deephaven.time import to_j_instant
from deephaven.updateby import ema_time
from deephaven.plot import Figure
from deephaven import empty_table
import random

base_time = to_j_instant("2023-04-01T12:00:00 UTC")

def random_char() -> str:
    return random.choice(['A', 'B', 'C', 'D', 'E', 'F'])

result = empty_table(100).update(formulas=["Timestamp = base_time + i * SECOND", "Sym = random_char()", "Numbers = randomInt(0, 100)"])

result_w_ema = result.update_by([ema_time("Timestamp", "PT10S", "NumbersEMA = Numbers")], by=["Sym"])

ema_A = result_w_ema.where(["Sym == `A`"])

ema_fig = Figure()
ema_plot = ema_fig\
    .plot_xy(series_name="Numbers", t=ema_A, x="Timestamp", y="Numbers")\
    .plot_xy(series_name="EMA", t=ema_A, x="Timestamp", y="NumbersEMA")\
    .show()
```

The following example is performed on real-time data.

```python ticking-table order=null
from deephaven.updateby import ema_time
from deephaven.plot import Figure
from deephaven import time_table
import random

def random_char() -> str:
    return random.choice(['A', 'B', 'C'])

result = time_table("PT0.2S").update(formulas=["Sym = random_char()", "Numbers = randomInt(0, 100)"])

result_w_ema = result.update_by([ema_time("Timestamp", "PT0.4S", "NumbersEMA = Numbers")], by=["Sym"])

ema_A = result_w_ema.where(["Sym == `A`"])

ema_fig = Figure()
ema_plot = ema_fig\
    .plot_xy(series_name="Numbers", t=ema_A, x="Timestamp", y="Numbers")\
    .plot_xy(series_name="EMA", t=ema_A, x="Timestamp", y="NumbersEMA")\
    .show()
```

![img](../assets/how-to/ema/ema-new.gif)

## Tick-based EMA

This first example calculates a time-based EMA via [`ema_tick`](../reference/table-operations/update-by-operations/ema-tick.md). A 10-row decay rate has been chosen. The EMA is stored in the output column `NumbersEMA`.

```python order=result,result_w_ema,ema_A,ema_plot
from deephaven.updateby import ema_tick
from deephaven.plot import Figure
from deephaven import empty_table
import random

def random_char() -> str:
    return random.choice(['A', 'B', 'C', 'D', 'E', 'F'])

result = empty_table(100).update(formulas=["X = i", "Sym = random_char()", "Numbers = randomInt(0, 100)"])

result_w_ema = result.update_by([ema_tick(10, "NumbersEMA = Numbers")], by=["Sym"])

ema_A = result_w_ema.where(["Sym == `A`"])

ema_fig = Figure()
ema_plot = ema_fig\
    .plot_xy(series_name="Numbers", t=ema_A, x="X", y="Numbers")\
    .plot_xy(series_name="EMA", t=ema_A, x="X", y="NumbersEMA")\
    .show()
```

The following example is identical to the one above, except it's performed on real-time data instead.

```python reset ticking-table order=null
from deephaven.updateby import ema_tick
from deephaven.plot import Figure
from deephaven import time_table
import random

def random_char() -> str:
    return random.choice(['A', 'B', 'C', 'D', 'E', 'F'])

result = time_table("PT1S").update(formulas=["Sym = random_char()", "Numbers = randomInt(0, 100)"]).reverse()

result_w_ema = result.update_by([ema_tick(10, "NumbersEMA = Numbers")], by=["Sym"])

ema_A = result_w_ema.where(["Sym == `A`"])

ema_fig = Figure()
ema_plot = ema_fig\
    .plot_xy(series_name="Numbers", t=ema_A, x="Timestamp", y="Numbers")\
    .plot_xy(series_name="EMA", t=ema_A, x="Timestamp", y="NumbersEMA")\
    .show()
```

![img](../assets/how-to/ema/ema2.gif)

## Related documentation

- [Create a time table](./time-table.md)
- [Create an empty table](./empty-table.md)
- [How to create XY series plots](./plotting/xy-series.md)
- [How to use select, view, and update](./use-select-view-update.md)
- [How to use update_by](./use-update-by.md)
- [Formulas](../reference/query-language/formulas/formulas.md)
- [User-Defined Functions](../reference/query-language/formulas/user-defined-functions.md)
- [Handle nulls, infs, and NaNs](./handle-null-inf-nan.md)
