---
id: user-defined-functions
title: User-Defined Functions
---

Python, Groovy, and Java functions can be used inside query strings. These functions can be from libraries, or they can be user-defined.

The list of default Java imports can be reviewed in the [deephaven-core repository on GitHub](https://github.com/deephaven/deephaven-core/blob/main/engine/table/src/main/java/io/deephaven/engine/table/lang/impl/QueryLibraryImportsDefaults.java).

## Examples

### User-defined function

In the following example, a custom, user-defined function is used inside a query string to compute new column values.

```python order=source,result
from deephaven import new_table
from deephaven.column import int_col

source = new_table([
    int_col("X", [2, 4, 6]),
    int_col("Y", [8, 10, 12])
])

def f(a, b):
    return a * b

result = source.update(formulas=["X", "Y", "Product = f(X, Y)"])
```

### Passing tables to functions

In the following example, the `compute` function uses the `source` table and the input parameter `a`.

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

### Function from a library

In the following example, a function from a library is called.

```python
from deephaven import empty_table
import numpy as np

result = empty_table(63).update(formulas=["X = 0.1 * i", "Y = (double)np.sin(X)"])
```

### Imported Java methods

In the following example, imported Java methods are used inside the query string.

:::note
For details on how to install Java packages, see [this guide](../../../how-to-guides/install-java-packages.md).
:::

```python order=source,result
from deephaven import new_table
from deephaven.column import int_col

source = new_table([
    int_col("X", [2, 4, 6])
])
result = source.update(formulas=["Z = sqrt(X)"])

```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [Write a Python function to use in a query](../../../how-to-guides/simple-python-function.md)
- [How to use variables and functions in query strings](../../../how-to-guides/query-scope-how-to.md)
- [How to install Java packages](../../../how-to-guides/install-java-packages.md)
- [How to install Python packages](../../../how-to-guides/install-python-packages.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Query language functions](../query-library/auto-imported-functions.md)
- [update](../../table-operations/select/update.md)
- [view](../../table-operations/select/view.md)

  <!--TODO: [#450](https://github.com/deephaven/deephaven.io/issues/450) importStatic, importClass -->
