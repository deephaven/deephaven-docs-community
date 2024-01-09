---
id: business-days-in-range
title: business_days_in_range
---

The `business_days_in_range` method returns the business days between the specified start and end dates.

## Syntax

```
BusinessCalendar.business_days_in_range(start: str, end: str) -> list[str]
```

## Parameters

<ParamTable>
<Param name="start" type="str">

The start day of the range.

</Param>
<Param name="end" type="str">

The end day of the range.

</Param>
</ParamTable>

## Returns

The business days between the start and end dates, as a list of dates in "yyyy-MM-dd" format.

## Examples

The following example creates a `BusinessCalendar` and prints the result of `business_days_in_range`.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

print(my_cal.business_days_in_range(start="2023-02-01", end="2023-02-08"))
```

## Related documentation

- [`BusinessCalendar`](./BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar.business_days_in_range)
