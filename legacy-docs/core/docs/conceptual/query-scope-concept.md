---
id: query-scope-concept
title: Use variables in query strings
---

This guide will explain techniques for using variables and functions in query strings. There are many reasons to use variables: more understandable code, better reusability, and in some cases, improved efficiency.

We'll start with an example query, and then unpack each element as we go along to home in on specific concepts.

Consider the following query.

```python order=source,result
from deephaven import new_table
from deephaven.column import int_col

var = 3

def f(a, b):
    return a + b

source = new_table([
    int_col("A", [1, 2, 3, 4, 5]),
    int_col("B", [10, 20, 30, 40, 50])
])

result = source.update(formulas=["X = A + 3 * sqrt(B) + var + (int)f(A, B)"])
```

In this example, the query string is the combined expression `X = A + 3 * sqrt(B) + var + (int) f(A, B)`. The entire expresion of `X = A + 3 * sqrt(B) + var + (int) f(A, B)` above is a query string. It is passed to a query and executed against data - it is a fully formed statement. Creating a query string involves using columns, variables, operators, keywords, expressions, and methods to compute the desired result.

Inside the query string are several elements:

- `X` is a column in the new table.
- `A` and `B` are columns in the source table.
- `*` is an operator.
- `sqrt` is the built-in square root function.
- `(int)` is a cast to ensure the function `f()` returns an integer and not a string.
- `f()` is our previously defined function.
- `var` is a variable.

A compiler inside Deephaven converts the query string into executable code. As part of the compilation, all of the symbols in the query string must be associated with values. These values are resolved at the point the query is defined. In this example, values for `var` and `f` are determined at the point [`update`](../reference/table-operations/select/update.md) is called.

### Python scoping Rules

Python queries resolve variables using the "LEGB" rule, which means variables are resolved with the following priority:

- Local (or function) scope
  - These are variables defined within a function, lambda expression, or comprehension.
- Enclosing (or nonlocal) scope
  - These are variables defined in the scope of an outer or enclosing function of a nested function.
- Global (or module) scope
  - These are variables defined in the top-most scope of a program, script, or module.
- Built-in scope
  - A special scope containing keywords, exceptions, and other variables that are built into Python.

### Query string scoping rules

- Local (or function) scope
  - Supported
- Enclosing (or nonlocal) scope
  - Unsupported
    - Objects that exist in the enclosing scope can _only_ be used in query strings through the use of the `nonlocal` keyword.
- Global (or module) scope
  - Supported
- Built-in scope
  - Unsupported
    - Python's built-ins have name conflicts with query string built-ins and cannot be directly used in query strings.

For more information, see [How to use variables and functions in query strings](../how-to-guides/query-scope-how-to.md) or the [query scope](../reference/query-language/variables/query-scope.md) reference documentation.

## Related documentation

- [Create a new table](../how-to-guides/new-table.md)
- [How to use variables and functions in query strings](../how-to-guides/query-scope-how-to.md)
- [Query Scope](../reference/query-language/variables/query-scope.md)
- [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/engine/table/lang/QueryScope.html)
