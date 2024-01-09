---
id: dateTimeCol
title: datetime_col
---

The `datetime_col` method creates a column containing date-time values.

:::note

This method is commonly used with [`new_table``](./newTable.md) to create tables.

:::

## Syntax

```python syntax
datetime_col(name: str, data: Sequence[Any]) -> InputColumn
```

## Parameters

<ParamTable>
<Param name="name" type="str">

The name of the new column.

</Param>
<Param name="data" type="Sequence[Any]">

A sequence of date-time values. This can be a list, tuple, or other sequence type.

</Param>
</ParamTable>

## Returns

An [`InputColumn`](https://deephaven.io/core/pydoc/code/deephaven.column.html#deephaven.column.InputColumn).

## Example

The following examples use [`new_table`](./newTable.md) to create a table with a single column of date-times named `DateTimes`.

```python order=result
from deephaven.time import to_j_instant
from deephaven import new_table
from deephaven.column import datetime_col

first_time = to_j_instant("2021-07-04T08:00:00 ET")
second_time = to_j_instant("2021-09-06T12:30:00 ET")
third_time = to_j_instant("2021-12-25T21:15:00 ET")

result = new_table([
    datetime_col("DateTimes", [first_time, second_time, third_time])
])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [`new_table`](./newTable.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#dateTimeCol(java.lang.String,io.deephaven.time.DateTime...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.column.html?highlight=datetime#deephaven.column.datetime_col)
