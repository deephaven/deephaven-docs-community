---
id: use-layout-hints
title: How to use layout hints to format tables
sidebar_label: Use layout hints
---

Deephaven provides many options to adjust table layout, such as locking column order, freezing, or hiding columns. This guide shows you how to use the [`layout_hints`](../reference/table-operations/format/layout-hints.md) method to customize your table's layout via query. Column grouping is also accomplished using [`layout_hints`], which is covered in our related guide, [How to group columns in a table](./column-groups.md).

The basic syntax is as follows:

```
table.layout_hints(front=list[str], back=list[str], freeze=list[str], hide=list[str], column_groups=list[dict])
```

The arguments can be used individually or in combination.

## Lock column order

Designated columns in Deephaven tables can be "locked" in place at the front (lefthand side) or back (righthand side) of your table. These columns cannot be moved by users in the UI.

For example, the following query locks the `Odd` column to the front of the table, and the `Even` column to the back of the table:

```python order=result,source
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("A", ["A", "a"]),
    string_col("B", ["B", "b"]),
    string_col("C", ["C", "c"]),
    int_col("Even", [2, 4]),
    int_col("Odd", [1, 3])
])

result = source.layout_hints(
    front=["Odd"],
    back=["Even"],
)
```

## Hide columns

When a table is open in Deephaven, you can manually hide columns using the right-click column header menu. However, columns can be hidden from view by default. The following example hides column `C`:

```python order=result,source
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("A", ["A", "a"]),
    string_col("B", ["B", "b"]),
    string_col("C", ["C", "c"]),
    int_col("Even", [2, 4]),
    int_col("Odd", [1, 3])
])

result = source.layout_hints(
    hide=["C"],
)
```

Hidden columns can be unhidden via the **Show All Columns** option in the [right-click column menu](../how-to-guides/user-interface/work-with-columns.md).

## Freeze columns

Designated columns in Deephaven tables can be "frozen" in place so they stay in view even when horizontally scrolling through columns in the UI. Frozen columns stay on the left-hand side in the order they are given. This lets users keep key columns in view as they read table data.

You can accomplish this via query or [in the UI](../how-to-guides/user-interface/work-with-columns.md/#freeze-column). In the following query, the `Even` column is frozen to the front of the table.

```python order=result,source
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("A", ["A", "a"]),
    string_col("B", ["B", "b"]),
    string_col("C", ["C", "c"]),
    int_col("Even", [2, 4]),
    int_col("Odd", [1, 3])
])

result = source.layout_hints(
    freeze=["Even"],
)
```

You can override this default in the UI using the **Unfreeze Column** option in the column header menu.

## Group columns

Use the `column_groups` argument to visually group columns together in the resulting table. `column_groups` must be formatted as a `dict`, where:

- `name` is the name of the group.
- `children` is a list of the children in the group. May contain column names or other group names.
- `color` is the hex color string or Deephaven color name to apply.

The following example groups columns `A` and `E` together in a group called `Vowels`, and colors the group green:

```python order=result,source
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("A", ["A", "a"]),
    string_col("B", ["B", "b"]),
    string_col("C", ["C", "c"]),
    string_col("D", ["D", "d"]),
    string_col("E", ["E", "e"]),
    string_col("Y", ["Y", "y"]),
])

result = source.layout_hints(
    column_groups=[
        { 'name' : 'Vowels', 'children': ['A', 'E'], 'color' : 'GREEN' },
    ]
)
```

## Related documentation

- [How to group columns](./column-groups.md)
- [How to work with columns](./user-interface/work-with-columns.md)
- [`layout_hints`](../reference/table-operations/format/layout-hints.md)
- [`format_columns`](../reference/table-operations/format/format-columns.md)
