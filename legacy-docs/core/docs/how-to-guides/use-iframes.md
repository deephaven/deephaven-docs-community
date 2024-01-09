---
id: use-iframes
title: How to display tables in an Inline Frame
sidebar_label: Use IFrames
---

In this guide, you'll learn how to create a basic web page with embedded tables and charts from Deephaven using Inline Frames (IFrames). In addition to the Deephaven Web UI, the Deephaven server also provides endpoints for fetching individual tables or charts. Add the following script using [Application Mode](./application-mode.md) to run through the examples below:

```python ticking-table order=null
from deephaven import time_table
from deephaven.plot import Figure

# Create a ticking table with x and y values showing a sin wave
sin_table = time_table("PT1s").update(["x=i", "y=Math.sin(x)"])

# Create a plot displaying the sin_table data
sin_chart = Figure().plot_xy(series_name="Sin wave", t=sin_table, x="x", y="y").show()
```

## Display tables in an IFrame

Assuming your server is running at `http://localhost:10000/ide/`, the URL for retrieving a specific table is:

```
http://localhost:10000/iframe/table/?name=TABLE_NAME
```

For example, to show the `sin_table` from the code above, the IFrame URL is `http://localhost:10000/iframe/table/?name=sin_table`.

Here is a basic HTML page embedding an IFrame:

```html
<html>
  <body>
    <h1>Sin Table</h1>
    <iframe
      src="http://localhost:10000/iframe/table/?name=sin_table"
      width="800"
      height="500"
    ></iframe>
  </body>
</html>
```

![img](../assets/how-to/iframe-table-basic.gif)

### IFrame JavaScript API

