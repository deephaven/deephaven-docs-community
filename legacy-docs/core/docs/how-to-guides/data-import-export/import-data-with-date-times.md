---
id: import-data-with-date-times
title: How to import data with date-times
sidebar_label: Import data with date-times
---

It's common to import data with date and [date-time](../../reference/query-language/types/date-time.md) columns. This guides shows how to work with imported data of this type.

Before running these examples, make sure you've [set your date/time settings](../set-date-time-format.md) to use an appropriate display time zone. You can adjust it at any time, and all the displayed [date-time](../../reference/query-language/types/date-time.md) columns should adjust to use the new time zone.

:::note
All the screenshots in this guide assume the time zone is set to New York UTC-5.
:::

We will work with a simple CSV file with example dates and [date-times](../../reference/query-language/types/date-time.md).

This CSV has four columns.

- `DateTimeKnownFormat` - a date/time in the standard format that Deephaven understands (e.g., `1948-07-01T12:00:00 ET`)
- `DateUnknownFormat1` - a date without separators (e.g., `19480701` for July 1, 1948)
- `DateUnknownFormat2` - a date in a standard ISO 8061 format (e.g., `1956-07-01`), which we'll convert to a date-time after the import
- `DateTimeUnknownFormat` - a date/time in an unknown-to-Deephaven format, with a built-in timezone offset (e.g., `1948-07-02 16:00:00-0400`, meaning 16:00:00 on July 2, 1948, time zone offset -4 hours from UTC)

Assuming you are running [Deephaven with example data](../../tutorials/docker-install.md#choose-a-deployment), you can simply import the file into a Deephaven table:

```python skip-test
from deephaven import read_csv

test_dates = read_csv("/data/examples/test_dates.csv")
```

The result will be a small table.

![img](../../assets/how-to/date-time/import-date-time.png)

We'll cover each column individually. You can see the column type by hovering over its name.

The easiest is `DateTimeKnownFormat`. This was imported as a [date-time](../../reference/query-language/types/date-time.md) because it was in Deephaven's standard [date-time](../../reference/query-language/types/date-time.md) format, and the CSV import utility automatically parsed it. Nothing needs to be done here.

Because of its format, `DateUnknownFormat1` gets imported as an `int` column. These `int` values can be converted to [strings](../../reference/query-language/types/strings.md) in the `yyyy-MM-dd` format by using the Java date/time class [`SimpleDateFormat`](https://docs.oracle.com/javase/10/docs/api/java/text/SimpleDateFormat.html).

To achieve this transformation:

- `int` values are converted to strings.
- [string](../../reference/query-language/types/strings.md) values are parsed into Java dates.
- Java [Dates](https://docs.oracle.com/javase/8/docs/api/java/util/Date.html) are formatted in `yyyy-MM-dd` format.

```python skip-test
SimpleDateFormat = jpy.get_type("java.text.SimpleDateFormat")

simpleParse = SimpleDateFormat("yyyyMMdd")
simpleFormat = SimpleDateFormat("yyyy-MM-dd")

test_dates_updated1 = test_dates.update_view(formulas=["Date=simpleFormat.format(simpleParse.parse(Integer.toString(DateUnknownFormat1)))"])
```

The resulting table has a new [string](../../reference/query-language/types/strings.md) column containing the date in the target format.

![img](../../assets/how-to/date-time/import-date-time2.png)

`DateUnknownFormat2` was imported as a [string](../../reference/query-language/types/strings.md) column because it has data that's not numeric and not in a known format. Let's convert it to a [date-time](../../reference/query-language/types/date-time.md). Because there is no associated time zone in the string, we need to specify one. Let's assume the data is for the Asia/Tokyo time zone.

- We'll define a `SimpleDateFormat` in the column's format `yyyy-MM-dd`.
- We'll specify the time zone for that formatter.
- We'll call the [`parse`](https://docs.oracle.com/javase/8/docs/api/java/text/DateFormat.html#parse-java.lang.String-) method, and pass the result of that into `epoch_millis_to_instant` (after calling [`getTime`](https://docs.oracle.com/javase/9/docs/api/java/util/Date.html#getTime--) to get the millis from epoch from the [`parse`](https://docs.oracle.com/javase/8/docs/api/java/text/DateFormat.html#parse-java.lang.String-) method's result).

```python skip-test

SimpleDateFormat = jpy.get_type("java.text.SimpleDateFormat")
TimeZone = jpy.get_type("java.util.TimeZone")

dateFormat = SimpleDateFormat("yyyy-MM-dd")
dateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Tokyo"))

test_dates_updated2 = test_dates.update_view(formulas=["DateTimeUpdated = epochMillisToInstant(dateFormat.parse(DateUnknownFormat2).getTime())"])
```

The resulting table contains a new `DateTimeUpdated` column with a [date-time](../../reference/query-language/types/date-time.md). Note that in this screenshot, we're displaying in the New York time zone, which is earlier than the Tokyo time zone we used for the conversion, so the dates are earlier.

![img](../../assets/how-to/date-time/import-date-time3.png)

`DateTimeUnknownFormat` was imported as a [string](../../reference/query-language/types/strings.md) column because it couldn't be interpreted by Deephaven. However, it already contains everything needed to parse the date/time - the date, time, and a time zone offset from UTC. This will look similar to the `DateUnknownFormat` example, but we don't need to specify the time zone.

```python skip-test
SimpleDateFormat = jpy.get_type("java.text.SimpleDateFormat")

dateFormat2 = SimpleDateFormat("yyyy-MM-dd HH:mm:ssZZZZ")

test_datetimes_updated = test_dates.update_view(formulas=["DateTimeUpdated = epochMillisToInstant(dateFormat2.parse(DateTimeUnknownFormat).getTime())"])
```

Notice that the hours in the new column are different by one hour from the original [string](../../reference/query-language/types/strings.md). This is because the data is being shown in a different time zone.

![img](../../assets/how-to/date-time/import-date-time4.png)

## Related documentation

- [How to work with date-times](../work-with-date-time.md)
- [How to import CSV or other delimited files](../data-import-export/csv-import.md)
- [date-time](../../reference/query-language/types/date-time.md)
