# CalcEngine — Syncfusion Calculate Engine

> Core computation engine for Essential Calculate. `CalcEngine` accepts an `ICalcData` object as its data source and provides methods to parse, compute, and manage formulas with full dependency tracking and cross-sheet support.

---

## Assembly Reference

```csharp
// NuGet Package
Syncfusion.Calculate.Base

// Namespace
using Syncfusion.Calculate;
```

---

## Instantiation

### Minimal Code
```csharp
CalcData calcData = new CalcData(); // class derived from ICalcData
CalcEngine engine = new CalcEngine(calcData);
```

---

## Parse Formula

`ParseFormula` converts a formula string into a Reverse Polish Notation (RPN) token string that `CalcEngine` can compute efficiently.

```csharp
CalcData calcData = new CalcData();
CalcEngine engine = new CalcEngine(calcData);

string formula = "2+3*1";
string parsedFormula = engine.ParseFormula(formula);
// e.g., returns "n2n3n1ma"
```

### Using CalcQuickBase Engine
```csharp
CalcQuickBase calcQuick = new CalcQuickBase();
string parsedFormula = calcQuick.Engine.ParseFormula("2+3*1");
```

---

## Compute Formula

`ComputeFormula` evaluates a pre-parsed (RPN) formula string and returns the computed result.

```csharp
CalcData calcData = new CalcData();
CalcEngine engine = new CalcEngine(calcData);

string parsedFormula = engine.ParseFormula("2+3*1");
string result = engine.ComputeFormula(parsedFormula);  // "5"
```

### Using CalcQuickBase Engine
```csharp
CalcQuickBase calcQuick = new CalcQuickBase();
string parsedFormula = calcQuick.Engine.ParseFormula("2+3*1");
string result = calcQuick.Engine.ComputeFormula(parsedFormula);
```

---

## ParseAndComputeFormula

Combines parse and compute in a single call. Evaluates formulas using cell references resolved from the `ICalcData` object.

### Compute Expression
```csharp
CalcData calcData = new CalcData();
CalcEngine engine = new CalcEngine(calcData);

string result = engine.ParseAndComputeFormula("(5+25)*2");  // "60"
```

### Compute Built-in Formula
```csharp
string result = engine.ParseAndComputeFormula("SUM(4,5,6)");  // "15"
```

### Compute with Cell References
```csharp
CalcData calcData = new CalcData();
calcData.SetValueRowCol(10, 1, 1);  // A1 = 10
calcData.SetValueRowCol(20, 1, 2);  // B1 = 20

CalcEngine engine = new CalcEngine(calcData);

string result = engine.ParseAndComputeFormula("SUM(A1, B1)");  // "30"
```

### Using CalcQuickBase Engine
```csharp
CalcQuickBase calcQuick = new CalcQuickBase();
string result = calcQuick.Engine.ParseAndComputeFormula("SUM(4,5,6)");
```

---

## Cross-Sheet Reference

Register multiple `ICalcData` objects under a shared family ID to enable formula references across sheets.

```csharp
// Data sources
CalcData calcData  = new CalcData();
CalcData calcData1 = new CalcData();

calcData.SetValueRowCol(10, 1, 1);   // Sheet1!A1 = 10
calcData1.SetValueRowCol(20, 1, 1);  // Sheet2!A1 = 20

// Create engines
CalcEngine engine  = new CalcEngine(calcData);
CalcEngine engine1 = new CalcEngine(calcData1);

// Create shared family ID
int familyId = CalcEngine.CreateSheetFamilyID();

// Register both sheets in the same family
engine.RegisterGridAsSheet("Sheet1", calcData,  familyId);
engine.RegisterGridAsSheet("Sheet2", calcData1, familyId);

// Cross-sheet formula
string result = engine.ParseAndComputeFormula("SUM(Sheet1!A1, Sheet2!A1)");  // "30"
```

---

## Region / Culture Settings

Override the default argument separator (`,`) and decimal separator (`.`) to match the current culture.

```csharp
// Assign current culture's decimal separator
CalcEngine.ParseDecimalSeparator =
    System.Threading.Thread.CurrentThread.CurrentCulture
        .NumberFormat.NumberDecimalSeparator.ToCharArray()[0];

// Assign current culture's argument separator
CalcEngine.ParseArgumentSeparator =
    System.Threading.Thread.CurrentThread.CurrentCulture
        .TextInfo.ListSeparator.ToCharArray()[0];
```

