# Tables

> All table operations — creating tables, adding rows and columns, cell formatting, and merging cells.

---
## Required common usings

```csharp
using Syncfusion.DocIO;
using Syncfusion.DocIO.DLS;
using Syncfusion.OfficeChart;
```

## Create Table
> **Required usings for Windows-Specific:**`System.IO`

### Minimal Code
```csharp
var table = section.AddTable();
table.ResetCells(3, 3); // 3 rows, 3 columns
```

### With Content
```csharp
var table = section.AddTable();
table.ResetCells(3, 3);

// Set header row
table.Rows[0].Cells[0].AddParagraph().AppendText("Column 1");
table.Rows[0].Cells[1].AddParagraph().AppendText("Column 2");
table.Rows[0].Cells[2].AddParagraph().AppendText("Column 3");

// Set data rows
table.Rows[1].Cells[0].AddParagraph().AppendText("Row 1, Cell 1");
table.Rows[1].Cells[1].AddParagraph().AppendText("Row 1, Cell 2");
table.Rows[1].Cells[2].AddParagraph().AppendText("Row 1, Cell 3");

table.Rows[2].Cells[0].AddParagraph().AppendText("Row 2, Cell 1");
table.Rows[2].Cells[1].AddParagraph().AppendText("Row 2, Cell 2");
table.Rows[2].Cells[2].AddParagraph().AppendText("Row 2, Cell 3");
```

### Dynamic Table from Data
```csharp
var headers = new[] { "Name", "Age", "City" };
var rows = new[]
{
    new[] { "Alice", "30", "New York" },
    new[] { "Bob", "25", "London" },
    new[] { "Charlie", "35", "Tokyo" }
};

var table = section.AddTable();
table.ResetCells(rows.Length + 1, headers.Length);

// Header row
for (int i = 0; i < headers.Length; i++)
{
    table.Rows[0].Cells[i].AddParagraph().AppendText(headers[i]);
}

// Data rows
for (int r = 0; r < rows.Length; r++)
{
    for (int c = 0; c < headers.Length; c++)
    {
        table.Rows[r + 1].Cells[c].AddParagraph().AppendText(rows[r][c]);
    }
}
```

### Placeholders
- `3, 3` → Replace with `{row-count}, {column-count}`

---

## Cell Formatting

### Borders

#### Common code for Cross-Platform and Windows-Specific
```csharp
table.TableFormat.Borders.BorderType = BorderStyle.Single;
table.TableFormat.Borders.LineWidth = 1f;
```

#### Cross-Platform
```csharp
table.TableFormat.Borders.Color = Syncfusion.Drawing.Color.Black;
```

#### Windows-Specific
```csharp
table.TableFormat.Borders.Color = System.Drawing.Color.Black;
```

### Cell Shading

#### Common code for Cross-Platform and Windows-Specific
```csharp
for (int i = 0; i < table.Rows[0].Cells.Count; i++)
{
```

#### Cross-Platform
```csharp
    table.Rows[0].Cells[i].CellFormat.BackColor = Syncfusion.Drawing.Color.LightGray;
```

#### Windows-Specific
```csharp
    table.Rows[0].Cells[i].CellFormat.BackColor = System.Drawing.Color.LightGray;
```

#### Common code for Cross-Platform and Windows-Specific
```csharp
}
```

### Cell Padding

#### Common for Cross-Platform and Windows-Specific
```csharp
table.TableFormat.Paddings.All = 5f;
```

### Cell Alignment

#### Common for Cross-Platform and Windows-Specific
```csharp
var para = table.Rows[0].Cells[0].AddParagraph();
para.AppendText("Centered text");
para.ParagraphFormat.HorizontalAlignment = HorizontalAlignment.Center;

table.Rows[0].Cells[0].CellFormat.VerticalAlignment = VerticalAlignment.Middle;
```

### Cell Width

#### Common for Cross-Platform and Windows-Specific
```csharp
table.Rows[0].Cells[0].Width = 150f;
```

---

## Merge Cells

### Horizontal Merge

#### Common for Cross-Platform and Windows-Specific
```csharp
table.ApplyHorizontalMerge(0, 0, 2);
```

### Vertical Merge

#### Common for Cross-Platform and Windows-Specific
```csharp
table.ApplyVerticalMerge(0, 0, 2);
```

---

## Add Rows & Columns

### Add Row

#### Common for Cross-Platform and Windows-Specific
```csharp
var row = table.AddRow();
row.Cells[0].AddParagraph().AppendText("New cell 1");
row.Cells[1].AddParagraph().AppendText("New cell 2");
```

### Add Row with Specific Cell Count

#### Common for Cross-Platform and Windows-Specific
```csharp
var row = table.AddRow(true, false);
```

---

## Nested Tables

### Minimal Code

#### Common for Cross-Platform and Windows-Specific
```csharp
var nestedTable = table.Rows[1].Cells[0].AddTable();
nestedTable.ResetCells(2, 2);
nestedTable.Rows[0].Cells[0].AddParagraph().AppendText("Nested 1");
nestedTable.Rows[0].Cells[1].AddParagraph().AppendText("Nested 2");
nestedTable.Rows[1].Cells[0].AddParagraph().AppendText("Nested 3");
nestedTable.Rows[1].Cells[1].AddParagraph().AppendText("Nested 4");
```

---

## Styled Table (Complete Example)

### Full Example

#### Common Setup
```csharp
var table = section.AddTable();
table.ResetCells(4, 3);
table.TableFormat.Borders.BorderType = BorderStyle.Single;
table.TableFormat.Borders.LineWidth = 0.5f;
table.TableFormat.Paddings.All = 5f;

var headerTexts = new[] { "Product", "Quantity", "Price" };
for (int i = 0; i < headerTexts.Length; i++)
{
```

#### Cross-Platform
```csharp
    table.Rows[0].Cells[i].CellFormat.BackColor = Syncfusion.Drawing.Color.FromArgb(68, 114, 196);
```

#### Windows-Specific
```csharp
    table.Rows[0].Cells[i].CellFormat.BackColor = System.Drawing.Color.FromArgb(68, 114, 196);
```

#### Common Setup
```csharp
    var text = table.Rows[0].Cells[i].AddParagraph().AppendText(headerTexts[i]);
    text.CharacterFormat.Bold = true;
```

#### Cross-Platform
```csharp
    text.CharacterFormat.TextColor = Syncfusion.Drawing.Color.White;
```

#### Windows-Specific
```csharp
    text.CharacterFormat.TextColor = System.Drawing.Color.White;
```

#### Common Setup
```csharp
}

var data = new[]
{
    new[] { "Widget A", "100", "$5.00" },
    new[] { "Widget B", "250", "$3.50" },
    new[] { "Widget C", "75", "$12.00" }
};

for (int r = 0; r < data.Length; r++)
{
    if (r % 2 == 1)
    {
        for (int c = 0; c < data[r].Length; c++)
        {
```

#### Cross-Platform
```csharp
            table.Rows[r + 1].Cells[c].CellFormat.BackColor = Syncfusion.Drawing.Color.FromArgb(217, 226, 243);
```

#### Windows-Specific
```csharp
            table.Rows[r + 1].Cells[c].CellFormat.BackColor = System.Drawing.Color.FromArgb(217, 226, 243);
```

#### Common Setup
```csharp
        }
    }

    for (int c = 0; c < data[r].Length; c++)
    {
        table.Rows[r + 1].Cells[c].AddParagraph().AppendText(data[r][c]);
    }
}
```
