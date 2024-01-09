---
id: end-time
title: end_time
---

The `end_time` method returns the end of the period.

## Syntax

```python syntax
BusinessPeriod.end_time -> DateTime
```

## Parameters

This method takes no arguments.

## Returns

The end of the period as a `DateTime`.

## Examples

The following example creates a [`BusinessPeriod`](../business-schedule/business-periods.md), calls `business_periods` to show that there is only one period on this schedule, and then calls `end_time` to return the [`BusinessPeriod`](../business-schedule/business-periods.md)'s end time.

```python skip-test
from deephaven import calendar as dhcal

biz_schedule = dhcal.BusinessCalendar("USNY").business_schedule("2023-05-03")

print(biz_schedule.business_periods)

period = biz_schedule.business_periods

print(period[0].end_time)
```

## Related documentation

- [`BusinessCalendar`](../business-calendar/BusinessCalendar.md)
- [`business_schedule`](../business-calendar/business-schedule.md)
- [`business_periods`](../business-schedule/business-periods.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessPeriod.end_time)
