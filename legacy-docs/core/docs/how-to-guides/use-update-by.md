---
id: use-update-by
title: How to use update_by
sidebar_label: Use update_by
---

This guide will show you how to use the [`update_by`](../reference/table-operations/update-by-operations/updateBy.md) table operation in your queries. [`update_by`](../reference/table-operations/update-by-operations/updateBy.md) creates a new table with resultant columns containing aggregated calculations (referred to as `UpdateByOperations`) of columns in a source table. The calculations can be cumulative, windowed by rows (ticks), or windowed by time. The calculations are optionally done on a per-group basis, where groups are defined by one or more key columns.

## Available `UpdateByOperations`

The calculations (`UpdateByOperations`) that can be performed with [`update_by`](../reference/table-operations/update-by-operations/updateBy.md) are:

- [`cum_max`](../reference/table-operations/update-by-operations/cum-max.md)
- [`cum_min`](../reference/table-operations/update-by-operations/cum-min.md)
- [`cum_prod`](../reference/table-operations/update-by-operations/cum-prod.md)
- [`cum_sum`](../reference/table-operations/update-by-operations/cum-sum.md)
- [`delta`](../reference/table-operations/update-by-operations/delta.md)
- [`ema_tick`](../reference/table-operations/update-by-operations/ema-tick.md)
- [`ema_time`](../reference/table-operations/update-by-operations/ema-time.md)
- [`emmax_tick`](../reference/table-operations/update-by-operations/emmax-tick.md)
- [`emmax_time`](../reference/table-operations/update-by-operations/emmax-time.md)
- [`emmin_tick`](../reference/table-operations/update-by-operations/emmin-tick.md)
- [`emmin_time`](../reference/table-operations/update-by-operations/emmin-time.md)
- [`ems_tick`](../reference/table-operations/update-by-operations/ems-tick.md)
- [`ems_time`](../reference/table-operations/update-by-operations/ems-time.md)
- [`emstd_tick`](../reference/table-operations/update-by-operations/emstd-tick.md)
- [`emstd_time`](../reference/table-operations/update-by-operations/emstd-time.md)
- [`forward_fill`](../reference/table-operations/update-by-operations/forward-fill.md)
- [`rolling_avg_tick`](../reference/table-operations/update-by-operations/rolling-avg-tick.md)
- [`rolling_avg_time`](../reference/table-operations/update-by-operations/rolling-avg-time.md)
- [`rolling_group_tick`](../reference/table-operations/update-by-operations/rolling-group-tick.md)
- [`rolling_group_time`](../reference/table-operations/update-by-operations/rolling-group-time.md)
- [`rolling_max_tick`](../reference/table-operations/update-by-operations/rolling-max-tick.md)
- [`rolling_max_time`](../reference/table-operations/update-by-operations/rolling-max-time.md)
- [`rolling_min_tick`](../reference/table-operations/update-by-operations/rolling-min-tick.md)
- [`rolling_min_time`](../reference/table-operations/update-by-operations/rolling-min-time.md)
- [`rolling_prod_tick`](../reference/table-operations/update-by-operations/rolling-prod-tick.md)
- [`rolling_prod_time`](../reference/table-operations/update-by-operations/rolling-prod-time.md)
- [`rolling_std_tick`](../reference/table-operations/update-by-operations/rolling-std-tick.md)
- [`rolling_std_time`](../reference/table-operations/update-by-operations/rolling-std-time.md)
- [`rolling_sum_tick`](../reference/table-operations/update-by-operations/rolling-sum-tick.md)
- [`rolling_sum_time`](../reference/table-operations/update-by-operations/rolling-sum-time.md)
- [`rolling_wavg_tick`](../reference/table-operations/update-by-operations/rolling-wavg-tick.md)
- [`rolling_wavg_time`](../reference/table-operations/update-by-operations/rolling-wavg-time.md)

The use of [`update_by`](../reference/table-operations/update-by-operations/updateBy.md) requires one or more of the calculations in the list above, as well as zero or more key columns to define groups. The resultant table contains all columns from the source table, as well as new columns if the output of the `UpdateByOperation` renames them. If no key columns are given, then the calculations are applied to all rows in the specified columns. If one or more key columns are given, the calculations are applied to each unique group in the key column(s).

## Examples

Each of the following subsections illustrates how to use [`update_by`](../reference/table-operations/update-by-operations/updateBy.md).

### A single `UpdateByOperation` with no grouping columns

The following example calculates the tick-based rolling sum of the `X` column in the `source` table. No key columns are provided, so a single group exists that contains all rows of the table.

