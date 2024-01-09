---
id: simple-groovy-closures
title: How to write a Groovy closure to use in a query
sidebar_label: Write a Groovy closure
---

This guide will show you how to write a Groovy closure, a type of function, that can be used in the Deephaven Query Language.

By following each code step, you will add a new column to a table, which is the sum of two other columns.

In this example, a custom, user-defined closure is used inside a query string to compute new column values using [`update`](../reference/table-operations/select/update.md).

In this example, we are going to make a new table with integer columns by using [`newTable`](../reference/table-operations/create/newTable.md) and [`intCol`](../reference/table-operations/create/intCol.md).

```groovy test-set=1
numbers = newTable(
    intCol("X", 2, 4, 6),
    intCol("Y", 8, 10, 12)
)
```

In Groovy, a closure is defined before it is used. Information can be passed into closures as arguments. Arguments are comma-separated parameters specified after the closure name, inside the curly brackets and before the `->`. Values returned by the closure are specified using the `return` keyword.

Below, we define a closure called `f`, which has two arguments (`a` and `b`). When `f` is called, it returns the value `a + b`. For example, `f(1,2)` returns 3.

```groovy test-set=1
f = { a, b ->
    return a + b
}
```

We now call the closure inside the query string and assign the results to a new column, `Sum`. Here, `f` is called using values in the `X` and `Y` columns.

```groovy test-set=1
resultNumbers = numbers.update("Sum = f(X, Y)")
```

The complete code block is shown below. We define a closure `f` and use it to create a new table. The new table contains the `X` and `Y` columns from `numbers`, plus a new `Sum` column, which is the summation of columns `X` and `Y`.

```groovy order=numbers,resultNumbers
numbers = newTable(
    intCol("X", 2, 4, 6),
    intCol("Y", 8, 10, 12)
)

f = { a, b ->
    return a + b
}

resultNumbers = numbers.update("Sum = f(X, Y)")
```

Once a Groovy closure is created, it can be reused. For example, `f` can be used, without redefinition, to add columns from a new `words` table. Here, we make this table with string columns using [`newTable`](../reference/table-operations/create/newTable.md) and [`stringCol`](../reference/table-operations/create/stringCol.md).

```groovy test-set=1 order=words,resultWords
words = newTable(
    stringCol("Welcome", "Hello ", "Hola ", "Bonjour "),
    stringCol("Day", "Monday", "Tuesday", "Wednesday")
)

resultWords = words.view("Greeting = f(Welcome, Day)")
```

Now you are ready to use your own Groovy closures in Deephaven!

## Related documentation

- [Create a new table](./new-table.md)
- [Use variables and functions in query strings](../how-to-guides/queryscope.md)
- [`update`](../reference/table-operations/select/update.md)
- [`intCol`](../reference/table-operations/create/intCol.md)
- [`stringCol`](../reference/table-operations/create/stringCol.md)
- [`newTable`](../reference/table-operations/create/newTable.md)
