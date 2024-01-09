---
id: current-day
title: current_day
---

The `current_day` method returns the current day as a string in `yyyy-MM-dd` format.

## Syntax

```
BusinessCalendar.current_day -> str
```

## Parameters

This method takes no arguments.

## Returns

The current date as a [string](../../../query-language/types/strings.md) in the format `yyyy-MM-dd`.

## Examples

The following example creates a [`BusinessCalendar`](../business-calendar/business-schedule.md) and then prints the result of `current_day`.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

print(my_cal.current_day)
```

## Related documentation

- [`BusinessCalendar`](../business-calendar/BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.Calendar.current_day)
