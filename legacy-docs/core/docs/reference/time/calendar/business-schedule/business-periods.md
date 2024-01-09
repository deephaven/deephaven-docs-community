---
id: business-periods
title: business_periods
---

The `business_periods` method returns a list of [date-times](../../../query-language/types/date-time.md) containing all of a [`BusinessSchedule`](../business-calendar/business-schedule.md)'s [`BusinessPeriods`](../business-calendar/business-schedule.md).

A `BusinessPeriod` is an object that contains the following attributes:

- [`start_time`] - the business period's start time.
- [`end_time`] - the business period's end time.
- [`length`] - the length of the period in nanoseconds.

:::note
A `BusinessPeriod` cannot be created from scratch; it is a component of a [`BusinessCalendar's`](../business-calendar/BusinessCalendar.md) [`BusinessSchedule`](../business-calendar/business-schedule.md).
:::

## Syntax

```python skip-test
BusinessSchedule.business_periods -> list[BusinessPeriod]
```

## Parameters

This method takes no arguments.

## Returns

A list of [date-times](../../../query-language/types/date-time.md).

## Examples

The following example creates a [`BusinessSchedule`](../business-calendar/business-schedule.md), then prints the result of a call to `business_periods`.

<!-- TODO: Add test back in when calendar changes are merged -->

```python skip-test
from deephaven import calendar as dhcal

biz_schedule = dhcal.BusinessCalendar("USNY").business_schedule("2023-05-03")

print(biz_schedule.business_periods)
```

## Related documentation

- [`BusinessCalendar`](../business-calendar/BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessSchedule.business_periods)
