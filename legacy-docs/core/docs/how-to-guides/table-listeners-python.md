---
id: table-listeners-python
title: How to create table listeners in Python
sidebar_label: Create table listeners in Python
---

# Table listeners in Python

With Deephaven, it is very easy to create dynamic queries that update in real time. When a dynamic table updates, a message describing the changes is sent to all listeners of the table. This mechanism is what makes dynamic queries work, but it can also be used to create new, dynamic functionality.

For example, imagine using a Deephaven query to create a dynamic table that monitors for situations needing human intervention. You can create a table listener that sends a Slack message every time the table ticks. Similarly, you could have a table of orders to buy or sell stocks. If rows are added to the order table, new orders are sent to the broker, and if rows are removed from the order table, orders are canceled with the broker.

Here you will learn how to create your own table listeners using Python code.

<!--
:::note

Python listeners can be significantly slower than Groovy or Java listeners. If your listener will be processing large amounts of data, consider using Groovy or Java.

:::-->

There are two ways to listen to tables: a listener function or a listener class.

## Listener function

A listener function is a function that takes two arguments, the [update object](https://deephaven.io/core/pydoc/code/deephaven.table_listener.html?#deephaven.table_listener.TableUpdate) and the `is_replay` boolean value. The update object is an object which describes the associated table's changes. This description includes rows added, rows modified, rows deleted, etc.

The replay parameter is set to `True` if the listener function is triggered off of a table replay, and `False` otherwise.

The listener function is called every time the associated table is updated.

```python order=null reset
from deephaven.table_listener import listen
from deephaven import time_table

def listener_function(update, is_replay):
    print(f"FUNCTION LISTENER: update={update}")
    print(f"is_replay: {is_replay}")

table = time_table("PT1S").update(formulas=["X=i"]).tail(5)
handle = listen(table, listener_function)
```

After creating the listener function, [`listen`](https://deephaven.io/core/pydoc/code/deephaven.table_listener.html?#deephaven.table_listener.listen) registers the listener function with the dynamic table and returns a handle to the listener. This will immediately start listening to the table and calling `listener_function` every time `table` changes.

## Listener class

A listener class is a class that implements the `TableListener` ABC. This requires defining an `on_update` function that takes the same arguments as a listener function, `update` and `is_replay`. The `on_update` function is called every time the associated table is updated.

Listener classes are useful in cases where the listener must keep track of state. In this example, the listener will keep track of how many times it has been called.

```python order=null reset
from deephaven.table_listener import listen, TableListener
from deephaven import time_table

class ExampleListener(TableListener):
    def __init__(self):
        self.counter = 0

    def on_update(self, update, is_replay):
        self.counter += 1
        print(f"CLASS LISTENER: counter={self.counter} update={update}")
        print(f"is_replay: {is_replay}")

listener_class = ExampleListener()

table = time_table("PT1S").update(formulas=["X=i"]).tail(5)
handle = listen(table, listener_class)
```

Just like with the listener function, [`listen`](https://deephaven.io/core/pydoc/code/deephaven.table_listener.html?#deephaven.table_listener.listen) registers the listener class with the dynamic table and returns a handle to the listener.

## Adding and removing listeners

Most applications will want to register a listener for the entire time the application runs, but some applications may only want listeners to be registered for a limited time. The listener handle can be used to register and deregister a listener using the [`start`](https://deephaven.io/core/pydoc/code/deephaven.table_listener.html?#deephaven.table_listener.TableListenerHandle.start) and [`stop`](https://deephaven.io/core/pydoc/code/deephaven.table_listener.html?#deephaven.table_listener.TableListenerHandle.stop) methods respectively.

This example shows how listeners can be added and removed. By default, calling [`listen`](https://deephaven.io/core/pydoc/code/deephaven.table_listener.html?#deephaven.table_listener.listen) immediately begins listening to table changes.

This example will use the `threading.Timer` class to deregister a listener after 5 seconds, and then re-register it after 10 seconds.

```python order=null reset
from deephaven.table_listener import listen
from deephaven import time_table

import time
from threading import Timer

def listener_function(update, is_replay):
    print(f"FUNCTION LISTENER: update={update}")
    print(f"is_replay: {is_replay}")

def stop_listener(handle):
    handle.stop()

def start_listener(handle):
    handle.start()

table = time_table("PT1S").update(formulas=["X=i"]).tail(5)
handle = listen(table, listener_function)

Timer(5, stop_listener, args=[handle]).start()
Timer(10, start_listener, args=[handle]).start()
```

## Reading table data

The update object passed to listener methods contains information about which rows have changed.

In this example, the values from the added and removed rows are printed.

```python order=null reset
from deephaven.table_listener import listen
from deephaven import time_table

def listener_function(update, is_replay):
    print(f"FUNCTION LISTENER: update={update}")
    print(f"is_replay: {is_replay}")

    added_dict = update.added()
    timestamp = None
    x = None
    if "Timestamp" in added_dict.keys():
        timestamp = added_dict["Timestamp"]
    if "X" in added_dict.keys():
        x = added_dict["X"]
    print(f"\tADDED VALUES: Timestamp={timestamp} X={x}")

    removed_dict = update.removed()
    timestamp = None
    x = None
    if "Timestamp" in removed_dict.keys():
        timestamp = removed_dict["Timestamp"]
    if "X" in removed_dict.keys():
        x = removed_dict["X"]
    print(f"\tREMOVED VALUES: Timestamp={timestamp} X={x}")

table = time_table("PT1S").update(formulas=["X=i"]).tail(5)
handle = listen(table, listener_function)
```

<!-- TODO LiveTableMonitor Locks aren't documented for community, is that an enterprise only thing? This may require some help to figure out-->
<!-- TODO: Figure out table listeners in Groovy. The enterprise docs aren't copy-paste friendly-->

## Filtered tables

Just like all Deephaven real-time operations, listeners can be applied to tables that are derived from other tables, such as filtered tables. This example shows how to create a listener that only runs when the filtered table is updated.

```python order=null reset
from deephaven.table_listener import listen
from deephaven import time_table

def listener_function(update, is_replay):
    print(f"FUNCTION LISTENER for even values: update={update}")

table = time_table("PT1S").update(formulas=["X=i"]).tail(5)
evens = table.where(filters=["X % 2 = 0"])
handle = listen(evens, listener_function)
```

## Replay data

If you want to trigger the listener on previously existing data, you need to use the [`do_replay`](https://deephaven.io/core/pydoc/code/deephaven.table_listener.html?#deephaven.table_listener.listen) parameter.

This example shows how to use the listener on previously existing data.

```python order=null reset
from deephaven.table_listener import listen
from deephaven import time_table

from threading import Timer

def listener_function(update, is_replay):
    print(f"FUNCTION LISTENER for even values: update={update}")
    print(f"is_replay={is_replay}")

table = time_table("PT1S").update(["X=i"])
evens = table.where(["X % 2 = 0"])

handle = None

def handler():
    global handle
    handle = listen(evens, listener_function, do_replay=True)

Timer(10, handler).start()
```

## Related documentation

- [TableUpdate](https://deephaven.io/core/pydoc/code/deephaven.table_listener.html?#deephaven.table_listener.TableUpdate)
- [Table](https://deephaven.io/core/javadoc/io/deephaven/engine/table/Table.html)
- [`listen()`](https://deephaven.io/core/pydoc/code/deephaven.table_listener.html?#deephaven.table_listener.listen)
