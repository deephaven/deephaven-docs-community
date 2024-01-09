---
id: calendar-names
title: calendar_names
---

The `calendar_names` method returns the names of all available calendars.

## Syntax

```
calendar.calendar_names() -> list[str]
```

## Parameters

This method takes no arguments.

## Returns

The names of all available calendars.

## Examples

The following example imports the [calendar module](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#module-deephaven.calendar) and then prints the result of `calendar_names`.

```python skip-test
from deephaven import calendar as dhcal

print(dhcal.calendar_names())
```

## Related documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.calendar_names)
