---
id: business-schedule
title: business_schedule
---

The `business_schedule` method returns the specified day's `BusinessSchedule`, an object that can call the following methods:

- [`business_periods`](../business-schedule/business-periods.md)
- [`business_time_elapsed`](../business-schedule/business-time-elapsed.md)
- [`BusinessSchedule.is_business_day`](../business-schedule/BusinessSchedule.is-business-day.md)
- [`end_of_day`](../business-schedule/end-of-day.md)
- [`is_business_time`](../business-schedule/is-business-time.md)
- [`start_of_day`](../business-schedule/start-of-day.md)

## Syntax

```
BusinessCalendar.business_schedule(date: str) -> BusinessSchedule
```

## Parameters

<ParamTable>
<Param name="date" type="str">

The date as a string. Must be in "yyyy-MM-dd" format.

</Param>
</ParamTable>

## Returns

The specified date's business schedule.

## Examples

The following example creates a [`BusinessSchedule`](../business-calendar/business-schedule.md) for the date "2023-05-03". Finally, `print` statements demonstrate that the [`BusinessSchedule`](../business-calendar/business-schedule.md) has been created successfully.

```python skip-test
from deephaven import calendar as dhcal

biz_schedule = dhcal.BusinessCalendar("USNY").business_schedule("2023-05-03")

print(type(biz_schedule))
print(biz_schedule.business_periods)
print(biz_schedule.is_business_day())
```

## Related documentation

- [`BusinessCalendar`](./BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar.business_schedule)
