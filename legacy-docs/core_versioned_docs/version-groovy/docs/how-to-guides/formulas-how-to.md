---
id: formulas-how-to
title: How to use formulas
sidebar_label: Use formulas
---

This guide will show you how to work with formulas in your query strings.

[Formulas](../reference/query-language/formulas/formulas.md) can be used in two contexts:

1. To filter data, such as with [`where`](../reference/table-operations/filter/where.md), [`whereIn`](../reference/table-operations/filter/where-in.md), etc. In this case, they must return booleans (e.g., `"x%3 == 1"`).
2. To assign values, such as with [`update`](../reference/table-operations/select/update.md), [`view`](../reference/table-operations/select/view.md), etc. In this case, a result is set equal to a column name (e.g., `"A = x%3"`).

Regardless of the [formula](../reference/query-language/formulas/formulas.md) usage, there are common language features used to construct a [formula](../reference/query-language/formulas/formulas.md):

- [operators](../reference/query-language/formulas/operators.md) (`+`, `-`, `*`, `/`, `%`, `_`, `.`, `[]`, `()`)
- [functions](../reference/query-language/formulas/user-defined-functions.md)
- [objects](../reference/query-language/types/objects.md)
- [variables](../reference/query-language/variables/scope.md)
- [special variables](../reference/query-language/variables/special-variables.md)

## Filter data

You can use [formulas](../reference/query-language/formulas/formulas.md) to [filter](./use-filters.md) your data to show only what you want using [`where`](../reference/table-operations/filter/where.md).

Boolean [formulas](../reference/query-language/formulas/formulas.md) in filter methods are also known as conditional filters. These [formulas](../reference/query-language/formulas/formulas.md) are designed to return a boolean value (`true` or `false`) to narrow data sets to only desired values.

In the following example, [operators](../reference/query-language/formulas/operators.md) are used to limit values in result tables.

```groovy order=source,result
source = newTable(
        stringCol("X", "A", "B", "C", "D", "E", "F", "G"),
        intCol("Y", 1, 2, 3, 4, 5, 6, 7),
        intCol("Z", 2, 3, 1, 2, 3, 1, 2)
)

result = source.where("Y > 5")
```

## Assign data

You can use [formulas](../reference/query-language/formulas/formulas.md) to add and assign new data. When a [formula](../reference/query-language/formulas/formulas.md) returns a value, it can be used with [selection methods](./use-select-view-update.md) to create columns.

In the following example, [operators](../reference/query-language/formulas/operators.md) are used to create new columns of values based on prior data.

```groovy order=source,result
source = newTable(
        stringCol("X", "A", "B", "C", "D", "E", "F", "G"),
        intCol("Y", 1, 2, 3, 4, 5, 6, 7),
        intCol("Z", 2, 3, 1, 2, 3, 1, 2)
)

result = source.update("Sum = Y + Z")
```

## More complex formulas

[Formulas](../reference/query-language/formulas/formulas.md) can be used with the full power of the query language, such as with [variables](../reference/query-language/variables/scope.md), [functions](../reference/query-language/formulas/user-defined-functions.md), and [objects](./use-objects.md).

In this example, [functions](../reference/query-language/formulas/user-defined-functions.md) and [objects](./use-objects.md) are used to both filter and assign values.

```groovy order=source,result
f = { int a, int b -> a * b }

class MyObj {
    public int a, b, c

    MyObj(int a, int b, int c) {
        this.a = a
        this.b = b
        this.c = c
    }

    int compute(int value1){
        return  value1
    }
}

obj = new MyObj(1, 2, 3)

source = newTable(
        stringCol("X", "A", "B", "C", "D", "E", "F", "G"),
        intCol("Y", 1, 2, 3, 4, 5, 6, 7),
        intCol("Z", 2, 3, 1, 2, 3, 1, 2)
)

result = source.where("(int)f(Y, Z) > 9").update("A = obj.a", "B = obj.compute(Y)")
```

## Related documentation

- [Create a new table](./new-table.md)
- [Create an empty table](./empty-table.md)
- [How to use filters](./use-filters.md)
- [How to use `select`, `view`, and `update`](./use-select-view-update.md)
- [How to use objects](./use-objects.md)
- [Formulas](../reference/query-language/formulas/formulas.md)
- [User-Defined Functions](../reference/query-language/formulas/user-defined-functions.md)
