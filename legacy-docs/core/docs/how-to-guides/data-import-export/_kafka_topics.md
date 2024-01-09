---
id: kafka-topics
title: How to consume streaming data from Kafka topics
sidebar_label: Consume streaming data from Kafka topics
---

This guide shows you how to connect to one or more Kafka topics to stream data into Deephaven. It uses an example
producer, which connects to a DevExperts DXFeed demo feed and publishes its quote and trade events as JSON messages
through Kafka.

The demo feed contains a handful of symbols with 15 minute delayed publication during trading hours. In order to provide
events during non-trading hours, the demo feed will replay random old events every few seconds.

The Kafka producer used in this guide creates `quotes` and `trades` topics using the local system as the broker.

## Connect to Kafka broker topics

We can use the [`consume`](../../reference/data-import-export/Kafka/consume.md) method to connect to the broker and
the topics and receive events as they are published.

## Use the sample Kafka producer container

A Docker container containing a Confluent Kafka Community Edition broker and the DXFeed Kafka producer is available in
the [Deephaven-Examples Repository](https://github.com/deephaven-examples/kafka-sample-producer)
as: `kafka_sample_producer.tar.gz`.

To clone this repository to follow along run:

```shell
git clone https://github.com/deephaven-examples/kafka-sample-producer.git
cd kafka-sample-producer
```

To load the container, inside the repository directory run:

```shell
docker load < kafka_sample_producer.tar.gz
```

Next, one needs to run the broker. To do this you need to list your IP address. On a Mac the command is:

```shell
ipconfig getifaddr en0
```

To run it, execute:

```shell
docker run -e HOSTIP=<IP_address> -dp 9092:9092 ghcr.io/kafka/sample_producer:latest
```

- `IP_address` is an address of your Docker host that is reachable from your Deephaven Community Core container.
- `9092:9092` exposes port 9092 (the default port for Kafka) from the sample producer container to the host's IP.
- `-d` indicates to run disconnected, rather than echoing container output back to the Docker host's console.

In the examples above, this container was started with `HOSTIP=192.168.86.155`, and the queries were then able to
connect to it to obtain the `quotes` and `trades` topics.

### Create the `quotes` table

The following query creates the `quotes` table. Note that you need to change `<IP_address>` to match your own IP
address that you have the producer running from before:

```python skip-test
from deephaven import kafka_consumer as kc
from deephaven.stream.kafka.consumer import TableType, KeyValueSpec
import deephaven.dtypes as dht

quotes = kc.consume({ 'bootstrap.servers' : '<IP_address>:9092' },
                    'quotes',
                    key_spec=KeyValueSpec.IGNORE,
                    value_spec=kc.json_spec([('Sym', dht.string),
                                ('AskSize',  dht.int_),
                                ('AskPrice',  dht.double),
                                ('BidSize',  dht.int_),
                                ('BidPrice',  dht.double),
                                ('AskExchange', dht.string),
                                ('BidExchange', dht.string),
                                ('AskTime', dht.long),
                                ('BidTime', dht.long)]),
                    table_type=TableType.append()) \
    .update_view(formulas=["AskTime = millisToTime(AskTime)"]) \
    .update_view(formulas=["BidTime = millisToTime(BidTime)"])
```

Let's walk through the query step-by-step:

- The [`deephaven.stream.kafka.consumer`](https://deephaven.io/core/pydoc/code/deephaven.stream.kafka.consumer.html)
  module provides the [`consume`](../../reference/data-import-export/Kafka/consume.md) method, which is used to
  connect to a Kafka broker and receive events.

- The `dtypes` module, imported as `dht`, contains data type definitions to be used when adding columns/fields for
  parsing from JSON messages to a Deephaven table. Note the trailing underscore, which is a required part of the name
  for the int and long types used here.

- `quotes` is the name of the table to create from
  the [`consume`](../../reference/data-import-export/Kafka/consume.md) call.

- The [`consume`](../../reference/data-import-export/Kafka/consume.md) call includes the following:

  - The first argument is a dictionary which can contain Kafka client properties. The one property which we need to
    set is the `bootstrap.servers` list (the broker to connect to), including its name, or IP address, and port. 9092
    is the default port for Kafka.
  - The next argument is the name of the topic to connect to (`quotes`).
  - The next two arguments are the key/value pair to parse from Kafka messages. In this case, we are going to accept
    all keys (`KeyValueSpec.IGNORE`), and parse the values as JSON (`kafka_consumer.json_spec`), with the array of
    the `kafka_consumer.json` argument being the list of columns/fields and their data types.

- The last two statements ([`.update_view`](../../reference/table-operations/select/update-view.md)) operate on
  the `quotes` table to convert epoch milliseconds Ask and Bid time values to Deephaven `DateTime` values.

The result is a `quotes` table that populates as new events arrive:

![img](../../assets/how-to/kafka2.png)

New messages are added to the bottom of the table, by default, so you may want
to [`.reverse()`](../../reference/table-operations/sort/reverse.md) it,
or [sort in descending order](../../reference/table-operations/sort/sort-descending.md) by `KafkaTimestamp`, in order to
see new events tick in.

### Create the `trades` table

A similar query gets the `trades` topic data from Kafka. Note that you need to change `<IP_address>` to match your own
IP address that you have the producer running from before:

```python skip-test
from deephaven import kafka_consumer as kc
from deephaven.stream.kafka.consumer import TableType, KeyValueSpec
import deephaven.dtypes as dht

trades = kc.consume({ 'bootstrap.servers' : '<IP_address>:9092' },
                    'trades',
                    key_spec=KeyValueSpec.IGNORE,
                    value_spec=kc.json_spec([('Sym', dht.string),
                                ('Size',  dht.int_),
                                ('Price',  dht.double),
                                ('DayVolume',  dht.int_),
                                ('Exchange', dht.string),
                                ('Time', dht.long)]),
                    table_type=TableType.append()) \
    .update_view(formulas=["Time = millisToTime(Time)"])
```

![img](../../assets/how-to/kafka3.png)

### Perform aggregations

We can then write other queries which combine and/or aggregate data from these streams. This query uses
an [as-of join](../../reference/table-operations/join/aj.md) to correlate trade events with the most recent bid for the
same symbol.

```python skip-test
related_quotes = trades.aj(table=quotes, on=["Sym, Time = BidTime"], joins=["BidTime, BidPrice, BidSize, BidExchange"])
```

![img](../../assets/how-to/kafka4.png)

The next query calculates the volume average price for each symbol on a per-minute basis, using the start of the minute
as the binning value.

```python skip-test
from deephaven import agg

agg_list = [
    agg.avg(cols=["AvgPrice = Price"]),\
    agg.sum_("Volume = Size"),\
    agg.sum_("TotalGross = GrossPrice")
]

vwap = trades.view(formulas=["Sym", "Size", "Price", "TimeBin = lowerBin(Time, MINUTE)","GrossPrice = Price*Size"])\
    .agg_by(agg_list, by=["Sym", "TimeBin"])\
    .update_view(formulas=["VWAP = TotalGross/Volume"])
```

![img](../../assets/how-to/kafka5.png)

### Create a simple plot

Now, we'll create the `aapl_vwap` table to limit the data to AAPL events, then plot VWAP vs actual price for each trade
event. The query below depends on the `vwap` table created in the previous example:

```python skip-test
from deephaven.plot.figure import Figure

aapl_vwap = vwap.where(filters=["Sym = `AAPL`"])

p = Figure()\
    .plot_xy(series_name="VWAP", t=aapl_vwap, x="TimeBin", y="VWAP")\
    .plot_xy(series_name="Price", t=trades.where(filters=["Sym = `AAPL`"], x="Time", y="Price"))\
    .show()
```

![img](../../assets/how-to/kafka6.png)

:::note

The `related_quotes` and `vwap` tables do not work well outside of trading hours, because the before/after hours events
lack real timestamps.

:::

## Related documentation

- [How to connect to a Kafka stream](./kafka-stream.md)
- [Kafka basic terminology](../../conceptual/kafka-basic-terms.md)
- [consume](../../reference/data-import-export/Kafka/consume.md)
