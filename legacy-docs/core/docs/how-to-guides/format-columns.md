---
id: format-columns
title: How to apply color formatting to columns in a table
sidebar_label: Apply color formatting to columns
---

This guide shows you how to apply various color formatting options to the columns in your static or dynamic tables.

## Format an entire column

Color formatting can be applied to the contents of an entire column using the `format_columns` method:

`.format_columns("columnName=<colorObject>")`

- `columnName` is the name of the column to format.
- `<colorObject>` is any of the [valid color objects](../assets/how-to/colors.pdf) available in Deephaven.

The following query will apply the color `VIVID_YELLOW` to all cells in the `GPA` column:

```python test-set=1
from deephaven import new_table
from deephaven.column import int_col, double_col, string_col

students = new_table([
    string_col("Name", ["Andy", "Claire", "Jane", "Steven"]),
    int_col("StudentID", [1, 2, 3, 4]),
    int_col("TestGrade", [85, 95, 88, 72]),
    int_col("HomeworkGrade", [85, 95, 90, 95]),
    double_col("GPA", [3.0, 4.0, 3.7, 2.8])
]).format_columns(["GPA=VIVID_YELLOW"])
```

## Format certain rows or columns

### Columns

You can apply conditional formatting to only certain rows and/or columns.

The following method formats cells in the named column when a specified condition exists:

`.format_column_where("columnName", "<condition>", "colorValue")`

For example, the following query applies the color `DEEP_GREEN` to the `TestGrade` column when the value in the `GPA` column of the same row is less than `3.0`.

```python test-set=1
students_format = students.format_column_where("TestGrade", "GPA<3.0", "DEEP_GREEN")
```

