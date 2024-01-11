---
id: use-uris
title: How to use URIs to share tables
sidebar_label: Use URIs to share tables
---

This guide will show you to use Deephaven's [URIs](https://deephaven.io/core/pydoc/code/deephaven.uri.html?highlight=uri#module-deephaven.uri) to share tables across instances and networks.

A URI, short for [Uniform Resource Identifier](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier), is a sequence of characters that identifies a resource on the web. Think of a URI as a generalization of a URL. A Deephaven URI identifies a table. By linking to a URI, you share your results with others without them needing to replicate your setup or know the details of your queries.

:::note

URIs can be used to share tables across Groovy and Python instances interchangably. For how to use URIs in Groovy, see [the equivalent guide](../../../core_versioned_docs/version-groovy/docs/how-to-guides/use-uris.md).

:::

## Syntax

URLs (Uniform Resource Locators) are a common example of URIs. Their syntax typically looks something like this:

`https://deephaven.io/core/docs`

The above URL can be broken down as follows:

- Scheme
  - The scheme, in this case, is `https`, which is short for `hypertext transfer protocol secure`.
- Authority
  - The authority, in this case, is `deephaven.io`. It is the host name of the web resource.
- Path
  - The path, in this case, is `/core/docs`. It is a path on the authority.

Deephaven URIs use a similar syntax:

`dh+plain://<authority>/<path>`

- `dh+plain` is the scheme.
- `<authority>` is the authority, which will be either a Docker container name or hostname/IP.
- `<path>` is the path to a table, which is generally `scope/<table_name>`.

Let's explore this with a couple of examples.

## Share tables locally

For this first example, we will spin up two Docker containers that run Deephaven with Python on different ports.

### Docker compose

Spinning up multiple Deephaven instances from Docker is simple. In order to do so, we will create two containers, which we will name `table-producer`, which runs on port `10000`, and `table-consumer`, which runs on port `9999`. Our `docker-compose.yml` file will look like this:

```yml
version: '3'

services:
  table-producer:
    image: ghcr.io/deephaven/server:0.17.0
    ports:
      - '10000:10000'
  table-consumer:
    image: ghcr.io/deephaven/server:0.17.0
    ports:
      - '9999:10000'
```

After a `docker compose pull` and `docker compose up --build -d`, both instances are up and running.

### Create a table

In the `table-producer` container running on port `10000`, we create a real-time table with [`time_table`](../reference/table-operations/create/timeTable.md).

```python order=null
from deephaven import time_table

my_table = time_table("PT1S").update(["X = 0.1 * i", "Y = sin(X)"])
```

### Get the table via a URI

In order to acquire a table from some producer, the consumer needs its URI. The URI consists of the scheme, Docker container, and table name. In the case of this example, that URI is `dh+plain://table-producer/scope/my_table`.

```python skip-test
from deephaven.uri import resolve

resolved_table = resolve("dh+plain://table-producer/scope/my_table")
```

![img](../assets/how-to/resolved-table-uri.gif)

By resolving the URI, we acquire `my_table` from the `table-producer` container using the syntax given above.

## Share tables across a network

Tables can also be shared across networks, public or private. Just like the previous example of sharing across a machine, this works in the same way. Rather than the container name, you only need the hostname/IP and port of the instance producing the table.

:::note

When sharing tables across a network, whether public or private, you do _not_ need the port if Deephaven is being run on the default Deephaven port `10000`. In all other cases, you _must_ provide the port on which the table can be found.

:::

### Create a table

Let's assume we're on a private network, and our colleague is running Deephaven on port `9876` on a machine with IP `192.168.5.1`. From there, they create a table:

```python order=null
from deephaven import empty_table

my_table = empty_table(50).update(["X = i", "Y = i % 2"])
```

### Get the table via a URI

Once again, we need only the IP, port, and table name to resolve its URI.

```python skip-test
from deephaven.uri import resolve

my_colleagues_table = resolve("dh+plain://192.168.5.1:9876/scope/my_table")
```

If we have the hostname of our colleague's machine, that can be used in place of the IP address.

## Share tables publicly

If the machine on which a table exists is public, then consuming that table is done the same way as if it were a private network. All that's needed is the hostname/IP and table name.

<!-- TODO:

## Paths

Tables can exist in different scopes, such as in app mode and others. When this is the case, the scope changes.

Update this section. I need to learn more about different scopes. -->

## Related documentation

- [`empty_table`](../reference/table-operations/create/emptyTable.md)
- [`time_table`](../reference/table-operations/create/timeTable.md)
- [`update`](../reference/table-operations/select/update.md)