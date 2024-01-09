---
id: markdown-widget
title: How to create a markdown widget
sidebar_label: Create a markdown widget
---

This guide shows you how to add a Markdown Widget to your workspace in the Deephaven IDE.

The Markdown Widget is a useful tool for including text or images alongside your data. These notes can include references to the queries running in a layout, code snippets/explanations, instructions/comments, messages to other users, contact info, etc.

To create a Markdown Widget, use the **Controls** menu:

![img](../../assets/how-to/controls.png)

![img](../../assets/how-to/mw1.png)

Once the widget opens, you can edit its content by double-clicking in the panel:

<LoopedVideo src={require('../../assets/how-to/markdown-widget.mp4')} />

Content contained in the widget can be styled using the Markdown syntax. Examples of this syntax follows:

| Syntax                              |
| ----------------------------------- |
| # Heading 1 Text                    |
| ## Heading 2 Text                   |
| ### Heading 3 Text                  |
| This is `**bold text**`             |
| This is `*italic text*`             |
| `>` This is a block quote           |
| This is `` `inline code` ``         |
| `![Test image](Image URL)`          |
| `<img src="url" width="e.g., 250">` |

## Markdown syntax

Additional styling options are available in Markdown, including code blocks, tables, links, lists, horizontal lines, etc.

:::note
To learn more, please refer to [https://www.markdownguide.org/basic-syntax/].
:::

## Manage Markdown Widgets

When you close a Markdown Widget, it will be automatically saved.

To reopen a widget, select **Markdown Widget** from the **Controls** menu, then click its name from the **Recently Closed** list:

![img](../../assets/how-to/mw3.png)

To delete a widget, hover your cursor over the name of a widget to reveal the trash can icon.

![img](../../assets/how-to/mw4.png)