```python order=source,result
from deephaven.updateby import rolling_sum_tick
from deephaven import empty_table

source = empty_table(20).update(["X = i"])

result = source.update_by(ops=rolling_sum_tick(cols=["RollingSumX = X"], rev_ticks=3, fwd_ticks=0))
```

### Multiple `UpdateByOperations` with no grouping columns

The following example builds on the [previous](#a-single-updatebyoperation-with-no-grouping-columns) by performing two `UpdateByOperations` in a single [`update_by`](../reference/table-operations/update-by-operations/updateBy.md). The cumulative minimum and maximum are calculated, and the range is derived from them.

```python order=source,result
from deephaven.updateby import cum_min, cum_max
from deephaven import empty_table

source = empty_table(20).update(["X = randomInt(0, 25)"])
result = source.update_by(ops=[cum_min(cols=["MinX = X"]), cum_max(cols=["MaxX = X"])]).update(["RangeX = MaxX - MinX"])
```

### Multiple `UpdateByOperations` with a single grouping column

The following example builds on the [previous](#multiple-updatebyoperations-with-no-grouping-columns) by specifying a grouping column. The grouping column is `Letter`, which contains alternating letters `A` and `B`. As a result, the cumulative minimum, maximum, and range are calculated on a per-letter basis. The `result` table is split by letter via [`where`](../reference/table-operations/filter/where.md) to show this.

```python order=source,result,result_a,result_b
from deephaven.updateby import cum_min, cum_max
from deephaven import empty_table

source = empty_table(20).update(["Letter = (i % 2 == 0) ? `A` : `B`", "X = randomInt(0, 25)"])
result = source.update_by(ops=[cum_min(cols=["MinX = X"]), cum_max(cols=["MaxX = X"])], by=["Letter"]).update(["RangeX = MaxX - MinX"])
result_a = result.where(["Letter == `A`"])
result_b = result.where(["Letter == `B`"])
```

### A single `UpdateByOperation` applied to multiple columns with multiple grouping columns

The following example builds on the [previous](#multiple-updatebyoperations-with-a-single-grouping-column) by applying a single `UpdateByOperation` to multiple columns as well as specifying multiple grouping columns. The grouping columns, `Letter` and `Truth`, contain alternating letters and random true/false values. Thus, groups are defined by unique combinations of letter and boolean. The `result` table is split by letter and truth value to show the unique groups.

```python order=source,result,result_a_true,result_a_false,result_b_true,result_b_false
from deephaven.updateby import rolling_sum_tick, cum_max, cum_min
from deephaven import empty_table

source = empty_table(20).update(["Letter = (i % 2 == 0) ? `A` : `B`", "Truth = randomBool()", "X = randomInt(0, 25)", "Y = randomInt(50, 75)"])

rolling_sum_ops = rolling_sum_tick(cols=["RollingSumX = X", "RollingSumY = Y"], rev_ticks=5, fwd_ticks=0)
min_ops = cum_min(cols=["MinX = X", "MinY = Y"])
max_ops = cum_max(cols=["MaxX = X", "MaxY = Y"])

result = source.update_by(ops=[rolling_sum_ops, min_ops, max_ops], by=["Letter", "Truth"]).update(["RangeX = MaxX - MinX", "RangeY = MaxY - MinY"])
result_a_true = result.where(["Letter == `A`", "Truth == true"])
result_a_false = result.where(["Letter == `A`", "Truth == false"])
result_b_true = result.where(["Letter == `B`", "Truth == true"])
result_b_false = result.where(["Letter == `B`", "Truth == false"])
```

### Applying an `UpdateByOperation` to all columns

The following example uses [`forward_fill`](../reference/table-operations/update-by-operations/forward-fill.md) to fill null values with the most recent previous non-null value. No columns are given to `forward_fill`, so the forward-fill is applied to _all_ columns in the `source` table except for the specified key column(s). This also means that the `X` column is replaced in the `result` table by the forward-filled X values.

```python order=source,result
from deephaven.updateby import forward_fill
from deephaven.constants import NULL_INT
from deephaven import empty_table

source = empty_table(10).update(["Letter = (i % 2 == 0) ? `A` : `B`", "X = (i % 3 == 0) ? NULL_INT : i", "Y = (i % 5 == 2) ? i : NULL_INT"])

result = source.update_by(ops=forward_fill(cols=[]), by=["Letter"])
```

### Tick-based windowed calculations

There are multiple `UpdateByOperations` that are windowed by ticks. When an operation is windowed, the window is defined when creating the operation.

For all tick-based windowed calculations, the window size and location relative to the current row are defined by two input parameters: `rev_ticks` and `fwd_ticks`. The former defines how far _backwards_ the window goes, whereas the latter defines how far _forwards_ it goes. `rev_ticks` is _inclusive_ of the current row: `rev_ticks = 1` means the window starts at the current row. `fwd_ticks` is _not inclusive_ of the current row: `fwd_ticks = 0` means the window ends at the current row. Both of these values can be either positive or negative. The bulleted list below gives several examples of these two parameters and the rolling window they create.

- `rev_ticks = 1, fwd_ticks = 0` - Contains only the current row.
- `rev_ticks = 10, fwd_ticks = 0` - Contains 9 previous rows and the current row.
- `rev_ticks = 0, fwd_ticks = 10` - Contains the following 10 rows; excludes the current row.
- `rev_ticks = 10, fwd_ticks = 10` - Contains the previous 9 rows, the current row and the 10 rows following.
- `rev_ticks = 10, fwd_ticks = -5` - Contains 5 rows, beginning at 9 rows before, ending at 5 rows before the current row (inclusive).
- `rev_ticks = 11, fwd_ticks = -1` - Contains 10 rows, beginning at 10 rows before, ending at 1 row before the current row (inclusive).
- `rev_ticks = -5, fwd_ticks = 10` - Contains 5 rows, beginning 5 rows following, ending at 10 rows following the current row (inclusive).

The following example:

- Creates a static source table with two columns.
- Calculates the rolling sum of `X` grouped by `Letter`.
  - Three rolling sums are calculated using a window before, containing, and after to the current row.
- Splits the `result` table by letter via [`where`](../reference/table-operations/filter/where.md) to show how the windowed calculations are performed on a per-group basis.

```python order=source,result,result_a,result_b
from deephaven.updateby import rolling_sum_tick
from deephaven import empty_table

source = empty_table(20).update(["X = i", "Letter = (i % 2 == 0) ? `A` : `B`"])

op_contains = rolling_sum_tick(cols=["ContainsX = X"], rev_ticks=1, fwd_ticks=1)
op_before = rolling_sum_tick(cols=["PriorX = X"], rev_ticks=3, fwd_ticks=-1)
op_after = rolling_sum_tick(cols=["PosteriorX = X"], rev_ticks=-1, fwd_ticks=3)

result = source.update_by(ops=[op_contains, op_before, op_after], by=["Letter"])
result_a = result.where(["Letter == `A`"])
result_b = result.where(["Letter == `B`"])
```

### Time-based windowed calculations

There are multiple `UpdateByOperations` that are windowed by time. When an operation is windowed, the window is defined when creating the operation. These operations _require_ the source table to contain a column of [date-times](../reference/query-language/types/date-time.md).

For all time-based windowed calculations, the window size and location relative to the current row are defined by two input parameters: `fwd_time` and `rev_time`. The former defines how far _forward_ the window goes, whereas the latter defines how far _backwards_ it goes. These parameters parameter can be given as an integer number of nanoseconds or a string in the form `HH:MM:SS.dddd`. The bulleted list below explains how window sizes vary based on the two parameters:

- `rev_time = "PT00:00:00", fwd_time = "PT00:00:00"` - Contains rows that exactly match the current timestamp.
- `rev_time = "PT00:10:00", fwd_time = "PT00:00:00"` - Contains rows from 10m earlier through the current timestamp (inclusive).
- `rev_time = "PT00:00:00", fwd_time = "PT00:10:00"` - Contains rows from the current timestamp through 10m following the current row timestamp (inclusive).
- `rev_time = int(60e9), fwd_time = int(60e9)` - Contains rows from 1m earlier through 1m3 following the current timestamp (inclusive).
- `rev_time = "PT00:10:00", fwd_time = "-PT00:05:00"` - Contains rows from 10m earlier through 5m before the current timestamp (inclusive). This is a purely backwards-looking window.
- `rev_time = int(-5e9), fwd_time = int(10e9)` - Contains rows from 5s following through 10s following the current timestamp (inclusive). This is a purely forwards-looking window.

The following example:

- Creates a static source table with three columns.
- Calculates the rolling sum of `X` grouped by `Letter`.
  - Three rolling sums are calculated using a window before, containing, and after the current timestamp.
- Splits the `result` table by letter via [`where`](../reference/table-operations/filter/where.md) to show how the windowed calculations are performed on a per-group basis.

```python order=source,result,result_a,result_b
from deephaven.updateby import rolling_sum_time
from deephaven.time import to_j_instant
from deephaven import empty_table

base_time = to_j_instant("2023-01-01T00:00:00 ET")

source = empty_table(20).update(["Timestamp = base_time + i * SECOND", "X = i", "Letter = (i % 2 == 0) ? `A` : `B`"])

op_before = rolling_sum_time(ts_col="Timestamp", cols=["PriorX = X"], rev_time="PT00:00:03", fwd_time=int(-1e9))
op_contains = rolling_sum_time(ts_col="Timestamp", cols=["ContainsX = X"], rev_time="PT00:00:01", fwd_time="PT00:00:01")
op_after = rolling_sum_time(ts_col="Timestamp", cols=["PosteriorX = X"], rev_time="-PT00:00:01", fwd_time=int(3e9))

result = source.update_by(ops=[op_before, op_contains, op_after], by=["Letter"])
result_a = result.where(["Letter == `A`"])
result_b = result.where(["Letter == `B`"])
```

## Handling erroneous data

It's common for tables to contain null, NaN, or other erroneous values. Certain [`update_by`](../reference/table-operations/update-by-operations/updateBy.md) operations can be told how to handle these through the use of the `op_control` input parameter. They are:

- [`ema_tick`](../reference/table-operations/update-by-operations/ema-tick.md)
- [`ema_time`](../reference/table-operations/update-by-operations/ema-time.md)

To see how erroneous data can be handled differently, see the [OperationControl reference guide](../reference/table-operations/update-by-operations/OperationControl.md).

## Related documentation

- [How to create an empty table](./empty-table.md)
- [How to use EMA](./ema-how-to.md)
- [`cum_max`](../reference/table-operations/update-by-operations/cum-max.md)
- [`cum_min`](../reference/table-operations/update-by-operations/cum-min.md)
- [`cum_prod`](../reference/table-operations/update-by-operations/cum-prod.md)
- [`cum_sum`](../reference/table-operations/update-by-operations/cum-sum.md)
- [`delta`](../reference/table-operations/update-by-operations/delta.md)
- [`DeltaControl`](../reference/table-operations/update-by-operations/DeltaControl.md)
- [`ema_tick`](../reference/table-operations/update-by-operations/ema-tick.md)
- [`ema_time`](../reference/table-operations/update-by-operations/ema-time.md)
- [`emmax_tick`](../reference/table-operations/update-by-operations/emmax-tick.md)
- [`emmax_time`](../reference/table-operations/update-by-operations/emmax-time.md)
- [`emmin_tick`](../reference/table-operations/update-by-operations/emmin-tick.md)
- [`emmin_time`](../reference/table-operations/update-by-operations/emmin-time.md)
- [`ems_tick`](../reference/table-operations/update-by-operations/ems-tick.md)
- [`ems_time`](../reference/table-operations/update-by-operations/ems-time.md)
- [`emstd_tick`](../reference/table-operations/update-by-operations/emstd-tick.md)
- [`emstd_time`](../reference/table-operations/update-by-operations/emstd-time.md)
- [`forward_fill`](../reference/table-operations/update-by-operations/forward-fill.md)
- [`OperationControl](../reference/table-operations/update-by-operations/OperationControl.md)
- [`rolling_avg_tick`](../reference/table-operations/update-by-operations/rolling-avg-tick.md)
- [`rolling_avg_time`](../reference/table-operations/update-by-operations/rolling-avg-time.md)
- [`rolling_group_tick`](../reference/table-operations/update-by-operations/rolling-group-tick.md)
- [`rolling_group_time`](../reference/table-operations/update-by-operations/rolling-group-time.md)
- [`rolling_max_tick`](../reference/table-operations/update-by-operations/rolling-max-tick.md)
- [`rolling_max_time`](../reference/table-operations/update-by-operations/rolling-max-time.md)
- [`rolling_min_tick`](../reference/table-operations/update-by-operations/rolling-min-tick.md)
- [`rolling_min_time`](../reference/table-operations/update-by-operations/rolling-min-time.md)
- [`rolling_prod_tick`](../reference/table-operations/update-by-operations/rolling-prod-tick.md)
- [`rolling_prod_time`](../reference/table-operations/update-by-operations/rolling-prod-time.md)
- [`rolling_std_tick`](../reference/table-operations/update-by-operations/rolling-std-tick.md)
- [`rolling_std_time`](../reference/table-operations/update-by-operations/rolling-std-time.md)
- [`rolling_sum_tick`](../reference/table-operations/update-by-operations/rolling-sum-tick.md)
- [`rolling_sum_time`](../reference/table-operations/update-by-operations/rolling-sum-time.md)
- [`rolling_wavg_tick`](../reference/table-operations/update-by-operations/rolling-wavg-tick.md)
- [`rolling_wavg_time`](../reference/table-operations/update-by-operations/rolling-wavg-time.md)
