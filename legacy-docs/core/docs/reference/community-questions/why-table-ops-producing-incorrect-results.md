---
id: why-table-ops-producing-incorrect-results
title: Why are my table operations producing incorrect results?
sidebar_label: Why are my table operations producing incorrect results?
---

<em>My query uses table operations that produce incorrect results. What's going on?</em>

<p></p>

The most common reason for "incorrect" calculations in tables is due to the use of formula columns in non-determinstic operations. The table operations [`view`](../table-operations/select/view.md) and [`update_view`](../table-operations/select/update-view.md) create a formula column, rather than an in-memory column. A formula column stores the _formula_ used to calculate the values in it rather than the results themselves. The calculation is performed on demand whenever its needed. Thus, if a formula column is used in a downstream operation that is non-deterministic, the results are undefined. For instance, this will produce undefined results:

```python should-fail
from deephaven import empty_table

t = empty_table(10).update_view(["X = randomInt(0, 10)"])
t2 = t.update(["Y = X + 1"])
```

:::note

These FAQ pages contain answers to questions about Deephaven Community Core that our users have asked in our [Community Slack](https://deephaven.io/slack). If you have a question that is not in our documentation, [join our Community](https://deephaven.io/slack) and we'll be happy to help!

:::