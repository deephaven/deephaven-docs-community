---
id: use-jpy
title: How to use jpy
sidebar_label: Use jpy
---

[jpy](https://jpy.readthedocs.io/en/latest/index.html) is a bi-directional Java-Python bridge that facilitates calling Java from Python and vice versa.

- Python programs that use [jpy](https://jpy.readthedocs.io/en/latest/index.html) can access Java functionalities.
- Java programs that use [jpy](https://jpy.readthedocs.io/en/latest/index.html) can access Python functionalities.

For more details on [jpy](https://jpy.readthedocs.io/en/latest/index.html), see the [jpy GitHub project](https://github.com/jpy-consortium/jpy).

The Deephaven query engine is implemented in Java. As a result, it is relatively easy to use Java from within Python. [jpy](https://jpy.readthedocs.io/en/latest/index.html) is used as the bridge between the two languages. This guide will cover how to use Java from Python. Calling Python from Java is much less common, and won't be covered here.

## Java Types

Java types can be accessed from Python by calling [`jpy.get_type`](https://jpy.readthedocs.io/en/latest/reference.html#jpy.get_type).

This first example gets [`java.lang.Runtime`](https://docs.oracle.com/javase/8/docs/api/java/lang/Runtime.html) and uses it to print the total memory available to the JVM.

```python
import jpy

Runtime = jpy.get_type("java.lang.Runtime")

rt = Runtime.getRuntime()

print(rt.totalMemory())
```

This second example gets [`java.util.Random`](https://docs.oracle.com/javase/8/docs/api/java/util/Random.html) and uses it to print a random integer and double value.

```python
import jpy

Random = jpy.get_type("java.util.Random")
rng = Random()
new_random_int = rng.nextInt(100)
new_random_double = rng.nextDouble()

print(new_random_int)
print(new_random_double)
```

## Java Arrays

Arrays of Java objects and primitives can be created in Python using [`jpy.array`](https://jpy.readthedocs.io/en/latest/reference.html#jpy.array). [Arrays](../reference/query-language/types/arrays.md) can be created in two ways:

- With a list of objects of the given type.
- With an integer size for the [array](../reference/query-language/types/arrays.md) length.

```python
import jpy

array1 = jpy.array("java.lang.String", ["Using", "jpy", "in", "Deephaven"])
array2 = jpy.array("double", 100)
array3 = jpy.array("char", 999)
```

## More information

Python's `help` function can be used to get more information on [jpy](https://jpy.readthedocs.io/en/latest/index.html):

```python
help("jpy")
```

Python's `help` function can also be used to get more information on Java types imported via [jpy](https://jpy.readthedocs.io/en/latest/index.html):

```python
import jpy

JavaRandom = jpy.get_type("java.util.Random")

rng = JavaRandom()

help(rng)
```

## Related documentation

- [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/db/util/jpy/package-summary.html)
- [Pydoc](https://deephaven.io/core/pydoc/code/jpy.html?highlight=jpy#module-jpy)
