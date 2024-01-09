---
id: use-plugins
title: How to use plug-ins
sidebar_label: Use plug-ins
---

There are many ways to customize either the Deephaven build or packages to fit your use-cases. In this guide, we extend Deephaven to build a custom Docker image with JS plug-ins installed. For this guide, we will add the `js-plugin-matplotlib`. This makes the popular [Matplotlib](https://matplotlib.org/) library available for use, providing more data visualization options within the Deephaven IDE, such as 3D plots and sophisticated scatter plots. As always, you'll be able to plot both your static and real-time data.

:::note

In some cases, you'll want to install packages rather than use plug-ins. Those instructions are covered in [How to install packages](./install-packages.md).

To have _complete control_ of the build process, you can can [Build and launch Deephaven from source code](./launch-build.md).

:::

## Extend Deephaven

First, follow the [Launch Deephaven from pre-built images](../tutorials/docker-install.md) steps from the Docker install guide.

To open a Python session, run:

```bash
compose_file=https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples/base/docker-compose.yml
curl  -O "${compose_file}"
```

Once you have the `docker-compose.yml` file pulled down, define your own web Docker image in `web/Dockerfile` that includes the plug-ins you would like to use.

1. Create the subdirectory `web` in the same folder as your `docker-compose.yml`:
   `mkdir web`
2. Create the `Dockerfile` for web and open for editing:
   `vi web/Dockerfile`
3. Paste the following into the `web/Dockerfile` and save:

   ```bash
   # Pull the web-plugin-packager image
   FROM ghcr.io/deephaven/web-plugin-packager:main as build

   # Specify the plugins you wish to use. You can specify multiple plugins separated by a space, and optionally include the version number, e.g.
   # RUN ./pack-plugins.sh <js-plugin-name>[@version] ...
   # For a list of published plugins, see https://www.npmjs.com/search?q=keywords%3Adeephaven-js-plugin

   # Here is how you would install the matplotlib and table-example plugins
   RUN ./pack-plugins.sh @deephaven/js-plugin-matplotlib @deephaven/js-plugin-table-example

   # Copy the packaged plugins over
   FROM ghcr.io/deephaven/web:${VERSION:-latest}
   COPY --from=build js-plugins/ /usr/share/nginx/html/js-plugins/
   ```

Many plug-ins will also require a server side component. To define the plug-ins used on the server, create a `server/Dockerfile` similar to above:

1. Create subdirectory `server` in the same folder as your `docker-compose.yml`:
   `mkdir server`
2. Create the `Dockerfile` for server and open for editing:
   `vi server/Dockerfile`
3. Paste the following into the `server/Dockerfile` and save:

   ```bash
   FROM ghcr.io/deephaven/server:${VERSION:-latest}
   # pip install any of the plugins required on the server
   RUN pip install deephaven-plugin-matplotlib
   ```

After building, you need to update your `docker-compose` file to specify using that build. Modify the existing `docker-compose.yml` file and replace the web and server definitions with the following:

```yaml
services:
  server:
    # Comment out the image name
    # image: ghcr.io/deephaven/server:${VERSION:-latest}
    # Build from your local Dockerfile you just created
    build: ./server

    ...

  web:
    # Comment out the image name
    # image: ghcr.io/deephaven/web:${VERSION:-latest}
    # Build from your local Dockerfile you just created
    build: ./web
```

When you're done, your directory structure should look like:

```
.
├── docker-compose.yml
├── server
│   └── Dockerfile
└── web
    └── Dockerfile
```

Everything's ready to go! Now you just need to run `docker compose up` as normal, and you will be using your custom image with your JS plugins installed.

## Related documentation

- [Access your file system with Docker data volumes](../conceptual/docker-data-volumes.md)
- [Build and launch Deephaven from source code](./launch-build.md)
- [How to install packages](./install-packages.md)
- [Launch Deephaven from pre-built images](../tutorials/docker-install.md)
