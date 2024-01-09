---
id: multijoin
title: How to join three or more tables together
sidebar_label: Join 3+ tables together
---

This guide discusses how to join three or more Deephaven tables together. While Deephaven has multiple methods for [joining two tables](./join-two-tables.md), there is only one method for efficiently joining three or more tables at once: [`multi_join`](../reference/table-operations/join/multi-join.md).

[`multi_join`](../reference/table-operations/join/multi-join.md) joins three or more tables together in the same way that [`natural join`](../reference/table-operations/join/natural-join.md) joins two tables together. However, [`multi_join`](../reference/table-operations/join/multi-join.md) is faster than repeated [`natural join`](../reference/table-operations/join/natural-join.md) operations because it uses a single hash table, regardless of how many constituent tables are used.

[`multi_join`](../reference/table-operations/join/multi-join.md) can be used in two ways - with constituent tables or with one or more [`MultiJoinInput`](../reference/table-operations/join/multi-join.md#multijoininput) objects.

## Using tables

This option can be accomplished with one line of code. However, it requires that all constituent tables have identical key column names and that _all_ of the tables' output rows are desired.

```python syntax
multi_table = multi_join(input=[t1, t2, t3], on="common_key")
multi_table = multi_join(input=[t1, t2, t3], on=["common_key", "common_key2"])
```

- `input` is any number of tables to merge; for example, `[table1, table2, table3]`. This parameter can also be a list of [`MultiJoinInput`](../reference/table-operations/join/multi-join.md#multijoininput) objects.
- `on` is a single string, or a sequence of strings, that contain keys (column names).

The following example demonstrates [`multi_join`](../reference/table-operations/join/multi-join.md) using tables as inputs.

- First, we create three tables, each containing a list of students' names and associated grades.
- Then, we create a [`MultiJoinTable`](../reference/table-operations/join/multi-join.md#multijointable) object, which joins the three tables on the `Name` and `Grade` columns.
- Finally, we call `table()` to access the [`MultiJoinTable`](../reference/table-operations/join/multi-join.md#multijointable) object's underlying table.

```python order=result,Grade5,Grade6,Grade7
# import multijoin
from deephaven.table import multi_join
from deephaven import new_table
from deephaven.column import string_col

# create tables
Grade5 = new_table([
    string_col("Name", ["Mark", "Austin", "Jane", "Alex", "May"]),
    string_col("Grade", ["A", "A", "C", "B", "A"]),
])

Grade6 = new_table([
    string_col("Name", ["Sandra", "Andy", "Kathy", "June", "October"]),
    string_col("Grade", ["B", "C", "D", "A", "A"]),
])

Grade7 = new_table([
    string_col("Name", ["Lando", "Han", "Luke", "Ben", "Caleb"]),
    string_col("Grade", ["C", "B", "A", "C", "B"]),
])

# create a MultiJoinTable object and join the three tables
multi_table = multi_join(input=[Grade5, Grade6, Grade7], on=["Name", "Grade"])

# access the MultiJoinTable's internal table
result = multi_table.table()
```

## Using MultiJoinInput objects

Using `MultiJoinInput` objects as inputs for `multi_join` requires more code but allows for more flexibility.

<!--TODO: expand this section once updates are made in Core. More functionality is coming to multi_join soon, likely in v29.-->

```python syntax
multijoin_input = [
  MultiJoinInput(table=t1, on="key"), # all columns added
  MultiJoinInput(table=t2, on="key", joins=["col1", "col2"]), # specific column added
]

multi_table = multi_join(input=multijoin_input)
```

The following example demonstrates [`multi_join`](../reference/table-operations/join/multi-join.md) using [`MultiJoinInput`](../reference/table-operations/join/multi-join.md#multijoininput) objects as inputs.

- First, we create three tables.
- Then, we create a [`MultiJoinInput`](../reference/table-operations/join/multi-join.md#multijoininput) array, which is used as an input for the `multi_join` method instead of a String array of keys and a list of tables.
- Finally, we retrieve the underlying table.

```python test-set=1 order=result,t1,t2,t3
# import multijoin classes
from deephaven.table import MultiJoinInput, MultiJoinTable, multi_join
from deephaven import new_table
from deephaven.column import int_col

# create tables
t1 = new_table([int_col("C1", [1, 2]), int_col("C2", [1, 1]), int_col("S1", [10, 11])])

t2 = new_table([int_col("C1", [3123, 62364]), int_col("C3", [56, 99]), int_col("S2", [10, 11])])

t3 = new_table([int_col("C1", [44, 3]), int_col("C4", [182374, 1231]), int_col("S3", [44, 2313])])

# create a MultiJoinInput array
mji_arr = [
    MultiJoinInput(table=t1, on="Key=C1"),
    MultiJoinInput(table=t2, on="Key=C1"),
    MultiJoinInput(table=t3, on="Key=C1"),
]

# create a MultiJoinTable object
mj_table = multi_join(input=mji_arr)

# retrieve the underlying table
result = mj_table.table()
```

In this example, we repeat the previous example but specify which columns we want to include in the join.

```python test-set=1 order=result
# import multijoin classes
from deephaven.table import MultiJoinInput, MultiJoinTable, multi_join

# create a MultiJoinInput array
mji_arr = [
    MultiJoinInput(table=t1, on="Key=C1", joins="C2"),
    MultiJoinInput(table=t2, on="Key=C1", joins="S2"),
    MultiJoinInput(table=t3, on="Key=C1", joins="C4"),
]

# create a MultiJoinTable object
mj_table = multi_join(input=mji_arr)

# retrieve the underlying table
result = mj_table.table()
```

Now only the columns specified appear in the output table.

## Related documentation

- [`int_col`](../reference/table-operations/create/intCol.md)
- [`multi_join`](../reference/table-operations/join/multi-join.md)
- [`new_table`](../reference/table-operations/create/newTable.md)
- [`string_col`](../reference/table-operations/create/stringCol.md)
