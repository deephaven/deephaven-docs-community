---
id: start-time
title: start_time
---

The `start` method returns the start of the period.

## Syntax

```python syntax
BusinessPeriod.start_time -> DateTime
```

## Parameters

This method takes no arguments.

## Returns

The start of the period as a `DateTime`.

## Examples

The following example creates a [`BusinessPeriod`](../business-schedule/business-periods.md), calls `business_periods` to show that there is only one period on this schedule, and then calls `start_time` to return the [`BusinessPeriod`](../business-schedule/business-periods.md)'s start time.

```python skip-test
from deephaven import calendar as dhcal

biz_schedule = dhcal.BusinessCalendar("USNY").business_schedule("2023-05-03")

print(biz_schedule.business_periods)

period = biz_schedule.business_periods

print(period[0].start_time)
```

## Related documentation

- [`BusinessCalendar`](../business-calendar/BusinessCalendar.md)
- [`business_schedule`](../business-calendar/business-schedule.md)
- [`business_periods`](../business-schedule/business-periods.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessPeriod.start_time)
