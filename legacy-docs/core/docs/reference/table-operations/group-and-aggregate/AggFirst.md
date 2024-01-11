---
id: AggFirst
title: first
---

`agg.first` returns an aggregator that computes the first value, within an aggregation group, for each input column.

## Syntax

```
first(cols: Union[str, list[str]]) -> Aggregation
```

## Parameters

<ParamTable>
<Param name="cols" type="Union[str, list[str]]">

The source column(s) for the calculations.

- `["X"]` will output the first value in the `X` column for each group.
- `["Y = X"]` will output the first value in the `X` column for each group and rename it to `Y`.
- `["X, A = B"]` will output the first value in the `X` column for each group and the first value in the `B` column while renaming it to `A`.

</Param>
</ParamTable>

:::caution

If an aggregation does not rename the resulting column, the aggregation column will appear in the output table, not the input column. If multiple aggregations on the same column do not rename the resulting columns, an error will result, because the aggregations are trying to create multiple columns with the same name. For example, in `table.agg_by([agg.sum_(cols=[“X”]), agg.avg(cols=["X"])`, both the sum and the average aggregators produce column `X`, which results in an error.

:::

## Returns

An aggregator that computes the first value, within an aggregation group, for each input column.

## Examples

In this example, `agg.first` returns the first `Y` value as grouped by `X`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col
from deephaven import agg as agg

source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "N", "O", "N", "P", "M", "O", "P", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

result = source.agg_by([agg.first(cols=["Y"])], by=["X"])
```

In this example, `agg.first` returns the first `Y` value (renamed to `Z`), as grouped by `X`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col
from deephaven import agg as agg
source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "N", "O", "N", "P", "M", "O", "P", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

result = source.agg_by([agg.first(cols=["Z = Y"])], by=["X"])

```

In this example, `agg.first` returns the first `Y` string and first `Number` integer, as grouped by `X`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col
from deephaven import agg as agg

source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "N", "O", "N", "P", "M", "O", "P", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

result = source.agg_by([agg.first(cols=["Y", "Number"])], by=["X"])
```

In this example, `agg.first` returns the first `Number` integer, as grouped by `X` and `Y`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col
from deephaven import agg as agg

source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "N", "O", "N", "P", "M", "O", "P", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

result = source.agg_by([agg.first(cols=["Number"])], by=["X", "Y"])
```

In this example, `agg.first` returns the first `Number` integer, and `agg.last` returns the last `Number` integer, as grouped by `X`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col
from deephaven import agg as agg

source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "P", "O", "N", "P", "M", "O", "P", "N"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

result = source.agg_by([agg.first(cols=["FirstNumber = Number"]), agg.last(cols=["LastNumber = Number"])], by=["X"])
```

## Related Documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to create multiple summary statistics for groups](../../../how-to-guides/combined-aggregations.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/api/agg/Aggregation.html#AggFirst(java.lang.String...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.agg.html?highlight=first#deephaven.agg.first)