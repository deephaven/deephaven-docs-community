---
id: kafka-stream
title: How to connect to a Kafka stream
sidebar_label: Connect to a Kafka stream
---

Kafka is a distributed event streaming platform that enables you to read, write, store, and process events, also called records.

Kafka topics take on many forms, such as raw input, [JSON](https://www.json.org/json-en.html), [AVRO](https://avro.apache.org), or [Protobuf](https://protobuf.dev/) formats. This guide shows you how to import each of these formats as Deephaven tables.

Please see our concept guide, [Kafka basic terminology](../../conceptual/kafka-basic-terms.md), for a detailed discussion of Kafka topics and supported formats. See the [Apache Kafka documentation](https://kafka.apache.org/22/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html) for full details on how to use Kafka.

## Kafka in Deephaven

### Standard data fields

Kafka has the standard data fields of `partition`, `offset`, and `timestamp`. Each of these fields becomes a column in the new table that stores the Kafka stream. The column names can be changed, but the type of column is set. The standard names and types for these values are:

- `KafkaPartition`: int
- `KafkaOffset`: long
- `KafkaTimestamp`: [DateTime](../../reference/query-language/types/date-time.md)

When reading a Kafka topic, you can select which partitions to listen to. By default, all partitions are read. Topics can also be read from the beginning, from the latest offset, or from the first unprocessed offset. By default, all partitions are read from the latest offset.

:::note

The Kafka infrastructure can retain old messages for a maximum given age or retain the last message for individual keys.

:::

While these three fields are traditionally included in the new table, you can choose to ignore them, such as when there is only one partition.

### Key and value

The actual data of the Kafka stream are stored in the `KafkaKey` and `KafkaValue` columns. This is the information that is logged onto the partition with an offset at a certain time. For example, a list of Kafka messages might have a key of the user and a value of the message, and is logged at a certain time.

`KafkaKey` and `KafkaValue` are similar in that they can be nearly any sequence of bytes. The primary difference is that the key is used to create a hash that will facilitate load balancing. By default, each key and value are stored with column names of either `KafkaKey` or `KafkaValue`, and String type.

The `KafkaKey` and `KafkaValue` attributes can be:

- simple type
- JSON encoded
- Avro encoded
- ProtoBuf encoded
- ignored (cannot ignore both key and value)

### Table types

Deephaven Kafka tables can be append-only, blink, or ring.

- [Append-only](../../conceptual/table-types.md#append-only) tables add one row for every message ingested - thus, table size and memory consumption can grow rapidly. Set this value with `table_type = TableType.append()`.
- [Blink tables](../../conceptual/table-types.md#blink) only keep the set of rows received during the last update cycle. This forms the basis for more advanced use cases when used in combination with stateful table aggregations like [`lastBy`](../../reference/table-operations/group-and-aggregate/lastBy.md). For blink tables without any downstream table operations, aggregations, or listeners, the new messages will appear as rows in the table for one UGP cycle, then disappear on the next UGP cycle. A blink table is the default. You can set this value to `table_type = TableType.blink()` to be explicit, but this is not required.
- [Ring tables](../../conceptual/table-types.md#ring) retain the last `N` added rows for each update of the UGP cycle. If more than `N` rows are added with an update, the last `N` are stored in the ring table. Set this value with `table_type = TableType.ring(N)`.

## Launching Kafka with Deephaven

Deephaven has an official [docker-compose file](https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples-redpanda/docker-compose.yml) that contains the Deephaven images along with images from [Redpanda](https://github.com/redpanda-data/redpanda). Redpanda allows us to input data directly into a Kafka stream from the terminal. This is just one of the supported Kafka-compatible event streaming platforms. Many more are available.

:::important

The `docker-compose.yml` file linked above uses Deephaven's Python server image. To change this to Groovy, change `server` to `server-slim` on line 5 of the file.

:::

Save this locally as a `docker-compose.yml` file, and launch with `docker compose up`.

## Create a Deephaven table that listens to a Kafka topic

In this example, we consume a Kafka topic (`test.topic`) as a Deephaven table. The Kafka topic is populated by commands entered into the terminal.

For demonstration purposes, we will be using an append-only table and ignoring the Kafka key.

```groovy docker-config=kafka test-set=2 order=resultAppend
import io.deephaven.kafka.KafkaTools

kafkaProps = new Properties()
kafkaProps.put('bootstrap.servers', 'redpanda:9092')

resultAppend = KafkaTools.consumeToTable(
    kafkaProps,
    'test.topic',
    KafkaTools.ALL_PARTITIONS,
    KafkaTools.ALL_PARTITIONS_DONT_SEEK,
    KafkaTools.Consume.IGNORE,
    KafkaTools.Consume.simpleSpec('Command', java.lang.String),
    KafkaTools.TableType.append()
)
```

In this example, [`consumeToTable`](../../reference/data-import-export/Kafka/consumeToTable.md) creates a Deephaven table from a Kafka topic. Here, `{'bootstrap.servers': 'redpanda:9092'}` is a dictionary describing how the Kafka infrastructure is configured. `bootstrap.servers` provides the initial hosts that a Kafka client uses to connect. In this case, `bootstrap.servers` is set to `redpanda:9092`.

`table_type` is set to `kc.TableType.append()` to create an append-only table, and `key_spec` is set to `kc.KeyValueSpec.IGNORE` to ignore the Kafka key.

The `result` table is now subscribed to all partitions in the `test.topic` topic. When data is sent to the `test.topic` topic, it will appear in the table.

### Input Kafka data for testing

For this example, information is entered into the Kafka topic via the command line. To do this, run:

```sh
docker compose exec redpanda rpk topic produce test.topic
```

This will wait for and send any input to the `test.topic` topic. Enter the information and use the keyboard shortcut **Ctrl + D** to send.

Once sent, that information will automatically appear in your Deephaven table.

<LoopedVideo src={require('../../assets/how-to/kafka1.mp4')} />

### Ring and blink tables

The following example shows how to create [ring and blink tables](#table-types) to read from the `test.topic` topic:

```groovy docker-config=kafka test-set=2 order=resultRing,resultBlink
import io.deephaven.kafka.KafkaTools

kafkaProps = new Properties()
kafkaProps.put('bootstrap.servers', 'redpanda:9092')

resultRing = KafkaTools.consumeToTable(
    kafkaProps,
    'test.topic',
    KafkaTools.ALL_PARTITIONS,
    KafkaTools.ALL_PARTITIONS_DONT_SEEK,
    KafkaTools.Consume.IGNORE,
    KafkaTools.Consume.simpleSpec('Command', java.lang.String),
    KafkaTools.TableType.ring(3)
)

resultBlink = KafkaTools.consumeToTable(
    kafkaProps,
    'test.topic',
    KafkaTools.ALL_PARTITIONS,
    KafkaTools.ALL_PARTITIONS_DONT_SEEK,
    KafkaTools.Consume.IGNORE,
    KafkaTools.Consume.simpleSpec('Command', java.lang.String),
    KafkaTools.TableType.blink()
)
```

Let's run a few more `docker compose exec redpanda rpk topic produce test.topic` commands to input additional data into the Kafka stream. As you can see, the `resultAppend` table contains all of the data, the `resultRing` table contains the last three entries, and the `resultBlink` table only shows rows before the next table update cycle is executed.

Since the `resultBlink` table doesn't show the values in the topic, let's add a table to store the last value added to the `resultBlink` table.

```groovy docker-config=kafka test-set=2 order=lastBlink
lastBlink = resultBlink.lastBy()
```

## Import a Kafka stream with append

In this example, [`consumeToTable`](../../reference/data-import-export/Kafka/consumeToTable.md) reads the Kafka topic `share.price`. The specific key and value result in a table that appends new rows.

```groovy docker-config=kafka order=resultRing
import io.deephaven.kafka.KafkaTools

kafkaProps = new Properties()
kafkaProps.put('bootstrap.servers', 'redpanda:9092')

resultRing = KafkaTools.consumeToTable(
    kafkaProps,
    'share.price',
    KafkaTools.ALL_PARTITIONS,
    KafkaTools.ALL_PARTITIONS_DONT_SEEK,
    KafkaTools.Consume.simpleSpec('Symbol', java.lang.String),
    KafkaTools.Consume.simpleSpec('Price', double),
    KafkaTools.TableType.append()
)
```

Let's walk through this query, focusing on the new optional arguments we've set.

- `partitions` is set to `None`, which specifies that we want to listen to all partitions. This is the default behavior
  if `partitions` is not explicitly defined. To listen to specific partitions, we can define them as a list of
  integers (e.g., `partitions=[1, 3, 5]`).
- `offsets` is set to `ALL_PARTITIONS_DONT_SEEK`, which only listens to new messages produced after this call is
  processed.
- `key_spec` is set to `simple('Symbol')`, which instructs the consumer to expect messages with a Kafka `key` field, and
  creates a `Symbol` column of type String to store the information.
- `value_spec` is set to `simple('Price')`, which instructs the consumer to expect messages with a Kafka `value` field,
  and creates a `Price` column of type String to store the information.
- `table_type` is set to `append`, which creates an append-only table.

Now let's add some entries to our Kafka stream. Run `docker compose exec redpanda rpk topic produce share.price -f '%k%v\n` and enter as many key-value pairs as you want, separated by spaces and new lines:

```sh
AAPL 135.60
AAPL 135.99
AAPL 136.82
```

## Import a Kafka stream ignoring keys

In this example, [`consumeToTable`](../../reference/data-import-export/Kafka/consumeToTable.md) reads the Kafka topic `share.price` and ignores the partition and key values.

Run the same `docker compose exec redpanda rpk topic produce share.price -f '%k %v\n'` command from the previous section and enter the sample key-value pairs.

```groovy docker-config=kafka order=resultAppend
import io.deephaven.kafka.KafkaTools

kafkaProps = new Properties()
kafkaProps.put('bootstrap.servers', 'redpanda:9092')

resultAppend = KafkaTools.consumeToTable(
    kafkaProps,
    'share.price',
    KafkaTools.ALL_PARTITIONS,
    KafkaTools.ALL_PARTITIONS_DONT_SEEK,
    KafkaTools.Consume.IGNORE,
    KafkaTools.Consume.simpleSpec('Price', double),
    KafkaTools.TableType.append()
)
```

As you can see, the key column is not included in the output table.

## Read Kafka topic in JSON format

In this example, [`consumeToTable`](../../reference/data-import-export/Kafka/consumeToTable.md) reads the Kafka topic `orders` in [JSON](https://www.json.org/json-en.html) format.

```groovy skip-test
import io.deephaven.engine.table.ColumnDefinition
import io.deephaven.kafka.KafkaTools

kafkaProps = new Properties()
kafkaProps.put('bootstrap.servers', 'redpanda:9092')

symbolDef = ColumnDefinition.ofString('Symbol')
priceDef = ColumnDefinition.ofDouble('Price')
qtyDef = ColumnDefinition.ofInt('Qty')

ColumnDefinition[] colDefs = [symbolDef, priceDef, qtyDef]
mapping = ['symbol': 'Symbol', 'price': 'Price', 'qty': 'Qty']

spec = KafkaTools.Consume.jsonSpec(colDefs, mapping, null)

result = KafkaTools.consumeToTable(
    kafkaProps,
    'orders',
    KafkaTools.ALL_PARTITIONS,
    KafkaTools.ALL_PARTITIONS_DONT_SEEK,
    KafkaTools.Consume.IGNORE,
    spec,
    KafkaTooks.TableType.append()
)
```

Run `docker compose exec redpanda rpk topic produce orders -f "%v\n"` in your terminal and enter the following values:

```sh
{"symbol": "AAPL", "price": 135, "qty": 5}
{"symbol": "TSLA", "price": 730, "qty": 3}
```

In this query, the `valueSpec` argument uses [`jsonSpec`](<https://deephaven.io/core/javadoc/io/deephaven/kafka/KafkaTools.Consume.html#jsonSpec(io.deephaven.engine.table.ColumnDefinition[])>). A JSON parameterization is used for the `KafkaValue` field.

After this, we see an ordered list of Groovy strings specifying column definitions.

- The first element in each is a string for the column name in the result table.
- The second element in each is a string for the column data type in the result table.

Within the `valueSpec` argument, the keyword argument of `mapping` is given. This is a dictionary specifying a mapping from JSON field names to resulting table column names. Column names should be in the list provided in the first argument described above. The `mapping` dictionary may contain fewer entries than the total number of columns defined in the first argument.

In the example, the map entry `'price' : 'Price'` specifies the incoming messages are expected to contain a JSON field named `price`, whose value will be mapped to the `Price` column in the resulting table. The columns not mentioned are mapped from matching JSON fields.

If the `mapping` keyword argument is not provided, it is assumed that JSON field names and column names will match.

## Read Kafka topic in Avro format

In this example, [`consumeToTable`](../../reference/data-import-export/Kafka/consumeToTable.md) reads the Kafka topic `share.price` in [Avro](https://avro.apache.org/) format. This example uses an external schema definition registered in the deployment testing [Redpanda](https://vectorized.io/blog/schema_registry/) instance that can be seen below. A [Kafka Schema Registry](https://medium.com/slalom-technology/introduction-to-schema-registry-in-kafka-915ccf06b902) allows sharing and versioning of Kafka event schema definitions.

```groovy skip-test
import io.deephaven.engine.table.ColumnDefinition
import io.deephaven.kafka.KafkaTools

kafkaProps = new Properties()
kafkaProps.put('bootstrap.servers', 'redpanda:9092')
kafkaProps.put('schema.registry.url', 'http://redpanda:8081')

result = KafkaTools.consumeToTable(
    kafkaProps,
    'orders',
    KafkaTools.ALL_PARTITIONS,
    KafkaTools.ALL_PARTITIONS_DONT_SEEK,
    KafkaTools.Consume.IGNORE,
    KafkaTools.Consume.avroSpec('share.price.record', '1'),
    KafkaTools.TableType.append()
)
```

In this query, the first argument included an additional entry for `schema.registry.url` to specify the URL for a schema registry with a REST API compatible with [Confluent's schema registry specification](https://docs.confluent.io/platform/current/schema-registry/develop/api.html).

The `valueSpec` argument uses [`avroSpec`](<https://deephaven.io/core/javadoc/io/deephaven/kafka/KafkaTools.Consume.html#avroSpec(org.apache.avro.Schema)>), which specifies an Avro format for the Kafka `value` field.

The first positional argument in the [`avroSpec`](<https://deephaven.io/core/javadoc/io/deephaven/kafka/KafkaTools.Consume.html#avroSpec(org.apache.avro.Schema)>) call specifies the Avro schema to use. In this case, [`avroSpec`](<https://deephaven.io/core/javadoc/io/deephaven/kafka/KafkaTools.Consume.html#avroSpec(org.apache.avro.Schema)>) gets the schema named `share.price.record` from the schema registry. Alternatively, the first argument can be an `org.apache.avro.Schema` object obtained from [`getAvroSchema`](<https://deephaven.io/core/javadoc/io/deephaven/kafka/KafkaTools.html#getAvroSchema(java.lang.String)>).

Three optional keyword arguments are supported:

- `schema_version` specifies the version of the schema to get, for the given name, from the schema registry. If not
  specified, the default of `latest` is assumed. This will retrieve the latest available schema version.
- `mapping` expects a dictionary value, and if provided, specifies a name mapping for Avro field names to table column
  names. Any Avro field name not mentioned is mapped to a column of the same name.
- `mapping_only` expects a dictionary value, and if provided, specifies a name mapping for Avro field names to table
  column names. Any Avro field name not mentioned is omitted from the resulting table.
- When `mapping` and `mapping_only` are both omitted, all Avro schema fields are mapped to columns using the field name
  as column name.

## Read Kafka topic in Protobuf format

In this example, [`consumeToTable`](../../reference/data-import-export/Kafka/consumeToTable.md) reads the Kafka topic `share.price` in [protobuf](https://protobuf.dev/) format, Google’s open-source, language-neutral, cross-platform data format used to serialize structured data.

This example uses an external schema definition registered in the development testing [Redpanda](https://vectorized.io/blog/schema_registry/) instance that can be seen below.

```groovy skip-test
import io.deephaven.engine.table.ColumnDefinition
import io.deephaven.kafka.KafkaTools

kafkaProps = new Properties()
kafkaProps.put('bootstrap.servers', 'redpanda:9092')
kafkaProps.put('schema.registry.url', 'http://redpanda:8081')

result = KafkaTools.consumeToTable(
    kafkaProps,
    'orders',
    KafkaTools.ALL_PARTITIONS,
    KafkaTools.ALL_PARTITIONS_DONT_SEEK,
    KafkaTools.Consume.IGNORE,
    KafkaTools.Consume.protobufSpec('share.price.record', '1'),
    KafkaTools.TableType.append()
)
```

The `valueSpec` argument uses [`protobufSpec`](<https://deephaven.io/core/javadoc/io/deephaven/kafka/KafkaTools.Consume.html#protobufSpec(io.deephaven.kafka.protobuf.ProtobufConsumeOptions)>), which specifies a Protobuf format for the Kafka `value` field.

The first positional argument in the [`protobufSpec`](<https://deephaven.io/core/javadoc/io/deephaven/kafka/KafkaTools.Consume.html#protobufSpec(io.deephaven.kafka.protobuf.ProtobufConsumeOptions)>) call specifies the Protobuf schema to use. In this case, [`protobufSpec`](<https://deephaven.io/core/javadoc/io/deephaven/kafka/KafkaTools.Consume.html#protobufSpec(io.deephaven.kafka.protobuf.ProtobufConsumeOptions)>) gets the schema named `share.price.record` from the schema registry.

## Perform multiple operations

In this example:

- [`consumeToTable`](../../reference/data-import-export/Kafka/consumeToTable.md) reads two Kafka topics, `quotes` and `orders`, into Deephaven as blink tables.
- Table operations are used to:
  - track the latest data from each topic (using [`lastBy`](../../reference/table-operations/group-and-aggregate/lastBy.md)).
  - join the streams together ([`naturalJoin`](../../reference/table-operations/join/natural-join.md)).
    -aggregate ([`AggSum`](../../reference/table-operations/group-and-aggregate/AggSum.md)) the results.

```groovy skip-test
import static io.deephaven.api.agg.Aggregation.AggWSum
import static io.deephaven.api.agg.Aggregation.AggSum
import io.deephaven.engine.table.ColumnDefinition
import io.deephaven.kafka.KafkaTools

priceDef = ColumnDefinition.ofDouble('Price')
ColumnDefinition[] priceTableDefs = [priceDef]
priceSpec = KafkaTools.Consume.jsonSpec(priceTableDefs)

priceProps = new Properties()
priceProps.put('bootstrap.servers', 'redpanda:9092')
priceProps.put('deephaven.key.column.name', 'Symbol')
priceProps.put('deephaven.key.column.type', 'String')

priceTable = KafkaTools.consumeToTable(
    priceProps,
    'quotes',
    KafkaTools.ALL_PARTITIONS,
    KafkaTools.ALL_PARTITIONS_DONT_SEEK,
    KafkaTools.Consume.IGNORE,
    priceSpec,
    KafkaTools.TableType.blink()
)

lastPrice = priceTable.lastBy('Symbol')

symbolDef = ColumnDefinition.ofString('Symbol')
idDef = ColumnDefinition.ofString('Id')
limitPriceDef = ColumnDefinition.ofDouble('LimitPrice')
qtyDef = ColumnDefinition.ofInt('Qty')
ColumnDefinition[] orderTableDefs = [symbolDef, idDef, limitPriceDef, qtyDef]
orderSpec = KafkaTools.Consume.jsonSpec(orderTableDefs)

orderProps = new Properties()
orderProps.put('bootstrap.servers', 'redpanda:9092')

ordersBlink = consumeToTable(
    orderProps,
    'orders',
    KafkaTools.ALL_PARTITIONS,
    KafkaTools.ALL_PARTITIONS_DONT_SEEK,
    KafkaTools.Consume.IGNORE,
    orderSpec,
    KafkaTools.TableType.blink()
)

ordersWithCurrentPrice = ordersBlink.lastBy('Id').naturalJoin(lastPrice, 'Symbol', 'LastPrice = Price')

aggList = [
    AggSum('Shares = Qty'),
    AggWsSum('Qty', 'Notional = LastPrice')
]

totalNotional = ordersWithCurrentPrice.aggBy(aggList, 'Symbol')
```

Now, let's add records to the two topics. In a terminal, first run the following command to start writing to the `quotes` topic:

```sh
docker compose exec redpanda rpk topic produce quotes -f '%k %v\n'
```

Add the following entries:

```sh
AAPL {"Price": 135}
AAPL {"Price": 133}
TSLA {"Price": 730}
TSLA {"Price": 735}
```

After submitting these entries to the `quotes` topic, use the following command to write to the `orders` topic:

```sh
docker compose exec redpanda rpk topic produce orders -f "%v\n"
```

Then add the following entries in the terminal:

```sh
{"Symbol": "AAPL", "Id":"o1", "LimitPrice": 136, "Qty": 7}
{"Symbol": "AAPL", "Id":"o2", "LimitPrice": 132, "Qty": 2}
{"Symbol": "TSLA", "Id":"o3", "LimitPrice": 725, "Qty": 1}
{"Symbol": "TSLA", "Id":"o4", "LimitPrice": 730, "Qty": 9}
```

The tables will update as each entry is added to the Kafka streams. The final results are in the `totalNotional` table.

## Write to a Kafka stream

Deephaven can write tables to Kafka streams as well. When data in a table changes with real-time updates, those changes are also written to Kafka. The `Kafka producer package` defines methods to do this.

In this example, we write a simple [time table](../../reference/table-operations/create/timeTable.md) to a topic called `time-topic`. With only one data point, we use the `X` as a key and ignore the value.

```groovy docker-config=kafka order=null
import io.deephaven.kafka.KafkaPublishOptions
import io.deephaven.kafka.KafkaTools

source = timeTable('PT00:00:00.1').update('X = i')

kafkaProps = new Properties()
kafkaProps.put('bootstrap.servers', 'redpanda:9092')

options = KafkaPublishOptions.
    builder().
    table(source).
    topic('time-topic').
    config(kafkaProps).
    keySpec(KafkaTools.Produce.simpleSpec('X')).
    valueSpec(KafkaTools.Produce.IGNORE).
    build()

runnable = KafkaTools.produceFromTable(options)
```

Now we write a [time table](../../reference/table-operations/create/timeTable.md) to a topic called `time-topic_group`. The last argument is `true` for `last_by_key_columns`, which indicates we want to perform a [`lastBy`](../../reference/table-operations/group-and-aggregate/lastBy.md) on the keys before writing to the stream.

```groovy docker-config=kafka order=null
import io.deephaven.kafka.KafkaPublishOptions
import io.deephaven.kafka.KafkaTools

sourceGroup = timeTable('PT00:00:00.1')
    .update('X = randomInt(1, 5)', 'Y = i')

kafkaProps = new Properties()
kafkaProps.put('bootstrap.servers', 'redpanda:9092')

options = KafkaPublishOptions.
    builder().
    table(sourceGroup).
    topic('time-topic_group').
    config(kafkaProps).
    keySpec(KafkaTools.Produce.jsonSpec(['X'] as String[], null, null)).
    valueSpec(KafkaTools.Produce.jsonSpec(['X', 'Y'] as String[], null, null)).
    lastBy(true).
    build()

runnable = KafkaTools.produceFromTable(options)
```

## Related documentation

- [Kafka basic terminology](../../conceptual/kafka-basic-terms.md)
- [`consumeToTable`](../../reference/data-import-export/Kafka/consumeToTable.md)
- [`timeTable`](../../reference/table-operations/create/timeTable.md)
- [`lastBy`](../../reference/table-operations/group-and-aggregate/lastBy.md)
