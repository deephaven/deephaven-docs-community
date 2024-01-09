---
id: use-python-packages
title: How to use Python packages
sidebar_label: Use Python packages
---

This guide discusses how to use Python packages with Deephaven. To learn how to install these packages, see our guide [How to install Python packages](./install-python-packages.md).

Once a package is installed, it can be imported and used like any other Python package. For an index of available Python packages and for more information on Python packages, visit the [Python Package Index](https://pypi.org/) and our [Choose Python packages](../reference/cheat-sheets/choose-python-packages.md) cheat sheet.

## Use packages in query strings

Installed Python packages can be used in query strings. Let's use the Pendulum package, which we installed in the guide [How to install Python packages](./install-python-packages.md).

```python syntax
import pendulum
from deephaven import time_table

def get_paris_time():
    return pendulum.now("Europe/Paris")

times_in_paris = time_table("PT5S").update(formulas=["Paris = get_paris_time()"])
```

<LoopedVideo src={require('../assets/how-to/pendulum_timeTableExample.mp4')} />

## Related documentation

- [Create a time table](./time-table.md)
- [How to install Python packages](./install-python-packages.md)
- [How to choose the right Python packages](../reference/cheat-sheets/choose-python-packages.md)
