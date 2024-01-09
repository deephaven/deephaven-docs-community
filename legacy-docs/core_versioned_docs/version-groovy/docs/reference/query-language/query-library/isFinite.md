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

`true` if the value parameter is normal; `false` otherwise.

## Examples

The following example shows how `isFinite` interacts with various objects within a table.

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
    "FloatNormal = isFinite(Float)",
    "NullFloatNormal = isFinite(NullFloat)",
    "NaNFloatNormal = isFinite(NaNFloat)",
    "DoubleNormal = isFinite(Double)",
    "NullDoubleNormal = isFinite(NullDouble)",
    "NaNDoubleNormal = isFinite(NaNDouble)",
)
```

## Related documentation

- [How to handle nulls, Infs, and NaNs](../../../how-to-guides/handle-null-inf-nan.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Query language functions](../query-library/query-language-function-reference.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/libs/GroovyStaticImports.html#isFinite(T)>)
