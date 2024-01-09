---
id: table-ops-cheat-sheet
title: Table operations cheat sheet
sidebar_label: Table operations
---

## Create tables

### Empty tables

- [`emptyTable`](../table-operations/create/emptyTable.md)

```groovy order=result,result1
result = emptyTable(5)

// Empty tables are often followed with a formula
result1 = result.update("X = 5")
```

### New tables

- [`newTable`](../table-operations/create/newTable.md)

Columns are created using the following methods:

- [`byteCol`](../table-operations/create/byteCol.md)
- [`booleanCol`](../table-operations/create/booleanCol.md)
- [`charCol` ](../table-operations/create/charCol.md)
- [`col`](../table-operations/create/col.md)
- [`instantCol`](../table-operations/create/instantCol.md)
- [`doubleCol`](../table-operations/create/doubleCol.md)
- [`floatCol`](../table-operations/create/floatCol.md)
- [`intCol`](../table-operations/create/intCol.md)
- [`longCol`](../table-operations/create/longCol.md)
- [`shortCol`](../table-operations/create/shortCol.md)
- [`stringCol`](../table-operations/create/stringCol.md)

```groovy
result = newTable(
    intCol("IntegerColumn", 1, 2, 3),
    stringCol("Strings", "These", "are", "Strings")
)
```

### Time tables

- [`timeTable`](../table-operations/create/timeTable.md)

The following code makes a `timeTable` that updates every second.

```groovy ticking-table
result = timeTable("PT00:00:01")
```

## Filter

:::tip

You should filter your data before performing other operations to optimize performance. Less data generally means better, faster queries.

:::

### where

:::tip

For SQL developers: In Deephaven, filter your data before joining using [`where`](../table-operations/filter/where.md) operations. Deephaven is optimized for filtering rather than matching.

:::

```groovy test-set=1 order=source,resultSingleFilter,resultOR,resultAND
import io.deephaven.api.filter.FilterOr
import io.deephaven.api.filter.Filter

source = newTable(
    stringCol("Letter", "A", "C", "F", "B", "E", "D", "A"),
    intCol("Number", NULL_INT, 2, 1, NULL_INT, 4, 5, 3),
    stringCol("Color", "red", "blue", "orange", "purple", "yellow", "pink", "blue"),
    intCol("Code", 12, 13, 11, NULL_INT, 16, 14, NULL_INT),
)

resultSingleFilter = source.where("Color = `blue`")
resultOR = source.where(FilterOr.of(Filter.from("Color = `blue`", "Number > 2"))) // OR operation - result will have _either_ criteria
resultAND = source.where("Color = `blue`", "Number > 2") // AND operation - result will have _both_ criteria
```

To filter results based on a `filterTable`:

- [`whereIn`](../table-operations/filter/where-in.md)
- [`whereNotIn`](../table-operations/filter/where-not-in.md)

```groovy test-set=1 order=filterTable,whereInColors,whereInColorsAndCodes,whereNotInColors
filterTable = newTable(
    stringCol("Colors", "blue", "red", "purple", "white"),
    intCol("Codes", 10, 12, 14, 16)
)

// returns a new table containing rows from the source table
whereInColors = source.whereIn(filterTable, "Color = Colors")
whereInColorsAndCodes = source.whereIn(filterTable, "Color = Colors", "Code = Codes") // AND operation - result will have both criteria
whereNotInColors = source.whereNotIn(filterTable, "Color = Colors")
```

### head and tail

Used to reduce the number of rows:

- [`tail`](../table-operations/filter/tail.md)
- [`tailPct`](../table-operations/filter/tail-pct.md)
- [`head`](../table-operations/filter/head.md)
- [`headPct`](../table-operations/filter/head-pct.md)

```groovy test-set=1 order=tail,tailPct,headPct,head
tail = source.tail(5) // returns last 5 rows
tailPct = source.tailPct(0.25) // returns last 25% of rows
headPct = source.headPct(0.75)  // returns last 75% of rows
head = source.head(2) // returns the first 2 rows
```

## Join data

See our guide [Choose the right join](../../conceptual/choose-joins.md) for more details.

:::tip

For SQL developers: in Deephaven, joins are normally used to enrich a data set, not filter. Use [`where`](../table-operations/filter/where.md) to filter your data instead of using a join.

:::

### Joins for close matches (time)

#### aj (As-Of Join)

[`aj`](../table-operations/join/aj.md)

As-of joins [`aj`](../table-operations/join/aj.md) find "the exact match" of the key or "the record just before". For timestamp aj-keys, this means "that time or the record just before".

