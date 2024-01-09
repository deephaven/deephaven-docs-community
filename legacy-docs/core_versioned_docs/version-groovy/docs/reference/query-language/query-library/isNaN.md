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
<Param name="value" type="byte">

The value to check.

</Param>
<Param name="value" type="double">

The value to check.

</Param>
<Param name="value" type="float">

The value to check.

</Param>
<Param name="value" type="int">

The value to check.

</Param>
<Param name="value" type="long">

The value to check.

</Param>
<Param name="value" type="short">

The value to check.

</Param>
<Param name="value" type="Byte">

The value to check.

</Param>
<Param name="value" type="Double">

The value to check.

</Param>
<Param name="value" type="Float">

The value to check.

</Param>
<Param name="value" type="Integer">

The value to check.

</Param>
<Param name="value" type="Long">

The value to check.

</Param>
<Param name="value" type="Short">

The value to check.

</Param>
</ParamTable>

## Returns

`true` if the value parameter is `NaN`; `false` otherwise.

## Examples

The following example shows how `isNaN` interacts with various objects within a table.

```groovy order=source,result
source = newTable(
    floatCol("Float", (float)1.0),
    floatCol("NullFloat", NULL_FLOAT),
    floatCol("NaNFloat", (float)-1.0),
    doubleCol("Double", 1.0),
    doubleCol("NullDouble", NULL_DOUBLE),
    doubleCol("NaNDouble", -1.0),

).update(
    "NaNFloat = java.lang.Math.sqrt(NaNFloat)",
    "NaNDouble = java.lang.Math.sqrt(NaNDouble)"
)

result = source.update(
    "FloatNaN = isNaN(Float)",
    "NullFloatNaN = isNaN(NullFloat)",
    "NaNFloatNaN = isNaN(NaNFloat)",
    "DoubleNaN = isNaN(Double)",
    "NullDoubleNaN = isNaN(NullDouble)",
    "NaNDoubleNaN = isNaN(NaNDouble)",
)
```

## Related documentation

- [How to handle nulls, infs, and NaNs](../../../how-to-guides/handle-null-inf-nan.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Query language functions](../query-library/query-language-function-reference.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/libs/GroovyStaticImports.html#isNaN(T)>)
