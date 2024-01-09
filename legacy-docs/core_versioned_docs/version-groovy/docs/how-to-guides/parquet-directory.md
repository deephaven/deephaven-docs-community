---
id: parquet-directory
title: How to write and read multiple Parquet files
sidebar_label: Write and read multiple Parquet files
---

This guide will show you how to read a directory of Parquet files as well as partitioned Parquet files.

## Read and write a Parquet directory

### Directory structure

This example will show you how to read a directory of similar Parquet files into a Deephaven table, supplying just the directory path. Parquet files must be flat (non-partitioned).

It is common to use Parquet for large-scale data. In Deephaven, when we load a Parquet file into a table we do not load the whole file into RAM. This means that files much larger than the available RAM can be loaded as tables. However, you might already have a directory of Parquet files that you wish to read. These Parquet files may also be partitioned into directories and sub-directories.

To read an entire directory of Parquet files (and potentially sub-directories), every Parquet file in the directory needs to have the same schema.

### Create files

To see this in practice, you first need multiple Parquet files in your directory. Start by creating the `grades1` and `grades2` tables, containing student names, test scores, and GPAs.

```groovy test-set=1 order=grades1,grades2
grades1 = newTable(
    stringCol("Name", "Ashley", "Jeff", "Rita", "Zach"),
    intCol("Test1", 92, 78, 87, 74),
    intCol("Test2", 94, 88, 81, 70),
    intCol("Average", 93, 83, 84, 72),
    doubleCol("GPA", 3.9, 2.9, 3.0, 1.8)
)

grades2 = newTable(
    stringCol("Name", "Jose", "Martha", "Mary", "Richard"),
    intCol("Test1", 67, 92, 87, 54),
    intCol("Test2", 97, 99, 92, 63),
    intCol("Average", 82, 96, 93, 59),
    doubleCol("GPA", 4.0, 3.2, 3.6, 2.7)
)
```

Now, use the [`writeTable`](../reference/data-import-export/Parquet/writeTable.md) method to export each table as a Parquet file. [`writeTable`](../reference/data-import-export/Parquet/writeTable.md) takes the following arguments:

