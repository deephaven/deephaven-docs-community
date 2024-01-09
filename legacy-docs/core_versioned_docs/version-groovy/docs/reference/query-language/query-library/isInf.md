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

`true` if the value parameter is infinite; `false` otherwise.

## Examples

The following example shows how `isInf` interacts with various objects within a table.

```groovy order=source,result
source = newTable(
    floatCol("Floats", (float)0.0, (float)1.0, POS_INFINITY_FLOAT, NEG_INFINITY_FLOAT),
    doubleCol("Doubles", 0.0, 1.0, POS_INFINITY_DOUBLE, NEG_INFINITY_DOUBLE)
)

result = source.update("FloatsInf = isInf(Floats)", "DoublesInf = isInf(Doubles)")
```

## Related documentation

- [How to handle nulls, infs, and NaNs](../../../how-to-guides/handle-null-inf-nan.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Query language functions](../query-library/query-language-function-reference.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/libs/GroovyStaticImports.html#isInf(T)>)
