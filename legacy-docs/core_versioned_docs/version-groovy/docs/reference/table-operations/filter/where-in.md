---
id: where-in
title: whereIn
---

The `whereIn` method returns a new table containing rows from the source table, where the rows match values in the filter table. The filter is updated whenever either table changes.

:::note

`whereIn` is not appropriate for all situations. Its purpose is to enable more efficient filtering for an infrequently changing filter table.

:::

## Syntax

```
table.whereIn(rightTable, columnsToMatch...)
```

## Parameters

<ParamTable>
<Param name="rightTable" type="Table">

The table containing the set of values to filter on.

</Param>
<Param name="columnsToMatch" type="String...">

The columns to match between the two tables.

- `"X"` will match on the same column name. Equivalent to `"X = X"`.
- `"X = Y"` will match when the columns have different names, with `X` being the source table column and `Y` being the filter table column.

</Param>
<Param name="columnsToMatch" type="Collection">

The columns to match between the two tables.

</Param>
</ParamTable>

## Returns

A new table containing rows from the source table, where the rows match values in the filter table. The filter is updated whenever either table changes.

## Examples

The following example creates a table containing only the colors present in the `filter` table.

```groovy order=source,filter,result
source = newTable(
    stringCol("Letter", "A", "C", "F", "B", "E", "D", "A"),
    intCol("Number", NULL_INT, 2, 1, NULL_INT, 4, 5, 3),
    stringCol("Color", "red", "blue", "orange", "purple", "yellow", "pink", "blue"),
    intCol("Code", 12, 13, 11, NULL_INT, 16, 14, NULL_INT),
)

filter = newTable(
    stringCol("Colors", "blue", "red", "purple", "white")
)

result = source.whereIn(filter, "Color = Colors")
```

The following example creates a table containing only the colors and codes present in the `filter` table. When using multiple matches, the resulting table will include only values that are in _both_ matches. In this example, only one row matches both color AND codes. This results in a new table that has one matching value.

```groovy order=source,filter,result
source = newTable(
    stringCol("Letter", "A", "C", "F", "B", "E", "D", "A"),
    intCol("Number", NULL_INT, 2, 1, NULL_INT, 4, 5, 3),
    stringCol("Color", "red", "blue", "orange", "purple", "yellow", "pink", "blue"),
    intCol("Code", 12, 13, 11, 10, 16, 14, NULL_INT),
)

filter = newTable(
    stringCol("Colors", "blue", "red", "purple", "white"),
    intCol("Codes", 10, 12, 14, 16)
)

result = source.whereIn(filter, "Color = Colors", "Code = Codes")
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to use filters](../../../how-to-guides/use-filters.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/Table.html#whereIn(io.deephaven.engine.table.Table,java.lang.String...)>)