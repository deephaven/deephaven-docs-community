---
id: rename-columns
title: rename_columns
---

The `rename_columns` method creates a new table with the specified columns renamed.

## Syntax

```python syntax
table.rename_columns(cols: Union[str, Sequence[str]]) -> Table
```

## Parameters

<ParamTable>
<Param name="cols" type="Union[str, Sequence[str]]">

The column rename expressions, e.g., `"X = Y"`.

</Param>
</ParamTable>

## Returns

A new table with the specified columns renamed.

## Examples

```python order=source,result
from deephaven import new_table
from deephaven.column import int_col, string_col

source = new_table([
    string_col("A", ["Some", "string", "values", "here"]),
    int_col("B", [1, 2, 3, 4]),
    string_col("C", ["more", "strings", "over", "here"]),
])

result = source.rename_columns(cols=["X = A", "Y = B", "Z = C"])
```

## Related documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html?highlight=update#deephaven.table.Table.rename_columns)
