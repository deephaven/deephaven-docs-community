---
id: input-tables
title: How to create and use input tables
sidebar_label: Create and use input tables
---

Input tables allow users to enter data into tables in two ways: programmatically and manually through the UI.

In the first case, data is added to a table in an operation similar to a [`merge`](/core/docs/reference/table-operations/merge/). In the second case, data is added to a table similar to a spreadsheet program such as [MS Excel](https://www.microsoft.com/en-us/microsoft-365/excel).

Input tables come in two flavors:

- [append-only](../conceptual/table-types.md#append)
  - An append-only input table puts any entered data at the bottom.
- [keyed](#create-a-keyed-input-table)
  - A keyed input table supports modification/deletion of contents, and allows random access to rows by key.

We'll show you how to create and use both types in this guide.

## Create an input table

First, you need to import the `input_table` method from the `deephaven` module.

```python
from deephaven import input_table
```

An input table can be constructed from a pre-existing table _or_ column definitions. In either case, one or more key columns can be specified, which turns the table from an append-only table to a keyed table.

### From a pre-existing table

An input table can be created from a table that already exists in memory, such as one created with [`empty_table`](/core/docs/reference/table-operations/create/emptyTable/).

```python test-set-1 order=source,result
from deephaven import empty_table, input_table

source = empty_table(10).update(["X = i"])

result = input_table(init_table=source)
```

### From scratch

An input table can also be created using column definitions, similar to a [DynamicTableWriter](/core/docs/reference/table-operations/create/DynamicTableWriter/). Column definitions must be defined in a [dictionary](https://docs.python.org/3/tutorial/datastructures.html#dictionaries).

```python test-set=1 order=null
from deephaven import input_table
from deephaven import dtypes as dht

my_col_defs = {
    "Integers": dht.int32,
    "Doubles": dht.double,
    "Strings": dht.string
}

result = input_table(col_defs=my_col_defs)
```

### Create a keyed input table

In the previous two examples, no key column was specified when creating the input tables. If one or more key columns is specified, the table becomes a keyed table.

Let's first specify one key column.

```python test-set=1 order=null
from deephaven import input_table
from deephaven import dtypes as dht

my_col_defs = {
    "Integers": dht.int32,
    "Doubles": dht.double,
    "Strings": dht.string
}

result = input_table(col_defs=my_col_defs, key_cols="Integers")
```

In the case of multiple key columns, specify them in a list.

```python test-set=1 order=null
result = input_table(col_defs=my_col_defs, key_cols=["Integers", "Doubles"])
```

When creating a keyed input table from a pre-existing table, the key column(s) must satisfy uniqueness criteria. Each row or combination of rows in the initial table must not have repeating values. Take, for instance, the following table:

```python test-set=2 order=source
from deephaven import empty_table, input_table

source = empty_table(10).update(["Sym = (i % 2 == 0) ? `A` : `B`", "Marker = (i % 3 == 2) ? `J` : `K`", "X = i", "Y = sin(0.1 * X)"])
```

A keyed input table _can_ be created from the `X` and `Y` columns, since they have no repeating values, and are thus unique:

```python test-set=2 order=input_source
input_source = input_table(init_table=source, key_cols=["X", "Y"])
```

A keyed input table _cannot_ be created from the `Sym` _or_ `Marker` columns, since they have repeating values and combinations, and are thus _not_ unique:

```python test-set=2 should-fail
input_source = input_table(init_table=source, key_cols=["Sym", "Marker"])
```

## Add data to the table

### Programmatically

Programmatically adding data to an input table works similarly to a [`merge`](/core/docs/reference/table-operations/merge/), where tables are stacked vertically. New data is added to the end of the input table.

To programmatically add data to an input table, the table schemas (column definitions) must match. These column definitions comprise the names and data types of every column in the table.

A table is added to an input table via the class's `add` method. For example:

```python test-set=1 order=my_table,my_input_table
from deephaven import empty_table, input_table
from deephaven import dtypes as dht

column_defs = {
    "Integers": dht.int32,
    "Doubles": dht.double,
    "Strings": dht.string
}

my_table = empty_table(5).update(["Integers = i", "Doubles = (double)i", "Strings = `a`"])

my_input_table = input_table(col_defs=column_defs)
my_input_table.add(my_table)
```

### Manually

To manually add data to an input table, simply click on the cell in which you wish to enter data. Type the value into the cell, hit enter, and it will appear.

![img](../assets/how-to/input-tables/input-table-manual.gif)

Note that with a keyed input table, you can edit existing rows; however, adding a new row will erase previous rows with the same key.

![img](../assets/how-to/python-keyed-input-table.gif)

:::important

Added rows aren't final until you hit the **Commit** button. If you edit an existing row in a keyed input table, the result is immediate.

:::

![img](../assets/how-to/input-tables/input-table-commit.gif)

Here are some things to consider when manually entering data into an input table:

- Manually entered data in a table will not be final until the **Commit** button at the bottom right of the console is clicked.
- Data added manually to a table must be of the correct type for its column. For instance, attempting to add a string value to an int column will fail.
- Entering data in between populated cells and hitting **Enter** will add the data to the bottom of the column.

## Related documentation

- [`input_table`](../reference/table-operations/create/input-table.md)
- [`empty_table`](../reference/table-operations/create/emptyTable.md)
- [Deephaven Python dtypes](../reference/python/deephaven-python-types.md)
- [Table types](../conceptual/table-types.md)
