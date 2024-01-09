---
id: partition-transform
title: How to transform partitioned tables
sidebar_label: Transform partitioned tables
---

This guide will show you how to transform partitioned tables via the [`transform`](../reference/table-operations/group-and-aggregate/transform.md) method. Transforming partitioned tables applies specified changes to _all_ constituent tables to produce a new partitioned table. If the underlying table changes, the transform is immediately propagated. Transformation functions can be used to create new columns, perform aggregations, and more.

This guide assumes you know how to partition a table into subtables. If you don't, read [How to use `partition_by`](./partition-by.md).

## Examples

The first example is broken into steps, whereas the second example is contained in a single block of code.

### Partition a table

To show how to modify all constituents of a partitioned table, we'll first partition a table into subtables.

```python test-set=1 order=source
from deephaven import empty_table

source = empty_table(5).update(["IntCol = i", "StrCol = `value`"])
result = source.partition_by(["IntCol"])
```

### Apply a transformation

A partitioned table transform uses a function with a single input and output: a table. The function is applied to all constituent tables to produce a new partitioned table.

When a function is used in a partitioned table transform, it _must_ perform table operations from within an [execution context](../conceptual/execution-context.md). This is because a transform can produce deferred results; the context ensures that the deferred results are evaluated safely. In the example below, the [systemic execution context](../conceptual/execution-context.md#systemic-vs-separate-executioncontext) is used.

The results of the transform aren't visible until a constituent table is retrieved.

```python test-set=1 order=null
from deephaven.execution_context import get_exec_ctx

ctx = get_exec_ctx()

def add_one(t):
    with ctx:
        return t.update(["IntCol2 = IntCol + 1"])

result_2 = result.transform(add_one)
```

### Retrieve a constituent table

To retrieve a constituent table, use [`get_constituent`](../reference/table-operations/partitioned-tables/get-constituent.md). Constituent tables are retrieved by their key. In this example, the key is `3`. Constituent table keys are always encapsulated in a list because a partitioned table can be partitioned by multiple key columns.

```python test-set=1 order=new_constituent
new_constituent = result_2.get_constituent([3])
```

## Putting it all together

```python order=result_3,source
from deephaven.execution_context import get_exec_ctx
from deephaven import empty_table
from deephaven import agg

import random, string

def rand_symbol() -> str:
    return random.choice(string.ascii_uppercase[:5])

source = empty_table(100).update(["Sym = rand_symbol()", "X = randomInt(0, 100)", "Y = randomDouble(-50.0, 50.0)"])

ctx = get_exec_ctx()

def apply_aggs(t):
    with ctx:
        return t.update(["Z = X % 5"]).agg_by(aggs=[agg.sum_(["SumX = X"]), agg.count_("Z"), agg.avg(["AvgY = Y"])], by=["Sym"])

partitioned_source = source.partition_by(by=["Sym"])

partitioned_result = partitioned_source.transform(func=apply_aggs)

result_3 = partitioned_result.get_constituent(["A"])
```

## Transforming with another Partitioned Table

If you have two partitioned tables, then you can perform a transform operation using constituents from the right-hand and left-hand side. The keys for the corresponding constituents in the two partitioned tables must match. This form of a partitioned transform permits joining the constituent tables.

:::caution
Each pair of constituents is processed independently of all other pairs, so care must be taken to ensure that join keys are consistent. For example, if you partition by column "A", but join on column "B" where some values of column "B" are in one partition and other values in another partition, then the Deephaven engine does not match those rows.
:::

In this example, the Partition column is used to partition the data. Based on the construction of the Partition column, it is known that each value of "X" is in exactly one partition. One common pattern to ensure that the desired values are in the same partition is to use a modulus operator on the hashcode of a column that identifies the row (e.g., on a Symbol or instrument ID).

```python order=result_4,source_left,source_right
from deephaven.execution_context import get_exec_ctx
from deephaven import empty_table
from deephaven import agg

import random, string

def rand_symbol() -> str:
    return random.choice(string.ascii_uppercase[:5])

source_left = empty_table(100).update(["Sym = rand_symbol()", "X = randomInt(0, 100)", "Y = randomDouble(-50.0, 50.0)", "Partition=X%10"])
source_right = empty_table(100).update(["X=i", "Partition=X%10", "Z=randomDouble(-100.0, 100.0)"])

ctx = get_exec_ctx()

def apply_join(t, t2):
    with ctx:
        return t.natural_join(t2, "X", "Z")

partitioned_source_left = source_left.partition_by(by=["Partition"])
partitioned_source_right = source_right.partition_by(by=["Partition"])

partitioned_result = partitioned_source_left.partitioned_transform(other=partitioned_source_right, func=apply_join)

result_4 = partitioned_result.get_constituent([1])
```

## Related documentation

- [How to partition a table into subtables](./partition-by.md)
- [How to create new columns in a table](./create-columns.md)
- [Execution context](../conceptual/execution-context.md)
- [`partition_by`](../reference/table-operations/group-and-aggregate/partitionBy.md)
- [`transform`](../reference/table-operations/group-and-aggregate/transform.md)
