---
id: how-do-i-get-data-out-of-a-deephaven-table-gr
title: How do I get data out of a Deephaven table?
sidebar_label: How do I get data out of a table?
---

Extracting data from tables in Deephaven's Groovy API is typically done via the [`table.getColumnSource`](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/impl/util/ColumnHolder.html#getColumnSource()>) and [`table.columnIterator`](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/Table.html#columnIterator(java.lang.String)>) methods.

See our full guide for [extracting data from tables](../../../../core_versioned_docs/version-groovy/docs/how-to-guides/extract-table-value.md) in the Groovy API here.

Here's an example:

```groovy order=null
result = newTable(
    intCol("Integers", 1, 2, 3, 4, 5)
)

columnSource = result.getColumnSource("Integers")

// get the ColumnSource
println columnSource

// use the ColumnSource's 'get' method to get the value at a specific index
println columnSource.get(2)

// use columnIterator to iterate over the whole column
iterator = result.columnIterator("Integers")

while (iterator.hasNext()) {
    println iterator.next()
}
```

:::note

These FAQ pages contain answers to questions about Deephaven Community Core that our users have asked in our [Community Slack](https://deephaven.io/slack). If you have a question that is not in our documentation, [join our Community](https://deephaven.io/slack) and we'll be happy to help!

:::
