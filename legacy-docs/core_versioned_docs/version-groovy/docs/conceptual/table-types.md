---
id: table-types
title: Table types
---

There are three different basic types of Deephaven tables: append-only, blink, and ring.

## Append-only

Append-only tables add rows to the end of the table as new data comes in. Rows from all previous update cycles are kept and are immutable. Append-only is the default table type outside of Kafka stream ingestion.

Append-only tables are useful when your use case needs a “full history” of every record ingested from the stream. However, because these tables keep all their rows, table size and memory consumption grow without constraint.

## Blink

Blink tables keep only the set of rows received during the current update cycle. Users can create blink tables when ingesting Kafka streams or creating time tables.

Blink tables form the basis for more advanced use cases when used in combination with stateful table aggregations like last_by. For streaming tables without any downstream table operations, aggregations, or listeners, the new messages will appear as rows in the table for one update graph cycle, then disappear on the next update graph cycle. Visually, if you look at a blink table rendered in the UI, you will see that the rows show up and stay for one second (the default Barrage update propagation period), and then disappear to be replaced by new rows.
Blink tables are the default table type for Kafka ingestion within Deephaven because of their low memory use. They are most useful if you want to aggregate your data, derive other tables, or use programmatic listeners to react to data.

Aggregation operations such as [`aggBy`](../reference/table-operations/group-and-aggregate/aggBy.md) and [`countBy`](../reference/table-operations/group-and-aggregate/countBy.md) operate with special semantics on blink tables, allowing the result to aggregate over the entire observed stream of rows from the time the operation is initiated. That means, for example, that a [`sumBy`](../reference/table-operations/group-and-aggregate/sumBy.md) on a blink table will contain the result sums for each aggregation group over all observed rows since the [`sumBy`](../reference/table-operations/group-and-aggregate/sumBy.md) was applied, rather than just the sums for the current update cycle. This allows for aggregations over the full history of a stream to be performed with greatly reduced memory costs when compared to the alternative strategy of holding the entirety of the stream as an in-memory table.

Most operations on blink tables behave exactly as they do on other tables (see the [exclusions below](#unsupported-operations)); that is, add and remove operations are processed as normal. For example, [`select`](../reference/table-operations/select/select.md) on a blink table will have only the newly added rows from the current update cycle.

Because Deephaven does not need to keep all the history of rows read from the input stream in memory, table operations on blink tables may require less memory.

### Unsupported operations

Attempting to use the following operations on a blink table will raise an error:

- [`groupBy`](../reference/table-operations/group-and-aggregate/groupBy.md)
- [`partitionBy`](../reference/table-operations/group-and-aggregate/partitionBy.md)
- [`treeTable`](../reference/table-operations/create/treeTable.md)
- [`headPct`](../reference/table-operations/filter/head-pct.md)
- [`taiPct`](../reference/table-operations/filter/tail-pct.md)
- [`slice`](../reference/table-operations/filter/slice.md)
- [`slicePct`](../reference/table-operations/filter/slice-pct.md)
- [`aggBy`](../reference/table-operations/group-and-aggregate/aggBy.md) if either `group` or `partition` is used.
- [`rollup`](../reference/table-operations/create/rollupTable.md) if `includeConstituents=true`.

:::tip To disable blink table semantics, use [`removeBlink`](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/Table.html#removeBlink()>), which returns a child table that is identical to the parent blink table in every way, but is no longer marked for special blink table semantics. The resulting table will still exhibit the “blink” table update pattern, removing all previous rows on each cycle, and thus only containing “new” rows.
:::

## Ring

Ring tables retain the latest `N` number of rows from the parent table or stream. If an update cycle causes the table to grow to more than `N` rows, the oldest rows are removed until only `N` remain. Deephaven expects to handle blink or add-only tables, which means that any deleted rows in the parent table will be ignored, and any updated rows will raise an exception.

A ring table is semantically the same as any other streaming table, meaning it does not get special treatment in aggregations the way blink tables do. However, operations use less memory because ring tables dispose of old data. Ring tables are mostly used with blink tables, which do not retain their own data for more than an update cycle. For example, a ring table of a blink time table could preserve the last 24 hours of data.

## Related documentation

- [Create a time table](../how-to-guides/time-table.md)
- [Kafka basic terminology](./kafka-basic-terms.md)
