---
id: use-numpy
title: How to use NumPy in Deephaven queries
sidebar_label: Use NumPy
---

This guide will show you how to use [NumPy](/community/solutions/tech/numpy/) on its own and in Deephaven Python queries.

[NumPy](https://numpy.org/) is an open-source Python module that includes a library of powerful numerical capabilities. These capabilities include support for multi-dimensional data structures, mathematical functions, and an API that enables calls to functions written in [C](https://numpy.org/doc/stable/reference/c-api/index.html) for faster performance. It is one of the most popular and widely used Python modules currently available.

[NumPy](https://numpy.org/) is a part of Deephaven's base Docker image. Most of the code in this guide will assume that the module has been imported using the following import statement.

```python
import numpy as np
```

## The N-dimensional array

The foundation upon which [NumPy](https://numpy.org/) is built is its N-dimensional array, also called an `ndarray`. This data structure is similar to that of a Python list, with the most notable exception being that every value in the `ndarray` must be of the same type. For instance, a Python list can be created that contains both numbers and characters, but that is not possible with an `ndarray`.

### Array creation

Creating an `ndarray` is simple. The code below creates a one-dimensional array (a row vector) with three elements. Then, both the array itself and its type are printed.

```python
import numpy as np
new_array = np.array([1, 2, 3])
print(new_array)
print(type(new_array))
```

Multi-dimensional arrays are created in similar fashion. The code below creates two and three-dimensional arrays.

```python
import numpy as np
array_2d = np.array([[1, 2, 3], [4, 5, 6]])
print(array_2d)

array_3d = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print(array_3d)
```

Arrays can be created using a variety of different methods. These methods expect the dimensions of the array in a list, and an optional data type.

```python
import numpy as np
# Create an empty array with 2 rows and 4 columns
empty_array_2d = np.empty([2, 4])

# Create an array of zeros (floats) with 3 columns and 2 rows
zeros_array_2d = np.zeros([3, 2], dtype=float)

# Create an array of values from 0 to 9 and reshape it to be 2d
count_array_2d = np.arange(10).reshape(5, 2)

# Create an array of complex number values from 0 to 10 in steps of 2
count_array = np.arange(0, 11, 2, dtype=np.complex64)

# Create a 3d array of random numbers
random_array_3d = np.random.rand(2, 2, 2)
```

:::note

The above code does not cover every array creation method. For a comprehensive list, see [Array creation routines in Numpy](https://numpy.org/doc/stable/reference/routines.array-creation.html) or our guide on [How to work with arrays](work-with-arrays.md).

:::

There are a large number of supported data types (`dtype`). For the full list, see [NumPy's documentation](https://numpy.org/doc/stable/reference/arrays.dtypes.html).

### Array attributes

The `ndarray` object has many attributes that can be checked. Understanding the attributes of an `ndarray` is important when creating technical portions of code; these attributes are incredibly useful for checking the accuracy of your data.

The code below creates a two-dimensional array. Then, it prints the following array attributes:

| Attribute | Description                                                  | Meaning                                                          |
| --------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| `shape`   | The size of each array dimension                             | How many rows, columns, pages, etc.                              |
| `ndim`    | The number of array dimensions                               | The length of the `shape`                                        |
| `size`    | The number of array elements                                 | The product of the `shape`                                       |
| `nbytes`  | The number of bytes of memory consumed by the array elements | The product of the `shape` times the number of bytes per `dtype` |
| `dtype`   | The data type of the elements in the array                   | Gives information on the memory footprint and data limitations   |

```python
import numpy as np
new_array = np.array([[1, 2, 3], [4, 5, 6]])
# Print the shape of new_array
print(new_array.shape)
# Print the number of dimensions of new_array
print(new_array.ndim)
# Print the size of the array
print(new_array.size)
# Print the number of bytes of memory consumed by the array's elements
print(new_array.nbytes)
# Print the data type of the array elements
print(new_array.dtype)
```

:::note

The above table and code do not print a comprehensive list of all [arrays](../reference/query-language/types/arrays.md) attributes.

:::

### Array manipulation

[Arrays](../reference/query-language/types/arrays.md) can be manipulated in many ways. This sub-section will cover some important ones. The code blocks in this subsection will manipulate one or more of the following arrays.

```python test-set=1
import numpy as np
first_array = np.array([[9, 8, 7, 6, 5], [4, 3, 2, 1, 0]])
second_array = np.random.rand(5, 2)
row_one = np.array([1, 9, 2, 8, 3])
row_two = np.array([7, 4, 6, 5, 10])
col_one = np.array([[1], [2], [3], [4], [5]])
col_two = np.array([[6], [7], [8], [9], [10]])
```

The shape of an array can be changed without modifying the array's data using `reshape`.

```python test-set=1
reshaped_first_array = first_array.reshape(5, 2)
print(reshaped_first_array)
```

An array can be flattened into a one dimension using `ravel`.

```python test-set=1
flattened_first_array = np.ravel(first_array)
print(flattened_first_array)
```

An array can be transposed using either `T` or `transpose`.

```python test-set=1
transposed_first_array_1 = first_array.T
transposed_first_array_2 = np.transpose(col_one)
print(transposed_first_array_1)
print(transposed_first_array_2)
```

Arrays can be vertically stacked (on top of one another) using `vstack` or horizontally stacked (next to one another) using `hstack`.

```python test-set=1
stacked_rows = np.vstack((row_one, row_two))
stacked_cols = np.hstack((col_one, col_two))
```

Arrays can have dimensions with size 1 removed by using `squeeze`.

```python test-set=1
print(col_one)
print(col_one.shape)
squeezed_col_one = np.squeeze(col_one)
print(squeezed_col_one)
print(squeezed_col_one.shape)
```

Similarly, the dimensions of an array can be expanded using `expand_dims`.

```python test-set=1
print(row_one)
print(row_one.shape)
expanded_row_one = np.expand_dims(row_one, axis=0)
print(expanded_row_one)
print(expanded_row_one.shape)
```

### Array operations

Array operations done on `ndarrays` will use [`numpy.linalg`](https://numpy.org/doc/stable/reference/routines.linalg.html).

The code in this section will use the following two-dimensional arrays.

```python test-set=2
import numpy as np
array_one = np.array([[1, 0, 1], [0, 2, 0], [-1, 3, 0]])
array_two = np.array([[1, 0, 0], [1, 2, 1], [0, 0, 1]])
```

Access rows or columns of matrices.

```python test-set=2
third_row_of_array_one = array_one[2, :]
print(third_row_of_array_one)
first_col_of_array_two = array_two[:, 0]
print(first_col_of_array_two)
```

Compute the dot product of two vectors using the `@` operator or `np.dot`.

```python test-set=2
# First way to do it
dot_product_1 = third_row_of_array_one @ first_col_of_array_two
# Second way to do it
dot_product_2 = np.dot(third_row_of_array_one, first_col_of_array_two)
```

Compute the eigenvalues and eigenvectors of a square array using `np.linalg.eig`.

```python test-set=2
w1, v1 = np.linalg.eig(array_one)
w2, v2 = np.linalg.eig(array_two)
```

The array norm can be computed using `np.linalg.norm`. The type of norm can be specified with a second argument. Otherwise, the two-norm (Frobenius) is the default.

```python test-set=2
# The Frobenius norm of array one
frobenius_norm1 = np.linalg.norm(array_one)
# The infinity norm of array two
inf_norm2 = np.linalg.norm(array_two, np.inf)
```

Solving a system of equations can be done by using `np.linalg.solve`. Specify a matrix and vector of the appropriate size to find its solution.

```python test-set=2
solution = np.linalg.solve(array_one, first_col_of_array_two)

print(np.allclose(np.dot(array_one, solution), first_col_of_array_two))
```

Basic math operations can be applied to arrays. The code below applies sums, differences, products, exponentials, and element-wise operations to both array one and array two.

```python test-set=2
# Column product and row sum of array one
col_prod_array_one = np.prod(array_one, axis=0)
row_sum_array_one = np.sum(array_one, axis=1)

# Difference between each element of the third row of array one
third_row_diff = np.diff(third_row_of_array_one)

# The exponential (e^x) of each element of array two
exp_array_two = np.exp(array_two)

# Element-wise sum, product, and division of the two arrays
element_wise_sum = np.add(array_one, array_two)
element_wise_prod = np.multiply(array_one, array_two)
element_wise_div = np.divide(array_one, array_two)
```

## Math functions

[NumPy](https://numpy.org/) hosts a large library of math functions. The full list of these functions can be found [here](https://numpy.org/doc/stable/reference/routines.math.html). The code below uses several of these math functions.

```python
import numpy as np
x = np.linspace(0, 2 * np.pi, 101)

# Trigonometric functions and conversions
sin_x, cos_x, tan_x = np.sin(x), np.cos(x), np.tan(x)
x_deg = np.degrees(x)
x_rad = np.radians(x_deg)

# Rounding
x_rounded_whole = np.around(x)
x_rounded_2dec = np.around(x, 2)
x_rounded_down = np.floor(x)
x_rounded_up = np.ceil(x)
```

## Integration with Deephaven tables

There are many ways to utilize [NumPy](https://numpy.org/) with Deephaven.

### Use in query strings

[NumPy](https://numpy.org/) can be [used in query strings](./query-scope-how-to.md).

```python order=source,result
from deephaven import empty_table
import numpy as np

def use_numpy(x):
   return np.exp(x)

source = empty_table(5).update(formulas=["X = i"])
result = source.update(formulas=["ExpX = use_numpy(X)"])
```

### Tables to and from NumPy arrays

Deephaven's numpy submodule defines two functions that allow quick conversion to and from tables and NumPy arrays.

:::note

When using `deephaven.numpy.to_table`, the entire table is cloned into memory. If you wish to clone a subset of a large table into a NumPy array, it's recommended using table selection operations to reduce the amount of data that will be copied.

:::

```python order=source,result
from deephaven import numpy as dhnp
from deephaven import empty_table

source = empty_table(5).update(["X = i"])

np_source = dhnp.to_numpy(table=source, cols=["X"])

print(np_source)

result = dhnp.to_table(np_array=np_source, cols=["NewX"])
```

Another way to convert tables to and from NumPy arrays is to use pandas as an intermediary. This is, generally speaking, less efficient than doing the conversion directly. This approach should be used if you wish to store a DataFrame for later use.

```python order=source,result
from deephaven import pandas as dhpd
from deephaven import empty_table

import pandas as pd

source = empty_table(5).update(["X = i"])

df_source = dhpd.to_pandas(source)
print(df_source)

np_source = df_source.values
print(np_source)

df_result = pd.DataFrame(np_source, columns=["NewX"])

result = dhpd.to_table(df_result)
```

### deephaven.learn

The [`learn`](https://deephaven.io/core/pydoc/code/deephaven.learn.html?highlight=learn#deephaven.learn.learn) function facilitates the easy transfer of table data to and from Deephaven tables.

The code below uses [`learn`](https://deephaven.io/core/pydoc/code/deephaven.learn.html?highlight=learn#deephaven.learn.learn) to see the results of calculations made using [NumPy](https://numpy.org/) in a table.

We define three functions:

- One that applies calculations to input data.
- One that gathers Deephaven table data into a [NumPy](https://numpy.org/) array.
- A third that scatters the results of calculations back into a table.

```python order=source,result
from deephaven import empty_table
from deephaven.learn import gather
from deephaven import learn
import numpy as np

source = empty_table(101).update(formulas=["X = (i / 101) * 2 * Math.PI"])


def compute_sin(x):
   return np.sin(x)


def table_to_numpy(rows, cols):
    return gather.table_to_numpy_2d(rows, cols, np_type=np.double)


def numpy_to_table(data, idx):
   return data[idx]

result = learn.learn(
   table=source,
   model_func=compute_sin,
   inputs=[learn.Input("X", table_to_numpy)],
   outputs=[learn.Output("SinX", numpy_to_table, "double")],
   batch_size=101
)
```

## Related documentation

- [Create a table with emptyTable](./empty-table.md)
- [How to use deephaven.learn](./use-deephaven-learn.md)
- [How to use pandas in Python queries](./use-pandas.md)
- [How to use Python packages](./use-python-packages.md)
- [How to use variables and functions in query strings](./query-scope-how-to.md)
- [How to write a Python function to use in a query](./simple-python-function.md)
- [`empty_table`](../reference/table-operations/create/emptyTable.md)
- [`to_pandas`](../reference/pandas/to-pandas.md)
- [User-Defined Functions](../reference/query-language/formulas/user-defined-functions.md)
- [special variables](../reference/query-language/variables/special-variables.md)
- [`update`](../reference/table-operations/select/update.md)
