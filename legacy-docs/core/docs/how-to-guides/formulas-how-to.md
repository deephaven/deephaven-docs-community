---
id: formulas-how-to
title: How to use formulas
sidebar_label: Use formulas
---

This guide will show you how to work with formulas in your query strings.

[Formulas](../reference/query-language/formulas/formulas.md) can be used in two contexts:

1. To filter data, such as with [`where`](../reference/table-operations/filter/where.md), [`where_in`](../reference/table-operations/filter/where-in.md), etc. In this case, they must return booleans (e.g., `"x%3 == 1"`).
2. To assign values, such as with [`update`](../reference/table-operations/select/update.md), [`view`](../reference/table-operations/select/view.md), etc. In this case, a result is set equal to a column name (e.g., `"A = x%3"`).

Regardless of the [formula](../reference/query-language/formulas/formulas.md) usage, there are common language features used to construct a [formula](../reference/query-language/formulas/formulas.md):

- [operators](../reference/query-language/formulas/operators.md) (`+`, `-`, `*`, `/`, `%`, `_`, `.`, `[]`, `()`)
- [functions](../reference/query-language/formulas/user-defined-functions.md)
- [objects](../reference/query-language/types/objects.md)
- [variables](../reference/query-language/variables/query-scope.md)
- [special variables](../reference/query-language/variables/special-variables.md)

## Filter data

You can use [formulas](../reference/query-language/formulas/formulas.md) to [filter](./use-filters.md) your data to show only what you want using [`where`](../reference/table-operations/filter/where.md).

Boolean [formulas](../reference/query-language/formulas/formulas.md) in filter methods are also known as conditional filters. These [formulas](../reference/query-language/formulas/formulas.md) are designed to return a boolean value (`true` or `false`) to narrow data sets to only desired values.

In the following example, [operators](../reference/query-language/formulas/operators.md) are used to limit values in result tables.

```python order=source,result
from deephaven import new_table

from deephaven.column import string_col, int_col

source = new_table([
        string_col("X", ["A", "B", "C", "D", "E", "F", "G"]),
        int_col("Y", [1, 2, 3, 4, 5, 6, 7]),
        int_col("Z", [2, 3, 1, 2, 3, 1, 2])
])

result = source.where(filters=["Y > 5"])
```

## Assign data

You can use [formulas](../reference/query-language/formulas/formulas.md) to add and assign new data. When a [formula](../reference/query-language/formulas/formulas.md) returns a value, it can be used with [selection methods](./use-select-view-update.md) to create columns.

In the following example, [operators](../reference/query-language/formulas/operators.md) are used to create new columns of values based on prior data.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
        string_col("X", ["A", "B", "C", "D", "E", "F", "G"]),
        int_col("Y", [1, 2, 3, 4, 5, 6, 7]),
        int_col("Z", [2, 3, 1, 2, 3, 1, 2])
])

result = source.update(formulas=["Sum = Y + Z"])
```

## More complex formulas

[Formulas](../reference/query-language/formulas/formulas.md) can be used with the full power of the query language, such as with [variables](../reference/query-language/variables/query-scope.md), [functions](../reference/query-language/formulas/user-defined-functions.md), and [objects](./use-objects.md).

In this example, [functions](../reference/query-language/formulas/user-defined-functions.md) and [objects](./use-objects.md) are used to both filter and assign values.

```python order=source,result
from deephaven import new_table

from deephaven.column import string_col, int_col

def f(a, b):
    return a * b

class MyObj:
    def __init__(self, a, b, c):
        self.a = a
        self.b = b
        self.c = c

    def compute(self, value1):
        return self.a + value1

obj = MyObj(1, 2, 3)

source = new_table([
        string_col("X", ["A", "B", "C", "D", "E", "F", "G"]),
        int_col("Y", [1, 2, 3, 4, 5, 6, 7]),
        int_col("Z", [2, 3, 1, 2, 3, 1, 2])
])

result = source.where(filters=["(int)f(Y, Z) > 9"]).update(formulas=["A = obj.a", "B = obj.compute(Y)"])
```

## Related documentation

- [Create a new table](./new-table.md)
- [Create an empty table](./empty-table.md)
- [How to use filters](./use-filters.md)
- [How to use select, view, and update](./use-select-view-update.md)
- [Formulas](../reference/query-language/formulas/formulas.md)
- [User-Defined Functions](../reference/query-language/formulas/user-defined-functions.md)