`leftTable = rightTable.aj(columnsToMatch, columnsToAdd)`

```groovy test-set=2 order=trades,quotes,result
trades = newTable(
    stringCol("Ticker", "AAPL", "AAPL", "AAPL", "IBM", "IBM"),
    instantCol("TradeTime", parseInstant("2021-04-05T09:10:00 ET"), parseInstant("2021-04-05T09:31:00 ET"), parseInstant("2021-04-05T16:00:00 ET"), parseInstant("2021-04-05T16:00:00 ET"), parseInstant("2021-04-05T16:30:00 ET")),
    doubleCol("Price", 2.5, 3.7, 3.0, 100.50, 110),
    intCol("Size", 52, 14, 73, 11, 6)
)

quotes = newTable(
    stringCol("Ticker", "AAPL", "AAPL", "IBM", "IBM", "IBM"),
    instantCol("QuoteTime", parseInstant("2021-04-05T09:11:00 ET"), parseInstant("2021-04-05T09:30:00 ET"), parseInstant("2021-04-05T16:00:00 ET"), parseInstant("2021-04-05T16:30:00 ET"), parseInstant("2021-04-05T17:00:00 ET")),
    doubleCol("Bid", 2.5, 3.4, 97, 102, 108),
    intCol("BidSize", 10, 20, 5, 13, 23),
    doubleCol("Ask", 2.5, 3.4, 105, 110, 111),
    intCol("AskSize", 83, 33, 47, 15, 5),
)

result = trades.aj(quotes, "Ticker, TradeTime >= QuoteTime")
```

#### raj (Reverse As-Of Join)

[`raj`](../table-operations/join/raj.md)

Reverse As-of joins [`raj`](../table-operations/join/raj.md) find "the exact match" of the key or "the record just after". For timestamp reverse aj-keys, this means "that time or the record just after".

`result = leftTable.raj(rightTabke, columnsToMatch, columnsToAdd)`

```groovy test-set=2
result = trades.raj(quotes, "Ticker, TradeTime <= QuoteTime", "Bid, Offer = Ask")
```

### Joins with exact match

#### nj (Natural Join)

[`naturalJoin`](../table-operations/join/natural-join.md)

- Returns all the rows of the left table, along with up to one matching row from the right table.
- If there is no match in the right table for a given row, nulls will appear for that row in the columns from the right table.
- If there are multiple matches in the right table for a given row, the query will fail.

`leftTable.naturalJoin(rightTable, columnsToMatch, columnsToAdd)`

:::note

The right table of the join needs to have only one match based on the key(s).

:::

```groovy order=left,right,result
left = newTable(
    stringCol("LastName", "Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers", "DelaCruz"),
    intCol("DeptID", 31, 33, 33, 34, 34, 36, NULL_INT),
    stringCol("Telephone", "(303) 555-0162", "(303) 555-0149", "(303) 555-0184", "(303) 555-0125", "", "", "(303) 555-0160")
)

right = newTable(
    intCol("DeptID", 31, 33, 34, 35),
    stringCol("DeptName", "Sales", "Engineering", "Clerical", "Marketing"),
    stringCol("Telephone","(303) 555-0136", "(303) 555-0162", "(303) 555-0175", "(303) 555-0171")
)

result = left.naturalJoin(right, "DeptID", "DeptName, DeptTelephone = Telephone")
```

#### join

Similar to SQL inner join, [`join`](../table-operations/join/join.md) returns all rows that match between the left and right tables, potentially with duplicates.

- Returns only matching rows.
- Multiple matches will have duplicate values, which can result in a long table.

#### exactJoin

[`exactJoin`](../table-operations/join/exact-join.md)

- Returns all rows of `leftTable`.
- If there are no matching keys result will fail.
- Multiple matches will fail.

### Merge tables

Create a new table made of all of table 1, followed by all of table 2, etc. All tables must have the same column names (schema) when merged.

- [`merge`](../table-operations/merge/merge.md)
- [`mergeSorted`](../table-operations/merge/merge-sorted.md)

```groovy order=source1,source2,source3,result
source1 = newTable(col("Letter", "A", "B", "D"), col("Number", 1, 2, 3))
source2 = newTable(col("Letter", "C", "D", "E"), col("Number", 14, 15, 16))
source3 = newTable(col("Letter", "E", "F", "A"), col("Number", 22, 25, 27))

tableArray = [source1, source2, source3]

result = merge(tableArray)
```

### View table metadata

Useful to make sure schema matches before merging. Shows the column names, data types, partitions, and groups for the table.

```groovy test-set=1
seeMetadata = source.meta()
```

## Sort

Single direction sorting:

