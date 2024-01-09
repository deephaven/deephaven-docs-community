---
id: to-table
title: to_table
---

The `to_table` method creates a new table from a `pandas.DataFrame`.

## Syntax

```python syntax
to_table(df: pandas.DataFrame, cols: list[str] = None) -> Table
```

## Parameters

<ParamTable>
<Param name="df" type="pandas.DataFrame">

The `pandas.DataFrame` instance.

</Param>
<Param name="cols" type="list[str]" optional>

The columns to convert. If not specified, all columns are converted.

</Param>
</ParamTable>

## Returns

A Deephaven Table.

## Example

The following example uses pandas to create a DataFrame, then converts it to a Deephaven Table with `to_table`.

```python order=result,df
from deephaven.pandas import to_table
import pandas as pd

d = {'col1': [1, 2], 'col2': [3, 4]}
df = pd.DataFrame(data=d)

result = to_table(df)
```

## Related documentation

- [Create a new table](../../how-to-guides/new-table.md)
- [`new_table`](../table-operations/create/newTable.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.pandas.html#deephaven.pandas.to_table)
