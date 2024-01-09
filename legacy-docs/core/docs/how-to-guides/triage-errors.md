---
id: triage-errors
title: How to triage errors in queries
sidebar_label: Triage errors in queries
---

This guide will show you how to interpret query errors and exception messages.

As with any programming language, when writing queries in Deephaven Query Language, you will certainly make mistakes. Mistakes will often result in queries failing to start up properly or crashing at some point during their runtime. Here, we provide a set of best practices to use when interpreting and fixing these issues.

## Simple triage

At this point, you have written some Deephaven queries that _should_ produce some interesting tables and visualizations, but when you attempt to run the query, it fails.

The first step is to find the error (referred to as an Exception) and isolate its root cause. This will usually appear in the log panel.

The log will display a large block of text that describes the exception and a chain of further exceptions that leads to the root of the problem.

:::tip

Identify the root cause by looking at the `caused by` statements. Start from the last exception in the chain and work backwards.

:::

For example, we'll start by creating a function that generates an error, then a table that invokes it, with the following commands:

```python should-fail
from deephaven import empty_table

def throw_func(val):
    raise RuntimeError("Error: " + val)

x = empty_table(1).update(formulas=["X = throw_func(i)"])
```

<details classname="error">
<summary>The query fails with the following error: </summary>

```
ERROR r-Scheduler-Serial-1 | i.d.g.s.SessionState | Internal Error 'be375af7-7beb-482d-bfa2-f9df183deaa3' java.lang.RuntimeException: Error in Python interpreter:
Type: <class 'RuntimeError'>
Value: io.deephaven.engine.table.impl.select.FormulaEvaluationException: In formula: X = throw_func.call(i)
at io.deephaven.temp.cm1184527913987228486v55_0.Formula.applyFormulaPerItem(Formula.java:173)
at io.deephaven.temp.cm1184527913987228486v55_0.Formula.lambda$fillChunkHelper$5(Formula.java:162)
	at io.deephaven.engine.rowset.RowSequence.lambda$forAllRowKeys$0(RowSequence.java:180)
	at io.deephaven.engine.rowset.impl.singlerange.SingleRangeMixin.forEachRowKey(SingleRangeMixin.java:14)
	at io.deephaven.engine.rowset.RowSequence.forAllRowKeys(RowSequence.java:179)
	at io.deephaven.temp.cm1184527913987228486v55_0.Formula.fillChunkHelper(Formula.java:159)
	at io.deephaven.temp.cm1184527913987228486v55_0.Formula.fillChunk(Formula.java:131)
	at io.deephaven.engine.table.impl.select.Formula.getChunk(Formula.java:158)
	at io.deephaven.engine.table.impl.sources.ViewColumnSource.getChunk(ViewColumnSource.java:232)
	at io.deephaven.engine.table.impl.select.analyzers.SelectColumnLayer.applyUpdate(SelectColumnLayer.java:121)
	at io.deephaven.engine.table.impl.QueryTable.lambda$selectOrUpdate$36(QueryTable.java:1362)
	at io.deephaven.engine.table.impl.perf.QueryPerformanceRecorder.withNugget(QueryPerformanceRecorder.java:515)
	at io.deephaven.engine.table.impl.QueryTable.lambda$selectOrUpdate$37(QueryTable.java:1336)
	at io.deephaven.engine.table.impl.QueryTable.memoizeResult(QueryTable.java:3116)
	at io.deephaven.engine.table.impl.QueryTable.selectOrUpdate(QueryTable.java:1335)
	at io.deephaven.engine.table.impl.QueryTable.update(QueryTable.java:1315)
	at io.deephaven.engine.table.impl.TableWithDefaults.update(TableWithDefaults.java:287)
	at org.jpy.PyLib.executeCode(Native Method)
	at org.jpy.PyObject.executeCode(PyObject.java:138)
	at io.deephaven.engine.util.PythonEvaluatorJpy.evalScript(PythonEvaluatorJpy.java:56)
	at io.deephaven.engine.util.PythonDeephavenSession.lambda$evaluate$1(PythonDeephavenSession.java:177)
	at io.deephaven.util.locks.FunctionalLock.doLockedInterruptibly(FunctionalLock.java:46)
	at io.deephaven.engine.util.PythonDeephavenSession.evaluate(PythonDeephavenSession.java:176)
	at io.deephaven.engine.util.AbstractScriptSession.evaluateScript(AbstractScriptSession.java:111)
	at io.deephaven.engine.util.DelegatingScriptSession.evaluateScript(DelegatingScriptSession.java:71)
	at io.deephaven.engine.util.ScriptSession.evaluateScript(ScriptSession.java:79)
	at io.deephaven.grpc_api.console.ConsoleServiceGrpcImpl.lambda$executeCommand$8(ConsoleServiceGrpcImpl.java:188)
	at io.deephaven.grpc_api.session.SessionState$ExportBuilder.lambda$submit$2(SessionState.java:1273)
	at io.deephaven.grpc_api.session.SessionState$ExportObject.doExport(SessionState.java:825)
at java.base/java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:515)
	at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:264)
	at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)
	at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)
at io.deephaven.grpc_api.runner.DeephavenApiServerModule$ThreadFactory.lambda$newThread$0(DeephavenApiServerModule.java:156)
at java.base/java.lang.Thread.run(Thread.java:829)
caused by java.lang.RuntimeException: Error in Python interpreter:
Type: <class 'TypeError'>
Value: can only concatenate str (not "int") to str
Line: 4
Namespace: throw_func
File: <string>
Traceback (most recent call last):
File "<string>", line 4, in throw_func

    at org.jpy.PyLib.callAndReturnObject(Native Method)
    at org.jpy.PyObject.callMethod(PyObject.java:432)
    at io.deephaven.engine.util.PythonScopeJpyImpl$CallableWrapper.call(PythonScopeJpyImpl.java:86)
    at io.deephaven.temp.cm1184527913987228486v55_0.Formula.applyFormulaPerItem(Formula.java:171)
    ... 34 more

Line: 6
Namespace: <module>
File: <string>
Traceback (most recent call last):
File "<string>", line 6, in <module>

        at org.jpy.PyLib.executeCode(PyLib.java:-2)
        at org.jpy.PyObject.executeCode(PyObject.java:138)
        at io.deephaven.engine.util.PythonEvaluatorJpy.evalScript(PythonEvaluatorJpy.java:56)
        at io.deephaven.engine.util.PythonDeephavenSession.lambda$evaluate$1(PythonDeephavenSession.java:177)
        at io.deephaven.util.locks.FunctionalLock.doLockedInterruptibly(FunctionalLock.java:46)
        at io.deephaven.engine.util.PythonDeephavenSession.evaluate(PythonDeephavenSession.java:176)
        at io.deephaven.engine.util.AbstractScriptSession.evaluateScript(AbstractScriptSession.java:111)
        at io.deephaven.engine.util.DelegatingScriptSession.evaluateScript(DelegatingScriptSession.java:71)
        at io.deephaven.engine.util.ScriptSession.evaluateScript(ScriptSession.java:79)
        at io.deephaven.grpc_api.console.ConsoleServiceGrpcImpl.lambda$executeCommand$8(ConsoleServiceGrpcImpl.java:188)
        at io.deephaven.grpc_api.session.SessionState$ExportBuilder.lambda$submit$2(SessionState.java:1273)
        at io.deephaven.grpc_api.session.SessionState$ExportObject.doExport(SessionState.java:825)
        at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:515)
        at java.util.concurrent.FutureTask.run(FutureTask.java:264)
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)
        at io.deephaven.grpc_api.runner.DeephavenApiServerModule$ThreadFactory.lambda$newThread$0(DeephavenApiServerModule.java:156)
        at java.lang.Thread.run(Thread.java:829)

```

