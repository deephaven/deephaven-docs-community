---
id: TablePublisher
title: TablePublisher
---

The `table_publisher` method creates a `TablePublisher`. A `TablePublisher` produces a [blink table](../../../conceptual/table-types.md#blink) from tables that are added to it via the [`add`](#methods) method.

## Syntax

```python syntax
table_publisher(
    name: str,
    col_defs: dict[str, DType],
    on_flush_callback: Callable[[TablePublisher], None] = None
    on_shutdown_callback: Callable[[], None] = None,
    update_graph: UpdateGraph = None,
    chunk_size: int = 2048
) -> TablePublisher
```

## Parameters

<ParamTable>
<Param name="name" type="str">

The name of the blink table.

</Param>
<Param name="col_defs" type="dict">

The blink table's column definitions.

</Param>
<Param name="on_flush_callback" type="Callable" optional>

The on-flush callback, if present, is called once at the beginning of each update graph cycle. It allows publishers to add any data they may have been batching. This blocks the update cycle from proceeding, so implements should take care not to do extraneous work. The default is `None`.

</Param>
<Param name="on_shutdown_callback" type="Callable" optional>

An on-shutdown callback method. It will be called once when the caller should stop adding new data and release any related resources. The default is `None`.

</Param>
<Param name="update_graph" type="UpdateGraph" optional>

The [update graph](https://deephaven.io/core/docs/conceptual/dag/) that the resulting table will belong to. The default is `None`, which uses the update graph of the current [execution context](../../../conceptual/execution-context.md).

</Param>
<Param name="chunk_size" type="int" optional>

The size at which chunks of data will be filled from the source table during an add. The default is 2048 bytes.

</Param>
</ParamTable>

## Returns

A [`TablePublisher`](https://deephaven.io/core/pydoc/code/deephaven.stream.table_publisher.html#deephaven.stream.table_publisher.TablePublisher).

## Methods

`TablePublisher` supports the following methods:

- [`add(table)`](https://deephaven.io/core/pydoc/code/deephaven.stream.table_publisher.html#deephaven.stream.table_publisher.TablePublisher.add) - Adds a snapshot of the data from `table` into the blink table. The table _must_ contain a superset of the columns from the blink table's definition. The columns can be in any order. Columns from `table` that are not in the blink table's definition are ignored.
- [`is_alive()`](https://deephaven.io/core/pydoc/code/deephaven.stream.table_publisher.html#deephaven.stream.table_publisher.TablePublisher.is_alive) - Checks if the table is alive. Returns `True` if the table is alive, and `False` otherwise.
- [`publish_failure(failure)`](https://deephaven.io/core/pydoc/code/deephaven.stream.table_publisher.html#deephaven.stream.table_publisher.TablePublisher.publish_failure) - Indicates that data publication has failed.

## Examples

The following example creates a `TablePublisher` with three columns. It adds a table with three rows using `add` and [`new_table`](./newTable.md).

```python order=my_blink_table
from deephaven.stream.table_publisher import table_publisher
from deephaven.column import int_col, float_col, string_col
from deephaven.dtypes import int32, float32, string
from deephaven import new_table


my_blink_table, my_publisher = table_publisher(
    "My Table",
    {
        "Name": string,
        "Age": int32,
        "Height": float32
    },
)


my_publisher.add(
    new_table(
        [
            string_col("Name", ["Foo", "Bar", "Baz"]),
            int_col("Age", [42, 22, 32]),
            float_col("Height", [5.5, 6.0, 6.5]),
        ]
    )
)
```

## Related documentation

- [How to create and use TablePublisher](../../../how-to-guides/table-publisher.md)
- [DynamicTableWriter](./DynamicTableWriter.md)
- [Execution Context](../../../conceptual/execution-context.md)
- [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/stream/TablePublisher.html)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.stream.table_publisher.html#deephaven.stream.table_publisher.TablePublisher)
