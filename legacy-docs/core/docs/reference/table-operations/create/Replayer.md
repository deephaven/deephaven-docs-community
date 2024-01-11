---
id: Replayer
title: TableReplayer
---

`TableReplayer` is used to replay historical data with timestamps in a new, in-memory table.

## Syntax

```python syntax
TableReplayer(start_time: Union[Instant, str], end_time: Union[Instant, str]) -> Replayer
```

## Parameters

<ParamTable>
<Param name="start_time" type="Union[Instant, str]">

Historical data start time.

</Param>
<Param name="end_time" type="Union[Instant, str]">

Historical data end time.

</Param>
</ParamTable>

## Returns

A `Replayer` object that can be used to replay historical data.

## Methods

`TableReplayer` supports the following methods:

- [`add_table()`](https://deephaven.io/core/pydoc/code/deephaven.replay.html?highlight=add_table#deephaven.replay.TableReplayer.add_table) - Registers a table for replaying and returns the associated replay table.
- [`start()`](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/replay/Replayer.html#start()>) - Starts replaying data.
- [`shutdown()`](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/replay/Replayer.html#shutdown()>) - Shuts the replayer down.

## Example

The following example creates some fake historical data with timestamps and then replays it.

```python order=result,replayed_result ticking-table
from deephaven import new_table
from deephaven.column import datetime_col, int_col
from deephaven.replay import TableReplayer
from deephaven.time import to_j_instant

result = new_table([
    datetime_col("DateTime", [to_j_instant("2000-01-01T00:00:01 ET"), to_j_instant("2000-01-01T00:00:03 ET"), to_j_instant("2000-01-01T00:00:06 ET")]),
    int_col("Number", [1, 3, 6])
])

start_time = to_j_instant("2000-01-01T00:00:00 ET")
end_time = to_j_instant("2000-01-01T00:00:07 ET")

result_replayer = TableReplayer(start_time, end_time)

replayed_result = result_replayer.add_table(result, "DateTime")

result_replayer.start()
```

## Related documentation

- [How to replay historical data](../../../how-to-guides/replay-data.md)
- [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/replay/Replayer.html)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.replay.html#deephaven.replay.TableReplayer)