---
id: possible-to-convert-columns-to-json
title: Is it possible to convert one or more columns of a Deephaven table to JSON?
sidebar_label: Is it possible to convert one or more columns of a Deephaven table to JSON?
---

Yes, you can use [NumPy](https://numpy.org) to do so. Convert the column(s) to NumPy arrays via [`deephaven.numpy.to_numpy`](https://deephaven.io/core/pydoc/code/deephaven.numpy.html#deephaven.numpy.to_numpy), then with [json.JSONEncoder](https://docs.python.org/3/library/json.html). For more information on NumPy and JSON for this use case, see [here](https://pynative.com/python-serialize-numpy-ndarray-into-json/).

:::note

These FAQ pages contain answers to questions about Deephaven Community Core that our users have asked in our [Community Slack](https://deephaven.io/slack). If you have a question that is not in our documentation, [join our Community](https://deephaven.io/slack) and we'll be happy to help!

:::
