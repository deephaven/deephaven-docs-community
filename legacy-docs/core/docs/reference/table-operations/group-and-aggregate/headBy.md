---
id: headBy
title: head_by
---

`head_by` returns the first `n` rows for each group.

## Syntax

```
table.head_by(n: int, by: Union[str, list[str]]) -> Table
```

## Parameters

<ParamTable>
<Param name="n" type="int">

The number of rows to return for each group.

</Param>
<Param name="by" type="Union[str, list[str]]" optional>

The column(s) by which to group data.

- `["X"]` will output the entire first `n` row(s) of each group in column `X`.
- `["X", "Y"]` will output the entire first `n` row(s) of each group designated from the `X` and `Y` columns.

</Param>
</ParamTable>

## Returns

A new table containing the first `n` rows for each group.

## Examples

In this example, `head_by` returns the first 2 rows, as grouped by `X`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("X", ["A", "B", "A", "A", "B", "A", "B", "B", "B"]),
    string_col("Y", ["M", "M", "M", "N", "M", "M", "M", "M", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

result = source.head_by(2, by=["X"])
```

In this example, `head_by` returns the first 2 rows, as grouped by `X` and `Y`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("X", ["A", "B", "A", "A", "B", "A", "B", "B", "B"]),
    string_col("Y", ["M", "M", "M", "N", "M", "M", "M", "M", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

result = source.head_by(2, by=["X", "Y"])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to perform dedicated aggregations](../../../how-to-guides/dedicated-aggregations.md)
- [`agg_by`](./aggBy.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/Table.html#headBy(long,java.lang.String...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html?highlight=head#deephaven.table.Table.head_by)

<!--TODO: https://github.com/deephaven/deephaven-core/issues/778> -->