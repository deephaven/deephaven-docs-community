---
id: business-time-elapsed
title: business_time_elapsed
---

The `business_time_elapsed` method returns the amount of business time in nanoseconds that has elapsed on the given day by the specified time.

## Syntax

```python syntax
BusinessSchedule.business_time_elapsed(time: Instant) -> int
```

## Parameters

<ParamTable>
<Param name="time" type="Instant">

The time to measure for business time elapsed. Must be in [date-time](../../../query-language/types/date-time.md) format.

</Param>
</ParamTable>

## Returns

The amount of business time in nanoseconds that has elapsed on the given day by the specified time.

## Examples

The following example creates a [`BusinessSchedule`](../business-calendar/business-schedule.md), sets a `time`, and then prints the result of a call to `business_time_elapsed`.

```python skip-test
from deephaven import calendar as dhcal
from deephaven.time import parse_instant

biz_schedule = dhcal.BusinessCalendar("USNY").business_schedule("2023-05-03")

time = parse_instant("2023-05-25T14:00:00 ET")

print(biz_schedule.business_time_elapsed(time))
```

## Related documentation

- [`BusinessCalendar`](../business-calendar/BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessSchedule.business_time_elapsed)
