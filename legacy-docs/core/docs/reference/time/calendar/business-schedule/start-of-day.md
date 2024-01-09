---
id: start-of-day
title: start_of_day
---

The `start_of_day` method returns a [`date-time`](../../../query-language/types/date-time.md) for the start of the day.

## Syntax

```
BusinessSchedule.start_of_day -> Instant
```

## Parameters

This method takes no arguments.

## Returns

A [`date-time`](../../../query-language/types/date-time.md) for the start of the day according to the business schedule.

## Examples

The following example creates a [`BusinessSchedule`](../business-calendar/business-schedule.md) and prints the result of a call to `start_of_day`.

```python skip-test
from deephaven import calendar as dhcal

my_schedule = dhcal.BusinessCalendar("USNY").business_schedule("2023-05-03")

print(my_schedule.start_of_day)
```

## Related documentation

- [`BusinessCalendar`](../business-calendar/BusinessCalendar.md)
- [`business_schedule`](../business-calendar/business-schedule.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessSchedule.start_of_day)
