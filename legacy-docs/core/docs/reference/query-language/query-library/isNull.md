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
<Param name="value" type="Union[byte, char, bool, DateTime, double, float, int, long, short, String]">

The value to check.

</Param>
</ParamTable>

`isNull` can take almost any generic object as its argument.

## Returns

`True` if the value parameter is `null`; `False` otherwise.

## Examples

The following example shows how `isNull` interacts with various objects within a table.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, datetime_col
from deephaven.time import to_j_instant

source = new_table([
    string_col("Strings", ["", "A", None]),
    datetime_col("DateTime", [to_j_instant("2020-01-01T00:00:00 ET"), to_j_instant("2021-01-01T00:00:00 ET"), None])
])

result = source.update(formulas=["StringIsNull = isNull(Strings)", "DateTimeIsNull = isNull(DateTime)"])
```

## Related documentation

- [How to handle nulls, infs, and NaNs](../../../how-to-guides/handle-null-inf-nan.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [`isInf`](./isInf.md)
- [`isNaN`](./isNaN.md)
- [`isFinite`](./isFinite.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/libs/GroovyStaticImports.html#isNull(T)>)
