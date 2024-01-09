---
id: time-table
title: Create a table with timeTable
sidebar_label: Create a time table
---

This guide will show you how to create a time table. A time table is a special type of table that adds new rows at a regular, user-defined interval. Its sole column is a timestamp column.

Here, we will use [`timeTable`](../reference/table-operations/create/timeTable.md) to create a simple time table that ticks every two seconds. The method's `period` parameter specifies the interval at which the table ticks as a [duration](../reference/query-language/types/durations.md) string, indicated by the `"PT"` prefix.

Copy and run the following code in your console:

```groovy ticking-table order=null
result = timeTable("PT2S")
```

<LoopedVideo src={require('../assets/tutorials/timetable.mp4')} />

The time table in the example above starts ticking the moment the query is run and the table is created. To start the time table at a specific time, use the `start_time` parameter. This table initializes with 1800 rows (one for every two second in the past hour), and then continues to tick every two seconds.

```groovy ticking-table order=null
oneHourEarlier = minus(now(), parseDuration("PT1H"))

result = timeTable(oneHourEarlier, "PT2S").reverse()
```

![img](../assets/how-to/ticking-1h-earlier.gif)

Time tables are often used as trigger tables, which, through the use of [`snapshotWhen`](../reference/table-operations/snapshot/snapshot-when.md) can:

- reduce the update frequency of ticking tables
- create the history of a table, sampled at a regular interval

## Related documentation

- [Create a new table](./new-table.md)
- [How to capture the history of ticking tables](../how-to-guides/capture-table-history.md)
- [How to reduce the update frequency of ticking tables](../how-to-guides/reduce-update-frequency.md)
- [`snapshot`](../reference/table-operations/snapshot/snapshot.md)
- [`snapshotWhen`](../reference/table-operations/snapshot/snapshot-when.md)
- [`timeTable`](../reference/table-operations/create/timeTable.md)
