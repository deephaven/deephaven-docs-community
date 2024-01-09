---
id: time-table
title: Create a table with time_table
sidebar_label: Create a time table
---

This guide will show you how to create a time table. A time table is a special type of table that adds new rows at a regular, user-defined interval. Its sole column is a timestamp column.

Here, we will use the [`time_table`](../reference/table-operations/create/timeTable.md) method to create a simple time table that ticks every two seconds. The method's `period` parameter takes a [duration](../reference/query-language/types/durations.md) string, which specifies the interval at which the table ticks.

Duration strings are formatted as `"PTnHnMnS"`, where:

- `PT` is the prefix to indicate a [duration](../reference/query-language/types/durations.md)
- `n` is a number
- `H`, `M`, and `S` are the units of time (hours, minutes, and seconds, respectively)

Copy and run the following code in your console:

```python ticking-table order=null
from deephaven import time_table

result = time_table(period="PT2S")
```

`PT` is the prefix to indicate a [duration](../reference/query-language/types/durations.md).

<LoopedVideo src={require('../assets/tutorials/timetable.mp4')} />

A time table can be told to tick starting at a specific time by using the `start_time` input argument. The following code block uses [pandas](https://pandas.pydata.org/docs/user_guide/timeseries.html) to specify a start time that's one hour prior to the method being called. That means that when this code is run, `result` is initially populated with 1800 rows of data (one for every two seconds in the previous hour).

```python ticking-table order=null
from deephaven import time_table
import pandas as pd

one_hour_earlier = pd.Timestamp.now(tz="America/New_York") - pd.Timedelta(1, "hour")

result = time_table(period="PT2S", start_time=one_hour_earlier).reverse()
```

![img](../assets/how-to/ticking-1h-earlier.gif)

The examples above create [append-only](../conceptual/table-types.md#append) time tables. To create a [blink](../conceptual/table-types.md#blink) time table, which only retains rows from the most recent update cycle, set the `blink_table` parameter to `True`:

```python ticking-table order=null
from deephaven import time_table

result = time_table("PT00:00:02", blink_table=True)
```

This time table updates every two seconds, but only keeps the row received during the last update cycle:

<LoopedVideo src={require('../assets/how-to/blink_time_table.mp4')} />

Time tables are often used as trigger tables, which, through the use of [`snapshot_when`](/core/docs/reference/table-operations/snapshot/snapshot-when/) can:

- reduce the update frequency of ticking tables
- create the history of a table, sampled at a regular interval

## Related documentation

- [Create a new table](./new-table.md)
- [How to capture the history of ticking tables](../how-to-guides/capture-table-history.md)
- [How to reduce the update frequency of ticking tables](../how-to-guides/reduce-update-frequency.md)
- [Table types](../conceptual/table-types.md)
- [`snapshot`](../reference/table-operations/snapshot/snapshot.md)
- [`snapshot_when`](../reference/table-operations/snapshot/snapshot-when.md)
- [`time_table`](../reference/table-operations/create/timeTable.md)
