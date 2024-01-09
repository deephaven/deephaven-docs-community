---
id: python-classes
title: How to use Python classes in query strings
sidebar_label: Use Python classes in query strings
---

This guide will show you how to use Python classes in query strings. Classes combine data and functionality for programs, and by association, queries. While this is not a comprehensive guide to Python classes, it provides an overview of types of class attributes and how they should be used in query strings.

:::note

The rules for using classes are similar to those for using variables and functions. Usage is limited to supported scopes. For more information, see [How to use variables and functions in query strings](./query-scope-how-to.md) and the [query scope concept guide](../conceptual/query-scope-concept.md).

:::

## The Python class

Classes in Python are defined using the `class` keyword. In a class, you'll find variables, functions, lambda functions, and more.

```
class MyClass:
    # Variables, methods, and more!
```

This guide will focus on the use of variables and methods defined in classes.

### Variables

Two types of variables can exist within a class: [static](#static-variables) and [instance](#instance-variables) variables.

#### Static variables

A static variable does not require the class to be instantiated to use. For instance:

```python
class MyClass:
    q = 3

print(MyClass.q)
```

In the code above, an instance of `MyClass` was not created. The class variable, `q`, can still be used, since it's a class variable. A good example of this is the Deephaven [TimeZone](https://deephaven.io/core/pydoc/code/deephaven.time.html#deephaven.time.TimeZone) class.

```python
from deephaven.time import to_j_time_zone

print(to_j_time_zone("ET"))
```

#### Instance variables

An instance variable is only created when a class is instantiated. For instance:

```python
class MyClass:
    def __init__(self, a, b):
        self.a = a
        self.b = b

my_class = MyClass(1, 2)

print(my_class.a, my_class.b)
```

In this case, `my_class.a` and `my_class.b` only exist because an instance of `MyClass` called `my_class` has been created. Instance methods tend to use the `self` keyword.

### Methods

There are three types of methods that can exist within a class: instance, class, and static methods.

#### Class methods

A class method is denoted by the `@classmethod` decorator. A class method can be called on either the class definition or an instance of the class.

```python
class MyClass:
    @classmethod
    def class_method(cls):
        return "This is a class method!", cls

my_class = MyClass()

print(MyClass.class_method())
print(my_class.class_method())
```

#### Instance methods

An instance method, just like its variable counterpart, often uses the `self` keyword and requires an instance of the class to be created before calling it. Instance methods do not need a decorator.

```python
class MyClass:
    def instance_method(self):
        return "This is an instance method!", self

my_class = MyClass()
print(my_class.instance_method)
```

#### Static methods

A static method is decorated with the `@staticmethod` decorator. It does not take the `self` or `cls` keywords, but behaves similarly to a class method.

```python
class MyClass:
    @staticmethod
    def static_method():
        return "This is a static method!"

print(MyClass.static_method())
```

## Usage in query strings

The examples in the subsections below will show you how to use class attributes in query strings.

### Variables

Both static and instance variables can be used in query strings. In both cases, the query language won't know exactly what type of data it's dealing with. So, it chooses the safest variable type it knows, which is an `org.jpy.PyObject`. This can be verified with [`meta_table`](../reference/table-operations/metadata/meta_table.md).

```python order=result_meta,result
from deephaven import empty_table

class MyClass:
    a = 1
    def __init__(self, b):
        self.b = b

my_class = MyClass(2)

result = empty_table(1).update(["X = MyClass.a", "Y = my_class.b"])
result_meta = result.meta_table
```

Columns of type `org.jpy.PyObject` rarely play well with other, more well-known data types. For instance:

```python should-fail
from deephaven import empty_table

class MyClass:
    a = 1
    def __init__(self, b):
        self.b = b

my_class = MyClass(2)

result = empty_table(1).update(["X = 2 * MyClass.a"])
```

The Deephaven query parser cannot find any methods that multiply a Java primitive `int` with an `org.jpy.PyObject`, so the error is thrown. The solution is to include explicit typecasts when using class variables.

```python order=result,result_meta
from deephaven import empty_table

class MyClass:
    a = 1
    def __init__(self, b):
        self.b = b

my_class = MyClass(2)

result = empty_table(1).update(["X = 3 * (int)MyClass.a", "Y = 6.1 * (double)my_class.b"])
result_meta = result.meta_table
```

### Methods

Class methods obey similar rules to those that exist outside of classes. The biggest difference is that type inferences in class methods will _not_ work in query strings. Explicit typecasts are required to cast the output of the method to the correct type.

The following example calls a class method in two separate query strings. The first uses a typecast, whereas the second does not. As a result, the `Z` column is of type `org.jpy.PyObject`.

```python order=source,result,result_meta
from deephaven import empty_table
import numpy as np

class MyClass:
    my_value = 3

    @classmethod
    def change_value(cls, new_value) -> np.intc:
        MyClass.my_value = new_value
        return new_value

source = empty_table(1).update(["X = (int)MyClass.my_value"])

result = source.update(["Y = (int)MyClass.change_value(5)", "Z = MyClass.change_value(12)"])
result_meta = result.meta_table
```

The following example calls a static method in two separate query strings. The output is typecast to an `int` to avoid having an `org.jpy.PyObject` column.

```python order=result
from deephaven import empty_table

class MyClass:
    @staticmethod
    def multiply_modulo(x, y, modulo):
        if modulo == 0:
            return x * y
        return (x % modulo) * (y % modulo)

result = empty_table(10).update(["X = i", "Y = (int)MyClass.multiply_modulo(11, 16, X)"])
```

The following example calls an instance method. To use the instance method in a query string, an instance of the class must be created.

```python order=result
from deephaven import empty_table

class MyClass:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def multiply_modulo(self, modulo):
        if modulo == 0:
            return self.x * self.y
        return (self.x % modulo) * (self.y % modulo)

my_class = MyClass(15, 6)

result = empty_table(10).update(["X = i", "Y = (int)my_class.multiply_modulo(X)"])
```

## Key takeaways

- Instance methods and variables require an instance of the class to be created before being used.
- Static variables, static methods, and class methods can be called on either the class itself or an instance of the class.
- Class variable types, both static and instance, result in an `org.jpy.PyObject` column type unless given an explicit typecast.
- Query strings that call class methods also require explicit typecasts. Type inferences do _not_ work in the query string for class methods.

## Related documentation

- [How to create an empty table](./empty-table.md)
- [How to use functions and variables in query strings](./query-scope-how-to.md)
- [Use variables in query strings](../conceptual/query-scope-concept.md)
