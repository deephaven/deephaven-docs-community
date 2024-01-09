---
id: kafka-custom-parser
title: How to write your own custom parser for Kafka
sidebar_label: Write a Kafka custom parser
---

Although Deephaven has built-in support for parsing certain types of Kafka data such as JSON, you may want to write your own parser for your Kafka data. This guide will show you how to write your own Kafka data parser.

## Custom function

Writing your own custom Kafka parser starts with defining your own function. [Our guide on writing Python functions](../simple-python-function.md) covers how to do this.

For a Kafka stream, your custom function should take a single parameter that represents a single entry from the Kafka stream.

Once you have your custom function defined, you simply use a [table update](../../reference/table-operations/select/update.md) to create a new column containing the value of the parsed stream.

This example shows how to create a `Person` class containing `name` and `age` attributes derived from a binary Kafka stream of JSON strings.

```python docker-config=kafka order=null
from deephaven.stream.kafka import consumer as ck
from deephaven import dtypes as dht
from dataclasses import dataclass
import json

def get_raw_kafka():
    return ck.consume(
        {
            "bootstrap.servers": "redpanda:9092",
        },
        "test.topic",
        table_type=ck.TableType.append(),
        key_spec=ck.KeyValueSpec.IGNORE,
        value_spec=ck.simple_spec("Bytes", dht.byte_array),
        offsets=ck.ALL_PARTITIONS_SEEK_TO_END,
    )

@dataclass
class Person:
    age: int
    name: str

def my_parser(raw_bytes) -> Person:
    json_object = json.loads(bytes(raw_bytes))
    return Person(age=json_object["age"], name=json_object["name"])

my_raw_table = get_raw_kafka()

my_parsed_table = my_raw_table.update(
    ["Person=(org.jpy.PyObject)my_parser(Bytes)"]
).view(["Age=(int)Person.age", "Name=(String)Person.name"])
```

## Related documentation

- [Connect to a Kafka stream](./kafka-stream.md)
- [Kafka basic terminology](../../conceptual/kafka-basic-terms.md)
- [Kafka in Deephaven](../../conceptual/kafka-in-deephaven.md)
