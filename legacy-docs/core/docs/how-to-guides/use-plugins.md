---
id: use-plugins
title: How to use plug-ins
sidebar_label: Use plug-ins
---

There are many ways to customize either the Deephaven build or packages to fit your use cases. In this guide, we extend Deephaven to build a custom Docker image with JavaScript (JS) plug-ins installed. For this guide, we will add Deephaven's JS [Matplotlib](https://matplotlib.org/) plugin `js-plugin-matplotlib`. This makes Python's [Matplotlib](https://matplotlib.org/) library available for use, providing more data visualization options within the Deephaven IDE, such as 3D plots and sophisticated scatter plots. As always, you'll be able to plot both your static and real-time data.

:::note

In some cases, you'll want to install packages rather than use plug-ins. Those instructions are covered in [How to install packages](./install-packages.md).

To have _complete control_ of the build process, you can can [Build and launch Deephaven from source code](./launch-build.md).

:::

## Extend Deephaven

In order to extend Deephaven, you'll need to extend Deephaven's server Docker image. Start by following the tutorial to [Launch Deephaven from pre-built images](../tutorials/docker-install.md).

Once you've completed the necessary steps in the tutorial, you can extend Deephaven. First, modify the `docker-compose.yml` file. The file, by default, has the following code block:

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

This tells the `docker-compose.yml` file, instead of building the server container from the image on the web, to build it from the instructions in the `server` folder. It follows that we need to create a `server` folder.

```shell
mkdir server
cd server
```

The `server` folder needs to have two files: a `Dockerfile`, which sets forth the rules to build the server container, and `deephaven.prop`, which sets some Deephaven properties, including one for plugin support.

Let's start with the `Dockerfile`:

:::note

In the following Dockerfile, we install Deephaven's matplotlib JavaScript plugin to enable matplotlib support in Deephaven. If you wish to install a different plugin, change the plugin name.

:::

```
# syntax=docker/dockerfile:1.4

FROM ghcr.io/deephaven/web-plugin-packager:latest as build
# Change the plugin on the next line if you wish to install a different one
RUN ./pack-plugins.sh @deephaven/js-plugin-matplotlib

FROM ghcr.io/deephaven/server:latest
# Change the following pip install to install the packages your plugin supports
RUN pip install --no-cache-dir deephaven-plugin-matplotlib matplotlib
COPY --link --from=build js-plugins /opt/deephaven/config/js-plugins/
```

With this done, the directory structure will look like:

```
.
├── docker-compose.yml
├── server
│   └── Dockerfile
```

Everything's ready to go! Now you just need to run `docker compose up --build` as normal, and you will be using your custom image with your JS plug-ins installed.

```shell
cd ..
docker compose up --build
```

## Example

In this guide, we added the `js-plugin-matplotlib` plug-in so we can now use Matplotlib inside the IDE. Try the following query:

```python skip-test
import matplotlib.pyplot as plt
x = [0, 2, 4, 6]
y = [1, 3, 4, 8]
plot, axes = plt.subplots()

axes.xlabel('x values')
axes.ylabel('y values')
axes.title('plotted x and y values')
axes.legend(['line 1'])
plt.plot(x, y)
```

![img](../assets/how-to/matplot/plot.png)

## Other examples

There are more plugins than just Deephaven's JS Matplotlib plugin. Check out the following blog post for another example:

- [Bidirectional plugins blog](/blog/2023/09/29/bidirectional-plugins/)

## Related documentation

- [How to use Matplotlib and Seaborn](./plotting/matplot.md)
- [Access your file system with Docker data volumes](../conceptual/docker-data-volumes.md)
- [Build and launch Deephaven from source code](./launch-build.md)
- [How to install packages](./install-packages.md)
- [How to use Python packages in query strings](./use-python-packages.md)
- [Launch Deephaven from pre-built images](../tutorials/docker-install.md)
