---
id: replay-data
title: How to replay table data in Deephaven
sidebar_label: Replay historical table data
---

This guide will show you how to replay historical data as live data in Deephaven.

Deephaven excels at handling live data. Integrating historical data into real-time analysis is common in a multitude of fields including machine learning, validation, modeling, simulation, and forecasting. In this guide, we will take historical data and play it back as real-time data based on timestamps in a table. This example could be easily extended towards a variety of real-world applications.

## Create a historical data table

In order to replay historical data, we need historical data with timestamps in `DateTime` format. In our guide, [How to write data to an in-memory, real-time table](./dynamic-table-writer.md), we use code that creates an in-memory table using [`DynamicTableWriter`](../reference/table-operations/create/DynamicTableWriter.md). We build on the example in the guide by creating a three row table with 1,000 columns. We create timestamps starting from the turn of the millenium on January 1, 2000, and increment them by 100 ms for every row. The next two columns contain random integers and ASCII characters, respectively.

```groovy skip-test
import io.deephaven.engine.table.impl.util.DynamicTableWriter

chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".toCharArray()

columnNames = ["DateTime", "A", "B"] as String[]
columnTypes = [Instant.class, int.class, String.class] as Class[]
tableWriter = new DynamicTableWriter(columnNames, columnTypes)

time = parseInstant("2000-01-01T00:00:00 ET")
timeOffset = parseDuration("PT0.1S")

result = tableWriter.getTable()

def rng = new Random()

def thread = Thread.start {
    for (int i = 0; i < 1000; i++) {
        a = rng.nextInt(100)
        b = chars[rng.nextInt(62)]

        tableWriter.writeRow(time, a, b)
        time = DateTimeUtils.plus(time, timeOffset)
    }

    return
}
```

## Replay the historical data

Now we can replay our data. Follow these steps:

- Import the Deephaven [`Replayer`](../reference/table-operations/create/Replayer.md) object.
- Set a start and end time for data replay.
  - These correspond to those in the historical table.
- Create the replayer using the set start and end time.
- Call [`replay`](../reference/table-operations/create/Replayer.md#methods) to prepare the replayed table
  This takes the table to replay and the timestamp column name as input.
- Call [`start`](../reference/table-operations/create/Replayer.md#methods) to start replaying data

```groovy skip-test
import io.deephaven.engine.table.impl.replay.Replayer

startTime = parseInstant("2000-01-01T00:00:00 ET")
endTime = parseInstant("2000-01-01T00:01:40 ET")

resultReplayer = new Replayer(startTime, endTime)

replayedResult = resultReplayer.replay(result, "DateTime")
resultReplayer.start()
```

<LoopedVideo src={require('../assets/how-to/random-int-char-withTimestamps_Replayed.mp4')} />

## Related documentation

- [How to write data to a real-time in-memory table](./dynamic-table-writer.md)
- [Replayer](../reference/table-operations/create/Replayer.md)
