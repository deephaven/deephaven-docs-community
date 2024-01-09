---
id: metadata
title: How to access table meta data
sidebar_label: Access table meta data
---

This guide will show you how to use methods and attributes from Deephaven's `Table` class to access the meta data for your table.

## Methods

### `meta_table`

The `meta_table` attribute creates a new table that contains the table's meta data. Specifically, this table contains information about every column in the original table.

```python syntax
result = source.meta_table
```

This can be useful when you want to confirm which columns in a table are partitioning or grouping, or verify the data type of a column.

Let's create a table of weather data for Miami, Florida.

```python test-set=1
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col

miami = new_table([
    string_col("Month", ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]),
    int_col("Temp", [60, 62, 65, 68, 73, 76, 77, 77, 76, 74, 68, 63]),
    double_col("Rain", [1.62, 2.25, 3.00, 3.14, 5.34, 9.67, 6.50, 8.88, 9.86, 6.33, 3.27, 2.04])
])
```

We can access the meta data as follows:

```python test-set=1
meta = miami.meta_table
```

Obviously, this is more useful for a table we are unfamiliar with, but as you can see, the `meta` table provides information about the column and data types.

Now, let's create a table of weather data for Miami over three dates in January, then [averages](../reference/table-operations/group-and-aggregate/avgBy.md) the high and low temperatures by day.

```python test-set=2 order=miami,avg_temp
from deephaven import new_table

from deephaven.column import string_col, int_col

miami = new_table([
    string_col("Day", ["Jan 1", "Jan 1", "Jan 2", "Jan 2", "Jan 3", "Jan 3"]),
    int_col("Temp", [45, 62, 48, 63, 39, 59]),
])

avg_temp = miami.avg_by(by=["Day"])
```

Although the `Temp` column is originally created as an [int column](../reference/table-operations/create/intCol.md), the `Temp` column in the `avg_by` table becomes a double column. We can see this by hovering over the column header in the UI, and also by accessing the table's metadata.

```python test-set=2 order=meta
meta = avg_temp.meta_table
```

### `attributes`

The `attributes` method returns all of a Table's defined attributes.

```python test-set=1 order=null
print(miami.attributes())
```

### `has_columns`

Use `has_columns` to check whether a table contains a column (or columns) with the provided column name(s). It will return `True` if all columns are in the table, or `False` if _any_ of the provided column names are not found in the table.

```python test-set=1 order=null
print(miami.has_columns("Month"))
print(miami.has_columns(["Month", "NotAColumnName"]))
```

### `to_string`

Use [`to_string`](../reference/table-operations/metadata/to_string.md) return the first _n_ rows of a table as a pipe-delimited string.

```python syntax
source.to_string(
    num_rows: int = 10,
    cols: Union[str, Sequence[str]] = None
) -> str
```

- `num_rows` is the number of rows from the beginning of the table to return. The default is 10.
- `cols` is the column name(s) to include in the string. The default is `None`, which includes all columns.

```python test-set=1 order=null
print(miami.to_string(4))
```

## Attributes

### `columns`

For a full list of a Table's column definitions, use [`columns`](../reference/table-operations/metadata/columns.md):

```python test-set=1 order=null
print(miami.columns)
```

### `is_blink`

To see whether or not a Table is a blink table, use [`is_blink`](../reference/table-operations/metadata/is_blink.md):

```python test-set=1 order=null
print(miami.is_blink)
```

### `is_flat`

To see whether or not a Table is flat, use [`is_flat`](../reference/table-operations/metadata/is_flat.md):

```python test-set=1 order=null
print(miami.is_flat)
```

### `is_refreshing`

To see whether or not a Table is refreshing, use [`is_refreshing`](../reference/table-operations/metadata/is_refreshing.md):

```python test-set=1 order=null
print(miami.is_refreshing)
```

### `size`

To see the number of rows in a Table, use [`size`](../reference/table-operations/metadata/size.md):

```python test-set=1 order=null
print(miami.size)
```

### `update_graph`

To get the source Table's update graph, use [`update_graph`](../reference/table-operations/metadata/update_graph.md):

```python test-set=1 order=null
print(miami.update_graph)
```

## Related documentation

- [Create a new table](./new-table.md)
- [How to perform dedicated aggregations for groups](./dedicated-aggregations.md)
- [`attributes`](../reference/table-operations/metadata/attributes.md)
- [`columns`](../reference/table-operations/metadata/columns.md)
- [`has_columns`](../reference/table-operations/metadata/has_columns.md)
- [`is_blink`](../reference/table-operations/metadata/is_blink.md)
- [`is_flat`](../reference/table-operations/metadata/is_flat.md)
- [`is_refreshing`](../reference/table-operations/metadata/is_refreshing.md)
- [`size`](../reference/table-operations/metadata/size.md)
- [`meta_table`](../reference/table-operations/metadata/meta_table.md)
- [`to_string`](../reference/table-operations/metadata/to_string.md)
- [`update_graph`](../reference/table-operations/metadata/update_graph.md)
