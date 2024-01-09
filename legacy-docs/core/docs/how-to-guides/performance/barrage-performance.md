---
id: barrage-performance
title: How to use Barrage metrics for performance monitoring
sidebar_label: Use Barrage metrics
---

Barrage is the name of our IPC table transport. This is a guide of what statistics are recorded and how to access them.

## Accessing the Metrics Table

You can access these tables as follows:

```python order=null
import jpy

bpl = jpy.get_type("io.deephaven.extensions.barrage.BarragePerformanceLog").getInstance()
subs = bpl.getSubscriptionTable()
snaps = bpl.getSnapshotTable()
```

This is what the subscription table looks like when there are live subscriptions:
![img](../../assets/how-to/barragePerformance_subscriptions.png)

This is what the snapshot table looks like after processing a few requests:
![img](../../assets/how-to/barragePerformance_snapshots.png)

### Barrage Subscription Metrics Summary

Subscription statistics are presented in percentiles bucketed over a time period.

Here are the various metrics that are recorded by the deephaven-core server:

| Stat Type             | Sender / Receiver | Description                                                                         |
| --------------------- | ----------------- | ----------------------------------------------------------------------------------- |
| EnqueueMillis         | Sender            | The time it took to record changes that occurred during a single update graph cycle |
| AggregateMillis       | Sender            | The time it took to aggregate multiple updates within the same interval             |
| PropagateMillis       | Sender            | The time it took to deliver an aggregated message to all subscribers                |
| SnapshotMillis        | Sender            | The time it took to snapshot data for a new or changed subscription                 |
| UpdateJobMillis       | Sender            | The time it took to run one full cycle of the off-thread propagation logic          |
| WriteMillis           | Sender            | The time it took to write the update to a single subscriber                         |
| WriteMegabits         | Sender            | The payload size of the update in megabits                                          |
| DeserializationMillis | Receiver          | The time it took to read and deserialize the update from the wire                   |
| ProcessUpdateMillis   | Receiver          | The time it took to apply a single update during the update graph cycle             |
| RefreshMillis         | Receiver          | The time it took to apply all queued updates during a single udpate graph cycle     |

### Barrage Snapshot Metrics Summary

Snapshot statistics are presented once per request.

| Stat Type      | Description                                                             |
| -------------- | ----------------------------------------------------------------------- |
| QueueMillis    | The time it took waiting for a thread to process the request            |
| SnapshotMillis | The time it took to construct a consistent snapshot of the source table |
| WriteMillis    | The time it took to write the snapshot                                  |
| WriteMegabits  | The payload size of the snapshot in megabits                            |

## Related documentation

- [Interpret Barrage metrics](../../conceptual/barrage-metrics.md)
