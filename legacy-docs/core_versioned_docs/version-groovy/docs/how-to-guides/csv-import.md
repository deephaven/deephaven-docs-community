---
id: csv-import
title: How to import CSV or other delimited files
sidebar_label: Import CSV files
---

This guide will show you how to import data from CSV (and other delimited) files into Deephaven tables by using the [`readCsv`](../reference/data-import-export/CSV/readCsv.md) method. The two most common ways to load a CSV file are using the file path or the file URL. The header of the CSV file determines the column names.

The basic syntax follows:

```groovy skip-test
import static io.deephaven.csv.CsvTools.readCsv

readCsv(path)
readCsv(url)
readCsv(path, csvSpecs)
readCsv(url, csvSpecs)
```

<!-- TODO: https://github.com/deephaven/deephaven.io/issues/489 Update CSV documentation when CsvHelpers goes live -->

See our [`readCsv`](../reference/data-import-export/CSV/readCsv.md) reference article for full details on every parameter. In this guide, we cover some standard examples and will walk you through each query.

You can follow along with our examples using CSV files taken from [Deephaven's examples repository](https://github.com/deephaven/examples). We encourage you to use your own files by replacing the file paths in our queries.

:::note

If you're using our files, follow the directions in the [README](https://github.com/deephaven/examples/blob/main/README.md) to mount the content from [Deephaven's examples repository](https://github.com/deephaven/examples) onto `/data` in the Deephaven Docker container.

:::

## Standard CSV files

The Deephaven Query Language makes importing and manipulating data easy and efficient. In this example, we will import a CSV file into a new, in-memory Deephaven table.

This example imports R.A. Fisher's classic iris flower dataset commonly used in machine learning applications.

```groovy
import static io.deephaven.csv.CsvTools.readCsv

iris = readCsv("https://media.githubusercontent.com/media/deephaven/examples/main/Iris/csv/iris.csv")
```

:::note

If using the file path and the CSV is in the root `data/examples` directory, change the command to read:

```groovy skip-test
import static io.deephaven.csv.CsvTools.readCsv

iris = readCsv("/data/examples/Iris/csv/iris.csv")
```

:::

### `/data` mount point

By default, all Deephaven deployments mount `./data` in the local deployment directory to the `/data` volume in the running Deephaven container. This means that if the Deephaven console is used to write data to `/data/abc/file.csv`, that file will be visible at `./data/abc/file.csv` on the local file system of your computer. Similarly, if the local file `abc.parquet` is copied to `./data/abc.parquet`, then the file can be accessed at `/data/abc.parquet` on the Deephaven server.

If the `./data` directory does not exist when Deephaven is launched, it will be created.

See [Docker data volumes](../conceptual/docker-data-volumes.md) to learn more about the relation between locations in the container and the local file system.

## Headerless CSV files

CSV files don't always have headers. The example below uses the headerless [DeNiro CSV](https://github.com/deephaven/examples/tree/main/DeNiro/csv/deniro_headerless.csv) and includes an additional `headless` argument.

```groovy
import static io.deephaven.csv.CsvTools.readCsv
import io.deephaven.csv.CsvSpecs

specs = CsvSpecs.builder().hasHeaderRow(false).build()
deniro = readCsv("https://media.githubusercontent.com/media/deephaven/examples/main/DeNiro/csv/deniro_headerless.csv", specs)
```

Because no column names are provided, the table will produce default column names (`Column1`, `Column2`, etc.). You can explicitly set the column names, as shown below.

```groovy
import static io.deephaven.csv.CsvTools.readCsv
import io.deephaven.csv.CsvSpecs
headers = List.of("Year", "Score", "Title")
specs = CsvSpecs.builder().hasHeaderRow(false).headers(headers).build()
deniroHeader = readCsv("https://media.githubusercontent.com/media/deephaven/examples/main/DeNiro/csv/deniro_headerless.csv", specs)
```

## Other formats

### Tab-delimited data

Deephaven allows you to specify other delimiters as a second argument if your file is not comma-delimited. In the example below, we import a tab-delimited file, which requires a second argument.

```groovy order=deniroTSV
import static io.deephaven.csv.CsvTools.readCsv
import io.deephaven.csv.CsvSpecs

specs = CsvSpecs.tsv()

deniroTSV = readCsv("https://raw.githubusercontent.com/deephaven/examples/main/DeNiro/csv/deniro.tsv", specs)
```

### Pipe-delimited data

Any character can be used as a delimiter. The pipe character (`|`) is common. In the example below, we supply the delimiter `|` as the second argument.

```groovy order=deniroPSV
import static io.deephaven.csv.CsvTools.readCsv
import io.deephaven.csv.CsvSpecs

specs = CsvSpecs.builder().delimiter('|' as char).build()

deniroPSV = readCsv("https://raw.githubusercontent.com/deephaven/examples/main/DeNiro/csv/deniro.psv", specs)
```

### Trim

By default, quoted values that have leading and trailing white space include the white space when reading the CSV file. For example, if `" Taxi Driver "` is in the CSV file, it will be read as `Taxi Driver`.

By setting `trim` to `true` when reading the CSV file, these leading and trailing white space will be removed. So `" Taxi Driver "` will be read as `Taxi Driver`.

## Related documentation

- [How to export CSV files](./csv-export.md)
- [How to import data with date-times](./import-data-with-date-times.md)
- [`readCsv`](../reference/data-import-export/CSV/readCsv.md)
