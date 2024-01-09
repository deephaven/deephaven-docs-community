---
id: layout-hints
title: layout_hints
---

The `layout_hints` method creates a new table with specified layout instructions for the UI.

## Syntax

```python syntax
table.layout_hints(
    front: Union[str, list[str]],
    back: Union[str, list[str]],
    freeze: Union[str, list[str]],
    hide: Union[str, list[str]],
    column_groups: list[dict]
) -> Table
```

## Parameters

<ParamTable>
<Param name="front" type="Union[str, list[str]]">
Columns to pin to the front of the table. These columns will not be user movable.
</Param>
<Param name="back" type="Union[str, list[str]]">
Columns to pin to the back of the table. These columns will not be user movable.
</Param>
<Param name="freeze" type="Union[str, list[str]]">
Columns to freeze to the front of the table. These columns will always be visible even if scrolling horizontally.
</Param>
<Param name="hide" type="Union[str, list[str]]">
Columns to initially hide in the table.
</Param>
<Param name="column_groups" type="list[dict]">

The columns to visually group in the table. Columns in groups will be moved such that the group is contiguous in the table. Column group dict structure is:

- `name (str):` - The group name. Must be a valid column name and not a duplicate of another column or group.
- `children (list[str]:` - The children in the group. May contain column names or other group names. Each item may only be specified as a child once.
- `color (Optional[str]):` - The hex color string or Deephaven color name.

</Param>
</ParamTable>

## Returns

A new table with layout instructions for the UI.

## Examples

In the following example, the column `Even` is frozen to the front of the table, `Odd` is moved to the front, `B` is moved to the back, `C` is hidden, and `A` and `E` form a column group called `Vowels`.

```python order=source,result default=result
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("A", ["A", "a"]),
    string_col("B", ["B", "b"]),
    string_col("C", ["C", "c"]),
    string_col("D", ["D", "d"]),
    string_col("E", ["E", "e"]),
    string_col("Y", ["Y", "y"]),
    int_col("Even", [2, 4]),
    int_col("Odd", [1, 3])
])

result = source.layout_hints(
    freeze=["Even"],
    front=["Odd"],
    back=["B"],
    hide=["C"],
    column_groups=[
        { 'name' : 'Vowels', 'children': ['A', 'E'] },
    ]
)
```

## Related documentation

- [How to group columns](../../../how-to-guides/column-groups.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html#deephaven.table.Table.layout_hints)
