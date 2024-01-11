---
id: weighted-avg-by
title: weighted_avg_by
---

The `weighted_avg_by` method creates a new table containing the weighted average for each group.

## Syntax

```python syntax
weighted_avg_by(wcol: str, by: Union[str, list[str]] = None) -> Table
```

## Parameters

<ParamTable>
<Param name="wcol" type="str">

The name of the weight column.

</Param>
<Param name="by" type="Union[str, list[str]]" optional>

The column(s) by which to group data.

- `[]` returns the weighted average for all non-key columns (default).
- `["X"]` will output the weighted average of each group in column `X`.
- `["X", "Y"]` will output the weighted average of each group designated from the `X` and `Y` columns.

</Param>
</ParamTable>

## Returns

A new table containing the weighted average for each group.

## Examples

In this example, `weighted_avg_by` returns the weighted average of the whole table. Because an average cannot be computed for the string column `Letter`, this column is dropped before applying `weighted_avg_by`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("Letter", ["A", "B", "C", "D"]),
    int_col("Weight", [2, 4, 6, 8]),
    int_col("Numbers", [5, 10, 20, 9]),
    int_col("Numbers2", [1, 2, 3, 4]),
])

result = source.drop_columns("Letter").weighted_avg_by("Weight")
```

In this example, `weighted_avg_by` returns the weighted average, as grouped by `X`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    int_col("Weight", [2, 4, 6, 8]),
    int_col("Numbers", [5, 10, 20, 9]),
    int_col("X", [1, 1, 2, 2]),
])

result = source.weighted_avg_by(wcol="Weight", by="X")
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to perform dedicated aggregations](../../../how-to-guides/dedicated-aggregations.md)
- [`agg_by`](./aggBy.md)
- [`drop_columns`](../select/drop-columns.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html?highlight=sum#deephaven.table.Table.weighted_avg_by)