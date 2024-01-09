---
id: import-data-cheat-sheet
title: Data import / export cheat sheet
sidebar_label: All formats
---

## CSV

- [`read_csv`](../data-import-export/CSV/readCsv.md)
- [`write_csv`](../data-import-export/CSV/writeCsv.md)

```python syntax
from deephaven import read_csv, write_csv

result = read_csv(
            path: str,
            header: Dict[str, DataType]=None,
            headless: bool=False,
            delimiter: str=",",
            quote: str="\"",
            ignore_surrounding_spaces: bool = True,
            trim: bool = False,
            charset: str = "utf-8")
write_csv(table, "/data/outputFile.csv")
```

## Parquet

- [`read`](../data-import-export/Parquet/readTable.md)
- [`write`](../data-import-export/Parquet/writeTable.md)

```python syntax
from deephaven.parquet import read, write_table

result = read("/data/inputFile.parquet")
result = read("/data/inputDirectory")
write(source, "/data/output.parquet") # source as any table in Deephaven
```

## Kafka

- [`consume`](../data-import-export/Kafka/consume.md)
- [`produce`](../data-import-export/Kafka/produce.md)

```python docker-config=kafka
# Create a table
from deephaven import time_table

source = time_table("PT00:00:01").update("X = i")

from deephaven import kafka_producer as pk
from deephaven.stream.kafka.producer import KeyValueSpec
write_topic = pk.produce(source, {'bootstrap.servers': 'redpanda:9092'},\
    'testTopic', pk.simple_spec('X'), KeyValueSpec.IGNORE)  # usage
```

```python docker-config=kafka
from deephaven import kafka_consumer as kc

result = kc.consume(
    {
        "bootstrap.servers": "redpanda:9092",
        "deephaven.key.column.type": "String",
        "deephaven.value.column.type": "String",
    },
    "testTopic",
)
```

<!--
```python docker-config=kafka
from deephaven import kafka_consumer as ck
from deephaven.stream.kafka.consumer import TableType, KeyValueSpec
import deephaven.dtypes as dht
# Read from Kafka, ignores the partition and key values
result = ck.consume({ 'bootstrap.servers' : 'redpanda:9092',
                            'deephaven.partition.column.name' : None },
                            'share.price',
                            key_spec=KeyValueSpec.IGNORE,
                            value_spec=ck.simple_spec('Price', dht.double))
```
-->

```python docker-config=kafka
from deephaven import kafka_consumer as ck
from deephaven.stream.kafka.consumer import TableType, KeyValueSpec
import deephaven.dtypes as dht
# Read from Kafka, JSON with mapping
result = ck.consume({ 'bootstrap.servers' : 'redpanda:9092' },
                   'orders',
                   key_spec=KeyValueSpec.IGNORE,
                   value_spec=ck.json_spec([('Symbol', dht.string),
                                 ('Side',   dht.string),
                                 ('Price',  dht.double),
                                 ('Qty',    dht.int_)      ],
                              mapping={ 'jsymbol' : 'Symbol',
                                        'jside'   : 'Side',
                                        'jprice'  : 'Price',
                                        'jqty'    : 'Qty'    }),
                   table_type=TableType.Append)
```

```python skip-test
from deephaven import kafka_consumer as ck
from deephaven.stream.kafka.consumer import TableType, KeyValueSpec
import deephaven.dtypes as dht
# Read from Kafka, AVRO
result = ck.consume({ 'bootstrap.servers' : 'redpanda:9092',
                      'schema.registry.url' :
                            'http://redpanda:8081' },
                    'share.price',
                    key_spec=KeyValueSpec.IGNORE,
                    value_spec=ck.avro_spec('share.price.record', schema_version='1'),
                    table_type=TableType.blink)
```

## URIs

[`dh+plain://<authority>/<path>`](../../reference/uris/uri.md)

```python skip-test
# Share tables locally. This requires the Docker container name.

from deephaven.uri import resolve

resolved_table = resolve(f"dh+plain://{container_name}/scope/my_table")
```

```python skip-test
## Share tables across a network. This requires the IP/hostname and port on which Deephaven is running.

from deephaven.uri import resolve

table_from_ip = resolve(f"dh+plain://{ip_address}:{port}/scope/my_table")
table_from_hostname = resolve(f"dh+plain://{hostname}:{port}/scope/my_table")
```
