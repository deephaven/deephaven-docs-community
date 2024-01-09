---
id: table-publisher
title: How to create and use a TablePublisher
sidebar_label: Use TablePublisher
---

This guide will show you how to create and use a [`TablePublisher`](../reference/table-operations/create/TablePublisher.md) in your queries. A `TablePublisher` creates a [blink table](../conceptual/table-types.md#blink) from added tables. Blink tables retain only the rows from the current update cycle. Upon entering a new update cycle, rows are cleared, and new data comes in.

[`TablePublisher`](../reference/table-operations/create/TablePublisher.md) is similar to [`DynamicTableWriter](./dynamic-table-writer.md) in that it writes data to an in-memory, real-time table.

<!-- TODO: Remove mention of DynamicTableWriter when it's removed from the API -->

Using [`TablePublisher`](../reference/table-operations/create/TablePublisher.md) generally follows a formula:

- Create the [`TablePublisher`](../reference/table-operations/create/TablePublisher.md) and its blink table.
- Add data to the blink table with [`add`](../reference/table-operations/create/TablePublisher.md#methods).

Optionally, you may also shut the publisher down.

More sophisticated uses will add steps but still follow the same basic formula.

## Example: Getting started

The following example creates a table with three columns (`X`, `Y`, and `Z`). The columns contain randomly generated integers and doubles.

```python test-set=1 order=my_table
from deephaven.stream.table_publisher import table_publisher
from deephaven import dtypes as dht
from deephaven import empty_table

coldefs = {"X": dht.int32, "Y": dht.double, "Z": dht.double}

def on_shutdown():
    print("Table publisher is shut down.")

my_table, publisher = table_publisher(name="My table", col_defs=coldefs, on_shutdown_callback=on_shutdown)

def add_table(n):
    publisher.add(empty_table(n).update(["X = randomInt(0, 10)", "Y = randomDouble(0.0, 1.0)", "Z = randomDouble(10.0, 100.0)"]))

def when_done():
    publisher.publish_failure(RuntimeError("Publisher shut down by user."))
```

Subsequent calls of `add_table` will add data to `my_table`.

```python test-set=1 order=my_table
add_table(10)
```

The `TablePublisher` can be shut down by calling [`publish_failure`](../reference/table-operations/create/TablePublisher.md#methods). In this case, the `when_done` function invokes it.

```python test-set=1 order=null
when_done()
```

## Example: threading

The following example adds new data to the Table Publisher with [`empty_table`](./empty-table.md) every second for 5 seconds using Python's [threading](https://docs.python.org/3/library/threading.html) module. Note how the current [execution context](../conceptual/execution-context.md) is captured and used in `thread_func`. Attempting to use a thread to add tables to the publisher without capturing an execution context will raise an error.

```python order=my_table
from deephaven.stream.table_publisher import table_publisher
from deephaven.execution_context import get_exec_ctx
from deephaven import dtypes as dht
from deephaven import empty_table
import asyncio, random, threading, time

coldefs = {"X": dht.int32, "Y": dht.double}


def shut_down():
    print("Shutting down table publisher.")


my_table, my_publisher = table_publisher(
    name="Publisher", col_defs=coldefs, on_shutdown_callback=shut_down
)


def when_done():
    my_publisher.publish_failure(RuntimeError("when_done invoked"))


def add_table(n):
    my_publisher.add(
        empty_table(n).update(["X = randomInt(0, 10)", "Y = randomDouble(-50.0, 50.0)"])
    )

ctx = get_exec_ctx()


def thread_func():
    with ctx:
        for i in range(5):
            add_table(random.randint(5, 10))
            time.sleep(1)


thread = threading.Thread(target=thread_func)
thread.start()
```

## Example: asyncio

The following code block uses asynchronous execution to pull crypto data from Coinbase's websocket feed. The asynchronous execution is used for ingesting the external data to minimize idle CPU time.

:::note
The [websockets](https://pypi.org/project/websockets/) package is required to run the code below.
:::

```python skip-test
from deephaven.stream.table_publisher import table_publisher, TablePublisher
from deephaven.column import string_col, double_col, datetime_col, long_col
from deephaven.dtypes import int64, string, double, Instant
from deephaven.time import to_j_instant
from deephaven.table import Table
from deephaven import new_table

import asyncio, json, websockets
from dataclasses import dataclass
from typing import Callable
from threading import Thread
from datetime import datetime
from concurrent.futures import CancelledError

COINBASE_WSFEED_URL = "wss://ws-feed.exchange.coinbase.com"

@dataclass
class Match:
    type: str
    trade_id: int
    maker_order_id: str
    taker_order_id: str
    side: str
    size: str
    price: str
    product_id: str
    sequence: int
    time: str

async def handle_matches(
    product_ids: list[str], message_handler: Callable[[Match], None]
):
    async for websocket in websockets.connect(COINBASE_WSFEED_URL):
        await websocket.send(
            json.dumps(
                {
                    "type": "subscribe",
                    "product_ids": product_ids,
                    "channels": ["matches"],
                }
            )
        )
        # Skip subscribe response
        await websocket.recv()
        # Skip the last_match messages
        for _ in product_ids:
            await websocket.recv()
        async for message in websocket:
            message_handler(Match(**json.loads(message)))

def to_table(matches: list[Match]):
    return new_table(
        [
            datetime_col("Time", [to_j_instant(x.time) for x in matches]),
            long_col("TradeId", [x.trade_id for x in matches]),
            string_col("MakerOrderId", [x.maker_order_id for x in matches]),
            string_col("TakerOrderId", [x.taker_order_id for x in matches]),
            string_col("Side", [x.side for x in matches]),
            double_col("Size", [float(x.size) for x in matches]),
            double_col("Price", [float(x.price) for x in matches]),
            string_col("ProductId", [x.product_id for x in matches]),
            long_col("Sequence", [x.sequence for x in matches]),
        ]
    )

def create_matches(
    product_ids: list[str], event_loop
) -> tuple[Table, Callable[[], None]]:

    on_shutdown_callbacks = []

    def on_shutdown():
        nonlocal on_shutdown_callbacks
        for c in on_shutdown_callbacks:
            c()

    my_matches: list[Match] = []

    def on_flush(tp: TablePublisher):
        nonlocal my_matches
        # We need to take a shallow copy to ensure we don't allow asyncio additions to
        # my_matches while we are in java (where we drop the GIL)
        my_matches_copy = my_matches.copy()
        my_matches.clear()
        tp.add(to_table(my_matches_copy))

    table, publisher = table_publisher(
        f"Matches for {product_ids}",
        {
            "Time": Instant,
            "TradeId": int64,
            "MakerOrderId": string,
            "TakerOrderId": string,
            "Side": string,
            "Size": double,
            "Price": double,
            "ProductId": string,
            "Sequence": int64,
        },
        on_flush_callback=on_flush,
        on_shutdown_callback=on_shutdown,
    )

    future = asyncio.run_coroutine_threadsafe(
        handle_matches(product_ids, my_matches.append), event_loop
    )

    def on_future_done(f):
        nonlocal publisher
        try:
            e = f.exception(timeout=0) or RuntimeError("completed")
        except CancelledError as c:
            e = RuntimeError("cancelled")
        publisher.publish_failure(e)

    future.add_done_callback(on_future_done)

    on_shutdown_callbacks.append(future.cancel)

    return table, future.cancel

my_event_loop = asyncio.new_event_loop()
Thread(target=my_event_loop.run_forever).start()

def subscribe_stats(product_ids: list[str]):
    blink_table, on_done = create_matches(product_ids, my_event_loop)
    return blink_table, on_done

t1, t1_cancel = subscribe_stats(["BTC-USD"])
t2, t2_cancel = subscribe_stats(["ETH-USD", "BTC-USDT", "ETH-USDT"])

# call these to explicitly cancel
# t1_cancel()
# t2_cancel()
```

![img](../assets/how-to/table-publisher-coinbase.gif)

## Related documentation

- [How to create an empty table](./empty-table.md)
- [Deephaven data types](../conceptual/data-types.md)
- [`empty_table`](../reference/table-operations/create/emptyTable.md)
- [`new_table`](../reference/table-operations/create/newTable.md)
- [Execution Context](../conceptual/execution-context.md)
- [Query Scope](../conceptual/query-scope-concept.md)
