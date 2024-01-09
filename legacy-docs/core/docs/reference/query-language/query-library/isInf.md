---
id: isInf
title: isInf
---

`isInf` returns a boolean value indicating whether or not the specified value is infinite.

## Syntax

```
isInf(value)
```

## Parameters

<ParamTable>
<Param name="value" type="Union[double, float]">

The value to check.

</Param>
</ParamTable>

## Returns

`True` if the value parameter is infinite; `False` otherwise.

## Examples

The following example shows how `isInf` interacts with various objects within a table.

```python order=source,result
from deephaven import new_table
from deephaven.column import float_col, double_col

INF = float('inf')
NEG_INF = float('-inf')

source = new_table([
    float_col("Floats", [0.0, 1.0, INF, NEG_INF]),
    double_col("Doubles", [0.0, 1.0, INF, NEG_INF])
])

result = source.update(formulas=["FloatsInf = isInf(Floats)", "DoublesInf = isInf(Doubles)"])
```

## Related documentation

- [How to handle nulls, infs, and NaNs](../../../how-to-guides/handle-null-inf-nan.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [`isInf`](./isInf.md)
- [`isFinite`](./isFinite.md)
- [`isNull`](./isNull.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/libs/GroovyStaticImports.html#isInf(T)>)
