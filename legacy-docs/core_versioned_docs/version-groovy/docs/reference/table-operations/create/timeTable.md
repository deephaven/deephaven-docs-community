---
id: timeTable
title: timeTable
---

The `timeTable` method creates a time table that adds new rows at a specified interval. The resulting table has one date-time column, `Timestamp`.

## Syntax

```
timeTable(period)
timeTable(period, replayer)
timeTable(startTime, period)
timeTable(startTime, period, replayer)
timeTable(periodNanos)
timeTable(periodNanos, replayer)
timeTable(startTime, periodNanos)
timeTable(startTime, periodNanos, replayer)
timeTable(clock, startTime, periodNanos)
```

## Parameters

<ParamTable>
<Param name="period" type="String">

The time interval between new row additions.

</Param>
<Param name="replayer" type="ReplayerInterface">

Data replayer.

</Param>
<Param name="startTime" type="DateTime">

Start time for adding new rows.

</Param>
<Param name="periodNanos" type="long">

The time interval between new rows in nanoseconds.

</Param>
<Param name="clock" type="Clock">

The clock.

</Param>
</ParamTable>

## Returns

A ticking time table that adds new rows at the specified interval.

## Example

The following example creates a time table that adds one new row every second.

```groovy ticking-table order=null
result = timeTable("PT00:00:01")
```

<LoopedVideo src={require('../../../assets/reference/create/timeTable.mp4')} />

The following example creates a time table that starts two hours prior to its creation.

```groovy ticking-table order=null
startTime = minus(now(), parseDuration("PT2H"))

source = timeTable(startTime, "PT1S")
```

<!--TODO: add more code examples. Given the large number of overloads, that would be helpful. Esp. the one using a clock. -->

![img](../../../../../../core/docs/assets/reference/create/timeTable2.gif)

## Related documentation

- [Create a table with `timeTable`](../../../how-to-guides/time-table.md)
- [How to reduce the update frequency of ticking tables](../../../how-to-guides/reduce-update-frequency.md)
- [How to capture the history of ticking tables](../../../how-to-guides/capture-table-history.md)
- [`emptyTable`](./emptyTable.md)
- [`newTable`](./newTable.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#timeTable(java.lang.String)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.TableTools.html?highlight=timetable#deephaven.TableTools.timeTable)
