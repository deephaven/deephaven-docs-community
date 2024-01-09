---
id: DynamicTableWriter
title: DynamicTableWriter
---

`DynamicTableWriter` creates a [`DynamicTableWriter`](https://deephaven.io/core/pydoc/code/deephaven.table_factory.html#deephaven.table_factory.DynamicTableWriter) for writing data to a real-time, in-memory table.

## Syntax

```python syntax
DynamicTableWriter(col_defs: dict) -> DynamicTableWriter
```

## Parameters

<ParamTable>
<Param name="col_defs" type="dict">

The column definitions. Each column name should have a 1-to-1 correspondence with its data type.

</Param>
</ParamTable>

## Returns

A [`DynamicTableWriter`](https://deephaven.io/core/pydoc/code/deephaven.table_factory.html#deephaven.table_factory.DynamicTableWriter).

## Methods

`DynamicTableWriter` supports the following methods:

- [`close()`](<https://deephaven.io/core/javadoc/io/deephaven/engine/utils/DynamicTableWriter.html#close()>) - Closes the [`TableWriter`](https://deephaven.io/core/javadoc/io/deephaven/tablelogger/TableWriter.html).
- [`write_row(values...)`](<https://deephaven.io/core/javadoc/io/deephaven/engine/utils/DynamicTableWriter.html#logRowPermissive(java.lang.Object...)>) - Writes a row of values to the table.

## Properties

- `.table` - The table that the [`TableWriter`](https://deephaven.io/core/javadoc/io/deephaven/tablelogger/TableWriter.html) will write to.

## Examples

In this example, `DynamicTableWriter` is used to create a table with two columns:

- The first contains the row number.
- The second contains a string.

```python order=result
from deephaven import DynamicTableWriter
import deephaven.dtypes as dht

import time

column_definitions = {"Numbers": dht.int32, "Words": dht.string}

table_writer = DynamicTableWriter(column_definitions)

result = table_writer.table

# The write_row method adds a row to the table
table_writer.write_row(1, "Testing")
time.sleep(3)
table_writer.write_row(2, "Dynamic")
time.sleep(3)
table_writer.write_row(3, "Table")
time.sleep(3)
table_writer.write_row(4, "Writer")
```

![img](../../../assets/reference/create/DynamicTableWriter_ref1.png)

The example above writes data to `result` from the main thread. As a result, the Deephaven web interface will not display the `result` table until the script finishes execution.

The example below uses a dedicated thread to write data to the table. The Deephaven web interface immediately updates to display all `result` table changes.

```python order=result
from deephaven import DynamicTableWriter
import deephaven.dtypes as dht

import threading, time

column_definitions = {"Numbers": dht.int32, "Words": dht.string}

table_writer = DynamicTableWriter(column_definitions)

result = table_writer.table

# Define a function to write data to a table
def thread_func():
  strings = ["Testing", "Dynamic", "Table", "Writer"]
  for i in range(4):
      # The write_row method adds a row to the table
      table_writer.write_row(i + 1, strings[i])
      time.sleep(3)

# Run the thread that writes to the table

thread = threading.Thread(target=thread_func)
thread.start()
```

<LoopedVideo src={require('../../../assets/reference/create/DynamicTableWriter_ref2.mp4')} />

## Related documentation

- [How to use write data to a real-time in-memory table](../../../how-to-guides/dynamic-table-writer.md)
- [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/DynamicTableWriter.html)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table_factory.html?highlight=dynamictable#deephaven.table_factory.DynamicTableWriter)
