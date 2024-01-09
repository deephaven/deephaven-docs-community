---
id: kafka-basic-terms
title: Kafka basic terminology
---

This guide defines the basic Kafka terms and concepts needed to understand how Kafka and Deephaven work together. If
you're interested in higher-level discussions of the power of integrating Kafka with Deephaven, see our
guide, [Kafka introduction](./kafka-in-deephaven.md).

Kafka is a distributed event streaming platform that lets you read, write, store, and process events (also called
records). In the sections that follow, we identify the Kafka fields you'll need to set as you write queries using
the [`consume`](../reference/data-import-export/Kafka/consume.md) method.

## Topics

Individual Kafka feeds are called "topics" and are identified by a topic name. Messages in a topic typically
follow a uniform schema, but they don’t have to (more on this below).

- **Producers** write data to topics.
- **Consumers** read data from the topic.
- Data from topics is always read in sequential order.
- Every record received from Kafka contains exactly five fields:
  - `partition`
  - `offset`
  - `timestamp`
  - `key`
  - `value`

### Partition

Partition is a positive integer value used as a way to "shard" (or partition) topics. Subscribers can opt to listen to
only a subset of messages from a topic by selecting individual partitions.

A topic may have a single partition or many. The partition for a message is selected by the publisher when the data is
written to the Kafka stream.

When choosing a partition, it is important to consider how to balance the load so that the producer and consumer can be
scaled easily:

1. Consistent hashing: the partition may be directly implied from a hash value of the key at publishing time. For
   example, if key represents a string security symbol (e.g., "MSFT"), the partition is calculated from the first letter
   of the security symbol "M". If each letter is a possible partition calculator, then M takes the value of 12 from
   possible values in [0, 25] from the alphabet.
2. Randomly: the partition may be assigned at random, in order to balance the load most efficiently.

Kafka guarantees stable ordering of messages in the same partition. Stable ordering per partition means that the first
messages written to a partition are the first messages read from that partition as well. Consider the following example:

1. Message `A` is written to topic `test` partition `0`.
2. Message `B` is written to topic `test` partition `1`.
3. Message `C` is written to topic `test` partition `0`.

When reading topic `test` partition `0`, message `A` comes before `C`, and consumers can take advantage of that knowledge.

This is important when processing messages on consumers that require ordering preservation, such as stock market prices
or order updates.

### Offset

An offset is an integer number starting at zero that can be used to identify any message ever produced in a given
partition.

When Kafka consumers subscribe to a topic, they specify the offset at which to start listening.

A consumer can start at:

- a defined offset value.
- the oldest available value.
- the current offset, in which case the consumer will receive only newly produced messages.

### Timestamp

A timestamp value is inserted by the publisher at publication time (i.e., when the message is written to the topic).

### Key

- A key is a sequence of bytes, without a predefined length, that is used as an identifier. Keys can be any type of byte
  payload. These can be, for example:

  - a string, such as "MSFT".
  - a complex JSON string with multiple fields.
  - a binary encoded double-precision floating-point number in IEEE 754 representation (8 bytes).
  - a binary encoded 32-bit integer (4 bytes).

- Kafka may need to hash the key to produce a partition value. When computing the hash, the key is treated as an opaque
  sequence of bytes.
- A key can be empty, in which case, partition assignments will be effectively random.
- A key can comprise multiple separate parts (composite).
- Keys that are identical are written to the same partition.

### Value

Values are a sequence of bytes, without a predefined length. Keys map to values.

- Values can be any type of byte payload. These can be, for example:

  - a simple string, such as "Deephaven".
  - a complex JSON string with multiple fields.
  - a binary encoded double-precision floating-point number in IEEE 754 representation (8 bytes).
  - a binary encoded 32-bit integer (4 bytes).

- Values may be empty.
- Most commonly, to represent multidimensional data associated with a key, the value will be a composite that represents
  multiple fields. For example, for a topic of `weatherReports` we might have:
  - Key set to the location, such as "New York, NY, USA".
  - Value set to contain the temperature, humidity, and cloud cover (such as `68º F`, `80%`, and `Overcast`).

