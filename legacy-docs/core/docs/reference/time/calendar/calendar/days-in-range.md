---
id: days-in-range
title: days_in_range
---

The `days_in_range` method returns the days between the specified start and end dates.

:::note
`days_in_range` includes both business days and non-business days when called from a [`BusinessCalendar`](../business-calendar/BusinessCalendar.md).
:::

## Syntax

```
days_in_range(start: str, end: str) -> list[str]
```

## Parameters

<ParamTable>
<Param name="start" type="str">

The start day of the range. Use "yyyy-MM-dd" format.

</Param>
<Param name="end" type="str">

The end day of the range. Use "yyyy-MM-dd" format.

</Param>
</ParamTable>

## Returns

A list of the days within the range.

## Examples

The following example creates a `BusinessCalendar` and prints the result of `days_in_range`.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

print(my_cal.days_in_range(start="2023-02-01", end="2023-02-08"))
```

## Related documentation

- [`BusinessCalendar`](../business-calendar/BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.Calendar.days_in_range)
