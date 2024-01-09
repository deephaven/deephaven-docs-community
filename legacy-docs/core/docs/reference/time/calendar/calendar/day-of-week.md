---
id: day-of-week
title: day_of_week
---

The `day_of_week` method returns the day of week for the given date, as a `yyyy-MM-dd` format string.

## Syntax

```
day_of_week(date: str) -> str
```

## Parameters

<ParamTable>
<Param name="date" type="str">

The date of interest. Must be given in "YYYY-MM-dd" format.

</Param>
</ParamTable>

## Returns

The current date as a [string](../../../query-language/types/strings.md) in the format `yyyy-MM-dd`.

## Examples

The following example creates a [`BusinessCalendar`](../business-calendar/BusinessCalendar.md) and then prints the result of `day_of_week`.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

print(my_cal.day_of_week("2001-01-01"))
```

## Related documentation

- [`BusinessCalendar`](../business-calendar/BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.Calendar.day_of_week)
