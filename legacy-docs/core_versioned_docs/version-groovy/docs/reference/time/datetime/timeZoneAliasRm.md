---
id: timeZoneAliasRm
title: timeZoneAliasRm
---

The `timeZoneAliasAdd` method removes a time zone alias.

## Syntax

```
timeZoneAliasRm(alias, timeZone)
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

```groovy reset
timeZoneAliasRm("ET")

println parseTimeZoneQuiet("ET")
```

## Related Documentation

- [How to work with date-times](../../../how-to-guides/work-with-date-time.md)
- [`parseTimeZoneQuiet`](./parseTimeZoneQuiet.md)
- [Javadoc](<https://deephaven.io/core/javadoc/io/deephaven/time/DateTimeUtils.html#timeZoneAliasRm(java.lang.String)>)
