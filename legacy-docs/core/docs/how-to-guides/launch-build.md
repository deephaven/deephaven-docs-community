---
id: launch-build
title: Build and launch from source
sidebar_label: Build from source
---

:::warning

This page is a guide for building and running Deephaven from source code. These instructions are for users
and developers interested in tinkering with and modifying Deephaven source code.

The majority of users will want to [Launch Deephaven from pre-built images](../tutorials/docker-install.md). It is the easiest way to deploy.

**If you are not sure which of the two is right for you, use the pre-built images. For detailed instructions on how to do this, see [Launch Deephaven from pre-built images](../tutorials/docker-install.md).**

:::

Deephaven Community Core is a real-time, time-series, column-oriented analytics engine
with relational database features. Queries can seamlessly operate upon both historical and real-time data. It can ingest data from a variety of sources, apply computation and analysis algorithms
to that data, and build rich queries, dashboards, and representations with the results.

In this tutorial, you'll learn how to set up and launch Deephaven.

## Prerequisites

### Required dependencies

Building and running Deephaven requires a few software packages.

| Package | Version                       | OS                     |
| ------- | ----------------------------- | ---------------------- |
| git     | ^2.25.0                       | All                    |
| java    | >=11, <20                     | All                    |
| docker  | ^20.10.8                      | All                    |
| Windows | 10 (OS build 20262 or higher) | Only Windows           |
| WSL     | 2                             | Only Linux via Windows |

You can check if these packages are installed and functioning by running:

```bash
git version
java -version
docker version
docker compose version
docker run hello-world
```

:::note

