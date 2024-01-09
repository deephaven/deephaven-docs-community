---
id: create-columns
title: How to create new columns in a table
sidebar_label: Create new columns in a table
---

This guide will show you how create new columns in your tables.

[Selection](./use-select-view-update.md) methods -- such as [`select`](../reference/table-operations/select/select.md), [`view`](../reference/table-operations/select/view.md), [`update`](../reference/table-operations/select/update.md), [`update_view`](../reference/table-operations/select/update-view.md), and [`lazy_update`](../reference/table-operations/select/lazy-update.md) -- and [formulas](../reference/query-language/formulas/formulas.md) are used to create new columns:

- The [selection](./use-select-view-update.md) method determines which columns will be in the output table and how the values are computed.
- The [formulas](../reference/query-language/formulas/formulas.md) are the recipes for computing the cell values.

In the following examples, we use a table of student test results. Using [`update`](../reference/table-operations/select/update.md) , we create a new column (`Total`) containing the sum of the math, science, and art scores for each student. Notice that [`update`](../reference/table-operations/select/update.md) includes the columns from the source table in the output table.

```python test-set=1 order=scores,total
from deephaven import new_table

from deephaven.column import string_col, int_col

scores = new_table([
    string_col("Name", ["James", "Lauren", "Zoey"]),
    int_col("Math", [95, 72, 100]),
    int_col("Science", [100, 78, 98]),
    int_col("Art", [90, 92, 96])
])

total = scores.update(formulas=["Total = Math + Science + Art"])
```

Now we make the example a little more complicated by adding a column of average test scores.

```python test-set=1
average = scores.update(formulas=["Average = (Math + Science + Art) / 3 "])
```

For the next example, we have the students' test results in various subjects and the class averages. We want to see which students scored higher than the class average. We can use the [`select`](../reference/table-operations/select/select.md) method to create a table containing the `Name` and `Subject` columns from the source table, plus a new column indicating if the score is above average.

```python test-set=1 order=class_average,above_average
from deephaven import new_table
from deephaven.column import string_col, int_col

class_average = new_table([
    string_col("Name", ["James", "James", "James", "Lauren", "Lauren", "Lauren", "Zoey", "Zoey", "Zoey"]),
    string_col("Subject", ["Math", "Science", "Art", "Math", "Science", "Art", "Math", "Science", "Art"]),
    int_col("Number", [95, 100, 90, 72, 78, 92, 100, 98, 96]),
    int_col("ClassAverage", [90, 87, 65, 93, 88, 98, 80, 77, 95]),
])

above_average = class_average.select(formulas=["Name", "Subject", "AboveAverage = Number > ClassAverage"])
```

## Related documentation

- [Create a new table](./new-table.md)
- [How to select, view, and update data in tables](./use-select-view-update.md)
- [How to use filters](./use-filters.md)
- [How to use variables and functions in query strings](./query-scope-how-to.md)
