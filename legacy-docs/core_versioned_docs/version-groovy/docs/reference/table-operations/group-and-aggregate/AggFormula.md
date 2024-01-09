---
id: AggFormula
title: AggFormula
---

`AggFormula` returns an aggregator that computes a user-defined formula aggregation across specified columns.

## Syntax

```
AggFormula(formula, paramToken, columnNames...)
```

## Parameters

<ParamTable>
<Param name="formula" type="String">

The user-defined formula to apply to each group. This formula can contain a combination of any of the following:

- Built-in functions such as `min`, `max`, etc.
- Mathematical arithmetic such as `*`, `+`, `/`, etc.
- User-defined functions

</Param>
<Param name="paramToken" type="String">

The parameter name within the formula. If `formula` is `max(each)`, then `each` is the `paramToken`.

</Param>
<Param name="columnNames" type="String...">

The source column(s) for the calculations.

- `"X"` will output the total sum of values in the `X` column for each group.
- `"Y = X"` will output the total sum of values in the `X` column for each group and rename it to `Y`.
- `"X, A = B"` will output the total sum of values in the `X` column for each group and the total sum of values in the `B` value column renaming it to `A`.

</Param>
</ParamTable>

:::caution

If an aggregation does not rename the resulting column, the aggregation column will appear in the output table, not the input column. If multiple aggregations on the same column do not rename the resulting columns, an error will result, because the aggregations are trying to create multiple columns with the same name. For example, in `table.aggBy([agg.AggSum(“X”), agg.AggAvg("X")`, both the sum and the average aggregators produce column `X`, which results in an error.

:::

## Returns

An aggregator that computes a user-defined formula within an aggregation group, for each input column.

## Examples

In this example, `AggFormula` is used to calculate the aggregate minimum across several columns by the `Letter` column.

```groovy order=source,result
import static io.deephaven.api.agg.Aggregation.AggFormula

source = emptyTable(20).update("X = i", "Y = 2 * i", "Z = 3 * i", "Letter = (X % 2 == 0) ? `A` : `B`")

result = source.aggBy([AggFormula("min(each)", "each", "MinX = X", "MinY = Y", "MinZ = Z")], "Letter")
```

In this example, `AggFormula` is used to calculate the aggregated average across several column by the `Letter` and `Color` column.

```groovy order=source,result
import static io.deephaven.api.agg.Aggregation.AggFormula

colors = ["Red", "Green", "Blue"]

source = emptyTable(40).update("X = 0.1 * i", "Y1 = Math.pow(X, 2)", "Y2 = Math.sin(X)", "Y3 = Math.cos(X)", "Letter = (i % 2 == 0) ? `A` : `B`", "Color = (String)colors[i % 3]")

myAgg = [AggFormula("avg(k)", "k", "AvgY1 = Y1", "AvgY2 = Y2", "AvgY3 = Y3")]

result = source.aggBy(myAgg, "Letter", "Color")
```

In this example, `AggFormula` is used to calculate the aggregate sum of squares across each of the `X`, `Y` and `Z` columns by the `Letter` column.

```groovy order=source,result
import static io.deephaven.api.agg.Aggregation.AggFormula

source = emptyTable(20).update("X = i", "Y = 2 * i", "Z = 3 * i", "Letter = (X % 2 == 0) ? `A` : `B`")

myAgg = [AggFormula("sum(each * each)", "each", "SumSqrX = X", "SumSqrY = Y", "SumSqrZ = Z")]

result = source.aggBy(myAgg, "Letter")
```

In this example, `AggFormula` calls a user-defined closure to compute the range of the `X`, `Y`, and `Z` columns by the `Letter` column.

:::note
The output of an `AggFormula` is of type `java.lang.Object` unless an explicit typecast is made in the `formula` string.
:::

```groovy order=source,result
import static io.deephaven.api.agg.Aggregation.AggFormula

source = emptyTable(20).update("X = i", "Y = 2 * i", "Z = 3 * i", "Letter = (X % 2 == 0) ? `A` : `B`")

rangeX = {x -> x.max() - x.min()}

myAgg = [AggFormula("(int)rangeX(each)", "each", "RangeX = X", "RangeY = Y", "RangeZ = Z")]

result = source.aggBy(myAgg, "Letter")
```

## Related documentation

- [How to create an empty table](../../../how-to-guides/empty-table.md)
- [How to create multiple summary statistics for groups](../../../how-to-guides/combined-aggregations.md)
- [`AggMin`](./AggMin.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/api/agg/Aggregation.html#AggFormula(java.lang.String,java.lang.String,java.lang.String...)>)
