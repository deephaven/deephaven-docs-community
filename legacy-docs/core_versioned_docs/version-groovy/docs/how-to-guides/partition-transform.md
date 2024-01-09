---
id: partition-transform
title: How to transform partitioned tables
sidebar_label: Transform partitioned tables
---

This guide will show you how to transform partitioned tables via the `transform` method. Transforming partitioned tables applies specified changes to _all_ constituent tables to produce a new partitioned table. If the underlying table changes, the transform is immediately propagated.

This guide assumes you know how to partition a table into subtables. If you don't, read [How to use `partitionBy`](./partition-by.md).

## Examples

The first example is broken into steps, whereas the second example is contained in a single block of code.

### Partition a table

To show how to modify all constituents of a partitioned table, we'll first partition a table into subtables.

```groovy test-set=1 order=source
source = emptyTable(5).update("IntCol = i", "StrCol = `value`")
result = source.partitionBy("IntCol")
```

### Apply a tranformation

A partitioned table transform uses a [unary operator](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/UnaryOperator.html) that takes a table as input and returns a table. The operator is applied to all constituent tables to produce a new partitioned table.

When performing table operations that will be applied via a partitioned table transform, they _must_ be done from within an [execution context](../conceptual/execution-context.md). This is because a transform can produce deferred results; the context ensures that the deferred results are evaluated safely. In the example below, the [systemic execution context](../conceptual/execution-context.md#systemic-vs-separate-executioncontext) is used.

The results of the transform aren't visible until a constituent table is retrieved.

```groovy test-set=1 order=null
import io.deephaven.engine.context.ExecutionContext
import io.deephaven.util.SafeCloseable

ctx = ExecutionContext.getContext()

addOne = { t ->
    try (SafeCloseable ignored = ctx.open()) {
        return t.update("IntCol2 = IntCol + 1")
    }
}

result2 = result.transform(addOne)
```

### Retrieve a constituent table

<!-- TODO: Add link to constituentFor -->

To retrieve a constituent table, use `constituentFor`. Constituent tables are retrieved by their key. In this example, the key is `3`. If a partitioned table was created with more than one key, the keys must be comma-separated.

```groovy test-set=1 order=newConstituent
newConstituent = result2.constituentFor(3)
```

## Putting it all together

```groovy order=source,resultA
import static io.deephaven.api.agg.Aggregation.AggCount
import static io.deephaven.api.agg.Aggregation.AggAvg
import static io.deephaven.api.agg.Aggregation.AggSum
import io.deephaven.engine.context.ExecutionContext
import io.deephaven.util.SafeCloseable

import org.apache.commons.lang.RandomStringUtils

Random random = new Random()

randSymbol = { ->
    return RandomStringUtils.random(1, 'ABCDE')
}

source = emptyTable(100).update("Sym = (String)randSymbol()", "X = randomInt(0, 100)", "Y = randomDouble(-50.0, 50.0)")

ctx = ExecutionContext.getContext()

applyAggs = { t ->
    try (SafeCloseable ignored = ctx.open()) {
        return t.update("Z = X % 5").aggBy([AggSum("SumX = X"), AggCount("Z"), AggAvg("AvgY = Y")], "Sym")
    }
}

partitionedSource = source.partitionBy("Sym")

partitionedResult = partitionedSource.transform(applyAggs)

resultA = partitionedResult.constituentFor("A")
```

The following example is identical to the one above, except that the overloaded [`transform`](../reference/table-operations/group-and-aggregate/transform.md) is used, which takes the execution context as input. Thus, the table operation in the closure does not need to be performed inside of a try-with-resources block.

```groovy order=source,resultA
import static io.deephaven.api.agg.Aggregation.AggCount
import static io.deephaven.api.agg.Aggregation.AggAvg
import static io.deephaven.api.agg.Aggregation.AggSum
import io.deephaven.engine.context.ExecutionContext

import org.apache.commons.lang.RandomStringUtils

Random random = new Random()

randSymbol = { ->
    return RandomStringUtils.random(1, 'ABCDE')
}

source = emptyTable(100).update("Sym = (String)randSymbol()", "X = randomInt(0, 100)", "Y = randomDouble(-50.0, 50.0)")

ctx = ExecutionContext.getContext()

applyAggs = { t ->
    return t.update("Z = X % 5").aggBy([AggSum("SumX = X"), AggCount("Z"), AggAvg("AvgY = Y")], "Sym")
}

partitionedSource = source.partitionBy("Sym")

partitionedResult = partitionedSource.transform(ctx, applyAggs, false)

resultA = partitionedResult.constituentFor("A")
```

## Related documentation

- [How to partition a table into subtables](./partition-by.md)
- [How to create new columns in a table](./create-columns.md)
- [Execution context](../conceptual/execution-context.md)
- [`partitionBy`](../reference/table-operations/group-and-aggregate/partitionBy.md)
- [`transform`](../reference/table-operations/group-and-aggregate/transform.md)
