---
id: readTable
title: readTable
---

The `readTable` method will read a single Parquet file, metadata file, or directory with a recognized layout into an in-memory table.

## Syntax

```
readTable(sourceFilePath)
readTable(sourceFilePath, readInstructions)
readTable(sourceFile)
readTable(sourceFile, readInstructions)
```

## Parameters

<ParamTable>
<Param name="sourceFilePath" type="String">

The file to load into a table. The file should exist and end with the `.parquet` extension.

</Param>
<Param name="sourceFile" type="file">

The file or directory to examine.

</Param>
<Param name="readInstructions" type="ParquetInstructions">

Optional instructions for customizations while reading. Valid values are:

- `ParquetTools.LZ4_RAW`: Compression codec loosely based on the [LZ4 compression algorithm](https://github.com/lz4/lz4), but with an additional undocumented framing scheme. The framing is part of the original Hadoop compression library and was historically copied first in parquet-mr, then emulated with mixed results by parquet-cpp.
- `ParquetTools.LZO`: Compression codec based on or interoperable with the [LZO compression library](http://www.oberhumer.com/opensource/lzo/).
- `ParquetTools.GZIP`: Compression codec based on the GZIP format (not the closely-related "zlib" or "deflate" formats) defined by [RFC 1952](https://tools.ietf.org/html/rfc1952).
- `ParquetTools.ZSTD`: Compression codec with the highest compression ratio based on the Zstandard format defined by [RFC 8478](https://tools.ietf.org/html/rfc8478).
- `ParquetTools.LEGACY`: Load any binary fields as strings. Helpful to load files written in older versions of Parquet that lacked a distinction between binary and string.

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

In this example, `readTable` is used to load the file `/data/examples/Taxi/parquet/taxi.parquet` into a Deephaven table.

```groovy
import io.deephaven.parquet.table.ParquetTools

source = ParquetTools.readTable("/data/examples/Taxi/parquet/taxi.parquet")
```

### Compression codec

In this example, `readTable` is used to load the file `/data/output_GZIP.parquet`, with `GZIP` compression, into a Deephaven table.

:::caution

This file needs to exist for this example to work. To generate this file, see [`writeTable`](./writeTable.md).

:::

```groovy
import io.deephaven.parquet.table.ParquetTools

source = newTable(
    stringCol("X", "A", "B",  "B", "C", "B", "A", "B", "B", "C"),
    intCol("Y",2, 4, 2, 1, 2, 3, 4, 2, 3),
    intCol("Z", 55, 76, 20, 4, 230, 50, 73, 137, 214),
)

ParquetTools.writeTable(source, new File("/data/output_GZIP.parquet"), ParquetTools.GZIP)

source = ParquetTools.readTable("/data/output_GZIP.parquet", ParquetTools.GZIP)
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

In this example, `readTable` is used to load the directory `/data/examples/Pems/parquet/pems` into a Deephaven table.

```groovy skip-test
import static io.deephaven.parquet.table.ParquetTools.readTable

source = readTable("/data/examples/Pems/parquet/pems")
```

![img](../../../assets/reference/data-import-export/readTable3.png)

## Related documentation

- [Import Parquet into Deephaven video](https://youtu.be/k4gI6hSZ2Jc)
- [Write and read single Parquet files](../../../how-to-guides/parquet-single.md)
- [Write and read partitioned Parquet files](../../../how-to-guides/parquet-directory.md)
- [Docker data volumes](../../../conceptual/docker-data-volumes.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/parquet/table/ParquetTools.html#readTable(java.io.File)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.ParquetTools.html?highlight=readtable#deephaven.ParquetTools.readTable)
