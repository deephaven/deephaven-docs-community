---
id: default-calendar-name
title: default_calendar_name
---

The `default_calendar_name` method returns the default calendar name, which is set by the `Calendar.default` property in the configuration file with which the Deephaven server is started.

## Syntax

```
calendar.default_calendar_name() -> str
```

## Parameters

This method takes no arguments.

## Returns

A list of strings with a comma separating open and close times.

## Examples

The following example imports the [calendar module](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#module-deephaven.calendar) and then prints the result of `default_calendar_name`.

```python skip-test
from deephaven import calendar as dhcal

print(dhcal.default_calendar_name())
```

## Related documentation

- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.calendar.html#deephaven.calendar.default_calendar_name)
