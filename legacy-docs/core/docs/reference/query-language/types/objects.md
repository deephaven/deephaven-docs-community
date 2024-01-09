---
id: objects
title: Objects
---

The Deephaven Query Language has native support for objects within query strings.

<!-- TODO: https://github.com/deephaven/deephaven-core/issues/1388 and https://github.com/deephaven/deephaven-core/issues/1389
are blocking examples of objects within a table. For now this doc will stick with just objects
within a query string. -->

## Example

The following example shows how to create an object and use one of its methods within a query string.

```python order=source,result
from deephaven import new_table
from deephaven.column import string_col

class MyStringClass:

    def __init__(self, strn):
        self.strn = strn

    def my_string(self):
        return self.strn

obj = MyStringClass("A")

source = new_table([
    string_col("Strings", ["A", "B", "C"])
])

result = source.update(formulas=["Match = Strings_[i] == obj.my_string()"])
```

## Related Documentation

- [Create a new table](../../../how-to-guides/new-table.md)
- [How to use Deephaven's built-in query language functions](../../../how-to-guides/query-language-functions.md)
- [`update`](../../table-operations/select/update.md)
