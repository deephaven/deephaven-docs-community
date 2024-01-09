---
id: install-python-packages
title: How to install Python packages
sidebar_label: Install Python packages
---

This guide discusses how to install Python packages for use with Deephaven. Packages can either be installed for one-time use in a Deephaven instance, or packages can be added to the Deephaven Docker images so that they are available every time Deephaven is launched.

Deephaven has several Docker images available pre-built for AI in Python. Refer to the [choose a deployment](https://deephaven.io/core/docs/tutorials/quickstart/#choose-a-deployment) section of the [quickstart](https://deephaven.io/core/docs/tutorials/quickstart/) guide to see what's currently available.

Once a package is installed, it can be imported and used like any other Python package. For an index of available Python packages and for more information on Python packages, visit the [Python Package Index](https://pypi.org/) or check out our [choosing the right Python package](../reference/cheat-sheets/choose-python-packages.md) cheat sheet.

## List all available Python packages

The packages available to Python can be listed by using Python's `help` function. To see a list of all available Python packages, run the following command from a Python session.

```python
help("modules")
```

## Install packages from within a Python script

Python packages can be installed using [`pip`](https://www.datacamp.com/community/tutorials/python-install-pip) from within a Python script or from within the Deephaven Python console.

:::warning

If this method is used with Deephaven Docker images, Python package installs do not persist after the Docker container exits. The package installation must be repeated each time the container is started.

:::

Run the following command:

```python
import os

os.system("pip install package_name")
```

In this example, we install the Python Pendulum package, import the package, and use it to print the current time in Paris.

```python
import os

os.system("pip install Pendulum")

import pendulum

now = pendulum.now("Europe/Paris")

print(now)
```

Now you can use any [`pip`](https://www.datacamp.com/community/tutorials/python-install-pip) installed Python package with Deephaven.

## Install packages in a running Docker container from the command line

Python packages can be installed using [`pip`](https://www.datacamp.com/community/tutorials/python-install-pip) via [`docker exec`](https://docs.docker.com/engine/reference/commandline/exec/).

:::warning

If this method is used with Deephaven Docker images, Python package installs do not persist after the Docker container exits. The package installation must be repeated each time the container is started.

:::

Here [`docker exec`](https://docs.docker.com/engine/reference/commandline/exec/) is used to run a [`pip`](https://www.datacamp.com/community/tutorials/python-install-pip) install on the running Deephaven Docker image, which is named `core_server_1`.

```shell
docker compose exec server pip install Pendulum
```

After installing the Pendulum package, we can use it within our script to print the current time in Paris.

```python
import pendulum

now = pendulum.now("Europe/Paris")

print(now)
```

## Add packages to a custom Docker image

In this section, we add the same Pendulum package from the previous section to a custom Dockerfile and reference it from Deephaven so that we can use it in more than one session.

In order to use packages more than once, you can create a custom Docker image, and then use that image in Deephaven. The steps for accomplishing this differ slightly depending on how you launch Deephaven. Let's start with the steps that are common between both.

### Prerequisites

Before a custom Docker image can be built, you must acquire the necessary base images. This process differs based upon how you launch Deephaven:

- If you [launch from pre-built images](../tutorials/docker-install.md), ensure you have run the following command to download the necessary base images:

```shell
docker compose pull
```

- If you [launch from source code](./launch-build.md), ensure you have built the project so that you have the necessary base images.

### Create a custom Dockerfile

To begin with, create a new directory. This directory should not be in a Deephaven deployment directory. You can name it whatever you'd like. For this guide, we'll name ours `deephaven-custom`.

```shell
mkdir deephaven-custom
cd deephaven-custom
```

Now, in this directory, create a file called `Dockerfile`. `Dockerfile` should use `ghcr.io/deephaven/server` as the base image and should contain a recipe for installing the new package. When adding Pendulum, it looks like this:

```
FROM ghcr.io/deephaven/server
RUN pip3 install pendulum
```

### Create a custom Docker image

Now that we have the `Dockerfile` in place, we need to create the custom Docker image. To do so, run a command from the directory with `Dockerfile` that looks like:

```shell
docker build --tag <user>/server-<custom> .
```

This will create a new Docker image called `<user>/server-<custom>`. For this guide, we will call the image `guide/server-pendulum`:

```shell
docker build --tag guide/server-pendulum .
```

When the command finishes running, you can see the new image in your system:

```shell
docker image ls
```

### Reference the new image

To put it all together, we now need to reference this new image in the `docker-compose` file we use to launch Deephaven. The file name depends on how you build and launch Deephaven:

- If you [launch from pre-built images](../tutorials/docker-install.md), the file is `docker-compose.yml`, and can be found in your `deephaven-deployment` directory.

- If you [launch from source code](./launch-build.md), the file is `docker-compose-common.yml` , and can be found in your `deephaven-core` directory.

In The Docker Compose file, there are three lines of text that look like:

```
services:
  server:
    image: <IMAGE_NAME>
```

The image used by default depends on how you build and launch Deephaven. Regardless, this line is where you need to insert your custom image name. Modify the `image` line to use your new image:

```
services:
  server:
    image: guide/server-pendulum:latest
```

Now, when you launch Deephaven again, you can use the package!

:::caution

When base images are updated by rebuilding source code or redownloading pre-built images, custom images must be rebuilt to incorporate the base image changes.

:::

## Related documentation

- [How to install packages](./install-packages.md)
- [Choose Python packages to install](../reference/cheat-sheets/choose-python-packages.md)
- [Launch Deephaven from pre-built images](../tutorials/docker-install.md)
- [Build and launch Deephaven from source code](./launch-build.md)
- [How to use Python packages in query strings](./use-python-packages.md)
- [Access your file system with Docker data volumes](../conceptual/docker-data-volumes.md)
