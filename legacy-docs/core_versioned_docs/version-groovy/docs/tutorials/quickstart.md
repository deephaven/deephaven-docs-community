---
id: quickstart
title: Deephaven Community Core Quickstart
sidebar_label: Quickstart
---

## 1. Install with one command

Install and launch Deephaven via [Docker](https://docs.docker.com/get-docker/) with a one-line command:

```sh
docker run --rm --name deephaven -p 10000:10000 --env START_OPTS=-Dauthentication.psk=YOUR_PASSWORD_HERE ghcr.io/deephaven/server-slim:latest
```

For security it is important to **replace "YOUR_PASSWORD_HERE" with a more secure passkey**. The above command requires [Docker](https://www.docker.com/products/docker-desktop/) to already be installed. For advanced installation options, see our [install guide for Docker](./docker-install.md).

## 2. Access the Deephaven Community front-end UI

Now, navigate to [http://localhost:10000/](http://localhost:10000/) and enter the password you set above in the token field. You're up and running! Now what?

![img](../assets/tutorials/deephaven_launch.png)

## 3. Work with live and batch data

Deephaven empowers you to work with both batch and streaming data using the same methods.

It supports ingesting data from [CSVs](../how-to-guides/csv-import.md), [Parquet files](../how-to-guides/parquet-single.md), and [Kafka streams](../how-to-guides/data-import-export/kafka-stream.md).

### Access data from a CSV

Run the commmand below inside a Deephaven console for an example of ingesting a million-row CSV of crypto trades. All you need is a stable URL for the data.

```groovy test-set=1 order=cryptoFromCsv
import io.deephaven.csv.CsvTools

cryptoFromCsv = CsvTools.readCsv("https://media.githubusercontent.com/media/deephaven/examples/main/CryptoCurrencyHistory/CSV/CryptoTrades_20210922.csv")
```

The table widget now in view is highly interactive:

- Click on a table and press <kbd>Ctrl</kbd> + <kbd>F</kbd> (Windows) or <kbd>⌘F</kbd> (Mac) to open quick filters.
- Click the funnel icon in the filter field to create sophisticated filters or use auto-filter UI features.
- Hover over column headers to see data types.
- Right-click headers to access more options, like adding or changing sorts.
- Click the Table Options hamburger menu at right to plot from the UI, create and manage columns, download CSVs.

<LoopedVideo src={require('../assets/tutorials/tableoptions.mp4')} />

### Ingest real-time streams

Providing you the ability to work with dynamic, updating, and real-time data is Deephaven’s superpower.

Deephaven has a rich [Kafka integration](../how-to-guides/data-import-export/kafka-stream.md), supporting AVRO, JSON, Protobuf, dictionaries, and dynamics for historical, stream, and append tables. Users connect Kafka and other event streams, integrate enterprise and vendor data-source APIs and feeds, receive JSON from devices, and integrate with Change Data Capture (CDC) exhaust from RDBMSs.

The following code takes fake historical crypto trade data from a CSV file at a URL and replays it in real time based on timestamps. This is only one of multiple ways to create real-time data in just a few lines of code. Replaying historical data is a great way to test real-time algorithms before deployment into production.

```groovy test-set=1 order=null ticking-table
import io.deephaven.engine.table.impl.replay.Replayer

fakeCryptoData = CsvTools.readCsv("https://media.githubusercontent.com/media/deephaven/examples/main/CryptoCurrencyHistory/CSV/FakeCryptoTrades_20230209.csv")

start = parseInstant("2023-02-09T12:09:18 ET")
end = parseInstant("2023-02-09T12:58:09 ET")

replayer = new Replayer(start, end)

cryptoStreaming = replayer.replay(fakeCryptoData, "Timestamp")

replayer.start()
```

It’s nice to watch new data hit the screen. Let's [reverse](../reference/table-operations/sort/reverse.md) the table so the newest trades appear at the top.

```groovy test-set=1  order=null ticking-table
cryptoStreaming2 = cryptoStreaming.reverse()
```

![img](../assets/tutorials/kafkastreamreverse.gif)

:::tip

Many table operations can also be done from the UI, for example right-click on a column header in the UI and choose **Reverse Table**.

:::

Now that you have a few tables, the next section will introduce adding new columns to them and merging.

### Create columns and merge tables

Let's examine the data a bit programmatically. Use [`countBy`](../reference/table-operations/group-and-aggregate/countBy.md) to see the row-count of the tables, respectively.

Table operations, methods, and other capabilities of the Deephaven table API **are used identically for updating (streaming) tables and static ones!**

This simple example illustrates this superpower:

```groovy test-set=1 order=null ticking-table
rowCountFromCsv = cryptoFromCsv.countBy("RowCount").updateView("Source = `CSV`")
rowCountStreaming = cryptoStreaming.countBy("RowCount").updateView("Source = `Streaming`")
```

![img](../assets/tutorials/rowcounts.gif)

You can eyeball the respective row counts easily by [merging](../reference/table-operations/merge/merge.md) the tables. In the future, if you need to [merge](../reference/table-operations/merge/merge.md) then [sort](../reference/table-operations/sort/sort.md) a table, we recommend using [`mergeSorted`](../reference/table-operations/merge/merge-sorted.md), as it is more efficient.

```groovy test-set=1 order=null
rowCountCompare = merge(rowCountFromCsv, rowCountStreaming)
```

![img](../assets/tutorials/row_count_compare.gif)

Explore the schema and other metadata using [`meta`](../reference/table-operations/metadata/meta.md).

```groovy test-set=1 order=metaFromCsv,metaStreaming
metaFromCsv = cryptoFromCsv.meta().updateView("Source = `CSV`").moveColumnsUp("Source")
metaStreaming = cryptoStreaming.meta().updateView("Source = `Streaming`").moveColumnsUp("Source", "Name")
```

Let's create one table of crypto data that has both updating and static data. The last line removes the legacy static table.

```groovy test-set=1  order=null ticking-table
cryptoMain = merge(cryptoFromCsv, cryptoStreaming2)\
    .sortDescending("Timestamp")
cryptoFromCsv.close()
```

![img](../assets/tutorials/cryptoMain.gif)

In the next section, you’ll learn about adding new columns to support calculations and logic, and doing aggregations.

### Manipulate and aggregate data

It's likely you've figured out a few of Deephaven’s fundamentals:

- You name tables and operate on them. Everything in Deephaven is a table. Streams are updating tables. Batches are static ones. You don't have to track this.
- You apply methods to these tables and can be blind about whether the data is updating or not.
- You can refer to other named tables, and data simply flows from tables to its dependents. You may know this as an [acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph). See our concept guide on the [table update model](../conceptual/table-update-model.md) if you're interested in what's under-the-hood.
- There is no optimizer to wrestle with. You’ll appreciate this once you tackle complex use cases or need to bring your Python, Java, or wrapped C++ code to the data.

Aggregations are an important use case for streaming data. (And static, too.)
Doing a [single, dedicated aggregation](../how-to-guides/dedicated-aggregations.md), like the [`sumBy`](../reference/table-operations/group-and-aggregate/sumBy.md) below, follows a pattern similar to the [`countBy`](../reference/table-operations/group-and-aggregate/countBy.md) you did earlier.

```groovy test-set=1  order=null ticking-table
cryptoSumBy = cryptoMain.view("Instrument", "Exchange", "Trade_Count = 1", "Total_Base_Value = Price * Size")\
    .sumBy("Instrument", "Exchange")\
    .sortDescending("Trade_Count")
```

![img](../assets/tutorials/cryptoSumBy.gif)

:::tip

You can also add columns with **Custom Columns** in the Table Options menu in the web UI.

:::

If your use case is well served by adding columns in a formulaic, on-demand fashion (instead of writing results to memory), use [`updateView`](../reference/table-operations/select/update-view.md).

Binning data is fundamental and is intended to be easy via [`upperBin`](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#upperBin(java.time.ZonedDateTime,long)>) and [`lowerBin`](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#upperBin(java.time.ZonedDateTime,long)>). This is heavily used in profiling and sampling data.

The query below reuses the same table name (`cryptoMain`). That’s just fine. Then, it does an aggregation by 5-second bins.

```groovy test-set=1  order=null ticking-table
cryptoMain = cryptoMain.updateView("ValueBaseCcy = (Price * Size)",\
    "TimeBin = upperBin(Timestamp, 2 * SECOND)")

crypto5secAgg = cryptoMain.view("TimeBin", "Instrument", "Size")\
    .sumBy("TimeBin", "Instrument")\
    .sortDescending("TimeBin", "Instrument")
```

<LoopedVideo src={require('../assets/tutorials/crypto_5secbins.mp4')} />

View distinct values using [`selectDistinct`](../reference/table-operations/select/select-distinct.md).

```groovy test-set=1  order=null ticking-table
// 1 column
distinctInstruments = cryptoMain.selectDistinct("Instrument").sort("Instrument")
// 2 columns
instrumentExchange = cryptoMain.selectDistinct("Exchange", "Instrument").sort("Exchange", "Instrument")
// countBy looks similar
countBy = cryptoMain.countBy("Trade_Count", "Exchange", "Instrument").sort("Exchange", "Instrument")
```

![img](../assets/tutorials/cryptodistinct.png)

:::tip

You can also accomplish this with **Select Distinct Values** in the Table Options menu in the web UI.

:::

Performing [multiple aggregations](../how-to-guides/combined-aggregations.md) simultaneously may prove logical and helpful to performance.

Let's define an aggregation function to be used later. The function will return an aggregation result based on the table and aggregation-keys you pass in.

```groovy test-set=1
import io.deephaven.api.agg.Aggregation

def aggregateCrypto(io.deephaven.engine.table.Table table, String... aggKeys) {
    def aggList = [
        AggFirst("LastTimestamp = Timestamp"),
        AggSum("TotalValueTraded = ValueBaseCcy", "TotalSize = Size"),
        AggWAvg("Size", "WtdAvgPrice = Price"),
        AggCount("TradeCount"),
        AggMin("LowPrice = Price"),
        AggMax("HiPrice = Price")
    ]
    return table.aggBy(aggList, aggKeys)
}
```

Below, you equip `aggregateCrypto` with different numbers and versions of keys. The last table has some extra polish to make the resulting table more valuable to the eye.

```groovy test-set=1  order=null
def aggregateCrypto(io.deephaven.engine.table.Table table, String... aggKeys) {
    def aggList = [
        AggFirst("LastTimestamp = Timestamp"),
        AggSum("TotalValueTraded = ValueBaseCcy", "TotalSize = Size"),
        AggWAvg("Size", "WtdAvgPrice = Price"),
        AggCount("TradeCount"),
        AggMin("LowPrice = Price"),
        AggMax("HiPrice = Price")
    ]
    return table.aggBy(aggList, aggKeys)
}

// 1 key
agg1Key = aggregateCrypto(cryptoMain, "TimeBin")

// 2 keys
agg2Keys = aggregateCrypto(cryptoMain, "Exchange", "Instrument")\
    .sort("Exchange", "Instrument")

// keys
agg3Keys = aggregateCrypto(cryptoMain, "Exchange", "Instrument", "TimeBin")\
    .sortDescending("LastTimestamp")\
    .updateView("TotalValueTraded = (int)TotalValueTraded", "TotalSize = (long)TotalSize")\
    .moveColumnsUp("Instrument", "TradeCount", "TotalValueTraded")
```

![img](../assets/tutorials/aggkeys.png)

### Filter, join, and as-of-join

Deephaven [filtering](../how-to-guides/use-filters.md) is accomplished by applying [`where`](../reference/table-operations/filter/where.md) operations. The engine supports a large array of match, conditional, and combination filters.

These four scripts are simple examples.

```groovy test-set=1  order=null ticking-table
filterBtc = cryptoMain.where("Instrument = `BTC/USD`")
filterEth = cryptoMain.where("Instrument = `ETH/USD`")
filterEthAndPrice = cryptoMain.where("Instrument = `ETH/USD`", "Size > 1")
filterEthAndExchange = cryptoMain.where("Instrument = `ETH/USD`", "Exchange.startsWith(`bi`) = true")
```

![img](../assets/tutorials/cryptofilters.png)

Use [`whereIn`](../reference/table-operations/filter/where-in.md) to filter one table based on the contents of another "filter table". If the filter table updates, the filter applied to the other changes automatically.

In the third line below, you’ll filter the table `cryptoMain` based on the `Instrument` values of the table `row1`.

```groovy test-set=1  order=null ticking-table
import io.deephaven.api.agg.Aggregation

def aggregateCrypto(io.deephaven.engine.table.Table table, String... aggKeys) {
    def aggList = [
        AggFirst("LastTimestamp = Timestamp"),
        AggSum("TotalValueTraded = ValueBaseCcy", "TotalSize = Size"),
        AggWAvg("Size", "WtdAvgPrice = Price"),
        AggCount("TradeCount"),
        AggMin("LowPrice = Price"),
        AggMax("HiPrice = Price")
    ]
    return table.aggBy(aggList, aggKeys)
}

aggByInstrument = aggregateCrypto(cryptoMain, "Instrument")
row1 = aggByInstrument.head(1)
filterWhereIn = cryptoMain.whereIn(row1, "Instrument")

aggByInstrument = aggregateCrypto(cryptoMain, "Instrument")
row1 = aggByInstrument.head(1)
filterWhereIn = cryptoMain.whereIn(row1, "Instrument")
```

<LoopedVideo src={require('../assets/tutorials/cryptoinstruments.mp4')} />

Deephaven joins are first class, supporting joining real-time, updating tables with each other (and with static tables) without any need for windowing.

Our guide, [Choose a join method](../conceptual/choose-joins.md), offers guidance on how to choose the best method for your use case.

Generally, joins fall into one of two categories:

- Time series joins: [`aj` (as-of-join)](../reference/table-operations/join/aj.md), [`raj` (reverse-as-of-join)](../reference/table-operations/join/raj.md), and [`rangeJoin`](../reference/table-operations/join/rangeJoin.md).
- Relational joins: [`naturalJoin`](../reference/table-operations/join/natural-join.md), [`join`](../reference/table-operations/join/join.md), [`exactJoin`](../reference/table-operations/join/exact-join.md), [`fullOuterJoin`](../reference/table-operations/join/full-outer-join.md), and [`leftOuterJoin`](../reference/table-operations/join/left-outer-join.md).

Use [`naturalJoin`](../reference/table-operations/join/natural-join.md) when you expect no more than one match in the right table per key, and are happy to receive null records as part of the join process.

```groovy test-set=1  order=null ticking-table
// filter the aggregation tables to create a table for BTC and ETH
tradeCountBtc = agg2Keys.where("Instrument = `BTC/USD`").view("Exchange", "TradeCount")
tradeCountEth = agg2Keys.where("Instrument = `ETH/USD`").view("Exchange", "TradeCount")

// naturalJoin() using "Exchange" as the join-key
// pull column "TradeCount" from the *_eth table, renaming it "TradeCountEth"
join2Tables = tradeCountBtc.renameColumns("TradeCountBtc = TradeCount")\
    .naturalJoin(tradeCountEth, "Exchange", "TradeCountEth = TradeCount")
```

![img](../assets/tutorials/cryptojoins.png)

Though Deephaven excels with relational joins, its ordering capabilities make it an excellent time series database.

Time series joins, or “as-of joins”, take a timestamp key from the left table and do a binary search in the right table (respecting other join keys) seeking an exact timestamp-nanosecond match. If no match exists, the timestamp just prior to the join-timestamp establishes the match target.

It is important to note:

- The right table needs to be sorted.
- Numerical fields other than [date-times](../reference/query-language/types/date-time.md) can also be used for the final key in [as-of joins](../reference/table-operations/join/aj.md).
- [Reverse-as-of join](../reference/table-operations/join/raj.md) is similar, but uses the record just after the target timestamp if no exact match is found.
- One can syntactically use `<` or `>` (instead of `=`) in the query to eliminate the exact match as the best candidate.

```groovy test-set=1  order=null ticking-table
// filter the original cryptoMain table to get raw BTC and ETH trade records
cryptoBtc = cryptoMain.where("Instrument = `BTC/USD`")
cryptoEth = cryptoMain.where("Instrument = `ETH/USD`")

// for each record of the right table
timeSeriesJoin = cryptoBtc.view("Timestamp", "Price")\
    .aj(cryptoEth, "Timestamp", "EthTime = Timestamp, PriceEth = Price")\
    .renameColumns("TimeBtc = Timestamp", "PriceBtc = Price")
```

<LoopedVideo src={require('../assets/tutorials/cryptojoins2.mp4')} />

The introduction of `Exchange` as a join-key in front of Timestamp in the script below directs the engine to do the [as-of-join](../reference/table-operations/join/aj.md) after first doing an exact match on `Exchange` between the left and right tables.

```groovy test-set=1  order=null ticking-table
timeSeriesJoin2Keys = cryptoBtc.view("Exchange", "TimeBtc = Timestamp", "PriceBtc = Price")\
    .aj(cryptoEth, "Exchange, TimeBtc >= Timestamp", "EthTime = Timestamp, EthPrice = Price")
```

![img](../assets/tutorials/cryptojoins3.png)

People often use [`aj`](../reference/table-operations/join/aj.md) to join records that are shifted by a time phase.

```groovy test-set=1  order=null ticking-table
// Create a column to represent time 1 minute before the "Timestamp".
cryptoBtcSimple = cryptoBtc.view("TimeTrade = Timestamp", "TimeLess1min = TimeTrade - MINUTE", "PriceNow = Price")

// As-of join the table on itself.
timeSeriesJoinSelf = cryptoBtcSimple.aj(cryptoBtcSimple, "TimeTrade >= TimeLess1min", "Price1MinPrev = PriceNow")\
    .updateView("PriceDiff = PriceNow - Price1MinPrev")
```

![img](../assets/tutorials/cryptojoins4.png)

### Plot data via the UI

<!--TODO: plotting examples

Deephaven has a rich plotting API that support _updating, real-time plots_. It can be called programmatically or via JS integrations in the web UI.

Try these basic examples:

```groovy test-set=1 order=crypto_btc_2021,simple_line_plot,line_plot,scatter_plot
crypto_btc_2021 = crypto_btc.updateView("Year = (int)year(Timestamp, timeZone(`ET`))").where("Year == 2021").dropColumns("Year")

// simple line plot
simple_line_plot = plot("BTC Price", crypto_btc_2021.tail(2_000), "Timestamp", "Price").show()

// two series, two axes
line_plot = plot("BTC Size", crypto_btc_2021.tail(2_000), "Timestamp", "Size").lineColor("HONEYDEW")\
    .twinX()\
    .plot("BTC Price", crypto_btc_2021.tail(2_000), "Timestamp", "Price").lineColor("RED")\
    .show()

// scatter plot
scatter_plot = plot("ETH vs. BTC", time_series_join.reverse().tail(100), "Price_Btc", "Price_Eth")\
    .plotStyle("SCATTER")\
    .show()
```



You can make simple plots using the [Chart Builder](../how-to-guides/user-interface/chart-builder.md) in the UI. Open the **Table Options** menu at the table's right. After choosing a chart type, you can configure the relevant options. Below, we create a simple line plot.

<LoopedVideo src={require('../assets/tutorials/createlineplot.mp4')} />

 -->

### Export data to popular formats

It's easy to export your data out of Deephaven to popular open formats.

To export our final, joined table to a CSV file, simply use the [`writeCsv`](../reference/data-import-export/CSV/writeCsv.md) method with table name and the location to which you want to save the file. See managing [Docker volumes](../conceptual/docker-data-volumes.md) for more information on how to save files to your local machine.

```groovy test-set=1
CsvTools.writeCsv(timeSeriesJoinSelf, "/data/timeSeriesJoinSelf.csv")
```

If the table is dynamically updating, Deephaven will automatically snapshot the data before writing it to the file.

Similarly, for Parquet:

```groovy test-set=1
import io.deephaven.parquet.table.ParquetTools

ParquetTools.writeTable(timeSeriesJoinSelf, new File("/data/timeSeriesJoinSelf.parquet"), ParquetTools.GZIP)
```

## What to do next

Now that you've imported data, created tables, and manipulated static and real-time data, take a look at our full set of how-to guides. They cover a wide range of topics, from working with the UI to writing Python functions.

- [Create and organize notebooks using the File Explorer](../how-to-guides/user-interface/file-explorer.md)
- [Create plots without writing queries using the Chart Builder](../how-to-guides/user-interface/chart-builder.md)
- [Filter your data without writing queries](../how-to-guides/user-interface/filters.md)
- [Manipulate data using the column header menu and table options menu](../how-to-guides/user-interface/work-with-columns.md)
- [Import CSV files](../how-to-guides/csv-import.md)
- [Write and read Parquet files](../how-to-guides/parquet-single.md)
- [Connect to a Kafka stream](../how-to-guides/data-import-export/kafka-stream.md)
- [Perform combined aggregations](../how-to-guides/combined-aggregations.md)
- [Group data](../how-to-guides/grouping-data.md)
- [Join two tables](../how-to-guides/joins-overview.md)
- [Select, view, and update data](../how-to-guides/use-select-view-update.md)
- [Use filters](../how-to-guides/use-filters.md)
