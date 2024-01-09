---
id: quickstart
title: Deephaven Community Core Quickstart
sidebar_label: Quickstart
---

## 1. Install with one command

Install and launch Deephaven via [Docker](https://docs.docker.com/get-docker/) with a one-line command:

```sh
docker run --rm --name deephaven -p 10000:10000 --env START_OPTS=-Dauthentication.psk=YOUR_PASSWORD_HERE ghcr.io/deephaven/server:latest
```

For security it is important to **replace "YOUR_PASSWORD_HERE" with a more secure passkey**. The above command requires [Docker](https://www.docker.com/products/docker-desktop/) to already be installed. For advanced installation options, see our [install guide for Docker](./docker-install.md) or our [install guide for pip](./pip-install.md)

## 2. Access the Deephaven Community front-end UI

Now, navigate to [http://localhost:10000/](http://localhost:10000/) and enter the password you set above in the token field. You're up and running! Now what?

![img](../assets/tutorials/deephaven_launch.png)

## 3. Work with live and batch data

Deephaven empowers you to work with both batch and streaming data using the same methods.

It supports ingesting data from [CSVs](../how-to-guides/data-import-export/csv-import.md), [Parquet files](../how-to-guides/data-import-export/parquet-single.md), and [Kafka streams](../how-to-guides/data-import-export/kafka-stream.md).

### Access data from a CSV

Run the commmand below inside a Deephaven console for an example of ingesting a million-row CSV of crypto trades. All you need is a stable URL for the data.

```python test-set=1 order=crypto_from_csv
from deephaven import read_csv

crypto_from_csv = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/CryptoCurrencyHistory/CSV/CryptoTrades_20210922.csv")
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

```python test-set=1 order=null ticking-table
from deephaven import TableReplayer, read_csv
from deephaven import time as dhtu

fake_crypto_data = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/CryptoCurrencyHistory/CSV/FakeCryptoTrades_20230209.csv")

start_time = dhtu.to_j_instant("2023-02-09T12:09:18 ET")
end_time = dhtu.to_j_instant("2023-02-09T12:58:09 ET")

replayer = TableReplayer(start_time, end_time)

crypto_streaming = replayer.add_table(fake_crypto_data, "Timestamp")

replayer.start()
```

It’s nice to watch new data hit the screen. Let's [reverse](../reference/table-operations/sort/reverse.md) the table so the newest trades appear at the top.

```python test-set=1  order=null ticking-table
crypto_streaming_2 = crypto_streaming.reverse()
```

![img](../assets/tutorials/kafkastreamreverse.gif)

:::tip

Many table operations can also be done from the UI, for example right-click on a column header in the UI and choose **Reverse Table**.

:::

Now that you have a few tables, the next section will introduce adding new columns to them and merging.

### Create columns and merge tables

Let's examine the data a bit programmatically. Use [`count_by`](../reference/table-operations/group-and-aggregate/countBy.md) to see the row-count of the tables, respectively.

Table operations, methods, and other capabilities of the Deephaven table API **are used identically for updating (streaming) tables and static ones!**

This simple example illustrates this superpower:

```python test-set=1 order=null ticking-table
row_count_from_csv = crypto_from_csv.count_by(col="Row_Count").update_view(formulas=["Source = `CSV`"])
row_count_streaming = crypto_streaming.count_by(col="Row_Count").update_view(formulas=["Source = `Streaming`"])
```

<LoopedVideo src={require('../assets/tutorials/rowcounts.mp4')} />

You can eyeball the respective row counts easily by [merging](../reference/table-operations/merge/merge.md) the tables. In the future, if you need to [merge](../reference/table-operations/merge/merge.md) then [sort](../reference/table-operations/sort/sort.md) a table, we recommend using [`merge_sorted`](../reference/table-operations/merge/merge-sorted.md), as it is more efficient.

```python test-set=1 order=null
from deephaven import merge

row_count_compare = merge([row_count_from_csv, row_count_streaming])
```

![img](../assets/tutorials/row_count_compare.png)

Explore the schema and other metadata using [`meta_table`](../reference/table-operations/metadata/meta_table.md).

```python test-set=1 order=meta_from_csv,meta_streaming
meta_from_csv = crypto_from_csv.meta_table.update_view(formulas=["Source = `CSV`"]).move_columns_up(cols=["Source"])
meta_streaming = crypto_streaming.meta_table.update_view(formulas=["Source = `Streaming`"]).move_columns_up(cols=["Source", "Name"])
```

Let's create one table of crypto data that has both updating and static data. The last line removes the legacy static table.

```python test-set=1  order=null ticking-table
crypto_main = merge([crypto_from_csv, crypto_streaming_2])\
    .sort_descending(order_by=["Timestamp"])
crypto_from_csv = None
```

<LoopedVideo src={require('../assets/tutorials/crypto_main.mp4')} />

In the next section, you’ll learn about adding new columns to support calculations and logic, and doing aggregations.

### Manipulate and aggregate data

It's likely you've figured out a few of Deephaven’s fundamentals:

- You name tables and operate on them. Everything in Deephaven is a table. Streams are updating tables. Batches are static ones. You don't have to track this.
- You apply methods to these tables and can be blind about whether the data is updating or not.
- You can refer to other named tables, and data simply flows from tables to its dependents. You may know this as an [acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph). See our concept guide on the [table update model](../conceptual/table-update-model.md) if you're interested in what's under-the-hood.
- There is no optimizer to wrestle with. You’ll appreciate this once you tackle complex use cases or need to bring your Python, Java, or wrapped C++ code to the data.

Aggregations are an important use case for streaming data. (And static, too.)
Doing a [single, dedicated aggregation](../how-to-guides/dedicated-aggregations.md), like the [`sum_by`](../reference/table-operations/group-and-aggregate/sumBy.md) below, follows a pattern similar to the [`count_by`](../reference/table-operations/group-and-aggregate/countBy.md) you did earlier.

```python test-set=1  order=null ticking-table
crypto_sum_by = crypto_main.view(formulas=["Instrument", "Exchange", "Trade_Count = 1", "Total_Base_Value = Price * Size"])\
    .sum_by(by=["Instrument", "Exchange"])\
    .sort_descending(order_by=["Trade_Count"])
```

<LoopedVideo src={require('../assets/tutorials/cryptosumby.mp4')} />

:::tip

You can also add columns with **Custom Columns** in the Table Options menu in the web UI.

:::

If your use case is well served by adding columns in a formulaic, on-demand fashion (instead of writing results to memory), use [`update_view`](../reference/table-operations/select/update-view.md).

Binning data is fundamental and is intended to be easy via [`upperBin`](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#upperBin(java.time.ZonedDateTime,long)>) and [`lowerBin`](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#upperBin(java.time.ZonedDateTime,long)>). This is heavily used in profiling and sampling data.

The query below reuses the same table name (`crypto_main`). That’s just fine. Then, it does an aggregation by 5-second bins.

```python test-set=1  order=null ticking-table
crypto_main = crypto_main.update_view(formulas=["Value_Base_Ccy = (Price * Size)",\
    "TimeBin = upperBin(Timestamp, 2 * SECOND)"])

crypto_5sec_agg = crypto_main.view(["TimeBin", "Instrument", "Size"])\
    .sum_by(["TimeBin", "Instrument"])\
    .sort_descending(["TimeBin", "Instrument"])
```

<LoopedVideo src={require('../assets/tutorials/crypto_5secbins.mp4')} />

View distinct values using [`select_distinct`](../reference/table-operations/select/select-distinct.md).

```python test-set=1  order=null ticking-table
# 1 column
distinct_instruments = crypto_main.select_distinct(formulas=["Instrument"]).sort(order_by=["Instrument"])
# 2 columns
instrument_exchange = crypto_main.select_distinct(formulas=["Exchange", "Instrument"]).sort(order_by=["Exchange", "Instrument"])
# count_by looks similar
count_by = crypto_main.count_by("Trade_Count", by=["Exchange", "Instrument"]).sort(order_by=["Exchange", "Instrument"])
```

![img](../assets/tutorials/cryptodistinct.png)

:::tip

You can also accomplish this with **Select Distinct Values** in the Table Options menu in the web UI.
:::

Performing [multiple aggregations](../how-to-guides/combined-aggregations.md) simultaneously may prove logical and helpful to performance.

Let's define an aggregation function to be used later. The function will return an aggregation result based on the table and aggregation-keys you pass in.

```python test-set=1
from deephaven import agg

def aggregate_crypto(table, agg_keys):
    agg_list = [
        agg.first(cols=["Last_Timestamp = Timestamp"]),\
        agg.sum_(cols=["Total_Value_Traded = Value_Base_Ccy", "Total_Size = Size"]),\
        agg.count_(col="Trade_Count"),\
        agg.weighted_avg(wcol="Size", cols=["Wtd_Avg_Price = Price"]),\
        agg.min_(cols=["Low_Price = Price"]),\
        agg.max_(cols=["Hi_Price = Price"])
    ]
    return table.agg_by(agg_list, agg_keys)
```

Below, you equip the `aggregate_crypto` with different numbers and versions of keys. The last table has some extra polish to make the resulting table more valuable to the eye.

```python test-set=1  order=null
# 1 key
agg_1_key = aggregate_crypto(crypto_main, ["TimeBin"])

# 2 keys
agg_2_keys = aggregate_crypto(crypto_main, ["Exchange", "Instrument"])\
    .sort(order_by=["Exchange", "Instrument"])

#3 keys
agg_3_keys = aggregate_crypto(crypto_main, ["Exchange", "Instrument", "TimeBin"])\
    .sort_descending(order_by=["Last_Timestamp"])\
    .update_view(formulas=["Total_Value_Traded = (int)Total_Value_Traded", "Total_Size = (long)Total_Size"])\
    .move_columns_up(cols=["Instrument", "Trade_Count", "Total_Value_Traded"])
```

![img](../assets/tutorials/aggkeys.png)

### Filter, join, and as-of-join

Deephaven [filtering](../how-to-guides/use-filters.md) is accomplished by applying [`where`](../reference/table-operations/filter/where.md) operations. The engine supports a large array of match, conditional, and combination filters.

These four scripts are simple examples.

```python test-set=1  order=null ticking-table
filter_btc = crypto_main.where(filters=["Instrument = `BTC/USD`"])
filter_eth = crypto_main.where(filters=["Instrument = `ETH/USD`"])
filter_eth_and_price = crypto_main.where(filters=["Instrument = `ETH/USD`", "Size > 1"])
filter_eth_and_exchange = crypto_main.where(filters=["Instrument = `ETH/USD`", "Exchange.startsWith(`bi`) = true"])
```

![img](../assets/tutorials/cryptofilters.png)

Use [`where_in`](../reference/table-operations/filter/where-in.md) to filter one table based on the contents of another "filter table". If the filter table updates, the filter applied to the other changes automatically.

In the third line below, you’ll filter the table `crypto_main` based on the `Instrument` values of the table `row_1`.

```python test-set=1  order=null ticking-table
agg_by_instrument = aggregate_crypto(crypto_main, ["Instrument"])
row_1 = agg_by_instrument.head(1)
filter_where_in = crypto_main.where_in(filter_table=row_1, cols=["Instrument"])
```

<LoopedVideo src={require('../assets/tutorials/cryptoinstruments.mp4')} />

If you prefer, you can set variables using records from tables.

These lines, in combination, will print the record in the first index position (2nd row) of the `Instrument`column in the `agg_by_instrument` table to your console.

```python test-set=1 order=null
from deephaven.numpy import to_numpy

# i2 = to_numpy(agg_by_instrument, "Instrument")[0][0]

instrument_2nd = agg_by_instrument.j_object.getColumnSource("Instrument").get(1)

# i3 = agg_by_instrument.j_object.getColumnSource("Instrument")

print(instrument_2nd)
```

That variable can be used for filtering.

```python test-set=1 order=null
filter_variable = crypto_main.where(filters=["Instrument = instrument_2nd"])
```

Deephaven joins are first class, supporting joining real-time, updating tables with each other (and with static tables) without any need for windowing.

Our guide, [Choose a join method](../conceptual/choose-joins.md), offers guidance on how to choose the best method for your use case.

Generally, joins fall into one of two categories:

- Time series joins: [`aj` (as-of-join)](../reference/table-operations/join/aj.md), [`raj` (reverse-as-of-join)](../reference/table-operations/join/raj.md), and [`range_join`](../reference/table-operations/join/range-join.md).
- Relational joins: [`natural_join`](../reference/table-operations/join/natural-join.md), [`join`](../reference/table-operations/join/join.md), [`exact_join`](../reference/table-operations/join/exact-join.md), [`full_outer_join`](../reference/table-operations/join/full-outer-join.md), and [`left_outer_join`](../reference/table-operations/join/left-outer-join.md).

Use [`natural_join`](../reference/table-operations/join/natural-join.md) when you expect no more than one match in the right table per key, and are happy to receive null records as part of the join process.

```python test-set=1  order=null ticking-table
# filter the aggregation tables to create a table for BTC and ETH
trade_count_btc = agg_2_keys.where(filters=["Instrument = `BTC/USD`"]).view(formulas=["Exchange", "Trade_Count"])
trade_count_eth = agg_2_keys.where(filters=["Instrument = `ETH/USD`"]).view(formulas=["Exchange", "Trade_Count"])

# natural_join() using "Exchange" as the join-key
# pull column "Trade_Count" from the *_eth table, renaming it "Trade_Count_Eth"
join_2_tables = trade_count_btc.rename_columns(cols=["Trade_Count_Btc = Trade_Count"])\
    .natural_join(table=trade_count_eth, on=["Exchange"], joins=["Trade_Count_Eth = Trade_Count"])
```

![img](../assets/tutorials/cryptojoins.png)

Though Deephaven excels with relational joins, its ordering capabilities make it an excellent time series database.

Time series joins, or “as-of joins”, take a timestamp key from the left table and do a binary search in the right table (respecting other join keys) seeking an exact timestamp-nanosecond match. If no match exists, the timestamp just prior to the join-timestamp establishes the match target.

It is important to note:

- The right table needs to be sorted.
- Numerical fields other than [date-times](../reference/query-language/types/date-time.md) can also be used for the final key in [as-of joins](../reference/table-operations/join/aj.md).
- [Reverse-as-of join](../reference/table-operations/join/raj.md) is similar, but uses the record just after the target timestamp if no exact match is found.
- One can syntactically use `<` or `>` (instead of `=`) in the query to eliminate the exact match as the best candidate.

```python test-set=1  order=null ticking-table
# filter the original crypto_main table to get raw BTC and ETH trade records
crypto_btc = crypto_main.where(filters=["Instrument = `BTC/USD`"])
crypto_eth = crypto_main.where(filters=["Instrument = `ETH/USD`"])

# for each record of the right table
time_series_join = crypto_btc.view(formulas=["Timestamp", "Price"])\
    .aj(table=crypto_eth, on=["Timestamp"], joins=["Eth_Time = Timestamp", "Price_Eth = Price"])\
    .rename_columns(cols=["Time_Btc = Timestamp", "Price_Btc = Price"])
```

<LoopedVideo src={require('../assets/tutorials/cryptojoins2.mp4')} />

The introduction of `Exchange` as a join-key in front of Timestamp in the script below directs the engine to do the [as-of-join](../reference/table-operations/join/aj.md) after first doing an exact match on `Exchange` between the left and right tables.

```python test-set=1  order=null ticking-table
time_series_join_2_keys = crypto_btc.view(formulas=["Exchange", "Time_Btc = Timestamp", "Price_Btc = Price"])\
    .aj(table=crypto_eth, on=["Exchange", "Time_Btc >= Timestamp"], joins=["Eth_Time = Timestamp", "Eth_Price = Price"])
```

![img](../assets/tutorials/cryptojoins3.png)

People often use [`aj`](../reference/table-operations/join/aj.md) to join records that are shifted by a time phase.

```python test-set=1  order=null ticking-table
# Create a column to represent time 1 minute before the "Timestamp".
crypto_btc_simple = crypto_btc.view(formulas=["Time_Trade = Timestamp", "Time_less_1min = Time_Trade - MINUTE", "Price_Now = Price"])

# As-of join the table on itself.
time_series_join_self = crypto_btc_simple.aj(table=crypto_btc_simple, on=["Time_Trade >= Time_less_1min"], joins=["Price_1_min_prev = Price_Now"])\
    .update_view(formulas=["Price_Diff = Price_Now - Price_1_min_prev"])
```

<LoopedVideo src={require('../assets/tutorials/cryptojoins4.mp4')} />

### Plot data via query or the UI

Deephaven has a rich plotting API that support _updating, real-time plots_. It can be called programmatically or via JS integrations in the web UI. It integrates with the open-source [plotly library](https://plotly.com/python/). The suite of plots will continue to grow, with the Deephaven community setting the priorities.

Try these basic examples:

```python test-set=1 order=crypto_btc_2021,simple_line_plot,line_plot,scatter_plot
from deephaven.plot.figure import Figure
#from deephaven import time as dhtu

crypto_btc_2021 = crypto_btc.update_view(["Year = (int)year(Timestamp, timeZone(`ET`))"]).where(["Year == 2021"]).drop_columns(["Year"])

# simple line plot
simple_line_plot = Figure().plot_xy(series_name="BTC Price", t=crypto_btc_2021.tail(2_000), x="Timestamp", y="Price").show()

# two series, two axes
line_plot = Figure().plot_xy(series_name="BTC Size", t=crypto_btc_2021.tail(2_000), x="Timestamp", y="Size").line(color="HONEYDEW")\
    .x_twin()\
    .plot_xy(series_name="BTC Price", t=crypto_btc_2021.tail(2_000), x="Timestamp", y="Price").line(color="RED")\
    .show()

#scatter plot
scatter_plot = Figure().plot_xy(series_name="ETH vs. BTC", t=time_series_join.reverse().tail(100), x="Price_Btc", y="Price_Eth")\
    .axes(plot_style="scatter")\
    .show()
```

You can also make simple plots like these using the [Chart Builder](../how-to-guides/user-interface/chart-builder.md) in the UI. Open the **Table Options** menu at the table's right. After choosing a chart type, you can configure the relevant options. Below, we create a similar plot to `simple_line_plot` in the query above.

<LoopedVideo src={require('../assets/tutorials/createlineplot.mp4')} />

### Export data to popular formats

It's easy to export your data out of Deephaven to popular open formats.

To export our final, joined table to a CSV file, simply use the [`write_csv`](../reference/data-import-export/CSV/readCsv.md) method with table name and the location to which you want to save the file. See managing [Docker volumes](../conceptual/docker-data-volumes.md) for more information on how to save files to your local machine.

```python test-set=1
from deephaven import write_csv

write_csv(time_series_join_self, "/data/time_series_join_self.csv")
```

If the table is dynamically updating, Deephaven will automatically snapshot the data before writing it to the file.

Similarly, for Parquet:

```python test-set=1
from deephaven.parquet import write

write(time_series_join_self, "/data/time_series_join_self.parquet")
```

To create a static [pandas DataFrame](/community/solutions/tech/pandas/), use the [`to_pandas`](../how-to-guides/use-pandas.md) method.

```python test-set=1
from deephaven import pandas as dhpd

data_frame = dhpd.to_pandas(time_series_join_self)

print(data_frame)
```

## What to do next

Now that you've imported data, created tables, and manipulated static and real-time data, take a look at our full set of how-to guides. They cover a wide range of topics, from working with the UI to writing Python functions.

- [Create and organize notebooks using the File Explorer](/core/docs/how-to-guides/user-interface/file-explorer/)
- [Create plots without writing queries using the Chart Builder](/core/docs/how-to-guides/user-interface/chart-builder/)
- [Filter your data without writing queries](/core/docs/how-to-guides/user-interface/filters/)
- [Manipulate data using the column header menu and table options menu](/core/docs/how-to-guides/user-interface/work-with-columns/)
- [Import CSV files](../how-to-guides/data-import-export/csv-import.md)
- [Write and read Parquet files](../how-to-guides/data-import-export/parquet-single.md)
- [Connect to a Kafka stream](../how-to-guides/data-import-export/kafka-stream.md)
- [Perform combined aggregations](../how-to-guides/combined-aggregations.md)
- [Group data](../how-to-guides/grouping-data.md)
- [Join two tables](../how-to-guides/join-two-tables.md)
- [Select, view, and update data](../how-to-guides/use-select-view-update.md)
- [Use filters](../how-to-guides/use-filters.md)
- [Write a Python function](../how-to-guides/simple-python-function.md)
