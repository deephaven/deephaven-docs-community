---
id: choose-select-view-update
title: Choose the right selection method for your query
sidebar_label: Choose the right selection method
---

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { vsCheck, vsChromeClose } from '@deephaven/icons';

export const Check = ()=><FontAwesomeIcon icon={vsCheck} className="text--success" />

export const RedX = ()=><FontAwesomeIcon icon={vsChromeClose} className="text--danger" />

The Deephaven API offers various methods for selecting, updating, eliminating, modifying, and creating columns of data in tables. Your choice of method can have a big impact on query performance. Thus, it's important to understand which to choose for your query and why.

Before we dive into the methods, consider the following questions for a table operation:

1. Do I need some or all of the data from a source table in a new table?
2. How much new data will I create from my table operation?
3. How expensive are the calculations used to create a new column in the new table?
4. How many calculations will I need to perform downstream that use data created by one of these methods?
5. How expensive are the downstream calculations I will need to perform on the new data in the new table?

The following table showcases Deephaven's five selection methods and highlights the differences between them.

<table className="text--center">
  <thead>
    <tr>
      <th colSpan="1"></th>
      <th colSpan="2">Source columns in new table</th>
      <th colSpan="3">New column type</th>
    </tr>
    <tr>
      <th>Method Name</th>
      <th>Subset</th>
      <th>All</th>
      <th>In-memory</th>
      <th>Formula</th>
      <th>Memoized</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row" ><a href="https://deephaven.io/core/docs/reference/table-operations/select/select">select</a></td>
      <td><Check/></td>
      <td><RedX/></td>
      <td><Check/></td>
      <td><RedX/></td>
      <td><RedX/></td>
    </tr>
    <tr>
      <td scope="row" ><a href="https://deephaven.io/core/docs/reference/table-operations/select/view">view</a></td>
      <td><Check/></td>
      <td><RedX/></td>
      <td><RedX/></td>
      <td><Check/></td>
      <td><RedX/></td>
    </tr>
    <tr>
      <td scope="row" ><a href="https://deephaven.io/core/docs/reference/table-operations/select/update">update</a></td>
      <td><RedX/></td>
      <td><Check/></td>
      <td><Check/></td>
      <td><RedX/></td>
      <td><RedX/></td>
    </tr>
    <tr>
      <td scope="row" ><a href="https://deephaven.io/core/docs/reference/table-operations/select/update-view">updateView</a></td>
      <td><RedX/></td>
      <td><Check/></td>
      <td><RedX/></td>
      <td><Check/></td>
      <td><RedX/></td>
    </tr>
    <tr>
      <td scope="row" ><a href="https://deephaven.io/core/docs/reference/table-operations/select/lazy-update">lazyUpdate</a></td>
      <td><RedX/></td>
      <td><Check/></td>
      <td><RedX/></td>
      <td><RedX/></td>
      <td><Check/></td>
    </tr>
  </tbody>
</table>

# Source columns in the new table

## Subset

The user chooses which source columns to include in the new table. [`select`](../reference/table-operations/select/select.md) and [`view`](../reference/table-operations/select/view.md) both allow the user to choose a subset of columns to take from the source table. Both also allow new columns to be added.

```groovy order=source,resultSelect,resultView
source = emptyTable(5).update("X = ii", "Y = sqrt(i)", "Z = ii * ii")
resultSelect = source.select("X", "Y", "A = X + Y")
resultView = source.view("X", "Z", "B = X + Z")
```

## All

All columns from the source table are in the new table. [`update`](../reference/table-operations/select/update.md), [`updateView`](../reference/table-operations/select/update-view.md), and [`lazyUpdate`](../reference/table-operations/select/lazy-update.md) all create a new table, plus new columns specified in the method call.

```groovy order=source,resultUpdate,resultUpdateView,resultLazyUpdate
source = emptyTable(5).update("X = ii")
resultUpdate = source.update("Y = X * X")
resultUpdateView = source.updateView("Y = sqrt(X)")
resultLazyUpdate = source.lazyUpdate("Y = 2 * X")
```

# Column type

## In-memory

When an in-memory column is created, all cell values are computed and stored in memory. Any time cells in an in-memory column are accessed, the values are simply retrieved from memory.

