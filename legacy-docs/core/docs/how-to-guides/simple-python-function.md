---
id: simple-python-function
title: How to write a Python function to use in a query
sidebar_label: Write a Python function
---

This guide will show you how to write a Python function that can be used in the Deephaven Query Language.

By following each code step, you will add a new column to a table, which is the sum of two other columns.

In this example, a custom, user-defined function is used inside a query string to compute new column values using [`update`](../reference/table-operations/select/update.md).

In Python, you need to import all the tools your query will require. In this example, we are going to make a new table with integer columns by using [`new_table`](../reference/table-operations/create/newTable.md) and [`int_col`](../reference/table-operations/create/intCol.md).

```python test-set=1
from deephaven import new_table
from deephaven.column import int_col

numbers = new_table([
    int_col("X", [2, 4, 6]),
    int_col("Y", [8, 10, 12])
])
```

In Python, a function is defined using the `def` keyword. Information can be passed into functions as arguments. Arguments are comma-separated parameters specified after the function name, inside the parentheses. Values returned by the function are specified using the `return` keyword.

Below we define a function called `f`, which has two arguments (`a` and `b`). When `f` is called, it returns the value `a + b`. For example, `f(1, 2)` returns 3.

```python test-set=1
def f(a, b):
    return a + b
```

We now call the function inside the query string and assign the results to a new column, `Sum`. Here, `f` is called using values in the `X` and `Y` columns.

```python test-set=1
result_numbers = numbers.update(formulas=["Sum = f(X, Y)"])
```

:::note
The function `f(a, b)` will return an `org.jpy.PyObject` column unless a typecast or type hint is used. In this case, we want the resultant column to be of type `int`. For more information, see [How to handle PyObjects in tables](./pyobjects.md).
:::

The complete code block is shown below. We define a function `f` and use it to create a new table. The new table contains the `X` and `Y` columns from `numbers`, plus a new `Sum` column, which is the summation of columns `X` and `Y`.

```python order=numbers,result_numbers
from deephaven import new_table
from deephaven.column import int_col

numbers = new_table([
    int_col("X", [2, 4, 6]),
    int_col("Y", [8, 10, 12])
])

def f(a, b):
    return a + b

result_numbers = numbers.update(formulas=["Sum = f(X, Y)"])
```

Once a Python function is created, it can be reused. For example, `f` can be used, without redefinition, to add columns from a new `words` table. Here, we make this table with string columns using [`new_table`](../reference/table-operations/create/newTable.md) and [`string_col`](../reference/table-operations/create/stringCol.md).

```python test-set=1 order=words,result_words
from deephaven.column import string_col

words = new_table([
    string_col("Welcome", ["Hello ", "Hola ", "Bonjour "]),
    string_col("Day", ["Monday", "Tuesday", "Wednesday"])
])

result_words = words.view(formulas=["Greeting = f(Welcome, Day)"])
```

Now you are ready to use your own Python functions in Deephaven!

## Related documentation

- [Create a new table](./new-table.md)
- [Use variables and functions in query strings](../how-to-guides/query-scope-how-to.md)
- [`update`](../reference/table-operations/select/update.md)
- [`int_col`](../reference/table-operations/create/intCol.md)
- [`string_col`](../reference/table-operations/create/stringCol.md)
- [`new_table`](../reference/table-operations/create/newTable.md)
-
