---
id: use-pandas
title: How to use pandas in Python queries
sidebar_label: Use pandas
---

This guide shows you how to use [pandas](http://pandas.pydata.org/) in your Python queries in Deephaven.

[Pandas](http://pandas.pydata.org/) is the most used library for data analysis and manipulation in Python. Using [pandas](http://pandas.pydata.org/) with Deephaven can make your queries more flexible.

## Table to DataFrame

A [`DataFrame`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html?highlight=dataframe#pandas.DataFrame) is a two-dimensional tabular data structure that is native to [pandas](http://pandas.pydata.org/). With Deephaven, we can convert between [Deephaven tables and pandas DataFrames](/community/solutions/tech/pandas/).

First, let's create a Deephaven table.

```python test-set=1 order=source
from deephaven import new_table
from deephaven.column import string_col, int_col, float_col, double_col

source = new_table([
   string_col("Strings", ["String 1", "String 2", "String 3"]),
   int_col("Ints", [4, 5, 6]),
   float_col("Floats", [9.9, 8.8, 7.7]),
   double_col("Doubles", [0.1, 0.2, 0.3])
])
```

To convert the table to a data frame, import [`deephaven.pandas.to_pandas`](../reference/pandas/to-pandas.md) to perform the conversion. The web UI will display data frames similar to tables.

```python test-set=1
from deephaven.pandas import to_pandas

data_frame = to_pandas(source)
```

[`to_pandas`](../reference/pandas/to-pandas.md) supports three different values for `dtype_backend`, each of which uses a different backend for the resultant data frame:

- `numpy_nullable`: This is the default value. It uses [NumPy](https://numpy.org) nullable dtypes for all dtypes that have a nullable implementation.
- `None`: This uses the basic [NumPy](https://numpy.org) backend, which does not support nullable dtypes.
- `pyarrow`: This uses [PyArrow](https://arrow.apache.org/docs/python/index.html) dtypes.

Changing the value of `dtype_backend` changes the resulting data frame's backend. In the example below, `data_frame` uses PyArrow as its backend.

```python test-set=1
data_frame = to_pandas(source, dtype_backend="pyarrow")
```

When `dtype_backend` is set to `None`, [`to_pandas`](../reference/pandas/to-pandas.md) automatically replaces null values in tables with [pandas.NA](https://pandas.pydata.org/docs/user_guide/missing_data.html). This can be changed by setting the `conv_null` argument to `False`. Note that `conv_null=False` will result in an error if `dtype_backend` is not `None`.

```python test-set=1 order=source,df
from deephaven import new_table
from deephaven.column import string_col, int_col, float_col, double_col
from deephaven.constants import NULL_DOUBLE
from deephaven.pandas import to_pandas

source = new_table([
   string_col("Strings", ["String 1", "String 2", "String 3"]),
   int_col("Ints", [4, 5, 6]),
   float_col("Floats", [9.9, 8.8, 7.7]),
   double_col("Doubles", [0.1, NULL_DOUBLE, 0.3])
])

df = to_pandas(table=source, dtype_backend=None, conv_null=False)
```

## DataFrame to Table

Users often perform analysis which results in a [pandas](http://pandas.pydata.org/) data frame. To convert a data frame to a Deephaven table, we start with the data frame created above and map that to a Deephaven table using the [`pandas.to_table`](../reference/pandas/to-table.md) method. To convert only a subset of the columns in the DataFrame to a table, use the `cols` argument.

```python test-set=1 order=new_table_all,new_table_subset
from deephaven.pandas import to_table

new_table_all = to_table(data_frame)
new_table_subset = to_table(df=data_frame, cols=["Ints", "Floats"])
```

The new Deephaven table will display in the IDE and the data will match the original data. To check that the data type conversions are accurate, we can look at the [table metadata](../reference/table-operations/metadata/meta_table.md).

For the data frame, we print the data types in the Console. For the Deephaven table, we create a new table containing the metadata information.

```python test-set=1
print(data_frame.dtypes)

meta_table = new_table_all.meta_table
```

[Pandas](http://pandas.pydata.org/) uses `float32` and `float64` data types, which are equivalent to `float` and `double` in Deephaven. These are the same type and require the same memory. A `String` in Deephaven is an `object` in [pandas](http://pandas.pydata.org/).

## How to do common Pandas operations in Deephaven

Deephaven tables and [pandas](http://pandas.pydata.org/) data frames both contain tabular data. In both cases, users want to perform the same kinds of operations, such as creating tables, filtering tables, and aggregating tables. Below we present how to do the same operations with both [pandas](http://pandas.pydata.org/) and Deephaven.

In these examples, keep in mind that [pandas](http://pandas.pydata.org/) data frames are mutable while Deephaven tables are immutable but can have data that changes dynamically. This results in differences in how some operations are approached.

### Create a table

Creating a [pandas](http://pandas.pydata.org/) data frame or Deephaven table is very similar.

<!--TODO: link to overview page [#529](https://github.com/deephaven/deephaven.io/issues/529) -->

```python test-set=2
import pandas as pd

data_frame = pd.DataFrame(
    {'A': [1, 2, 3],
     'B': ['X', 'Y', 'Z']}
)

print(data_frame)


from deephaven import new_table
from deephaven.column import int_col, string_col

table = new_table([
   int_col('A', [1, 2, 3]),
   string_col('B', ['X', 'Y', 'Z'])
])
```

#### Metadata

Let's explore how the data is handled by looking at the metadata:

```python test-set=2
print(data_frame.dtypes)

meta_DH_table = table.meta_table
```

[Pandas](http://pandas.pydata.org/) has fewer data types than Deephaven, so notice that column `B` in `table` is appropriately a char, while the column type in `data_frame` is an object.

Deephaven supports many data types. To learn more about creating tables, see our guide [How to create a table with new_table](./new-table.md).

### Column manipulation

You'll often want to perform operations on whole columns. Deephaven has various methods for viewing, selecting, updating, eliminating, changing, and creating columns of data in tables. The choice of each can result in performance differences. See our guide [Choosing the right selection method for your query](../conceptual/choose-select-view-update.md) or [How to select, view, and update data in tables](./use-select-view-update.md) for detailed advice.

#### Add

In this case, we wish to add a column `C` that is equal to column `A` plus 5.

```python test-set=2
added_data_frame = data_frame.assign(C=data_frame['A'] + 5)
print(added_data_frame)


added_table = table.update(formulas=["C = A + 5"])
```

#### Remove

We can remove whole columns with [`drop`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop.html) in [pandas](http://pandas.pydata.org/) or [`drop_columns`](../reference/table-operations/select/drop-columns.md) in Deephaven.

```python test-set=2
dropped_data_frame = data_frame.drop(columns=['A'])
print(dropped_data_frame)


dropped_table = table.drop_columns(cols=["A"])
```

#### Rename

[Renaming](../reference/table-operations/select/rename-columns.md) columns in a data frame or Deephaven table is simple:

```python test-set=2
data_frame.rename(columns={"A": "X", "B": "B"}, inplace=True)
print(data_frame)


renamed_table = table.rename_columns(cols=["X = A"])
```

### Filter

Deephaven offers several types of filters. See our article on [how to use filters](./use-filters.md).

Filtering in Deephaven and [pandas](http://pandas.pydata.org/) has the same logic.

First, define a data set:

```python test-set=5
import pandas as pd

data_frame = pd.DataFrame(
    {'A': [1, 2, 3],
     'B': ['X', 'Y', 'Z']}
)

print(data_frame)


from deephaven import new_table
from deephaven.column import int_col, string_col

table = new_table([
   int_col('A', [1, 2, 3]),
   string_col('B', ['X', 'Y', 'Z'])
])
```

#### where

We can limit the columns to certain values that match a formula. See our article on [how to use formulas](./formulas-how-to.md).

```python test-set=5
filtered_data_frame = data_frame[data_frame.A < 2]
print(filtered_data_frame)

filtered_table = table.where(filters=["A < 2"])
```

#### Head and tail

We can also return just the [`head`](../reference/table-operations/filter/head.md) or [`tail`](../reference/table-operations/filter/tail.md) of the data frame or table. Below, we request the first three rows:

```python test-set=5
head_data_frame = data_frame.iloc[:3]
print(head_data_frame)


head_table = table.head(3)
```

Below, we request the last three rows:

```python test-set=5
tail_data_frame = data_frame.iloc[-3:]
print(tail_data_frame)

tail_table = table.tail(3)
```

### Sort

Sorting changes the order of values in a data set based upon comparison operations. All data is still in the data set but in a different order. In Deephaven, data can be sorted by query or from the UI. UI sorting only changes how the data is displayed. It does not change the underlying data.

For this example, we want a slightly larger data set:

```python test-set=3
import pandas as pd

data_frame = pd.DataFrame(
    {'A': [1, 2, 3, 4, 5, 6],
     'B': ['Z', 'Y', 'X', 'X', 'Y', 'Z'],
     'C': [7, 2, 1, 5, 3, 4]}
)

print(data_frame)


from deephaven import new_table, SortDirection
from deephaven.column import int_col, string_col

table = new_table([
   int_col('A', [1, 2, 3, 4, 5, 6]),
   string_col('B', ['Z', 'Y', 'X', 'X', 'Y', 'Z']),
   int_col('C', [7, 2, 1, 5, 3, 4])
])

```

#### Sort ascending

We can [`sort`](../reference/table-operations/sort/sort.md) in ascending order on a data set for a data frame or table:

```python test-set=3
sorted_data_frame = data_frame.sort_values(by='B')
print(sorted_data_frame)


sorted_table = table.sort(order_by=["B"])
```

#### Sort descending

We can use [`sort_descending`](../reference/table-operations/sort/sort-descending.md) on a data set for a data frame or table:

```python test-set=3
sorted_data_frame = data_frame.sort_values(by='B', ascending=False)
print(sorted_data_frame)


sorted_table = table.sort(order_by=["B"], order=[SortDirection.DESCENDING])
```

#### Specify sort direction for each column

To sort on different directions with one query, use `SortColumn`s in the [`sort`](../reference/table-operations/sort/sort.md) argument:

```python test-set=3
sorted_data_frame = data_frame.sort_values(by=['B','C'], ascending=[True,False])
print(sorted_data_frame)

sort_columns = [
    SortDirection.ASCENDING,
    SortDirection.DESCENDING
]

sorted_table = table.sort(order_by=['B','C'], order=sort_columns)
```

### Combine data

#### Concat

In [pandas](http://pandas.pydata.org/), [`concat`](https://pandas.pydata.org/docs/reference/api/pandas.concat.html?highlight=concat#pandas.concat) allows tables to be vertically combined, stacked on top of each other. The same operation can be performed using [`merge`](../reference/table-operations/merge/merge.md) on Deephaven tables. The combined columns should have the same data type.

```python order=table1,table2,table
import pandas as pd

data_frame1 = pd.DataFrame({'A': [1, 2]})
data_frame2 = pd.DataFrame({'A': [3, 4]})
data_frame = pd.concat([data_frame1, data_frame2])

print(data_frame)


from deephaven import merge,  new_table
from deephaven.column import int_col


table1 = new_table([int_col('A', [1, 2])])
table2 = new_table([int_col('A', [3, 4])])
table = merge([table1, table2])
```

#### Join

Deephaven's many join methods combine data by appending the columns of one data set to another. See our guide [How to join tables](./join-two-tables.md) to learn more.

[Pandas](http://pandas.pydata.org/) and Deephaven provide many of the same join methods, but there is not a one-to-one mapping of methods. In addition to the common join methods, Deephaven also provides inexact joins , such as [`aj` (as-of join)](../reference/table-operations/join/aj.md) and [`raj` (reverse as-of join)](../reference/table-operations/join/raj.md), for analyzing time series, which are not present in [pandas](http://pandas.pydata.org/).

```python order=table_left,table_right,table
import pandas as pd

df_left = pd.DataFrame({'A': [1, 2, 3], 'B': ['X', 'Y', 'Z']})
df_right = pd.DataFrame({'A': [3, 4, 5], 'C': ['L', 'M', 'N']})
df = pd.merge(df_left, df_right, on='A')

print(df)

from deephaven import new_table
from deephaven.column import int_col, string_col

table_left = new_table([int_col("A", [1, 2, 3]), string_col("B", ['X', 'Y', 'Z'])])
table_right = new_table([int_col("A", [3, 4, 5]), string_col("C", ['L', 'M', 'N'])])
table = table_left.join(table=table_right, on=["A"])
```

### Group data

#### Aggregate data

You'll often want to partition your data into groups and then compute values for the groups. Deephaven supports many kinds of data aggregations. There are more methods than can be covered here, so see our guides [How to perform dedicated aggregations for groups](./dedicated-aggregations.md) and [How to perform combined aggregations](./combined-aggregations.md).

```python order=table,table_avg
import pandas as pd

df = pd.DataFrame(
   {'A': [1, 3, 5],
    'B': [5, 7, 9]}
)

df_avg = df.mean()
print(df_avg)


from deephaven import new_table
from deephaven.column import int_col

table = new_table([
   int_col("A", [1, 3, 5]),
   int_col("B", [5, 7, 9])
])

table_avg = table.avg_by()
```

#### group_by

In this example, we first group the data, then apply a [sum](../reference/table-operations/group-and-aggregate/AggSum.md) on that group. For more information on grouping, see our [How to group and ungroup data](./grouping-data.md) guide.

```python order=table,grouped_table1,grouped_table2
import pandas as pd

data_frame = pd.DataFrame(
    {'A': [1, 2, 1, 2, 1, 2],
     'B': [2, 2, 5, 1, 3, 4]}
)

grouped_data_frame = data_frame.groupby(['A']).sum()
print(grouped_data_frame)


from deephaven import new_table
from deephaven.column import int_col

table = new_table([
   int_col('A', [1, 2, 1, 2, 1, 2]),
   int_col('B', [2, 2, 5, 1, 3, 4])
])

grouped_table1 = table.group_by(by=["A"]).view(formulas=["Sum = sum(B)"])

from deephaven import agg as agg

grouped_table2 = table.agg_by([agg.sum_(cols=["B"])], by=["A"])
```

### Clean data

If your data set has [null](../reference/query-language/types/nulls.md) or [NaN](../reference/query-language/types/NaNs.md) values, you'll probably want to remove or replace them before performing analysis. See our guide [How to handle null, infinity, and not-a-number values](./handle-null-inf-nan.md) for information on these data types in Deephaven.

In this example, we define a data set with a missing value. [Pandas](http://pandas.pydata.org/) uses `np.nan` to represent missing double values, while Deephaven uses `NULL_DOUBLE`.

```python test-set=6
import pandas as pd
import numpy as np

data_frame = pd.DataFrame(
    {'A': [1.0, 2.0, 3.0],
     'B': [4.0, 2.0, np.nan]}
)

print(data_frame)

from deephaven import new_table
from deephaven.column import double_col
from deephaven.constants import NULL_DOUBLE

table = new_table([
   double_col('A', [1.0, 2.0, 3.0]),
   double_col('B', [4.0, 2.0, NULL_DOUBLE])
])
```

We can filter the data sets to remove the missing values.

```python test-set=6
remove_values_data_frame = data_frame.dropna()
print(remove_values_data_frame)

remove_values_table = table.where(filters=["!isNull(B)"])
```

Or we can replace the missing values.

```python test-set=6
replace_values_data_frame = data_frame.fillna(value=0.0)
print(replace_values_data_frame)

replace_values_table = table.update(formulas=["B = isNull(B) ? 0.0 : B"])
```

## Related documentation

- [Choosing the right selection method for your query](../conceptual/choose-select-view-update.md)
- [Choose a join method](../conceptual/choose-joins.md)
- [How to select data in tables](./use-select-view-update.md)
- [How to use filters](./use-filters.md)
- [`empty_table`](../reference/table-operations/create/emptyTable.md)
- [`to_pandas`](../reference/pandas/to-pandas.md)
- [`to_table`](../reference/pandas/to-table.md)
- [Create a table with new_table](./new-table.md)
- [`merge`](../reference/table-operations/merge/merge.md)
- [`update`](../reference/table-operations/select/update.md)
