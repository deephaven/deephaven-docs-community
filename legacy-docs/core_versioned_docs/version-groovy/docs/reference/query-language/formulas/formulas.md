---
id: formulas
title: Formulas
---

Formulas are used to filter tables or to assign data to columns. The following language features can be used to construct a formula:

- [operators](./operators.md) (`+`, `-`, `*`, `/`, `%`, `_`, `.`, `[]`, `()`)
- [functions](./user-defined-functions.md)
- [objects](../types/objects.md)
- columns
- [variables](../variables/scope.md)
- [special variables](../variables/special-variables.md)

<!--TODO: link to columns (https://github.com/deephaven/deephaven.io/issues/289) -->

## Usage

### Boolean formulas

If a formula returns a boolean value (`true` or `false`), it is known as a boolean filter and can be used with filter methods. For example:

```
table.where("X > 3", "Y % 4 == 1", "Z.startsWith(`Deephaven`)")
```

Boolean formulas in filter methods are also known as conditional filters.

### Assignment formulas

If a formula returns a value, it can be used with [selection methods](../../../how-to-guides/use-select-view-update.md) to create columns. For example:

```
table.update("X = 3.14", "Y = sqrt(A) + 3")
```

<!-- TODO: [474](https://github.com/deephaven/deephaven.io/pull/474)  link to new overview page -->

## Examples

### Boolean formulas

Formulas designed to return a boolean value are useful to narrow data sets to only desired values. In this example, [operators](./operators.md) are used with functions to limit values in result tables.

```groovy order=source,result
f = { int a, int b -> a * b }

source = newTable(
        stringCol("X", "A", "B", "C", "D", "E", "F", "G"),
        intCol("Y", 1, 2, 3, 4, 5, 6, 7),
        intCol("Z", 2, 3, 1, 2, 3, 1, 2)
)

result = source.where("(int)f(Y, Z) > 9")
```

### Assignment formulas

Formulas can also assign new values. In this example, [operators](./operators.md) are used with [objects](../types/objects.md) to create new columns of values.

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

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [Create an empty table](../../../how-to-guides/empty-table.md)
- [How to use filters](../../../how-to-guides/use-filters.md)
- [How to use select, view, and update](../../../how-to-guides/use-select-view-update.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Query language functions](../query-library/query-language-function-reference.md)

<!-- TODO: [514](https://github.com/deephaven/deephaven.io/issues/514)link to "Filters" and "Select" generally in docs #514-->
