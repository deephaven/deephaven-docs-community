---
id: how-do-i-get-data-out-of-a-deephaven-table-py
title: How do I get data out of a Deephaven table?
sidebar_label: How do I get data out of a table?
---

Extracting data from tables is typically done via the [deephaven.numpy](https://deephaven.io/core/pydoc/code/deephaven.numpy.html#module-deephaven.numpy) or [deephaven.pandas](https://deephaven.io/core/pydoc/code/deephaven.pandas.html#module-deephaven.pandas) modules.

Here's an example:

```python order=null
from deephaven.numpy import to_numpy
from deephaven.pandas import to_pandas
from deephaven import empty_table

table = empty_table(10).update(["X=ii", "Y=sqrt(X)"])

table_column_x_np = to_numpy(table, cols=["X"]).flatten()

print(table_column_x_np)

table_column_x_pd = to_pandas(table, cols=["X"])

print(table_column_x_pd)
```

:::note

These FAQ pages contain answers to questions about Deephaven Community Core that our users have asked in our [Community Slack](https://deephaven.io/slack). If you have a question that is not in our documentation, [join our Community](https://deephaven.io/slack) and we'll be happy to help!

:::