[Ternary statements](ternary-if-how-to.md) can also be used to [color cells based on conditional statements](#conditional-formatting). For example, the following query colors cells in the `Name` column `BRIGHT_GREEN` if the value in the `Diff` column is positive, and `BRIGHT_RED` if otherwise:

```python test-set=1
student_tests = students_format\
    .update("Diff = HomeworkGrade - TestGrade")\
    .format_columns("Name = (Diff > 0) ? BRIGHT_GREEN : BRIGHT_RED")
```

### Rows

The `format_row_where` method formats entire rows when a specified condition exists:

`.format_row_where("<condition>", "<colorValue>")`

The following query applies the color `PALE_BLUE` to any row when the value in the `Diff` column is greater than 0.

```python test-set=1
student_all_row = student_tests\
    .format_row_where("Diff > 0"," PALE_BLUE")
```

The following query colors the entire row `BRIGHT_YELLOW` if the `Sym` column is equal to the string "AAPL":

```python test-set=1
student_name = student_all_row.format_row_where("Name=`Jane`", "BRIGHT_YELLOW")
```

The following colors all the cells in every other row `VIVID_PURPLE`:

```python test-set=1
student_id = student_name.format_row_where("StudentID % 2 == 0", "VIVID_PURPLE")
```

### Row formatting with highlighted columns

Row and column formatting can also be combined in a table. All columns will use the row format by default, but if
a column format is specified, it will override the row format. For example:

The following query colors all cells in every other row `VIVID_PURPLE`, and colors the cells in column C `BRIGHT_YELLOW` in every odd row.

```python test-set=1
students_combined = student_tests.format_row_where("StudentID % 2 == 0", "VIVID_PURPLE")\
    .format_column_where("Name", "Diff > 0", "BRIGHT_YELLOW")
```

## Advanced formatting

More advanced formats, including conditional formatting, can be achieved using
the [`.format_columns()`](../reference/table-operations/format/format-columns.md) method. In fact,
both `.format_row_where` and `.format_column_where` are wrappers for `.format_columns`.

The `.format_columns` method works similarly to `update_view` — however, the result of the
formula is used to determine the format for an existing column, rather than to add a new column to the table.
The result of a formula passed to `.format_columns` must be either a color string (such as a hexadecimal RGB color,
e.g. `"#040427`"), a [Color](https://deephaven.io/core/javadoc/io/deephaven/gui/color/Color.html), or a packed `long`
representation of the background and foreground color (as returned by [`bgfg()` or `bgfga()`](#assign-colors-to-backgrounds-and-foregrounds)).

Since `.format_columns` leverages Deephaven's existing formula infrastructure, the full power of the Deephaven query
engine is available to format formulas in `.format_columns`. This allows column formats to utilize multiple
Deephaven columns, user-defined functions and constants (such as custom colors or dictionaries mapping values to colors),
and the flexibility of the query language
(including built-in [query language functions](../reference/query-language/query-library/auto-imported-functions.md)).

### Heat Maps

Color-based formatting can also be used to create heat maps in Deephaven tables:

`heatmap(<colName>, <minimumValue>, <maximumValue>, <minimumBackgroundColor>, <maximumBackgroundColor>)`

The following query will apply color to the `GPA` column as follows:

- When the value is less than or equal to 1.00, `BRIGHT_GREEN` will be used,
- When the value is greater than or equal to 4.00, `BRIGHT_RED` will be used, and
- An automatically interpolated color proportionally between `BRIGHT_GREEN` and `BRIGHT_RED` will be used for all other values between 1 and 4.

```python test-set=1
students_heat = students.format_columns("GPA = heatmap(GPA, 1, 4, BRIGHT_GREEN, BRIGHT_RED)")
```

Options are also available for `heatmapFg()` and `heatmapForeground()`. When either of these methods is used, the heatmap color pair listed in the argument is applied only to the foreground.

### Conditional formatting

Advanced conditional formats can be applied via `format_columns`, such as different colors for different values. The
following query will use a [ternary if](./ternary-if-how-to.md) to color the `Name` column as follows:

- When the `TestGrade` or `HomeworkGrade` is less than or equal to 85, `BRIGHT_YELLOW` will be used.
- When the `GPA` is less than 3.0, `LIGHT_RED` will be used.
- Otherwise, no formatting will be applied.

```python test-set=1
students_cond = students.format_columns("Name = TestGrade <= 85 || HomeworkGrade <= 85 ? BRIGHT_YELLOW : GPA < 3 ? LIGHT_RED : NO_FORMATTING")
```

### Advanced row formatting

The default color for a row can also be specified in a `.format_columns` formula by using the special variable
`__ROWFORMATTED` as the destination column name. The following query will color the entire row, using different
colors depending on the value of the `GPA` column.

```python test-set=1
students_cond = students.format_columns("__ROWFORMATTED = GPA >= 3.5 ? LIGHT_GREEN : GPA >= 3 ? LIGHT_BLUE : BRIGHT_YELLOW")
```

## Assign colors to backgrounds and foregrounds

The field of a cell is the background. The text/numbers showing in the cell is the foreground. Color objects can then be used with the following methods to assign individual color values or combinations to the background and/or foreground:

- `bg()` or `background()` - These methods set the background to a specific color, but do not apply any foreground color.
- `fg()` or `foreground()` - These methods set the foreground to a specific color, but do not apply any background color.
- `bgfg()` or `backgroundForeground()` - These methods set both the background and foreground to specific values.
- `bgfga()` or `backgroundForegroundAuto()` - These methods set the background to a specific color. Deephaven automatically chooses a contrasting foreground color.
- `fgo()` or `foregroundOverride()` - These methods are similar to `fg()` or `foreground()`. However, when either of these methods are used, the color selected will override the highlight color that is automatically assigned when the user highlights the cell or group of cells in the Deephaven console.
- `bgo()` or `backgroundOverride()` - These methods are similar to `bg()` or `background()`. However, when either of these methods are used, the color selected will override the highlight color that is automatically assigned when the user highlights the cell or group of cells in the Deephaven console.

:::caution
Overriding the foreground or background colors may make the highlighted content difficult to read. Care in use is suggested.
:::

The following query generates a table with an orange background using RGB values:

```python test-set=1
students_combined = student_tests\
    .format_column_where("Name", "Diff > 0", "bg(colorRGB(255,93,0))")
```

The following query generates a table with a purple foreground using RGB values:

```python test-set=1
students_purple = students.format_row_where("true","fg(colorRGB(102,0,204))")
```

The following query will color the `Name` column with a hot pink background and a yellow foreground.

```python test-set=1
students_pink = students.format_columns("Name = bgfg(colorRGB(255,105,80),colorRGB(255,255,0))")
```

The following query generates a table with a navy blue background (defined by `colorRGB(0,0,128)`) and automatically
selects a contrasting foreground (using `bgfga()`).

```python test-set=1
students_navy = students.format_columns("* = bgfga(colorRGB(0,0,128))")
```

## Appendix: Assigning colors

Colors can be assigned in Deephaven tables or plots using strings or by using color objects.

### Named color values

There are 280 predefined color values available in Deephaven.

:::note See:
[Named Colors Chart](../assets/how-to/colors.pdf)
:::

These predefined colors are referred to by their names, which must be typed in capital letters.

:::note
The `NO_FORMATTING` predefined value indicates that no special format should be applied. This is useful in advanced
formats defined with `.format_columns`.
:::

### HEX (Hexadecimal)

Hexadecimal values are specified with three values that correspond to RRGGBB. Each value [RR (red), GG (green) and BB (blue)] are hexadecimal integers between 00 and FF, and they specify the intensity of the color. All Hex values are preceded with a pound sign, e.g., #0099FF.

Because these values are considered strings, they must be enclosed in quotes. If the HEX color values are to be used within another string (i.e., a string within a string), the name must be enclosed in backticks.

```python test-set=1
students_hex = students.format_columns("Name = `#87CEFA`")
```

#### RGB (Red, Green, Blue)

RGB values are represented numerically with comma-separated values for red, green and blue respectively, with each value expressed as integers in the range 0-255 or floats in the range 0-1.

RGB color values can be converted into color objects in Deephaven by enclosing their values into the argument of the `colorRGB` method.

The syntax follows:

`colorRGB(int r, int g, int b)`

`colorRGB(float r, float g, float b)`

```python test-set=1
students_rgb = students.format_columns("Name = colorRGB(135, 206, 250)")
```

#### RGBA (Red, Green, Blue, Alpha)

The RGBA color model is based on RGB. However, RGBA provides an option for a fourth value to specify alpha (transparency). As with RGB, the numeric values can be specified using floats or ints. The numeric ranges for RGB remain the same. The alpha channel can range from 0 (fully transparent) to 255 (fully opaque) for ints, and 0.0 to 1.0 for floats.

RGBA color values can be converted into color objects in Deephaven by enclosing their values into the argument of the `colorRGB` method.

The syntax follows:

`colorRGB(int r, int g, int b, int a)`

`colorRGB(float r, float g, float b, float a)`

```python test-set=1
students_rgba = students.format_columns("Name = colorRGB(135, 206, 250, 50)")
```

## Related documentation

- [Create a new table](./new-table.md)
- [How to select, view, and update data in tables](./use-select-view-update.md)
- [How to use filters](./use-filters.md)
- [How to use variables and functions in query strings](./query-scope-how-to.md)
- [`format_columns`](../reference/table-operations/format/format-columns.md)
