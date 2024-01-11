---
id: consume
title: consume
---

`consume` reads a Kafka stream into an in-memory table.

## Syntax

```python syntax
consume(
  kafka_config: dict,
  topic: str,
  partitions: list[int],
  offsets: dict[int, int],
  key_spec: KeyValueSpec,
  value_spec: KeyValueSpec,
  table_type: TableType,
) -> Table
```

## Parameters

<ParamTable>
<Param name="kafka_config" type="dict">

Configuration for the associated Kafka consumer and the resulting table. Once the table-specific properties are stripped, the remaining one is used to call the constructor of `org.apache.kafka.clients.consumer.KafkaConsumer`; pass any `KafkaConsumer`-specific desired configuration here.

</Param>
<Param name="topic" type="str">

The Kafka topic name.

</Param>
<Param name="partitions" type="list[int]" optional>

- Subscribe to all partitions by default.
- Specify partitions as a comma-separated list; e.g.,`partitions=[1, 3, 5 ]` to only listen to partitions 1, 3, and 5.

</Param>
<Param name="offsets" type="dict[int, int]" optional>

- `ALL_PARTITIONS_DONT_SEEK` - Only recieve new messages produced after this call is processed (default). This matches
  the default if `offsets` is not specified.
- `ALL_PARTITIONS_SEEK_TO_END` - Go to the newest available message for every partition.
- `ALL_PARTITIONS_SEEK_TO_BEGINNING` - Go to the oldest available message for every partition.
- `{ _number_ : _offset_, ... }` Map partition numbers to numeric offsets or one of the constants `DONT_SEEK`
  , `SEEK_TO_END`, `SEEK_TO_BEGINNING`
  - For example, `{ 1 : SEEK_TO_END, 3 : SEEK_TO_BEGINNING, 5 : 27 }` means:
    - Start from the last message sent in partition 1.
    - Go to the oldest available message in partition 3.
    - Start with offset 27 in partition 5.

</Param>
<Param name="key_spec" type="KeyValueSpec" optional>

Specifies how to map the Value field in Kafka messages to Deephaven column(s). It can be the result of calling one of this module's functions:

- `simple_spec()`
- `avro_spec()`
- `json_spec()`
- `protobuf_spec()`

This parameter can also be set to the predefined `KeyValueSpec.IGNORE` or `KeyValueSpec.FROM_PROPERTIES`.

The default is `None`. The default works the same as `KeyValueSpec.FROM_PROPERTIES`, in which case, the `kafka_config` param should include values for dictionary keys `deephaven.key.column.name` and `deephaven.key.column.type` for the single resulting column name and type.

</Param>
<Param name="value_spec" type="KeyValueSpec" optional>

Specifies how to map the Value field in Kafka messages to Deephaven column(s). It can be the result of calling one of this module's functions:

- `simple_spec()`
- `avro_spec()`
- `json_spec()`
- `protobuf_spec()`

This parameter can also be set to the predefined `KeyValueSpec.IGNORE` or `KeyValueSpec.FROM_PROPERTIES`.

The default is `None`. The default works the same as `KeyValueSpec.FROM_PROPERTIES`, in which case, the `kafka_config` param should include values for dictionary keys `deephaven.key.column.name` and `deephaven.key.column.type` for the single resulting column name and type.

</Param>
<Param name="table_type" type="TableType" optional>

A `TableType` enum. The default is `TableType.blink()`.

