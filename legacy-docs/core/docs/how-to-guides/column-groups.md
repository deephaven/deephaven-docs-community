---
id: column-groups
title: How to group columns
sidebar_label: Group columns in a table
---

This guide will show you how to visually group columns in Deephaven.

## Create groups via query

The [`layout_hints`](../reference/table-operations/format/layout-hints.md) API provides a way to define groups of columns via code. Column groups are made up of a group name, list of children names, and an optional color.

Group names must be valid column names and cannot be duplicates of other group or column names. Each child may only be included in one group. Colors may be specified as a hex string or the keyword string of any of the [named Deephaven colors](../how-to-guides/format-columns.md#named-color-values).

The code below demonstrates creating a table and then adding column groups via the [`layout_hints`](../reference/table-operations/format/layout-hints.md) API. The columns are automatically moved in the UI so they are next to each other in the order specified in the children array. This movement only affects the UI, not the column order in the engine. Columns within groups can be rearranged in the UI via drag and drop; however, a column may not be dragged outside of its group.

```python order=letters_and_numbers,letters_and_numbers_grouped default=letters_and_numbers_grouped
from deephaven import new_table
from deephaven.column import string_col, int_col
from deephaven.plot import Colors

letters_and_numbers = new_table([
    string_col("A", ["A", "a"]),
    string_col("B", ["B", "b"]),
    string_col("C", ["C", "c"]),
    string_col("D", ["D", "d"]),
    string_col("E", ["E", "e"]),
    string_col("Y", ["Y", "y"]),
    int_col("Even", [2, 4]),
    int_col("Odd", [1, 3])
])

letters_and_numbers_grouped = letters_and_numbers.layout_hints(
    column_groups=[
        { 'name' : 'Letters', 'children': ['Vowels', 'Y', 'Consonants'], 'color': '#FCD65B' },
        { 'name' : 'Vowels', 'children': ['A', 'E'], 'color': Colors.CORNFLOWERBLUE.to_hex() },
        { 'name' : 'Consonants', 'children': ['B', 'C', 'D'], 'color': 'CORAL' },
        { 'name' : 'Numbers', 'children': ['Even', 'Odd'] }
    ]
)
```

## Create groups with the UI

Column groups can also be created on a table using the UI in the **Hide, Group, and Order Columns** menu. Select one or more columns and then click the **Group** button as shown below. Columns can be moved in and out of column groups in this menu, either via drag and drop or the arrow buttons at the top of the menu. Group names and colors can also be changed in this menu.

<LoopedVideo src={require('../assets/how-to/column_groups.mp4')} />

Below is a picture of the menu with some column groups.

![img](../assets/how-to/column_groups.png)

## Related documentation

- [`layout_hints`](../reference/table-operations/format/layout-hints.md)
- [`new_table`](../reference/table-operations/create/newTable.md)
