# Fill an Excel Template with Data Using Template Markers

> Bind data to Excel templates using template markers  simple variables, arrays, DataTable, collections (List of objects), DataSet (multiple sheets), nested objects, and conditional formatting markers using Syncfusion XlsIO.

---

> **Required common usings:** `Syncfusion.XlsIO`, `System`, `System.Data`
> **Required usings for .NET Core / .NET 5+ / ASP.NET Core:** (No additional usings required)
> **Required usings for .NET Framework (Windows):** (No additional usings required)

---

## How Template Markers Work

Template markers are placeholders written directly in Excel cells that get replaced with actual data at runtime.

```
%VariableName%                   Simple variable
%DataTable.ColumnName%           DataTable column
%List.PropertyName%              List<T> object property
%DataSet.TableName.ColumnName%   DataSet table column
```

The `ITemplateMarkersProcessor` scans the workbook, finds all markers, binds the data, and fills the cells.

---

## Basic Setup

### Minimal Code
```csharp
// Open a template workbook that contains markers
ExcelEngine excelEngine = new ExcelEngine();
IApplication application = excelEngine.Excel;
IWorkbook workbook = application.Workbooks.Open("templates/template.xlsx");

// Create the template marker processor
ITemplateMarkersProcessor marker = workbook.CreateTemplateMarkersProcessor();

// Add data sources
marker.AddVariable("Marker", "First test of markers");

// Process all markers and fill data
marker.ApplyMarkers();
```

### Placeholders
- `"templates/template.xlsx"` → Replace with `"{template-path}"`
- `"VariableName"` → Replace with `"{variable-name}"`
- `value` → Replace with `"{variable-value}"`

---

## Bind Simple Variables

### Template Cell Content
```
%ReportTitle%
%GeneratedDate%
%CompanyName%
```

### Code
```csharp
IWorkbook workbook = application.Workbooks.Open("templates/template.xlsx");
ITemplateMarkersProcessor marker = workbook.CreateTemplateMarkersProcessor();

marker.AddVariable("ReportTitle",   "Annual Sales Report");
marker.AddVariable("GeneratedDate", DateTime.Now.ToString("dd/MM/yyyy"));
marker.AddVariable("CompanyName",   "Contoso Ltd.");
marker.AddVariable("TotalSales",    98500.75);
marker.AddVariable("Region",        "North America");

marker.ApplyMarkers();

workbook.SaveAs("output/report.xlsx");
```

### Placeholders
- `"Annual Sales Report"`, `"Contoso Ltd."`, `"North America"` → Replace with `"{variable-content}"`
- `98500.75` → Replace with `"{numeric-value}"`

---

## Bind DataTable

### Template Cell Content (row 1 = headers already in template, row 2 = marker)
```
%Employees.Name%   %Employees.Department%   %Employees.Salary%
```

### Code
```csharp
DataTable dt = new DataTable("Employees");
dt.Columns.Add("Name",       typeof(string));
dt.Columns.Add("Department", typeof(string));
dt.Columns.Add("Salary",     typeof(double));

dt.Rows.Add("Alice", "Engineering", 75000.00);
dt.Rows.Add("Bob",   "Marketing",   52000.50);
dt.Rows.Add("Carol", "HR",          48000.00);
dt.Rows.Add("David", "Finance",     61000.75);

IWorkbook workbook = application.Workbooks.Open("templates/template.xlsx");
ITemplateMarkersProcessor marker = workbook.CreateTemplateMarkersProcessor();

marker.AddVariable("Employees", dt);
marker.ApplyMarkers();
### Placeholders
- `"Employees"` → Replace with `"{datatable-name}"`


workbook.SaveAs("output/employees.xlsx");
```

---

## Bind List of Objects (POCO)

### Define the Class
```csharp
public class Product
{
    public string ProductName { get; set; }
    public string Category    { get; set; }
    public double Price       { get; set; }
    public int    Stock       { get; set; }
}
```

### Template Cell Content
```
%Products.ProductName%   %Products.Category%   %Products.Price%   %Products.Stock%
```

### Code
```csharp
List<Product> products = new List<Product>
{
    new Product { ProductName = "Laptop",  Category = "Electronics", Price = 999.99,  Stock = 50  },
    new Product { ProductName = "Monitor", Category = "Electronics", Price = 299.99,  Stock = 120 },
    new Product { ProductName = "Desk",    Category = "Furniture",   Price = 149.50,  Stock = 30  },
    new Product { ProductName = "Chair",   Category = "Furniture",   Price = 89.00,   Stock = 75  },
};

IWorkbook workbook = application.Workbooks.Open("templates/template.xlsx");
ITemplateMarkersProcessor marker = workbook.CreateTemplateMarkersProcessor();

marker.AddVariable("Products", products);
marker.ApplyMarkers();

workbook.SaveAs("output/products.xlsx");
```

---

## Bind DataSet (Multiple Sheets)

### Template Setup
- Sheet1 contains: `%Sales.Region%`  `%Sales.Amount%`
- Sheet2 contains: `%Expenses.Category%`  `%Expenses.Amount%`

