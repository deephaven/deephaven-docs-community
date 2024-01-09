---
id: simple-python-query
title: Simple Python query
---

This guide will show you how to run your first query in Python.

By following each code step, you will run a Python query that creates a new table.

In Python, the first step is to import all the tools your query will need. In this example, we are going to make a new table with columns that are strings, integers, doubles. We use the following import command:

```python test-set=1
from deephaven import new_table

from deephaven.column import string_col, int_col, double_col
```

This new table can have any number of rows or columns. To start, we want something easy to see and understand.

We will draw from sample data that analyzes the average temperature and precipitation of rain each month for Miami, Florida. [Click here for the original data set.](https://www.usclimatedata.com/climate/miami/florida/united-states/usfl0316)

- For each column, use the method that refers to the type of column you want to create: in this case, we will use [`string_col`](../reference/table-operations/create/stringCol.md), [`int_col`](../reference/table-operations/create/intCol.md), and [`double_col`](../reference/table-operations/create/doubleCol.md).
- The first argument, a string, is the name of the new column.
- When creating column names, be descriptive but terse in order to fit many columns on the screen.

```python test-set=1
miami = new_table([
    string_col("Month", ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]),
    int_col("Temp", [60, 62, 65, 68, 73, 76, 77, 77, 76, 74, 68, 63]),
    double_col("Rain", [1.62, 2.25, 3.00, 3.14, 5.34, 9.67, 6.50, 8.88, 9.86, 6.33, 3.27, 2.04])
])
```

We can now filter the data. For example, we only want to visit when the temperature is less than 74 degrees. To see which `Months` match that filter, enter the command below.

```python test-set=1
visit = miami.where(filters=["Temp < 74"])
```

We can also perform analysis on data, such as mathematical operations or formulas. In this example, we want to know how much each month's rainfall compares to the yearly average. The average yearly rainfall for Miami is 61.9 inches.

```python test-set=1
rain = miami.update(formulas=["RelativeRain = Rain - 61.9/12 "])
```

Now you are ready for more advanced queries and analysis in Deephaven with Python!

## Related documentation

- [Create a new table](./new-table.md)
