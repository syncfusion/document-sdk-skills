# Overview — Syncfusion Windows Forms Calculation Engine

> Essential Calculate is a native .NET class library for parsing, computing expressions, and formulas with 400+ predefined functions. It's a non-UI component with full-fledged object model support for formula calculation without Microsoft Office dependencies.

---

## Core Features

- **400+ Predefined Functions** across Math, Trigonometry, Statistical, Lookup, Logical, Text, Date/Time, Information, and Matrix categories
- **Non-UI Component** - Works independently in any .NET environment (Windows Forms, WPF, ASP.NET, Xamarin, UWP)
- **No Microsoft Office Dependency** - Performs calculations without Excel or COM libraries
- **Named Ranges Support** - Define names for cells, ranges, formulas, constants, or tables
- **Cross-Sheet References** - Work with multiple sheets simultaneously
- **Custom Functions** - Register custom functions with n-number of optional arguments
- **Culture-Sensitive** - Supports custom decimal and argument separators
- **XlsIO Integration** - Fully integrated with Essential XlsIO for Excel spreadsheet calculations
- **Array Formulas** - Support for array formulas and dynamic references
- **Dependency Tracking** - Full dependency tracking and automatic recalculation

---

## Supported Environments

| Platform | Assembly | NuGet Package |
|----------|----------|---------------|
| Windows Forms, WPF, ASP.NET | `Syncfusion.Calculate.Base` | [Syncfusion.Calculate.Base](https://www.nuget.org/packages/Syncfusion.Calculate.Base/) |
| Universal Windows Platform | `Syncfusion.Calculate.UWP` | [Syncfusion.Calculate.UWP](https://www.nuget.org/packages/Syncfusion.Calculate.UWP/) |
| Xamarin.Forms | `Syncfusion.Calculate.Portable` | [Syncfusion.Xamarin.Calculate](https://www.nuget.org/packages/Syncfusion.Xamarin.Calculate/) |
| Xamarin.Android | `Syncfusion.Calculate.Android` | [Syncfusion.Xamarin.Calculate](https://www.nuget.org/packages/Syncfusion.Xamarin.Calculate/) |
| Xamarin.iOS | `Syncfusion.Calculate.iOS` | [Syncfusion.Xamarin.Calculate](https://www.nuget.org/packages/Syncfusion.Xamarin.Calculate/) |
| .NET Core | `Syncfusion.Calculate.Base` | [Syncfusion.Calculate.Base](https://www.nuget.org/packages/Syncfusion.Calculate.Base/) |

---

## Formula Types Supported

### Simple Algebraic Expressions
```csharp
(1.2^3 - 1) / 8
```

### Expressions with Intrinsic Functions
```csharp
4 * sqrt(exp(8.4))
```

### Expressions with Variables
```csharp
cos([textBox1] * pi() / 180)
```

### Spreadsheet-like Formulas
```csharp
SUM(A2:B14)
VLOOKUP(value, A1:C10, 2, FALSE)
```

---

## Function Categories

| Category | Example Functions |
|----------|-------------------|
| **Math** | SUM, SUMIF, SUMIFS, PRODUCT, MOD, ROUND, ROUNDUP, ROUNDDOWN, ABS, SQRT, POWER, INT, CEILING, FLOOR |
| **Trigonometry** | SIN, COS, TAN, ASIN, ACOS, ATAN, ATAN2, SINH, COSH, TANH, DEGREES, RADIANS, PI |
| **Statistical** | AVERAGE, COUNT, COUNTA, MAX, MIN, STDEV, STDEVP, VAR, SUBTOTAL |
| **Lookup** | VLOOKUP, HLOOKUP, XLOOKUP, XMATCH, MATCH, INDEX |
| **Logical** | IF, AND, OR, NOT, IFERROR, IFNA |
| **Text** | CONCATENATE, LEFT, RIGHT, MID, LEN, UPPER, LOWER, TRIM, TEXT |
| **Date/Time** | TODAY, NOW, DATE, YEAR, MONTH, DAY, HOUR, MINUTE, SECOND, DATEDIF |
| **Information** | ISTEXT, ISNUMBER, ISBLANK, ISERROR, ISNA |
| **Matrix** | MMULT, MDETERM, MINVERSE, MUNIT, SUMPRODUCT, HSTACK, VSTACK |

---

## Architecture Overview

Essential Calculate uses a **non-UI component architecture** that enables:

- **Data Source Agnostic** - Implements `ICalcData` interface to work with arbitrary business objects
- **Extensible** - Add custom functions and operators
- **High Performance** - Efficient parsing with Reverse Polish Notation (RPN)
- **Dependency Management** - Automatic tracking of cell dependencies
- **Error Handling** - Comprehensive error reporting with Excel-compatible error strings

---

## Key Components

1. **CalcEngine** - Core computation engine for parsing and computing formulas
2. **CalcQuickBase** - Simplified interface for quick calculations with variables
3. **ICalcData** - Interface for integrating arbitrary data sources
4. **LibraryFunctions** - Collection of 400+ built-in and custom functions
5. **NamedRanges** - Management of named cell ranges and formulas

---

## Typical Use Cases

- **Financial Calculations** - Investment analysis, amortization schedules
- **Data Analysis** - Statistical computations, aggregations
- **Business Applications** - Invoice calculations, payroll systems
- **Scientific Computing** - Mathematical and trigonometric calculations
- **Spreadsheet Integration** - Read/write/compute Excel files without Excel
- **Custom Business Logic** - Domain-specific calculations with custom functions

---

## Getting Started

### Quick Calculation with CalcQuickBase
```csharp
CalcQuickBase calcQuick = new CalcQuickBase();
string result = calcQuick.ParseAndCompute("SUM(5, 10, 15)");  // "30"
```

### Calculation with ICalcData
```csharp
CalcData calcData = new CalcData();
calcData.SetValueRowCol(10, 1, 1);  // A1 = 10
calcData.SetValueRowCol(20, 1, 2);  // B1 = 20

CalcEngine engine = new CalcEngine(calcData);
string result = engine.ParseAndComputeFormula("SUM(A1, B1)");  // "30"
```

---

## Integration with XlsIO

Calculate integrates seamlessly with XlsIO for complete Excel spreadsheet support:

```csharp
ExcelEngine excelEngine = new ExcelEngine();
IWorkbook workbook = excelEngine.Excel.Workbooks.Open("sample.xlsx");
IWorksheet sheet = workbook.Worksheets[0];

sheet.EnableSheetCalculations();
sheet["C1"].Formula = "=A1 + B1";
var result = sheet["C1"].CalculatedValue;
sheet.DisableSheetCalculations();
```

---

## Resources

- **NuGet Packages** - Install via Package Manager
- **Custom Functions** - Create domain-specific calculations
- **Named Ranges** - Simplify complex formulas
- **Cross-Sheet References** - Multi-sheet calculations
- **Performance Optimization** - Tune for large datasets
