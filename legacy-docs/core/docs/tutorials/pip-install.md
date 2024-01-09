---
id: pip-install
title: Installation guide for pip
sidebar_label: pip installation
---

<h2>Install Deephaven without Docker</h2>

Pip is the package manager for Python and is the easiest way to install Python packages, including Deephaven. Using pip, you can install Deephaven with only two commands.

:::note
If you want instructions for using Deephaven's pre-built Docker images, see the [Docker quick start](./docker-install.md) instead. Developers interested in tinkering with and modifying Deephaven source code should follow the instructions in the [build from source](../how-to-guides/launch-build.md) guide.
:::

## Prerequisites

First, you will need Java 11+ installed and the `JAVA_HOME` environment variable set appropriately. Next, install `deephaven-server` using pip:

```bash
pip3 install --upgrade pip setuptools wheel
pip3 install deephaven-server
```

## Start a Deephaven server

With`deephaven-server` installed, let's create a Python script to use it.

The code below starts a Deephaven server with its standard configuration on port 10000 and 4GB of memory allocated:

```python skip-test
from deephaven_server import Server
s = Server(port=10000, jvm_args=["-Xmx4g"])
s.start()
```

### Authentication

Deephaven, by default, uses [pre-shared key authentication](../how-to-guides/authentication/auth-psk.md) to authenticate users. The above code example does _not_ set a pre-shared key, so it will not be known. This does not affect your ability to use Deephaven operations from Python, but you will not be able to connect to the IDE via your web browser, as the required pre-shared key will not be known. There are two ways to get around this:

You can set your own pre-shared key by supplying `-Dauthentication.psk` an additional parameter to `jvm_args` when you create the server. The code below sets the key as `PythonR0cks!`.

```python skip-test
from deephaven_server import Server
s = Server(port=10000, jvm_args=["-Xmx4g", "-Dauthentication.psk=PythonR0cks!"]).start()
```

You can also enable [anonymous authentication](../how-to-guides/authentication/auth-anon.md), where no key is required to access the IDE. To do so, supply `-DAuthHandlers=io.deephaven.auth.AnonymousAuthenticationHandler` as an additional parameter to `jvm_args`.

```python skip-test
from deephaven_server import Server

s = Server(port=10000, jvm_args=["-Xmx4g", "-DAuthHandlers=io.deephaven.auth.AnonymousAuthenticationHandler"]).start()
```

:::note

Anonymous authentication provides no application security.

:::

## M2 Macs

If you're trying to use pip-installed Deephaven on an M2 MacBook, you must add the argument `"-Dprocess.info.system-info.enabled=false"` to the `jvm_args` list, as in:

```python skip-test
s = Server(port=10000, jvm_args=["-Xmx4g", "-Dprocess.info.system-info.enabled=false"])
```

## Example scripts

- The Deephaven server must be started before performing any Deephaven operations, including importing the `deephaven` package. This is _required_ when using Deephaven in a Python script. Here, it is started on port 10000. You can choose another port if you'd like. To access the IDE after running this script, head to `http://localhost:10000/ide` in your preferred web browser.
- JVM arguments have been specified to give the Deephaven server 4 GB of memory. You can change the amount of memory by changing this number.

The next part of the script creates three streaming tables. The first table (`t`) steadily increases in size, the second table (`t_last`) contains the most recent timestamp for each label, and the third table (`t_join`) joins the most recent timestamp onto the first table.

```python skip-test
from deephaven import time_table

t = time_table("PT1S").update("A = i%2==0 ? `A` : `B`")
t_last = t.last_by("A")
t_join = t.natural_join(t_last, on="A", joins=["LastTime=Timestamp"])

print(t_join)
```

