---
id: isNaN
title: isNan
---

`isNaN` returns a boolean value indicating whether or not the specified value is `NaN` (not-a-number).

## Syntax

```
isNaN(value)
```

## Parameters

<ParamTable>
<Param name="value" type="Union[double, float]">

The value to check.

</Param>
</ParamTable>

## Returns

`true` if the value parameter is `NaN`; `false` otherwise.

## Examples

The following example shows how `isNaN` interacts with various objects within a table.

```python order=source,result
from deephaven import new_table
from deephaven.column import float_col, double_col
from deephaven.constants import NULL_DOUBLE, NULL_FLOAT

source = new_table([
    float_col("Float", [1.0]),
    float_col("NullFloat", [NULL_FLOAT]),
    float_col("NaNFloat", [-1.0]),
    double_col("Double", [1.0]),
    double_col("NullDouble", [NULL_DOUBLE]),
    double_col("NaNDouble", [-1.0])],
).update(formulas=[
    "NaNFloat = java.lang.Math.sqrt(NaNFloat)",
    "NaNDouble = java.lang.Math.sqrt(NaNDouble)"
])

result = source.update(formulas=[
    "FloatNaN = isNaN(Float)",
    "NullFloatNaN = isNaN(NullFloat)",
    "NaNFloatNaN = isNaN(NaNFloat)",
    "DoubleNaN = isNaN(Double)",
    "NullDoubleNaN = isNaN(NullDouble)",
    "NaNDoubleNaN = isNaN(NaNDouble)",
])
```

## Related documentation

- [How to handle nulls, infs, and NaNs](../../../how-to-guides/handle-null-inf-nan.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [`isInf`](./isInf.md)
- [`isFinite`](./isFinite.md)
- [`isNull`](./isNull.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/libs/GroovyStaticImports.html#isNaN(T)>)
