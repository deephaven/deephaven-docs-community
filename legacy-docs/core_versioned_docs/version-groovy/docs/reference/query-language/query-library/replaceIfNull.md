---
id: replaceIfNull
title: replaceIfNull
---

`replaceIfNull` takes an [array](../types/arrays.md) of values and a default value, and returns a new [array](../types/arrays.md) where all of the null values in the original [array](../types/arrays.md) are replaced with the default value.

## Syntax

```
replaceIfNull(value, replacement)
replaceIfNull(values, replacement)
```

## Parameters

<ParamTable>
<Param name="value" type="byte">

The value.

</Param>
<Param name="value" type="char">

The value.

</Param>
<Param name="value" type="double">

The value.

</Param>
<Param name="value" type="float">

The value.

</Param>
<Param name="value" type="int">

The value.

</Param>
<Param name="value" type="long">

The value.

</Param>
<Param name="value" type="short">

The value.

</Param>
<Param name="value" type="<T>">

The value.

</Param>
<Param name="values" type="byte[]">

The [array](../types/arrays.md) of values to replace nulls in.

</Param>
<Param name="values" type="char[]">

The [array](../types/arrays.md) of values to replace nulls in.

</Param>
<Param name="values" type="double[]">

The [array](../types/arrays.md) of values to replace nulls in.

</Param>
<Param name="values" type="float[]">

The [array](../types/arrays.md) of values to replace nulls in.

</Param>
<Param name="values" type="int[]">

The [array](../types/arrays.md) of values to replace nulls in.

</Param>
<Param name="values" type="long[]">

The [array](../types/arrays.md) of values to replace nulls in.

</Param>
<Param name="values" type="short[]">

The [array](../types/arrays.md) of values to replace nulls in.

</Param>
<Param name="values" type="ByteVector">

The Vector of bytes to replace nulls in.

</Param>
<Param name="values" type="CharVector">

The Vector of chars to replace nulls in.

</Param>
<Param name="values" type="DoubleVector">

The Vector of doubles to replace nulls in.

</Param>
<Param name="values" type="FloatVector">

The Vector of floats to replace nulls in.

</Param>
<Param name="values" type="IntVector">

The Vector of ints to replace nulls in.

</Param>
<Param name="values" type="LongVector">

The Vector of longs to replace nulls in.

</Param>
<Param name="values" type="ObjectVector<T>">

The Vector of objects to replace nulls in.

</Param>
<Param name="values" type="ShortVector">

The Vector of shorts to replace nulls in.

</Param>
<Param name="values" type="<T>[]">

The [array](../types/arrays.md) of values to replace nulls in.

</Param>
<Param name="replacement" type="byte">

The value that replaces nulls in the [array](../types/arrays.md).

</Param>
<Param name="replacement" type="char">

The value that replaces nulls in the [array](../types/arrays.md).

</Param>
<Param name="replacement" type="double">

The value that replaces nulls in the [array](../types/arrays.md).

</Param>
<Param name="replacement" type="float">

The value that replaces nulls in the [array](../types/arrays.md).

</Param>
<Param name="replacement" type="int">

The value that replaces nulls in the [array](../types/arrays.md).

</Param>
<Param name="replacement" type="long">

The value that replaces nulls in the [array](../types/arrays.md).

</Param>
<Param name="replacement" type="short">

The value that replaces nulls in the [array](../types/arrays.md).

</Param>
<Param name="replacement" type="<T>">

The value that replaces nulls in the [array](../types/arrays.md).

</Param>
</ParamTable>

`replaceIfNull` can take almost any generic object [array](../types/arrays.md) and default value as its arguments.

## Returns

Returns a new [array](../types/arrays.md) with null values replaced by the `replacement` parameter.

## Examples

```groovy order=source,result
source = newTable(
    stringCol("Strings", "abc", "def", null),
    intCol("Integers", 100, 200, NULL_INT)
)

defaultString = "ghi"
defaultInt = 300

result = source.update(
    "Strings = replaceIfNull(Strings, defaultString)",
    "Integers = replaceIfNull(Integers, defaultInt)"
)
```

## Related documentation

- [How to handle nulls, infs, and NaNs](../../../how-to-guides/handle-null-inf-nan.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Query language functions](../query-library/query-language-function-reference.md)
- [Arrays](../types/arrays.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/libs/GroovyStaticImports.html#replaceIfNull(T,T)>)
