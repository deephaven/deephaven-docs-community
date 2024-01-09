---
id: readTable
title: read
---

The `read` method will read a single Parquet file, metadata file, or directory with a recognized layout into an in-memory table.

## Syntax

```python syntax
read(
    path: str,
    col_instructions: str = None,
    is_legacy_parquet: bool = False,
    is_refreshing: bool = False
) -> Table
```

## Parameters

<ParamTable>
<Param name="path" type="str">

The file to load into a table. The file should exist and end with the `.parquet` extension.

</Param>
<Param name="col_instructions" type="list[ColumnInstruction]" optional>

One or more optional [`ColumnInstruction`](./ColumnInstruction.md) objects that provide instructions for how to read particular columns in the file.

</Param>
<Param name="is_legacy_parquet" type="bool" optional>

Whether or not the Parquet data is legacy.

</Param>
<Param name="is_refreshing" type="bool" optional>

Whether or not the Parquet data represents a refreshing source.

</Param>
</ParamTable>

## Returns

A new in-memory table from a Parquet file, metadata file, or directory with a recognized layout.

## Examples

:::note

All examples in this document use data mounted in `/data` in Deephaven. For more information on the relation between this location in Deephaven and on your local file system, see [Docker data volumes](../../../conceptual/docker-data-volumes.md).

:::

### Single Parquet file

:::note

For the following examples, the example data found in [Deephaven's example repository](https://github.com/deephaven/examples) will be used. Follow the instructions in [`Launch Deephaven from pre-built images`](../../../tutorials/docker-install.md) to download and manage the example data.

:::

In this example, `read` is used to load the file `/data/examples/Taxi/parquet/taxi.parquet` into a Deephaven table.

```python
from deephaven.parquet import read

source = read("/data/examples/Taxi/parquet/taxi.parquet")
```

### Compression codec

In this example, `read` is used to load the file `/data/output_GZIP.parquet`, with `GZIP` compression, into a Deephaven table.

:::caution

This file needs to exist for this example to work. To generate this file, see [`write`](./writeTable.md).

:::

```python
from deephaven.parquet import read, write
from deephaven import new_table
from deephaven.column import string_col, int_col

source = new_table([
    string_col("X", ["A", "B",  "B", "C", "B", "A", "B", "B", "C"]),
    int_col("Y", [2, 4, 2, 1, 2, 3, 4, 2, 3]),
    int_col("Z", [55, 76, 20, 4, 230, 50, 73, 137, 214]),
])

write(source, "/data/output_GZIP.parquet", compression_codec_name="GZIP")

source = read("/data/output_GZIP.parquet")
```

### Partitioned datasets

`_metadata` and/or `_common_metadata` files are occasionally present in partitioned datasets. These files can be used to load Parquet data sets more quickly. These files are specific to only certain frameworks and are not required to read the data into a Deephaven table.

- `_common_metadata`: File containing schema information needed to load the whole dataset faster.
- `_metadata`: File containing (1) complete relative pathnames to individual data files, and (2) column statistics, such as min, max, etc., for the individual data files.

:::warning

For a directory of Parquet files, all sub-directories are also searched. Only files with a `.parquet` extension or `_common_metadata` and `_metadata` files should be located in these directories. All files ending with `.parquet` need the same schema.

:::

:::note

The following examples use data in [Deephaven's example repository](https://github.com/deephaven/examples). Follow the instructions in [`Launch Deephaven from pre-built images`](../../../tutorials/docker-install.md) to download and manage the example data.

:::

In this example, `read` is used to load the directory `/data/examples/Pems/parquet/pems` into a Deephaven table.

```python order=null
from deephaven.parquet import read

source = read("/data/examples/Pems/parquet/pems")
```

![img](../../../assets/reference/data-import-export/readTable3.png)

### Refreshing tables

The following example set demonstrates how to read refreshing Parquet files into Deephaven.

First, we create a Parquet table with [`write`](writeTable.md).

```python test-set=1 order=null
from deephaven import new_table
from deephaven.column import int_col, double_col, string_col
from deephaven import parquet
from deephaven.parquet import read, write
import os, shutil

# Create new tables
grades1 = new_table([
    string_col("Name", ["Ashton", "Jeffrey", "Samantha", "Zachary"]),
    int_col("Test1", [92, 78, 87, 74]),
    int_col("Test2", [94, 88, 81, 70]),
    int_col("Average", [93, 83, 84, 72]),
    double_col("GPA", [3.9, 2.9, 3.0, 1.8])
])
grades2 = new_table([
    string_col("Name", ["Josh", "Martin", "Mariah", "Rick"]),
    int_col("Test1", [67, 92, 87, 54]),
    int_col("Test2", [97, 99, 92, 63]),
    int_col("Average", [82, 96, 93, 59]),
    double_col("GPA", [4.0, 3.2, 3.6, 2.7])
])

# Write both tables to parquet files
write(grades1, "/data/grades/part1.parquet")
write(grades2, "/data/grades/part2.parquet")

## Read the tables. is_refreshing must be True, or the result will be static
refreshing_result = read(path="/data/grades/", is_refreshing=True)

static_result = read(path="/data/grades/", is_refreshing=False)
```

![img](../../../assets/reference/data-import-export/parquet-isrefreshing-1.png)

Next, we list our current partitions, and then create a new Deephaven table by using the `read` method.

```python test-set=1 order=null
# List the files in /tmp/grades
print(sorted(os.listdir("/data/grades")))

# Create table from parquet files
grades = parquet.read("/data/grades")
```

![img](../../../assets/reference/data-import-export/parquet-isrefreshing-2.png)

Finally, we create a third partition that is a copy of the first.

```python test-set=1 order=refreshing_result,static_result
# Make a 3rd partition by copying the first
shutil.copyfile("/data/grades/part1.parquet", "/data/grades/part3.parquet")
```

![img](../../../assets/reference/data-import-export/parquet-isrefreshing-3.png)

## Related documentation

- [Import Parquet into Deephaven video](https://youtu.be/k4gI6hSZ2Jc)
- [Write and read single Parquet files](../../../how-to-guides/data-import-export/parquet-single.md)
- [Write and read multiple Parquet files](../../../how-to-guides/data-import-export/parquet-directory.md)
- [`write_table`](./writeTable.md)
- [Docker data volumes](../../../conceptual/docker-data-volumes.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/parquet/table/ParquetTools.html#readTable(java.io.File)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.parquet.html?highlight=read#deephaven.parquet.read)
