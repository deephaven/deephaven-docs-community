---
id: barrage-metrics
title: Interpret Barrage metrics
---

Barrage is an extension of Apache Arrow Flight, with a particular focus on incrementally updating data sets.
This is a guide of what statistics Deephaven records on Barrage activity.

## Metrics overview

### Life of a Barrage update

1. UpdateGraphProcessor Source Table Updates

Barrage listens to UpdateGraphProcessor (UGP) changes from the source table. Whenever the source table ticks, Barrage
records `enqueueMillis`, the time it took to record relevant information.

```
///////////    ///////////    ///////////
// Delta // -> // Delta // -> // Delta //
///////////    ///////////    ///////////
```

2. `UpdateGraphProcessor.targetCycleDurationMillis` versus `barrage.minUpdateInterval`

The UGP ticks at an interval specified by the parameter `-DUpdateGraphProcessor.targetCycleDurationMillis`.
Barrage ticks at an interval specified by the parameter `-Dbarrage.minUpdateInterval` (ms). Barrage records
`AggregateMillis`, the time it took to coalesce all upstream updates into a single update.

```
/////////////////////
// Coalesced Delta //
/////////////////////
```

3. Synchronizing Barrage state to the UGP update cycle

New subscriptions and subscription changes require initializing table state built from a series of snapshots. Barrage
records `SnapshotMillis`, the time it took to retrieve a single snapshot. The generated snapshot occurs within the
stream of updates. Due to raciness on table updates versus acquiring a snapshot. There might be coalesced deltas on
either side (or both) of the snapshot.

```
/////////////////////    //////////////    /////////////////////
// Coalesced Delta // -> // Snapshot // -> // Coalesced Delta //
/////////////////////    //////////////    /////////////////////
```

4. Propagation to gRPC listeners

Each delta and snapshot is then propagated to subscribers. Barrage records `PropagateMillis`, the time it took to
pass the message to the list of listeners.

:::note

Barrage records `UpdateJobMillis`, the aggregate time it took to coalesce deltas, fetch the snapshot, propagate, and
housekeep.

:::

5. Writing to the OutputStream

Another thread writes the resulting bytes to the actual gRPC stream. Barrage records `WriteMillis`, the time it took to
drain the subscriber-specific filtered view of the update (including coalesced and snapshots) to the OutputStream.
Barrage records `WriteMegabits`, the number of megabits (Mb) that were written on a single message. The choice to record this
in Mb is for easy comparison against the bandwidth allowed by the connected hardware.

6. Receiver bundles gRPC messages into an update (coalesced or snapshot)

Barrage records `DeserializationMillis`, the time it took to read and parse the data from the InputStream to assemble
an entire barrage message.

```
/////////////////////////    /////////////////////////    /////////////////////////
// Deserializied Delta // -> // Deserializied Delta // -> // Deserializied Delta //
/////////////////////////    /////////////////////////    /////////////////////////
```

7. Receiver bundles gRPC messages into an update (coalesced or snapshot)

Barrage records `ProcessUpdateMillis`, the amount of time it took to apply a single deserialized delta.

The Barrage Table refreshes once per the `-DUpdateGraphProcessor.targetCycleDurationMillis` interval. Potentially,
many messages have arrived over the wire during this time. Barrage records `RefreshMillis`, the amount of time it took
to coalesce deltas and to propagate the result to any receiver-side table listeners.

### Life of a snapshot

In addition to subscribing to ticking data, we support fetching a full synchronized snapshot of a table. This enables
functionality such as Arrow FlightService's `DoGet`.

1. Request is received and queued

The snapshot request is queued for processing. Barrage records `QueueMillis`, the time the message queued waiting for
an available thread to satisfy the snapshot request.

2. The snapshot is constructed

The snapshot request is then fulfilled. The process typically can occur concurrently with the UGP, but
larger snapshots may require holding the UGP exclusive lock. Barrage records `SnapshotMillis`, the time it took to
construct the snapshot for the listener.

Similar to subscription requests, Barrage records `WriteMillis` and `WriteMegabits`, the time it took to write and how
many Mb were written.

## Identifying a table

Tables are identified by their `TableId` and `TableKey`. The `TableId` is determined by the source table's
`System.identityHashCode()`. The `TableKey` defaults to `Table#getDescription()` but can be overridden by setting a
table attribute (`withAttributes`).

```python order=null
import jpy
from deephaven import empty_table

t = empty_table(0)
table = jpy.get_type("io.deephaven.engine.table.Table")
attr_table = t.with_attributes({ table.BARRAGE_PERFORMANCE_KEY_ATTRIBUTE: "MyTableKey" })
```

:::note

The web client applies transformations to every table that it subscribes to. If a table is also subscribed by a non-web
client then statistics for the original table and the transformed table will both appear in the metrics table. Their
`TableId` will differ. Most transformations clear the `TableKey` attribute, such as when a column is sorted or filtered
by the user through the GUI.

:::

## Extra configuration

Here are server side flags that change the behavior of Barrage metrics.

- `-DBarragePerformanceLog.enableAll`: record metrics for tables that do not have an explicit `TableKey` (default: `true`)
- `-DBarragePerformanceLog.cycleDurationMillis`: the interval to flush aggregated statistics (default: `60000` - once per minute)

## Related documentation

- [How to use Barrage metrics for performance monitoring](../how-to-guides/performance/barrage-performance.md)
