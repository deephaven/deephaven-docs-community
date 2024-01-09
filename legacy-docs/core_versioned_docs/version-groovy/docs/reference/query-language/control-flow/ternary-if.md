---
id: ternary-if
title: Ternary conditional operator (ternary-if)
---

The Deephaven Query Language (DQL) implements if-then-else logic using a one-line ternary conditional operator, also known as ternary-if.

The syntax for the ternary conditional operator is:

`condition ? expressionIfTrue : expressionIfFalse`

The question mark (`?`) separates the condition from the expressions, and the colon (`:`) separates the expression evaluated when the condition is true from the expression evaluated when the condition is false.

The expression `x ? y : z` evaluates as follows:

- If `x` is true, the expression evaluates to `y`.
- If `x` is false, the expression evaluates to `z`.

The expression `x ? (y ? 1 : 2) : 3` evaluates as follows:

- If both `x` and `y` are true, the expression evaluates to 1.
- If `x` is true, and `y` is false, the expression evaluates to 2.
- If `x` is false, the expression evaluates to 3.

## Syntax

```
condition ? expressionTrue : expressionFalse
```

## Parameters

<ParamTable>
<Param name="condition" type="boolean">

The condition to be evaluated.

</Param>
<Param name="expressionTrue" type="expression">

If `condition` is true, the result of this expression will be returned.

</Param>
<Param name="expressionFalse" type="expression">

If `condition` is false, the result of this expression will be returned.

</Param>
</ParamTable>

## Returns

`expressionTrue` if `condition` is true, and `expressionFalse` if `condition` is false.

## Examples

In the following example, a new column, `Budget`, is created. The column contains `yes`, if the value in the `Price` column is less than or equal to 3.50, and contains `no` otherwise.

```groovy order=source,result
source = newTable(
    stringCol("Type", "Pine", "Fir", "Cedar", "Oak", "Ash", "Walnut", "Beech", "Cherry"),
    stringCol("Hardness", "soft", "soft", "soft", "hard", "hard", "hard", "hard", "hard"),
    doubleCol("Price", 1.95, 3.70, 3.25, 3.45, 4.25, 7.95 , 4.10, 5.25)
)

result = source.update("Budget = (Price <= 3.50) ? `yes` : `no` ")
```

In the following example, a ternary-if is used to categorize woods into three categories:

- `hard-cheap`: hardwoods costing less than or equal to $3.50,
- `hard-expensive`: hardwoods costing more than $3.50, and
- `soft`: softwoods.

```groovy order=source,result
source = newTable(
    stringCol("Type", "Pine", "Fir", "Cedar", "Oak", "Ash", "Walnut", "Beech", "Cherry"),
    stringCol("Hardness", "soft", "soft", "soft", "hard", "hard", "hard", "hard", "hard"),
    doubleCol("Price", 1.95, 3.70, 3.25, 3.45, 4.25, 7.95 , 4.10, 5.25)
)

result = source.update(
    "Category = (Hardness == `hard`) ? ( (Price <= 3.50) ? `hard-cheap` : `hard-expensive` ) : `soft` ")
```

## Related documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to use conditional operations in query strings](../../../how-to-guides/ternary-if-how-to.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [Query language functions](../query-library/query-language-function-reference.md)
