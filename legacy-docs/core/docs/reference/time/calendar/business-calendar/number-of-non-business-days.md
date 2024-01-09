---
id: number-of-non-business-days
title: number_of_non_business_days
---

The `number_of_non_business_days` method returns the number of non-business days between the supplied `start` and `end` dates.

## Syntax

```
BusinessCalendar.number_of_non_business_days(start: str, end: str, end_inclusive: bool = False) -> int
```

## Parameters

<ParamTable>
<Param name="start" type="str">

The start day of the range.

</Param>
<Param name="end" type="str">

The end day of the range.

</Param>
<Param name="end_inclusive" type="bool">

Whether to include the end date. The default is `False`, which will exclude the end date.

</Param>
</ParamTable>

## Returns

The number of non-business days between the supplied `start` and `end` dates.

## Examples

The following example creates a `BusinessCalendar` and prints the result of `number_of_non_business_days`.

```python skip-test
from deephaven import calendar as dhcal

my_cal = dhcal.BusinessCalendar("USNY")

print(my_cal.number_of_non_business_days(start="2023-02-01", end="2023-02-08"))
```

## Related documentation

- [`BusinessCalendar`](./BusinessCalendar.md)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.BusinessCalendar.number_of_non_business_days)
