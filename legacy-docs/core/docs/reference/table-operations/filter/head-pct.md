---
id: head-pct
title: head_pct
---

The `head_pct` method returns a table with a specific percentage of rows from the beginning of the source table.

:::caution
Attempting to use `head_pct` on a [blink table](../../../conceptual/table-types.md#blink) will raise an error.
:::

## Syntax

```python syntax
table.head_pct(pct: float) -> Table
```

## Parameters

<ParamTable>
<Param name="pct" type="float">

The percentage of rows to return. This value must be given as a floating-point number between 0 (0%) to 1 (100%).

</Param>
</ParamTable>

## Returns

A new table with a specific percentage of rows from the beginning of the source table.

## Examples

The following example filters the table to the first 40% and 33.3333333% of rows.

```python order=source,result,result1
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col
from deephaven.constants import NULL_INT

source = new_table([
    string_col("Letter", ["A", "C", "F", "B", "E", "D", "A"]),
    int_col("Number", [NULL_INT, 2, 1, NULL_INT, 4, 5, 3]),
    string_col("Color", ["red", "blue", "orange", "purple", "yellow", "pink", "blue"]),
    int_col("Code", [12, 14, 11, NULL_INT, 16, 14, NULL_INT]),
])

result = source.head_pct(pct=0.40)
result1 = source.head_pct(pct=0.333333333)
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to use filters](../../../how-to-guides/use-filters.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/table/Table.html#headPct(double)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table.html?highlight=head#deephaven.table.Table.head_pct)