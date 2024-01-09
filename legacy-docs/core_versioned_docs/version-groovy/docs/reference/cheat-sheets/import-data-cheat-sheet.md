---
id: import-data-cheat-sheet
title: Data import / export cheat sheet
sidebar_label: All formats
---

## CSV

- [`readCsv`](../data-import-export/CSV/readCsv.md)
- [`writeCsv`](../data-import-export/CSV/writeCsv.md)

```groovy skip-test
import static io.deephaven.csv.CsvTools.readCsv
import static io.deephaven.csv.CsvTools.writeCsv

result = readCsv("/data/inputFile.csv", csvSpecs)
writeCsv(table, "/data/outputFile.csv")
```

## Parquet

- [`readTable`](../data-import-export/Parquet/readTable.md)
- [`writeTable`](../data-import-export/Parquet/writeTable.md)

```groovy skip-test
import static io.deephaven.parquet.table.ParquetTools.readTable
import static io.deephaven.parquet.table.ParquetTools.writeTable

result = readTable("/data/inputFile.parquet")
result = readTable("/data/inputDirectory")
writeTable(source, "/data/output.parquet") // source as any table in Deephaven
```

## Kafka

```groovy skip-test
// No current groovy environment
```
