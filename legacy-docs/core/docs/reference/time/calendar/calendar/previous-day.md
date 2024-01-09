---
id: previous-day
title: previous_day
---

The `previous_day` method returns the last day before the given `date`.

## Syntax

```
BusinessCalendar.previous_day(date: str) -> str
```

## Parameters

<ParamTable>
<Param name="date" type="str">

The date of interest, in "yyyy-MM-dd" format.

</Param>
</ParamTable>

## Returns

The last day before the given `date`.

## Examples

The following example creates a [`BusinessCalendar`](../business-calendar/BusinessCalendar.md) and then prints the results of a `previous_day` method call.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

friday = "2023-01-27"

print(my_cal.previous_day(friday))
```

## Related documentation

- [`BusinessCalendar`](../business-calendar/BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.Calendar.previous_day)
