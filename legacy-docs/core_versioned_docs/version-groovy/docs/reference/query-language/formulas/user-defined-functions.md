---
id: user-defined-functions
title: User-Defined Functions
---

Python, Groovy, and Java functions can be used inside query strings. These functions can be from libraries, or they can be user-defined.

The list of default Java imports can be reviewed in the [deephaven-core repository on GitHub](https://github.com/deephaven/deephaven-core/blob/main/engine/table/src/main/java/io/deephaven/engine/table/lang/impl/QueryLibraryImportsDefaults.java).

## Examples

### User-defined function

In the following example, a custom, user-defined function is used inside a query string to compute new column values.

```groovy order=source,result
source = newTable(
    intCol("X", 2, 4, 6),
    intCol("Y", 8, 10, 12)
)

f = { int a, int b -> a * b }

result = source.update("X", "Y", "Product = f(X, Y)")
```

### Passing tables to functions

In the following example, the `compute` function uses the `source` table and the input parameter `a`.

```groovy order=source,result1,result2
f = { int a, int b -> a * b }

compute = { Table source, int a ->
    QueryScope.addParam("var_a", a)
    return source.update("X = (int) f(var_a, A)")
}

source = newTable(intCol("A", 1, 2, 3))

result1 = compute(source, 10)
result2 = compute(source, 3)
```

### Function from a library

In the following example, a function from a library is called.

```groovy
result = emptyTable(2).update("Home = java.lang.System.getenv(`HOME`)")
```

### Imported Java methods

In the following example, imported Java methods are used inside the query string.

:::note
See [here](../../../how-to-guides/install-java-packages.md) for a more in-depth guide on installing Java packages.
:::

```groovy order=source,result
source = newTable(
    intCol("X", 2, 4, 6)
)

result = source.update("Z = sqrt(X)")
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [Write a Groovy closure to use in a query](../../../how-to-guides/simple-groovy-closures.md)
- [How to use variables and functions in query strings](../../../how-to-guides/queryscope.md)
- [How to install Java packages](../../../how-to-guides/install-java-packages.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Query language functions](../query-library/query-language-function-reference.md)
- [update](../../table-operations/select/update.md)
- [view](../../table-operations/select/view.md)

<!--TODO: [#450](https://github.com/deephaven/deephaven.io/issues/450) importStatic, importClass -->
