---
id: strings
title: Strings
---

String values can be represented in Deephaven query strings by using backticks `` ` ``.

## Syntax

```
`string`
```

## Usage

### Filter

The following example shows a query string used to filter data. This query string returns items in the `Value` column that are equal to the string `` `C` ``.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col

source = new_table([
    string_col("Value", ["A" , "B", "C", "D", "E"])
])

result = source.where(filters=["Value = `C`"])
```

## Related documentation

- [How to use formulas](../../../how-to-guides/formulas-how-to.md)
- [How to use strings and variables inside your query strings](../../../how-to-guides/query-scope-how-to.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [`where`](../../table-operations/filter/where.md)
- [`update`](../../table-operations/select/update.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.dtypes.html?highlight=string#deephaven.dtypes.string)
