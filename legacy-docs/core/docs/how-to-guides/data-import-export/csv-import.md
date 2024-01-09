---
id: csv-import
title: How to import CSV or other delimited files
sidebar_label: Import CSV files
---

This guide will show you how to import data from CSV (and other delimited) files into Deephaven tables by using the [`read_csv`](../../reference/data-import-export/CSV/readCsv.md) method. If you prefer a drag and drop approach, see [uploading table data using the UI](../upload-table.md). The two most common ways to load a CSV file are using the file path or the file URL. The header of the CSV file determines the column names.

The basic syntax follows:

```
from deephaven import read_csv

read_csv(path: str,
         header: Dict[str, DataType]=None,
         headless: bool=False,
         header_row: int = 0
         delimiter: str=",",
         quote: str="\"",
         ignore_surrounding_spaces: bool = True,
         trim: bool = False,
         charset: str = "utf-8")
```

See our [`read_csv`](../../reference/data-import-export/CSV/readCsv.md) reference article for full details on every parameter. In this guide, we cover some standard examples and will walk you through each query.

You can follow along with our examples using CSV files taken from [Deephaven's examples repository](https://github.com/deephaven/examples). We encourage you to use your own files by replacing the file paths in our queries.

:::note

If you're using our files, follow the directions in the [README](https://github.com/deephaven/examples/blob/main/README.md) to mount the content from [Deephaven's examples repository](https://github.com/deephaven/examples) onto `/data` in the Deephaven Docker container.

:::

## Standard CSV files

The Deephaven Query Language makes importing and manipulating data easy and efficient. In this example, we will import a CSV file into a new, in-memory Deephaven table.

This example imports R.A. Fisher's classic iris flower dataset commonly used in machine learning applications.

```python
from deephaven import read_csv

iris = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/Iris/csv/iris.csv")
```

If using the file path and the CSV is in the root `data/examples` directory, change the command to read:

```python order=iris
from deephaven import read_csv

iris = read_csv("/data/examples/Iris/csv/iris.csv")
```

### `/data` mount point

By default, all Deephaven deployments mount `./data` in the local deployment directory to the `/data` volume in the running Deephaven container. This means that if the Deephaven console is used to write data to `/data/abc/file.csv`, that file will be visible at `./data/abc/file.csv` on the local file system of your computer. Similarly, if the local file `abc.parquet` is copied to `./data/abc.parquet`, then the file can be accessed at `/data/abc.parquet` on the Deephaven server.

If the `./data` directory does not exist when Deephaven is launched, it will be created.

See [Docker data volumes](../../conceptual/docker-data-volumes.md) to learn more about the relation between locations in the container and the local file system.

## Headerless CSV files

CSV files don't always have headers. The example below uses the headerless [DeNiro CSV](https://github.com/deephaven/examples/tree/main/DeNiro/csv/deniro_headerless.csv) and includes an additional `headless` argument.

```python order=deniro
from deephaven import read_csv

deniro = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/DeNiro/csv/deniro_headerless.csv", headless=True)
```

Because no column names are provided, the table will produce default column names (`Column1`, `Column2`, etc.). You can explicitly set the column names, as shown below.

```python order=deniro
from deephaven import read_csv
import deephaven.dtypes as dht

header = {"Year": dht.int_, "Score": dht.int_, "Title": dht.string}
deniro = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/DeNiro/csv/deniro_headerless.csv", header=header, headless=True)
```

## Other formats

### Tab-delimited data

Deephaven allows you to specify other delimiters as a second argument if your file is not comma-delimited. In the example below, we import a tab-delimited file, which requires a second argument.

```python order=deniro_tsv
from deephaven import read_csv
deniro_tsv = read_csv("https://raw.githubusercontent.com/deephaven/examples/main/DeNiro/csv/deniro.tsv", delimiter="\t")
```

### Pipe-delimited data

Any character can be used as a delimiter. The pipe character (`|`) is common. In the example below, we supply the delimiter `|` as the second argument.

```python order=deniro_psv
from deephaven import read_csv

deniro_psv = read_csv("https://raw.githubusercontent.com/deephaven/examples/main/DeNiro/csv/deniro.psv", delimiter="|")
```

### Trim

By default, quoted values that have leading and trailing white space include the white space when reading the CSV file. For example, if `" Taxi Driver "` is in the CSV file, it will be read as `Taxi Driver`.

By setting `trim` to `true` when reading the CSV file, these leading and trailing white space will be removed. So `" Taxi Driver "` will be read as `Taxi Driver`.

## Related documentation

- [How to export CSV files](./csv-export.md)
- [How to import data with date-times](./import-data-with-date-times.md)
- [`read_csv`](../../reference/data-import-export/CSV/readCsv.md)
- [Import data from the UI](../upload-table.md)
