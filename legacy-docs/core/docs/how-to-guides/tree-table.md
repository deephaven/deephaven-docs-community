---
id: tree-table
title: How to create a hierarchical tree table
sidebar_label: Create a tree table
---

This guide will show you how to create a hierarchical tree table. A tree table implements a [tree structure](<https://en.wikipedia.org/wiki/Tree_(data_structure)>) in a table, with expandable nodes to see child-parent relationships.

Parent-child relationships are given in pairs of columns. Parent column values are expected to be found in the ID column as well. For instance, a row with Parent = `A` is a child of the row with ID = `A`. Nodes with Parent=`null` are children of the root, and visible in the initial expansion.

The basic syntax is as follows:

`result = source.tree(id_col, parent_col, promote_orphans)`

The resulting table has no expanded nodes initially, as it only shows the root node. Nodes can be expanded by clicking on the right arrow in a given cell. Doing so expands everything that is one level down from the selected node.

## Examples

### Static data

The first example creates two constituent tables, which are then [joined](../reference/table-operations/join/join.md) together to form the `source` table. The `ID` and `Parent` columns in `source` are used as the ID and parent columns, respectively.

```python order=result,source
from deephaven.constants import NULL_INT
from deephaven import empty_table

source = empty_table(100).update_view(["ID = i", "Parent = i == 0 ? NULL_INT : (int)(i / 4)"])

result = source.tree(id_col = "ID", parent_col = "Parent")
```

### Real-time data

Tree tables work in real-time applications the same way as they do in static contexts. This can be shown via an example similar to the one above.

```python ticking-table order=null
from deephaven import empty_table, time_table
from deephaven.constants import NULL_INT

t1 = empty_table(10_000).update_view(["ID = i", "Parent = i == 0 ? NULL_INT : (int)(i / 10)"])
t2 = time_table("PT0.01S").update_view(["I = i % 10_000"]).last_by("I")

source = t1.join(t2, "ID = I")

result = source.tree(id_col="ID", parent_col="Parent")
```

![img](../assets/reference/create/tree-table-realtime.gif)

### Orphan nodes

Rows in a tree table are considered "orphans" if their parent is not null (this includes the root node) and does not exist in the table. By default, these rows are omitted from the tree table altogether. In order to include orphans in a tree table, the optional argument `promote_orphans` should be set to `True`. Its default value is `False`.

The following example shows how the resulting tree table changes if orphans are promoted.

```python order=result_no_orphans,result_w_orphans,source
from deephaven.constants import NULL_INT
from deephaven import empty_table

source = empty_table(100).update_view(["ID = i + 2", "Parent = i == 0 ? NULL_INT : i % 9"])

result_no_orphans = source.tree(id_col = "ID", parent_col = "Parent")
result_w_orphans = source.tree(id_col = "ID", parent_col = "Parent", promote_orphans=True)
```

## Related documentation

- [How to create a hierarchical rollup table](./rollup-table.md)
- [How to create an empty table](../how-to-guides/empty-table.md)
- [How to create a time table](../how-to-guides/time-table.md)
- [How to join tables](../how-to-guides/join-two-tables.md)
- [tree](../reference/table-operations/create/treeTable.md)
