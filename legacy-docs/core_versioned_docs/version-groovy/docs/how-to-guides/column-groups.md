---
id: column-groups
title: How to group columns
sidebar_label: Group columns in a table
---

This guide will show you how to visually group columns in Deephaven.

## Create groups via query

The [`setLayoutHints`](../reference/table-operations/format/layout-hints.md) method provides a way to define groups of columns via code. Column groups are made up of a group name, list of children names, and an optional color.

Group names must be valid column names and cannot be duplicates of other group or column names. Each child may only be included in one group. Colors may be specified as a hex string, the keyword string of any of the [named Deephaven colors](../how-to-guides/format-columns.md#named-color-values), or a [Color](https://deephaven.io/core/javadoc/io/deephaven/gui/color/Color.html) object.

The code below demonstrates creating a table and then adding column groups via the [`setLayoutHints`](../reference/table-operations/format/layout-hints.md) method. The columns are automatically moved in the UI so they are next to each other in the order specified in the children array. This movement only affects the UI, not the column order in the engine. Columns within groups can be rearranged in the UI via drag and drop; however, a column may not be dragged outside of its group.

```groovy order=lettersAndNumbers,lettersAndNumbersGrouped default=lettersAndNumbersGrouped
import io.deephaven.engine.util.LayoutHintBuilder
import io.deephaven.gui.color.Color

lettersAndNumbers = newTable(
    stringCol("A", "A", "a"),
    stringCol("B", "B", "b"),
    stringCol("C", "C", "c"),
    stringCol("D", "D", "d"),
    stringCol("E", "E", "e"),
    stringCol("Y", "Y", "y"),
    intCol("Even", 2, 4),
    intCol("Odd", 1, 3)
)

lettersAndNumbersGrouped = lettersAndNumbers.setLayoutHints(
    LayoutHintBuilder.get()
    .columnGroup("Letters", ["Vowels", "Y", "Consonants"], "#FCD65B")
    .columnGroup("Vowels", ["A", "E"], Color.CORNFLOWERBLUE)
    .columnGroup("Consonants", ["B", "C", "D"], "CORAL")
    .columnGroup("Numbers", ["Even", "Odd"])
    .build()
)
```

## Create groups with the UI

Column groups can also be created on a table using the UI in the **Hide, Group, and Order Columns** menu. Select one or more columns and then click the **Group** button as shown in the gif below. Columns can be moved in and out of column groups in this menu, either via drag and drop or the arrow buttons at the top of the menu. Group names and colors can also be changed in this menu.

<LoopedVideo src={require('../assets/how-to/column_groups.mp4')} />

Below is a picture of the menu with some column groups.

![img](../assets/how-to/column_groups.png)

## Related documentation

- [`setLayoutHints`](../reference/table-operations/format/layout-hints.md)
- [`newTable`](../reference/table-operations/create/newTable.md)
