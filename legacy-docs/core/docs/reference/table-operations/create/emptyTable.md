---
id: emptyTable
title: empty_table
---

The `empty_table` method creates an empty in-memory table with a specified number of rows.

## Syntax

```python syntax
empty_table(size: int) -> Table
```

## Parameters

<ParamTable>
<Param name="size" type="int">

The number of empty rows allocated.

</Param>
</ParamTable>

## Returns

An empty in-memory table.

## Example

The following example creates an empty in-memory table with five rows.

```python
from deephaven import empty_table

result = empty_table(5)
```

The following example creates an empty in-memory table with five rows and then updates it to contain data.

```python
from deephaven import empty_table

result = empty_table(5).update(formulas=["X = 5"])
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [Create an empty table](../../../how-to-guides/empty-table.md)
- [`new_table`](./newTable.md)
- [`update`](../select/update.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#emptyTable(long)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.table_factory.html?highlight=empty#deephaven.table_factory.empty_table)