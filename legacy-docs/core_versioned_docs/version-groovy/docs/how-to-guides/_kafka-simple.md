---
id: kafka-simple
title: Simple Kafka import
---

This guide will guide you through reading data from a Kafka stream into a Deephaven table using the [`consume`](../reference/data-import-export/Kafka/consume.md) method.

Please see our [Kafka introduction](../conceptual/kafka-in-deephaven.md) and [Kafka basic terms](../conceptual/kafka-basic-terms.md) guides, for detailed discussions of Kafka topics.

For this example, we use a Docker image with [redpanda](https://github.com/vectorizedio/redpanda) along with our traditional Deephaven image. [Redpanda](https://github.com/vectorizedio/redpanda) allows us to input data directly into a Kafka stream from the terminal. This is just one of the supported Kafka-compatible event streaming platforms. Many more are available.

## Start Kafka with Deephaven

Deephaven can be downloaded in pre-built Docker images with `redpanda`. For more information see [Launch Deephaven from pre-built images](../tutorials/docker-install.md).

First, create a directory for the system to live in. Use any directory name you like; we chose `deephaven-redpanda`:

```bash
mkdir deephaven-redpanda
```

Then, make that the current working directory:

```bash
cd deephaven-redpanda
```

Now, use `curl` to get the Docker Compose file for this configuration. We use a `redpanda` with Python build with the examples manager included:

```bash
curl https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples-redpanda/docker-compose.yml -O
```

Now that the `docker-compose.yml` file is locally available, download the Docker images:

```bash
docker compose pull
```

Since this step only gets the container images and does not run anything, the Deephaven services will not start, and you will not see any logging output.

:::caution

When new features are added to Deephaven, you will need to redownload the `docker-compose.yml` file to get the latest version of Deephaven.

:::

To bring up the deployment:

```bash
docker compose up -d
```

This will start Deephaven with `redpanda`.

## Kafka stream as a Deephaven table

To start a Kafka consumer table, copy and run the following code in your console:

This opens a topic called `test.topic` and subscribes to all existing partitions in the topic.

![img](../assets/how-to/kafka1.png)

## Input Kafka data

This example uses [Redpanda](https://github.com/vectorizedio/redpanda) as the Kafka-compatible event streaming platform. Here Kafka events will be created by entering values into the terminal.

To start a terminal to create Kafka events, run the following on the command line:

```bash
docker compose exec redpanda rpk  topic produce test.topic
```

This will wait for input from the terminal and will send any input to the `test.topic` topic. Enter the event information and use the keyboard shortcut Ctrl + D to send.

Once sent, that information will automatically update in your Deephaven IDE.

<LoopedVideo src={require('../assets/how-to/kafka1.mp4')} />

Now you can use your Kafka streams with the power of Deephaven.

## Related documentation

- [Kafka basic terms](../conceptual/kafka-basic-terms.md)
- [Kafka introduction](../conceptual/kafka-in-deephaven.md)
- [How to connect to a Kafka stream](./kafka-stream.md)
- [How to consume streaming data from Kafka topics](./kafka-topics.md)
- [consume](../reference/data-import-export/Kafka/consume.md)
