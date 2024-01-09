---
id: is-last-business-day-of-week
title: is_last_business_day_of_week
---

The `is_last_business_day_of_week` method returns a boolean value that is `true` if the specified date is the last business day of the week.

## Syntax

```
BusinessCalendar.is_last_business_day_of_week(date: str) -> bool
```

## Parameters

<ParamTable>
<Param name="date" type="str">

The date of interest. Format must be "yyyy-MM-dd".

</Param>
</ParamTable>

## Returns

A boolean. The value is `true` if the specified date is the last business day of the month, and `false` otherwise.

## Examples

The following example creates a [`BusinessCalendar`](./BusinessCalendar.md) and then prints the results of two `is_last_business_day_of_week` calls. Note that in this calendar, `FRIDAY` is considered the last day of the week.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

date1 = "2023-01-27"
date2 = "2023-01-31"

print(my_cal.is_last_business_day_of_week(date1), " | ", my_cal.day_of_week(date1))
print(my_cal.is_last_business_day_of_week(date2), " | ", my_cal.day_of_week(date2))
```

## Related documentation

- [`BusinessCalendar`](./BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar.is_last_business_day_of_week)
