---
id: query-language-functions
title: How to use Deephaven's built-in query language functions
sidebar_label: Use built-in query language functions
---

Deephaven's query language has many functions that are automatically imported for use. These functions can be used in any [`update`](../reference/table-operations/select/update.md) (or similar) operation without any imports needed. Since these functions are Java functions, they are fast and don't require any data type casting.

This guide shows a few examples of using these automatically imported functions. The [auto import query language functions reference](../reference/query-language/query-library/auto-imported-functions.md) shows all of the Java classes whose functions are automatically imported for use.

## Example: `abs`

This example shows how to convert a column of integers into a column of the absolute values of the integers using `abs`.

```python order=result,source
from deephaven import new_table
from deephaven.column import int_col

source = new_table([
    int_col("IntegerColumn", [1, 2, -2, -1])
])
result = source.update(["Abs = abs(IntegerColumn)"])
```

## Example: `parseInt`

This example shows how to convert a column of numeric strings into integers using `parseInt`.

```python order=result,source
from deephaven import new_table
from deephaven.column import string_col

source = new_table([
    string_col("StringColumn", ["1", "2", "-2", "-1"])
])
result = source.update(["IntegerColumn = parseInt(StringColumn)"])
```

## Example: `parseInstant`

This example shows how to convert a column of [date-time](../reference/query-language/types/date-time.md) strings to [date-time](../reference/query-language/types/date-time.md) objects using [`parseInstant`](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#parseInstant(java.lang.String)>).

```python order=result,source
from deephaven import new_table
from deephaven.column import string_col

source = new_table([
    string_col("DateTimeStrings", ["2020-01-01T00:00:00 ET", "2020-01-02T00:00:00 ET", "2020-01-03T00:00:00 ET"])
])

result = source.update(["DateTimes = parseInstant(DateTimeStrings)"])
```

## Example: `and`

This example shows how to compute the logical AND of a group of columns of booleans using `and`.

```python order=result,source
from deephaven import new_table
from deephaven.column import bool_col

source = new_table([
    bool_col("A", [True, True, True]),
    bool_col("B", [True, True, False]),
    bool_col("C", [True, False, True])
])
result = source.update(["IsOk = and(A, B, C)"])
```

## Example: `absAvg` and `avg`

This example shows how to compute the average of the absolute value of integers in a column using `absAverage`.

```python order=result,source
from deephaven import new_table
from deephaven.column import int_col

source = new_table([
    int_col("A", [-1, 2, 3]),
    int_col("B", [1, -2, 3]),
    int_col("C", [1, 2, -3]),
])
result = source.update(["AbsAvg = absAvg(A, B, C)", "Avg = avg(A, B, C)"])
```

## Related documentation

- [Auto-imported query language functions reference](../reference/query-language/query-library/auto-imported-functions.md)
