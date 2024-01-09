---
id: regex
title: How to use regular expressions in Deephaven
sidebar_label: Regular expressions
---

This guide will show you how to limit your data based on [string](../reference/query-language/types/strings.md) values. To frame this understanding, we use the String Java Object and inherit the [methods from that class](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html), including the ability to search on [Java regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html). A full treatment of regexes is too extensive to include in this guide.

This guide does not provide a full overview of regular expressions (regex) but rather provides some examples of their use in tables.

## Filter with built-in methods

In this example, a [`where`](../reference/table-operations/filter/where.md) filter calls [`startsWith`](<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html#startsWith(java.lang.String)>) to limit the table to only values where `X` starts with `A`.

```groovy test-set=1 order=source,result
source = newTable(
    stringCol("X", "AA", "A x", "BaA", "5A", "a3B", "A"),
    intCol("Y", 3, 2, 1, 5, 6, 4)
)

result = source.where("X.startsWith(`A`)")
```

In this example, a [`where`](../reference/table-operations/filter/where.md) filter calls [`startsWith`](<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html#startsWith(java.lang.String)>) twice. They are used disjunctively with `||` to limit the table to only values where `X` starts with `A` _or_ `X` starts with `a`.

```groovy test-set=1
result = source.where("X.startsWith(`A`) || X.startsWith(`a`)")
```

[`startsWith`](<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html#startsWith(java.lang.String)>) is just one of the methods available. See the [Javadoc](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html) for more built-in methods.

## Filter with regex

If there is no pre-built method to search the [string](../reference/query-language/types/strings.md) for your desired results, you can filter with [regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html).

In this example, a [`FilterPattern`](https://deephaven.io/core/javadoc/io/deephaven/api/filter/FilterPattern.html) limits the table to values where `X` has three characters.

```groovy order=source,result
import io.deephaven.api.filter.FilterPattern.Mode
import io.deephaven.api.filter.FilterPattern
import io.deephaven.api.ColumnName
import java.util.regex.Pattern

source = newTable(
    stringCol("X", "AA", "A x", "BaA", "5A", "a3B", "A"),
    intCol("Y", 3, 2, 1, 5, 6, 4)
)

threeCharPattern = FilterPattern.of(ColumnName.of("X"), Pattern.compile("..."), Mode.MATCHES, false)

result = source.where(threeCharPattern)
```

In this example, a [`FilterPattern`](https://deephaven.io/core/javadoc/io/deephaven/api/filter/FilterPattern.html) limits the table to values where `X` contains a digit.

```groovy order=source,result
import io.deephaven.api.filter.FilterPattern.Mode
import io.deephaven.api.filter.FilterPattern
import io.deephaven.api.ColumnName
import java.util.regex.Pattern

source = newTable(
    stringCol("X", "AA", "A x", "BaA", "5A", "a3B", "A"),
    intCol("Y", 3, 2, 1, 5, 6, 4)
)

digitPattern = FilterPattern.of(ColumnName.of("X"), Pattern.compile("\\d"), Mode.FIND, false)

result = source.where(digitPattern)
```

## Related documentation

- [Create a new table](./new-table.md)
- [How to work with Strings](./work-with-strings.md)
