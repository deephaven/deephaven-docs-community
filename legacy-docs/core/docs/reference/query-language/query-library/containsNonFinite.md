---
id: containsNonFinite
title: containsNonFinite
---

`containsNonFinite` returns a boolean value indicating whether or not the specified value is non-normal, where normal is defined as not null, not infinite, and not NaN.

## Syntax

```
containsNonFinite(value)
```

## Parameters

<ParamTable>
<Param name="value" type="Union[double, float]">

The value to check.

</Param>
</ParamTable>

## Returns

`true` if the value parameter is not normal; `false` otherwise.

## Examples

The following example shows how `containsNonFinite` interacts with various objects within a table.

```python order=source,result
from deephaven import new_table
from deephaven.column import double_col
from deephaven.constants import NULL_DOUBLE

source = new_table([
    double_col("AllNulls", [NULL_DOUBLE, NULL_DOUBLE]),
    double_col("AllNonNulls", [0.0, 0.1]),
    double_col("SomeNulls", [0.0, NULL_DOUBLE])
])

result = source.update(formulas=[
    "AllNullsResult = containsNonFinite(AllNulls_)",
    "AllNonNullsResult = containsNonFinite(AllNonNulls_)",
    "SomeNullsResult = containsNonFinite(SomeNulls_)"
])
```

## Related documentation

- [How to handle nulls, Infs, and NaNs](../../../how-to-guides/handle-null-inf-nan.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [`isInf`](./isInf.md)
- [`isNaN`](./isNaN.md)
- [`isNull`](./isNull.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/libs/GroovyStaticImports.html#containsNonFinite(T)>)
