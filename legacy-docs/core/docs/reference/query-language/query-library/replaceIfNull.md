---
id: replaceIfNull
title: replaceIfNull
---

`replaceIfNull` takes an [array](../types/arrays.md) of values and a default value, and returns a new [array](../types/arrays.md) where all of the null values in the original [array](../types/arrays.md) are replaced with the default value.

## Syntax

```
replaceIfNull(values, defaultValue)
```

## Parameters

<ParamTable>
<Param name="values" type="byte[], char[], bool[], DateTime[], double[], float[], int[], long[], short[], String[]">

The [array](../types/arrays.md) of values to replace nulls in.

</Param>
<Param name="defaultValue" type="byte, char, bool, DateTime, double, float, int, long, short, String">

The value that replaces nulls in the [array](../types/arrays.md).

</Param>
</ParamTable>

`replaceIfNull` can take almost any generic object [array](../types/arrays.md) and default value as its arguments.

## Returns

Returns a new [array](../types/arrays.md) with null values replaced by the `defaultValue` parameter.

## Examples

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col
from deephaven.constants import NULL_INT

source = new_table([
    string_col("Strings", ["abc", "def", None]),
    int_col("Integers", [100, 200, NULL_INT])
])

default_string = "ghi"
default_int = 300

result = source.update(formulas=[
    "Strings = replaceIfNull(Strings, default_string)",
    "Integers = replaceIfNull(Integers, default_int)"
])
```

## Related documentation

- [How to handle nulls, infs, and NaNs](../../../how-to-guides/handle-null-inf-nan.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Arrays](../types/arrays.md)
- [`isNull`](./isNull.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/libs/GroovyStaticImports.html#replaceIfNull(T,T)>)
