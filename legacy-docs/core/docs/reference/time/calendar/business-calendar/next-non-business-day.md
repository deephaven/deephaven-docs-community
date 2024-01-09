---
id: next-non-business-day
title: next_non_business_day
---

The `next_non_business_day` method returns the next non-business day after the given date.

## Syntax

```
BusinessCalendar.next_non_business_day(date: str) -> str
```

## Parameters

<ParamTable>
<Param name="date" type="str">

The date of interest. Must be in the format "yyyy-MM-dd".

</Param>
</ParamTable>

## Returns

A string representing the next non-business day after the given date.

## Examples

The following example creates a [`BusinessCalendar`](./BusinessCalendar.md) and then prints the results of three `next_non_business_day` method calls - one each from a Friday, Sunday, and Monday.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

friday = "2023-01-27"
sunday = "2023-01-29"
tuesday = "2023-01-31"

print("Current day: ", my_cal.day_of_week(friday), friday, " | Next non-business day: ", my_cal.next_non_business_day(friday))
print("Current day: ", my_cal.day_of_week(sunday), sunday, " | Next non-business day: ", my_cal.next_non_business_day(sunday))
print("Current day: ", my_cal.day_of_week(tuesday), tuesday, " | Next non-business day: ", my_cal.next_non_business_day(tuesday))
```

## Related documentation

- [`BusinessCalendar`](./BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar.next_non_business_day)