The embedded IFrame provides an API to control the table from the parent window. Use by posting the command/value as a [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to the `contentWindow` of the IFrame element, e.g., `document.getElementById('my-iframe').contentWindow.postMessage({ command, value }, 'http://localhost:10000')`.

#### Commands

<table>
  <thead>
    <tr>
      <th>Command</th>
      <th>Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>filter</th>
      <td>{`{ name: string; value: string }[]`}</td>
      <td>Provide an array of column name and quick filter values.</td>
    </tr>
    <tr>
      <th>sort</th>
      <td>{`{ name: string, direction?: 'ASC' | 'DESC' }[]`}</td>
      <td>Provide an array of column names to sort on, and optionally the sort direction (defaults to `'ASC'`);</td>
    </tr>
  </tbody>
</table>

#### JavaScript API Example

Below is an example page which has some fields for filtering and sorting the table. Changes apply to the table as you update the form.

<details>
<summary> Expand for the full html. </summary>

```html
<html>
  <body>
    <h1>Sin Table</h1>
    <div>
      <!-- Our form for inputting column filters -->
      <form id="filterForm">
        <h2>Filter</h2>
        <fieldset>
          <label>x<input type="text" name="x" /></label>
        </fieldset>
        <fieldset>
          <label>y<input type="text" name="y" /></label>
        </fieldset>
      </form>

      <!-- Our form for inputting sort filters -->
      <form id="sortForm">
        <h2>Sort</h2>
        <fieldset>
          <label>Timestamp</label>
          <label><input type="radio" name="Timestamp" value="ASC" />asc</label>
          <label
            ><input type="radio" name="Timestamp" value="DESC" />desc</label
          >
          <label
            ><input type="radio" name="Timestamp" value="" checked />none</label
          >
        </fieldset>
        <fieldset>
          <label>x</label>
          <label><input type="radio" name="x" value="ASC" />asc</label>
          <label><input type="radio" name="x" value="DESC" />desc</label>
          <label><input type="radio" name="x" value="" checked />none</label>
        </fieldset>
        <fieldset>
          <label>y</label>
          <label><input type="radio" name="y" value="ASC" />asc</label>
          <label><input type="radio" name="y" value="DESC" />desc</label>
          <label><input type="radio" name="y" value="" checked />none</label>
        </fieldset>
      </form>
    </div>

    <!-- 
      The IFrame for our table. We pass the `name` query parameter to specify which table to open.
    -->
    <iframe
      id="tableIframe"
      src="http://localhost:10000/iframe/table/?name=sin_table"
      width="800"
      height="500"
    ></iframe>

    <!-- JavaScript for updating the table in the IFrame -->
    <script>
      filterForm.oninput = function (e) {
        /**
         * Process the form data into the filter command value.
         * The value of the command is an array of objects with the following shape:
         *
         * {
         *  name: string, // Name of the column to filter
         *  value: string // Quick filter value to apply
         * }
         *
         * Example:
         *
         * [
         *   { name: "x", value: ">3" },
         *   { name: "y", value: "0" }
         * ]
         */
        const data = new FormData(filterForm);
        const value = [...data].map(([name, value]) => ({ name, value }));
        const message = { command: 'filter', value };

        tableIframe.contentWindow.postMessage(message, '*');
      };

      sortForm.oninput = function (e) {
        /**
         * Process the form data into the sort command value.
         * The value of the command is an array of objects with the following shape:
         *
         * {
         *   name: string, // Name of the column to sort
         *   direction: string // Direction to sort the column
         * }
         *
         * Example:
         *
         * [
         *   { name: "x", direction: "ASC" },
         *   { name: "y", direction: "DESC" }
         * ]
         */
        const data = new FormData(sortForm);
        const value = [...data]
          .filter(([, direction]) => direction.length > 0)
          .map(([name, direction]) => ({ name, direction }));
        const message = { command: 'sort', value };

        tableIframe.contentWindow.postMessage(message, '*');
      };
    </script>
  </body>
</html>
```

</details>

![img](../assets/how-to/iframe-table-api.gif)

## Display charts in an IFrame

Assuming your server is running at `http://localhost:10000/ide/`, the URL for retrieving a specific chart is:

```
http://localhost:10000/iframe/chart/?name=CHART_NAME
```

For example, to show the `sin_chart` from the code above, the IFrame URL is `http://localhost:10000/iframe/chart/?name=sin_chart`.

Here is a basic HTML page embedding an IFrame:

```html
<html>
  <body>
    <h1>Sin Chart</h1>
    <iframe
      src="http://localhost:10000/iframe/chart/?name=sin_chart"
      width="800"
      height="500"
    ></iframe>
  </body>
</html>
```

![img](../assets/how-to/iframe-chart-basic.gif)

## Authentication

When embedding in IFrames, you may want to provide authentication details from the parent window. This can be done by providing the `authProvider=parent` query parameter on the IFrame URL, and then responding to the authentication request sent by the child window.

<details>
<summary> Expand for the full html. </summary>

```html
<html>
  <head>
    <script>
      /**
       * Listen for events on the window, sent from the IFrame
       */
      window.addEventListener(
        "message",
        function (e) {
          console.log("message received:  ", e.data);
          const { data, source } = e;
          const { id, message } = data;

          /** Only look for the login request */
          if (message === "io.deephaven.message.LoginOptions.request") {
            /**
             * Specify the authentication type and any other parameters for logging in.
             */
            source.postMessage(
              {
                /** Need to respond with the same message ID */
                id,

                /**
                 * payload is the login options for `client.login`.
                 *   type: Authentication type to use
                 *   token: Authentication token or password
                 *   username?: Username to authenticate against
                 */
                payload: {
                  /**
                   * The authentication handler to authenticate with.
                   * See https://github.com/deephaven/deephaven-core/tree/main/authentication
                   */
                  type: "io.deephaven.authentication.psk.PskAuthenticationHandler",

                  /**
                   * Replace this token with the token configured for the server.
                   * Should be kept secret.
                   */
                  token: "hello",
                },
              },
              "*"
            );
          }
        },
        false
      );
    </script>
  <body>
    <h1>Sin Table</h1>

    <!--
      The IFrame for our table.
      In addition to the `name` parameter that we have specified before, we also specify `authProvider=parent`.
      That triggers the embbeded IFrame to wait for login credentials from the parent window.
     -->
    <iframe
      id="tableIframe"
      src="http://localhost:10000/iframe/table/?name=sin_table&authProvider=parent"
      width="800"
      height="500"
    ></iframe>

    <h1>Sin Chart</h1>
    <!--
      The IFrame for our chart. We specify `authProvider=parent` here as well, and this parent window will authenticate both IFrames.
    -->
    <iframe
      src="http://localhost:10000/iframe/chart/?name=sin_chart&authProvider=parent"
      width="800"
      height="500"
    ></iframe>
  </body>
</html>
```

</details>

![img](../assets/how-to/iframe-authentication.gif)

## Related documentation

- [Application Mode](./application-mode.md)
