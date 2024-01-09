---
id: timeTable
title: time_table
---

The `time_table` method creates a time table that adds new rows at a specified interval. The resulting table has one date-time column, `Timestamp`.

## Syntax

```python syntax
time_table(
  period: Union[dtypes.Duration, int, str, datetime.timedelta, np.timedelta64, pd.Timdelta],
  start_time: Union[None, str, datetime.datetime, np.datetime64] = None,
  blink_table: bool = False,
  ) -> Table
```

## Parameters

<ParamTable>
<Param name="period" type="Union[dtypes.Duration, int, str, datetime.timedelta, np.timedelta64, pd.Timdelta]">

The time interval between new row additions. Can be given as:

- [Duration](../../query-language/types/durations.md) string such as `"PT1S"` or `"PT00:01:00"`.
- Integer format is in nanoseconds.
- String input format is "PT00:00:00:00.001" - days, hours, minutes, seconds, and milliseconds.
- A [datetime.timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) object.
- A [numpy.timedelta64](https://numpy.org/doc/stable/reference/arrays.datetime.html#timedelta64) object.
- A [pandas.Timedelta](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Timedelta.html) object.

</Param>
<Param name="start_time" type="Union[None, str, datetime.datetime, np.datetime64" optional>

The value of the [date-time](../../query-language/types/date-time.md) in the first row of the table. String inputs must be given in syntax matching `YYYY-MM-DDThh:mm:ss.dddddddd TZ`.

:::warning
Setting `start_time` sufficiently far in the past, coupled with a short `period`, can cause the time table to instantly populate with a very large number of rows.
:::

</Param>
<Param name="blink_table" type="bool" optional>

If the time table should be a [blink table](../../../conceptual/table-types.md#blink); defaults to `False`.

</Param>
</ParamTable>

## Returns

A ticking time table that adds new rows at the specified interval.

## Example

The following example creates a time table that adds one new row every second.

```python ticking-table order=null
from deephaven import time_table

result = time_table("PT1S")
```

<LoopedVideo src={require('../../../assets/reference/create/timeTable.mp4')} />

<!--

The following example creates a time table with a start time two hours before its creation.

```python ticking-table order=null
from deephaven.time import dh_now, minus_period, to_j_duration
from deephaven import time_table

starttime = minus_period(dt=dh_now(), period=to_j_duration("PT2H"))

t = time_table("PT1S", starttime)
```

![img](../../../assets/reference/create/timeTable2.gif)

-->

## Related documentation

- [Create a table with `time_table`](../../../how-to-guides/time-table.md)
- [How to reduce the update frequency of ticking tables](../../../how-to-guides/reduce-update-frequency.md)
- [How to capture the history of ticking tables](../../../how-to-guides/capture-table-history.md)
- [`empty_table`](./emptyTable.md)
- [`new_table`](./newTable.md)
- [`dh_now`](../../time/datetime/dh_now.md)
- [`to_j_duration`](../../time/datetime/to_j_duration.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table_factory.html?highlight=time_table#deephaven.table_factory.time_table)
