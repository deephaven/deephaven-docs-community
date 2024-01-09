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
<Param name="values" type="Union[byte[], char[], double[], float[], int[], long[], short[], LongSizedDataStructure, T[]">

An input array for which the length will be calculated.

</Param>
</ParamTable>

## Returns

A `long`-typed value representing the length of the input.

## Example

The following example demonstrates the use of `len` within a query string.

```python order=source,result
from deephaven import empty_table

source = empty_table(10).update(["X = i"]).group_by()
result = source.update(["LenX = len(X)"])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/function/Basic.html#len(short%5B%5D)>)
