---
id: use-java-packages
title: How to use Java packages
sidebar_label: Use Java packages
---

This guide discusses how to use Java packages with Deephaven. To learn how to install these packages, see our guide [How to install Java packages](./install-java-packages.md).

Once a package is installed, it can be imported and used like any other Java package.

## Use packages in query strings

Installed Java packages can be used in query strings. We'll use the [Apache Commons Lang](https://commons.apache.org/proper/commons-lang/) [`RandomUtils`](https://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/RandomUtils.html) class to create a table with ten rows of random integers in a range.

```groovy
import org.apache.commons.lang3.RandomUtils

generate_random_int = { lower_bound, upper_bound ->
    return RandomUtils.nextInt(lower_bound, upper_bound)
}

t = emptyTable(10).update("X = generate_random_int(1, 99)")
```

## Related documentation

- [Create an empty table](./empty-table.md)
- [How to install Java pacakges](./install-java-packages.md)