- [`sort`](../table-operations/sort/sort.md)
- [`sortDescending`](../table-operations/sort/sort-descending.md)

Sort on multiple column or directions:

- [`sort(sortColumns)`](../table-operations/sort/sort.md)

Reverse the order of rows in a table:

- [`reverse`](../table-operations/sort/reverse.md)

```groovy order=source,resultMultiDirection,resultMultiSort,sortDesc,sortAsc,reverseTable
import io.deephaven.api.SortColumn
import io.deephaven.api.ColumnName

source = newTable(
    stringCol("Letter", "A", "C", "F", "B", "E", "D", "A"),
    intCol("Number", NULL_INT, 2, 1, NULL_INT, 4, 5, 3),
    stringCol("Color", "red", "blue", "orange", "purple", "yellow", "pink", "blue"),
    intCol("Code", 12, 13, 11, NULL_INT, 16, 14, NULL_INT),
)

sort_columns = [
    SortColumn.asc(ColumnName.of("Number")),
    SortColumn.desc(ColumnName.of("Number"))
]

resultMultiDirection = source.sort(sort_columns)
resultMultiSort = source.sort("Number", "Number") // Number then Number
sortDesc = source.sortDescending("Number") // highest to lowest
sortAsc = source.sort("Number") //  lowest to highest
reverseTable = source.reverse() // HEAVILY USED! Very cheap to support GUIs
```

## Select and create new columns

**Option 1:  Choose and add new columns - calculate and write to memory**

Use [`select`](../table-operations/select/select.md) and [`update`](../table-operations/select/update.md) when data is expensive to calculate or accessed frequently. Results are saved in RAM for faster access, but takes more memory.

```groovy test-set=3 order=source,selectColumns,selectAddCol,selectAndUpdateCol
source = newTable(
    stringCol("Letter", "A", "C", "F", "B", "E", "D", "A"),
    intCol("Number", NULL_INT, 2, 1, NULL_INT, 4, 5, 3),
    stringCol("Color", "red", "blue", "orange", "purple", "yellow", "pink", "blue"),
    intCol("Code", 12, 13, 11, NULL_INT, 16, 14, NULL_INT),
)
selectColumns = source.select("Letter", "Number")
// constrain to only those 2 columns, write to memory

selectAddCol = source.select("Letter", "Number", "New = Number - 5")
// constrain and add a new calculated column

selectAndUpdateCol = source.select("Letter", "Number").update("New = Number - 5")
// add a new calculated column - logically equivalent to previous example
```

**Option 2:  Choose and add new columns - reference a formula and calculate on the fly**

Use [`view`](../table-operations/select/view.md) and [`updateView`](../table-operations/select/update-view.md) when formula is quick to calculate or only a portion of the data is used at a time. Minimizes RAM used.

```groovy test-set=3 order=viewColumns,viewAddCol,viewAndUpdateViewCol
viewColumns = source.view("Letter", "Number")
// similar to select(), but uses on-demand formula

viewAddCol = source.updateView("Letter", "Number", "New = Number - 5")
// view set and add a column with an on-demand formula

viewAndUpdateViewCol = source.view("Letter", "Number").updateView("New = Number - 5")
// logically equivalent to previous example
```

**Option 3:  Add new columns - reference a formula and calculate on the fly**

Use [`lazyUpdate`](../table-operations/select/lazy-update.md) when there are a small number of unique values. On-demand formula results are stored in cache and re-used.

```groovy test-set=3
lazyUpdateEx = source.lazyUpdate("Letter", "Number", "New = Number - 5")
```

## Manipulate columns

```groovy test-set=3 order=uniqueValues,renameStuff,dropColumn,putColsAtStart,putColsWherever
uniqueValues = source.selectDistinct("Letter") // show unique set
// works on all data types - be careful with doubles, longs

renameStuff = source.renameColumns("NewLetter = Letter", "NewNumber = Number")
dropColumn = source.dropColumns("Number") // drop one or many

putColsAtStart = source.moveColumnsUp("Number") // make Number the first column(s)
putColsWherever = source.moveColumns(1, "Number") // make Number the second column
```

## Group

See [How to group and ungroup data](../../how-to-guides/grouping-data.md) for more details.

```groovy test-set=3 order=groupToArrays1,multipleKeys
groupToArrays1 = source.groupBy("Letter") // one row per key; all other columns are arrays
multipleKeys = source.groupBy("Letter", "Number") // one row for each key-combination
```

## Ungroup

Expands out each row so that each value in any array inside that row becomes itself a new row.

