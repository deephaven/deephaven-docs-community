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

You can also perform sorting operations via the UI, without ever having to call a single method. To sort a column, right-click on the column header. Then, navigate down to **Sort by\*** and select a sort option.

![img](../assets/working-with-deephaven-tables/sort-by-ui.png)

To add a second sort (or third, fourth, and so on), right-click on a column header and select **Add Additional Sort**. Then, select a sort option.

:::note

If you choose **Sort by** instead of **Add Additional Sort**, the new sort will replace the existing sort(s).

:::

![img](../assets/working-with-deephaven-tables/addl-sort.png)

To remove a sort, right-click on the column header and select **Remove sort** to remove a single sort, or **Clear Table Sorting** to remove all sorts.

![img](../assets/working-with-deephaven-tables/rm-sort.png)

Columns with active sorts are marked with sort icons. In this case, the `Letter` column has an upward arrow to indicate that it is sorted in ascending order, and the `Number` column has a downward arrow to indicate that it is sorted in descending order. In the **Sort by** menu, the active sort is marked with a colored line icon.

![img](../assets/working-with-deephaven-tables/active-sorts.png)

## `restrict_sort_to`

The `restrict_sort_to` method allows you to restrict the columns that can be sorted via the UI. This is useful if you want to prevent yourself or other users from accidentally performing expensive sort operations as you interact with tables in the UI. For example, we can restrict sorting to the `Letter` column:

```python test-set=1 order=table
from deephaven import new_table
from deephaven.column import string_col, int_col, double_col

source = new_table([
    string_col("Letter", ["A", "B", "A", "B", "B", "A"]),
    int_col("Number", [6, 6, 1, 3, 4, 4]),
    string_col("Color", ["red", "blue", "orange", "purple", "yellow", "pink"])
])


table = source.restrict_sort_to(cols="Letter")
```

Now, we can still sort by `Letter`, but attempting to sort by `Number` will result in an error:

```python skip-test
t_sorted = table.sort(order_by="Number")
```