The following methods create in-memory columns:

- [`select`](../reference/table-operations/select/select.md)
- [`update`](../reference/table-operations/select/update.md)

In the example below, a table called `source` is created, followed by two new tables called `resultSelect` and `resultUpdate`. In `resultSelect`, the new columns (`X` and `XSquared`) are in-memory columns. In `resultUpdate`, the new columns (`XSquared` and `YSquared`) are also in-memory columns.

```groovy order=source,resultSelect,resultUpdate
source = emptyTable(5).update(
    "X = ii",
    "Y = 9 - ii"
)

resultSelect = source.select(
    "X",
    "XSquared = X * X"
)

resultUpdate = source.update(
    "XSquared = X * X",
    "YSquared = Y * Y"
)
```

## Formula

A formula column does not store actual column values in memory. Rather, only the formulas needed to calculate new cell values are stored. Every time a cell is accessed, the calculations specified by the formula are performed to obtain the cell value.

The following methods create formula columns:

- [`view`](../reference/table-operations/select/view.md)
- [`updateView`](../reference/table-operations/select/update-view.md)

In the example below, a table called `source` is created, followed by two new tables called `resultView` and `resultUpdateView`. In `resultView`, the new columns (`X` and `XSquared`) are formula columns. In `resultUpdateView`, the new columns (`XSquared` and `YSquared`) are also formula columns.

```groovy order=source,resultView,resultUpdateView
source = emptyTable(5).update(
    "X = ii",
    "Y = 9 - ii"
)

resultView = source.view(
    "X",
    "XSquared = X * X"
)

resultUpdateView = source.updateView(
    "XSquared = X * X",
    "YSquared = Y * Y"
)
```

## Memoized

A memoized column stores the formula needed to calculate new cell values. Every time a cell is accessed, the value is retrieved from a cache of already computed values. If the result is not present in the cache, the cell value is computed and stored in the cache.

The column cache is a hash map, where keys are input column values. As a result, cache size is proportional to the number of unique input column values. If there are few input column values, the cache size will be small. If every row has unique input column values, the cache will be larger than using an in-memory column.

:::warning

Memoized columns should not be used with non-deterministic functions. For example, if a random number generator is used with a memoized column, the initial result is cached and returned for all future calls.

:::

The following method creates memoized columns:

- [`lazyUpdate`](../reference/table-operations/select/lazy-update.md)

In the example below, a table called `source` is created, followed by a new table called `resultLazyUpdate`. In `resultLazyUpdate`, the new columns (`XSqrt` and `XOffset`) are memoized columns. Initially, the caches are empty, but as cells are accessed, the cache is populated. Eventually, the `XSqrt` cache will contain the mappings `(0) -> sqrt(0)`, `(1) -> sqrt(1)`, and `(2) -> sqrt(2)`, and the `XOffset` cache will contain the mappings `(1) -> 11`, `(2) -> 12`, `(3) -> 13`.

```groovy order=source,resultLazyUpdate
source = emptyTable(5).update(
    "X = ii % 3"
)

resultLazyUpdate = source.lazyUpdate(
    "XSqrt = sqrt(X)",
    "XOffset = X + 11"
)
```

# Performance analysis

