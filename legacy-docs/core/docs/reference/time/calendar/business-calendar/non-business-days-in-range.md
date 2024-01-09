---
id: non-business-days-in-range
title: non_business_days_in_range
---

The `non_business_days_in_range` returns all the non-business days between the specified `start` and `end` dates.

## Syntax

```python syntax
BusinessCalendar.non_business_days_in_range(start: str, end: str) -> list[str]
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

The non-business days between the specified `start` and `end` dates.

## Examples

The following example creates a `BusinessCalendar` and prints the result of `non_business_days_in_range`.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

print(my_cal.non_business_days_in_range(start="2023-02-01", end="2023-02-08"))
```

## Related documentation

- [`BusinessCalendar`](./BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar.non_business_days_in_range)