- `TableType.append()` - Create an [append-only](../../../conceptual/table-types.md#append) table.
- `TableType.blink()` - Create a [blink](../../../conceptual/table-types.md#blink) table (default).
- `TableType.ring(N)` - Create a [ring](../../../conceptual/table-types.md#ring) table of size `N`.

</Param>
</ParamTable>

## Returns

A new in-memory table from a Kafka stream.

## Examples

In the following example, `consume` is used to read the Kafka topic `testTopic` into a Deephaven table. Only the first
two positional arguments are required to read a Kafka stream into a Deephaven table.

- The first positional argument, `{'bootstrap.servers': 'redpanda:9092'}`, is a Python dictionary that is standard for
  any Python library consuming messages from Kafka. This dictionary gives the underlying Kafka library information about
  the Kafka infrastructure.
  - Here, the host and port for the Kafka server to use to bootstrap the subscription are specified. This is the
    minimal amount of required information.
  - The value `redpanda:9092` corresponds to the current setup for development testing with Docker images (which uses
    an instance of [redpanda](https://github.com/vectorizedio/redpanda)).
- The second positional argument is the name of the topic (`testTopic`).

```python docker-config=kafka order=null
from deephaven import kafka_consumer as kc
from deephaven.stream.kafka.consumer import TableType, KeyValueSpec

result = kc.consume(
    {
        "bootstrap.servers": "redpanda:9092",
        "deephaven.key.column.type": "String",
        "deephaven.value.column.type": "String",
    },
    "testTopic",
)
```

![img](../../../assets/reference/data-import-export/kafka1.png)

In the following example, `consume` is used to read Kafka topic `share_price` with additional settings enabled and a
specific `key_spec` spec and `value_spec` defined.

- `partitions` is set to `ALL_PARTITIONS`, which listens to all partitions.
- `offsets` is set to `ALL_PARTITIONS_DONT_SEEK`, which only listens to new messages produced after this call is
  processed.
- `key_spec` is set to `simple_spec('Symbol', dht.string)`, which expects messages with a Kafka key field of
  type `string`, and creates a `Symbol` column to store the information.
- `value_spec` is set to `simple_spec('Price', dht.double)`, which expects messages with a Kafka value field of
  type `double`, and creates a `Price` column to store the information.
- `table_type` is set to `TableType.append()`, which creates an append-only table.

```python skip-test
from deephaven import kafka_consumer as kc
from deephaven.stream.kafka.consumer import TableType, KeyValueSpec
import deephaven.dtypes as dht

result = kc.consume(
    {"bootstrap.servers": "redpanda:9092"},
    "share_price",
    partitions=kc.ALL_PARTITIONS,
    offsets=kc.ALL_PARTITIONS_DONT_SEEK,
    key_spec=kc.simple_spec("Symbol", dht.string),
    value_spec=kc.simple_spec("Price", dht.double),
    table_type=TableType.append(),
)
```

![img](../../../assets/reference/data-import-export/kafka2.png)

In the following example, `consume` reads the Kafka topic `share_price` with an additional dictionary set and keys
ignored.

- `deephaven.partition.column.name` is set to `None`. The result table will not include a column for the partition
  field.
- `key_spec` is set to `IGNORE`. The result table will not include a column associated with the Kafka field `key`.

```python skip-test
from deephaven import kafka_consumer as kc
from deephaven.stream.kafka.consumer import TableType, KeyValueSpec
import deephaven.dtypes as dht

result = kc.consume(
    {"bootstrap.servers": "redpanda:9092", "deephaven.partition.column.name": None},
    "share_price",
    key_spec=KeyValueSpec.IGNORE,
    value_spec=kc.simple_spec("Price", dht.double),
)
```

![img](../../../assets/reference/data-import-export/kafka3.png)

In the following example, `consume` reads the Kafka topic `share_price` in `JSON` format.

```python skip-test
from deephaven import kafka_consumer as kc
from deephaven.stream.kafka.consumer import TableType, KeyValueSpec
import deephaven.dtypes as dht

result = kc.consume(
    {"bootstrap.servers": "redpanda:9092"},
    "orders",
    key_spec=KeyValueSpec.IGNORE,
    value_spec=kc.json_spec(
        [
            ("Symbol", dht.string),
            ("Side", dht.string),
            ("Price", dht.double),
            ("Qty", dht.int_),
        ],
        mapping={
            "jsymbol": "Symbol",
            "jside": "Side",
            "jprice": "Price",
            "jqty": "Qty",
        },
    ),
    table_type=TableType.append(),
)
```

![img](../../../assets/reference/data-import-export/kafka4.png)

In the following example, `consume` reads the Kafka topic `share_price` in `Avro` format.

```python skip-test
from deephaven import kafka_consumer as kc
from deephaven.stream.kafka.consumer import TableType, KeyValueSpec

result = kc.consume(
    {
        "bootstrap.servers": "redpanda:9092",
        "schema.registry.url": "http://redpanda:8081",
    },
    "share_price",
    key_spec=KeyValueSpec.IGNORE,
    value_spec=kc.avro_spec("share_price_record", schema_version="1"),
    table_type=TableType.Append,
)
```

![img](../../../assets/reference/data-import-export/kafka5.png)
![img](../../../assets/reference/data-import-export/kafka4.png)

## Related documentation

- [produce](./produce.md)
- [How to connect to a Kafka stream](../../../how-to-guides/data-import-export/kafka-stream.md)
- [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/kafka/KafkaTools.Consume.html)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.stream.kafka.consumer.html?highlight=consume#deephaven.stream.kafka.consumer.consume)