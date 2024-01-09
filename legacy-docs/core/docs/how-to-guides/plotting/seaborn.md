---
id: seaborn
title: How to use Seaborn
sidebar_label: Use Seaborn
---

This guide shows you how to use [Seaborn](https://seaborn.pydata.org/) (a relative of [Matplotlib](https://matplotlib.org/)) to create plots.

By default, Deephaven does not come with Matplotlib or Seaborn, so you can either use our [Deephaven+Matplotlib base repository](https://github.com/deephaven-examples/deephaven-matplotlib-base) or extend the Deephaven Dockerized set up. Both options are documented below.

## Quickstart

To get up and running with Matplotlib, clone the [Deephaven+Matplotlib base repo](https://github.com/deephaven-examples/deephaven-matplotlib-base), enter its directory, and then run `docker compose up -d ` as usual:

```shell
git clone https://github.com/deephaven-examples/deephaven-matplotlib-base.git
cd deephaven-matplotlib-base
docker compose pull
docker compose up  --build -d
```

This starts the Deephaven IDE with the dependencies needed for Seaborn. All that's left is to [install Seaborn](/core/docs/how-to-guides/install-python-packages/).

I'll install Seaborn in the [IDE](http://localhost:10000/ide).

```python skip-test
import os
os.system("pip3 install seaborn")
```

## Extend Deephaven

If instead you wish to extend the Deephaven build, start by following the tutorial to [Launch Deephaven from pre-built images](../../tutorials/docker-install.md).

Once you've completed the steps in the tutorial, you can extend Deephaven. The Deephaven deployment typically only comes with a `docker-compose.yml` file. This file will need one modification to the following code block:

```yaml
services:
  deephaven:
    image: ghcr.io/deephaven/server:latest
```

This needs to be changed to:

```yaml
services:
  deephaven:
    build: ./server
```

Once that's done, you'll need to create a new directory called `server`, from which `docker compose` will build the necessary Docker image and dependencies.

```shell
mkdir server
cd server
```

The `server` folder will contain a `Dockerfile`. The `Dockerfile` defines how the Deephaven server image will be extended for matplotlib support.

Here's what `Dockerfile` should look like:

```
# syntax=docker/dockerfile:1.4

FROM ghcr.io/deephaven/web-plugin-packager:latest as build
RUN ./pack-plugins.sh @deephaven/js-plugin-matplotlib

FROM ghcr.io/deephaven/server:latest
RUN pip install --no-cache-dir deephaven-plugin-matplotlib matplotlib seaborn
COPY --link --from=build js-plugins /opt/deephaven/config/js-plugins/
```

Everything's ready to go! The following shell commands will spin up Deephaven with matplotlib, plotly, and seaborn support:

```shell
cd ..
docker compose up --build
```

## Seaborn example

:::caution

All examples in this guide use [Matplotlib's explicit interface](https://matplotlib.org/stable/users/explain/figure/api_interfaces.html#api-interfaces). Users should do the same, especially in examples where there are multiple plots that source data from ticking tables.

:::

Here is the basic usage of Seaborn to show one figure:

```python skip-test
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd


x = [0, 2, 4, 6]
y = [1, 3, 4, 8]
df = pd.DataFrame({"X": x, "Y": y})
m_figure, m_axes = plt.subplots()
sns.lineplot(data=df, x="X", y="Y", ax=m_axes)
m_axes.set_xlabel('x values')
m_axes.set_ylabel('y values')
m_axes.set_title('plotted x and y values')
m_axes.legend(['line 1'])
```

![img](../../assets/how-to/seaborn.png)

## Seaborn examples with TableAnimation

Seaborn is designed to plot data from pandas DataFrames. Unlike Matplotlib, we will convert table data to to DataFrames in the `update_fig` function.

### Line plot

```python skip-test
from deephaven.plugin.matplotlib import TableAnimation
from deephaven import pandas as dhpd
from deephaven import time_table

import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Create a ticking table with the cosine function
tt = time_table("PT1S").update(["X = 0.2 * i", "Y = Math.cos(X)"])

fig, ax = plt.subplots() # Create a new figure

# This function updates a figure
def update_fig(data, update):
    # Clear the axes (don't draw over old lines)
    ax.clear()
    # Convert the X and Y columns in `tt` to a DataFrame
    df = dhpd.to_pandas(tt.view(["X", "Y"]))
    # Draw the line plot
    sns.lineplot(df, x="X", y="Y")

# Create our animation. It will listen for updates on `tt` and call `update_fig` whenever there is an update
line_plot_ani = TableAnimation(fig, tt, update_fig)
```

![img](../../assets/how-to/seaborn_line.gif)

### Bar plot

```python skip-test
from deephaven.plugin.matplotlib import TableAnimation
from deephaven import pandas as dhpd
from deephaven import SortDirection
from deephaven import time_table

import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

top_n = 5

# Create a ticking table with the linear function y = x
tt = time_table("PT1S").update(["X = i", "Y = i"])
# Sort `tt` by the top 5 values in the Y column
tt_sorted = tt.sort(order_by=["Y"], order=[SortDirection.DESCENDING])
# Create a table with 5 largest values for the chart
tt_sorted_top = tt_sorted.head(top_n)

fig, ax = plt.subplots()

# This function updates a figure
def update_fig(data, update):
    # Clear the axes (don't draw over old bars)
    ax.clear()
    # Convert the table of top 5 values to a DataFrame
    df = dhpd.to_pandas(tt_sorted_top.view(["X", "Y"]))
    # Draw the barplot
    sns.barplot(df, x="X", y="Y")

# Create our animation. It will listen for updates on `tt` and call `update_fig` whenever there is an update
bar_plot_ani = TableAnimation(fig, tt_sorted_top, update_fig)
```

![img](../../assets/how-to/seaborn_bar.gif)

### Scatter plot

```python skip-test
from deephaven.plugin.matplotlib import TableAnimation
from deephaven import pandas as dhpd
from deephaven import SortDirection
from deephaven import time_table

import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Create a ticking table with random x, y, and z values
tt = time_table("PT2S").update(["X = Math.random()", "Y = Math.random()", "Z = Math.random()*50"])

fig, ax = plt.subplots()

# This function updates a figure
def update_fig(data, update):
    # Clear the axes as to not draw over anything
    ax.clear()
    # Convert the X, Y, and Z columns to a dataframe
    df = dhpd.to_pandas(tt.view(["X", "Y", "Z"])).astype("object")
    # Draw the scatter plot
    sns.scatterplot(df, x="X", y="Y", size="Z")

# Create our animation. It will listen for updates on `tt` and call `update_fig` whenever there is an update
ani = TableAnimation(fig, tt, update_fig)
```

![img](../../assets/how-to/seaborn_scatter.gif)

### Multiple series

```python skip-test
from deephaven.plugin.matplotlib import TableAnimation
from deephaven import pandas as dhpd
from deephaven import SortDirection
from deephaven import time_table

import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Create a ticking table with sine, cosine, and random numbers
tt = time_table("PT1S").update(["X = i", "Y = Math.sin(X)", "Z = Math.cos(X)", "R = Math.random()", "S = Math.random()*50"])

fig, ax = plt.subplots()

# This function updates a figure
def update_fig(data, update):
    # Clear the figure so we don't draw over stuff
    ax.clear()
    # Convert the data columns to a Pandas DataFrame
    df = dhpd.to_pandas(tt.view(["X", "Y", "Z", "R", "S"])).astype("object")
    # Draw two line plots and a scatterplot
    sns.lineplot(df, x="X", y="Y")
    sns.lineplot(df, x="X", y="Z")
    sns.scatterplot(df, x="X", y="R", size="S")

# Create our animation. It will listen for updates on `tt` and call `update_fig` whenever there is an update
ani = TableAnimation(fig, tt, update_fig)
```

![img](../../assets/how-to/seaborn_multipleplots.gif)

## Related documentation

- [How to use Matplotlib](./matplot.md)
- [How to create XY series plots](./xy-series.md)
- [How to create category plots](./category.md)
- [How to create histograms](./category-histogram.md)
- [How to create category histograms](./histogram.md)
- [How to use the Chart Builder](../user-interface/chart-builder.md)
- [How to use plug-ins](../use-plugins.md)
- [How to use matplotlib](./matplot.md)
- [Arrays](../../reference/query-language/types/arrays.md)