## Format

Given a particular topic, it is important for producers (data writers) and consumers (data readers) to agree on a format
for what is being published (written) and subscribed (read). Some commonly used formats are given below.

### JSON

[JSON (JavaScript Object Notation)](https://json-schema.org/) is a lightweight data-interchange format. JSON is based on
as ASCII. It is both human- and machine-readable, and is widely supported across many environments.

The [Apache Kafka](https://docs.confluent.io/platform/current/schema-registry/serdes-develop/serdes-json.html#serdes-and-formatter-json) consumer library provides ways to encode keys and values as basic types like string, short, integer, etc. with JSON as well as ways to encode more complex multifield or structured types.

### Avro

Avro is in a compact binary form and has a very compact format useful for high-volume usage. Avro is a data
serialization system that is not human-readable. For encoding Avro, separate libraries are required.
The [Apache Kafka](https://docs.confluent.io/platform/current/schema-registry/serdes-develop/serdes-avro.html) consumer
library provides ways to encode keys and values as basic types like int, double, string, etc. with Avro as well as ways
to encode more complex multifield or structured types.

### ProtoBuf

[ProtoBuf](https://protobuf.dev/) is a very popular messaging format, commonly used in RPC messaging (like gRPC). It has strong conventions and support for backwards compatibility across versions. It is also language and platform neutral.

## Table types

Deephaven Kafka tables can be append-only, blink, or ring.

### Append

[Append-only](../conceptual/table-types.md#append) tables append rows to the bottom of the table upon receipt of new messages. Rows are added on a one-to-one correspondence with incoming messages. Append-only tables keep a “full history” of every record ingested from the stream. Because these tables keep all their rows, table size and memory consumption can grow rapidly.

### Blink

[Blink tables](../conceptual/table-types.md#blink) only keep the set of rows received during the last update cycle, which is typically one second. Blink tables form the basis for more advanced use cases when used in combination with stateful table aggregations like [`last_by`](../reference/table-operations/group-and-aggregate/lastBy.md).

Blink tables are the default table type because of their low memory use. They are most useful if you want to aggregate your data, derive other tables, or use programmatic listeners to react to data.

Aggregation operations such as [`agg_by`](../reference/table-operations/group-and-aggregate/aggBy.md) and [`count_by`](../reference/table-operations/group-and-aggregate/countBy.md) operate with special semantics on blink tables, allowing the result to aggregate over the entire observed stream of rows from the time the operation is initiated. That means, for example, that a [`sum_by`](../reference/table-operations/group-and-aggregate/sumBy.md) on a blink table will contain the result sums for each aggregation group over all observed rows since the [`sum_by`](../reference/table-operations/group-and-aggregate/sumBy.md) was applied, rather than just the sums for the current update cycle. This allows for aggregations over the full history of a stream to be performed with greatly reduced memory costs when compared to the alternative strategy of holding the entirety of the stream as an in-memory table.

Most other operations on blink tables behave exactly as they do on other tables; that is, add and remove operations are processed as normal. For example, a [`select`](../reference/table-operations/select/select.md) operation on a blink table is only applied to the rows for the current update cycle.

Because Deephaven does not need to keep all the history of rows read from the input stream in memory, table operations require less memory.

### Ring

[Ring tables](../conceptual/table-types.md#ring) retain the last `N` added rows for each update of the UGP cycle. If an update cycle causes table size to grow greater than `N`, the oldest rows are removed to bring the total down to `N`.

A ring table is semantically the same as append-only, meaning it does not get special treatment in aggregations the way blink tables do. However, operations use less memory because ring tables dispose of data.

## Related documentation

- [How to connect to a Kafka stream](../how-to-guides/data-import-export/kafka-stream.md)
- [Kafka introduction](./kafka-in-deephaven.md)
- [Table types](../conceptual/table-types.md)
- [`consume`](../reference/data-import-export/Kafka/consume.md)
