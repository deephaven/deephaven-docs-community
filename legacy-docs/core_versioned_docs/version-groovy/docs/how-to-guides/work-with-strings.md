---
id: work-with-strings
title: How to work with strings
sidebar_label: Work with strings
---

[Strings](../reference/query-language/types/strings.md) are sequences of characters that form words, sentences, phrases, or statements in programming languages. The importance of [strings](../reference/query-language/types/strings.md) in the Deephaven Query Language cannot be understated. [Strings](../reference/query-language/types/strings.md) are used universally within Deephaven for modifying table data. Queries are written using [strings](../reference/query-language/types/strings.md), and most table operations require the use of query strings. Understanding their proper use is critical to becoming a strong Deephaven developer.

:::note

This guide assumes you are familiar with the use of strings in [Python](https://docs.python.org/3/library/string.html) and [Groovy](https://groovy-lang.org/syntax.html#all-strings). If not, please refer to the [Python documentation](https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str) or the [Groovy documentation](https://groovy-lang.org/syntax.html#all-strings) for more information.

:::

## Strings in tables

In the following example, a [new table](../reference/table-operations/create/newTable.md) is created with two [string columns](../reference/table-operations/create/stringCol.md).

:::note

[String](../reference/query-language/types/strings.md) values can be created using single or double quotes.

:::

```groovy
result = newTable(
    stringCol("Strings", "Deephaven", "3.14", "Community")
)
```

## String concatenation

Deephaven supports string concatenation in queries. In the following example, the [string columns](../reference/table-operations/create/stringCol.md) are added together with the [`+` operator](../reference/query-language/formulas/operators.md) to make a new column.

```groovy order=source,result
source = newTable(
    stringCol("X", "A", "B", "B", "C", "B", "A", "B", "B", "C"),
    stringCol("Y", "M", "M", "N", "N", "O", "O", "P", "P", "P")
)

result = source.update("Add = X + Y")
```

## Strings in query strings

<!--TODO: add links to overview pages https://github.com/deephaven/deephaven.io/issues/474 -->

Deephaven [query strings](../reference/query-language/types/strings.md) can be used to filter data and to create new columns. To express [string](../reference/query-language/types/strings.md) literal values within a query string, backticks (`` ` ``) are used.

The following example shows how to filter a [string column](../reference/table-operations/create/stringCol.md) for strings that match `"C"`.

```groovy order=source,result
source = newTable(
    stringCol("X", "A", "B", "B", "C", "B", "A", "B", "B", "C")
)

result = source.where("X = `C`")
```

## Escape character

Deephaven supports the escape character `\`. The escape character invokes alternative interpretations of the characters that follow it. For example, `\n` is a new line and not the character `n`. Similarly, `\t` is a tab and not the character `t`.

The query below shows how Deephaven responds to these characters.

:::note

For more information on escaping characters in strings, see the [Python documentation](https://docs.python.org/3/reference/lexical_analysis.html#strings) or the [Groovy documentation](https://groovy-lang.org/syntax.html#_escaping_special_characters).
:::

```groovy
result = newTable(
    stringCol("X", "Quote \" in quotes", 'Single quote \' in single quotes', "Escaped slash \\", "New\nline", "Added\ttab")
)
```

## Advanced string operations in queries

Deephaven supports using [`java.lang.String`](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html) methods on [strings](../reference/query-language/types/strings.md) in queries.

The following example shows how to filter a [string column](../reference/table-operations/create/stringCol.md) for values that start with `"C"`.

```groovy order=source,result
source = newTable(
    stringCol("X", "Aa", "Ba", "Bb", "Ca", "Bc", "Ab", "Bd", "Be", "Cb")
)

result = source.where("X.startsWith(`C`)")
```

## Related documentation

- [Create a new table](./new-table.md)
- [User-Defined Functions](../reference/query-language/formulas/user-defined-functions.md)
- [Formulas](../reference/query-language/formulas/formulas.md)
- [query strings](../reference/query-language/types/strings.md)