### Code
```csharp
DataSet ds = new DataSet();

DataTable sales = new DataTable("Sales");
sales.Columns.Add("Region", typeof(string));
sales.Columns.Add("Amount", typeof(double));
sales.Rows.Add("North", 45000.00);
sales.Rows.Add("South", 38000.50);
sales.Rows.Add("East",  52000.75);
ds.Tables.Add(sales);

DataTable expenses = new DataTable("Expenses");
expenses.Columns.Add("Category", typeof(string));
expenses.Columns.Add("Amount",   typeof(double));
expenses.Rows.Add("Salaries",  30000.00);
expenses.Rows.Add("Marketing", 8000.00);
expenses.Rows.Add("Logistics", 5500.00);
ds.Tables.Add(expenses);

IWorkbook workbook = application.Workbooks.Open("templates/template.xlsx");
ITemplateMarkersProcessor marker = workbook.CreateTemplateMarkersProcessor();

marker.AddVariable("Sales",    ds.Tables["Sales"]);
marker.AddVariable("Expenses", ds.Tables["Expenses"]);
marker.ApplyMarkers();

workbook.SaveAs("output/report.xlsx");
```

---

## Bind Nested Object Properties

### Define Classes
```csharp
public class Order
{
    public int      OrderID    { get; set; }
    public string   CustomerName { get; set; }
    public DateTime OrderDate  { get; set; }
    public Address  ShipTo     { get; set; }
}

public class Address
{
    public string Street  { get; set; }
    public string City    { get; set; }
    public string Country { get; set; }
}
```

### Template Cell Content
```
%Orders.OrderID%   %Orders.CustomerName%   %Orders.OrderDate%   %Orders.ShipTo.City%   %Orders.ShipTo.Country%
```

### Code
```csharp
List<Order> orders = new List<Order>
{
    new Order
    {
        OrderID      = 1001,
        CustomerName = "Alice Johnson",
        OrderDate    = new DateTime(2026, 1, 15),
        ShipTo       = new Address { Street = "123 Main St", City = "New York",  Country = "USA" }
    },
    new Order
    {
        OrderID      = 1002,
        CustomerName = "Bob Smith",
        OrderDate    = new DateTime(2026, 2, 20),
        ShipTo       = new Address { Street = "456 High Rd", City = "London",    Country = "UK"  }
    }
};

IWorkbook workbook = application.Workbooks.Open("templates/template.xlsx");
ITemplateMarkersProcessor marker = workbook.CreateTemplateMarkersProcessor();

marker.AddVariable("Orders", orders);
marker.ApplyMarkers();

workbook.SaveAs("output/orders.xlsx");
```

---

## Bind Array of Values

### Template Cell Content
```
%Months%
```

### Code
```csharp
string[] months = { "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December" };

IWorkbook workbook = application.Workbooks.Open("templates/template.xlsx");
ITemplateMarkersProcessor marker = workbook.CreateTemplateMarkersProcessor();

marker.AddVariable("Months", months);
marker.ApplyMarkers();

workbook.SaveAs("output/months.xlsx");
```

---

## Marker with Horizontal Fill Direction

### Template Cell Content (markers placed in a row instead of a column)
```
%Sales.Q1%    %Sales.Q2%    %Sales.Q3%    %Sales.Q4%
```

### Code
```csharp
DataTable sales = new DataTable("Sales");
sales.Columns.Add("Q1", typeof(double));
sales.Columns.Add("Q2", typeof(double));
sales.Columns.Add("Q3", typeof(double));
sales.Columns.Add("Q4", typeof(double));
sales.Rows.Add(12000.0, 15000.0, 13500.0, 18000.0);

IWorkbook workbook = application.Workbooks.Open("templates/template.xlsx");
ITemplateMarkersProcessor marker = workbook.CreateTemplateMarkersProcessor();

marker.AddVariable("Sales", sales);
marker.ApplyMarkers(UnknownVariableAction.Skip);

workbook.SaveAs("output/quarterly.xlsx");
```

---

## Control Unknown Marker Behavior

### Options
```csharp
// Skip unknown markers (leave as-is in the cell)
marker.ApplyMarkers(UnknownVariableAction.Skip);

// ReplaceBlank  replace with blank cell (default)
marker.ApplyMarkers(UnknownVariableAction.ReplaceBlank);
```

---

## Full End-to-End Example

```csharp
using Syncfusion.XlsIO;
using System.Data;

ExcelEngine excelEngine     = new ExcelEngine();
IApplication application    = excelEngine.Excel;
application.DefaultVersion  = ExcelVersion.Xlsx;

// Open the template
IWorkbook workbook = application.Workbooks.Open("templates/invoice-template.xlsx");
ITemplateMarkersProcessor marker = workbook.CreateTemplateMarkersProcessor();

// Simple variables
marker.AddVariable("InvoiceNo",   "INV-2026-001");
marker.AddVariable("InvoiceDate", DateTime.Now.ToString("dd/MM/yyyy"));
marker.AddVariable("CustomerName","Alice Johnson");
marker.AddVariable("DueDate",     DateTime.Now.AddDays(30).ToString("dd/MM/yyyy"));

// Line items (DataTable)
DataTable items = new DataTable("Items");
items.Columns.Add("Description", typeof(string));
items.Columns.Add("Quantity",    typeof(int));
items.Columns.Add("UnitPrice",   typeof(double));
items.Columns.Add("Total",       typeof(double));

items.Rows.Add("Product A", 5,  200.00, 1000.00);
items.Rows.Add("Product B", 3,  450.00, 1350.00);
items.Rows.Add("Product C", 10, 75.50,   755.00);

marker.AddVariable("Items", items);

// Process and save
marker.ApplyMarkers();
workbook.SaveAs("output/invoice.xlsx");
workbook.Close();
excelEngine.Dispose();
```


