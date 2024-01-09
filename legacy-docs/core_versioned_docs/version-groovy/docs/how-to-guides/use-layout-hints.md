---
id: use-layout-hints
title: How to use layout hints to format tables
sidebar_label: Use layout hints
---

Deephaven provides many options to adjust table layout, such as locking column order, freezing, or hiding columns. This guide shows you how to use the [`setLayoutHints`](../reference/table-operations/format/layout-hints.md) method to customize your table's layout via query. Column grouping is also accomplished using [`setLayoutHints`](../reference/table-operations/format/layout-hints.md), which is covered in our related guide, [How to group columns in a table](./column-groups.md).

The basic syntax is as follows:

```
table.setLayoutHints(hints)
```

The available methods for `hints` include:

- [`.atFront`](../reference/table-operations/format/atFront.md)
- [`.atBack`](../reference/table-operations/format/atBack.md)
- [`.hide`](../reference/table-operations/format/hide.md)
- [`.freeze`](../reference/table-operations/format/freeze.md)
- [`.columnGroup`](../reference/table-operations/format/columnGroup.md)

These methods can be used individually within [`setLayoutHints`](../reference/table-operations/format/layout-hints.md) or in combination.

## Lock column order

Designated columns in Deephaven tables can be "locked" in place at the front (lefthand side) or back (righthand side) of your table. These columns cannot be moved by users in the UI.

For example, the following query locks the `Odd` column to the front of the table, and the `Even` column to the back of the table:

```groovy order=source,result default=result
import io.deephaven.engine.util.LayoutHintBuilder

source = newTable(
    stringCol("A", "A", "a"),
    stringCol("B", "B", "b"),
    stringCol("C", "C", "c"),
    intCol("Even", 2, 4),
    intCol("Odd", 1, 3)
)

result = source.setLayoutHints(
    LayoutHintBuilder.get()
    .atFront("Odd")
    .atBack("Even")
    .build()
)
```

## Hide columns

When a table is open in Deephaven, you can manually hide columns using the right-click column header menu. However, columns can be hidden from view by default. The following example hides column `C`:

```groovy order=source,result default=result
import io.deephaven.engine.util.LayoutHintBuilder

source = newTable(
    stringCol("A", "A", "a"),
    stringCol("B", "B", "b"),
    stringCol("C", "C", "c"),
    intCol("Even", 2, 4),
    intCol("Odd", 1, 3)
)

result = source.setLayoutHints(
    LayoutHintBuilder.get()
    .hide("C")
    .build()
)
```

Hidden columns can be unhidden via the **Show All Columns** option in the [right-click column menu](../how-to-guides/user-interface/work-with-columns.md).

## Freeze columns

Designated columns in Deephaven tables can be "frozen" in place so they stay in view even when horizontally scrolling through columns in the UI. Frozen columns stay on the left-hand side in the order they are given. This lets users keep key columns in view as they read table data.

You can accomplish this via query or [in the UI](../how-to-guides/user-interface/work-with-columns.md/#freeze-column). In the following query, the `Even` column is frozen to the front of the table.

```groovy order=source,result default=result
import io.deephaven.engine.util.LayoutHintBuilder

source = newTable(
    stringCol("A", "A", "a"),
    stringCol("B", "B", "b"),
    stringCol("C", "C", "c"),
    intCol("Even", 2, 4),
    intCol("Odd", 1, 3)
)

result = source.setLayoutHints(
    LayoutHintBuilder.get()
    .freeze("Even")
    .build()
)
```

You can override this default in the UI using the **Unfreeze Column** option in the column header menu.

## Group and Color Columns

You can visually group columns together by using [`columnGroup`](../reference/table-operations/format/columnGroup.md). This method takes three parameters:

- `name`: the name of the group.
- `children`: a list of the children in the group. May contain column names or other group names.
- `color`: the hex color string or Deephaven color name to apply. This parameter is optional.

The following example groups columns `A` and `E` together in a group called `Vowels`, and colors the group green:

```groovy order=result,source
import io.deephaven.engine.util.LayoutHintBuilder

source = newTable(
    stringCol("A", "A", "a"),
    stringCol("B", "B", "b"),
    stringCol("C", "C", "c"),
    stringCol("D", "D", "d"),
    stringCol("E", "E", "e"),
    stringCol("Y", "Y", "y"),
)

result = source.setLayoutHints(
    LayoutHintBuilder.get()
    .columnGroup("Vowels", ["A", "E"], "GREEN")
    .build()
)
```

## Related documentation

- [How to group columns](./column-groups.md)
- [How to work with columns](./user-interface/work-with-columns.md)
- [`setLayoutHints`](../reference/table-operations/format/layout-hints.md)
- [`atFront`](../reference/table-operations/format/atFront.md)
- [`atBack`](../reference/table-operations/format/atBack.md)
- [`columnGroup`](../reference/table-operations/format/columnGroup.md)
- [`freeze`](../reference/table-operations/format/freeze.md)
- [`hide`](../reference/table-operations/format/hide.md)
