---
id: emptyTable
title: emptyTable
---

The `emptyTable` method creates an empty in-memory table with a specified number of rows.

## Syntax

```
emptyTable(size)
```

## Parameters

<ParamTable>
<Param name="size" type="long">

The number of empty rows allocated.

</Param>
</ParamTable>

## Returns

An empty in-memory table.

## Example

The following example creates an empty in-memory table with five rows.

```groovy
result = emptyTable(5)
```

The following example creates an empty in-memory table with five rows and then updates it to contain data.

```groovy
result = emptyTable(5).update("X = 5")
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [Create an empty table](../../../how-to-guides/empty-table.md)
- [`newTable`](./newTable.md)
- [`update`](../select/update.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/engine/util/TableTools.html#emptyTable(long)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.TableTools.html?highlight=emptytable#deephaven.TableTools.emptyTable)