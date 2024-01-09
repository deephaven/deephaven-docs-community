---
id: query-scope
title: Query Scope
---

Deephaven [query strings](../../../conceptual/query-scope-concept.md) allow complex queries to be expressed with a concise syntax. These query strings can implement [formulas](../../query-language/formulas/formulas.md) that use Python variables. For example, the [query string](../../../conceptual/query-scope-concept.md) in this [`update`](../../table-operations/select/update.md) uses the variable `a` from Python.

```python skip-test
a = 2
t2 = t.update(["Y = a * X"])
```

When the Deephaven engine compiles a [query string](../../../conceptual/query-scope-concept.md), it must be able to resolve all variables in the query string. This is done using the query scope. The Deephaven query scope follows rules similar to Python's LEGB rule, with some important distinctions.

Query strings in Deephaven Python queries resolve variables with the following precedence:

- Local (function) scope
- Global (module) scope

The enclosing (nonlocal) scope is not directly supported. If you want to use a variable in the enclosing scope in a query string, you _must_ use the `nonlocal` keyword to do so.

## Examples

:::note

Variable and function names are case-sensitive.

:::

### Local (function) scope

Variables defined in the local scope of a function or lambda expression are usable only from within that function or lambda. The following query uses the local scope to create a table, which is visible in the outermost scope. The function uses both a local and global variable to create the table.

```python order=result
from deephaven import empty_table

global_var = 99

def use_local_and_global_vars(num_rows):
    local_var = 23
    return empty_table(num_rows).update(["X = global_var * i", "Y = local_var * i"])

result = use_local_and_global_vars(10)
```

### Global (module) scope

Variables defined at the outermost scope are usable from within any query string in a query. The following query creates two variables in the outermost scope, then creates a table with those values.

```python order=result1,result2
from deephaven import empty_table

a = 1
b = 2

result1 = empty_table(1).update(["A = a", "B = b"])
result2 = empty_table(5).update(["A = i * a", "B = i * b"])
```

### Enclosing (nonlocal) scope

Variables that exist in the enclosing scope are usable from only within the enclosing scope. If you wish to use an object in the enclosing scope in a query string, you must use the `nonlocal` keyword before using it. The following query uses a variable in the enclosing scope to update a table.

```python order=result
from deephaven import empty_table

def outer_func():
    enclosing_var = 2

    def inner_func():
        nonlocal enclosing_var
        local_var = 7
        return empty_table(5).update(["X = i * local_var", "Y = i * enclosing_var"])

    return inner_func()

result = outer_func()
```

### User-defined functions in a query string

Programming languages frequently implement functions as callable [objects](../types/objects.md). Python is no different.

In the following example, `my_function` is defined in the global scope and is called from the query string twice. In the first call, `my_function` is explicitly cast to an integer because of the additional arithmetic in the query string itself. In the second call, the output of `my_function` does not need to be typecast because of the type hint in the function itself.

```python order=source,result
from deephaven import new_table
from deephaven.column import int_col

import numpy as np

def my_function(a) -> np.intc:
    return a * (a + 1)

source = new_table([int_col("A", [1, 2, 3])])

result = source.update(formulas=["X = 2 + 3 * (int)my_function(A)", "Y = my_function(X)"])
```

### Encapsulated query logic in functions

One can encapsulate query logic within functions. Such functions may use variables in query strings.

In the following example, the `compute` function performs a query using the `source` table and the input parameter `a`. Here, `a` is defined in the local scope of `compute`, and therefore can only be used from within the function itself.

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

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to use variables and functions in query strings](../../../how-to-guides/query-scope-how-to.md)
- [Use variables in query strings](../../../conceptual/query-scope-concept.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Query language formulas](../formulas/formulas.md)
- [`empty_table`](../../table-operations/create/emptyTable.md)
- [`new_table`](../../table-operations/create/newTable.md)
