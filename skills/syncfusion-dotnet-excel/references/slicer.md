# Excel Slicer

> Create and manage table slicers to enable UI-based filtering for easy data selection using Syncfusion XlsIO.

---

> **Required common usings:** `Syncfusion.XlsIO`, `System`
> **Required usings for .NET Core / .NET 5+ / ASP.NET Core:** (No additional usings required)
> **Required usings for .NET Framework (Windows):** (No additional usings required)

---

## Access Slicers Collection

### Minimal Code
```csharp
ISlicers slicers = worksheet.Slicers;
```

### Placeholders
- `worksheet` → Replace with `{worksheet-object}`

---

## Create Slicer

### Minimal Code
```csharp
IListObject table = worksheet.ListObjects[0];
sheet.Slicers.Add(table, 3, 11, 2);
```

### Slicer Parameters
- Row: Starting row position
- Column: Starting column position
- Height: Slicer height in rows
- Width: Slicer width in columns

---

## Slicer Name

### Get Slicer Name
```csharp
ISlicer slicer = sheet.Slicers[0];
string name = slicer.Name;
```

### Set Slicer Name
```csharp
ISlicer slicer = sheet.Slicers[0];
slicer.Name = "Slicer1";
```

---

## Slicer Caption

### Set Caption
```csharp
ISlicer slicer = sheet.Slicers[0];
slicer.Caption = "Select any value";
```

---

## Position Slicer

### Set Top Position
```csharp
ISlicer slicer = sheet.Slicers[0];
slicer.Top = 100;
```

### Set Left Position
```csharp
ISlicer slicer = sheet.Slicers[0];
slicer.Left = 300;
```

---

## Resize Slicer

### Set Height
```csharp
ISlicer slicer = sheet.Slicers[0];
slicer.Height = 200;
```

### Set Width
```csharp
ISlicer slicer = sheet.Slicers[0];
slicer.Width = 150;
```

---

## Slicer Item Size

### Set Item Height
```csharp
ISlicer slicer = sheet.Slicers[0];
slicer.SlicerItemHeight = 0.4;
```

### Set Item Width
```csharp
ISlicer slicer = sheet.Slicers[0];
slicer.SlicerItemWidth = 80;
```

---

## Slicer Columns

### Set Number of Columns
```csharp
ISlicer slicer = sheet.Slicers[0];
slicer.NumberOfColumns = 2;
```

---

## Slicer Header

### Show/Hide Header
```csharp
ISlicer slicer = sheet.Slicers[0];
slicer.DisplayHeader = true;
```

---

## Slicer Style

### Apply Style
```csharp
ISlicer slicer = sheet.Slicers[0];
slicer.SlicerStyle = ExcelSlicerStyle.SlicerStyleDark2;
```

### Available Styles
- SlicerStyleLight1 through SlicerStyleLight6
- SlicerStyleDark1 through SlicerStyleDark6

---

## Select Slicer Items

### Access Slicer Cache
```csharp
ISlicer slicer = sheet.Slicers[0];
ISlicerCache cache = slicer.SlicerCache;
```

### Select Item
```csharp
ISlicerCache cache = slicer.SlicerCache;
cache.SlicerCacheItems[0].IsSelected = true;
```

### Select Multiple Items
```csharp
ISlicerCache cache = slicer.SlicerCache;
cache.SlicerCacheItems[0].IsSelected = true;
cache.SlicerCacheItems[1].IsSelected = true;
```

---

## Slicer Filter Type

### Set Cross Filter Type
```csharp
ISlicerCache cache = slicer.SlicerCache;
cache.CrossFilterType = SlicerCrossFilterType.ShowItemsWithDataAtTop;
```

### Available Filter Types
- ShowItemsWithDataAtTop
- ShowItemsWithNoData

---

## Sort Slicer Items

### Sort Ascending
```csharp
ISlicerCache cache = slicer.SlicerCache;
cache.IsAscending = true;
```

### Sort Descending
```csharp
ISlicerCache cache = slicer.SlicerCache;
cache.IsAscending = false;
```

---

## Custom List Sorting

### Enable Custom Sorting
```csharp
ISlicerCache cache = slicer.SlicerCache;
cache.UseCustomListSorting = true;
```

---

## Complete Slicer Example

### Create and Format Slicer
```csharp
IListObject table = sheet.ListObjects[0];
sheet.Slicers.Add(table, 3, 11, 2);

ISlicer slicer = sheet.Slicers[0];
slicer.Name = "Slicer1";
slicer.Caption = "Select any value";
slicer.Top = 100;
slicer.Left = 300;
slicer.Height = 200;
slicer.Width = 150;
slicer.NumberOfColumns = 2;
slicer.DisplayHeader = true;
slicer.SlicerStyle = ExcelSlicerStyle.SlicerStyleDark2;
```

---

## Slicer Item Access

### Get All Slicer Items
```csharp
ISlicerCache cache = slicer.SlicerCache;
int itemCount = cache.SlicerCacheItems.Count;
```

### Access Item Properties
```csharp
ISlicerCacheItem item = cache.SlicerCacheItems[0];
bool isSelected = item.IsSelected;
```

---

## Limitations

### Slicer Support
```csharp
// Slicers require XLSX format
// Can only be created for table objects (IListObject)
// Requires Excel 2010 or later for full compatibility
```