1. The table to be written. In this case, `grades1` and `grades2`.
2. The Parquet file to write to. In this case, `/data/grades/part1.parquet` and `/data/grades/part2.parquet`.
3. (Optional) `parquetInstructions` for writing files using compression codecs. Accepted values are:
   - `SNAPPY`: Aims for high speed and a reasonable amount of compression. Based on [Google](https://github.com/google/snappy/blob/main/format_description.txt)'s Snappy compression format. If `ParquetInstructions` is not specified, defaults to `SNAPPY`.
   - `UNCOMPRESSED`: The output will not be compressed.
   - `LZ4_RAW`: A codec based on the [LZ4 block format](https://github.com/lz4/lz4/blob/dev/doc/lz4_Block_format.md). Should always be used instead of `LZ4`.
   - `LZ4`: **Deprecated** Compression codec loosely based on the [LZ4 compression algorithm](https://github.com/lz4/lz4), but with an additional undocumented framing scheme. The framing is part of the original Hadoop compression library and was historically copied first in parquet-mr, then emulated with mixed results by parquet-cpp. Note that `LZ4` is deprecated; use `LZ4_RAW` instead.
   - `LZO`: Compression codec based on or interoperable with the [LZO compression library](http://www.oberhumer.com/opensource/lzo/).
   - `GZIP`: Compression codec based on the GZIP format (not the closely-related "zlib" or "deflate" formats) defined by [RFC 1952](https://tools.ietf.org/html/rfc1952).
   - `ZSTD`: Compression codec with the highest compression ratio based on the Zstandard format defined by [RFC 8478](https://tools.ietf.org/html/rfc8478).

```groovy test-set=1
import static io.deephaven.parquet.table.ParquetTools.writeTable

writeTable(grades1, "/data/grades/part1.parquet")
writeTable(grades2, "/data/grades/part2.parquet")
```

:::note

Deephaven writes files to locations relative to the base of its Docker container. See [Docker data volumes](../conceptual/docker-data-volumes.md) to learn more about the relation between locations in the container and the local file system.

:::

### Read directory

Now, use the [`readTable`](../reference/data-import-export/Parquet/readTable.md) method to import the entire Parquet directory as one table. [`readTable`](../reference/data-import-export/Parquet/readTable.md) takes the following arguments:

1. The Parquet directory to read. In this case, `/data/grades/`.
2. (Optional )`parquetInstructions` for codecs when the file type cannot be successfully inferred. Accepted values are:
   - `SNAPPY`: Aims for high speed and a reasonable amount of compression. Based on [Google](https://github.com/google/snappy/blob/main/format_description.txt)'s Snappy compression format. If `ParquetInstructions` is not specified, it defaults to `SNAPPY`.
   - `UNCOMPRESSED`: The output will not be compressed.
   - `LZ4_RAW`: A codec based on the [LZ4 block format](https://github.com/lz4/lz4/blob/dev/doc/lz4_Block_format.md). Should always be used instead of `LZ4`.
   - `LZ4`: **Deprecated** Compression codec loosely based on the [LZ4 compression algorithm](https://github.com/lz4/lz4), but with an additional undocumented framing scheme. The framing is part of the original Hadoop compression library and was historically copied first in parquet-mr, then emulated with mixed results by parquet-cpp. Note that `LZ4` is deprecated; use `LZ4_RAW` instead.
   - `LZO`: Compression codec based on or interoperable with the [LZO compression library](http://www.oberhumer.com/opensource/lzo/).
   - `GZIP`: Compression codec based on the GZIP format (not the closely-related "zlib" or "deflate" formats) defined by [RFC 1952](https://tools.ietf.org/html/rfc1952).
   - `ZSTD`: Compression codec with the highest compression ratio based on the Zstandard format defined by [RFC 8478](https://tools.ietf.org/html/rfc8478).
   - `LEGACY`: Load any binary fields as strings. Helpful to load files written in older versions of Parquet that lacked a distinction between binary and string.

```groovy test-set=1
import static io.deephaven.parquet.table.ParquetTools.readTable

result = readTable("/data/grades")
```

## Write and read a partitioned Parquet file

### Write a partitioned Parquet file

In this example, we write a table to a partitioned Parquet file. Partitioning creates multiple, smaller files based on the values of one or more columns.

```groovy order=pricesJan,pricesFeb
import static io.deephaven.parquet.table.ParquetTools.writeTable

pricesJan = newTable(
    stringCol("TICKER", "MSFT", "GOOGL", "META"),
    doubleCol("Price", 328, 130, 310)
)

pricesFeb = newTable(
    stringCol("TICKER", "MSFT", "GOOGL", "META"),
    doubleCol("Price", 345, 125, 320)
)

// Write each table to a subdirectory inside "Prices" under corresponding month
writeTable(pricesJan, "Prices/Month=Jan/data.parquet")
writeTable(pricesFeb, "Prices/Month=Feb/data.parquet")
```

The structure of the "Prices" directory will look like:

```
Prices
├── Month=Feb
│   └── data.parquet
└── Month=Jan
    └── data.parquet
```

### Read a partitioned Parquet file

Now, use the [`readTable`](../reference/data-import-export/Parquet/readTable.md) method to import the entire partitioned Parquet file.

```groovy order=null
import static io.deephaven.parquet.table.ParquetTools.readTable

combined = readTable("Prices")
```

Now we get a table with the additional partitioning column "Month".

![img](../assets/how-to/parquet/parquet_groovy2.png)

## Related documentation

- [Import Parquet into Deephaven video](https://youtu.be/k4gI6hSZ2Jc)
- [How to write and read single Parquet files](./parquet-single.md)
- [Supported Parquet formats](../conceptual/parquet-formats.md)
- [`readTable`](../reference/data-import-export/Parquet/readTable.md)
- [`writeTable`](../reference/data-import-export/Parquet/writeTable.md)
