---
id: next-day
title: next_day
---

The `next_day` method returns the day after a given date.

## Syntax

```
BusinessCalendar.next_day(date: str) -> str
```

## Parameters

<ParamTable>
<Param name="date" type="str">

The date of interest. Format must be "yyyy-MM-dd".

</Param>
</ParamTable>

## Returns

The day after a given date.

## Examples

The following example creates a [`BusinessCalendar`](../business-calendar/BusinessCalendar.md) and then prints the results of a `next_day` method call.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

friday = "2023-01-27"

print(my_cal.next_day(friday))
```

## Related documentation

- [`BusinessCalendar`](../business-calendar/BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.Calendar.next_day)
