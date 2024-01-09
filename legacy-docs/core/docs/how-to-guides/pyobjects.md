---
id: pyobjects
title: How to handle PyObjects in tables
sidebar_label: Handle PyObjects
---

This guide will cover how to deal with an [`org.jpy.PyObject`](https://jpy.readthedocs.io/en/0.7.2/_static/java-apidocs/org/jpy/PyObject.html) column in tables. For the sake of brevity, these columns will be called `PyObject`s for the remainder of this guide.

A `PyObject` is an artifact of [jpy](https://github.com/jpy-consortium/jpy), the bi-directional Python-Java bridge that connects Deephaven's Python API to its Java backend. For more background information on Deephaven data types -- Python, Java, and jpy -- see the following links:

- [How to use jpy](./use-jpy.md)
- [Data types in Deephaven](../conceptual/data-types.md)
- [The Python-Java boundary](../conceptual/python-java-boundary.md)

`PyObject` columns should typically be avoided, as their usage will almost always result in downstream errors in queries, as well as degraded performance. This guide will present strategies to avoid creating `PyObject` columns.

## What is a PyObject?

A `PyObject` is a generic Java object that holds a Python object of some kind. It gets used when the engine hasn't been told enough about the type of data returned by a Python function or other Python process. The type is used because it's safe. A `PyObject` can hold any arbitrary Python object such as a list, dictionary, int, float, etc. Unfortunately, that flexibility comes at the cost of compatibility and speed.

### Limitations

The code below produces a table with three columns using [`empty_table`](../reference/table-operations/create/emptyTable.md). The three columns are as follows:

- `X` is 1/10th of the row index created using [`i`](../reference/query-language/variables/special-variables.md).
- `SinX` is created using the built-in [`sin`](<https://deephaven.io/core/javadoc/io/deephaven/function/Numeric.html#sin(double)>) function.
- `NumpySinX` is created using NumPy's [`sin`](https://numpy.org/doc/stable/reference/generated/numpy.sin.html) function.

As a result, `X` and `SinX` are `double` columns, and `NumpySinX` is a `PyObject` column.

```python test-set=1 order=source,source_meta
from deephaven import empty_table
import numpy as np

source = empty_table(10).update(["X = 0.1 * i", "SinX = sin(X)", "NumpySinX = np.sin(X)"])
source_meta = source.meta_table
```

This seems fine at first. But, what if we try to calculate the difference between the `SinX` and `NumpySinX` columns?

```python test-set=1 should-fail
result = source.update(["Difference = SinX - NumpySinX"])
```

The code raises an exception with the message `Cannot find method plus(int, org.jpy.PyObject)`. In Java, there is no addition operator that can handle those two data types. It makes sense that this doesn't work. As stated before, a `PyObject` is so generic that it can hold any Python data type. So, if it holds a dictionary, what is the correct way to add a dictionary and an integer together? There isn't one. This limitation extends to far more than just integer values. They are incompatible with a wide range of operations.

Thankfully, the built-in [`sin`](<https://deephaven.io/core/javadoc/io/deephaven/function/Numeric.html#sin(double)>) function is always available. For operations where no built-in method exists, a typecast or a type hint can do the trick. In the example below, the `TypecastSinX` and `TypehintSinX` columns use those, respectively:

```python test-set=1 order=source_meta,source
from deephaven import empty_table
import numpy as np

def np_sin_typehint(val) -> np.double:
    return np.sin(val)

source = empty_table(10).update([
    "X = 0.1 * i",
    "SinX = sin(X)",
    "TypecastSinX = (double)np.sin(X)",
    "TypehintSinX = np_sin_typehint(X)"
])
source_meta = source.meta_table
```

`source_meta` shows that all four columns in `source` are now double columns.

The rest of this guide will show how to avoid creating `PyObject` columns in your queries.

## Scalar columns

The previous example showed how a column of `PyObject` scalar values (e.g., integers and decimal numbers) can affect queries. There are three ways to avoid creating `PyObject` columns full of scalar values.

### Built-in query language methods

Deephaven's query language has a [large number of built-in methods](../conceptual/python-java-boundary.md#whats-built-into-the-query-language) that can be used in place of Python functions.

```python order=source,source_meta
from deephaven import empty_table
import numpy as np

source = empty_table(10).update(["X = 0.2 * i", "Y_PyObject = np.sin(X)", "Y_Double = sin(X)"])
source_meta = source.meta_table
```

### Python type hints

If the query language doesn't have a function to perform a specific operation, a Python [type hint](https://docs.python.org/3/library/typing.html) will cast the result to the proper type. We recommend using [NumPy data types](https://numpy.org/doc/stable/user/basics.types.html) over [Python built-in types](https://docs.python.org/3/library/stdtypes.html) for type hints, as they have a one-to-one translation to the [Java primitives](https://docs.oracle.com/en/java/javase/17/docs/api/java.compiler/javax/lang/model/type/PrimitiveType.html) Deephaven tables typically use.

```python order=source,source_meta
from deephaven import empty_table
import numpy as np

def bessel(value) -> np.double:
    return np.i0(value)

source = empty_table(10).update(["X = i", "Y = bessel(X)"])
source_meta = source.meta_table
```

### Type casts

If all else fails, an explicit typecast can be performed in the query string.

```python order=source,source_meta
from deephaven import empty_table
import numpy as np

def bessel(value):
    return np.i0(value)

source = empty_table(10).update(["X = i", "Y_PyObject = bessel(X)", "Y_TypeCast = (double)Y_PyObject"])
source_meta = source.meta_table
```

## String columns

Python functions that return string values can lead to `PyObject` columns.

### Python type hints

Like with scalar columns, type hints work the same way. For strings, Python's built-in [string](https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str) type works great as the type hint.

```python order=source,source_meta
from deephaven import empty_table

def str_from_num(value) -> str:
    if value == 1:
        return "one"
    elif value == 2:
        return "two"
    elif value == 3:
        return "three"
    else:
        return "Out Of Range"

source = empty_table(10).update(["X = i", "Y = str_from_num(X)"])
source_meta = source.meta_table
```

### Type casts

An explicit type cast in the query string works as well. You can use the abbreviated `String` or full name `java.lang.String` to the same effect.

```python order=source,source_meta
from deephaven import empty_table

def str_from_num(value):
    if value == 1:
        return "one"
    elif value == 2:
        return "two"
    elif value == 3:
        return "three"
    else:
        return "Out Of Range"

source = empty_table(10).update(["X = i", "Y = (String)str_from_num(X)"])
source_meta = source.meta_table
```

## Array columns

Typehints using [typing](https://docs.python.org/3/library/typing.html) and [numpy.typing](https://numpy.org/devdocs/reference/typing.html) and [typing](https://docs.python.org/3/library/typing.html) are the best and most flexible ways to handle arrays of data. Alternatively, Python functions can use [jpy](./use-jpy.md) directly to return a Java array, but the query string must cast the result to the appropriate array type.

`PyObject` columns that store arrays of data can be a bit trickier to deal with than scalar and string columns. Thankfully, Python modules like [numpy.typing](https://numpy.org/devdocs/reference/typing.html) and [typing](https://docs.python.org/3/library/typing.html) allow type hints to be used to return array columns of the desired type. Alternatively, [jpy](./use-jpy.md) can be invoked directly to return a Java array, which the query engine will understand by default.

```python order=source,source_meta
from deephaven import empty_table
from numpy import typing as npt
import numpy as np
import typing
import jpy

def return_py_array(idx):
    return [idx, idx + 1]

def return_j_array(idx):
    return jpy.array("int", [idx, idx + 1])

def array_typing(idx) -> typing.List[np.intc]:
    return [idx, idx + 1]

def numpy_arr_typing(idx) -> npt.NDArray[np.intc]:
    return np.array([idx, idx + 1])

source = empty_table(10).update([
    "PyObj = return_py_array(i)",
    "IntArrFromJpy = (int[])return_j_array(i)",
    "IntArrFromTyping = array_typing(i)",
    "IntArrFromNumPy = numpy_arr_typing(i)"
])
source_meta = source.meta_table
```

## Related documentation

- [How to use Python functions in queries](./simple-python-function.md)
- [How to use built-in query language functions](./query-language-functions.md)
- [How to use jpy](./use-jpy.md)
- [Data types in Deephaven](../conceptual/data-types.md)
- [The Python-Java boundary](../conceptual/python-java-boundary.md)
