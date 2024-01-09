---
id: dynamic-table-writer
title: How to write data to an in-memory, real-time table
sidebar_label: Write data to a real-time table
---

This guide will show you how to use [`DynamicTableWriter`](../reference/table-operations/create/DynamicTableWriter.md) to write data to real-time, in-memory Deephaven tables.

Deephaven's [`DynamicTableWriter`](../reference/table-operations/create/DynamicTableWriter.md) writes data into live, in-memory tables by specifying the name and data types of each column. The use of [`DynamicTableWriter`](../reference/table-operations/create/DynamicTableWriter.md) to write data to an in-memory ticking table generally follows a formula:

- Create the [`DynamicTableWriter`](../reference/table-operations/create/DynamicTableWriter.md).
- Get the table that [`DynamicTableWriter`](../reference/table-operations/create/DynamicTableWriter.md) will write data to.
- Write data to the table (done in a separate thread).
- Close the table writer.

## Example: Getting started

The following example creates a table with two columns (`A` and `B`). The columns contain randomly generated integers and strings, respectively. Every second, for ten seconds, a new row is added to the table.

```groovy ticking-table order=null reset
import io.deephaven.engine.table.impl.util.DynamicTableWriter

chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".toCharArray()

// Create a DynamicTableWriter with two columns: `A` (int) and `B` (String)
columnNames = ["A", "B"] as String[]
columnTypes = [int.class, String.class] as Class[]
tableWriter = new DynamicTableWriter(columnNames, columnTypes)

result = tableWriter.getTable()

def rng = new Random()

// Thread to log data to the dynamic table
def thread = Thread.start {
    // for loop that defines how much data to populate to the table
    for (int i = 0; i < 10; i++) {
        // the data to put into the table
        a = rng.nextInt(100)
        b = chars[rng.nextInt(62)]

        // The logRow method adds a row to the table
        tableWriter.logRow(a, b)

        // milliseconds between new rows inserted into the table
        sleep(1000)
    }

    return
}
```

<LoopedVideo src={require('../assets/how-to/DynamicTableWriter_Video1.mp4')} />

## Example: Financial data feed

The following example uses APIs to pull real-time cryptocurrency prices from [`CryptoCompare`](https://www.cryptocompare.com/) and writes them to a live table. Prices for three different coins are logged ten times.

:::note

See [How to install Java packages](./install-java-packages.md) for more information on implementing this example in groovy.

:::

```groovy skip-test ticking-table order=null
import com.crypto.cryptocompare.api.CryptoCompareApi
import com.google.gson.JsonObject
import java.time.LocalDateTime

import io.deephaven.engine.table.impl.util.DynamicTableWriter

sleep_time = 2000

CryptoCompareApi api = new CryptoCompareApi()

columnNames = ["Timestamp", "Bitcoin", "Dogecoin", "Ethereum"] as String[]
columnTypes = [DateTime.class, double.class, double.class, double.class] as Class[]

tableWriter = new DynamicTableWriter(columnNames, columnTypes)

cryptoPrices = tableWriter.getTable()

// Thread to log data to the dynamic table
def thread = Thread.start {
    // for loop that defines how much data to populate to the table
    for(int i = 0; i < 10; i++) {

        // the data to put into the table
        // Get timestamp and crypto prices
        timestamp = currentTime()
        JsonObject response = api.priceMulti(
            "BTC,DOGE,ETH",
            "USD",
            new LinkedHashMap<String, Object>() {{
                put("extraParams", "TestProject");
            }}
        );
        bitcoin_price = response.get("BTC").get("USD").getAsDouble()
        dogecoin_price = response.get("DOGE").get("USD").getAsDouble()
        ethereum_price = response.get("ETH").get("USD").getAsDouble()

        // The logRow method adds a row to the table
        tableWriter.logRow(timestamp, bitcoin_price, dogecoin_price, ethereum_price)

        // milliseconds between new rows inserted into the table
        sleep(sleep_time)
    }

    return
}
```

<LoopedVideo src={require('../assets/how-to/DynamicTableWriter_Video2.mp4')} />

## Related documentation

- [How to use Java packages in query strings](./use-java-packages.md)
- [DynamicTableWriter](../reference/table-operations/create/DynamicTableWriter.md)
- [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/engine/utils/DynamicTableWriter.html)
