---
id: time-zone
title: time_zone
---

The `time_zone` method returns the calendar's time zone.

## Syntax

```
BusinessCalendar.time_zone -> Enum
```

## Parameters

This method takes no arguments.

## Returns

The current date as a [string](../../query-language/types/strings.md) in the format `yyyy-MM-dd`.

## Examples

The following example creates a [`BusinessCalendar`](./business-calendar/BusinessCalendar.md) and then prints the calendar's time zone.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

print(my_cal.time_zone)
```

## Related documentation

- [`BusinessCalendar`](./business-calendar/BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar.time_zone)
