---
id: firstBy
title: first_by
---

`first_by` returns the first row for each group.

## Syntax

```
table.first_by(by: Union[str, list[str]]) -> Table
```

## Parameters

<ParamTable>
<Param name="by" type="Union[str, list[str]]" optional>

The column(s) by which to group data.

- `[]` returns only the first row in the table (default).
- `["X"]` will output the entire first row of each group in column `X`.
- `["X", "Y"]` will output the entire first row of each group designated from the `X` and `Y` columns.

</Param>
</ParamTable>

## Returns

A new table containing the first row for each group.

## Examples

In this example, `first_by` returns the first row of the table.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "N", "O", "N", "P", "M", "O", "P", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

result = source.first_by()
```

In this example, `first_by` returns the first row, as grouped by `X`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "N", "O", "N", "P", "M", "O", "P", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),

])

result = source.first_by(by=["X"])
```

In this example, `first_by` returns the first row, as grouped by `X` and `Y`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "N", "O", "N", "P", "M", "O", "P", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

result = source.first_by(by=["X", "Y"])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to perform dedicated aggregations](../../../how-to-guides/dedicated-aggregations.md)
- [`agg_by`](./aggBy.md)
- [`agg.first`](./AggFirst.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/Table.html#firstBy(java.lang.String...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html?highlight=first#deephaven.table.Table.first_by)