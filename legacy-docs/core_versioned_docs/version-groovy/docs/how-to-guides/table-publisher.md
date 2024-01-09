---
id: table-publisher
title: How to create and use a TablePublisher
sidebar_label: Use TablePublisher
---

This guide will show you how to create and use a [`TablePublisher`](../reference/table-operations/create/TablePublisher.md) in your queries. A `TablePublisher` creates a [blink table](../conceptual/table-types.md/#blink) from added tables. Blink tables retain only the rows from the current update cycle. Upon receipt of new data, rows are cleared, and the new data is published.

[`TablePublisher`](../reference/table-operations/create/TablePublisher.md) is similar to [`DynamicTableWriter`](./dynamic-table-writer.md) in that it writes data to an in-memory, real-time table.

Using [`TablePublisher`](../reference/table-operations/create/TablePublisher.md) generally follows a formula:

- Create the [`TablePublisher`](../reference/table-operations/create/TablePublisher.md) and its blink table.
- Add data to the blink table with [`add`](../reference/table-operations/create/TablePublisher.md#methods).

Optionally, you may also shut the publisher down.

More sophisticated uses will add steps but still follow the same basic formula.

## Example: Getting started

The following example creates a table with three columns (`X`, `Y`, and `Z`). The columns contain randomly generated integers and doubles.

```groovy test-set=1 order=myTable
import io.deephaven.csv.util.MutableBoolean
import io.deephaven.engine.table.ColumnDefinition
import io.deephaven.engine.table.TableDefinition
import io.deephaven.stream.TablePublisher

definition = TableDefinition.of(
    ColumnDefinition.ofInt("X"),
    ColumnDefinition.ofDouble("Y")
)

shutDown = {println "Finished."}

onShutdown = new MutableBoolean()

myPublisher = TablePublisher.of("My Publisher", definition, null, shutDown)

myTable = myPublisher.table()
```

Add data to the blink table by calling the [`add`](../reference/table-operations/create/TablePublisher.md#methods) method.

```groovy test-set=1 order=source
myPublisher.add(emptyTable(5).update("X = randomInt(0, 10)", "Y = randomDouble(0.0, 100.0)"))
```

The table publisher can be shut down by calling [`publishFailure`](../reference/table-operations/create/TablePublisher.md#methods).

```groovy test-set=1 order=null
myPublisher.publishFailure(new RuntimeException("User shut down."))
```

## Example: threading

<!-- TODO: Link to execution context doc -->

The following example adds new data to the publisher with [`emptyTable`](./empty-table.md) every second for 5 seconds in a separate thread. Note how the current [execution context](../conceptual/execution-context.md) is captured and used to add data to the publisher. Attempting to perform table operations in a separate thread without specifying an [execution context](../conceptual/execution-context.md) will raise an exception.

```groovy order=myTable
import io.deephaven.engine.context.ExecutionContext
import io.deephaven.csv.util.MutableBoolean
import io.deephaven.engine.table.ColumnDefinition
import io.deephaven.engine.table.TableDefinition
import io.deephaven.stream.TablePublisher
import io.deephaven.util.SafeCloseable

definition = TableDefinition.of(
    ColumnDefinition.ofInt("X"),
    ColumnDefinition.ofDouble("Y")
)

shutDown = { -> println "Finished."}

onShutdown = new MutableBoolean()

myPublisher = TablePublisher.of("My Publisher", definition, null, shutDown)

myTable = myPublisher.table()

defaultCtx = ExecutionContext.getContext()

myFunc = { ->
    try (SafeCloseable ignored = defaultCtx.open()) {
        Random rand = new Random()
        for (int i = 0; i < 5; ++i) {
            myPublisher.add(emptyTable(5).update("X = randomInt(0, 10)", "Y = randomDouble(0.0, 100.0)"))
        }
        sleep(1000)
        return
    }
}

thread = new Thread(myFunc).start()
```

## Related documentation

- [How to create an empty table](./empty-table.md)
- [Deephaven table types](../conceptual/table-types.md)
- [execution context](../conceptual/execution-context.md)
- [query scope](../conceptual/queryscope-conceptual.md)
- [`empty_table`](../reference/table-operations/create/emptyTable.md)
- [`new_table`](../reference/table-operations/create/newTable.md)
