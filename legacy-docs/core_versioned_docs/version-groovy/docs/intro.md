---
id: intro
title: Community Core Docs
hide_title: true
# hide_table_of_contents: true
sidebar_label: Introduction
slug: /docs
---

import { TaglineCarouselTyping } from '@site/src/pages/fragments/\_TaglineCarousel';
import { DocsSectionCount } from '@theme/deephaven/core-docs-components';
import { QuickstartCTA, TutorialCTA, HelpCTA } from '@theme/deephaven/CTA';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { vsCommentDiscussion } from '@deephaven/icons';

<h3 className="text--primary margin-bottom--sm margin-top--md">Learn Deephaven</h3>

<!-- Headlines rotate through at top, expected be split on two lines -->

<TaglineCarouselTyping rows={2} taglines={[
'and build real-time\n applications',
'to join and\n transform streams',
'to explore data\n in real time',
'and query streaming\n dataframes',
]}
/>

<div className="comment-title">

Deephaven Community Core is a real-time, time-series, column-oriented query engine with relational database features. [Read the overview](/core/docs/conceptual/deephaven-overview) for a more detailed introduction.

</div>

<div className="padding-vert--sm"></div>
<hr />
<div className="padding-vert--md"></div>

<div className="row">
<QuickstartCTA/><TutorialCTA/>
</div>

<HelpCTA/>

<div className="row padding-vert--lg">
<div className="col">

<DocsSectionCount id={"core"} path={"docs/how-to-guides"}>

## How-to guides

</DocsSectionCount>

Step-by-step guides to help you achieve a specific goal. Most useful when you're trying to get something done for the first time.

</div>
<div className="col col--4 popular-articles-list">

Popular guides

- [Use filters](./how-to-guides/use-filters.md)
- [Group and ungroup data](./how-to-guides/grouping-data.md)
- [Write and read Parquet files](./how-to-guides/parquet-single.md)

</div>
</div>

<div className="row padding-vert--lg">
<div className="col">
<DocsSectionCount id={"core"} path={"docs/conceptual"}>

## Conceptual guides

</DocsSectionCount>

Clear explanations of core concepts to improve your fundamental understanding of Deephaven building blocks. Most useful for gaining mastery of a topic.

</div>
<div className="col col--4 popular-articles-list">

Important concepts

- [Deephaven overview](./conceptual/deephaven-overview.md)
- [Core API features](./conceptual/deephaven-core-api.md)
- [Table update model](./conceptual/table-update-model.md)
- [Docker data volumes](./conceptual/docker-data-volumes.md)

</div>
</div>

<div className="row padding-vert--lg">
<div className="col">
<DocsSectionCount id={"core"} path={"docs/reference"}>

## Reference guides

</DocsSectionCount>

Technical descriptions of how Deephaven works, with examples. Most useful when you need detailed information about a specfic Deephaven API. For those needing deeper technical documentation, you can also refer to our API documentation generated from source.

</div>
<div className="col col--4 popular-articles-list">

API documentation

- [Javadoc (Java client/server)](https://deephaven.io/core/javadoc)
- [Pydoc (Python client)](https://deephaven.io/core/client-api/python)
- [Pydoc (Python server)](https://deephaven.io/core/pydoc)
- [Godoc (go client)](https://pkg.go.dev/github.com/deephaven/deephaven-core/go)
- [C++ (client)](https://deephaven.io/core/client-api/cpp)
- [C++ (examples)](https://deephaven.io/core/client-api/cpp-examples)

</div>
</div>

<div className="row padding-vert--lg">
<div className="col">
<DocsSectionCount id={"core"} path={"docs/reference/cheat-sheets"}>

## Cheat sheets

</DocsSectionCount>

Short snippets and example queries. Most useful to keep open in a browser tab while first learning to write queries.

</div>
<div className="col col--4 popular-articles-list">

Useful cheat sheets

- [Table operations](./reference/cheat-sheets/table-ops-cheat-sheet.md)
- [Data import/export](./reference/cheat-sheets/import-data-cheat-sheet.md)
- [Query language](./reference/cheat-sheets/query-lang-cheat-sheet.md)
- [Time operations](./reference/cheat-sheets/datetime-cheat-sheet.md)

</div>
</div>
