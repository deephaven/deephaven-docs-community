---
id: containsNonFinite
title: containsNonFinite
---

`containsNonFinite` returns a boolean value indicating whether or not the specified value is non-normal, where normal is defined as not null, not infinite, and not NaN.

## Syntax

```
containsNonFinite(values...)
```

## Parameters

<ParamTable>
<Param name="values" type="byte...">

The value to check.

</Param>
<Param name="values" type="double...">

The value to check.

</Param>
<Param name="values" type="float...">

The value to check.

</Param>
<Param name="values" type="int...">

The value to check.

</Param>
<Param name="values" type="long...">

The value to check.

</Param>
<Param name="values" type="short...">

The value to check.

</Param>
<Param name="values" type="Byte[]">

The value to check.

</Param>
<Param name="values" type="Double[]">

The value to check.

</Param>
<Param name="values" type="Float[]">

The value to check.

</Param>
<Param name="values" type="Integer[]">

The value to check.

</Param>
<Param name="values" type="Long[]">

The value to check.

</Param>
<Param name="values" type="Short[]">

The value to check.

</Param>
</ParamTable>

## Returns

`true` if the value parameter is not normal; `false` otherwise.

## Examples

The following example shows how `containsNonFinite` interacts with various objects within a table.

```groovy order=source,result
source = newTable(
    doubleCol("AllNulls", NULL_DOUBLE, NULL_DOUBLE),
    doubleCol("AllNonNulls", 0.0, 0.1),
    doubleCol("SomeNulls", 0.0, NULL_DOUBLE)
)

result = source.update(
    "AllNullsResult = containsNonFinite(AllNulls_)",
    "AllNonNullsResult = containsNonFinite(AllNonNulls_)",
    "SomeNullsResult = containsNonFinite(SomeNulls_)"
)
```

## Related documentation

- [How to handle nulls, Infs, and NaNs](../../../how-to-guides/handle-null-inf-nan.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Query language functions](../query-library/query-language-function-reference.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/libs/GroovyStaticImports.html#containsNonFinite(T)>)
