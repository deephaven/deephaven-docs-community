---
id: read-javadocs
title: How to read javadocs
sidebar_label: Read javadocs
---

This guide will teach you how to read Javadocs as a Python user. Users of Deephaven's Python API do not need to be knowledgeable about Java to write powerful queries. However, Deephaven's query engine is written largely in Java, so an understanding of what Javadocs are and how to use them can greatly benefit any Python user that wants to maximize the return from their queries.

## What are Javadocs?

[Javadoc](https://en.wikipedia.org/wiki/Javadoc) generates API-level documentation from Java source code. Javadocs are the primary source of documentation for Java libraries. Deephaven is no different. Deephaven's Javadocs (found at [deephaven.io/core/javadoc/](https://deephaven.io/core/javadoc/)) are an important resource and contain comprehensive reference material for all our core methods. When you first land on Deephaven's Javadocs, you see this:

![img](../assets/how-to/javadoc-landingpage.png)

The landing page for Deephaven's Javadocs contains a top menu bar, search bar, and a list of packages. The two most important items for Deephaven Python users are (in order):

- The search bar
- The package list

Most Python developers using Deephaven will only need to use the search bar, but the package list can be helpful as well.

## Java concepts for Python users

Each of the following subsections explores a Java concept that differs from Python. This is not a comprehensive list, but rather some of the biggest differences to note when using Javadocs in your queries. For a TL;DR, see [key takeaways](#key-takeaways).

### Naming conventions

The Deephaven Python API's naming conventions are defined in [PEP 8](https://peps.python.org/pep-0008/). The underlying Java also follows standard Java naming practices, which are:

- Methods and variables use `camelCase`.
- Classes and interfaces use `PascalCase`.
- Constants use `CAPITAL_CASE`.

Python differs in that methods and variables use `snake_case`.

### Packages, interfaces, classes, and methods

The landing page contains a laundry list of Java packages. But what is a Java package? It's not much different from a Python package in that it contains code Java that that's part of an API. Packages in Java are used to group similar classes and interfaces in the same way a folder is typically used in a file system to group similar files. For instance, the [`io.deephaven.api.agg`](https://deephaven.io/core/javadoc/io/deephaven/api/agg/package-summary.html) package contains classes and interfaces that form the Java implementation of Deephaven's powerful aggregations. Deephaven's Python analogue, [`deephaven.agg`](https://deephaven.io/core/pydoc/code/deephaven.agg.html#module-deephaven.agg), contains many of the same functionalities, but for Python.

A Java package will typically contain one or more interfaces and one or more classes. A Java class is similar to a Python class - it's a blueprint for how to build certain types of objects. For instance, the Deephaven Java class [`io.deephaven.api.agg.Aggregation`](https://deephaven.io/core/javadoc/io/deephaven/api/agg/Aggregation.html) contains the blueprints for implementing all of the different types of aggregations Deephaven has to offer. A Java interface is a bit different. For the sake of this document, just think of an interface as a Java mechanism to achieve abstraction, which hides implementation details from users.

Java methods live within classes. Following the previous path, [`io.deephaven.api.agg.Aggregation.AggAbsSum`](<https://deephaven.io/core/javadoc/io/deephaven/api/agg/Aggregation.html#AggAbsSum(java.lang.String...)>) is the blueprint for building an absolute sum aggregation. It's a method which is a member of a class, which is a member of a package.

Javadocs organize the packages, classes, interfaces, methods, and attributes in a hierarchical fashion.

### Data types

On its own, Python offers very few data types. It's one of the things that makes Python so accessible to new users - but it comes at the cost of performance. Thankfully, Python has a large variety of modules, some of which help alleviate the problem (such as [NumPy](https://numpy.org/) and its data types). For more information on this topic, see [data types in Deephaven](../conceptual/data-types.md).

Java offers a variety of data types. For our purposes, they fall into two categories: [primitives](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html) and [objects](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html). Primitives are what their names suggest: basic data types with no attributes. Objects, like in Python, have attributes. Objects come in an incredible variety of shapes and sizes.

In Java, primitive data types all start with a lowercase letter (e.g. `boolean`, `int`, `long`, `double`, etc.), whereas objects start with an uppercase letter (e.g. `Integer`, `Boolean`, etc.). The Java `Boolean` object simply wraps the primitive type in an object so that it has other attributes and methods.

### Method overloading

Java enables method overloading, where two distinct methods can have the same name, provided that they accept different input parameters. In Python, optional input arguments are typically used to govern a method's behavior based on different inputs. Deephaven's [Javadocs](<https://deephaven.io/core/javadoc/io/deephaven/api/agg/Aggregation.html#AggPct(double,boolean,java.lang.String...)>) have many cases of method overloading. For instance:

```java skip-test
AggPct(double percentile, boolean average, String... pairs)
AggPct(double percentile, String... pairs)
AggPct(String inputColumn, boolean average, PercentileOutput... percentileOutputs)
AggPct(String inputColumn, PercentileOutput... percentileOutputs)
```

Each `AggPct` in the block above is a different method, despite having the same name. The method that gets invoked is dependent on the number of input parameters given, as well as their type.

### Varargs

Note how, in the previous section, each overloaded method uses `...`. This is called `varargs` (short for variable arguments), and it means that an input parameter can take an arbitrary number of values. For instance, `String...` is an input data type to many of Deephaven's methods. The `...` means "zero or more", and must _always_ be the final input parameter if there is more than one input to a method. For the second overload above (`AggPct(double percentile, String... pairs)`), any of the following method calls are valid:

```java skip-test
AggPct(0.5, "Col2", "AnotherColumn", "SomeOtherColumn = Col1")
AggPct(0.2, "ColNew = ColOld")
AggPct(0.9, "A = B", "C = D", "E = F", "G = H")
AggPct(0.1)
```

## Why would a Python user need to use Javadocs?

Most Deephaven Python users won't need to use Javadocs very often. However, query strings in Deephaven implement Java code _regardless_ of which API is being used. Python queries benefit greatly from a "keep Java in Java and Python in Python as often as possible" approach. Thus, users should try to minimize the amount of Python objects they use in query strings. For more information on why, see [The Python-Java boundary](../conceptual/python-java-boundary.md). Deephaven's query library has a large variety of [built-in methods](../how-to-guides/query-language-functions.md) and attributes that users can and should take full advantage of. All of these methods can be found in the Javadocs.

## Java vs Python

To summarize all of the previous subsections, the following list provides the most important differences between Java and Python for Deephaven Python users who wish to use Javadocs:

- Java uses `camelCase` for variable names and `PascalCase` for class names. Python uses `snake_case` for variable names and `PascalCase` for class names.
- Java is strongly typed, whereas Python is dynamically typed. This means that variable types are explicitly given, and cannot change without a typecast.
- Java has overloaded methods, whereas Python does not. Python makes up for this with optional arguments with default values.
- Varargs in Java are denoted by `...`, whereas in Python they're denoted by `*args` or `**kwargs`.

## Examples

### Calculating a median

Let's assume you have a table of [OHLC](https://en.wikipedia.org/wiki/Open-high-low-close_chart) data for a particular stock. Your column names are `Open`, `High`, `Low`, and `Close`, and they all contain double values. You want to calculate the median of those values. Deephaven's [`io.deephaven.function.Numeric`](https://deephaven.io/core/javadoc/io/deephaven/function/Numeric.html) class is built into the query language, so you can use it without importing anything. The [`io.deephaven.function.Numeric.median(double... values)`](<https://deephaven.io/core/javadoc/io/deephaven/function/Numeric.html#median(double...)>) is what we're looking for.

![img](../assets/how-to/median-javadoc.png)

The image above shows two method overloads. The first is what we want to use, since the second takes a `DoubleVector` as input. Examples of proper use of `median` in this way include:

```java skip-test
// With numeric values
median(0.1, 0.5, 99.9)
median(-50.0)
// With column names
median("Col1", "Col2", "Col3")
median("MaxVal", "MinVal", "Val1", "Val2", "Val3")
```

Deephaven knows to use the numeric values in columns when column names are passed as input. The query engine will _automatically_ know which method to use based on the input arguments you provide. So, with this knowledge in hand, computing the median of those four columns is easy:

```python skip-test
stocks_median = stocks_table.update(["MedianOHLC = median(Open, High, Low, Close)"])
```

### Generating pseudorandom numbers

Say, for instance, you want to test your query against some random data. Deephaven's [`io.deephaven.function.Random`](https://deephaven.io/core/javadoc/io/deephaven/function/Random.html) class contains a wide array of pseudorandom number generators. Looking at the Javadocs, there are two overloads for `randomDouble`:

```java skip-test
randomDouble(double min, double max)
randomDouble(double min, double max, int size)
```

In this case, we want the first overload, since we only want to create a single random number. As shown in the previous section, `randomDouble` can be used with either hardcoded values or column names in a query string:

```java skip-test
// With numeric values
randomDouble(-100.0, 100.0)
randomDouble(3.14, 19.41, 5)
// With column names
randomDouble("LowestVal", "HighestVal")
randomDouble("MinPrice", "MaxPrice", "NumObservations")
```

Creating a table with pseudorandom data using these methods is simple:

```python order=test_table
from deephaven import empty_table

test_table = empty_table(10).update(["Doubles = randomDouble(0.0, 10.0)", "DoubleArrays = randomDouble(-50.0, -25.0, 5)"])
```

### Math functions

The [`io.deephaven.function.Numeric`](https://deephaven.io/core/javadoc/io/deephaven/function/Numeric.html) class contains a set of commonly used numeric functions. The link to the class's Javadoc page shows a large variety of methods that are available in query strings.

```python order=test_table
from deephaven import empty_table

test_table = empty_table(10).update(["X = i - 5", "AbsX = abs(X)", "SqrtAbsX = pow(AbsX, 0.5)", "SignumX = signum(X)"])
```

## Using the search bar

The Javadoc search bar is your best friend when using Javadocs. However, it can lead you astray if you are unsure what to look for. Thinking back to the previous example about [calculating median](#calculating-a-median), here's what the search bar looks like if you type `median`:

![img](../assets/how-to/median-javadoc-search.png)

That's _a lot_ of results. How do we find the right one? Thinking back to earlier points:

- We want a method, not a class or interface. So, all of the results in `Classes and Interfaces` can be ignored.
- Java methods use `camelCase`, so we want something named `median`, not `MEDIAN` (which is a constant by naming conventions).
- We want to calculate the median of column values, which is typically done with [varargs](#varargs), so one of the methods containing `...` is correct.

Searching for `median` alone is also going to generate a lot of results. This can be narrowed down if you know what data type you're working with. In the earlier example, the columns contained double values. So, searching instead for `median(double` narrows down the results greatly. Note that the closing parenthesis is omitted on purpose to ensure we get the right results:

![img](../assets/how-to/median-javadoc-search-specific.png)

## Key takeaways

To summarize this article, keep the following tips in mind when using Javadocs:

- Be specific when using the search bar to limit the number of results you get.
- Java uses `camelCase` for methods and `PascalCase` for classes and interfaces.
- Java uses method overloading, where different methods can have the same name, but take different input parameters.
- Java is strongly typed. All input parameters to methods must be of a specific data type.
- Java `varargs` use the syntax `...`, which means zero or more inputs of a given type. This input type _must_ come last in a Java method.
- Java methods that take primitive types as input (e.g. `double`, `int`, etc.) can take columns of that type as input.

## Related documentation

- [`empty_table`](../reference/table-operations/create/emptyTable.md)
- [Javadoc](https://deephaven.io/core/javadoc/)
