---
id: default-business-periods
title: default_business_periods
---

The `default_business_periods` method returns the default business periods for the specified business days as a list of strings.

## Syntax

```
BusinessCalendar.default_business_periods -> list[str]
```

## Parameters

This method takes no arguments.

## Returns

A list of strings with a comma separating open and close times.

## Examples

The following example creates a [`BusinessCalendar`](./BusinessCalendar.md) and then prints the result of `default_business_periods`.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("JPOSE")

print(my_cal.default_business_periods)
```

## Related documentation

- [`BusinessCalendar`](./BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar.default_business_periods)
