---
id: upload-table
title: How to upload and download table data
sidebar_label: Upload and download table data
---

## Upload table from file

Tables from files can be imported in the UI by selecting **Upload Table from file** from the console's **More Actions** menu:

![img](../assets/how-to/uploadfile.png)

In this simple example, we'll upload the `Deniro.csv` available in [Deephaven's examples repository](https://github.com/deephaven/examples/tree/main/DeNiro/csv). If you've downloaded Deephaven with examples, this can be found in your `data/examples/Deniro/csv` directory.

<LoopedVideo src={require('../assets/how-to/uploaddeniro.mp4')} />

A table name will be generated for you, but you can enter your own. You can also choose an alternative file format.

This feature supports the following file extensions:

- csv
- tsv (tab separated)
- tab (also tab separate)
- zip (containing one of the above)

:::caution
At this time, we do not support:

- LocalDate
- LocalTime
- DateTime

:::

## Download CSV

You can download all or some of the rows in a Deephaven table into a CSV file to save on your local computer. Select **Download CSV** from the Table Options menu at the right of a table's header to see the following options:

![img](../assets/how-to/downloadcsv.gif)

- **All Rows** - Downloads the entire table. The number of rows appears in parentheses.
- **Only Selected Rows** - Downloads only highlighted rows. The number of selected rows appears in parentheses.
- **First/Last** - Downloads rows from the start or end of the table. Select **First** or **Last** from the drop-down menu and specify an amount of rows.

A file name is automatically generated, but you can rename the file in the **File Name** field. After you click **Download**, the CSV file will save into the default location on your local computer.

## Related documentation

- [Tutorial](../tutorials/quickstart.md)
- [How to import CSV or other delimited files](../how-to-guides/data-import-export/csv-import.md)
- [How to export data to CSV or other delimited files](../how-to-guides/data-import-export/csv-export.md)
