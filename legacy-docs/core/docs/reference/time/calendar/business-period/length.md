---
id: length
title: length
---

The `length` method returns the length of the period in nanoseconds.

## Syntax

```python syntax
BusinessPeriod.length -> int
```

## Parameters

This method takes no arguments.

## Returns

The length of the period in nanoseconds.

## Examples

The following example creates a [`BusinessPeriod`](../business-schedule/business-periods.md), calls `business_periods` to show that there is only one period on this schedule, and then calls `length` to return the [`BusinessPeriod`](../business-schedule/business-periods.md)'s length.

```python skip-test
from deephaven import calendar as dhcal

biz_schedule = dhcal.BusinessCalendar("USNY").business_schedule("2023-05-03")

print(biz_schedule.business_periods)

period = biz_schedule.business_periods

print(period[0].length)
```

## Related documentation

- [`BusinessCalendar`](../business-calendar/BusinessCalendar.md)
- [`business_schedule`](../business-calendar/business-schedule.md)
- [`business_periods`](../business-schedule/business-periods.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessPeriod.length)
