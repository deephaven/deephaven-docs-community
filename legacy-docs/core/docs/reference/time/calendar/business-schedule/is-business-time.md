---
id: is-business-time
title: is_business_time
---

The `is_business_time` method returns a boolean value that is `true` if the current time is a business time.

## Syntax

```
BusinessSchedule.is_business_time(time: Instant) -> bool
```

## Parameters

<ParamTable>
<Param name="time" type="Instant">

The time to check.

</Param>
</ParamTable>

## Returns

A boolean value. `True` if the current day is a business day; otherwise, `False`.

## Examples

The following example creates a [`BusinessSchedule`](../business-calendar/business-schedule.md) and calls `is_business_time()` twice.

```python skip-test
from deephaven import calendar as dhcal
from deephaven.time import parse_instant

biz_schedule = dhcal.BusinessCalendar("USNY").business_schedule("2023-05-25")

time = parse_instant("2023-05-25T11:00:00 ET")
time2 = parse_instant("2023-05-25T05:00:00 ET")

print(biz_schedule.is_business_time(time))
print(biz_schedule.is_business_time(time2))
```

![img](../../../../assets/reference/time/is_business_time_ss.png)

## Related documentation

- [`BusinessCalendar`](../business-calendar/BusinessCalendar.md)
- [`business_schedule`](../business-calendar/business-schedule.md)
- [`day_of_week`](../calendar/day-of-week.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessSchedule.is_business_day)
