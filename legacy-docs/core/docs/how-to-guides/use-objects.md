---
id: use-objects
title: How to use objects
sidebar_label: Use objects
---

This guide will show you how to work with [objects](../reference/query-language/types/objects.md) in your query strings.

When performing complex analyses, [objects](../reference/query-language/types/objects.md) are an invaluable tool. [Objects](../reference/query-language/types/objects.md) can contain related data and provide an easy way to access data from one source to make your program more logical or streamlined.

The Deephaven Query Language natively supports [objects](../reference/query-language/types/objects.md), allowing users to pass them, their attributes, and their methods into query strings.

## Power of objects in code

[Objects](../reference/query-language/types/objects.md) are designed to hold information or values. In the following example, operators are used with [objects](../reference/query-language/types/objects.md) to assign values.

Here, we have two [objects](../reference/query-language/types/objects.md), and each [object](../reference/query-language/types/objects.md) holds two values and a custom method. When we call one of these [objects](../reference/query-language/types/objects.md), its specific values and methods are utilized without having to pass extra parameters.

```python
from deephaven import empty_table

class SimpleObj:
    def __init__(self, a, b):
        self.a = a
        self.b = b
    def compute(self):
        return self.a + self.b
class OtherObj:
    def __init__(self, a, b):
        self.a = a
        self.b = b
    def compute(self):
        return 2 * self.a + 2 * self.b

obj1 = SimpleObj(1, 2)
obj2 = OtherObj(3, 4)

result = empty_table(5).update(formulas=["X = obj1.a", "Y = obj1.compute()", "M = obj2.a","N = obj2.compute()"])
```

## Poorly written code

If we didn't use [objects](../reference/query-language/types/objects.md), our code could get confusing and cumbersome.

In the following example, we do a similar operation as above, but without the power of [objects](../reference/query-language/types/objects.md). Notice that the compute methods require us to track the parameters, and pass them in every time we need to perform these operations.

```python
from deephaven import empty_table

def compute1(value_a, value_b):
        return value_a + value_b
def compute2(value_a, value_b):
        return 2 * value_a + 2 * value_b
a1 = 1
b1 = 2
a2 = 3
b2 = 4

result = empty_table(5).update(formulas=["X = a1", "Y = compute1(a1, b1)", "M = a2", "N = compute2(a2, b2)"])
```

Use the power of [objects](../reference/query-language/types/objects.md) in the Deephaven Query Language to make your queries more powerful and concise.

## Related documentation

- [Create an empty table](./empty-table.md)
- [User-Defined Functions](../reference/query-language/formulas/user-defined-functions.md)
- [Formulas](../reference/query-language/formulas/formulas.md)
- [Objects](../reference/query-language/types/objects.md)
