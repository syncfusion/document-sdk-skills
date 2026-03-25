# Tables

> All table operations — creating tables, adding rows and columns, cell formatting, and merging cells.

---
## Required common usings

```java
import com.syncfusion.docio.*;
```

## Create Table

### Minimal Code
```java
WTable table = section.addTable();
table.resetCells(3, 3); // 3 rows, 3 columns
```

### With Content
```java
WTable table = section.addTable();
table.resetCells(3, 3);

// Set header row
table.getRows().get(0).getCells().get(0).addParagraph().appendText("Column 1");
table.getRows().get(0).getCells().get(1).addParagraph().appendText("Column 2");
table.getRows().get(0).getCells().get(2).addParagraph().appendText("Column 3");

// Set data rows
table.getRows().get(1).getCells().get(0).addParagraph().appendText("Row 1, Cell 1");
table.getRows().get(1).getCells().get(1).addParagraph().appendText("Row 1, Cell 2");
table.getRows().get(1).getCells().get(2).addParagraph().appendText("Row 1, Cell 3");

table.getRows().get(2).getCells().get(0).addParagraph().appendText("Row 2, Cell 1");
table.getRows().get(2).getCells().get(1).addParagraph().appendText("Row 2, Cell 2");
table.getRows().get(2).getCells().get(2).addParagraph().appendText("Row 2, Cell 3");
```

### Dynamic Table from Data
```java
String[] headers = new String[] { "Name", "Age", "City" };
String[][] rows = new String[][] {
    new String[] { "Alice", "30", "New York" },
    new String[] { "Bob", "25", "London" },
    new String[] { "Charlie", "35", "Tokyo" }
};

WTable table = section.addTable();
table.resetCells(rows.length + 1, headers.length);

// Header row
for (int i = 0; i < headers.length; i++) {
    table.getRows().get(0).getCells().get(i).addParagraph().appendText(headers[i]);
}

// Data rows
for (int r = 0; r < rows.length; r++) {
    for (int c = 0; c < headers.length; c++) {
        table.getRows().get(r + 1).getCells().get(c).addParagraph().appendText(rows[r][c]);
    }
}
```

### Placeholders
- `3, 3` → Replace with `{row-count}, {column-count}`

---

## Cell Formatting

### Borders

```java
table.getTableFormat().getBorders().setBorderType(BorderStyle.Single);
table.getTableFormat().getBorders().setLineWidth(1f);
```

#### Cross-Platform
```java
table.getTableFormat().getBorders().setColor(ColorSupport.fromName("Blue"));
```
### Cell Shading

```java
for (int i = 0; i < table.getRows().get(0).getCells().getCount(); i++) {
    table.getRows().get(0).getCells().get(i).getCellFormat().setBackColor(ColorSupport.fromName("Blue"));
}	
```

### Cell Padding

```java
table.getTableFormat().getPaddings().setAll(5f);
```

### Cell Alignment

```java
WParagraph para = (WParagraph) table.getRows().get(0).getCells().get(0).addParagraph();
para.appendText("Centered text");
para.getParagraphFormat().setHorizontalAlignment(HorizontalAlignment.Center);
table.getRows().get(0).getCells().get(0).getCellFormat().setVerticalAlignment(VerticalAlignment.Middle);
```

### Cell Width

```java
table.getRows().get(0).getCells().get(0).setWidth(150f);
```

---

## Merge Cells

### Horizontal Merge

```java
table.applyHorizontalMerge(0, 0, 2);
```

### Vertical Merge

```java
table.applyVerticalMerge(0,0,2);
```

---

## Add Rows & Columns

### Add Row

```java
WTableRow row = table.addRow();
row.getCells().get(0).addParagraph().appendText("New cell 1");
row.getCells().get(1).addParagraph().appendText("New cell 2");
```

### Add Row with Specific Cell Count

```java
WTable row = table.addRow(true, false);
```

---

## Nested Tables

### Minimal Code

```java
WTable nestedTable = table.getRows().get(1).getCells().get(0).addTable();
nestedTable.resetCells(2, 2);
nestedTable.getRows().get(0).getCells().get(0).addParagraph().appendText("Nested 1");
nestedTable.getRows().get(0).getCells().get(1).addParagraph().appendText("Nested 2");
nestedTable.getRows().get(1).getCells().get(0).addParagraph().appendText("Nested 3");
nestedTable.getRows().get(1).getCells().get(1).addParagraph().appendText("Nested 4");
```

---

## Styled Table (Complete Example)

### Full Example

#### Common Setup
```java
WTable table = (WTable) section.addTable();
table.resetCells(4, 3);

table.getTableFormat().getBorders().setBorderType(BorderStyle.Single);
table.getTableFormat().getBorders().setLineWidth(0.5f);
table.getTableFormat().getPaddings().setAll(5f);

String[] headerTexts = new String[] { "Product", "Quantity", "Price" };
for (int i = 0; i < headerTexts.length; i++) {
    table.getRows().get(0).getCells().get(i).getCellFormat().setBackColor(ColorSupport.fromName("Blue"));

    WParagraph headerPara = (WParagraph) table.getRows().get(0).getCells().get(i).addParagraph();
    WTextRange headerText = (WTextRange) headerPara.appendText(headerTexts[i]);
    headerText.getCharacterFormat().setBold(true);
    headerText.getCharacterFormat().setTextColor(ColorSupport.fromName("White"));
}

String[][] data = new String[][] {
    new String[] { "Widget A", "100", "$5.00" },
    new String[] { "Widget B", "250", "$3.50" },
    new String[] { "Widget C", "75", "$12.00" }
};

for (int r = 0; r < data.length; r++) {
    // alternate row shading (applies to the row added at index r+1)
    if (r % 2 == 1) {
        for (int c = 0; c < data[r].length; c++) {
            table.getRows().get(r + 1).getCells().get(c).getCellFormat()
                    .setBackColor(ColorSupport.fromName("Yellow"));
        }
    }

    for (int c = 0; c < data[r].length; c++) {
        table.getRows().get(r + 1).getCells().get(c).addParagraph().appendText(data[r][c]);
    }
}
```
