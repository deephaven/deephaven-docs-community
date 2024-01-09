---
id: isFinite
title: isFinite
---

`isFinite` returns a boolean value indicating whether or not the specified value is normal, where normal is defined as not null, not infinite, and not NaN.

## Syntax

```
isFinite(value)
```

## Parameters

<ParamTable>
<Param name="value" type="Union[double, float]">

The value to check.

</Param>
</ParamTable>

## Returns

`true` if the value parameter is normal; `false` otherwise.

## Examples

The following example shows how `isFinite` interacts with various objects within a table.

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
    "FloatNormal = isFinite(Float)",
    "NullFloatNormal = isFinite(NullFloat)",
    "NaNFloatNormal = isFinite(NaNFloat)",
    "DoubleNormal = isFinite(Double)",
    "NullDoubleNormal = isFinite(NullDouble)",
    "NaNDoubleNormal = isFinite(NaNDouble)",
])
```

## Related documentation

- [How to handle nulls, Infs, and NaNs](../../../how-to-guides/handle-null-inf-nan.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [`isInf`](./isInf.md)
- [`isNaN`](./isNaN.md)
- [`isNull`](./isNull.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/libs/GroovyStaticImports.html#isFinite(T)>)
