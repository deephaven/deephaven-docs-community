---
id: query-scope-how-to
title: How to use variables and functions in query strings
sidebar_label: Use variables and functions in query strings
---

This guide will show you techniques for using variables and functions in query strings. There are many reasons to use variables: more understandable code, better reusability, and in some cases, improved efficiency.

In Python, the Deephaven Query Language can use variables that are visible when a query is defined.

This example case will walk you through the process of using variables and functions in Python.

If you'd like to learn more about query strings and the basic rationale of variables in Python and query scope, see our [conceptual guide](../conceptual/query-scope-concept.md).

:::note

Variable and function names are case-sensitive.

:::

## Use variables in a query string

Query strings resolve variables in a similar manner to Python's LEGB (Local, Enclosing, Global, Built-in) scoping rule. In Deephaven query strings, only the L (local) and G (global) scopes are directly supported. Variables are first searched for in the local (function) scope, followed by the global (module) scope. The built-in scope is wholly unsupported, and the enclosing scope is only supported indirectly. Objects that exist in the enclosing scope can be used in query strings through the use of the [`nonlocal`](#enclosing-nonlocal-scope) keyword.

### Global (module) scope

The following query uses the global (module) scope for all operations.

```python order=source,result
from deephaven import empty_table

factor1 = 2
factor2 = 5

source = empty_table(50).update(["X = i % factor1", "Y = i % factor2"])
result = source.update(["Z = Y * X"])
```

### Local (function) scope

The following query creates a table using the variable `a`. The variable `a` is defined in the global (module) scope as well as the function scope of `func`. The global variable `a` is also passed in as an argument to `func`. The function scope has higher precedence, so the table contains the value 6. Once the function is called, the global variable `a` is still 4, since `func` doesn't return `a`.

```python order=result
from deephaven import empty_table

a = 4

def func(a):
    a = 6
    return empty_table(1).update(["A = a"])

result = func(a)
```

## Use functions in a query string

We can also define a function and use it inside a query string.

In the next example, `my_function` is defined and is called from the query string.

```python order=source,result
from deephaven import new_table
from deephaven.column import int_col

import numpy as np

def my_function(a) -> np.intc:
    return a * (a + 1)

source = new_table([int_col("A", [1, 2, 3])])

result = source.update(formulas=["X = my_function(A)"])
```

## Encapsulate query logic in functions

It is very common to encapsulate query logic within functions to create cleaner, more readable code. Such functions may use variables in query strings.

In this example, the `compute` function performs a query using the `source` table and the input parameter `a`. Here, `a` is defined in the local scope of the `compute` function, and can only be accessed from within the function itself.

```python order=source,result1,result2
from deephaven import new_table
from deephaven.column import int_col

import numpy as np

def f(a, b) -> np.intc:
    return a * b

def compute(source, a):
    return source.update(formulas=["X = f(a, A)"])

source = new_table([int_col("A", [1, 2, 3])])

result1 = compute(source, 10)
result2 = compute(source, 3)
```

## Enclosing (nonlocal) scope

The enclosing scope can be used in queries if the `nonlocal` keyword is used to bring the enclosing (nonlocal) variable into the local scope. In this example, `inner_var` is in the local (function) scope, and `outer_var` is in the enclosing (nonlocal) scope. `nonlocal outer_var` is needed to bring the enclosing (nonlocal) scope variable into the local scope of `f_inner` so that it can be used in the query string.

```python order=t
from deephaven import empty_table

def f_outer(outer_var):

    def f_inner(inner_var):
        nonlocal outer_var
        return empty_table(1).update(["X = inner_var", "Y = outer_var"])

    return f_inner(5)

t = f_outer(3)
```

## Example

In this example, we want to know how much sales tax we will pay in various states given how much money is spent. The variable `sales_price` is defined in the local scope of `compute_tax`, and thus, it can only be used from within `compute_tax`.

```python order=source,result1,result2
from deephaven import new_table
from deephaven.column import  double_col, string_col

def compute_tax(source, sales_price):
    return source.update(formulas=["Taxed = SalesTaxRate * sales_price * 0.01"])

source = new_table([
            string_col("State", ["CO", "WY", "UT", "AZ", "NV"]),
            double_col("SalesTaxRate", [2.9, 4, 5.95, 5.6, 6.85])
])

result1 = compute_tax(source, 500)
result2 = compute_tax(source, 300)
```

## Related documentation

- [Understanding the query scope](../conceptual/query-scope-concept.md)
- [Create a new table](./new-table.md)
- [Query scope](../reference/query-language/variables/query-scope.md)
- [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/engine/context/QueryScope.html)
