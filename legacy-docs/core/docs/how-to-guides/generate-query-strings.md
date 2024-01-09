---
id: generate-query-strings
title: How to programmatically generate query strings with Python
sidebar_label: Programmatically generate query strings
---

The Deephaven Query Language allows users to write very powerful queries to filter and modify tables of data. As an example, consider this case that uses a formula to compute a new column and another formula to filter the resulting table.

```python order=result,source
from deephaven import new_table
from deephaven.column import int_col

source = new_table([
    int_col("Value", [0, 1, 2, 3, 4, 5, 6])
])

result = source.update("X = sqrt(Value) + i").where("2 < X && X < 8")
```

At their heart, Deephaven query strings are just [Python strings](https://docs.python.org/3/library/string.html). As such, all of the power of Python can be used to generate query strings. This can be convenient when working with complex queries. Let's work though a few examples that are simplified by using Python to generate query strings.

:::note

This guide assumes you are familiar with the use of [strings](https://docs.python.org/3/library/string.html), [f-strings](https://peps.python.org/pep-0498/), [loops](https://wiki.python.org/moin/ForLoop), and [list comprehension](https://peps.python.org/pep-0202/) in Python. If not, please refer to the Python documentation for more information.

:::

## Many columns

In practice, queries may have a large number of inputs, making it inconvenient to type in each column name. Other times, the input column names are determined by user inputs and are not known when the query is written. Both of these situations can be addressed by using a list of column names to generate queries.

In the following example, an [f-string](https://peps.python.org/pep-0498/) and [`str.join`](https://docs.python.org/3/library/stdtypes.html#str.join) are used to create a query string to sum up all of the columns and then take the square root.

```python order=result,source
from deephaven import new_table
from deephaven.column import int_col

cols = ["A", "B", "C", "D"]

source = new_table([int_col(c, [0, 1, 2, 3, 4, 5, 6]) for c in cols])

result = source.update(f"X = sqrt(sum({','.join(cols)}))")
```

If the list of columns changes, the query string programatically adapts:

```python order=result,source
from deephaven import new_table
from deephaven.column import int_col

cols = ["A", "B", "C", "D", "E"]

source = new_table([int_col(c, [0, 1, 2, 3, 4, 5, 6]) for c in cols])

result = source.update(f"X = sqrt(sum({','.join(cols)}))")
```

## Repeated logic

Some queries repeat the same logic -- with minor tweaks. For example, a query may add columns containing data from 1, 5, and 10 minutes ago. Generated query strings can also help simplify these situations.

In the following example, an [f-string](https://peps.python.org/pep-0498/) is used to create columns of data from 1, 5, and 10 rows before.

```python order=result,source
from deephaven import empty_table

source = empty_table(100).update("X = ii")

offsets = [1, 5, 10]

result = source

for offset in offsets:
    result = result.update(f"X{offset} = X_[ii-{offset}]")
```

This can be simplified further by using a [list comprehension](https://peps.python.org/pep-0202/).

```python order=result,source
from deephaven import empty_table

source = empty_table(100).update("X = ii")

offsets = [1, 5, 10]
result = source.update([f"X{offset} = X_[ii-{offset}]" for offset in offsets])
```

## Be creative!

Programatically generating query strings works for all Deephaven operations, not just [`update`](../reference/table-operations/select/update.md). For example, this case uses multiple programatically generated query strings while performing a join.

```python order=result,source
from deephaven import empty_table

source = empty_table(100).update(["X = ii", "Y = X", "Z = sqrt(X)"])

offsets = [1, 5, 10]

result = source

for offset in offsets:
    result = result.natural_join(source.update(f"XOffset = X+{offset}"), on="X=XOffset", joins=[f"Y{offset}=Y", f"Z{offset}=Z"])
```

## Related documentation

- [Think like a Deephaven ninja](../conceptual/ninja.md)
- [Python strings](https://docs.python.org/3/library/string.html)
- [Python f-strings](https://peps.python.org/pep-0498/)
- [Python loops](https://wiki.python.org/moin/ForLoop)
- [Python comprehensions](https://peps.python.org/pep-0202/)
- [Create a new table](./new-table.md)
- [Create an empty table](./empty-table.md)
- [Use Formulas](./formulas-how-to.md)
- [Use built-in query language functions](./query-language-functions.md)
- [Use variables and functions in query strings](./query-scope-how-to.md)
- [Functions](../reference/query-language/formulas/user-defined-functions.md)
- [Operators](../reference/query-language/formulas/operators.md)
- [Formulas](../reference/query-language/formulas/formulas.md)
- [Query scope](../reference/query-language/variables/query-scope.md)
- [Special variables](../reference/query-language/variables/special-variables.md)
