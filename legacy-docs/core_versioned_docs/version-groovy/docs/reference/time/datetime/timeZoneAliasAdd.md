---
id: timeZoneAliasAdd
title: timeZoneAliasAdd
---

The `timeZoneAliasAdd` method adds a new time zone alias.

## Syntax

```
timeZoneAliasAdd(alias, timeZone)
```

## Parameters

<ParamTable>
<Param name="alias" type="String">

The new alias name.

</Param>
<Param name="timeZone" type="String">

The [ZoneId](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html) name.

</Param>
</ParamTable>

## Examples

```groovy order=null
timeZoneAliasAdd("PTR", "America/Puerto_Rico")

println timeZone("PTR")
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`timeZone`](./timeZone.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#timeZoneAliasAdd(java.lang.String,java.lang.String)>)
