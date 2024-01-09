---
id: left-outer-join
title: left_outer_join
sidebar_label: left_outer_join
---

`left_outer_join` joins data from a pair of tables - a left table and a right table - based upon one or more match columns. The match columns establish key identifiers in the source tables from which the tables are joined. Any data type can be used as keys.

The resultant table contains all rows from the left table (the first given) as well as rows from the right table that have matching keys in the identifier column(s).

:::note

This table operation is currently experimental. The API may change in the future.

:::

## Syntax

```
left_outer_join(
    l_table: Table,
    r_table: Table,
    on: Union[str, Sequence[str]],
    joins: Union[str, Sequence[str]] = None,
) -> Table
```

## Parameters

<ParamTable>
<Param name="l_table" type="Table">

The left table from which data is joined.

</Param>
<Param name="r_table" type="Table">

The right table from which data is joined.

</Param>
<Param name="on" type="Union[str, list[str]]">

Columns from the left and right tables used to join on.

- `"A = B"` will join when column `A` from the left table matches column `B` from the right table.
- `"X"` will join on column `X` from both the left and right table. Equivalent to `"X = X"`.
- `"X, A = B"` will join when column `X` matches from both the left and right tables, and when column `A` from the left table matches column `B` from the right table.

</Param>
<Param name="joins" type="Union[str, list[str]]" optional>

The columns from the right table to add to the left table based on key. The default value is `None`

- `NULL` will add all columns from the right table to the left table.
- `"X"` will add column `X` from the right table to the left table as column `X`.
- `Y = X` will add column `X` from right table to left table and rename it to be `Y`.

</Param>
</ParamTable>

## Returns

A new table containing all rows from the left table and matching rows from the right table. Rows that do not have matching criteria will not be included in the result. If there are multiple matches between a row from the left table and rows from the right table, all matching combinations will be included. If no match columns are specified, every combination of left and right table rows is included.

## Examples

The following example creates two source tables and performs a `left_outer_join` on them. It gives no `joins` columns, so all columns from the `right` table appear in the `result` table.

```python order=left,right,result
from deephaven.experimental.outer_joins import left_outer_join
from deephaven import empty_table

left = empty_table(5).update(["I = ii", "A = `left`"])
right = empty_table(5).update(["I = ii * 2", "B = `right`", "C = Math.sin(I)"])

result = left_outer_join(l_table=left, r_table=right, on=["I"])
```

The following example creates two source tables and performs a `left_outer_join` on them. It specifies `C` as the only `joins` column, so `C` is the only column from the `right` table that is added to `result`.

```python order=left,right,result
from deephaven.experimental.outer_joins import left_outer_join
from deephaven import empty_table

left = empty_table(5).update(["I = ii", "A = `left`"])
right = empty_table(5).update(["I = ii * 2", "B = `right`", "C = Math.sin(I)"])

result = left_outer_join(l_table=left, r_table=right, on=["I"], joins=["C"])
```

The example below shows how to [join tables on match columns with different names](../../../how-to-guides/join-two-tables.md#match-columns-with-different-names) and [rename appended columns](../../../how-to-guides/join-two-tables.md#rename-appended-columns) when performing a `left_outer_join`.

```python order=left,right,result
from deephaven.experimental.outer_joins import left_outer_join
from deephaven import empty_table

left = empty_table(5).update(["X1 = ii", "Y = Math.sin(X1)"])
right = empty_table(5).update(["X2 = ii * 2", "Y = Math.cos(X2)"])

result = left_outer_join(l_table=left, r_table=right, on=["X1 = X2"], joins=["Z = Y"])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to choose a join method](../../../conceptual/choose-joins.md)
- [How to join tables](../../../how-to-guides/join-two-tables.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/OuterJoinTools.html#fullOuterJoin(io.deephaven.engine.table.Table,io.deephaven.engine.table.Table,java.util.Collection)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.experimental.outer_joins.html#deephaven.experimental.outer_joins.full_outer_join)
