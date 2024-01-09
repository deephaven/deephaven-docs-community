---
id: install-and-run-natively
title: How to install and run Deephaven natively
sidebar_label: Install and run Deephaven natively
---

This guide is for users who want to run Deephaven natively via the official start script - no Docker needed!

## Prerequisites

This guide assumes you are running on a Linux or OS X system and have Java 11+ installed.

## Get the artifacts

The Deephaven artifacts are attached to each [Deephaven release](https://github.com/deephaven/deephaven-core/releases).
The latest release is available at [https://github.com/deephaven/deephaven-core/releases/latest](https://github.com/deephaven/deephaven-core/releases/latest).

- The server artifact is available in both tar and zip formats.
- The (optional) Python artifact is available in a wheel format.

You can download these artifacts from your browser of choice, or via the command line.

For example:

```shell
wget https://github.com/deephaven/deephaven-core/releases/download/v0.19.1/server-jetty-0.19.1.tar
wget https://github.com/deephaven/deephaven-core/releases/download/v0.19.1/deephaven_core-0.19.1-py3-none-any.whl
```

## Unpack the server

The server artifact needs to be unpacked. You can do this from your file explorer, or from the command line.

For example:

```shell
tar xvf server-jetty-0.19.1.tar
# or, for the zip:
# unzip server-jetty-0.19.1.zip
```

## Create the virtual environment

:::note
This is an optional step. If you aren't using a Python session, you can skip this section.
:::

When running Deephaven with a Python session, it's recommend to use a virtual environment.

```shell
python -m venv deephaven-venv
source deephaven-venv/bin/activate

pip install "deephaven_core-0.19.1-py3-none-any.whl[autocomplete]"

# or, without the autocomplete feature:
# pip install deephaven_core-0.19.1-py3-none-any.whl
```

It's also possible to install the Deephaven wheel from [PyPi](https://pypi.org/project/deephaven-core/):

```shell
pip install "deephaven-core[autocomplete]==0.19.1"

# or, without the autocomplete feature:
# pip install deephaven-core==0.19.1
```

## Running the server

The server contains a `bin/` directory with a `start` script.
To start the server, invoke the `start` script:

```shell
server-jetty-0.19.1/bin/start
```

The server should now be up and running, with stdout printed to the console and the web UI available at [http://localhost:10000](http://localhost:10000).

Congratulations - you are now running the Deephaven server natively!

You can stop the server with `Control+C`.

## Related documentation

- [Configure the native application](./configuration/native-application.md)
- [Choose Python packages to install](../reference/cheat-sheets/choose-python-packages.md)
