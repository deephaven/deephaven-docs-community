---
id: data-types
title: Data types in Deephaven and Python
sidebar_label: Data types
---

This guide discusses data types in Deephaven and Python. Proper management of data types in queries leads to cleaner, faster, and more reusable code.

## Python data types

Python has quite a few built-in data types. Let's explore some of the more common ones using Python's built-in [`type`](https://docs.python.org/3/library/functions.html?highlight=type#type) function.

```python test-set=1
def print_type(obj):
    print(f"{obj}: {type(obj)}.")

print_type(3)                           # Integer
print_type(3.14)                        # Float
print_type(3 + 3j)                      # Complex number
print_type(True)                        # Boolean
print_type("Hello world!")              # String
print_type([1, 2, 3])                   # List
print_type((1, 2, 3))                   # Tuple
print_type({"a": 1, "b": 2, "c": 3})    # Dict
```

This only covers eight built-in data types. There are _many_ more built-in types, and _a ton_ more data types when modules are considered. An important detail in the code above is that, for each built-in type, each printout shows a type of [`class`](https://docs.python.org/3/tutorial/classes.html). These built-in data types are all classes with their own properties and methods. If you've written Python code, there's a good chance you've created your own class. These classes, including the built-in types, are all objects.

If you want a complete set of information about any object in Python, the built-in [`help`](https://docs.python.org/3/library/functions.html#help) function can tell you a whole lot more.

## NumPy data types

[NumPy](https://deephaven.io/community/solutions/tech/numpy/) is known mostly for its n-dimensional array data structure and library of processing routines for them. But did you know it also has [built-in data types](https://numpy.org/doc/stable/user/basics.types.html)? These data types are very similar to that of the [Java primitives](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html), [C++ data types](https://cplusplus.com/doc/tutorial/variables/), and the data types built into CPUs and GPUs.

Let's take a look at these NumPy data types.

```python test-set=1
import numpy as np

byte_arr = np.array([1], dtype = np.byte)
short_arr = np.array([1], dtype = np.short)
int_arr = np.array([1], dtype = np.intc)
long_arr = np.array([1], dtype = np.int_)
float_arr = np.array([1], dtype = np.single)
double_arr = np.array([1], dtype = np.double)

print_type(byte_arr[0])             # byte (1 byte)
print_type(short_arr[0])            # short (2 bytes)
print_type(int_arr[0])              # int (4 bytes)
print_type(long_arr[0])             # long (8 bytes)
print_type(float_arr[0])            # float (4 bytes)
print_type(double_arr[0])           # double (8 bytes)
```

NumPy uses these data types because they match with the CPU instruction set. Most programming languages use these data types for efficiency in calculations.

## Deephaven data types

Deephaven tables, like Python and NumPy, has data types. These data types encompass columns (and by extension, cells) in tables. This can be illustrated by creating a new table with [`new_table`](/core/docs/reference/table-operations/create/newTable/), and examining the column types with [`meta_table`](/core/docs/reference/table-operations/metadata/meta_table/).

```python order=my_table,my_table_metadata
from deephaven.column import int_col, double_col, string_col
from deephaven import new_table

my_table = new_table([
    int_col("IntColumn", [1, 2, 3]),
    double_col("DoubleColumn", [1., 2., 3.]),
    string_col("StringColumn", ["A", "B", "C"])
])

my_table_metadata = my_table.meta_table
```

[`new_table`](/core/docs/reference/table-operations/create/newTable/) creates columns of specific types. In this case, `my_table` has three columns of type `int`, `double`, and `String`, respectively. An important detail of these columns is that these columns store the values as Java types. In the case of `IntColumn` and `DoubleColumn`, the types are the [Java primitive](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html) `int` and `double`, while `StringColumn` is of type [`java.lang.String`](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/String.html). This is because the Deephaven query engine is written largely in Java.

## Memory footprint in Python

Deephaven tables can also hold arbitrary [Python objects](https://deephaven.io/core/docs/reference/table-operations/create/pyobj_col/) and [Java objects](https://deephaven.io/core/docs/reference/table-operations/create/jobj_col/). These objects (and columns containing them) are both slower and more memory intensive to use than Java primitives and strings. They are rarely used in high-performance real-time queries due to these drawbacks. For high-performance cases, use primitive columns.

As mentioned in [the first section of the article](#data-types-in-python), all types in Python are objects. Python's built-in numeric types like `int` and `float` don't line up with their Java primitive equivalents. For example, a Java primitive `int` takes 4 bytes of memory. A Python `int` takes much more:

```python test-set=1
import sys

def print_size_of(my_object):
    print(f"The value {my_object} takes {sys.getsizeof(my_object)} bytes of memory.")

print_size_of(3)
```

An `int` in Python takes 28 bytes by default (this number is hardware-dependent, but this is the norm). The number 3 is small enough to be stored in only 2 bits. Storing this number in a Java primitive `int` would only take 4 bytes. Remember, a Python `int` is an arbitrary precision integer, which leads to more memory overhead. This can make working with integers in Python a breeze, but they come at the cost of performance. Python will _always_ use at least this amount of memory to store an integer. If the number is sufficiently large, Python will allocate more memory.

```python test-set=1
my_new_int = (1 << 30) - 1
my_new_bigger_int = 1 << 30
my_float = 1.2
my_bool = True

print_size_of(my_new_int)
print_size_of(my_new_bigger_int)
print_size_of(my_float)
print_size_of(my_bool)
```

As you can see, the memory footprint of `my_new_int` (a huge number) is the same as `my_int` (3). It's not until we reach `my_bigger_int`, which is only 1 more than `my_new_int`, that the required memory increases. This principle holds true for other scalar types like floats. Unfortunately, this Pythonic behavior doesn't translate well to Deephaven tables.

### Memory footprint with NumPy

NumPy data types aren't just arbitrary objects like regular Python data types. This can be shown with the [`nbytes`](https://numpy.org/doc/stable/reference/generated/numpy.ndarray.nbytes.html) attribute.

```python test-set=1
print(byte_arr.nbytes)
print(short_arr.nbytes)
print(int_arr.nbytes)
print(long_arr.nbytes)
print(float_arr.nbytes)
print(double_arr.nbytes)
```

We can see that the number of bytes required to store each of these single-element arrays is smaller than that of the equivalent Python object.

## Memory footprint in Deephaven

Deephaven tables don't know how to infer Python object types unless they are explicitly told how. Let's look at an example.

```python test-set=1 order=my_table,my_column_types
from deephaven import empty_table

def multiply_and_subtract(x, y):
    return x * y - (x + y)

my_empty_table = empty_table(5)
my_table = my_empty_table.update(["X = i", "Y = 2 * i", "Z = multiply_and_subtract(X, Y)"])
my_column_types = my_table.meta_table
```

Looking at `my_column_types`, we can see that `X` and `Y` are `int` columns, but `Z` is an `org.jpy.PyObject` column. What is an `org.jpy.PyObject`, and why is this the case?

[jpy](https://jpy.readthedocs.io/en/latest/) is the Python-Java bridge used by the query engine that does the necessary bi-directional Python-Java translations. An [`org.jpy.PyObject`](https://jpy.readthedocs.io/en/0.7.2/_static/java-apidocs/org/jpy/PyObject.html) is its generic object that holds a Python value it knows little about. This object, like other objects, is safe. It's also slow and has large memory overhead. That's not good for high-performance real-time queries and queries on big data, but it is very flexible.

When Deephaven's query engine sees the query string `Z = multiply_and_subtract(X, Y)`, it knows that `X` and `Y` are `int` columns. However, it knows little to nothing about what `multiply_and_subtract` actually does to them. Thus, in order to be safe and not raise an error, it returns a column of type `org.jpy.PyObject`, since that's the safe thing to do. Now, if you _explicitly_ typecast the output of the function in the query string, the column `Z` will be the type you want.

```python test-set=1 order=my_table,my_column_types
my_table = empty_table(5).update(["X = i", "Y = 2 * i", "Z = (int)multiply_and_subtract(X, Y)"])
my_column_types = my_table.meta_table
```

Since we told the query engine what type to return, we get our expected result.

This pattern of explicitly casting the output of Python functions in query strings is common. It ensures that your data will be of the type you want. This has some nice benefits:

- Explicit typecasts in query strings can make queries easier to understand.
- You have a high level of control over data in queries, and thus, the amount of memory required.

However, it has a minor drawback. Queries are rarely as simple as the example above. In real applications of Deephaven, a single table operation can contain dozens of query strings. When a large number of adjacent query strings have explicit typecasts, the table operation can look unsightly. So, is there an alternative?

## Python type hints

Python [type hints](https://docs.python.org/3/library/typing.html) allow you to tell the interpreter what data types to expect in both the input and output of functions. Deephaven Python queries can take full advantage of these type hints for table operations. Let's revisit the previous example, but add a type hint to the output of the function `multiply_and_subtract`.

```python test-set=1 order=my_table,my_column_types
def multiply_and_subtract(x, y) -> int:
    return x * y - (x + y)

my_table = my_empty_table.update(["X = i", "Y = 2 * i", "Z = multiply_and_subtract(X, Y)"])
my_column_types = my_table.meta_table
```

Now the `Z` column isn't just some `org.jpy.PyObject` column, but a column of Java primitives. Except, it's not an `int` column. It's a `long` column! Why is that?

We have to circle back to [the earlier section on memory in Python](#memory-footprint-in-python). A Python `int` is actually an arbitrary precision integer that can hold very large numbers. A Java primitive `int` is a 32 bit integer that can only store values up to a magnitude of ~2 billion. A Java `long`, on the other hand, can store absolutely enormous numbers, which is on par with a Python `int`. Thus, Java `long` is the closest type match for a Python `int`.

### Use NumPy

We saw earlier that NumPy's data types take up much less memory than Python objects. The data types line up nicely with Deephaven primitives. So, let's use a NumPy data type in our type hint instead.

```python test-set=1 order=my_table,my_column_types
import numpy as np

def multiply_and_subtract(x, y) -> np.intc:
    return x * y - (x + y)

my_table = my_empty_table.update(["X = i", "Y = 2 * i", "Z = multiply_and_subtract(X, Y)"])
my_column_types = my_table.meta_table
```

### Optional return values

Python's [typing](https://docs.python.org/3/library/typing.html) module not only enables type hints for a single return type, but also allows for functions to have optional return values. Deephaven's Python API supports this feature, enabling table operations to use Python functions that can create null values. The following example shows how to use `Optional` in a type hint for a function that can return either a 64 bit integer, or `None`.

```python test-set=1 order=my_table_with_nulls
from typing import Optional
import numpy as np

def myfunc(value) -> Optional[np.int64]:
    return None if value % 2 == 1 else value * 2

my_table_with_nulls = my_empty_table.update(["X = i", "Y = myfunc(X)"])
```

### Array columns

It's common for queries to produce tables with columns that contain vector data. These columns typically contain arrays of data stored as Java primitive arrays. Using type hints from [typing](https://docs.python.org/3/library/typing.html) and [numpy.typing](https://numpy.org/devdocs/reference/typing.html), Python function results can be seamlessly transformed into Java primitive arrays.

```python test-set=1 order=my_array_table,my_array_table_types
from numpy import typing as npt
import numpy as np
import typing

def array_from_cols_typing(x, y) -> typing.List[np.int32]:
    return [x, y]

def array_from_cols_np_typing(x, y) -> npt.NDArray[np.int32]:
    return np.array([x, y], dtype=np.int32)

my_array_table = my_empty_table.update([
    "X = i",
    "Y = 2 * i",
    "ArrFromList = array_from_cols_typing(X, Y)",
    "ArrFromNumPy = array_from_cols_np_typing(X, Y)"
])

my_array_table_types = my_array_table.meta_table
```

Java arrays, like NumPy arrays, can only hold a single type of data. In the event you perform an operation that produces a list that contains more than one data type, your type hint should specify that it contains the _largest_ data type. For instance, if you have an operation that produces a list that contains both integers and double precision values, the type hint should specify that the list contains double precision values.

```python test-set=1 order=array_table_two,array_table_two_types
from typing import List
import numpy as np

def arr_multiple_types(x) -> List[np.double]:
    return [x, x + 0.1]

array_table_two = my_empty_table.update([
    "X = i",
    "Array = arr_multiple_types(X)"
])

array_table_two_types = array_table_two.meta_table
```

Array columns also support the `Optional` annotation:

```python test-set=1 order=array_table_with_nulls
from deephaven import empty_table
from numpy import typing as npt
from typing import Optional
import numpy as np

def array_func(col) -> Optional[npt.NDArray[np.double]]:
    if col % 2 == 0:
        return None
    else:
        return np.array([col, col * 1.1], dtype = np.double)

array_table_with_nulls = my_empty_table.update(["X = i", "Y = array_func(X)"])
```

## Key takeaways

- Queries run faster and use less memory with known data types instead of generic objects.
- Type hints allow Deephaven to automatically determine the return type of Python functions.
- NumPy offers a much larger variety of data types than Python.
- Python methods that produce arrays should use [typing](https://docs.python.org/3/library/typing.html) and [numpy.typing](https://numpy.org/devdocs/reference/typing.html) type hints.

## Related documentation

- [How to use NumPy](/core/docs/how-to-guides/use-numpy/)
- [How to use variables and functions in query strings](/core/docs/how-to-guides/query-scope-how-to/)
- [`empty_table`](/core/docs/reference/table-operations/create/emptyTable/)
- [`meta_table`](/core/docs/reference/table-operations/metadata/meta_table/)
- [`update`](/core/docs/reference/table-operations/select/update/)
