---
id: handle-null-inf-nan
title: How to handle null, infinity, and not-a-number values
sidebar_label: Handle nulls, infs, and NaNs
---

This guide will show you how to handle null, infinity, and not-a-number (NaN) values in your datasets. Not all numeric types support each of these special values.

In Deephaven, missing values are represented as **null** values. For performance reasons, each data type represents nulls differently. Complex data types, such as Objects, are stored as standard `null` references (`None` in Python). For primitive types, such as doubles and integers, a single value from the type’s range is designated by Deephaven as the null value. For example, Deephaven reserves -32768 as the null value for the `short` data type.

Floating-point data types support **not-a-number (NaN)** values, which represent undefined values. For example, dividing a number by zero or taking the square root of a negative number results in a not-a-number value. Integer data types do not have NaN values.

Floating-point data types support positive and negative **infinity** values. Integer data types do not have positive or negative infinity values.

:::note

In Python, `float` values are double-precision floating-point values. As a result, a Python `float` is a `double` in Deephaven.

:::

A simple script can be used to see the Deephaven null values:

```python
from deephaven.constants import NULL_BYTE, NULL_SHORT, NULL_INT, NULL_LONG, NULL_FLOAT, NULL_DOUBLE;

nulls = {"byte": NULL_BYTE, "short": NULL_SHORT, "int": NULL_INT, "long": NULL_LONG, "float": NULL_FLOAT, "double": NULL_DOUBLE}
print(nulls)
```

| Type   | Value                    |
| ------ | ------------------------ |
| Byte   | -128                     |
| Short  | -32768                   |
| int    | -2147483648              |
| Long   | -9223372036854775808     |
| Float  | -3.4028234663852886e+38  |
| Double | -1.7976931348623157e+308 |

## Simple example

The following example illustrates the use of a null integer value.

```python
from deephaven.constants import NULL_INT;
from deephaven import empty_table

result = empty_table(10).update(formulas=["X = (i % 2 == 0) ? NULL_INT : i", "Y = (i %2 == 1) ? null : i"])
```

## Comprehensive example

In the following example, we operate on int and double columns to illustrate the use of null, infinity, and NaN. Float columns would be similar to double columns, while long, short, and byte columns would be similar to int.

```python test-set=1 order=source,result
from deephaven import new_table

from deephaven.column import string_col, int_col, double_col
from deephaven.constants import NULL_INT, NULL_DOUBLE

POS_INF_DOUBLE = float('inf')
NEG_INF_DOUBLE = float('-inf')
NAN_DOUBLE = float('nan')

source = new_table([
    string_col("ExampleColString", ["Minus One", "Zero", "Four", "Infinity", "Negative Infinity", "Null", "Not a Number"]),
    int_col("ExampleColInt", [-1, 0, 4, NULL_INT, NULL_INT, NULL_INT, NULL_INT]),
    double_col("ExampleColDouble", [-1, 0, 4, POS_INF_DOUBLE, NEG_INF_DOUBLE, NULL_DOUBLE, NAN_DOUBLE])
])

result = source.update(formulas=["Div0ColInt = 0 / ExampleColInt", \
    "Div0ColDouble = 0 / ExampleColDouble", \
    "Div2ColDouble = 2 / ExampleColDouble", \
    "MultColInt = 5 * ExampleColInt", \
    "SqrtColDouble1 = java.lang.Math.sqrt(ExampleColDouble)", \
    "SqrtColDouble2 = sqrt(ExampleColDouble)" \
])
```

Let's walk through the query step-by-step:

1. We create a table (`source`) with int and double columns and insert negative, zero, positive, infinite, null, and NaN values into each column.
   - An additional String column is included to describe the values in the table.
   - Since the int column doesn't support infinite and NaN values, we use `NULL_INT` in place of NaN.
   - Deephaven doesn't have constants defined for NaN values, so we used the native language's built in NaN value for the double column.
