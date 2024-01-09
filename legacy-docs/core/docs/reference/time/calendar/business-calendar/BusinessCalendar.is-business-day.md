---
id: BusinessCalendar.is-business-day
title: is_business_day
---

The `is_business_day` method returns a boolean value that is `true` if the current day is a business day.

## Syntax

```
BusinessCalendar.is_business_day -> bool
```

## Parameters

This method takes no arguments.

## Returns

A boolean value. `True` if the current day is a business day; otherwise, `False`.

## Examples

The following example creates a [`BusinessCalendar`](./BusinessCalendar.md) and calls `is_business_day`.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

print(my_cal.is_business_day)
```

## Related documentation

- [`BusinessCalendar`](./BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar.is_business_day)
