---
id: regex
title: How to use regular expressions in Deephaven
sidebar_label: Use regular expressions
---

Deephaven queries often filter data based on string values. This guide will show you how to filter your data based on [string](../reference/query-language/types/strings.md) values in two ways:

- Using the Java [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html) object and the methods they support.
- Using Deephaven's [filters](https://deephaven.io/core/pydoc/code/deephaven.filters.html#module-deephaven.filters) module, which allows for regex filtering on table data.

This guide does not provide a full overview of regular expressions (regex) but rather provides some examples of their use in tables.

## Filter with built-in String methods

In this example, [`startsWith`](<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html#startsWith(java.lang.String)>) is used in a [`where`](../reference/table-operations/filter/where.md) filter to limit the table to only values where `X` starts with `A`.

```python test-set=1 order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("X", ["AA", "A x", "BaA", "5A", "a3B", "A"]),
    int_col("Y", [3, 2, 1, 5, 6, 4])
])

result = source.where(filters=["X.startsWith(`A`)"])
```

In this example, [`startsWith`](<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html#startsWith(java.lang.String)>) is used with `||` to limit the table to only values where `X` starts with `A` _or_ `X` starts with `a`.

```python test-set=1
result = source.where(filters=["X.startsWith(`A`) || X.startsWith(`a`)"])
```

[`startsWith`](<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html#startsWith(java.lang.String)>) is just one of the methods available. See the [Javadoc](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html) for more built-in methods.

## Filter with regex

If there is no pre-built method to search the [string](../reference/query-language/types/strings.md) for your desired results, you can filter with [regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) by using the [`deephaven.filters`](https://deephaven.io/core/pydoc/code/deephaven.filters.html#module-deephaven.filters) module.

In this example, a pattern filter limits the table to values where `X` has three characters.

```python test-set=1
from deephaven.filters import PatternMode, pattern

threechar_filter = pattern(PatternMode.MATCHES, "X", "...")

result = source.where(threechar_filter)
```

In this example, a pattern filter limits the table to values where `X` contains a digit.

```python test-set=1
digit_filter = pattern(PatternMode.FIND, "X", "\d")

result = source.where(digit_filter)
```

## Related documentation

- [Create a new table](./new-table.md)
- [How to work with Strings](./work-with-strings.md)
- [How to use jpy](./use-jpy.md)
