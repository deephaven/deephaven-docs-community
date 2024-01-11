---
id: rolling-std-time
title: rolling_std_time
---

`rolling_std_time` creates a time-based windowed sample standard deviation operator to be used in an [`update_by`](./updateBy.md) table operation. Data is windowed by reverse and forward time intervals relative to the current row, and the sample standard deviation of values within the window is calculated.

Sample standard deviation is calculated as the square root of the [Bessel-corrected sample variance](https://en.wikipedia.org/wiki/Bessel%27s_correction), which can be shown to be an [unbiased estimator](https://en.wikipedia.org/wiki/Bias_of_an_estimator) of population variance under some conditions. However, sample standard deviation is a biased estimator of population standard deviation.

## Syntax

```
rolling_std_time(
    ts_col: str,
    cols: list[str],
    rev_time: Union[int, str],
    fwd_time: Union[int, str],
) -> UpdateByOperation
```

## Parameters

<ParamTable>
<Param name="ts_col" type="str">

The name of the column containing timestamps.

</Param>
<Param name="cols" type="list[str]">

The column(s) to be operated on. These can include expressions to rename the output (e.g., `NewCol = Col`). If `None` the rolling sample standard deviation is calculated for all applicable columns.

</Param>
<Param name="rev_time" type="Union[int,str]">

The look-behind window size. This can be expressed as an integer in nanoseconds or a string [duration](../../query-language/types/durations.md), e.g., `"PT00:00:00.001"` or `"PTnHnMnS"`, where `H` is hour, `M` is minute, and `S` is second.

</Param>
<Param name="fwd_time" type="Union[int,str]">

The look-forward window size. This can be expressed as an integer in nanoseconds or a string [duration](../../query-language/types/durations.md), e.g., `"PT00:00:00.001"` or `"PTnHnMnS"`, where `H` is hour, `M` is minute, and `S` is second.

</Param>
</ParamTable>

## Returns

An [`UpdateByOperation`](./updateBy.md#parameters) to be used in an `update_by` table operation.

## Examples

The following example performs an [update_by](./updateBy.md) on the `source` table using three `rolling_std_time` operations. Each operation gives varying `rev_time` and `fwd_time` values to show how they affect the output. The windows for each operation are as follows:

- `op_before`: The window starts five seconds before the current row, and ends one second before the current row.
- `op_after`: The window starts one second after the current row, and ends five seconds after of the current row.
- `op_middle`: The window starts three seconds before the current row, and ends three seconds after the current row.

```python order=source,result
from deephaven.updateby import rolling_std_time
from deephaven.time import to_j_instant
from deephaven import empty_table

base_time = to_j_instant("2023-01-01T00:00:00 ET")

source = empty_table(10).update(["Timestamp = base_time + i * SECOND", "Letter = (i % 2 == 0) ? `A` : `B`", "X = i"])

op_before = rolling_std_time(ts_col="Timestamp", cols=["WindowBeforeX = X"], rev_time=int(5e9), fwd_time=int(-1e9))
op_after = rolling_std_time(ts_col="Timestamp", cols=["WindowAfterX = X"], rev_time="PT-1S", fwd_time="PT5S")
op_middle = rolling_std_time(ts_col="Timestamp", cols=["WindowMiddleX = X"], rev_time="PT3S", fwd_time="PT3S")

result = source.update_by(ops=[op_before, op_after, op_middle], by=["Letter"])
```

## Related documentation

- [How to use `update_by`](../../../how-to-guides/use-update-by.md)
- [How to create an empty table](../../../how-to-guides/empty-table.md)
- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [ternary conditional operator](../../query-language/control-flow/ternary-if.md)
- [`update`](../select/update.md)
- [`update_by`](./updateBy.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/api/updateby/UpdateByOperation.html#RollingStd(java.lang.String,java.time.Duration,java.time.Duration,java.lang.String...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.updateby.html#deephaven.updateby.rolling_std_time)