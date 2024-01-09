---
id: overview-joins
title: Join data
hide_table_of_contents: true
---

import { CoreTutorialCard } from '@theme/deephaven/core-docs-components';

<div className="comment-title">

Joining data from multiple tables is vital in any data system. Deephaven offers several options depending on your use case.

</div>

<hr className="margin-bottom--lg" />

<div className="row">

<CoreTutorialCard to="/core/docs/how-to-guides/overview-joins">

## How to join two tables

</CoreTutorialCard>

<CoreTutorialCard to="/core/docs/conceptual/choose-joins">

## How to choose a join method

</CoreTutorialCard>

<CoreTutorialCard to="/core/docs/how-to-guides/multijoin">

## How to join 3+ tables

</CoreTutorialCard>

</div>

Deephaven join methods combine the data in one table (the "left" table) with the data in another table (the "right" table) based on keys. The keys are the columns that are used to match rows between the tables.

![img](../assets/how-to/joins-overview.png)

<!--TODO: include the list below in reference landing page -->

Joins update in real time as new data becomes available. Generally, they fall into one of two categories:

- Time series joins:
  - [`aj` (as-of-join)](../reference/table-operations/join/aj.md)
  - [`raj` (reverse-as-of-join)](../reference/table-operations/join/raj.md)
  - [`range_join`](../reference/table-operations/join/range-join.md)
- Relational joins:
  - [`natural_join`](../reference/table-operations/join/natural-join.md)
  - [`join`](../reference/table-operations/join/join.md)
  - [`exact_join`](../reference/table-operations/join/exact-join.md)
  - [`full_outer_join`](../reference/table-operations/join/full-outer-join.md)
  - [`left_outer_join`](../reference/table-operations/join/left-outer-join.md)
  - [`multi_join`](../reference/table-operations/join/multi-join.md)
