---
id: periods
title: Periods
---

Periods are a special type of string used to represent a period of calendar time (i.e. days, weeks, months, years, etc.).

## Syntax

`[-]PnYnMnWnD`

- `[-]` - An optional sign to indicate that the period is negative. Omitting this makes the period positive.
- `P` - The prefix indicating this is a period string.
- `n` - An integer value
- `Y` - Years
- `M` - Months
- `W` - Weeks
- `D` - Days

Each `#[Y|M|W|D]` value translates to a part of the time period. A valid period string can contain nearly any combination of these values. For example, `P1M1D` (1 month and 1 day), `P1Y3M` (1 year and 3 months), and `P3W2D` (3 weeks and 2 days) are all valid period strings.

## Example

<!--

The following example uses `to_j_period` to convert period strings to period objects.

```python
from deephaven.time import to_j_period

one_year = to_j_period("P1Y")
one_year_five_months = to_j_period("P1Y5M")
five_months_ten_days = to_j_period("P5M10D")

print(one_year)
print(one_year_five_months)
print(five_months_ten_days)
```

The following example uses `plus_period` to add periods to an instant.
The following example uses `plus_period` to add periods to an instant.

```python
from deephaven.time import parse_period, parse_instant, plus_period

date_time = parse_instant("2020-01-01T00:00:00 ET")
period_positive = parse_period("P1D")
period_negative = parse_period("-P1W1D")

print(plus_period(date_time, period_positive))
print(plus_period(date_time, period_negative))
```
-->

## Related Documentation

- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [`date-time`](./date-time.md)
- [Javadoc](https://deephaven.io/core/javadoc/io/deephaven/time/Period.html)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.dtypes.html?highlight=period#deephaven.dtypes.Period)
