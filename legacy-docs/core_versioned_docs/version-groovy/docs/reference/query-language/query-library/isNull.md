---
id: isNull
title: isNull
---

`isNull` returns a boolean value indicating whether or not the specified value is `null`.

## Syntax

```
isNull(value)
```

## Parameters

<ParamTable>
<Param name="value" type="byte">

The value to check.

</Param>
<Param name="value" type="char">

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
<Param name="value" type="T">

The value to check. In the Deephaven convention, every simple type T has a special distinguished value, `NULL_T`, which is used to represent the null value for that type. These values are enumerated in the [`QueryConstants`](https://deephaven.io/core/javadoc/io/deephaven/util/QueryConstants.html) class.

</Param>
</ParamTable>

`isNull` can take almost any generic object as its argument.

## Returns

`true` if the value parameter is `null`; `false` otherwise.

## Examples

The following example shows how `isNull` interacts with various objects within a table.

```groovy order=source,result
source = newTable(
    stringCol("Strings", "", "A", null),
    instantCol("DateTime", parseInstant("2020-01-01T00:00:00 ET"), parseInstant("2021-01-01T00:00:00 ET"), null)
)

result = source.update("StringIsNull = isNull(Strings)", "DateTimeIsNull = isNull(DateTime)")
```

## Related documentation

- [How to handle nulls, infs, and NaNs](../../../how-to-guides/handle-null-inf-nan.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Query language functions](../query-library/query-language-function-reference.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/libs/GroovyStaticImports.html#isNull(T)>)
