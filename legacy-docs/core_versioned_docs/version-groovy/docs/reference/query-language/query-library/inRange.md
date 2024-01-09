---
id: inRange
title: inRange
---

The `inRange` method checks whether a given value is within a given range.

## Syntax

```
inRange(testedValue, lowInclusiveValue, HighInclusiveValue)
```

## Parameters

<ParamTable>
<Param name="testedValue" type="byte">

The value to check.

</Param>
<Param name="testedValue" type="char">

The value to check.

</Param>
<Param name="testedValue" type="double">

The value to check.

</Param>
<Param name="testedValue" type="float">

The value to check.

</Param>
<Param name="testedValue" type="int">

The value to check.

</Param>
<Param name="testedValue" type="long">

The value to check.

</Param>
<Param name="testedValue" type="short">

The value to check.

</Param>
<Param name="testedValue" type="T">

The value to check.

</Param>
<Param name="lowInclusiveValue" type="byte">

The lower inclusive bound of the range.

</Param>
<Param name="lowInclusiveValue" type="char">

The lower inclusive bound of the range.

</Param>
<Param name="lowInclusiveValue" type="double">

The lower inclusive bound of the range.

</Param>
<Param name="lowInclusiveValue" type="float">

The lower inclusive bound of the range.

</Param>
<Param name="lowInclusiveValue" type="int">

The lower inclusive bound of the range.

</Param>
<Param name="lowInclusiveValue" type="long">

The lower inclusive bound of the range.

</Param>
<Param name="lowInclusiveValue" type="short">

The lower inclusive bound of the range.

</Param>
<Param name="lowInclusiveValue" type="T">

The lower inclusive bound of the range.

</Param>
<Param name="highInclusiveValue" type="byte">

The upper inclusive bound of the range.

</Param>
<Param name="highInclusiveValue" type="char">

The upper inclusive bound of the range.

</Param>
<Param name="highInclusiveValue" type="double">

The upper inclusive bound of the range.

</Param>
<Param name="highInclusiveValue" type="float">

The upper inclusive bound of the range.

</Param>
<Param name="highInclusiveValue" type="int">

The upper inclusive bound of the range.

</Param>
<Param name="highInclusiveValue" type="long">

The upper inclusive bound of the range.

</Param>
<Param name="highInclusiveValue" type="T">

The upper inclusive bound of the range.

</Param>
</ParamTable>

## Returns

A boolean: `True` if the given value is within the range and `False` if it is not.

## Examples

The following example prints the results of two calls to `inRange`.

```groovy order=null
println(inRange(1, 3, 300))
println(inRange('g', 'a', 'x'))
```

## Related documentation

- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Query language functions](../query-library/query-language-function-reference.md)
