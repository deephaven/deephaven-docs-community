---
id: parquet-single
title: How to write and read single Parquet files
sidebar_label: Write and read single standard Parquet files
---

This guide will show you how to write and read data to/from a Deephaven table and from/to a single Parquet file using the [`write`](../../reference/data-import-export/Parquet/writeTable.md) and [`read`](../../reference/data-import-export/Parquet/readTable.md) methods.

The basic syntax follows:

- `write(source, "/data/output.parquet")`
- `write(source, "/data/output_GZIP.parquet", compression_codec_name="GZIP")`
- `read("/data/output.parquet")`
- `read("/data/output_GZIP.parquet")`

## Write a table to a Parquet file

Let's create a table to write that contains student names, test scores, and GPAs.

```python test-set=1
from deephaven import new_table
from deephaven.column import int_col, double_col, string_col

grades = new_table([
    string_col("Name", ["Ashley", "Jeff", "Rita", "Zach"]),
    int_col("Test1", [92, 78, 87, 74]),
    int_col("Test2", [94, 88, 81, 70]),
    int_col("Average", [93, 83, 84, 72]),
    double_col("GPA", [3.9, 2.9, 3.0, 1.8])
])
```

Now, use the [`write`](../../reference/data-import-export/Parquet/writeTable.md) method to export the table to a Parquet file. [`write`](../../reference/data-import-export/Parquet/writeTable.md) takes the following arguments:

1. The table to be written. In this case, `grades`.
2. The Parquet file to write to. In this case, `/data/grades_GZIP.parquet`.
3. (Optional) `parquetInstructions` for writing files using compression codecs. Accepted values are:
   - `SNAPPY`: Aims for high speed and a reasonable amount of compression. Based on [Google](https://github.com/google/snappy/blob/main/format_description.txt)'s Snappy compression format. If `ParquetInstructions` is not specified, it defaults to `SNAPPY`.
   - `UNCOMPRESSED`: The output will not be compressed.
   - `LZ4_RAW`: A codec based on the [LZ4 block format](https://github.com/lz4/lz4/blob/dev/doc/lz4_Block_format.md). Should always be used instead of `LZ4`.
   - `LZ4`: **Deprecated** Compression codec loosely based on the [LZ4 compression algorithm](https://github.com/lz4/lz4), but with an additional undocumented framing scheme. The framing is part of the original Hadoop compression library and was historically copied first in parquet-mr, then emulated with mixed results by parquet-cpp. Note that `LZ4` is deprecated; use `LZ4_RAW` instead.
   - `LZO`: Compression codec based on or interoperable with the [LZO compression library](http://www.oberhumer.com/opensource/lzo/).
   - `GZIP`: Compression codec based on the GZIP format (not the closely-related "zlib" or "deflate" formats) defined by [RFC 1952](https://tools.ietf.org/html/rfc1952).
   - `ZSTD`: Compression codec with the highest compression ratio based on the Zstandard format defined by [RFC 8478](https://tools.ietf.org/html/rfc8478).

:::note

In this guide, we write data to locations relative to the base of its Docker container. See [Docker data volumes](../../conceptual/docker-data-volumes.md) to learn more about the relation between locations in the container and the local file system.

:::

```python test-set=1
from deephaven.parquet import write

write(grades, "/data/grades_GZIP.parquet", compression_codec_name="GZIP")
```

## Read a Parquet file into a table

Now, use the [`read`](../../reference/data-import-export/Parquet/readTable.md) method to import the Parquet file as a table. [`read`](../../reference/data-import-export/Parquet/readTable.md) takes the following arguments:

1. The Parquet file to read. In this case, `/data/grades_GZIP.parquet`.
2. (Optional )`parquetInstructions` for codecs when the file type cannot be successfully infered. Accepted values are:
   - `SNAPPY`: Aims for high speed, and a reasonable amount of compression. Based on [Google](https://github.com/google/snappy/blob/main/format_description.txt)'s Snappy compression format. If `ParquetInstructions` is not specified, it defaults to `SNAPPY`.
   - `UNCOMPRESSED`: The output will not be compressed.
   - `LZ4_RAW`: A codec based on the [LZ4 block format](https://github.com/lz4/lz4/blob/dev/doc/lz4_Block_format.md). Should always be used instead of `LZ4`.
   - `LZ4`: **Deprecated** Compression codec loosely based on the [LZ4 compression algorithm](https://github.com/lz4/lz4), but with an additional undocumented framing scheme. The framing is part of the original Hadoop compression library and was historically copied first in parquet-mr, then emulated with mixed results by parquet-cpp. Note that `LZ4` is deprecated; use `LZ4_RAW` instead.
   - `LZO`: Compression codec based on or interoperable with the [LZO compression library](http://www.oberhumer.com/opensource/lzo/).
   - `GZIP`: Compression codec based on the GZIP format (not the closely-related "zlib" or "deflate" formats) defined by [RFC 1952](https://tools.ietf.org/html/rfc1952).
   - `ZSTD`: Compression codec with the highest compression ratio based on the Zstandard format defined by [RFC 8478](https://tools.ietf.org/html/rfc8478).
   - `LEGACY`: Load any binary fields as strings. Helpful to load files written in older versions of Parquet that lacked a distinction between binary and string.

:::note

For more information on the file path, see [Docker data volumes](../../conceptual/docker-data-volumes.md).

:::

```python test-set=1
from deephaven.parquet import read

result = read("/data/grades_GZIP.parquet")
```

## Read large Parquet files

When we load a Parquet file into a table, we do not load the whole file into RAM. This means that files much larger than the available RAM can be loaded as tables.

## Related documentation

- [Import Parquet into Deephaven video](https://youtu.be/k4gI6hSZ2Jc)
- [How to write and read partitioned Parquet files](./parquet-directory.md)
- [Docker data volumes](../../conceptual/docker-data-volumes.md)
- [`read`](../../reference/data-import-export/Parquet/readTable.md)
- [`write`](../../reference/data-import-export/Parquet/writeTable.md)
