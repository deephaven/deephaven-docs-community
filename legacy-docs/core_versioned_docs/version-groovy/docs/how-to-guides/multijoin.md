---
id: multijoin
title: How to use the MultiJoin feature
sidebar_label: Use MultiJoin
---

This guide will show you how to use Deephaven's [Multi-Join](../reference/table-operations/join/multijoin.md) feature.

Unlike most table operations, Multi-Join is not a constituent method of the `Table` class; instead, it is an external static function that takes tables as arguments. Also, unlike most table operations, Multi-Join does not return a table -- it returns a `MultiJoinTable` object, which in turn uses the `table()` method to return the underlying table.

## Syntax options

There are two ways to create a `MultiJoinTable` object.

### Simple syntax

The simple option can be accomplished with one line of code but requires that all of the `MultiJoinTable`'s constituent tables have identical key column names and that _all_ of the tables' output rows are desired.

```groovy syntax
MultiJoinTable mjTable = MultiJoinFactory.of(keys, tables...)
```

- `keys` is a single string of comma-separated key column names; for example, `"key1, key2"`.
- `tables` is any number of tables to merge; for example, `table1, table2, table3`.

The following example demonstrates the simple version of the syntax.

- First, we create three tables, each containing a list of students' names and associated grades.
- Then, we create a `MultiJoinTable` object, which joins the three tables on the `Name` and `Grade` columns.
- - Finally, we call `table()` to access the `MultiJoinTable` object's underlying table.

```groovy order=result,Grade5,Grade6,Grade7
// import multijoin classes
import io.deephaven.engine.table.MultiJoinFactory
import io.deephaven.engine.table.MultiJoinTable

// create tables
Grade5 = newTable(
    stringCol("Name","Mark", "Austin", "Jane", "Alex", "May"),
    stringCol("Grade", "A", "A", "C", "B", "A"),
)

Grade6 = newTable(
    stringCol("Name","Sandra", "Andy", "Kathy", "June", "October"),
    stringCol("Grade", "B", "C", "D", "A", "A"),
)

Grade7 = newTable(
    stringCol("Name","Lando", "Han", "Luke", "Ben", "Caleb"),
    stringCol("Grade", "C", "B", "A", "C", "B"),
)

// create a MultiJoinTable object and join the three tables
MultiJoinTable mtTable = MultiJoinFactory.of("Name, Grade", Grade5, Grade6, Grade7)

// access the multijoin object's internal table
result = mtTable.table()
```

### Complex Syntax

The complex option requires more code but allows for more flexibility. You must first create `MultiJoinInput` objects, which are used as inputs for the `MultiJoinFactory.of` method instead of a list of keys and a list of tables.

```groovy syntax
// create a MultiJoinInput array
MultiJoinInput mjInputArr = new MultiJoinInput[] {
    MultiJoinInput.of(t1, "Key1=A,Key2=B", "C1=C,D1=D"),
    MultiJoinInput.of(y2, "Key1=A,Key2=B", "C2=C,D2=D")
}

// create a MultiJoinTable object
MultiJoinTable mjTable = MultiJoinFactory.of(mjInputArr);
```

The following example demonstrates the more complex version of the syntax.

- First, we create three tables.
- Then, we create a `MultiJoinInput` array, which is used as an input for the `MultiJoinFactory.of` method instead of a String array of keys and a list of tables.
- Finally, we retrieve the underlying table.

:::important
Note that if we call `MultiJoinInput.of` with only a table and a key, all of the table's constituent columns will be included in the join.
:::

```groovy order=result,t1,t2,t3
// import multijoin classes
import io.deephaven.engine.table.MultiJoinFactory
import io.deephaven.engine.table.MultiJoinTable
import io.deephaven.engine.table.MultiJoinInput

// create tables
t1 = newTable(intCol("C1", 1, 2), intCol("C2", 1, 1), intCol("S1", 10, 11))

t2 = newTable(intCol("C1", 3123, 62364), intCol("C3", 56, 99), intCol("S2", 10, 11))

t3 = newTable(intCol("C1", 44, 3), intCol("C4", 182374, 1231), intCol("S3", 44, 2313))

// create a MultiJoinInput array
mjArr = new MultiJoinInput[] {MultiJoinInput.of(t1, "Key=C1"), MultiJoinInput.of(t2, "Key=C1"), MultiJoinInput.of(t3, "Key=C1")}

// create a MultiJoinTable object
mjTable = MultiJoinFactory.of(mjArr)

// retrieve the underlying table
result = mjTable.table()
```

In this example, we repeat the previous example but specify which columns we want to include in the join.

```groovy order=result
// import multijoin classes
import io.deephaven.engine.table.MultiJoinFactory
import io.deephaven.engine.table.MultiJoinTable
import io.deephaven.engine.table.MultiJoinInput

// create tables
t1 = newTable(intCol("C1", 1, 2), intCol("C2", 1, 1), intCol("S1", 10, 11))

t2 = newTable(intCol("C1", 3123, 62364), intCol("C3", 56, 99), intCol("S2", 10, 11))

t3 = newTable(intCol("C1", 44, 3), intCol("C4", 182374, 1231), intCol("S3", 44, 2313))

// create a MultiJoinInput array
mjArr = new MultiJoinInput[] {MultiJoinInput.of(t1, "Key=C1", "C2"), MultiJoinInput.of(t2, "Key=C1", "S2"), MultiJoinInput.of(t3, "Key=C1", "C4")}

// create multijoin object and retrieve the underlying table
result = MultiJoinFactory.of(mjArr).table()
```

Now only the columns specified appear in the output table.

## Related documentation

- [Create a new table](./new-table.md)
- [`newTable`](../reference/table-operations/create/newTable.md)
- [`stringCol`](../reference/table-operations/create/stringCol.md)
- [`intCol`](../reference/table-operations/create/intCol.md)
