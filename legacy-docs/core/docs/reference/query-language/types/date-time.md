---
id: date-time
title: date-time
---

A `date-time` value indicates a specific instance in time. In Deephaven, a `date-time` is typically represented by one of two data types:

- [`java.time.Instant`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/Instant.html)
- [`java.time.ZonedDateTime`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/ZonedDateTime.html)

These data types are used by Deephaven tables to represent moments in time. They are also used in the Python API. Both will be covered in this reference guide.

## Instant

A `java.time.Instant` represents a single instantaneous point in time, given in the `UTC` time zone. Printing an instance of an instant always ends in the letter `Z`, which is shorthand for `UTC`.

## ZonedDateTime

A `java.time.ZonedDateTime` represents a single instantaneous point in time, given in the specified time zone. Printing an instance of a zoned date-time always ends in the specified time zone. For instance, for the `ET` (US Eastern Time) time zone, a `ZonedDateTime` ends in `[America/New_York]`.

## Syntax

`'YYYY-MM-DDThh:mm:ss.ddddddddd TZ'`

- `YYYY` - the year
- `MM` - the month
- `DD` - the day
- `T` - the separator between the date and time
- `hh` - the hour of the day
- `mm` - the minute of the hour
- `ss` - the second of the minute
- `ddddddddd` - the fraction of a second
- `TZ` - the time zone

## Example

The following example creates a table containing DateTimes and then filters the table based upon a DateTime defined in a query string.

```python order=null
from deephaven.time import to_j_instant, to_j_zdt

instant_1 = to_j_instant("2021-07-04T08:00:00 PT")
zdt_1 = to_j_zdt("2021-07-04T08:00:00 PT")
zdt_2 = to_j_zdt("2021-09-06T12:30:00 GMT")
instant_2 = to_j_instant("2021-09-06T12:30:00 GMT")

print(instant_1)
print(zdt_1)
print(instant_2)
print(zdt_2)
```

## Related Documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [`datetime_col`](../../table-operations/create/dateTimeCol.md)
- [Strings](./strings.md)
- [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/time/DateTime.html)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.dtypes.html?highlight=datetime#deephaven.dtypes.DateTime)
