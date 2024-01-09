---
id: work-with-columns
title: How to work with columns
sidebar_label: Work with columns
---

This guide shows you how to work with columns in the user interface. For example, you might want to reorder or hide columns in a table, create custom columns to house calculations, or lock certain columns in place. These options and more can be accomplished in the UI using the column header context menu and the **Table Options** menu.

## Column header menu

The column header menu can be accessed for any table by right-clicking on a column header.

![img](../../assets/how-to/ui/column_header_menu.png)

### Hide Column

Any column in a table can be hidden by right-clicking that column's header and choosing **Hide Columns**.

If any columns are hidden, the **Show All Columns** option becomes accessible and can be used to restore the original display.

### Freeze Column

The **Freeze Column** option locks a column in place so that as you horizontally scroll through a table, that column always remains in view.

![img](../../assets/how-to/freeze_column.gif)

If a column is already frozen, the **Unfreeze Column** option becomes accessible in its column header menu.

### Sort by

Columns may be sorted in ascending or descending order, and also using absolute values if preferred.

![img](../../assets/how-to/ui/sort_by.png)

### Number Format

![img](../../assets/how-to/number_format.png)

For columns containing numerical data, the **Number Format** option allows you to change how the data in that column is displayed.

![img](../../assets/how-to/number_format1.gif)

## Table Options menu

The **Table Options** menu offers several options to customize, manipulate, and download your table data. It can be accessed by clicking on the sandwich icon to the right of a table's column headers.

![img](../../assets/how-to/ui/open_table_options.png)

![img](../../assets/how-to/ui/table_options_menu.png)

### Organize Columns

The **Organize Columns** option allows you to easily drag-and-drop columns in the order you wish them to appear, as well to hide certain columns from your table by clicking the eye icon next to its name.

![img](../../assets/how-to/ui/column_order.gif)

At the top of the dialog, there are shortcuts to reset the columns to their original display, as well as to sort all columns in ascending or descending order.

#### Group Columns

You can also create one or more column groups in your table. This is useful for organizing columns into logical groups. In the example below, we organize the weather data related to speed into a single group. Simply click **Group**, then drag-and-drop the columns you wish to include. After you name the group, click the **Check** icon to save:

![img](../../assets/how-to/ui/column_group.gif)

You can also choose a color for your column group using the paint can icon. The table below now includes two groups with distinct colors:

![img](../../assets/how-to/ui/paint_icon.png)

![img](../../assets/how-to/ui/column_groups2.png)

As with single columns, you can drag the group to determine the order in which it appears in your table. The **Reset** button removes any groups from your table.

### Conditional Formatting

The **Conditonal Formatting** feature allows you to define conditional formatting of cells or rows by creating new rules.

Select **Add New Rule**, then choose **Conditional** to format individual cells or **Row** to format specific rows.

![img](../../assets/how-to/ui/cond_formatting.png)

![img](../../assets/how-to/ui/cond_formatting2.png)

- Choose a column from the dropdown list provided.
- Select the desired condition, such as "is exactly", "contains", "starts with", etc..
- Select a style:

  ![img](../../assets/how-to/ui/cond_formatting4.png)

Note that six colors are available by default. The "Custom" option allows you to define your own color.

In the example below, all cells in the Exchange column containing the value "Arca" will be colored in the "Positive" style:

![img](../../assets/how-to/ui/cond_formatting5.gif)

Your new rules can be deleted or re-ordered by returning to the **Conditional Formatting** dialog.

![img](../../assets/how-to/ui/cond_formatting6.png)

### Custom Columns

The **Custom Columns** feature allows you to ad one or more calculated columns to your table.

Choose a name for your new column, then specify the formula in the field below. Click **Save** and close the dialog to see the new column in the table.

![img](../../assets/how-to/custom_column.gif)

If you've added several custom columns, these can be re-ordered in the **Custom Columns** dialog by dragging-and-dropping each item into the order you wish.

Re-open the dialog to edit your formulas or delete columns.

### Aggregate Columns

The **Aggregate Columns** feature allows you to add a row to the top or bottom of your table that aggregates column data using the operation of your choice. This is useful for quickly calculating the sum, average, or other aggregate of a column.

In the example below, we add an Average row and a Minimum row to the top of the table:

![img](../../assets/how-to/ui/aggregate_columns.gif)

These Aggregations can be re-ordered, edited, or deleted from the **Aggregate Columns** dialog.

### Go to

![img](../../assets/how-to/ui/go_to_value.png)

The **Go to value** feature allows you to go to a specified value in the table, with options determined by a column's data type. For example, when a Timestamp column is selected, the search field accepts DateTime values, while the Instrument column includes options for case-sensitive searches.

![img](../../assets/how-to/ui/go_to_value.gif)

## Related documentation

- [How to work with rows](./work-with-rows.md)