Internally, the Java build process will use [Gradle Auto Provisioning](https://docs.gradle.org/current/userguide/toolchains.html#sec:provisioning)
to download and use the appropriate Java version for building and testing.

:::

<details>
  <summary>Installing WSL...</summary>

Deephaven can be run natively on Windows, without installing WSL. However, users who want to run Deephaven inside a GNU/Linux environment on a Windows machine will need Windows Subsystem for Linux (WSL) version 2. WSL is not needed on other operating systems.

Instructions for installing WSL 2 can be found at [https://docs.microsoft.com/en-us/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
The latest Ubuntu Linux distribution for WSL 2 is recommended.

</details>

<details>
  <summary>Installing Java</summary>

Deephaven can be built with [Oracle OpenJDK](https://jdk.java.net/), [Adoptium OpenJDK](https://adoptium.net/installation.html), [Zulu OpenJDK](https://www.azul.com/downloads/?package=jdk#download-openjdk),
and likely other flavors of the OpenJDK.

You can choose to install with the vendor links above, or you may prefer to use your package manager's version, which is often the easiest route:

- Debian / Ubuntu / Windows WSL2 Ubuntu

  ```bash
  apt-get update
  apt-get install openjdk-11-jdk-headless
  ```

  See [debian](https://wiki.debian.org/Java) or [Ubuntu](https://ubuntu.com/tutorials/install-jre#1-overview) for more information.

- Fedora / RedHat

  ```bash
  dnf install java-11-openjdk-devel
  ```

  See [Fedora](https://docs.fedoraproject.org/en-US/quick-docs/installing-java/) or [RedHat](https://developers.redhat.com/products/openjdk/overview) for more information.

- Mac

  ```bash
  brew install openjdk@11
  ```

OpenJDK 11 may need to be added to your path. For Intel Macs:

```bash
echo 'export PATH="/usr/local/opt/openjdk@11/bin:$PATH"' >> ~/.zshrc
```

For M1 Macs:

```bash
  echo 'export PATH="/opt/homebrew/opt/openjdk@11/bin:$PATH"' >> ~/.zshrc
```

See [Brew](https://formulae.brew.sh/formula/openjdk@11) for more information.

</details>

<details>
  <summary>Installing Docker</summary>

Instructions for installing and configuring Docker can be found at
[https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/). Windows users should follow the WSL2 instructions.

Instructions for installing and configuring `docker compose` can be found at
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

If using WSL, you will need to change Docker's configuration settings to allow WSL access. In Docker Desktop, navigate to `Settings->Resources->WSL Integration`, and enable your distribution. After restarting your WSL shell, you will be able to run Docker commands from WSL.

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

In order for the new group to apply, you must finish your current session and start a new one (log out and log in). Also, if the Gradle daemon is already running for your user, it needs to be stopped since it is running with the old credentials.

</details>

<details>
  <summary>If `git clone` fails on WSL 2...</summary>

WSL 2 has a [known bug](https://github.com/microsoft/WSL/issues/4253) that results in `git clone` failures in some environments. The bug has been reported since 2019. You may be able to fix this as follows.

Update networking drivers:

1. On Windows, open the Device Manager.
2. Expand "Network adapters".
3. Find which network device you are using (wifi, or wired), and note the brand.
4. Google "newest Windows 10 device drivers for <brand_name>".
5. Install the drivers.
6. Restart.

Now you need to set the maximum network packet size, known as the maximum transmission unit (MTU), to something slightly smaller than the WSL interface value.

In powershell, lookup the current MTU for the WSL interface:

```powershell
netsh interface ipv4 show subinterface
```

You will see output that looks like:

```
   MTU  MediaSenseState   Bytes In  Bytes Out  Interface
------  ---------------  ---------  ---------  -------------
4294967295                1          0       5150  Loopback Pseudo-Interface 1
  1500                1   83773143   12179977  Wi-Fi
  1500                5          0          0  Ethernet
  1500                5          0          0  Local Area Connection* 1
  1500                5          0          0  Local Area Connection* 2
  1500                5          0          0  Ethernet 2
  1500                1      29246   11502767  vEthernet (WSL)
```

Note the vEthernet interface's MTU.

In a WSL 2 Ubuntu shell, set the MTU to a number slightly smaller than the WSL vEthernet value obtained above. This ensures that there is enough buffer to wrap the packets:

```bash
sudo ip link set dev eth0 mtu 1350
```

</details>

## Build and run Deephaven

The following instructions are a condensed version of instructions found in the [deephaven-core repository](https://github.com/deephaven/deephaven-core). For the full instructions with explanations of configuration parameters, SSL, and more, see the [README](https://github.com/deephaven/deephaven-core/blob/main/server/jetty-app/README.md).

:::note
The following steps show how to build and run Deephaven with Python from source. For Groovy, see [here](../../../core_versioned_docs/version-groovy/docs/how-to-guides/launch-build.md), or click the `Language` drop-down menu in the top left of the webpage, and select `Java (Groovy)`.
:::

### Clone the deephaven-core repository

Once all of the required dependencies are installed and functioning, run:

```bash
git clone https://github.com/deephaven/deephaven-core.git
cd deephaven-core
```

The first of these lines clones the repository; the second line sets the directory to the new local clone.

### Set up the Python virtual environment

First, set up a virtual environment.

```bash
python -m venv /tmp/my-dh-venv
source /tmp/my-dh-venv/bin/activate
```

### Build and install the wheel

Then, build and install the wheel.

```bash
./gradlew py-server:assemble

pip install "py/server/build/wheel/deephaven_core-<version>-py3-none-any.whl[autocomplete]"
```

Where `<version>` is replaced with the Gradle version in use:

```bash
./gradlew -q printVersion
```

:::note
If you prefer not to use autocomplete, remove `[autocomplete]` from the wheel installation.
:::

### Build and run

Lastly, build and run Deephaven.

```bash
./gradlew server-jetty-app:run
```

## Run Deephaven IDE

Once Deephaven is running, you can launch a Deephaven IDE in your web browser. Deephaven IDE allows you
to interactively analyze data and develop new analytics.

- If Deephaven is running locally, navigate to [http://localhost:10000/ide/](http://localhost:10000/ide/).
- If Deephaven is running remotely, navigate to `http://<hostname>:10000/ide/`, where `<hostname>` is the address of the machine Deephaven is running on.

### Authentication

Deephaven, by default, uses [pre-shared key authentication](./authentication/auth-psk.md). If no key is set, a randomly generated key will be used to log into the server each time it starts. The randomly generated key is printed to the Docker logs like this:

![img](../assets/tutorials/default-psk.png)

To set your own pre-shared key, add `-Ppsk=<YourPasswordHere>`:

```bash
./gradlew server-jetty-app:run -Ppsk=DeephavenRocks!
```

![img](../assets/how-to/custom-psk.png)

## Related documentation

- [Create a new table](./new-table.md)
- [How to join tables](./join-two-tables.md)
