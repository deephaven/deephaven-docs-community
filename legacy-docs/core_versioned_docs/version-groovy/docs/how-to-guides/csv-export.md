---
id: csv-export
title: How to export data to CSV or other delimited files
sidebar_label: Export data to CSV files
---

This guide discusses how to export table data to CSV (or other delimited) files by using [`writeCsv`](../reference/data-import-export/CSV/writeCsv.md).

The basic syntax follows:

```groovy skip-test
import static io.deephaven.csv.CsvTools.writeCsv

writeCsv(table, "/data/outputFile.csv")
```

:::note

Deephaven writes files to locations relative to the base of its Docker container. See [Docker data volumes](../conceptual/docker-data-volumes.md) to learn more about the relation between locations in the container and the local file system.

:::

We'll create a table to export by using [`emptyTable`](../reference/table-operations/create/emptyTable.md) and [`update`](../reference/table-operations/select/update.md). The table contains 100 rows of trigonometric values.

```groovy test-set=1
source = emptyTable(100).update(
    "X = 0.1 * i",
    "SinX = sin(X)",
    "CosX = cos(X)",
    "TanX = tan(X)"
)
```

## Standard CSV files

The simplest way to use [`writeCsv`](../reference/data-import-export/CSV/writeCsv.md) is to supply two input parameters:

- The Deephaven source table.
- The path of the output CSV file.

```groovy test-set=1
import static io.deephaven.csv.CsvTools.writeCsv

writeCsv(source, "/data/TrigFunctions.csv")
```

![img](../assets/how-to/TrigFunctions_basic.png)

## Null values

Null values are common in tables. How are they handled when exporting data to a CSV? This depends on how you call [`writeCsv`](../reference/data-import-export/CSV/writeCsv.md).

First, let's create a table with null values. The example below uses a [function](../reference/query-language/formulas/user-defined-functions.md) to fill the `SinX` column with a large number of nulls.

```groovy test-set=2
sourceWithNulls = emptyTable(100).update(
    "X = 0.1 * i",
    "SinX = X % 0.2 < 0.01 ? NULL_DOUBLE : sin(X)",
    "CosX = cos(X)",
    "TanX = tan(X)"
)
```

The `SinX` column contains many null cells. The example below writes this table to a CSV file called `TrigFunctionsWithNulls.csv`.

```groovy test-set=2
import static io.deephaven.csv.CsvTools.writeCsv

writeCsv(sourceWithNulls, "/data/TrigFunctionsWithNulls.csv")
```

![img](../assets/how-to/TrigFunctions_basicWithNulls.png)

## Column selection

In the event you don't want to write every column in the table to a CSV file, you can specify which columns to write. This is done by providing a list of column names, as shown below.

```groovy test-set=2
import static io.deephaven.csv.CsvTools.writeCsv

writeCsv(sourceWithNulls, "/data/Cosine.csv", "X", "CosX")
```

![img](../assets/how-to/TrigFunctions_NullsCosineOnly.png)

## Related Documentation

- [Create an empty table](./empty-table.md)
- [How to import CSV files](./csv-import.md)
- [Docker data volumes](../conceptual/docker-data-volumes.md)
- [`writeCsv`](../reference/data-import-export/CSV/writeCsv.md)