2. We create a new table (`result`) that applies division, multiplication, and square root to the values in the source table. Square root is applied using both Java's math package and Deephaven's built-in `sqrt` function.

Notice the following:

- The division columns are created by dividing either 0 or 2 by the columns' values. This results in a mixture of valid numbers, infinities, and NaN values. The division operation takes into account the special (null/infinity/NaN) values.
- The new `Div0ColInt` column created by dividing the int column `ExampleColInt` is a double column.
- The square root of the negative value is NaN.
- The Java [sqrt](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#sqrt-double-) function returns null inputs as NaN, whereas the Deephaven `sqrt` function handles the null value correctly and returns the null value.

## Filter out null values

Null filtering can be accomplished with the [`isNull`](../reference/query-language/query-library/isNull.md) function. Adding the "not" [operator](../reference/query-language/formulas/operators.md) (`!`) filters for non-null values.

In the following example, we start with `result` from the comprehensive example, and filter the `Div0ColDouble` column to remove rows with null values.

```python test-set=1
filtered_not_null = result.where(filters=["!isNull(Div0ColDouble)"])
```

## Replace null values

Here are three ways to replace null values:

1. The built-in [`replaceIfNull`](<https://deephaven.io/core/javadoc/io/deephaven/function/Basic.html#replaceIfNull(byte,byte)>) function provides a simple mechanism to replace null values with another specified value.
2. A [ternary-if](../reference/query-language/control-flow/ternary-if.md) statement can perform substitution for null values.
3. A custom [function](../reference/query-language/formulas/user-defined-functions.md) can be provided to perform substitution for null values.

### Built-in `replaceIfNull` function

In the following example, we start with `result` from the comprehensive example and use the built-in [`replaceIfNull`](<https://deephaven.io/core/javadoc/io/deephaven/function/Basic.html#replaceIfNull(byte,byte)>) function to create a new column (`NullReplaced`), where null values in `Div0ColDouble` are replaced with 100.

```python test-set=1
null_replaced_1 = result.update(formulas=["DoubleNullReplaced = replaceIfNull(Div0ColDouble, 100)"])
```

### Ternary if

The following example uses the [ternary-if](../reference/query-language/control-flow/ternary-if.md) syntax to perform the null substitution, replacing null values with 200.

```python test-set=1
null_replaced_2 = result.update(formulas=["DoubleNullReplaced = Div0ColDouble == NULL_DOUBLE ? 200 : Div0ColDouble"])
```

### Custom function

In the following example, we start with `result` from the comprehensive example and use a custom-written [function](../reference/query-language/formulas/user-defined-functions.md) (`myNullDoubleReplacer`) to create a new column where null values in `Div0ColDouble` are replaced with 200.

```python test-set=1
# Python floats are double precision
def myNullDoubleReplacer(value:float) -> float:
    if value == NULL_DOUBLE:
        return 200.0
    return value

null_replaced_3 = result.update(formulas=["DoubleNullReplaced = myNullDoubleReplacer(Div0ColDouble)"])
```

## Filter out NaN values

Not-a-number (NaN) values can be filtered with the [`isNaN`](../reference/query-language/query-library/isNaN.md) function. Adding the "not" operator (`!`) filters for non-NaN values.

In the following example, we find the rows in `result` that do not include NaN values in the `Div0ColDouble` column.

```python test-set=1
filtered_not_nan = result.where(filters=["!isNaN(Div0ColDouble)"])
```

In the following example, we combine the filter to exclude both [null](../reference/query-language/query-library/isNull.md) and [NaN](../reference/query-language/query-library/isNaN.md) values:

```python test-set=1
table_filtered_both = result.where(filters=["!isNull(Div0ColDouble) && !isNaN(Div0ColDouble)"])
```

## Replace NaN values

To replace NaN values, use a [ternary-if](../reference/query-language/control-flow/ternary-if.md) statement or a custom [function](../reference/query-language/formulas/user-defined-functions.md), similar to the one used to update null values.

```python test-set=1
nan_replaced = result.update(formulas=["DoubleNaNReplaced = isNaN(Div0ColDouble) ? 200.0 : Div0ColDouble"])
```

## Handle null, infinity, and NaN values

When writing [functions](../reference/query-language/formulas/user-defined-functions.md) to handle data that may contain special values (null, NaN, or infinity), it is important to handle these values appropriately. When writing your own [functions](../reference/query-language/formulas/user-defined-functions.md), think carefully about how missing data (nulls) and not-a-number values should be treated. Will there be null inputs? Should null values be returned?

In the following example, we create a simple table that contains normal values as well as the various special values. This `source` table will be used throughout the examples in this section.

```python test-set=2
from deephaven import new_table
from deephaven.column import double_col
from deephaven.constants import NULL_DOUBLE

POS_INF_DOUBLE = float('inf')
NEG_INF_DOUBLE = float('-inf')
NAN_DOUBLE = float('nan')

source = new_table([
    double_col("ExampleColDouble", [-1, 0, 4, POS_INF_DOUBLE, NEG_INF_DOUBLE, NULL_DOUBLE, NAN_DOUBLE])
])
```

### Handle nulls

In the following example, we start with the `source` table above. To illustrate our concerns with handling special values, we'll use a simple example of a [function](../reference/query-language/formulas/user-defined-functions.md) that divides by 2. Since we're not handling null values, we divide the Deephaven null value `-Double.MAX_VALUE` by 2 and, instead of the expected null result, we get an incorrect arithmetic result.

```python test-set=2
def myFunction(value:float) -> float:
    return value / 2

result = source.update(formulas=["DoubleUpdated = myFunction(ExampleColDouble)"])
```

We need to add handling for null values.

```python test-set=2
def myFunction(value:float) -> float:
    if value == NULL_DOUBLE:
        return NULL_DOUBLE
    return value / 2

result = source.update(formulas=["DoubleUpdated = myFunction(ExampleColDouble)"])
```

Now we see the expected results.

### Check special values

In the following example, we check for each of the special values, returning a string value based on each possibility.

```python test-set=2
import math
def my_function(value:float):
    if value == NULL_DOUBLE:
        return "Value is null"
    elif math.isnan(value):
        return "Not a number"
    elif value == POS_INF_DOUBLE:
        return "Positive infinity"
    elif value == NEG_INF_DOUBLE:
        return "Negative infinity"
    else:
        return str(value)

result = source.update(formulas=["DoubleUpdated = my_function(ExampleColDouble)"])
```

## Additional methods

Deephaven provides additional built-in methods for working with null, infinite, and NaN values.

| Method                                                                                | Description                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`containsNonFinite`](../reference/query-language/query-library/containsNonFinite.md) | Returns `true` if the values contains any non-normal value, where normal is defined as not null, not infinite, and not NaN.                                                                               |
| [`isInf`](../reference/query-language/query-library/isInf.md)                         | Returns `true` if the supplied value is infinite.                                                                                                                                                         |
| [`isNaN`](../reference/query-language/query-library/isNaN.md)                         | Returns `true` if the value is NaN.                                                                                                                                                                       |
| [`isFinite`](../reference/query-language/query-library/isFinite.md)                   | Returns `true` if the value is normal, where normal is defined as not null, not infinite, and not NaN.                                                                                                    |
| [`isNull`](../reference/query-language/query-library/isNull.md)                       | Returns `true` if the value is null.                                                                                                                                                                      |
| [`replaceIfNull`](../reference/query-language/query-library/replaceIfNull.md)         | Returns a new [array](../reference/query-language/types/arrays.md) where all of the null values in the original [array](../reference/query-language/types/arrays.md) are replaced with the default value. |

## Related documentation

- [How to create an empty table](./empty-table.md)
- [How to create a new table](./new-table.md)
- [How to use the ternary conditional operator in query strings](./ternary-if-how-to.md)
- [User-Defined Functions](../reference/query-language/formulas/user-defined-functions.md)
