---
id: is-last-business-day-of-month
title: is_last_business_day_of_month
---

The `is_last_business_day_of_month` method returns a boolean value that is `true` if the specified date is the last business day of the month.

## Syntax

```
BusinessCalendar.is_last_business_day_of_month(date: str) -> bool
```

## Parameters

<ParamTable>
<Param name="date" type="str">

The date of interest. Format must be "yyyy-MM-dd".

</Param>
</ParamTable>

## Returns

A boolean. The value is `true` if the specified date is the last business day of the month, and `false` otherwise.

## Examples

The following example creates a [`BusinessCalendar`](./BusinessCalendar.md) and then prints the results of two `is_last_business_day_of_month` calls.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

print(my_cal.is_last_business_day_of_month("2023-01-27"))
print(my_cal.is_last_business_day_of_month("2023-01-31"))
```

## Related documentation

- [`BusinessCalendar`](./BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar.is_last_business_day_of_month)
