---
id: standard-business-day-length
title: standard_business_day_length
---

The `standard_business_day_length` method returns the length of a standard business day in nanoseconds.

## Syntax

```
BusinessCalendar.standard_business_day_length -> int
```

## Parameters

This method takes no arguments.

## Returns

The length of a standard business day in nanoseconds.

## Examples

```python skip-test
from deephaven import calendar as dhcal

my_calendar = dhcal.BusinessCalendar("USNY")

print(my_calendar.standard_business_day_length)
```

## Related documentation

- [`BusinessCalendar`](./BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar.standard_business_day_length)
