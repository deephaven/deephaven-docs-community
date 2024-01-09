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

```python test-set=1
from deephaven import read_csv

iris = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/Iris/csv/iris.csv")
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

This method returns rows that have a matching value in a specified column. In the example below, the new table `filtered_by_sepal_width` contains only the rows from the `iris` table with a 3.5 cm sepal width.

```python test-set=1
filtered_by_sepal_width = iris.where(filters=["SepalWidthCM = 3.5"])
```

:::note

The single equals (`=`) and double equals (`==`) can be used interchangeably in filters.

:::

### not equals (`!=`)

This method returns rows that do **not** have a matching value in a specified column. In the example below, the new table `not_filtered_by_virginica` contains all rows from the `iris` table except those where the `Class` row is equal to `"Iris-virginica"`.

```python test-set=1
not_filtered_by_virginica = iris.where(filters=["Class != 'Iris-virginica'"])
```

### `in`

This method returns rows that contain a match of one or more values in a specified column. In the example below, the new table contains only Iris setosa and virginica flowers.

```python test-set=1
setosa_and_virginica = iris.where(filters=["Class in `Iris-setosa`, `Iris-virginica`"])
```

### `not in`

This method returns rows that do **not** contain a match of one or more values in a specified column. In the example below, the new table `versicolor` contains only Iris versicolor flowers.

```python test-set=1
not_setosa_or_virginica = iris.where(filters=["Class not in `Iris-setosa`, `Iris-virginica`"])
```

### `icase in`

This method returns rows that contain a match of one or more values in a specified column, regardless of capitalization. In the example below, the new table `virginica` contains only Iris virginica flowers.

```python test-set=1
virginica = iris.where(filters=["Class icase in `iris-virginica`"])
```

### `icase not in`

This method returns rows that do **not** contain a match of one or more values in a specified column, regardless of capitalization. In the example below, the new table `not_versicolor` contains data for Iris setosa and virginica flowers.

```python test-set=1
not_versicolor = iris.where(filters=["Class icase not in `iris-versicolor`"])
```

## Conditional filters

Like match filters, conditional filters use [`where`](../reference/table-operations/filter/where.md) to filter out unwanted data. Conditional filters are used to filter data based on formulas other than those provided by match filters. These can be an arbitrary boolean formula.

Conditional filters frequently use:

- [`=` and `==`](../reference/query-language/match-filters/equals.md): is equal to
- [`!=`](../reference/query-language/match-filters/not-equals.md): is not equal to
- [`>` and `<`](../reference/query-language/formulas/operators.md): greater than and less than
- [`>=` and `<=`](../reference/query-language/formulas/operators.md): greater than or equal to and less than or equal to
- Methods on strings (e.g., [`startsWith`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#startsWith-java.lang.String-), [`endsWith`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#endsWith-java.lang.String-), [`matches`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#matches-java.lang.String-), [`contains`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#contains-java.lang.CharSequence-))

### Equality and inequality filtering

While filtering for equality is an example of match filtering, it becomes a conditional filter when adding other operations. In the example below, the equality filter becomes conditional when it checks the result of a modulo operation. The filter returns a table containing Iris flower data with petal width that is a multiple of 0.5 cm.

```python test-set=1
conditional_equality_filtered = iris.where(filters=["PetalWidthCM % 0.5 == 0"])
```

### Range filtering

It's common to filter for data that falls with a range of values. Using one or more of [`>`, `<`, `>=`, `<=`, and `inRange`](../reference/query-language/formulas/formulas.md) is the best way to achieve this.

In the example below, `<` is used to filter by sepal width in a range. Then, `inRange` is used to filter by petal width in a range.

```python test-set=1 order=sepal_width_less_than_three_CM,petal_width_one_CM_or_less
sepal_width_less_than_three_CM = iris.where(filters=["SepalWidthCM < 3.0"])
petal_width_one_CM_or_less = iris.where(filters=["inRange(PetalWidthCM, 0, 1)"])
```

### String filtering

Methods on [objects](../reference/query-language/types/objects.md) can be used to filter. Strings in Deephaven are represented as Java strings. Any methods on [`java.lang.String`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html) can be called from within a query string. Methods such as [`startsWith`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#startsWith-java.lang.String-), [`endsWith`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#endsWith-java.lang.String-), [`contains`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#contains-java.lang.CharSequence-), and [`matches`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#matches-java.lang.String-) can be useful for performing partial string matches.

In the two examples below, each operator is used to filter Iris data based on substring matches. [`startsWith`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#startsWith-java.lang.String-) searches for a prefix, [`endsWith`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#endsWith-java.lang.String-) searches for a suffix, [`contains`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#contains-java.lang.CharSequence-) searches for a substring, and [`matches`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#matches-java.lang.String-) searches for a regular expression match.

```python test-set=1 order=new_iris,setosa
new_iris = iris.where(filters=["Class.startsWith(`Iris`)"])
setosa = iris.where(filters=["Class.endsWith(`setosa`)"])
```

```python test-set=1 order=contains_versicolor,matches_versicolor
contains_versicolor = iris.where(filters=["Class.contains(`versicolor`)"])
matches_versicolor = iris.where(filters=["Class.matches(`.*versicolor.*`)"])
```

## Combine filters

Multiple match and/or conditional statements can be combined to filter data in a table. These combinations can be either conjunctive or disjunctive.

### Conjunctive filtering (AND)

Conjunctive filtering is used to return a table where **all** conditional filters in a [`where`](../reference/table-operations/filter/where.md) clause return true.

In the following example, a conjunctive filter is applied to the `iris` table to produce a new table of only Iris setosa flowers with a petal length in a specific range.

```python test-set=1
conjunctive_filtered_iris = iris.where(filters=["Class in `Iris-setosa`", "PetalLengthCM >= 1.3 && PetalLengthCM <= 1.6"])
```

### Disjunctive filtering (OR)

Disjunctive filtering is used to return a table where **one or more** of the statements return true. This can be using the `or_` function.

In the following example, two filters work disjunctively to return a new table where the petal length is greater than 1.9 cm or less than 1.3 cm.

```python test-set=1 order=or_filtered_iris
or_filtered_iris = iris.where_one_of(filters=["PetalLengthCM > 1.9", "PetalWidthCM < 1.3"])
```

## Filter with `head`, `tail`, and `slice`

The following methods all filter rows from a table:

- [`head`](../reference/table-operations/filter/head.md) returns a number of rows at the top of a table. When applied to a [blink table](../conceptual/table-types.md#blink), the new table will not update.
- [`tail`](../reference/table-operations/filter/tail.md) returns a number of rows at the bottom of a table. When applied to a [blink table](../conceptual/table-types.md#blink), the new table will not update.
- [`slice`](../reference/table-operations/filter/slice.md) returns a number of rows based on a start and end row index. This is not currently supported for [blink tables](../conceptual/table-types.md#blink).
- [`head_pct`](../reference/table-operations/filter/head-pct.md) returns a percentage of rows at the top of a table. This is not currently supported for [blink tables](../conceptual/table-types.md#blink).
- [`tail_pct`](../reference/table-operations/filter/tail-pct.md) returns a percentage of rows at the bottom of a table. This is not currently supported for [blink tables](../conceptual/table-types.md#blink).
- [`slice_pct`](../reference/table-operations/filter/slice-pct.md) returns a number of rows based on the difference between specified start and end row percentages. This is not currently supported for [blink tables](../conceptual/table-types.md#blink).

The following example illustrates using [`head`](../reference/table-operations/filter/head.md) and [`tail`](../reference/table-operations/filter/tail.md) to return the first and last 10 rows.
​

```python test-set=1 order=iris_head,iris_tail
iris_head = iris.head(10)
iris_tail = iris.tail(10)
```

The following example uses [`head_pct`](../reference/table-operations/filter/head-pct.md) and [`tail_pct`](../reference/table-operations/filter/tail-pct.md) to return the first and last 10% (15) rows. Note that the values passed into `head_pct` or `tail_pct` must be floating-point numbers between 0 and 1, representing percentages.

```python test-set=1 order=iris_head_pct,iris_tail_pct
iris_head_pct = iris.head_pct(0.10)
iris_tail_pct = iris.tail_pct(0.10)
```

The following example illustrates using [`slice`](../reference/table-operations/filter/slice.md) to return subsets of rows from a table. If the start index is 0, the result is identical to the one we got from [`head`](../reference/table-operations/filter/head.md). If the end index is 0, the result is identical to to the one we got from [`tail`](../reference/table-operations/filter/tail.md).

```python test-set=1 order=iris_slice,iris_slice_head,iris_slice_tail
iris_slice = iris.slice(30,120)
iris_slice_head = iris.slice(0, 10)
iris_slice_tail = iris.slice(-10, 0)
```

Negative start and/or end indices can be used as inputs to [`slice`](../reference/table-operations/filter/slice.md). A negative index counts backwards from the end of a table. If the start index is negative, the end index must be greater than or equal to it but cannot be greater than 0.

```python test-set=1 order=iris_slice_negative
iris_slice_negative = iris.slice(-60, -30)
```

## Filter one table based on another

​
The [`where_in`](../reference/table-operations/filter/where-in.md) and [`where_not_in`](../reference/table-operations/filter/where-not-in.md) methods enable filtering of one table based on another table. These two methods are evaluated whenever either table passed in as input changes, whereas [`where`](../reference/table-operations/filter/where.md) is only evaluated when the filtered table ticks.
​
In the example below, the [`where_in`](../reference/table-operations/filter/where-in.md) and [`where_not_in`](../reference/table-operations/filter/where-not-in.md) methods are used to find Iris virginica sepal widths that match and do not match Iris versicolor sepal widths:

```python test-set=1 order=virginica,versicolor,virginica_matching_petal_widths,virginica_non_matching_petal_widths
virginica = iris.where(filters=["Class in `Iris-virginica`"])
versicolor = iris.where(filters=["Class in `Iris-versicolor`"])
virginica_matching_petal_widths = virginica.where_in(filter_table=versicolor, cols=["PetalWidthCM"])
virginica_non_matching_petal_widths = virginica.where_not_in(filter_table=versicolor, cols=["PetalWidthCM"])
```

​
:::caution
​
[`where_in`](../reference/table-operations/filter/where-in.md) and [`where_not_in`](../reference/table-operations/filter/where-not-in.md) are inefficient if the filter table updates frequently.
​
:::

:::tip
Unlike [`natural_join`](../reference/table-operations/join/natural-join.md), [`where_in`](../reference/table-operations/filter/where-in.md) can be used when there are more than one matching value in the right table for values in the left table. This is true of [`join`](../reference/table-operations/join/join.md) as well, but [`where_in`](../reference/table-operations/filter/where-in.md) is faster to return matching rows than [`join`](../reference/table-operations/join/join.md).

[`where_in`](../reference/table-operations/filter/where-in.md) only provides filtering, and does not allow adding columns from the right table. In some cases, it may be desirable to use [`where_in`](../reference/table-operations/filter/where-in.md) to filter and then [`join`](../reference/table-operations/join/join.md) to add columns from the right table. This provides similar performance to [`natural_join`](../reference/table-operations/join/natural-join.md), while still allowing multiple matches from the right table.
:::

## Related documentation

- [equals](../reference/query-language/match-filters/equals.md)
- [`head`](../reference/table-operations/filter/head.md)
- [`head pct`](../reference/table-operations/filter/head-pct.md)
- [`icase in`](../reference/query-language/match-filters/icase-in.md)
- [`icase not in`](../reference/query-language/match-filters/icase-not-in.md)
- [`in`](../reference/query-language/match-filters/in.md)
- [`join`](../reference/table-operations/join/join.md)
- [`natural join`](../reference/table-operations/join/natural-join.md)
- [operators](../reference/query-language/formulas/operators.md)
- [`not in`](../reference/query-language/match-filters/not-in.md)
- [`slice`](../reference/table-operations/filter/slice.md)
- [`tail`](../reference/table-operations/filter/tail.md)
- [`tail pct`](../reference/table-operations/filter/tail-pct.md)
- [`where`](../reference/table-operations/filter/where.md)
- [`where_in`](../reference/table-operations/filter/where-in.md)
- [`where_one_of`](../reference/table-operations/filter/where-one-of.md)
