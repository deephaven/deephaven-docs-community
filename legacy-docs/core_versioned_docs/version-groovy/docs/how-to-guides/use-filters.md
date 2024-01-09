---
id: use-filters
title: How to use filter query methods
sidebar_label: Use filters
---

This guide discusses how to properly use filters to exclude unwanted data from analysis in Deephaven. Topics covered include match and conditional filtering, conjunctive and disjunctive filtering, and filtering with [`head`](../reference/table-operations/filter/head.md) and [`tail`](../reference/table-operations/filter/tail.md).

For this how-to guide, we'll use the example data found in [Deephaven's examples repository](https://github.com/deephaven/examples).

:::note

In this guide, we read data from [Deephaven's examples repository](https://github.com/deephaven/examples). You can also load files that are in a mounted directory at the base of the Docker container. See [Docker data volumes](../conceptual/docker-data-volumes.md) to learn more about the relation between locations in the container and the local file system.

:::

To illustrate filtering in Deephaven, we'll use the Iris data set from the examples. This data set contains observations about Iris flowers from R. A. Fisher's classic 1936 paper, "The Use of Multiple Measurements in Taxonomic Problems". The paper describes categorizing plant varieties by using observable metrics. The data is often used to demonstrate machine learning categorization algorithms.

```groovy test-set=1
import static io.deephaven.csv.CsvTools.readCsv

iris = readCsv("https://media.githubusercontent.com/media/deephaven/examples/main/Iris/csv/iris.csv")
```

This produces the `iris` table, which has five columns and 150 rows. The first four columns contain Iris measurement data, while the fifth column, `Class`, is the Iris species name. The image below shows the first few entries:

Next, we'll show various ways to filter the data.

## Match filters

Match filters use [`where`](../reference/table-operations/filter/where.md) to filter out unwanted data. They come in six different flavors:

<!--TODO: add links [#474](https://github.com/deephaven/deephaven.io/issues/474) -->

- [equals](../reference/query-language/match-filters/equals.md) (`=` and `==`)
- [not equals](../reference/query-language/match-filters/not-equals.md) (`!=`)
- [`in`](../reference/query-language/match-filters/in.md)
- [`not in`](../reference/query-language/match-filters/not-in.md)
- [`icase in`](../reference/query-language/match-filters/icase-in.md)
- [`icase not in`](../reference/query-language/match-filters/icase-not-in.md)

### equals (`=` and `==`)

This method returns rows that have a matching value in a specified column. In the example below, the new table `filteredBySepalWidth` contains only the rows from the `iris` table with a 3.5 cm sepal width.

```groovy test-set=1
filteredBySepalWidth = iris.where("SepalWidthCM = 3.5")
```

:::note

The single equals (`=`) and double equals (`==`) can be used interchangeably in filters.

:::

### not equals (`!=`)

This method returns rows that do **not** have a matching value in a specified column. In the example below, the new table `notSetosa` contains only Iris versicolor and virginica flowers.

```groovy test-set=1
notSetosa = iris.where("Class != `Iris-setosa`")
```

### `in`

This method returns rows that contain a match of one or more values in a specified column. In the example below, the new table `filteredByClass` contains only Iris setosa and virginica flowers.

```groovy test-set=1
setosaAndVirginica = iris.where("Class in `Iris-setosa`, `Iris-virginica`")
```

### `not in`

This method returns rows that do **not** contain a match of one or more values in a specified column. In the example below, the new table `versicolor` contains only Iris versicolor flowers.

```groovy test-set=1
notSetosaOrVirginica = iris.where("Class not in `Iris-setosa`, `Iris-virginica`")
```

### `icase in`

This method returns rows that contain a match of one or more values in a specified column, regardless of capitalization. In the example below, the new table `virginica` contains only Iris virginica flowers.

```groovy test-set=1
virginica = iris.where("Class icase in `iris-virginica`")
```

### `icase not in`

This method returns rows that do **not** contain a match of one or more values in a specified column, regardless of capitalization. In the example below, the new table `notVersicolor` contains data for Iris setosa and viriginca flowers.

```groovy test-set=1
notVersicolor = iris.where("Class icase not in `iris-versicolor`")
```

## Conditional filters

Like match filters, conditional filters use [`where`](../reference/table-operations/filter/where.md) to filter out unwanted data. Conditional filters are used to filter data based on formulas other than those provided by match filters. These can be an arbitrary boolean formula.

Conditional filters frequently use:

- `=` and `==`: is equal to <!-- TODO: https://github.com/deephaven/deephaven.io/issues/198 add conditional filters REF documents -->
- `!=`: is not equal to <!-- TODO: https://github.com/deephaven/deephaven.io/issues/198 add conditional filters REF documents -->
- `>` and `<`: greater than and less than <!-- TODO: https://github.com/deephaven/deephaven.io/issues/198 add conditional filters REF documents -->
- `>=` and `<=`: greater than or equal to and less than or equal to <!-- TODO: https://github.com/deephaven/deephaven.io/issues/198 add conditional filters REF documents -->
- Methods on strings (e.g. [`startsWith`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#startsWith-java.lang.String-), [`endsWith`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#endsWith-java.lang.String-), [`matches`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#matches-java.lang.String-), [`contains`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#contains-java.lang.CharSequence-))

### Equality and inequality filtering

While filtering for equality is an example of match filtering, it becomes a conditional filter when adding other operations. In the example below, the equality filter becomes conditional when it checks the result of a modulo operation. The filter returns a table containing Iris flower data with petal width that is a multiple of 0.5 cm.

```groovy test-set=1
conditionalEqualityFiltered = iris.where("PetalWidthCM % 0.5 == 0")
```

### Range filtering

It's common to filter for data that falls with a range of values. Using one or more of [`>`, `<`, `>=`, `<=`, and `inRange`](../reference/query-language/formulas/formulas.md) is the best way to achieve this.

In the example below, `<` is used to filter by sepal width in a range. Then, `inRange` is used to filter by petal width in a range.

```groovy test-set=1 order=sepalWidthLessThanThreeCM,petalWidthOneCMorLess
sepalWidthLessThanThreeCM = iris.where("SepalWidthCM < 3.0")
petalWidthOneCMorLess = iris.where("inRange(PetalWidthCM, 0, 1)")
```

### String filtering

Methods on [objects](../reference/query-language/types/objects.md) can be used to filter. Strings in Deephaven are represented as Java strings. Any methods on [`java.lang.String`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html) can be called from within a query string. Methods such as [`startsWith`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#startsWith-java.lang.String-), [`endsWith`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#endsWith-java.lang.String-), [`contains`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#contains-java.lang.CharSequence-), and [`matches`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#matches-java.lang.String-) can be useful for performing partial string matches.

In the two examples below, each operator is used to filter Iris data based on substring matches. [`startsWith`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#startsWith-java.lang.String-) searches for a prefix, [`endsWith`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#endsWith-java.lang.String-) searches for a suffix, [`contains`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#contains-java.lang.CharSequence-) searches for a substring, and [`matches`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#matches-java.lang.String-) searches for a regular expression match.

```groovy test-set=1 order=newIris,setosa
newIris = iris.where("Class.startsWith(`Iris`)")
setosa = iris.where("Class.endsWith(`setosa`)")
```

```groovy test-set=1 order=containsVersicolor,matchesVersicolor
containsVersicolor = iris.where("Class.contains(`versicolor`)")
matchesVersicolor = iris.where("Class.matches(`.*versicolor.*`)")
```

## Combine filters

Multiple match and/or conditional statements can be combined to filter data in a table. These combinations can be either conjunctive or disjunctive.

### Conjunctive filtering (AND)

Conjunctive filtering is used to return a table where **all** conditional filters in a [`where`](../reference/table-operations/filter/where.md) clause return true.

In the following example, a conjunctive filter is applied to the `iris` table to produce a new table of only Iris setosa flowers with a petal length in a specific range.

```groovy test-set=1
conjunctiveFilteredIris = iris.where("Class in `Iris-setosa`", "PetalLengthCM >= 1.3 && PetalLengthCM <= 1.6")
```

### Disjunctive filtering (OR)

Disjunctive filtering is used to return a table where **one or more** of the statements return true. This can be achieved by either using the `or_` (Python) function or `FilterOr` (Groovy) function.

In the following example, two filters work disjunctively to return a new table where the petal length is greater than 1.9 cm or less than 1.3 cm.

```groovy test-set=1 order=orFilteredIris
import io.deephaven.api.filter.FilterOr
import io.deephaven.api.filter.Filter

orFilteredIris = iris.where(FilterOr.of(Filter.from("PetalLengthCM > 1.9", "PetalWidthCM < 1.3")))
```

## Filter with `head`, `tail`, and `slice`

​
The following methods all filter rows from a table:

- [`head`](../reference/table-operations/filter/head.md) returns a number of rows at the top of a table. When applied to a [blink table](../conceptual/table-types.md#blink), the new table will not update.
- [`tail`](../reference/table-operations/filter/tail.md) returns a number of rows at the bottom of a table. When applied to a [blink table](../conceptual/table-types.md#blink), the new table will not update.
- [`slice`](../reference/table-operations/filter/slice.md) returns a number of rows based on a start and end row index. This is not currently supported for [blink tables](../conceptual/table-types.md#blink).
- [`headPct`](../reference/table-operations/filter/head-pct.md) returns a percentage of rows at the top of a table. This is not currently supported for [blink tables](../conceptual/table-types.md#blink).
- [`tailPct`](../reference/table-operations/filter/tail-pct.md) returns a percentage of rows at the bottom of a table. This is not currently supported for [blink tables](../conceptual/table-types.md#blink).
- [`slicePct`](../reference/table-operations/filter/slice-pct.md) returns a number of rows based on the difference between specified start and end row percentages. This is not currently supported for [blink tables](../conceptual/table-types.md#blink).

The following example illustrates using [`head`](../reference/table-operations/filter/head.md) and [`tail`](../reference/table-operations/filter/tail.md) to return the first and last 10 rows.

```groovy test-set=1 order=irisHead,irisTail
irisHead = iris.head(10)
irisTail = iris.tail(10)
```

​
The following example illustrates using [`headPct`](../reference/table-operations/filter/head-pct.md) and [`tailPct`](../reference/table-operations/filter/tail-pct.md) to return the first and last 10% (15) rows. Note that the values passed into `headPct` or `tailPct` must be floating-point numbers between 0 and 1, representing percentages.
​

```groovy test-set=1 order=irisHeadPct,irisTailPct
irisHeadPct = iris.headPct(0.10)
irisTailPct = iris.tailPct(0.10)
```

The following example illustrates using [`slice`](../reference/table-operations/filter/slice.md) to return subsets of rows from a table. If the start index is 0, the result is identical to the one we got from [`head`](../reference/table-operations/filter/head.md). If the end index is 0, the result is identical to to the one we got from [`tail`](../reference/table-operations/filter/tail.md).

```groovy test-set=1 order=irisSlice,irisSliceHead,irisSliceTail
irisSlice = iris.slice(30,120)
irisSliceHead = iris.slice(0, 10)
irisSliceTail = iris.slice(-10, 0)
```

Negative start and/or end indices can be used as inputs to [`slice`](../reference/table-operations/filter/slice.md). A negative index counts backwards from the end of a table. If the start index is negative, the end index must be greater than or equal to it but cannot be greater than 0.

```groovy test-set=1 order=irisSliceNegative
irisSliceNegative = iris.slice(-60, -30)
```

## Filter one table based on another

​
The [`whereIn`](../reference/table-operations/filter/where-in.md) and [`whereNotIn`](../reference/table-operations/filter/where-not-in.md) methods enable filtering of one table based on another table. These two methods are evaluated whenever either table passed in as input changes, whereas [`where`](../reference/table-operations/filter/where.md) is only evaluated when the filtered table ticks.
​
In the example below, the [`whereIn`](../reference/table-operations/filter/where-in.md) and [`whereNotIn`](../reference/table-operations/filter/where-not-in.md) methods are used to find Iris virginica sepal widths that match and do not match Iris versicolor sepal widths:
​

```groovy test-set=1 order=virginica,versicolor,virginicaMatchingPetalWidths,virginicaNonMatchingPetalWidths
virginica = iris.where("Class in `Iris-virginica`")
versicolor = iris.where("Class in `Iris-versicolor`")
virginicaMatchingPetalWidths = virginica.whereIn(versicolor, "PetalWidthCM")
virginicaNonMatchingPetalWidths = virginica.whereNotIn(versicolor, "PetalWidthCM")
```

​
:::caution
​
[`whereIn`](../reference/table-operations/filter/where-in.md) and [`whereNotIn`](../reference/table-operations/filter/where-not-in.md) are inefficient if the filter table updates frequently.
​
:::

:::tip
Unlike [`naturalJoin`](../reference/table-operations/join/natural-join.md), [`whereIn`](../reference/table-operations/filter/where-in.md) can be used when there are more than one matching value in the right table for values in the left table. This is true of [`join`](../reference/table-operations/join/join.md) as well, but [`whereIn`](../reference/table-operations/filter/where-in.md) is faster to return matching rows than [`join`](../reference/table-operations/join/join.md).

[`whereIn`](../reference/table-operations/filter/where-in.md) only provides filtering, and does not allow adding columns from the right table. In some cases, it may be desirable to use [`whereIn`](../reference/table-operations/filter/where-in.md) to filter and then [`join`](../reference/table-operations/join/join.md) to add columns from the right table. This provides similar performance to [`naturalJoin`](../reference/table-operations/join/natural-join.md), while still allowing multiple matches from the right table.
:::

## Related documentation

- [`equals`](../reference/query-language/match-filters/equals.md)
- [`head`](../reference/table-operations/filter/head.md)
- [`headPct`](../reference/table-operations/filter/head-pct.md)
- [`icase in`](../reference/query-language/match-filters/icase-in.md)
- [`icase not in`](../reference/query-language/match-filters/icase-not-in.md)
- [`in`](../reference/query-language/match-filters/in.md)
- [`join`](../reference/table-operations/join/join.md)
- [`naturalJoin`](../reference/table-operations/join/natural-join.md)
- [operators](../reference/query-language/formulas/operators.md)
- [`not in`](../reference/query-language/match-filters/not-in.md)
- [`tail`](../reference/table-operations/filter/tail.md)
- [`tailPct`](../reference/table-operations/filter/tail-pct.md)
- [`slice`](../reference/table-operations/filter/slice.md)
- [`where`](../reference/table-operations/filter/where.md)
- [`whereIn`](../reference/table-operations/filter/where-in.md)
- [`whereNotIn`](../reference/table-operations/filter/where-not-in.md)
