---
id: tree-table
title: How to create a hierarchical tree table
sidebar: Create a tree table
---

This guide will show you how to create a hierarchical tree table. A tree table implements a [tree structure](<https://en.wikipedia.org/wiki/Tree_(data_structure)>) in a table, with expandable nodes to see child-parent relationships.

Parent-child relationships are given in pairs of columns. Parent column values are expected to be found in the ID column as well. For instance, a row with Parent = `A` is a child of the row with ID = `A`. Nodes with Parent=`null` are children of the root, and visible in the initial expansion.

The basic syntax for creating a tree table is as follows:

```
resultWithNoOrphans = source.tree(idCol, parentCol)
resultWithOrphans = TreeTable.promoteOrphans(source, idCol, parentCol).tree(idCol, parentCol)
```

The resulting table initially only has the root node expanded. Nodes can be expanded by clicking on the right-facing arrow in a given cell. Doing so expands everything that is one level down from the selected node.

## Examples

### Static data

The first example creates two constituent tables, which are then [joined](../reference/table-operations/join/join.md) together to form the `source` table. The `ID` and `Parent` columns in `source` are used as the ID and parent columns, respectively.

```groovy order=result,source
source = emptyTable(100).updateView("ID = i", "Parent = i == 0 ? NULL_INT : (int)(i / 4)")

result = source.tree("ID", "Parent")
```

### Real-time data

Tree tables work in real-time applications the same way as they do in static contexts. This can be shown via an example similar to the one above.

```groovy ticking-table order=null
t1 = emptyTable(10_000).updateView("ID = i", "Parent = i == 0 ? NULL_INT : (int)(i / 10)")
t2 = timeTable("PT00:00:00.01").updateView("I = i % 10_000").lastBy("I")

source = t1.join(t2, "ID = I")

result = source.tree("ID", "Parent")
```

![img](../../../../core/docs/assets/reference/create/tree-table-realtime.gif)

### Orphan nodes

Rows in a tree table are considered "orphans" if their parent is not null and does not exist in the table. By default, these rows are omitted from the tree table altogether. In order to include orphans in a tree table, call `promoteOrphans` on the `TreeTable` interface, and call `tree` on the result of that invocation to ensure that the tree will contain the orphan nodes as children of the root.

```groovy order=resultNoOrphans,resultWithOrphans,source
import io.deephaven.engine.table.hierarchical.TreeTable

source = emptyTable(100).updateView("ID = i + 2", "Parent = i == 0 ? NULL_INT : i % 9")

resultNoOrphans = source.tree("ID", "Parent")
resultWithOrphans = TreeTable.promoteOrphans(source, "ID", "Parent").tree("ID", "Parent")
```

## Related documentation

- [How to create a hierarchical rollup table](./rollup-table.md)
- [How to create an empty table](../how-to-guides/empty-table.md)
- [How to create a time table](../how-to-guides/time-table.md)
- [How to join tables](../how-to-guides/joins-overview.md)
- [Tree tables](../reference/table-operations/create/treeTable.md)
