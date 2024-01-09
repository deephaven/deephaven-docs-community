---
id: docker-install
title: Installation guide for Docker
sidebar_label: Advanced Installation for Docker
---

<h2>Install Deephaven from pre-built images</h2>

Deephaven can be downloaded in pre-built Docker images and requires only Docker to run. In this tutorial, you'll learn how to choose a Docker Compose configuration and use it to run Deephaven.

:::note
Developers interested in tinkering with and modifying Deephaven source code should follow the instructions in the [build from source](../how-to-guides/launch-build.md) guide.
:::

## TL;DR

Run Deephaven in Docker with a single command:

```sh
docker run --rm --name deephaven -p 10000:10000 ghcr.io/deephaven/server:latest
```

This default configuration uses a [pre-shared key](../how-to-guides/authentication/auth-psk.md) to authenticate users. For more information, see [authentication](#authentication).

## Customize the deployment

Download Deephaven's default `docker-compose.yml` file:

```bash
curl https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python/base/docker-compose.yml -O
```

This file can be used without any modification to run Deephaven. The following two commands will get you up and running with a randomly generated key to log in:

```bash
docker compose pull
docker compose up
```

Check the Docker logs for the randomly generated key you'll need to access Deephaven. Copy it, head to `http://localhost:10000/ide/`, and enter the key. You're up and running!

To set your own key rather than use a randomly generated one, set the following in the `environment` parameters of the `deephaven` service in `docker-compose.yml`:

`START_OPTS=-Xmx4g -Dauthentication.psk=${DEEPHAVEN_PSK}`

This sets the password as the `DEEPHAVEN_PSK` environment variable. Get started with two commands:

```bash
docker compose pull
DEEPHAVEN_PSK=YourSecretKeyHere docker compose up
```

Enter your secret key (`YourSecretKeyHere`) at `http://localhost:10000/ide/` to start using Deephaven!

For prerequisites, troubleshooting, alternate base images, and what to do next, read on.

## Prerequisites

Building and running Deephaven requires a few software packages.

| Package | Version                       | OS                     |
| ------- | ----------------------------- | ---------------------- |
| docker  | ^20.10.8                      | All                    |
| Windows | 10 (OS build 20262 or higher) | Only Windows           |
| WSL     | 2                             | Only Linux via Windows |

You can check if these packages are installed and functioning by running:

```bash
docker version
docker compose version
docker run hello-world
```

<details>
  <summary>Installing WSL...</summary>

Deephaven can be run natively on Windows, without installing WSL. However, users who want to run Deephaven inside a GNU/Linux environment on a Windows machine will need Windows Subsystem for Linux (WSL) version 2. WSL is not needed on other operating systems.

Instructions for installing WSL 2 can be found at [https://docs.microsoft.com/en-us/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10). The latest Ubuntu Linux distribution for WSL 2 is recommended.

</details>

<details>
  <summary>Installing Docker</summary>

Instructions for installing and configuring Docker can be found at
[https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/). Windows users should follow the WSL2 instructions.

Instructions for installing and configuring `docker-compose` can be found at
[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/).

</details>

<details>
  <summary>Docker RAM settings</summary>

Tests run as part of the build process require at least 4GB of Docker RAM. To check your Docker configuration, run:

```bash
docker info | grep Memory
```

By default, Docker on Mac is configured with 2 GB of RAM. If you need to increase the memory on your Mac, click on the Docker icon on the top bar and navigate to `Preferences->Resources->Memory`. Docker on Windows and Linux should not require configuration changes.

![img](../assets/tutorials/launch/DockerConfigMac.png)

</details>

<details>
  <summary>Docker WSL settings</summary>

If you are using WSL, Docker's settings must be configured to allow WSL access. In Docker Desktop, navigate to `Settings->Resources->WSL Integration`, and enable your distribution. After restarting your WSL shell, you will be able to run Docker commands from WSL.

![img](../assets/tutorials/launch/EnableUbuntuIntegration.png)

</details>

<details>
  <summary>If <code>docker run hello-world</code> does not work...</summary>

If `docker run hello-world` does not work, try the following:

1. [Is Docker running?](https://docs.docker.com/config/daemon#check-whether-docker-is-running)

   ```bash
   docker info
   ```

2. (Linux) [Are you in the `docker` user group?](https://docs.docker.com/engine/install/linux-postinstall/)

   ```bash
   sudo groupadd docker
   sudo usermod -aG docker $USER
   ```

</details>

## Choose a deployment

When determining which deployment is right for your application, there are three key questions:

1. What programming language will your queries be written in?
2. Do you need example data from the [Deephaven's examples repository](https://github.com/deephaven/examples)?
3. Do you plan to use one of our machine learning images?

Based on your answers, you can use the following table to find the URL to the desired Docker Compose configuration. For example, if you will be working through examples in the Deephaven documentation, and you develop in Python, you will choose [https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples/base/docker-compose.yml](https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples/base/docker-compose.yml), since it supports Python queries and has the example data used in the Deephaven documentation.

| Language / Additional image | Examples | URL                                                                                                                        |
| --------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| Python                      | Yes      | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples/base/docker-compose.yml         |
| Python with all AI          | Yes      | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples/All-AI/docker-compose.yml       |
| Python with NLTK            | Yes      | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples/NLTK/docker-compose.yml         |
| Python with PyTorch         | Yes      | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples/PyTorch/docker-compose.yml      |
| Python with SciKit-Learn    | Yes      | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples/SciKit-Learn/docker-compose.yml |
| Python with TensorFlow      | Yes      | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples/TensorFlow/docker-compose.yml   |
| Python with all AI          | No       | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python/All-AI/docker-compose.yml                |
| Python                      | No       | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python/base/docker-compose.yml                  |
| Python with NLTK            | No       | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python/NLTK/docker-compose.yml                  |
| Python with PyTorch         | No       | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python/PyTorch/docker-compose.yml               |
| Python with SciKit-Learn    | No       | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python/SciKit-Learn/docker-compose.yml          |
| Python with TensorFlow      | No       | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples/base/docker-compose.yml         |
| Groovy                      | Yes      | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/groovy-examples/docker-compose.yml              |
| Groovy                      | No       | https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/groovy/docker-compose.yml                       |

## Choose a version

The following commands default to running the latest release of Deephaven. To select other Deephaven versions, set the `VERSION` environment variable before running `docker-compose` commands.

`VERSION` can be set to:

- `latest` to get the latest release. (default)
- A [specific release tag](https://github.com/deephaven/deephaven-core/releases) (e.g., `0.4.0` or `0.4.1`).
- `edge` to get the images from the latest commit to the main branch.

For example, in Bash, configure the `edge` release by running:

```bash
export VERSION=edge
```

## Set up your Deephaven deployment

First, create a directory for the system to live in. Use any directory name you like; we chose `deephaven-deployment`:

```bash
mkdir deephaven-deployment
```

Then, make that the current working directory:

```bash
cd deephaven-deployment
```

:::note

Commands in the following sections for interacting with a deployment must be run from the deployment directory.

:::

Now, use `curl` to get the Docker Compose file for your desired configuration. Substitute the URL of your choice from the table above. We use the Python build with the examples manager included:

```bash
# Choose your compose file selected above.
compose_file=https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples/base/docker-compose.yml
curl  -O "${compose_file}"
```

Now that the `docker-compose.yml` file is locally available, download the Docker images:

```bash
docker compose pull
```

Since this step only gets the container images and does not run anything, the Deephaven services will not start, and you will not see any logging output.

:::caution

When new features are added to Deephaven, you will need to redownload the `docker-compose.yml` file to get the latest version of Deephaven.

:::

## Manage the Deephaven deployment

Now that your chosen configuration is set up, enter its directory and bring up the deployment:

```bash
docker compose up -d
```

The `-d` option causes the containers to run in the background, in detached mode. This option allows you to use your shell after Docker launches the containers.

Since the container is running detached, you will not see any logs. However, you can follow the logs by running:

```bash
docker compose logs -f
```

To stop running your containers without removing them, you can run the following:

```bash
docker compose stop
```

:::tip

To start over on a fresh session, bring down your Docker image; e.g., `docker compose down`.

:::

Use CTRL+C to stop monitoring the logs and return to a prompt.

The deployment can be brought down by running:

```bash
docker compose down
```

The Deephaven containers use a few [Docker volumes](https://docs.docker.com/storage/volumes/) to store persistent data. If you don't want to keep that persistent storage around, you might want to remove all the volumes that were associated with the deployment. This can be done by running:

:::warning

Running the following command will permanently delete important state for your Deephaven deployment. Only perform this step if you are certain that the deployment state is no longer needed.

:::

```bash
docker compose down -v
```

## Authentication

By default, Deephaven uses a [pre-shared key](../how-to-guides/authentication/auth-psk.md) to authenticate users trying to connect to a Deephaven instance.

![img](../assets/tutorials/psk-loginscreen.png)

When using Deephaven with the default configuration, the key is randomly generated and printed to the Docker logs upon startup like this:

![img](../assets/tutorials/default-psk.png)

You can enter the key in the login screen, or navigate to the URL given in the logs to bypass it.

Deephaven offers other methods for authentication. For more information, see the guides:

- [How to configure and use pre-shared key authentication](../how-to-guides/authentication/auth-psk.md)
- [How to enable anonymous authentication](../how-to-guides/authentication/auth-anon.md)

## Run Deephaven IDE

Once Deephaven is running, you can launch a Deephaven IDE in your web browser. The Deephaven IDE allows you to interactively analyze data and develop new analytics.

- If Deephaven is running locally, navigate to [http://localhost:10000/ide/](http://localhost:10000/ide/).
- If Deephaven is running remotely, navigate to `http://<hostname>:10000/ide/`, where `<hostname>` is the address of the machine Deephaven is running on.

![img](../assets/tutorials/launch/ide_startup.png)

## Manage example data

The [Deephaven examples repository](https://github.com/deephaven/examples) contains data sets to help learn how to use Deephaven. Deephaven's documentation uses these data sets extensively, and they are needed to run some examples.

If you have chosen a deployment with example data, the example data sets will be downloaded to `data/examples` within your Deephaven folder, which translates to `/data/examples` within the Deephaven Docker container. See [Docker data volumes](../conceptual/docker-data-volumes.md) for more information on how files get mounted in Docker.

## Run your first query

From the Deephaven IDE, you can perform your first query.

This script creates two small tables: one for employees and one for departments. It joins the two tables on the `DeptID` column to show the name of the department where each employee works.

```python order=left,right,table
from deephaven import new_table
from deephaven.column import string_col, int_col
from deephaven.constants import NULL_INT

left = new_table([
    string_col("LastName", ["Rafferty", "Jones", "Steiner", "Robins", "Smith", "Rogers"]),
    int_col("DeptID", [31, 33, 33, 34, 34, NULL_INT]),
    string_col("Telephone", ["(347) 555-0123", "(917) 555-0198", "(212) 555-0167", "(952) 555-0110", None, None])
])

right = new_table([
    int_col("DeptID", [31, 33, 34, 35]),
    string_col("DeptName", ["Sales", "Engineering", "Clerical", "Marketing"]),
    string_col("Telephone", ["(646) 555-0134", "(646) 555-0178", "(646) 555-0159", "(212) 555-0111"])
])

table = left.join(table=right, on=["DeptID"], joins=["DeptName,DeptTelephone=Telephone"])
```

## Related documentation

- [How to launch Deephaven video](https://youtu.be/GQTyOvnzdnc)
- [Docker data volumes](../conceptual/docker-data-volumes.md)
- [Build and launch Deephaven from source code](../how-to-guides/launch-build.md)
- [Create a new table](../how-to-guides/new-table.md)
- [How to join tables](../how-to-guides/joins-overview.md)
