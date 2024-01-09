---
id: kafka-kSQL
title: How to connect a JDBC compatible database, kSQL, and Deephaven
sidebar_label: Connect to a kSQL stream
---

Kafka is a distributed event streaming platform that lets you read, write, store, and process events, also called records. It is frequently used with multiple systems that work together. [JDBC](https://docs.confluent.io/kafka-connect-jdbc/current/index.html) allows for one Kafka stream to work with others.

In this guide, we work with [PostgreSQL](https://www.postgresql.org/) and create a database of imaginary business information.

We then work with [ksqlDB](https://www.confluent.io/product/ksql/) to link the [PostgreSQL](https://www.postgresql.org/) data inside [ksqlDB](https://www.confluent.io/product/ksql/) using the [JDBC Connector](https://docs.confluent.io/kafka-connect-jdbc/current/index.html).

Finally, we enter a subset of streaming data and see the output in a Deephaven table that shows data from both the [ksqlDB](https://www.confluent.io/product/ksql/) and [PostgreSQL](https://www.postgresql.org/) databases.

## Set up the docker-compose.yml file

For this example, we use the standard containers from [launch Deephaven from pre-built images](../../tutorials/docker-install.md) plus containers for [zookeeper](https://hub.docker.com/_/zookeeper), [broker](https://hub.docker.com/r/confluentinc/cp-kafka), [ksqldb-server](https://hub.docker.com/r/confluentinc/ksqldb-server), [ksqldb-cli](https://hub.docker.com/r/confluentinc/ksqldb-cli) and [postgres](https://hub.docker.com/_/postgres).

The [ksqldb-server](https://hub.docker.com/r/confluentinc/ksqldb-server) is set up to have a volume of `confluentinc-kafka-connect-jdbc` in the local directory. This needs to be installed prior to launching the containers.

Download the zip file from [Confluent kafka-connect-JDBC](https://www.confluent.io/hub/confluentinc/kafka-connect-jdbc), and extract it into the same directory with the `docker-compose.yml` file.

:::note

The unzipped file may have the version appended to it, such as `confluentinc-kafka-connect-jdbc-10.2.4`. This needs to be renamed to `confluentinc-kafka-connect-jdbc`.

:::

<details>
  <summary>Full `docker-compose.yml` file to copy</summary>

```bash
version: "3.4"

services:
  server:
    image: ghcr.io/deephaven/server:${VERSION:-latest}
    expose:
      - '8080'
    volumes:
      - ./data:/data
      - api-cache:/cache
    environment:
      - JAVA_TOOL_OPTIONS=-Xmx4g -Ddeephaven.console.type=python

  web:
    image: ghcr.io/deephaven/web:${VERSION:-latest}
    expose:
      - '80'
    volumes:
      - ./data:/data
      - web-tmp:/tmp

  grpc-proxy:
    image: ghcr.io/deephaven/grpc-proxy:${VERSION:-latest}
    environment:
      - BACKEND_ADDR=server:8080
    depends_on:
      - server
    expose:
      - '8080'

  envoy:
    image: ghcr.io/deephaven/envoy:${VERSION:-latest}
    depends_on:
      - web
      - grpc-proxy
      - server
    ports:
      - "${PORT:-10000}:10000"

  examples:
    image: ghcr.io/deephaven/examples
    volumes:
      - ./data:/data
    command: initialize

  zookeeper:
    image: confluentinc/cp-zookeeper:${VERSION:-latest}
    hostname: zookeeper
    container_name: zookeeper
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  broker:
    image: confluentinc/cp-kafka:${VERSION:-latest}
    hostname: broker
    container_name: broker
    depends_on:
      - zookeeper
    ports:
      - "29092:29092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://broker:9092,PLAINTEXT_HOST://localhost:29092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1

  ksqldb-server:
    image: confluentinc/ksqldb-server:0.10.2
    hostname: ksqldb-server
    container_name: ksqldb-server
    depends_on:
      - broker
    ports:
      - "8088:8088"
    environment:
      KSQL_LISTENERS: "http://0.0.0.0:8088"
      KSQL_BOOTSTRAP_SERVERS: "broker:9092"
      KSQL_KSQL_SCHEMA_REGISTRY_URL: "http://schema-registry:8081"
      KSQL_KSQL_LOGGING_PROCESSING_STREAM_AUTO_CREATE: "true"
      KSQL_KSQL_LOGGING_PROCESSING_TOPIC_AUTO_CREATE: "true"
      # Configuration to embed Kafka Connect support.
      KSQL_CONNECT_GROUP_ID: "ksql-connect-cluster"
      KSQL_CONNECT_BOOTSTRAP_SERVERS: "broker:9092"
      KSQL_CONNECT_KEY_CONVERTER: "org.apache.kafka.connect.storage.StringConverter"
      KSQL_CONNECT_VALUE_CONVERTER: "org.apache.kafka.connect.json.JsonConverter"
      KSQL_CONNECT_VALUE_CONVERTER_SCHEMAS_ENABLE: "false"
      KSQL_CONNECT_CONFIG_STORAGE_TOPIC: "_ksql-connect-configs"
      KSQL_CONNECT_OFFSET_STORAGE_TOPIC: "_ksql-connect-offsets"
      KSQL_CONNECT_STATUS_STORAGE_TOPIC: "_ksql-connect-statuses"
      KSQL_CONNECT_CONFIG_STORAGE_REPLICATION_FACTOR: 1
      KSQL_CONNECT_OFFSET_STORAGE_REPLICATION_FACTOR: 1
      KSQL_CONNECT_STATUS_STORAGE_REPLICATION_FACTOR: 1
      KSQL_CONNECT_PLUGIN_PATH: "/usr/share/kafka/plugins"
    volumes:
      - ./confluentinc-kafka-connect-jdbc:/usr/share/kafka/plugins/jdbc

  ksqldb-cli:
    image: confluentinc/ksqldb-cli:0.10.2
    container_name: ksqldb-cli
    depends_on:
      - broker
      - ksqldb-server
    entrypoint: /bin/sh
    tty: true

  postgres:
    image: postgres:12
    hostname: postgres
    container_name: postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: password

volumes:
    web-tmp:
    api-cache:


```

</details>

Now that the `docker-compose.yml` file is locally available, download the Docker images.

```bash
docker compose pull
```

Now that your chosen configuration is set up, bring up the deployment.

```bash
docker compose up -d
```

There are now several containers running and we are going to interact with two of those containers directly (`postgres` and `ksqldb-cli`), along with the Deephaven IDE.

## Create PostgreSQL Table

We are going to input static information into [PostgreSQL](https://www.postgresql.org/). We execute the following command to enter the [PostgreSQL](https://www.postgresql.org/) docker container:

```bash
docker exec -it postgres psql -U postgres
```

This will bring us to a postgres prompt. Run the following in the postgres prompt:

```SQL
CREATE TABLE business_profiles (
    business_id integer PRIMARY KEY,
    title text,
    genre text,
    year integer,
    contact text,
    revenue float
);

INSERT INTO business_profiles (business_id, title, genre, year, contact, revenue) VALUES
    (0, 'Acme', 'Manufacturing', 2002, 'R. Runner', 15.37),
    (1, 'Globex', 'Energy', 2007, 'H. Simpson', 12.32),
    (2, 'Initech', 'Tech', 2019, 'P. Gibbons', 2.19),
    (3, 'Hooli', 'Printing', 2021, 'E. Bachman ', 54.27);
```

## Create JDBC connection in kSQL

To connect kSQL with [PostgreSQL](https://www.postgresql.org/), we need to run the kSQL client container command. Run the following via the command line in a new terminal window.

```bash
docker exec -it ksqldb-cli ksql http://ksqldb-server:8088
```

This will bring us to a ksql prompt. Now we want to have `SOURCE CONNECTOR` that allows us to access the [PostgreSQL](https://www.postgresql.org/) data. Run the following in the ksql prompt.

```SQL
CREATE SOURCE CONNECTOR jdbc_source WITH (
  'connector.class'          = 'io.confluent.connect.jdbc.JdbcSourceConnector',
  'connection.url'           = 'jdbc:postgresql://postgres:5432/postgres',
  'connection.user'          = 'postgres',
  'connection.password'      = 'password',
  'topic.prefix'             = 'jdbc_',
  'table.whitelist'          = 'business_profiles',
  'mode'                     = 'incrementing',
  'numeric.mapping'          = 'best_fit',
  'incrementing.column.name' = 'business_id',
  'key'                      = 'business_id',
  'key.converter'            = 'org.apache.kafka.connect.converters.IntegerConverter');
```

The JDBC connector will look for the [PostgreSQL](https://www.postgresql.org/) tables matching the `table.whitelist` and import it as a Kafka topic. Once imported, we can use it like any other topic made in kSQL. This topic is not yet a stream. To make a stream we need to be able to reference this topic. kSQL needs this to be a table so we create a table from this topic. Run the following in the ksql prompt:

```SQL
CREATE TABLE BusinessProfiles (
  business_id INTEGER PRIMARY KEY,
  title STRING,
  genre STRING,
  year INTEGER,
  contact STRING,
  revenue DOUBLE
)
WITH (kafka_topic='jdbc_business_profiles', value_format='json');
```

Now we need to make a stream that will be used for every time we interact with that business. Run the following in the ksql prompt.

```SQL
CREATE STREAM business_transaction (
  business_id INTEGER KEY,
  email_address VARCHAR,
  card_number INTEGER,
  timestamp VARCHAR,
  amount DECIMAL(12, 2)
)
WITH (kafka_topic='business_transaction',
    partitions = 1,
    value_format = 'json',
    timestamp = 'timestamp',
    timestamp_format = 'yyyy-MM-dd''T''HH:mm:ss');
```

To add information from the prior [PostgreSQL](https://www.postgresql.org/) database to the business we are working with we can `JOIN` the stream with the information in the topic. Run the following in the ksql prompt.

```SQL
CREATE STREAM enriched_business_transaction AS
  SELECT
    bt.business_id       AS business_id,
    bt.email_address        AS email_address,
    bt.card_number       AS card_number,
    bt.timestamp           AS timestamp,
    bt.amount           AS amount,
    jdbc.title          AS title,
    jdbc.genre         AS genre,
    jdbc.year          AS year,
    jdbc.contact AS contact,
    jdbc.revenue        AS revenue
  FROM business_transaction bt JOIN BusinessProfiles jdbc
    ON bt.business_id = jdbc.business_id
  EMIT CHANGES;
```

## Create a table in Deephaven

Now that we have linked our kSQL to our prior [PostgreSQL](https://www.postgresql.org/) data, we can read in the data to Deephaven with [consume](../../reference/data-import-export/Kafka/consume.md). Open up the Deephaven IDE by going to [http://localhost:10000/ide/](http://localhost:10000/ide/) in your browser, and then run the following Python code:

```python skip-test
from deephaven import kafka_consumer as ck
import deephaven.dtypes as dht
result2 = ck.consume({'bootstrap.servers': 'broker:9092' }, 'ENRICHED_BUSINESS_TRANSACTION',
    key=ck.simple('business_id',dht.int32), value_spec=ck.json_spec([
    ('email_address', dht.string),
    ('card_number',   dht.int32),
    ('timestamp',  dht.string),
    ('amount',    dht.double),
    ('title', dht.string),
    ('genre',   dht.string),
    ('year',  dht.int32),
    ('contact',    dht.string)
    ],
    mapping={ 'EMAIL_ADDRESS' : 'email_address',
            'CARD_NUMBER'   : 'card_number',
            'TIMESTAMP'  : 'timestamp',
            'AMOUNT'    : 'amount',
            'TITLE' : 'title',
            'GENRE'   : 'genre',
            'YEAR'  : 'year',
            'CONTACT'    : 'contact' }),
table_type=TableType.append())
```

## Input streaming data

Now that we have a Deephaven Kafka table listening for the stream, we can display just the transactions that are happening. For example, in the kSQL console enter the following hypothetical transactions that might occur.

```SQL
INSERT INTO business_transaction (business_id, email_address, card_number, timestamp, amount) VALUES (
    0,
    'example1@example.com',
    122340,
    '2021-10-05T03:19:58',
    32.13);
INSERT INTO business_transaction (business_id, email_address, card_number, timestamp, amount) VALUES (
    1,
    'next_example1@example.com',
    422340,
    '2021-12-03T02:12:13',
    34.31);
INSERT INTO business_transaction (business_id, email_address, card_number, timestamp, amount) VALUES (
    2,
    'another_example1@example.com',
    34562453,
    '2021-09-05T03:09:08',
    85.38);
INSERT INTO business_transaction (business_id, email_address, card_number, timestamp, amount) VALUES (
    3,
    'Last_example@example.com',
    34456200,
    '2020-05-12T04:11:08',
    6.82);
```

The Deephaven table will show data from both the transactions (email_address, card_number, timestamp, and amount), and the [PostgreSQL](https://www.postgresql.org/) database (title, genre, year, and contact), as those are now linked with JDBC using the `business_id` key.

![img](../../assets/how-to/kSQL.png)

## Related documentation

- [Kafka basic terminology](../../conceptual/kafka-basic-terms.md)
- [Kafka in Deephaven](../../conceptual/kafka-in-deephaven.md)
- [How to connect to a Kafka stream](./kafka-stream.md)
- [consume](../../reference/data-import-export/Kafka/consume.md)
