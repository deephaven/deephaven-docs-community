---
id: operators
title: Operators
---

Operators can be used to construct [formulas](./formulas.md). These operators include:

- `+` Addition - Adds values.
- `-` Subtraction - Subtracts right value from left value.
- `*` Multiplication - Multiplies the left and right values.
- `/` Division - Divides left value by the right value.
- `%` Modulus - Divides left value by the right value and returns the remainder.
- `_` Underscore - Accesses an [array](../types/arrays.md) of all values within the column.
- `[]` - Index - Indexes [array](../types/arrays.md) elements.
- `.` Dot - Accesses members of a package or a class.
- `(type)` Casting - Casts from one type to another.
- `>, >=, <, and <=` Comparison operators - Returns greater than, greater than or equal, less than, and less than or equal.

## Example

In this example, operators are used with [objects](../types/objects.md) to create new columns of values.

```groovy
class MyObj {
    public int a, b, c

    MyObj(int a, int b, int c) {
        this.a = a
        this.b = b
        this.c = c
    }

    int compute(int value1){
        return  value1
    }
}

obj = new MyObj(1, 2, 3)

result = emptyTable(10).update(
	            "A = i",
	            "B = A * A",
	            "C = A / 2",
	            "D = A % 3",
	            "E = (int) C",
	            "F = A_[i-2]",
	            "G = obj.a",
	            "H = obj.compute(A)",
	            "I = sqrt(A)"
	        )
```

In this example, comparison operators are used to grab specific integers from a table.

```groovy order=source,greaterThan,greaterThanOrEqual,lessThan,lessThanOrEqual
source = newTable(
    intCol("Value", 0, 1, 2, 3, 4, 5, 6)
)

greaterThan = source.where("Value > 3")
greaterThanOrEqual = source.where("Value >= 3")
lessThan = source.where("Value < 3")
lessThanOrEqual = source.where("Value <= 3")
```

## Related documentation

- [Create an empty table](../../../how-to-guides/empty-table.md)
- [How to use filters](../../../how-to-guides/use-filters.md)
- [How to use select, view, and update](../../../how-to-guides/use-select-view-update.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Query language functions](../query-library/query-language-function-reference.md)
- [Formulas](./formulas.md)
- [update](../../table-operations/select/update.md)

<!-- TODO: [514](https://github.com/deephaven/deephaven.io/issues/514)link to "Filters" and "Select" generally in docs #514-->
