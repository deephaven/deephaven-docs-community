---
id: where-in
title: where_in
---

The `where_in` method returns a new table containing rows from the source table, where the rows match values in the filter table. The filter is updated whenever either table changes.

:::note

`where_in` is not appropriate for all situations. Its purpose is to enable more efficient filtering for an infrequently changing filter table.

:::

## Syntax

```python syntax
table.where_in(filter_table: Table, cols: Union[str, list[str]]) -> Table
```

## Parameters

<ParamTable>
<Param name="filter_table" type="Table">

The table containing the set of values to filter on.

</Param>
<Param name="cols" type="Union[str, list[str]]">

A list of columns (as [Strings](../../query-language/types/strings.md)) to match between the two tables.

- `"X"` will match on the same column name. Equivalent to `"X = X"`.
- `"X = Y"` will match when the columns have different names, with `X` being the source table column and `Y` being the filter table column.

</Param>
</ParamTable>

## Returns

A new table containing rows from the source table, where the rows match values in the filter table. The filter is updated whenever either table changes.

## Examples

The following example creates a table containing only the colors present in the `filter` table.

```python order=source,filter,result
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col
from deephaven.constants import NULL_INT

source = new_table([
    string_col("Letter", ["A", "C", "F", "B", "E", "D", "A"]),
    int_col("Number", [NULL_INT, 2, 1, NULL_INT, 4, 5, 3]),
    string_col("Color", ["red", "blue", "orange", "purple", "yellow", "pink", "blue"]),
    int_col("Code", [12, 14, 11, NULL_INT, 16, 14, NULL_INT]),
])


filter = new_table([
    string_col("Colors", ["blue", "red", "purple", "white"])
])

result = source.where_in(filter_table=filter, cols=["Color = Colors"])
```

The following example creates a table containing only the colors and codes not present in the `filter` table. When using multiple matches, the resulting table will exclude only values that are _not_ in _both_ matches. In this example, only one row matches both color AND codes. This results in a new table that has all but one matching value.

```python order=source,filter,result
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col
from deephaven.constants import NULL_INT
source = new_table([
    string_col("Letter", ["A", "C", "F", "B", "E", "D", "A"]),
    int_col("Number", [NULL_INT, 2, 1, NULL_INT, 4, 5, 3]),
    string_col("Color", ["red", "blue", "orange", "purple", "yellow", "pink", "blue"]),
    int_col("Code", [12, 13, 11, 10, 16, 14, NULL_INT]),
])
filter = new_table([
    string_col("Colors", ["blue", "red", "purple", "white"]),
    int_col("Codes", [10, 12, 14, 16])
])

result = source.where_in(filter_table=filter, cols=["Color = Colors", "Code = Codes"])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to use filters](../../../how-to-guides/use-filters.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/Table.html#whereIn(io.deephaven.engine.table.Table,java.lang.String...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html?highlight=where_in#deephaven.table.Table.where_in)
