---
id: query-lang-cheat-sheet
title: Query language cheat sheet
sidebar_label: Query language
---

:::note

Backticks `` ` `` are used for strings and single quotes `'` are used for timestamps and characters.

:::

## String examples

### Manipulate strings

You can use any of the standard Java String operators in your queries, as the following examples show:

```groovy test-set=1 order=source,stringStuff
source = newTable(
    stringCol("Letter", "A", "C", "F", "B", "E", "D", "A"),
    intCol("Number", NULL_INT, 2, 1, NULL_INT, 4, 5, 3),
    stringCol("Color", "red", "blue", "orange", "purple", "yellow", "pink", "blue"),
    intCol("Code", 12, 13, 11, NULL_INT, 16, 14, NULL_INT),
)

stringStuff = source.view("NewString = `new_string_example_`",
    "ConcatV1 = NewString + Letter",\
    "ConcatV2 = NewString + `Note_backticks!!`",\
    "ConcatV3 = NewString.concat(Letter)",\
    "ConcatV4 = NewString.concat(`Note_backticks!!`)",\
    "StartBool = Letter.startsWith(`A`)",\
    "NoEndBool = !Letter.endsWith(`D`)",\
    "ContainsBool = Letter.contains(`A`)",\
    "NoBool = !Letter.contains(`B`)",\
    "FirstChar = Letter.substring(0,1)",\
    "LengthString = Letter.length()",\
    "CharIndexPos = ConcatV1.charAt(1)",\
    "SubstringEx = ConcatV1.substring(0,1)",\
    "FindIt = NewString.indexOf(`_`)",\
    "FindItMiddle = NewString.indexOf(`_`, FindIt + 1)",\
    "FindLastOf = NewString.lastIndexOf(`_`)",\
    "SplitToArrays = NewString.split(`_`)",\
    "SplitWithMax = NewString.split(`_`, 2)",\
    "SplitIndexPos = NewString.split(`_`)[1]",\
    "LowerCase = Letter.toLowerCase()",\
    "UpperCase = NewString.toUpperCase()",\
    "DoubleToStringv1 = Number + ``",\
    "DoubleToStringv2 = String.valueOf(Number)",\
    "DoubleToStringv3 = Double.toString(Number)",\
    "StringToDoublev1 = Double.valueOf(DoubleToStringv1)")
```

```groovy test-set=1 order=oneStringMatch,stringSetMatch,caseInsensitive,notInExample,containsExample,notContainsExample,startsWithExample,endsWithExample
oneStringMatch = source.where("Letter = `A`") // match filter

stringSetMatch = source.where("Letter in `A`, `B`, `C`")
caseInsensitive = source.where("Letter icase in `a`, `B`, `c`")
notInExample = source.where("Letter not in `A`, `B`, `C`") // see "not"

containsExample = source.where("Letter.contains(`A`)")
notContainsExample = source.where("!Letter.contains(`A`)")
startsWithExample = source.where("Letter.startsWith(`A`)")
endsWithExample = source.where("Letter.endsWith(`M`)")
```

## Number examples

:::caution

Using `i` and `ii` is not a good idea in non-static use cases, as calculations based on these variables aren't stable.

:::

```groovy test-set=1 order=source,equalsExample,lessThanExample,someManipulation,modExample1,modExample2
source = newTable(
    stringCol("Letter", "A", "C", "F", "B", "E", "D", "A"),
    intCol("Number1", 44, 42, 41, 44, 40, 45, 37),
    intCol("Number2", 12, 53, 11, 40, 16, 14, 80),
)

equalsExample = source.where("round(Number1) = 44")
lessThanExample = source.where("Number1 < 40")
someManipulation = source.where("(Number1 - Number2) / Number1 > 0.05")
modExample1 = source.where("Number1 % 10 = 0")
modExample2 = source.where("Number2 % 2 = 0")
```

## Nulls and NaNs

```groovy test-set=2 order=source,nullExample,notNullExample,nanExample,notNanExample
source = newTable(col("Letter", "A", null, "D"), intCol("Number", null, 2, 3))

nullExample = source.where("isNull(Letter)") // all data types supported
notNullExample = source.where("!isNull(Letter)")

nanExample = source.where("isNaN(Number)")
notNanExample = source.where("!isNaN(Number)")
```

## Do math

```groovy test-set=2
simpleMath = source.updateView("RandomNumber = Math.random()",\
    "RandomInt100 = new Random().nextInt(100)",\
    "Arithmetic = Number * RandomInt100",\
    "SigNum = signum(RandomNumber - 0.5)",\
    "Signed = SigNum * Arithmetic",\
    "AbsDlrVolume = abs(Signed)",\
    "Power = Math.pow(i, 2)",\
    "Exp = Number * 1E2",\
    "Log = Number * log(2.0)",\
    "Round = round(RandomInt100)",\
    "Floor = floor(RandomInt100)",\
    "Mod = RandomInt100 % 5",\
    "CastInt = (int)AbsDlrVolume",\
    "CastLong = (long)AbsDlrVolume")
```

## Handle arrays

```groovy test-set=2
arrayExamples = source.updateView("RowNumber = i",\
    "PrevRowReference = Number_[i-1]",\
    "MultipleRowRef = Number_[i] - Number_[i-1]")
```

## Bin data

```groovy test-set=2
bins = source.updateView("PriceBin = upperBin(Number, 20)")
```

## Use ternaries (if-thens)

<!-- TODO: Un-skip after https://github.com/deephaven/deephaven-core/issues/1350 -->
<!-- The ticket references parquet, but this example triggers the same error -->
<!-- UPDATE: the listed ticket has been closed, but un-skipping this example still causes an error. -->

```groovy skip-test test-set=2
ifThenexample = source\
.updateView("SimpleTernary = Number < 2 ? `smaller` : `bigger`",\
    "TwoLayers = Number <= 1 ? `small` : Number < 2 ? `medium` : `large`",\
    "Conj = Number < 3 && (!isNull(Letter) && Letter.contains(`A`)) ? `special` : `boring`",\
    "Disj = Number < 3 || (!isNull(Letter) && Letter.contains(`A`)) ? `fave` : `other`")
```

## Create and use custom variables

```groovy
QueryScope.addParam("a", 7)

result = emptyTable(5).update("Y = a")
```

## Create and use custom functions

See our guides:

- [How to write a Groovy closure](../../how-to-guides/simple-groovy-closures.md)

```groovy order=source,result
myFunction = { int a -> a * (a + 1) }

source = newTable(intCol("A", 1, 2, 3))

result = source.update("X = 2 + 3 * (int)myFunction(A)")
```
