---
id: extract-table-value
title: How to extract values from tables
sidebar_label: Extract table values
---

Deephaven's tables are a powerful tool for data analysis - but sometimes queries require data to be analyzed outside of a table. This guide will show how to extract arrays and values from Deephaven tables into more traditional Python objects.

## NumPy

There are two ways to extract data from Deephaven into [NumPy](https://numpy.org/): [`deephaven.numpy`](./use-numpy.md#tables-to-and-from-numpy-arrays) and [`deephaven.learn`](./use-numpy.md#deephavenlearn).

:::note
When converting from tables to NumPy arrays, it's recommended to use table operations to only copy the data necessary. Copying substantially large arrays to and from Deephaven and NumPy can be memory intensive and slow.
:::

### deephaven.numpy

The Deephaven Python module has a NumPy submodule that allows users to transfer table data to and from [NumPy arrays](https://numpy.org/doc/stable/reference/generated/numpy.ndarray.html) with ease. The example below creates a table, extracts a column to NumPy, applies some arithmetic, and then converts that back to a second table.

```python order=source,result
from deephaven import numpy as dhnp
from deephaven import empty_table
import numpy as np

source = empty_table(20).update(formulas=["Y = randomInt(1, 100)"])

np_y = dhnp.to_numpy(source.view(formulas=["Y"]))

np_y2 = np.sort(a=np_y, axis=0)

result = dhnp.to_table(np_array=np_y2, cols=["Y2"])
```

### deephaven.learn

[`deephaven.learn`](./use-deephaven-learn.md) facilitates the transfer of data to and from Deephaven tables and NumPy arrays in both static and real-time workflows. Its main application is for machine learning, but can be used to perform analysis that is difficult to implement with standard table operations. The example below smooths a noisy signal using NumPy and `deephaven.learn`.

```python order=source,result
from deephaven.plot.figure import Figure
from deephaven.learn import gather
from deephaven import empty_table
from deephaven import learn
import numpy as np

source = empty_table(25).update(["X = 0.2 * i", "Y = 2 * sin(X) + randomDouble(-1, 1)"])

source_plot = Figure().plot_xy(series_name="Noisy data", t=source, x="X", y="Y").show()

def table_to_numpy_double(rows, columns):
    return gather.table_to_numpy_2d(rows, columns, np_type = np.double)

def numpy_to_table(data, index):
    return data[index]

def polynomial_fit(data):
    x = data[:, 0]
    y = data[:, 1]
    poly_order = 3
    z = np.polyfit(x, y, poly_order)
    p = np.poly1d(z)
    return p(x)

result = learn.learn(
    table=source,
    model_func=polynomial_fit,
    inputs=[learn.Input(col_names=["X", "Y"], gather_func=table_to_numpy_double)],
    outputs=[learn.Output(col_name="Z", scatter_func=numpy_to_table, col_type="double")],
    batch_size=source.size
)

result_plot = Figure().plot_xy(series_name="Smoothed data", t=result, x="X", y="Z").show()
```

## pandas

A [pandas DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) is similar to a Deephaven table - a column-oriented tabular data structure. So, of course, there are ways to convert to and from [pandas](https://pandas.pydata.org/) and Deephaven. Deephaven's [pandas](./use-pandas.md) module makes it easy.

```python order=source,result
from deephaven import pandas as dhpd
from deephaven import empty_table
import pandas as pd

source = empty_table(20).update(["X = i", "Y = randomInt(1, 100)"])

df_source = dhpd.to_pandas(table=source)

df_source = df_source[::-1]

result = dhpd.to_table(df=df_source)
```

## Related Documentation

- [How to use NumPy in Deephaven](./use-numpy.md)
- [How to use pandas in Deephaven](./use-pandas.md)
- [`empty_table`](../reference/table-operations/create/emptyTable.md)
- [`update`](../reference/table-operations/select/update.md)
- [`to_pandas`](../reference/pandas/to-pandas.md)
- [deephaven.numpy](https://deephaven.io/core/pydoc/code/deephaven.numpy.html#module-deephaven.numpy)
- [deephaven.pandas](https://deephaven.io/core/pydoc/code/deephaven.pandas.html#module-deephaven.pandas)