Column types can have a significant impact on query performance. In this section, we will dive deeper into what happens with different column types, and how they impact query performance. To illustrate how queries are affected, we will time how long some table operations take to execute. For simplicity, we will time execution using [`time`](https://docs.python.org/3/library/time.html) in Python and [`groovy.time`](https://docs.groovy-lang.org/latest/html/api/groovy/time/package-summary.html) in Groovy.

There are two cases studied here that illustrate how inputs to selection operations can affect performance:

- The first involves creating and operating on a table with no repeating column values.
- The second contains only a few unique values repeated many times.

## Case 1: Unique input values

### Make the initial table

This code creates an initial table with two in-memory columns of 10,000,000 rows each. The two columns contain the row index, and the row index + 1, respectively. All values are calculated once and stored in system memory.

```groovy test-set=1 order=null
import groovy.time.TimeCategory

t = emptyTable(10000000)

start = new Date()
initialTable = t.update(
    "X = ii",
    "Y = ii + 1"
)
end = new Date()
println "setup - Elapsed time: ${TimeCategory.minus(end, start)}."
```

It takes about two seconds to calculate and store 20 million values in system memory.

### In-memory columns vs formula columns vs memoized columns

The following code creates three new tables:

- The first has two new in-memory columns.
- The second has two new formula columns.
- The third has two new memoized columns.

Each operation is timed and the execution time is printed to the console.

```groovy test-set=1 order=null
start = new Date()
updatedTable = initialTable.update(
    "SqrtX = sqrt(X)",
    "SqrtY = sqrt(Y)"
)
end = new Date()
println "update - Elapsed time: ${TimeCategory.minus(end, start)}."

start = new Date()
updateViewedTable = initialTable.updateView(
    "SqrtX = sqrt(X)",
    "SqrtY = sqrt(Y)"
)
end = new Date()
println "updateView - Elapsed time: ${TimeCategory.minus(end, start)}."

start = new Date()
lazyUpdatedTable = initialTable.lazyUpdate(
    "SqrtX = sqrt(X)",
    "SqrtY = sqrt(Y)"
)
end = new Date()
println "lazyUpdate - Elapsed time: ${TimeCategory.minus(end, start)}."
```

None of these operations take very long, but what accounts for the differences in speed?

- The in-memory column is the slowest because it has to calculate and store 20 million new double values in system memory.
- The formula and memoized columns are very fast since they have only stored formulas in memory.

### Downstream operations

The code below performs a downstream [`select`](../reference/table-operations/select/select.md) to turn all columns into in-memory columns in the resulting table.

This is performed on all three types of columns, and the execution time for each is printed to the console.

```groovy test-set=1 order=null
start = new Date()
downstreamOnUpdate = updatedTable.select()
end = new Date()
println "select on update - Elapsed time: ${TimeCategory.minus(end, start)}."

start = new Date()
downstreamOnUpdateView = updateViewedTable.select()
end = new Date()
println "select on updateView - Elapsed time: ${TimeCategory.minus(end, start)}."

start = new Date()
downstreamOnLazyUpdate = lazyUpdatedTable.select()
end = new Date()
println "select on lazyUpdate - Elapsed time: ${TimeCategory.minus(end, start)}."
```

Here we see that the downstream [`select`](../reference/table-operations/select/select.md) is fastest on in-memory columns. Not only that, but the downstream [`select`](../reference/table-operations/select/select.md) on memoized columns is extremely slow. How come?

- When performing [`select`](../reference/table-operations/select/select.md) on in-memory columns, almost nothing has to be done, since the in-memory columns already exist.
- When performing [`select`](../reference/table-operations/select/select.md) on formula columns, the formulas must be evaluated on every source column.
- When performing [`select`](../reference/table-operations/select/select.md) on memoized columns, all source columns must be memoized. Once they are memoized, they are converted into in-memory columns. Memoizing millions of unique values is much slower than just calculating 20 million values.

## Case 2: Repeating input values

This code creates an initial table with two in-memory columns of 10,000,000 rows each. The two columns contain values from 0 to 4, and values from 0 to 2, respectively. Other than the input data values, Case 2 is identical to Case 1.

### Make the initial table

```groovy test-set=2 order=null
import groovy.time.TimeCategory

t = emptyTable(10000000)

start = new Date()
initialTable = t.update(
    "X = ii % 5",
    "Y = ii % 3"
)
end = new Date()
println "setup - Elapsed time: ${TimeCategory.minus(end, start)}."
```

It takes about two seconds to calculate and store 20 million values in system memory.

### In-memory columns vs formula columns vs memoized columns

The following code creates three new tables:

- The first has two new in-memory columns.
- The second has two new formula columns.
- The third has two new memoized columns.

Each operation is timed and the execution time is printed to the console.

```groovy test-set=2 order=null
start = new Date()
updatedTable = initialTable.update(
    "SqrtX = sqrt(X)",
    "SqrtY = sqrt(Y)"
)
end = new Date()
println "update - Elapsed time: ${TimeCategory.minus(end, start)}."

start = new Date()
updateViewedTable = initialTable.updateView(
    "SqrtX = sqrt(X)",
    "SqrtY = sqrt(Y)"
)
end = new Date()
println "updateView - Elapsed time: ${TimeCategory.minus(end, start)}."

start = new Date()
lazyUpdatedTable = initialTable.lazyUpdate(
    "SqrtX = sqrt(X)",
    "SqrtY = sqrt(Y)"
)
end = new Date()
println "lazyUpdate - Elapsed time: ${TimeCategory.minus(end, start)}."
```

None of these operations take very long, but what accounts for the differences in speed?

- The in-memory column is the slowest because it has to calculate and store 20 million new double values in system memory.
- The formula column is very fast because it only has to store 2 formulas in system memory.
- The memoized column is the fastest because it does not have to memoize any results just yet.

### Downstream operations

```groovy test-set=2 order=null
start = new Date()
downstreamOnUpdate = updatedTable.select()
end = new Date()
println "select on update - Elapsed time: ${TimeCategory.minus(end, start)}."

start = new Date()
downstreamOnUpdateView = updateViewedTable.select()
end = new Date()
println "select on updateView - Elapsed time: ${TimeCategory.minus(end, start)}."

start = new Date()
downstreamOnLazyUpdate = lazyUpdatedTable.select()
end = new Date()
println "select on lazyUpdate - Elapsed time: ${TimeCategory.minus(end, start)}."
```

Here we see again that the downstream [`select`](../reference/table-operations/select/select.md) is fastest on in-memory columns. This time, however, the downstream [`select`](../reference/table-operations/select/select.md) on memoized columns is signifcantly faster than it was in the first case. How come?

- When performing [`select`](../reference/table-operations/select/select.md) on in-memory columns, almost nothing has to be done, since the in-memory columns already exist.
- When performing [`select`](../reference/table-operations/select/select.md) on formula columns, the formulas must be evaluated on every source column.
- When performing [`select`](../reference/table-operations/select/select.md) on memoized columns, all source columns must be memoized. Once they are memoized, they are converted into in-memory columns. In this case, there are only 8 unique input values, so only 8 values are memoized. Even then, it is the slowest of the three. For more complex formulas with repeated data, memoized columns can outperform other column types.

# Summary

Let's summarize the key takeaways from what's been presented:

## Which columns do you want from the source table?

### Subset

- [`select`](../reference/table-operations/select/select.md) and [`view`](../reference/table-operations/select/view.md)

- Both methods allow users to specify which columns from the source table to include in the results table.

- Both methods allow users to create new columns derived from columns in the source table.

### All

- [`update`](../reference/table-operations/select/update.md), [`updateView`](../reference/table-operations/select/update-view.md), and [`lazyUpdate`](../reference/table-operations/select/lazy-update.md)

- All methods include all columns from the source table in the result table.

- All methods allow users to create new columns derived from columns in the source table.

## What column types do you want to create?

### In-memory

- [`select`](../reference/table-operations/select/select.md) and [`update`](../reference/table-operations/select/update.md) create new in-memory columns.

- In-memory columns are calculated once and stored in system memory.

- In-memory columns are best used when content is expensive to evaluate and accessed many times in downstream operations.

### Formula

- [`view`](../reference/table-operations/select/view.md) and [`updateView`](../reference/table-operations/select/update-view.md) create new formula columns.

- Formula columns store the formulas used to compute values.

- Values are calculated on-demand as they are accessed.

- Formula columns are best used when the formula is fast to compute or only small portions of column data are needed.

### Memoized

- [`lazyUpdate`](../reference/table-operations/select/lazy-update.md) creates new memoized columns.

- Memoized columns store formulas used to compute values.

- Values are retrieved from a cache. If values are not present in the cache, they are computed and cached. The formula inputs are used as the cache key, so the same inputs are never computed more than once.

- Memoized columns are best used on data with a small number of unique input values.

## Related documentation

- [How to select, view, and update data in tables](../how-to-guides/use-select-view-update.md)
- [`lazyUpdate`](../reference/table-operations/select/lazy-update.md)
- [`select`](../reference/table-operations/select/select.md)
- [`update`](../reference/table-operations/select/update.md)
- [`updateView`](../reference/table-operations/select/update-view.md)
- [`view`](../reference/table-operations/select/view.md)
- [Special variables](../reference/query-language/variables/special-variables.md)