You can run this script from the command line. Here [interactive mode](https://docs.python.org/3/tutorial/interpreter.html#interactive-mode) (`-i`) is used to keep the Python session up so that we can continue interacting with the Deephaven session after the script executes.

```bash
python3 -i example.py
```

![img](../assets/how-to/pip-2.png)
![img](../assets/how-to/pip-1.png)

This next script creates two tables: one for employees and one for departments. It then joins the two tables on the `DeptID` column.

First, start the server:

```python skip-test
from deephaven_server import Server
s = Server(port=10000, jvm_args=["-Xmx4g"])
s.start()
```

Then, run your Python query:

```python order=left,right,table
from deephaven import new_table
from deephaven.column import string_col, int_col
from deephaven.constants import NULL_INT

left = new_table([
    string_col("LastName", ["Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"]),
    int_col("DeptID", [31, 33, 33, 34, 34, NULL_INT]),
    string_col("Telephone", ["(347) 555-0123", "(917) 555-0198", "(212) 555-0167", "(952) 555-0110", None, None])
])

right = new_table([
    int_col("DeptID", [31, 33, 34, 35]),
    string_col("DeptName", ["Sales", "Engineering", "Clerical", "Marketing"]),
    string_col("Telephone", ["(646) 555-0134", "(646) 555-0178", "(646) 555-0159", "(212) 555-0111"])
])

table = left.join(table=right, on=["DeptID"], joins=["DeptName,DeptTelephone=Telephone"])
```

## The Update Graph Processor (UGP)

The Update Graph Processor (UGP) coordinates table updates and its [lock](<https://en.wikipedia.org/wiki/Lock_(computer_science)>) must be acquired before executing many Deephaven table operations. In Deephaven, the UGP ensures that, when queries are updated in real time, the calculations are all updated consistently. This lock is _automatically_ acquired when executing a block of code in the Deephaven IDE. The same is true in Python scripts outside of the IDE. UGP auto-locking is set to `True` by default.

### Automatic lock

When auto-locking is enabled, as in the example above, UGP locks are automatically acquired when they are needed.

To disable auto-locking:

```python skip-test
from deephaven import ugp
ugp.auto_locking = False
```

### Explicit lock

Auto-locking is very finely grained. Each table operation is locked independently. Explicit UGP locking allows more complex locking. For example, with an explicit UGP lock, multiple tables can be initialized against the same initial data set before being allowed to update. Explicit-locking can still be used in conjunction with auto-locking to handle more complex cases, providing both ease of use and explicit control.

```python skip-test
from deephaven_server import Server
s = Server(port=10000, jvm_args=["-Xmx4g"])
s.start()

# UGP lock must be held to execute many query operations

from deephaven import time_table
from deephaven import ugp

# Use explicit UGP locking
with ugp.shared_lock():
    t = time_table("PT1S").update("A = i%2==0 ? `A` : `B`")
    t_last = t.last_by("A")
    t_join = t.natural_join(t_last, on="A", joins=["LastTime=Timestamp"])

print(t_join)
```

## Use additional architectures

pip-installed Deephaven works for AMD64 and ARM64 Linux, Intel and Apple Mac, as well as Windows and WSL. Unsupported architectures can use pip-installed Deephaven in a Docker container. To do this, simply create a `Dockerfile`.

```dockerfile
FROM python:3.7-bullseye

RUN apt update && \
    apt install -y openjdk-11-jdk

ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/

RUN python -m pip install --upgrade pip setuptools wheel && \
    pip install deephaven-server==0.14.0
```

Then build a Docker image for either `linux/amd64` or `linux/arm64` (Mac M1 or M2).

```bash
docker build . -t deephaven-pip-installed
```

## What to do next?

import { TutorialCTA } from '@theme/deephaven/CTA';

<div className="row">
<TutorialCTA to="/core/docs/tutorials/quickstart" />
</div>
## Related documentation

- [Build and launch Deephaven from source code](../how-to-guides/launch-build.md)
- [Create a new table](../how-to-guides/new-table.md)
- [How to join tables](../how-to-guides/join-two-tables.md)
- [How to install Python packages](../how-to-guides/install-python-packages.md)
