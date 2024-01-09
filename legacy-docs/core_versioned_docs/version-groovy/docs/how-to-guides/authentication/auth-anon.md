---
id: auth-anon
title: How to enable anonymous authentication
sidebar_label: Anonymous
---

This guide will show you how to disable authentication for Deephaven run from Docker. This is also known as anonymous authentication. **Anonymous authentication allows anyone to connect to a Deephaven instance if they can reach it**.

:::warning

Anonymous authentication provides no application security.

:::

## Deephaven run from Docker

### Docker compose

To enable anonymous authentication, the `AuthHandlers` property must be set to `io.deephaven.auth.AnonymousAuthenticationHandler` by appending `-DAuthHandlers=io.deephaven.auth.AnonymousAuthenticationHandler` to the `START_OPTS` environment variable.

```yaml
version: '3.4'

services:
  deephaven:
    image: ghcr.io/deephaven/server-slim:latest
    ports:
      - '${DEEPHAVEN_PORT:-10000}:10000'
    volumes:
      - ./data:/data
    environment:
      - START_OPTS=-Xmx4g -DAuthHandlers=io.deephaven.auth.AnonymousAuthenticationHandler
```

The Docker logs will show the following message when anonymous authentication is enabled.

![img](../../assets/how-to/anon-auth.png)

## Related documentation

- [Quickstart for Docker](../../tutorials/docker-install.md)
- [How to configure pre-shared key authentication](./auth-psk.md)
- [How to configure the Docker application](../configuration/docker-application.md)
