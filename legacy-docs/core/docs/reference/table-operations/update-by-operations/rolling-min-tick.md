---
id: rolling-min-tick
title: rolling_min_tick
---

`rolling_min_tick` creates a rolling minimum in an [`update_by`](./updateBy.md) table operation using table ticks as the windowing unit. Ticks are row counts. The rolling minimum can be calculated using forward and/or backward windows.

## Syntax

```
rolling_min_tick(cols: list[str], rev_ticks: int, fwd_ticks: int) -> UpdateByOperation
```

## Parameters

<ParamTable>
<Param name="cols" type="list[str]">

The column(s) to be operated on. These can include expressions to rename the output (e.g., `NewCol = Col`). When left empty, the rolling minimum is calculated for all applicable columns.

</Param>
<Param name="rev_ticks" type="int">

The look-behind window size in rows. If positive, it defines the maximum number of rows _before_ the current row that will be used. If negative, it defines the minimum number of rows _after_ the current row that will be used. Includes the current row.

</Param>
<Param name="fwd_ticks" type="int">

The look-forward window size in rows. If positive, it defines the maximum number of rows _after_ the current row that will be used. If negative, it defines the minimum number of rows _before_ the current row that will be used.

</Param>
</ParamTable>

## Returns

An [`UpdateByOperation`](./updateBy.md#parameters) to be used in an [`update_by`](./updateBy.md) table operation.

## Examples

The following example performs an [`update_by`](./updateBy.md) on the `source` table using three `rolling_min_tick` operations. Each argument uses different `rev_ticks` and `fwd_ticks` values to show how they affect the output.

```python order=source,result
from deephaven.updateby import rolling_min_tick
from deephaven import empty_table

source = empty_table(10).update(["Letter = (i % 2 == 0) ? `A` : `B`", "X = randomInt(0, 100)"])

op_before = rolling_min_tick(cols=["OpBefore = X"], rev_ticks=3, fwd_ticks=-1)
op_after = rolling_min_tick(cols=["OpAfter = X"], rev_ticks=-1, fwd_ticks=3)
op_middle = rolling_min_tick(cols=["OpMiddle = X"], rev_ticks=1, fwd_ticks=1)

result = source.update_by(ops=[op_before, op_after, op_middle], by="Letter")
```

## Related documentation

- [How to use `update_by`](../../../how-to-guides/use-update-by.md)
- [How to create an empty table](../../../how-to-guides/empty-table.md)
- [ternary conditional operator](../../query-language/control-flow/ternary-if.md)
- [`update`](../select/update.md)
- [`update_by`](./updateBy.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/api/updateby/UpdateByOperation.html#RollingMin(long,long,java.lang.String...)>)
- [Pydoc](https://deephaven.io/core/pydoc/code/deephaven.updateby.html#deephaven.updateby.rolling_min_tick)