---

## Format Computed Results

```csharp
CalcData calcData = new CalcData();
CalcEngine engine = new CalcEngine(calcData);

string formula = "SUM(4,5,6)";

// Format as decimal
string decResult = decimal.Parse(engine.ParseAndComputeFormula(formula)).ToString("0.00");

// Format as percentage
string pctResult = double.Parse(engine.ParseAndComputeFormula(formula)).ToString("0.00%");
```

---

## Error Strings

`CalcEngine` exposes two arrays for error message handling.

```csharp
CalcData calcData = new CalcData();
CalcEngine engine = new CalcEngine(calcData);

// Excel-compatible error strings: #N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, #NULL!
string[] excelErrors = CalcEngine.ErrorStrings;

// Internal error strings used by CalcEngine
string[] internalErrors = CalcEngine.FormulaErrorStrings;

// Reload error strings after customization
engine.ReloadErrorStrings();
```

### Default FormulaErrorStrings (partial)
```
"binary operators cannot start an expression"
"cannot parse"
"bad library"
"mismatched parentheses"
"unknown formula name"
"circular reference: "
"wrong number of arguments"
"invalid arguments"
"Calculation overflow"
"Missing sheet"
```

---

## Key Members

| Member | Type | Description |
|--------|------|-------------|
| `ParseFormula(string)` | Method | Parses the formula into an RPN token string for computation. |
| `ComputeFormula(string)` | Method | Computes a pre-parsed RPN token string and returns the result. |
| `ParseAndComputeFormula(string)` | Method | Parses and computes a formula string in one step; resolves cell references via `ICalcData`. |
| `RegisterGridAsSheet(string, ICalcData, int)` | Method | Registers an `ICalcData` object as a named sheet for cross-sheet formula references. |
| `CreateSheetFamilyID()` | Static Method | Creates a unique integer family ID used to group related `ICalcData` sheets. |
| `ParseArgumentSeparator` | Static Property | Gets or sets the argument separator character. Default is `,`. |
| `ParseDecimalSeparator` | Static Property | Gets or sets the decimal separator character. Default is `.`. |
| `ErrorStrings` | Static Property | Array of Excel-compatible error strings (`#VALUE!`, `#REF!`, etc.). |
| `FormulaErrorStrings` | Static Property | Array of internal Calculate error strings. |
| `ReloadErrorStrings()` | Method | Reloads or resets internal error strings after modification. |

---

## Supported Built-in Formulas (Selected)

| Category | Functions |
|----------|-----------|
| Math | `SUM`, `SUMIF`, `SUMIFS`, `PRODUCT`, `MOD`, `ROUND`, `ROUNDUP`, `ROUNDDOWN`, `ABS`, `SQRT`, `POWER`, `INT`, `CEILING`, `FLOOR`, `EXP`, `LOG`, `LOG10`, `LN`, `RAND`, `RANDBETWEEN` |
| Trigonometry | `SIN`, `COS`, `TAN`, `ASIN`, `ACOS`, `ATAN`, `ATAN2`, `SINH`, `COSH`, `TANH`, `DEGREES`, `RADIANS`, `PI` |
| Statistical | `AVERAGE`, `COUNT`, `COUNTA`, `MAX`, `MIN`, `STDEV`, `STDEVP`, `VAR`, `SUBTOTAL` |
| Lookup | `VLOOKUP`, `HLOOKUP`, `XLOOKUP`, `XMATCH`, `MATCH`, `INDEX` |
| Logical | `IF`, `AND`, `OR`, `NOT`, `IFERROR`, `IFNA` |
| Text | `CONCATENATE`, `LEFT`, `RIGHT`, `MID`, `LEN`, `UPPER`, `LOWER`, `TRIM`, `TEXT` |
| Date/Time | `TODAY`, `NOW`, `DATE`, `YEAR`, `MONTH`, `DAY`, `HOUR`, `MINUTE`, `SECOND`, `DATEDIF` |
| Information | `ISTEXT`, `ISNUMBER`, `ISBLANK`, `ISERROR`, `ISNA` |
| Matrix | `MMULT`, `MDETERM`, `MINVERSE`, `MUNIT`, `SUMPRODUCT`, `HSTACK`, `VSTACK` |
