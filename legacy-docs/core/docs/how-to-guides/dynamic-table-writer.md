---
id: dynamic-table-writer
title: How to write data to an in-memory, real-time table
sidebar_label: Write data to a real-time table
---

This guide will show you how to use [`DynamicTableWriter`](../reference/table-operations/create/DynamicTableWriter.md) to write data to real-time, in-memory Deephaven tables.

Deephaven's [`DynamicTableWriter`](../reference/table-operations/create/DynamicTableWriter.md) writes data into live, in-memory tables by specifying the name and data types of each column. The use of [`DynamicTableWriter`](../reference/table-operations/create/DynamicTableWriter.md) to write data to an in-memory ticking table generally follows a formula:

- Create the [`DynamicTableWriter`](../reference/table-operations/create/DynamicTableWriter.md).
- Get the table that [`DynamicTableWriter`](../reference/table-operations/create/DynamicTableWriter.md) will write data to.
- Write data to the table (done in a separate thread).
- Close the table writer.

## Example: Getting started

The following example creates a table with two columns (`A` and `B`). The columns contain randomly generated integers and strings, respectively. Every second, for ten seconds, a new row is added to the table.

```python order=null ticking-table reset
from deephaven import DynamicTableWriter
import deephaven.dtypes as dht

import random, string, threading, time

# Create a DynamicTableWriter with two columns: `A`(int) and `B`(String)
table_writer = DynamicTableWriter(
    {"A": dht.int_, "B": dht.string}
)

result = table_writer.table

# Function to log data to the dynamic table
def thread_func():
    # for loop that defines how much data to populate to the table
    for i in range(10):
        # the data to put into the table
        a = random.randint(1, 100)
        b = random.choice(string.ascii_letters)

        # The write_row method adds a row to the table
        table_writer.write_row(a, b)

        # seconds between new rows inserted into the table
        time.sleep(1)

# Thread to log data to the dynamic table
thread = threading.Thread(target=thread_func)
thread.start()
```

<LoopedVideo src={require('../assets/how-to/DynamicTableWriter_Video1.mp4')} />

## Example: Trig Functions

The following example writes the trigonometric functions `sine`, `cosine`, and `tangent` of an `X` column by using [NumPy](https://www.numpy.org/). It also plots the functions as the table updates.

```python order=null ticking-table reset
from deephaven import DynamicTableWriter
from deephaven.plot.figure import Figure
import deephaven.dtypes as dht
import numpy as np

import threading
import time

table_writer = DynamicTableWriter(
    {"X": dht.double, "SinX": dht.double, "CosX": dht.double, "TanX": dht.double}
)

trig_functions = table_writer.table

def write_data_live():
    for i in range(628):
        start = time.time()
        x = 0.01 * i
        y1 = np.sin(x)
        y2 = np.cos(x)
        y3 = np.tan(x)
        table_writer.write_row(x, y1, y2, y3)
        end = time.time()
        time.sleep(0.2 - (start - end))

thread = threading.Thread(target=write_data_live)
thread.start()

figure = Figure()
trig_fig = figure.plot_xy(series_name="Sin(X)", t=trig_functions, x="X", y="SinX").\
                  plot_xy(series_name="Cos(X)", t=trig_functions, x="X", y="CosX").\
                  plot_xy(series_name="Tan(X)", t=trig_functions, x="X", y="TanX")
trig_fig = trig_fig.chart_title(title="Trig Functions")
trig_plot = trig_fig.show()
```

<LoopedVideo src={require('../assets/how-to/dtw_trig_functions.mp4')} />

<LoopedVideo src={require('../assets/how-to/dtw_trig_functions_plot.mp4')} />

## DynamicTableWriter and the Update Graph Processor (UGP)

When using the DynamicTableWriter in a Python command, the UGP's lock is held by the command. For as long as the lock is held, the UGP will not be able to run. If you're using the DynamicTableWriter to create tables and plots to display within the Deephaven IDE, you may never notice this. However, if you're programmatically working with tables, you may run into some unexpected results.

For example, let's use this simple DynamicTableWriter example. What would you expect the `print` statement to show?

```python order=result test-set=1 reset
from deephaven import DynamicTableWriter
import deephaven.dtypes as dht
column_definitions = {"Numbers": dht.int32, "Words": dht.string}
table_writer = DynamicTableWriter(column_definitions)
result = table_writer.table
table_writer.write_row(1, "Testing")
table_writer.write_row(2, "Dynamic")
table_writer.write_row(3, "Table")
table_writer.write_row(4, "Writer")
print(result.j_table.isEmpty())
```

You may be surprised, but the table does not contain rows when the `print` statement is reached. This is because the UGP was unable to run due to the command holding the lock. The rows added above are instead prepared to be added to the table at the beginning of the next UGP cycle, meaning the table actually is empty when the `print` statement is reached.

However, calling the same `print` statement as a second command produces the expected result.

```python test-set=1
print(result.j_table.isEmpty())
```

All table updates emanate from the update graph processor. When using Deephaven's tables, it is important to understand how the UGP works.

## Related documentation

- [How to install Python packages in Deephaven](./install-python-packages.md)
- [How to use Java packages in query strings](./use-java-packages.md)
- [How to use Python packages in query strings](./use-python-packages.md)
- [Deephaven's table update model](../conceptual/table-update-model.md)
- [DynamicTableWriter](../reference/table-operations/create/DynamicTableWriter.md)
- [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/engine/utils/DynamicTableWriter.html)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table_factory.html?highlight=tablewriter#deephaven.table_factory.DynamicTableWriter)