```groovy test-set=3 order=aggByKey,ungroupThatOutput
aggByKey = source.groupBy("Letter")
// one row per Letter; other fields are arrays from source
ungroupThatOutput = aggByKey.ungroup() // no arguments usually
	// each array value becomes its own row
	// in this case turns grouped table back into source
```

## Aggregate

See our guides for more details:

- [How to perform dedicated aggregations for groups](../../how-to-guides/dedicated-aggregations.md)
- [How to perform multiple aggregations for groups](../../how-to-guides/combined-aggregations.md)

```groovy test-set=3 order=firstByKey,firstByTwoKeys,countOfEntireTable,countOfGroup,firstOfGroup,lastOfGroup,sumOfGroup,avgOfGroup,stdOfGroup,varOfGroup,medianOfGroup,minOfGroup,maxOfGroup,combinationAgg
// IMPORTANT: Any columns not in the parentheses of the whateverBy("Col1", "Col2") statement
// need to be an appropriate type for that aggregation method
// i.e., sums need to have all non-key columns be numbers.
import static io.deephaven.api.agg.Aggregation.AggLast
import static io.deephaven.api.agg.Aggregation.AggCount
import static io.deephaven.api.agg.Aggregation.AggSum
import static io.deephaven.api.agg.Aggregation.AggFirst
import static io.deephaven.api.agg.Aggregation.AggMax
import static io.deephaven.api.agg.Aggregation.AggMin
import static io.deephaven.api.agg.Aggregation.AggAvg
import static io.deephaven.api.agg.Aggregation.AggWAvg
import static io.deephaven.api.agg.Aggregation.AggVar
import static io.deephaven.api.agg.Aggregation.AggStd
import static io.deephaven.api.agg.Aggregation.AggMed
import static io.deephaven.api.agg.Aggregation.AggPct

firstByKey = source.firstBy("Number")
firstByTwoKeys = source.firstBy("Number", "Letter") // all below work with multi

countOfEntireTable = source.countBy("Letter") // single argument returns total count
countOfGroup = source.countBy("Number", "Letter")

firstOfGroup = source.firstBy("Letter")
lastOfGroup = source.lastBy("Letter")

sumOfGroup = source.view("Letter", "Number").sumBy("Letter")
// non-key field must be numerical
avgOfGroup = source.view("Letter", "Number").avgBy("Letter")
stdOfGroup = source.view("Letter", "Number").stdBy("Letter")
varOfGroup = source.view("Letter", "Number").varBy("Letter")
medianOfGroup = source.view("Letter", "Number").medianBy("Letter")
minOfGroup = source.view("Letter", "Number").minBy("Letter")
maxOfGroup = source.view("Letter", "Number").maxBy("Letter")
// Combined Aggregations
// combine aggregations in a single method (using the same key-grouping)

agg_list = [
    AggLast("LastNumber = Number","LastLetter = Number"),
    AggCount("Number"),
    AggSum("Sum = Number", "Code"),
    AggFirst("First = Number"),
    AggMax("Max = Number"),
    AggMin("Min = Number"),
    AggAvg("AvgNumber = Number"),
    AggWAvg("Number", "WtdAvgNumber = Number"),
    AggVar("VarNumber = Number"),
    AggStd("StdNumber = Number"),
    AggMed("MedianNumber = Number"),
    AggPct(0.75, "Perc75Number = Number")
]

combinationAgg = source.updateView("Number = Number * Code").aggBy(agg_list, "Code", "Letter")
```

## Other useful methods

:::note

Copy and paste these working examples into the console.

:::

### Reduce ticking frequency

Uses [`snapshotWhen`](../table-operations/snapshot/snapshot-when.md) to reduce the ticking frequency.

```groovy ticking-table order=null
source = timeTable("PT00:00:00.5").update("X = (int) new Random().nextInt(100)", "Y = sqrt(X)")

trigger = timeTable("PT00:00:05").renameColumns("TriggerTimestamp = Timestamp")

result = source.snapshotWhen(trigger)
```

### Capture the history of ticking tables

Use [`snapshotWhen`](../table-operations/snapshot/snapshot-when.md) to capture the history of ticking tables.

```groovy ticking-table order=null
import io.deephaven.api.snapshot.SnapshotWhenOptions

myOpts = SnapshotWhenOptions.of(false, false, true)

source = timeTable("PT00:00:00.1").update("X = i%2 == 0 ? `A` : `B`", "Y = new Random().nextInt(100)", "Z = sqrt(Y)").lastBy("X")
trigger = timeTable("PT00:00:02").renameColumns("TriggerTimestamp = Timestamp")
result = source.snapshotWhen(trigger, myOpts)
```