</details>

These stack traces tend to be very large, but lead off with a summation of the underlying error, followed by a series of `caused by` statements that often provided the information you need to take action.

For example, the exception above can be reduced to this:

```none {2,4}
ERROR r-Scheduler-Serial-1 | i.d.g.s.SessionState      | Internal Error 'd5f6008f-ae4b-4484-8d43-7b50ed342da8' io.deephaven.engine.table.impl.select.FormulaEvaluationException: In formula: X = throwFunc.call(i)
caused by:
java.lang.RuntimeException: java.lang.IllegalStateException: Error: 0
caused by:
java.lang.IllegalStateException: Error: 0
```

When you interpret these exception chains, it's best to start from the last exception in the chain and work backwards. Let’s analyze this exception in that order:

- The lowest exception is an [`IllegalStateException`](https://docs.oracle.com/javase/7/docs/api/java/lang/IllegalStateException.html), since that is the innermost error in our `throwFunc` function. The error occurs when the table tries to compute a value for the `X` column and invokes our function.
- Just above, we see [`RuntimeException`](https://docs.oracle.com/javase/7/docs/api/java/lang/RuntimeException.html) as another 'caused by' statement because the [`IllegalStateException`](https://docs.oracle.com/javase/7/docs/api/java/lang/IllegalStateException.html) was passed as the argument to a [`RuntimeException`](https://docs.oracle.com/javase/7/docs/api/java/lang/RuntimeException.html).
- The top-level [`FormulaEvaluationException`](https://deephaven.io/core/javadoc/io/deephaven/engine/select/FormulaEvaluationException.html) is the point where the Deephaven engine recognized that it had an error it could not handle internally. Any sort of uncaught exception could have been in this position, but a [`FormulaEvaluationException`](https://deephaven.io/core/javadoc/io/deephaven/engine/select/FormulaEvaluationException.html) indicates that some specified formula had a problem. If you had a table with columns `A` and `B`, and you accidentally made a formula referencing column `Aa`, then you would also get a `FormulaEvaluationException`, because the Deephaven engine would be unable to find a column with that exact name.
- Note also that the exception lists the formula as `throwFunc.call(i)`, instead of `throwFunc(i)`, as it was written. This is because the Deephaven engine explicitly uses the `call` syntax when invoking Groovy closures.

This is a very simple example of triaging an equally simple query with deliberate errors. In practice, queries will be much more sophisticated and contain many interdependencies between tables. The recipe for triage, however, is the same.

See the sections below for examples of some common mistakes.

## Common mistakes

Once you've fixed the static problems, your query will start serving up tables and plots. Sometimes the query may crash unexpectedly during its normal runtime. These problems can be trickier to triage because they will often be related to unexpected streaming data patterns.

Your first steps should be the same as for a startup error:

1. Find the exception.
2. Reduce to its set of `caused by` expressions.
3. Start at the last one and work backwards.

The Console in the Deephaven IDE is a critical tool during this process. Once you've isolated the failing operation, you can execute parts of the query bit by bit to analyze the inputs to the failing method and experiment with changes to solve the problem.

Below we will discuss some of the most common categories of failure.

### Unexpected null values

It's easy to forget that columns can contain null values. If your queries don't account for this, they will fail with a [`NullPointerException`](https://docs.oracle.com/javase/7/docs/api/java/lang/NullPointerException.html).

The following shows a simple dataset consisting of a string column with a null value. It attempts to grab strings that start with `B` using the `charAt` method.

```python should-fail
from deephaven import new_table
from deephaven.column import string_col

table = new_table([
	string_col("Items", ["A", "B", None, "D"])
])

result = table.where(filters=["Items.charAt(0) == 'B'"])
```

This query will fail with the following error:

```none
io.deephaven.engine.table.impl.select.FormulaEvaluationException: java.lang.NullPointerException encountered in filter={ Items.charAt(0) == 'B' }
```

As discussed above, using the Console is a good way to inspect the tables for this condition.

In this case, we must check if the value we are trying to inspect is null:

```python order=table,result
from deephaven import new_table
from deephaven.column import string_col

table = new_table([
	string_col("Items", ["A", "B", None, "D"])
])

result = table.where(filters=["!isNull(Items) && Items.charAt(0) == 'B'"])
```

:::note

Adding [`!isNull(Items)`](../reference/query-language/query-library/isNull.md) to the start of our filter statement works because of boolean short circuiting. In this example, when [`!isNull(Items)`](../reference/query-language/query-library/isNull.md) is `false`, the query will stop evaulating the remainder of the [`where`](../reference/table-operations/filter/where.md) clause, meaning the problematic `Items.charAt(0) == 'B'` statement is never executed on a null value.

:::

### String and array access

Accessing [strings](../reference/query-language/types/strings.md) or [arrays](../reference/query-language/types/arrays.md) may also present difficulties. You may need to classify rows based upon the value of a character within a string of expected size; operations such as [`group_by`](../reference/table-operations/group-and-aggregate/groupBy.md) will produce cells that contain [arrays](../reference/query-language/types/arrays.md) of values. It's possible you might try to access a value in one of these types that does not exist.

The following example shows a simple dataset consisting of a [string column](../reference/table-operations/create/stringCol.md) with [strings](../reference/query-language/types/strings.md) of varying length. It attempts to grab [strings](../reference/query-language/types/strings.md) that have `i` as the second character.

```python should-fail
from deephaven import new_table
from deephaven.column import string_col
table = new_table([
	string_col("Items", ["Ai", "B", "Ci", "Da"])
])

result = table.where(filters=["Items.charAt(1) == 'i'"])
```

This query will fail with the following error:

```none {3}
io.deephaven.engine.table.impl.select.FormulaEvaluationException: java.lang.StringIndexOutOfBoundsException encountered in filter={ Items.charAt(1) == 'i' }

caused by java.lang.StringIndexOutOfBoundsException: String index out of range: 1
```

This says you're trying to get the second character in a string that does not _have_ two characters.

Why could this have happened?

- Looking closely, the query is trying to grab the second character from `Items`.
- There are strings in the `Items` column that do not have two or more characters in them.

We can inspect the table by adding a new column `ItemsLength = Items.length()`:

```python order=length
from deephaven import new_table
from deephaven.column import string_col
table = new_table([
    string_col("Items", ["Ai", "B", "Ci", "Da"])
])

length = table.update(formulas=["ItemsLength = Items.length()"])
```

To see rows where the string is less than two characters long, filter that table to only rows where `ItemsLength < 2` using the right-click menu results:

![img](../assets/how-to/errors/triage2.png)

Following the advice above, let's change the query to:

```python order=result
from deephaven import new_table
from deephaven.column import string_col

table = new_table([
    string_col("Items", ["Ai", "B", "Ci", "Da"])
])

result = table.where(filters=["Items.length() >= 2 && Items.charAt(1) == 'i'"])
```

This works due to Java's boolean short circuiting described above.

If you really only care about the presence of the `i` character in the string, a better solution is:

```python order=result
from deephaven import new_table
from deephaven.column import string_col
table = new_table([
    string_col("Items", ["Ai", "B", "Ci", "Da"])
])
result = table.where(filters=["Items.contains(`i`)"])
```

As always, use the Deephaven IDE to validate that this change works and produces the result you expect!

### Join key problems

Deephaven's join operations are one of its most powerful features. They merge tables together based upon matching parameters to produce new tables.

Some flavors of join are tolerant to the cardinality of key instances on the left and right hand sides, but some are not. [`natural_join`](../reference/table-operations/join/natural-join.md), for example, requires that there is no more than one right hand side key mapped to every left hand side key. This causes issues when the input data to a joined table does not adhere to these requirements. Below is a query that exhibits this behavior.

```python should-fail
from deephaven import new_table

from deephaven.column import string_col, int_col

left = new_table([
    string_col("LastName", ["Rafferty"]),
    int_col("DeptID", [31]),
    string_col("Telephone", ["(303) 555-0162"]),
])
right = new_table([
    int_col("DeptID", [31, 33, 34, 31]),
    string_col("DeptName", ["Sales", "Engineering", "Clerical", "Marketing"]),
    string_col("DeptTelephone", ["(303) 555-0136", "(303) 555-0162", "(303) 555-0175", "(303) 555-0171"])
])

result = left.natural_join(right, "DeptID")
```

Because `31` appears twice in the `DeptID` column in the right table, the following error will be thrown:

```none
java.lang.IllegalStateException: More than one right side mapping for 31
```

:::note

The next example contains the following clause:
`.where(new IncrementalReleaseFilter(0,1))`

This is simply to make the static (non-ticking) historical example data conform to the ticking patterns required to demonstrate each failure. See the [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/engine/select/IncrementalReleaseFilter.html) for more information.

:::

The following example uses CSV files taken from [Deephaven's examples repository](https://github.com/deephaven/examples).

```python should-fail
import jpy
from deephaven import read_csv
IncrementalReleaseFilter = jpy.get_type('io.deephaven.engine.table.impl.select.IncrementalReleaseFilter')

trades = read_csv("/data/examples/market/csv/trades.csv")\
    .where(filters=["Date=`2017-08-25`"])
quotes = read_csv("/data/examples/market/csv/quotes.csv")\
    .where(filters=["Date=`2017-08-25`"])

quotes_binned = quotes.update_view(formulas=["Bin=upperBin(Timestamp, MINUTE)"])
trades_binned = trades.update_view(formulas=["Bin=upperBin(Timestamp, MINUTE)"])


# Make this historical data into a live ticking table.
deephaven_bank_quotes = quotes_binned.where(filters=["Symbol=`DHB`"])\
    .where(IncrementalReleaseFilter(0,1))

deephaven_bank_trades = trades_binned.where(filters=["Symbol=`DHB`"])

joined = deephaven_bank_trades.natural_join(table=deephaven_bank_quotes, on=["Symbol,Bin"], joins=["BidExchange=Exchange,Bid,BidSize"])
```

This query joins the binned trade prices to the trades table to augment it with bid exchange, size, and price by Symbol and time bin. It eventually fails with the following error:

`java.lang.IllegalStateException: Duplicate right key for [DHB, 1503660240000000000]`

Why did this happen?

- We are binning quotes and trades in one minute intervals.
- This produces many potential matches for trades of a single Symbol.
- We use [`natural_join`](../reference/table-operations/join/natural-join.md) to join in quotes, binned in the same manner as trades.
  - [`natural_join`](../reference/table-operations/join/natural-join.md) requires there to be no more than one right hand side key mapped to a particular left hand side key.
  - `deephaven_bank_quotes` contains multiple `DHB` mappings for the same time bin.

We could change our binning interval, but that would likely result in the same issue. What we really need to do is guarantee that every Symbol, Bin pair in `quotes_binned_table` is unique. Let's use [`last_by`](../reference/table-operations/group-and-aggregate/lastBy.md).

```python should-fail
# Make this historical data into a live ticking table.
deephaven_bank_quotes = quotes_binned.where(filters=["Symbol=`DHB`"]) /
    .where(IncrementalReleaseFilter(0,1)) /
    .last_by(by=["Bin"])
```

Now the input to [`natural_join`](../reference/table-operations/join/natural-join.md) will have at most one entry on the right hand side.

Deephaven's other joins have their own specific input requirements, so if you encounter similar errors that reference join keys, search through your queries to ensure you're meeting these requirements. See our guide, [Choose a join method](../conceptual/choose-joins.md).

<!--TODO: link to Overview https://github.com/deephaven/deephaven.io/issues/474-->

### Unstable formulas

When query writing, you often want to derive a new column from data in several other columns. Let's say you accomplish this with [`update_view`](../reference/table-operations/select/update-view.md). [`update_view`](../reference/table-operations/select/update-view.md) creates columns that compute their values lazily, and do not store the result of the computation - that is, a value is recomputed every time a cell is accessed. Under most circumstances this is exactly what you want: computations are cheap and you can save on memory use. Problems can occur, however, when the result of this derived computation is used in downstream operations and the computation itself is not **stable**.

A formula is “stable” if it is guaranteed to compute the same value every time it is executed for a given set of inputs. If a formula is written that does not provide this guarantee, it can create issues in your query that are extremely difficult to detect and even harder to diagnose. In some cases, an unstable formula may not even crash the query, but produce incorrect results!

Take the query below:

```python {9} should-fail
from from deephaven import read_csv
IncrementalReleaseFilter = jpy.get_type("io.deephaven.engine.table.impl.select.IncrementalReleaseFilter")

trades = read_csv("/data/examples/market/csv/trades.csv")\
    .where(filters=["Date=`2017-08-25`"])\
    .sort(order_by=["Timestamp"])\
    .where(IncrementalReleaseFilter(0,1))\
    .sort(order_by=["Size"])\
    .update_view(formulas=["PreviousExchange=Exchange_[i-1]"])\
    .tail(10)

unstable = trades.maxBy("Symbol", "PreviousExchange")
```

This query tries to find maximums for each “Symbol, PreviousExchange” pair, where “PreviousExchange” is the value of the exchange column from the row immediately before the current one.

This query eventually produces an error like this:

`java.lang.IllegalStateException: Failed to find main aggregation slot for key [ABCD, Xyz]`

This means that a table operation that groups values by keys (a flavor of [`join`](../reference/table-operations/join/join.md), or [`group_by`](../reference/table-operations/group-and-aggregate/groupBy.md)) tried to update the value for a mapping that should have existed, but unexpectedly did not.

- Inspecting the query, there is a [`max_by`](../reference/table-operations/group-and-aggregate/maxBy.md) operation that depends on “Symbol” and “PreviousExchange”.

- If you search for where those columns are declared in the “trades” table, you find that “Symbol” came from the original data source, and “PreviousExchange” came from an [`update_view`](../reference/table-operations/select/update-view.md) operation.
- Also, “PreviousExchange” depends on the value of the Exchange column from the _previous row_.
- [`update_view`](../reference/table-operations/select/update-view.md) computes values lazily, and does not store results.
- This means that when the [`max_by`](../reference/table-operations/group-and-aggregate/maxBy.md) operation receives an update, “PreviousExchange” evaluates to **whatever the value of Exchange was in the previous row _at this moment in time_**.
- Therefore, the next time the formula is evaluated, the result is very likely to be different than it was now, especially if the table is sorted.

This can be easily fixed by changing the [`update_view`](../reference/table-operations/select/update-view.md) to an [`update`](../reference/table-operations/select/update.md). This will compute the value at that instant in time and store it so it will remain consistent.

```python {6} should-fail
trades = read_csv("/data/examples/market/csv/trades.csv")\
    .where(filters=["Date=`2017-08-25`"])\
    .sort(order_by=["Timestamp"])\
    .where(IncrementalReleaseFilter(0,1))\
    .sort(order_by=["Size"])\
    .update(formulas=["PreviousExchange=Exchange_[i-1]"])\
    .tail(10)
```

Be careful when using [`view`](../reference/table-operations/select/view.md) or [`update_view`](../reference/table-operations/select/update-view.md) to compute something that might change, like current time, a hashmap lookup, a random number, or a reference to a previous or following row.

:::

In summary:

- If you use any sort of changeable external value in a formula, such as a timestamp or a random number generator, use [`update`](../reference/table-operations/select/update.md) rather than [`update_view`](../reference/table-operations/select/update-view.md) so your value will only be stored once, not each time the Deephaven engine accesses that field. Using [`update`](../reference/table-operations/select/update.md) is not a cure-all. It is still up to you to ensure that preserving fixed data is correct for your use case, and that the logic for your joins works as intended.
- Be wary of using [`i`](../reference/query-language/variables/special-variables.md) in a ticking table.
- Be extremely wary of using any Deephaven special variables or mutable values in any join conditions.

### Out of memory

One of the most common problems with a query can be a lack of memory (referred to as heap) to handle a query as the data volume grows throughout the day. This occurs if enough heap is not allocated to your Deephaven instance but can be exacerbated by unexpected data patterns, like unusually large Kafka input. Most often this can be fixed by increasing the heap allocated to Deephaven, but an analysis of the query itself may yield improvements to the script that reduces overall heap usage.

<!--TODO: docker ram article https://github.com/deephaven/deephaven.io/issues/577 -->

Below is the most common example of Out Of Heap failures:

`Caused by: java.lang.OutOfMemoryError: Java heap space`

There are many ways to approach this problem and, in practice, resolution will require some combination of all of the techniques mentioned below.

The first, and simplest, action to take is to increase the heap allocated to your Java Virtual Machine. Using the Docker-based example provided by Deephaven in the [Docker install guide](../tutorials/docker-install.md), you could simply increase the amount of memory allocated to Docker, up to certain limits. If you are using the Docker-based example and want to adjust the memory allocation, please see the file `docker-compose-common.yml` in your Deephaven Core base directory.

For many workloads this will be enough. However, users must be aware that you may not get the results you expect when you increase memory across the 32GB boundary. Java uses address compression techniques to optimize memory usage when maximum heap size is smaller than 32GB. Once you request 32GB or more, this feature is disabled so that the program can access its entire memory space. This means that if you start with 30GB of heap and then increase the size to 32GB, you will have less heap available to your query.

:::tip

If you must cross the 32GB boundary, it is best to jump directly to 42GB to account for this.

:::

The next step is to review your query code.

- Look for places where you use [`update`](../reference/table-operations/select/update.md). Would [`update_view`](../reference/table-operations/select/update-view.md) be better? Keep in mind formula stability. The choice between [`update`](../reference/table-operations/select/update.md) and [`update_view`](../reference/table-operations/select/update-view.md) is a memory vs. CPU tradeoff. You will pay more in CPU time with [`update_view`](../reference/table-operations/select/update-view.md) in order to save on memory. For simple computations and transformations, this is often a very good tradeoff. See our guide, [Choose the right selection method](../conceptual/choose-select-view-update.md).
- Search for duplicate tables, or tables that only differ in column count. Try to re-use tables in derivative computations as much as possible to make use of the query's previous work. In most cases, Deephaven automatically recognizes duplicate computations and uses the original tables. However, it is best not to rely on this behavior and instead be explicit about what tables you derive from.
- When using Deephaven query expressions that group rows based on keys ([`partition_by`](../reference/table-operations/group-and-aggregate/partitionBy.md), [`group_by`](../reference/table-operations/group-and-aggregate/groupBy.md), and [`join`](../reference/table-operations/join/join.md) operations), pay close attention to the number of unique keys in the tables you apply these operations to. If keys are generally unique (`SaleID`, for example) within a table, then an operation like [`partition_by`](../reference/table-operations/group-and-aggregate/partitionBy.md) will produce potentially millions of single row tables that all consume some heap space in overhead. In these cases, consider if you can use different keys, or even a different set of Deephaven query operations.
- Carefully consider the order you execute Deephaven query expressions. It’s best to filter data before joining tables.
  - A very simple example is applying a [`join`](../reference/table-operations/join/join.md) and a [`where`](../reference/table-operations/filter/where.md) condition. If you were to execute ``derived = myTable.join(myOtherTable, “JoinColumn”).where(“FilterColumn=`FilterValue`)``, the [`join`](../reference/table-operations/join/join.md) operation consumes much more heap than it needs to, since it will take time matching rows from `myTable` that would later be filtered down in the [`where`](../reference/table-operations/filter/where.md) expression.
  - This query would be better expressed as ``derived = myTable.where(“FilterColumn=`FilterValue`).join(myOtherTable, “JoinColumn”)``. This saves in heap usage, but also reduces how many rows are processed in downstream tables (called ticks) when the left hand or right hand tables tick.

There are many other reasons that a query may use more heap than expected. This requires a deep analysis of how the query is performing at runtime. You may need to use a Java profiling tool (such as [JProfiler](https://www.ej-technologies.com/products/jprofiler/overview.html)) to identify poorly-performing sections of your code.

### Garbage Collection (GC) timeouts

GC timeouts are another type of heap-related problem. These occur when you have enough memory for your query, but lots of data is being manipulated in memory each time your data ticks. This can happen, for example, when performing a long series of query operations. This results in lots of temporary heap allocation to process those upstream ticks. When the upstream computations are done, the JVM can re-collect that memory for use in later calculations. This is called the 'Garbage Collection' phase of JVM processing. Garbage Collection consumes CPU time, which can halt your normal query processing and cause computations to back up even further.

This behavior is characterized by periodic long pauses as the JVM frees up memory. When this happens, look for ways to reduce your tick frequency.

:::note

See [How to reduce the update frequency of ticking tables](./reduce-update-frequency.md)

:::

## Get help

If you've gone through all of the steps to identify the root of a problem, but can’t find a cause in your query, you may have uncovered a bug. In this case, you should file a bug report at <https://github.com/deephaven/deephaven-core/issues>. Be sure to include the following with your bug report:

- The version of the Deephaven system.
- The complete stack trace, not just the list of `Caused By` expressions.
- A code snippet or a description of the query.
- Any logs from your user console or, if running Docker, from your terminal.
- Support logs exported from the browser. In the Settings menu, click the Export Logs button to download a zip with the browser logs and the current state of the application.

You can also get help by asking questions in our [GitHub Discussions](https://github.com/deephaven/deephaven-core/discussions/categories/q-a) forum.

## Appendix: Common errors in queries

1. Is your Deephaven query expression properly quoted?

- Expressions within Deephaven query statements such as [`where`](../reference/table-operations/filter/where.md) or [`update`](../reference/table-operations/select/update.md) must be surrounded by double quotes. For example, ``myTable.where(filters=["StringColumn=`TheValue`"])``.
- If you copy-pasted an expression from somewhere (e.g., Slack), some systems will copy a unicode double quotation (U+201C and U+201D) instead of an ASCII quotation (U+0022).

2. Do you have matching parentheses?

   - Make sure that any open parenthesis that you are using are matched by a close parenthesis.

3. If you are referring to a column in a Deephaven query expression:

   - Check the spelling and capitalization.
   - Is the type of the column what you expect it to be?
   - Did you account for null values?

4. If you are using strings in your expression, did you quote them properly?

   - Strings are quoted with the backtick character (`` ` ``), **not** single quotes (`‘`) or double quotes (`"`).
   - Do you have matching close quotes for your open quotes?

5. If you are using date-times in your expressions:

   - Did you use single quotes (`‘`), not double quotes (`“`) or backticks (`` ` ``)?
   - Did you use the proper format? Deephaven date-times are expected as `<yyyyMMDD>T<HH:mm:ss.nnnnnnnnn> <TZ>`.

6. Are all classes that you are trying to use properly imported?

   - will not search for classes Groovy that you use. If they are not part of the [standard set of Deephaven imports](https://github.com/deephaven/deephaven-core/blob/main/engine/table/src/main/java/io/deephaven/engine/table/lang/impl/QueryLibraryImportsDefaults.java), you must import them yourself.

# Related documentation

- [Create a new table](./new-table.md)
- [How to handle null, infinity, and not-a-number values](./handle-null-inf-nan.md)
- [How to join tables](./join-two-tables.md)
- [How to select, view, and update data in tables](./use-select-view-update.md)
- [How to work with strings](./work-with-strings.md)
- [Formulas](../reference/query-language/formulas/formulas.md)
- [Special variables](../reference/query-language/variables/special-variables.md)
