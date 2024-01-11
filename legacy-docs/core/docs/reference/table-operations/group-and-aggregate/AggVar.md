---
id: AggVar
title: var
---

`agg.var` returns an aggregator that computes the sample variance of values, within an aggregation group, for each input column.

Sample variance is calculated using the [Bessel correction](https://en.wikipedia.org/wiki/Bessel%27s_correction), which ensures it is an [unbiased estimator](https://en.wikipedia.org/wiki/Bias_of_an_estimator) of population variance under some conditions.

## Syntax

```
var(cols: Union[str, list[str]]) -> Aggregation
```

## Parameters

<ParamTable>
<Param name="cols" type="Union[str, list[str]]">

The source column(s) for the calculations.

- `["X"]` will output the sample variance of values in the `X` column for each group.
- `["Y = X"]` will output the sample variance of values in the `X` column for each group and rename it to `Y`.
- `["X, A = B"]` will output the sample variance of values in the `X` column for each group and the sample variance of values in the `B` value column renaming it to `A`.

</Param>
</ParamTable>

:::caution

If an aggregation does not rename the resulting column, the aggregation column will appear in the output table, not the input column. If multiple aggregations on the same column do not rename the resulting columns, an error will result, because the aggregations are trying to create multiple columns with the same name. For example, in `table.agg_by([agg.sum_(cols=[“X”]), agg.avg(cols=["X"])`, both the sum and the average aggregators produce column `X`, which results in an error.

:::

## Returns

An aggregator that computes the sample variance of values, within an aggregation group, for each input column.

## Examples

In this example, `agg.var` returns the sample variance of values of `Number` as grouped by `X`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col
from deephaven import agg as agg

source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "N", "O", "N", "P", "M", "O", "P", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

result = source.agg_by([agg.var(cols=["Number"])], by=["X"])
```

In this example, `agg.var` returns the sample variance of values of `Number` (renamed to `VarNumber`), as grouped by `X`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col
from deephaven import agg as agg

source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "N", "O", "N", "P", "M", "O", "P", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

result = source.agg_by([agg.var(cols=["VarNumber = Number"])], by=["X"])
```

In this example, `agg.var` returns the sample variance of values of `Number` (renamed to `VarNumber`), as grouped by `X` and `Y`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col
from deephaven import agg as agg

source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "N", "O", "N", "P", "M", "O", "P", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

result = source.agg_by([agg.var(cols=["VarNumber = Number"])], by=["X", "Y"])
```

In this example, `agg.var` returns the sample variance of values of `Number` (renamed to `VarNumber`), and `agg.median` returns the median of `Number` (renamed to `MedNumber`), as grouped by `X`.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col
from deephaven import agg as agg

source = new_table([
    string_col("X", ["A", "B", "A", "C", "B", "A", "B", "B", "C"]),
    string_col("Y", ["M", "N", "O", "N", "P", "M", "O", "P", "M"]),
    int_col("Number", [55, 76, 20, 130, 230, 50, 73, 137, 214]),
])

result = source.agg_by([agg.var(cols=["VarNumber = Number"]),agg.median(cols=["MedNumber = Number"])], by=["X"])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to create multiple summary statistics for groups](../../../how-to-guides/combined-aggregations.md)
- [`agg_by`](./aggBy.md)
- [`var_by`](./varBy.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/api/agg/Aggregation.html#AggVar(java.lang.String...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.agg.html?highlight=var#deephaven.agg.var)