---
id: logs
title: How to retrieve logs
sidebar_label: Retrieve logs
---

This guide will show you how several methods to retrieve logs.

As with any programming language, sometimes there are crashes. It is important to retrieve that infromation so that one can understand the root cause of the error.

## Retrieve docker container logs

If you run Deephaven in detached mode, all the container information is present in the background. To see that information, access it via the `docker logs` command.

Replace `<CONTAINER>` with the name of your server:

```shell
docker logs <CONTAINER>
```

:::note

If you do not know the name of your container, use the following command in your terminal to show all running containers:

```shell
docker stats
```

:::

It is useful to redirect the logs to a file for easy searchability. To do this, use `>` for standard output and `>&` for standard error.

```shell
docker logs <CONTAINER> >& log.txt
```

## SIGSEGV error

One of the most common crashes involves the JVM. This results in a `SIGSEGV error`.

When this error occurs, the server Docker container will generate a log. To retrieve that log from the Docker container to your local machine, copy the file. The container needs to be running to copy the log file.

Replace `<SERVER_CONTAINER>` with the name of your server:

```shell
docker cp <SERVER_CONTAINER>:/tmp/hs_err_pid1.log ./
```

:::note

If you do not know the name of your server container, run:

```shell

docker stats
```

:::

## Debug log

You can fine-tune the level of logging inside Deephaven. For more detailed logs from the JVM, edit the docker-compose.yml file to include the extra flag:

```shell
-Dlogback.configurationFile=logback-debug.xml
```

## Command history

Deephaven provides a record of all the commands that have been executed, as well as how long each command took or if an error occured. This information is available in the Command History panel, which is searchable.

![img](../assets/how-to/logs1.png)

Hover over the command for more information.

The command in the image below was successful and took two seconds.

![img](../assets/how-to/logs2.png)

The command in this example, however, resulted in an error after three seconds.

![img](../assets/how-to/logs3.png)

## Export browser logs

You can export your logs to send to the Community support team. In **User Settings**, the **Export Logs** button will download a zip file of your logs:

![img](../assets/how-to/user_settings.png)

![img](../assets/how-to/support_settings.png)

## Access browser logs

If you encounter an issue with the UI during your Deephaven web session, looking at your browser logs can help diagnose the issue.

To access browser logs in Chrome, click the **Controls** menu and choose **More Tools > Developer Tools**.

![img](../assets/how-to/browser1.png)

Click the **Console** tab. This is where known issues will be logged.

![img](../assets/how-to/browser2.png)

Next to the **Filter** field, we recommend selecting all levels:

![img](../assets/how-to/browser3.png)

You can also adjust the following settings to capture more detailed information in the logs. In the **DevTools Controls** menu, choose **More Tools > Settings**:

![img](../assets/how-to/browser4.png)

Under **Console**, you can choose to Log XMLHttpRequests, Show timestamps, etc.:

![img](../assets/how-to/browser5.png)

To send the browser logs to support, right-click within the **Console** to save the file.

![img](../assets/how-to/browser6.png)

## Get more help

You can also get help by asking questions in our [GitHub Discussions](https://github.com/deephaven/deephaven-core/discussions/categories/q-a) forum or join our [Slack Community](https://deephaven.io/slack).

# Related documentation

- [Create a new table](./new-table.md)
- [How to handle null, infinity, and not-a-number values](./handle-null-inf-nan.md)
- [How to join tables](./join-two-tables.md)
- [How to select, view, and update data in tables](./use-select-view-update.md)
- [How to work with strings](./work-with-strings.md)
- [Formulas](../reference/query-language/formulas/formulas.md)
- [Special variables](../reference/query-language/variables/special-variables.md)