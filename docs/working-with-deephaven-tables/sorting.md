---
id: sorting
title: How to sort table data in Deephaven
sidebar_label: Sorting data in Deephaven
---

Sorting is a common operation in data analysis, and Deephaven makes it easy to sort data in a variety of ways. This guide will show you how to sort table data both programmatically and by using the UI.

## Sort programmatically

### `sort` and `sort_descending`

You can sort table data programmatically by using the `sort()` and `sort_descending` methods:

```python order=result_sort,result_sort_desc
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("Letter", ["A", "B", "A", "B", "B", "A"]),
    int_col("Number", [6, 6, 1, 3, 4, 4]),
    string_col("Color", ["red", "blue", "orange", "purple", "yellow", "pink"])
])

result_sort = source.sort(order_by=["Letter"])
result_sort_desc = source.sort_descending(order_by=["Letter"])
```

Given a column name to order the data by, `sort` returns a new table with the data sorted in ascending order, and `sort_descending` returns a new table with the data sorted in descending order.

### Sorting by multiple columns

Both `sort` and `sort_descending` can sort multiple columns at once. For example, here we will sort by our `Letter` column, then the `Number` column.

```python order=result_sort,result_sort_desc
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("Letter", ["A", "B", "A", "B", "B", "A"]),
    int_col("Number", [6, 6, 1, 3, 4, 4]),
    string_col("Color", ["red", "blue", "orange", "purple", "yellow", "pink"])
])

result_sort = source.sort(order_by=["Letter", "Number"])
result_sort_desc = source.sort_descending(order_by=["Letter", "Number"])
```

### Complex sorts

The `sort` method can be used to sort multiple columns in different directions. For example, we can sort by `Letter` in ascending order, then by `Number` in descending order.

```python order=result
from deephaven import new_table, SortDirection
from deephaven.column import string_col, int_col, double_col

source = new_table([
    string_col("Letter", ["A", "B", "A", "B", "B", "A"]),
    int_col("Number", [6, 6, 1, 3, 4, 4]),
    string_col("Color", ["red", "blue", "orange", "purple", "yellow", "pink"])
])

asc = SortDirection.ASCENDING
desc = SortDirection.DESCENDING

result = source.sort(order_by=["Letter", "Number"], order=[asc, desc])
```

This is simpler than invoking both methods to accomplish the same result:

```python order=result
result = source.sort(order_by="Letter").sort_descending(order_by="Number")
```

## Sort via the UI

FIXME: from here

## Related documentation

- [How to install Python packages](./install-python-packages.md)
- [How to use deephaven.learn](./use-deephaven-learn.md)
- [How to use Python packages](./use-python-packages.md)
- [How to use PyTorch](./use-pytorch.md)
- [How to use TensorFlow](./use-tensorflow.md)
- [How to use TensorBoard with Deephaven and TensorFlow](./use-tensorboard-with-tf.md)
- [How to use SciKit-Learn](./use-scikit-learn.md)
- [How to use variables and functions in query strings](./query-scope-how-to.md)
- [How to write data to an in-memory, real-time table](./dynamic-table-writer.md)

```

```
