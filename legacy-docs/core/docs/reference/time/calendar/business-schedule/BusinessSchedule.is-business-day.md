---
id: BusinessSchedule.is-business-day
title: is_business_day
---

The `is_business_day` method returns a boolean value that is `true` if the current day is a business day.

## Syntax

```
BusinessSchedule.is_business_day() -> bool
```

## Parameters

This method takes no arguments.

## Returns

A boolean value. `True` if the current day is a business day; otherwise, `False`.

## Examples

The following example creates a [`BusinessSchedule`](../business-calendar/business-schedule.md) and calls [`day_of_week`](../calendar/day-of-week.md) and `is_business_day()`. Since the date in question is a Wednesday, `is_business_day` returns `True`.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")
my_schedule = my_cal.business_schedule("2023-05-03")

print(my_cal.day_of_week(("2023-05-03")))
print(my_schedule.is_business_day())
```

## Related documentation

- [`BusinessCalendar`](../business-calendar/BusinessCalendar.md)
- [`business_schedule`](../business-calendar/business-schedule.md)
- [`day_of_week`](../calendar/day-of-week.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessSchedule.is_business_day)
