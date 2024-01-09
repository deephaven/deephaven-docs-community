---
id: use-java-packages
title: How to use Java packages
sidebar_label: Use Java packages
---

This guide discusses how to use Java packages with Deephaven. To learn how to install these packages, see our guide [How to install Java packages](./install-java-packages.md).

Once a package is installed, it can be imported and used like any other Java package.

## Use packages in query strings

Installed Java packages can be used in query strings. We'll use the [Apache Commons Lang](https://commons.apache.org/proper/commons-lang/) [`RandomUtils`](https://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/RandomUtils.html) class to create a table with ten rows of random integers in a range.

```python
from deephaven import empty_table
import jpy

RandomUtils = jpy.get_type("org.apache.commons.lang3.RandomUtils")

def generate_random_int(lower_bound, upper_bound):
    return RandomUtils.nextInt(lower_bound, upper_bound)

t = empty_table(10).update(formulas=["X = generate_random_int(1, 99)"])
```

## Related documentation

- [Create an empty table](./empty-table.md)
- [How to install Java pacakges](./install-java-packages.md)
- [How to use jpy](./use-jpy.md)
