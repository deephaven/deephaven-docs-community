---
id: previous-business-day
title: previous_business_day
---

The `previous_business_day` method returns the last business day before the given `date`.

## Syntax

```
BusinessCalendar.previous_business_day(date: str) -> str
```

## Parameters

<ParamTable>
<Param name="date" type="str">

The date of interest, in "yyyy-MM-dd" format.

</Param>
</ParamTable>

## Returns

The last business day before the given `date`.

## Examples

The following example creates a [`BusinessCalendar`](./BusinessCalendar.md) and then prints the results of a `previous_business_day` method call.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

friday = "2023-01-27"

print(my_cal.previous_business_day(friday))
```

## Related documentation

- [`BusinessCalendar`](./BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar.previous_business_day)
