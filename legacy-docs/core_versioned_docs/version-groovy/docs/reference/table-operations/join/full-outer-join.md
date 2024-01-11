---
id: full-outer-join
title: fullOuterJoin
sidebar_label: fullOuterJoin
---

`fullOuterJoin` joins data from a pair of tables - a left table and a right table - based upon one or more match columns (`columnsToMatch`). The match columns establish key identifiers in the source tables from which the tables are joined. Any data type can be used as keys.

The resultant table contains all rows from both tables that exist in the key identifier columns. Cells that exist in one table but not the other are filled with null values in the result.

:::note

This table operation is currently experimental. The API may change in the future.

:::

## Syntax

```
fullOuterJoin(leftTable, rightTable, columnsToMatch)
fullOuterJoin(leftTable, rightTable, columnsToMatch, columnsToAdd)
```

## Parameters

<ParamTable>
<Param name="leftTable" type="Table">

The left table from which data is joined.

</Param>
<Param name="rightTable" type="Table">

The right table from which data is joined.

</Param>
<Param name="columnsToMatch" type="String">

Columns from the left and right tables used to join on.

- `"A = B"` will join when column `A` from the left table matches column `B` from the right table.
- `"X"` will join on column `X` from both the left and right table. Equivalent to `"X = X"`.
- `"X, A = B"` will join when column `X` matches from both the left and right tables, and when column `A` from the left table matches column `B` from the right table.

</Param>
<Param name="columnsToMatch" type="Collection<String>">

Columns from the left and right tables used to join on.

- `"A = B"` will join when column `A` from the left table matches column `B` from the right table.
- `"X"` will join on column `X` from both the left and right table. Equivalent to `"X = X"`.
- `"X, A = B"` will join when column `X` matches from both the left and right tables, and when column `A` from the left table matches column `B` from the right table.

</Param>
<Param name="columnsToAdd" type="String">

The columns from the right table to add to the left table based on key.

- `NULL` will add all columns from the right table to the left table.
- `"X"` will add column `X` from the right table to the left table as column `X`.
- `Y = X` will add column `X` from right table to left table and rename it to be `Y`.

</Param>
<Param name="columnsToAdd" type="Collection<String>">

The columns from the right table to add to the left table based on key.

- `NULL` will add all columns from the right table to the left table.
- `"X"` will add column `X` from the right table to the left table as column `X`.
- `Y = X` will add column `X` from right table to left table and rename it to be `Y`.

</Param>
</ParamTable>

## Returns

A new table containing all rows from the left and right table. Rows that do not have matching criteria are included in the result as null cells. If there are multiple matches between a row from the left table and rows from the right table, all matching combinations will be included. If no match columns are specified, every combination of left and right table rows is included.

## Examples

The following example creates two source tables and performs a `fullOuterJoin` on them. It gives no `columnsToAdd`, so all columns from the `right` table appear in the `result` table.

```groovy order=left,right,result
import io.deephaven.engine.util.TableTools
import io.deephaven.engine.util.OuterJoinTools

left = TableTools.emptyTable(5).update("I = ii", "A = `left`")
right = TableTools.emptyTable(5).update("I = ii * 2", "B = `right`", "C = Math.sin(I)")

result = OuterJoinTools.fullOuterJoin(left, right, "I")
```

The following example creates two source tables and performs a `fullOuterJoin` on them. It specifies `C` as the only `columnsToAdd`, so `C` is the only column from the `right` table that gets added to `result`.

```groovy order=left,right,result
import io.deephaven.engine.util.TableTools
import io.deephaven.engine.util.OuterJoinTools

left = TableTools.emptyTable(5).update("I = ii", "A = `left`")
right = TableTools.emptyTable(5).update("I = ii * 2", "B = `right`", "C = Math.sin(I)")

result = OuterJoinTools.fullOuterJoin(left, right, "I", "C")
```

The example below shows how to [join tables on match columns with different names](../../../how-to-guides/joins-overview.md#match-columns-with-different-names) and [rename appended columns](../../../how-to-guides/joins-overview.md#rename-appended-columns) when performing a `fullOuterJoin`.

```groovy order=left,right,result
import io.deephaven.engine.util.TableTools
import io.deephaven.engine.util.OuterJoinTools

left = TableTools.emptyTable(5).update("X1 = ii", "Y = Math.sin(X1)")
right = TableTools.emptyTable(5).update("X2 = ii * 2", "Y = Math.cos(X2)")

result = OuterJoinTools.fullOuterJoin(left, right, "X1 = X2", "Z = Y")
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to choose a join method](../../../conceptual/choose-joins.md)
- [How to join tables](../../../how-to-guides/joins-overview.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/OuterJoinTools.html#fullOuterJoin(io.deephaven.engine.table.Table,io.deephaven.engine.table.Table,java.util.Collection)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.experimental.outer_joins.html#deephaven.experimental.outer_joins.full_outer_join)