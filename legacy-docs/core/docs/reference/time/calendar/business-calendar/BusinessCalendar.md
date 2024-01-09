---
id: BusinessCalendar
title: BusinessCalendar
---

The `BusinessCalendar` method creates a `BusinessCalendar`.

`BusinessCalendar` implements `Calendar`, so the methods from `Calendar` can also be called via this class. These methods are:

- [`current_day`](../calendar/current-day.md)
- [`day_of_week`](../calendar/day-of-week.md)
- [`days_in_range`](../calendar/days-in-range.md)
- [`next_day`](../calendar/next-day.md)
- [`number_of_days`](../calendar/number-of-days.md)
- [`previous_day`](../calendar/previous-day.md)

## Syntax

```
BusinessCalendar(name: str = None) -> BusinessCalendar
```

## Parameters

<ParamTable>
<Param name="name" type="str">

The name of the calendar. If `None`, the [default](../default-calendar-name.md) will be used.
Use [`calendar_names`](../calendar-names.md) to view all available Calendar names.

</Param>
</ParamTable>

## Returns

A [`BusinessCalendar`](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar).

## Examples

In this example, [`calendar_names`](../calendar-names.md) is called to print the available options. Then a new `BusinessCalendar` is created.

```python skip-test
from deephaven import calendar as dhcal

print(dhcal.calendar_names())

my_cal = dhcal.BusinessCalendar("USNY")
```

## Related documentation

- [`calendar_names`](../calendar-names.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar)
