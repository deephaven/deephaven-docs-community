---
id: kafka-topics
title: How to consume streaming data from Kafka topics
sidebar_label: Consume streaming data from Kafka topics
---

This guide shows you how to connect to one or more Kafka topics to stream data into Deephaven. It uses an example producer, which connects to a DevExperts DXFeed demo and publishes its quote and trade events as JSON messages through Kafka.

The demo feed contains a handful of symbols with 15 minutes delayed publication during trading hours. In order to provide events during non-trading hours, the demo feed will replay random old events every few seconds.

The Kafka producer in this guide creates `quotes` and `trades` topics using the local system as the broker.

## Connect to Kafka broker topics

We can use the [`consumeToTable`](../../reference/data-import-export/Kafka/consumeToTable.md) method to connect to the broker and the topics and receive events as they are published.

## Use the sample Kafka producer container

A Docker container containing a Confluent Kafka Community Edition broker and the DXFeed Kafka producer is available in the [Deephaven Examples repository](https://github.com/deephaven-examples/kafka-sample-producer) as: `kafka_sample_producer.tar.gz`.
