---
id: len
title: len
---

The `len` method returns the length of the given input. This is useful in query strings where a user needs to get the size of a `Vector` or a Java array.

## Syntax

```
len(values)
```

## Parameters

<ParamTable>
<Param name="values" type="byte[]">

An input array for which the length will be calculated.

</Param>
<Param name="values" type="char[]">

An input array for which the length will be calculated.

</Param>
<Param name="values" type="double[]">

An input array for which the length will be calculated.

</Param>
<Param name="values" type="float[]">

An input array for which the length will be calculated.

</Param>
<Param name="values" type="int[]">

An input array for which the length will be calculated.

</Param>
<Param name="values" type="long[]">

An input array for which the length will be calculated.

</Param>
<Param name="values" type="short[]">

An input array for which the length will be calculated.

</Param>
<Param name="values" type="LongSizedDataStructure">

An input array for which the length will be calculated.

</Param>
<Param name="values" type="T[]">

An input array for which the length will be calculated.

</Param>
</ParamTable>

## Returns

A `long`-typed value representing the length of the input.

## Example

The following example demonstrates the use of `len` within a query string. Note that we must modify the `"IntegerColumn"` name to `"IntegerColumn_"` with the [`_` suffix](../types/arrays.md#convert-a-column-to-an-array) to allow the Deephaven engine to access the column's array representation.

```groovy order=source,result
source = emptyTable(10).update("X = i").groupBy()
result = source.update("LenX = len(X)")
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/function/Basic.html#len(short%5B%5D)>)
