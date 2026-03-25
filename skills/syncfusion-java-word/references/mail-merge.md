# Mail Merge

> Data-driven document generation — simple field merge, merge with regions, images, and nested merge.

---

## Required common usings

```java
import com.syncfusion.docio.*;
import com.syncfusion.javahelper.system.data.DataTableSupport;
```

## Simple Field Mail Merge

### Minimal Code

```java
// Open a template with merge fields, or create fields programmatically
WordDocument doc = new WordDocument();
WSection section = (WSection) doc.addSection();

// Add a paragraph with merge fields
WParagraph para = (WParagraph) section.addParagraph();
para.appendText("Dear ");
para.appendField("FirstName", FieldType.FieldMergeField);
para.appendText(", welcome to ");
para.appendField("Company", FieldType.FieldMergeField);
para.appendText("!");

// Define field names and values
String[] fieldNames = new String[] { "FirstName", "Company" };
String[] fieldValues = new String[] { "Alice", "Contoso" };

// Execute mail merge
doc.getMailMerge().execute(fieldNames, fieldValues);
doc.close();
```

### Placeholders
- `"FirstName"`, `"Company"` → Replace with `"{field-name}"`
- `"Alice"`, `"Contoso"` → Replace with `"{field-value}"`

---

## Mail Merge with Group (Repeated Regions)

### Minimal Code

```java
WordDocument doc = new WordDocument();
WSection section = (WSection) doc.addSection();

// Title
WParagraph title = (WParagraph) section.addParagraph();
title.appendText("Employee Report");
title.applyStyle(BuiltinStyle.Heading1);

// Create a table for the merge region
WTable table = (WTable) section.addTable();
table.resetCells(2, 3);

// Header row
table.getRows().get(0).getCells().get(0).addParagraph().appendText("Name");
table.getRows().get(0).getCells().get(1).addParagraph().appendText("Department");
table.getRows().get(0).getCells().get(2).addParagraph().appendText("Location");

// Add BeginGroup field before the first merge field.
WParagraph beginGroup = (WParagraph) table.getRows().get(1).getCells().get(0).addParagraph();
beginGroup.appendField("BeginGroup:Employees", FieldType.FieldMergeField);

// Template row with merge fields (this row will be repeated)
table.getRows().get(1).getCells().get(0).addParagraph().appendField("Name", FieldType.FieldMergeField);
table.getRows().get(1).getCells().get(1).addParagraph().appendField("Department", FieldType.FieldMergeField);
table.getRows().get(1).getCells().get(2).addParagraph().appendField("Location", FieldType.FieldMergeField);

// Add EndGroup field after the last merge field.
WParagraph endGroup = (WParagraph) table.getRows().get(1).getCells().get(2).addParagraph();
endGroup.appendField("EndGroup:Employees", FieldType.FieldMergeField);

// Create data as a List of Maps (replace with DataTable if your SDK expects it)
DataTableSupport dataTable = new DataTableSupport("Employees");
dataTable.getColumns().add("Name");
dataTable.getColumns().add("Department");
dataTable.getColumns().add("Location");
dataTable.getRows().add(new Object[] { "Alice", "Engineering", "New York" });
dataTable.getRows().add(new Object[] { "Bob", "Marketing", "London" });
dataTable.getRows().add(new Object[] { "Charlie", "Sales", "Tokyo" });

// Execute mail merge with group
doc.getMailMerge().executeGroup(dataTable);

doc.close();
```

### Placeholders
- `"Employees"` → Replace with `"{group-name}"`
- Column names → Replace with actual field names

---

## Mail Merge with Arrays (No DataTable)

### Minimal Code

```java
WordDocument doc = new WordDocument();
WSection section = (WSection) doc.addSection();

WParagraph para = (WParagraph) section.addParagraph();
para.appendText("Invoice for ");
para.appendField("CustomerName", FieldType.FieldMergeField);
section.addParagraph();

WParagraph details = (WParagraph) section.addParagraph();
details.appendText("Order #: ");
details.appendField("OrderNumber", FieldType.FieldMergeField);
section.addParagraph();

WParagraph amount = (WParagraph) section.addParagraph();
amount.appendText("Total: ");
amount.appendField("TotalAmount", FieldType.FieldMergeField);

// Execute with string arrays
String[] fieldNames = new String[] { "CustomerName", "OrderNumber", "TotalAmount" };
String[] fieldValues = new String[] { "Contoso Ltd.", "INV-2026-001", "$1,250.00" };
doc.getMailMerge().execute(fieldNames, fieldValues);
doc.close();
```

---

## Mail Merge from Template File

### Minimal Code

```java
// Open an existing template document with merge fields
Path templatePath = Paths.get(System.getProperty("user.dir"), "input", "{template-file}.docx");
// Cross-Platform
WordDocument doc = new WordDocument(templatePath.toString(), FormatType.Docx);
// Windows-Specific alternative:
// WordDocument doc = new WordDocument(templatePath.toString());

// Execute merge with field names and values
doc.getMailMerge().execute(
new String[] { "Date", "RecipientName", "Subject" },
new String[] { "March 5, 2026", "John Smith", "Monthly Report" }
);

// Save as a new document
Path outputPath = Paths.get(System.getProperty("user.dir"), "output", "{filename}.docx");
doc.save(outputPath.toString());
doc.close();
```

### Placeholders
- `"{template-file}.docx"` → Replace with actual template filename
- `"{filename}.docx"` → Replace with output filename

---

## Mail Merge Events (Custom Formatting)

### Minimal Code

```java
//Uses the mail merge events to perform the conditional formatting during runtime.
document.getMailMerge().MergeField.add("applyAlternateRecordsTextColor", new MergeFieldEventHandler() {
ListSupport<MergeFieldEventHandler> delegateList = new ListSupport<MergeFieldEventHandler>(
MergeFieldEventHandler.class);
// Represents event handling for MergeFieldEventHandlerCollection.
public void invoke(Object sender, MergeFieldEventArgs args) throws Exception 
{
	applyAlternateRecordsTextColor(sender, args);
}
// Represents the method that handles MergeField event.
public void dynamicInvoke(Object... args) throws Exception 
{
	applyAlternateRecordsTextColor((Object) args[0], (MergeFieldEventArgs) args[1]);
}
// Represents the method that handles MergeField event to add collection item.
public void add(MergeFieldEventHandler delegate) throws Exception 
{
	if (delegate != null)
		delegateList.add(delegate);
}
// Represents the method that handles MergeField event to remove collection item.
public void remove(MergeFieldEventHandler delegate) throws Exception 
{
	if (delegate != null)
		delegateList.remove(delegate);
}
});
//Executes Mail Merge with groups.
document.getMailMerge().executeGroup(getDataTable());

private void applyAlternateRecordsTextColor (Object sender, MergeFieldEventArgs args) throws Exception
{
    //Sets text color to the alternate mail merge record.
	if (Integer.compare((args.getRowIndex() % 2),0)==0)
	{
		args.getTextRange().getCharacterFormat().setTextColor(ColorSupport.fromArgb(255, 102, 0));
	}
}
```

---

## Nested Mail Merge

### Minimal Code

```java
// Nested mail merge requires a relational DataSet
Path templatePath = Paths.get(System.getProperty("user.dir"), "input", "{template-file}.docx");
WordDocument doc = new WordDocument(templatePath.toString(), FormatType.Docx);

// Create a new DataSet equivalent using Map of DataTables
Map<String, DataTableSupport> dataSet = new HashMap<>();

// Master table (Orders)
DataTableSupport masterTable = new DataTableSupport("Orders");
masterTable.getColumns().add("OrderID");
masterTable.getColumns().add("CustomerName");
masterTable.getRows().add(new Object[] { "ORD-001", "Alice" });
masterTable.getRows().add(new Object[] { "ORD-002", "Bob" });

// Detail table (Items)
DataTableSupport detailTable = new DataTableSupport("Items");
detailTable.getColumns().add("OrderID");
detailTable.getColumns().add("Product");
detailTable.getColumns().add("Quantity");
detailTable.getRows().add(new Object[] { "ORD-001", "Widget A", "10" });
detailTable.getRows().add(new Object[] { "ORD-001", "Widget B", "5" });
detailTable.getRows().add(new Object[] { "ORD-002", "Widget C", "20" });

// Add tables to dataset
dataSet.put("Orders", masterTable);
dataSet.put("Items", detailTable);

// Execute nested mail merge with dataSet
doc.getMailMerge().executeNestedGroup((MailMergeDataTable) dataSet);

doc.close();
```

---

## Mail Merge with DataTable

### Minimal Code

```java
WordDocument doc = new WordDocument();
IWSection section = doc.addSection();

// Add merge fields
IWParagraph para = section.addParagraph();
para.appendField("Name", FieldType.FieldMergeField);
section.addParagraph().appendField("Email", FieldType.FieldMergeField);
section.addParagraph().appendField("Phone", FieldType.FieldMergeField);

// Create DataTable
DataTableSupport dt = new DataTableSupport();
dt.getColumns().add("Name");
dt.getColumns().add("Email");
dt.getColumns().add("Phone");
dt.getRows().add(new Object[] { "John Doe", "john@example.com", "555-0001" });
dt.getRows().add(new Object[] { "Jane Smith", "jane@example.com", "555-0002" });

// Execute with DataTable
doc.getMailMerge().execute(dt);
doc.close();
```

---

## Mail Merge with Dynamic Objects

### Minimal Code

```java
// Create dynamic data source
Map<String, Object> obj = new HashMap<>();
obj.put("Title", "Invoice");
obj.put("InvoiceID", "INV-2026-001");
obj.put("Amount", "$5,000.00");

WordDocument doc = new WordDocument();
WSection section = (WSection) doc.addSection();

section.addParagraph().appendField("Title", FieldType.FieldMergeField);
section.addParagraph().appendField("InvoiceID", FieldType.FieldMergeField);
section.addParagraph().appendField("Amount", FieldType.FieldMergeField);

// Execute with dynamic-like object
// doc.getMailMerge().execute(new Object[] { obj });
doc.close();
```

---

## Mail Merge with Business Objects

### Minimal Code

```java
// Define business object class
public class Employee {
    private String name;
    private String position;
    private String department;

    public Employee() {}

    public Employee(String name, String position, String department) {
        this.name = name;
        this.position = position;
        this.department = department;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}

// Create list of business objects
 List<Employee> employees = Arrays.asList(
    new Employee("Alice", "Manager", "HR"),
    new Employee("Bob", "Developer", "IT")
);

WordDocument doc = new WordDocument();
WSection section = doc.addSection();

// Add merge fields matching property names
section.addParagraph().appendField("Name", FieldType.FieldMergeField);
section.addParagraph().appendField("Position", FieldType.FieldMergeField);
section.addParagraph().appendField("Department", FieldType.FieldMergeField);

// Execute with business object collection
doc.getMailMerge().execute(employees);
doc.close();
```

---

## Mail Merge with DataView

### Minimal Code

```java
// Create and filter DataTable
List<Map<String, String>> dt = new ArrayList<>();
Map<String, String> r1 = new HashMap<>(); r1.put("Name", "Alice"); r1.put("Status", "Active"); dt.add(r1);
Map<String, String> r2 = new HashMap<>(); r2.put("Name", "Bob"); r2.put("Status", "Inactive"); dt.add(r2);
Map<String, String> r3 = new HashMap<>(); r3.put("Name", "Charlie"); r3.put("Status", "Active"); dt.add(r3);

// Create DataView: filter Status='Active', sort by Name
List<Map<String, String>> dv = dt.stream()
.filter(row -> "Active".equals(row.get("Status")))
.sorted(Comparator.comparing(row -> row.get("Name")))
.collect(Collectors.toList());

WordDocument doc = new WordDocument();
WSection section = (WSection) doc.addSection();

section.addParagraph().appendField("Name", FieldType.FieldMergeField);
section.addParagraph().appendField("Status", FieldType.FieldMergeField);

// Execute with DataView-like collection
doc.getMailMerge().execute(dv);
doc.close();
```

---

## Mail Merge with XML

### Minimal Code

```java
 Path xmlPath = Paths.get(System.getProperty("user.dir"), "input", "data.xml");
// Parse XML and build a list of rows from the first table element
List<Map<String, String>> tableRows = new ArrayList<>();
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
DocumentBuilder db = dbf.newDocumentBuilder();
Document xmlDoc = db.parse(xmlPath.toFile());
Element root = xmlDoc.getDocumentElement();

// Find first table element (skip text nodes)
NodeList rootChildren = root.getChildNodes();
Element tableElement = null;
for (int i = 0; i < rootChildren.getLength(); i++) {
    Node n = rootChildren.item(i);
    if (n.getNodeType() == Node.ELEMENT_NODE) {
        tableElement = (Element) n;
        break;
    }
}

if (tableElement != null) {
    NodeList rows = tableElement.getChildNodes();
    for (int i = 0; i < rows.getLength(); i++) {
        Node rowNode = rows.item(i);
        if (rowNode.getNodeType() != Node.ELEMENT_NODE) continue;
        Map<String, String> row = new HashMap<>();
        NodeList fields = rowNode.getChildNodes();
        for (int j = 0; j < fields.getLength(); j++) {
            Node f = fields.item(j);
            if (f.getNodeType() != Node.ELEMENT_NODE) continue;
            row.put(f.getNodeName(), f.getTextContent());
        }
        tableRows.add(row);
    }
}

// Build document and merge fields
WordDocument doc = new WordDocument();
WSection section = (WSection) doc.addSection();

section.addParagraph().appendField("ProductName", FieldType.FieldMergeField);
section.addParagraph().appendField("Price", FieldType.FieldMergeField);

// Execute merge with the first table's rows
doc.getMailMerge().executeGroup((MailMergeDataTable) tableRows);
doc.close();
```

---

## Mail Merge with JSON

### Minimal Code

```java
Path jsonPath = Paths.get(System.getProperty("user.dir"), "input", "data.json");
String jsonContent = Files.readString(jsonPath);

ObjectMapper mapper = new ObjectMapper();
List<Map<String, Object>> jsonData = mapper.readValue(
    jsonContent, new TypeReference<List<Map<String, Object>>>() {}
);

// Convert JSON list to DataTable-like List<Map<String,String>>
List<Map<String, String>> dt = new ArrayList<>();
if (jsonData != null && !jsonData.isEmpty()) {
    for (Map<String, Object> item : jsonData) {
        Map<String, String> row = new LinkedHashMap<>();
        for (Map.Entry<String, Object> e : item.entrySet()) {
            row.put(e.getKey(), e.getValue() == null ? "" : e.getValue().toString());
        }
        dt.add(row);
    }
}

WordDocument doc = new WordDocument();
WSection section = (WSection) doc.addSection();

section.addParagraph().appendField("FirstName", FieldType.FieldMergeField);
section.addParagraph().appendField("LastName", FieldType.FieldMergeField);

// Execute with DataTable-like collection
doc.getMailMerge().execute(dt);
doc.close();
```

---

## Mail Merge Image Field (Image:FieldName)

### Minimal Code

```java
Path imagePath = Paths.get(System.getProperty("user.dir"), "input", "photo.jpg");
WordDocument doc = new WordDocument();
IWSection section = doc.addSection();

// Add image merge field with "Photo: " prefix
IWParagraph para = section.addParagraph();
para.appendText("Photo: ");
para.appendField("Image:Photo", FieldType.FieldMergeField);

String[] fieldNames = new String[] { "Photo" };
String[] fieldValues = new String[] { imagePath.toString() };

// Execute mail merge with image
doc.getMailMerge().execute(fieldNames, fieldValues);
doc.close();
```

---

## MergeImageField Event

### Minimal Code

```java
//Uses the mail merge events handler for image fields.
document.getMailMerge().MergeImageField.add("mergeField_ProductImage", new MergeImageFieldEventHandler() {
ListSupport<MergeImageFieldEventHandler> delegateList = new ListSupport<MergeImageFieldEventHandler>(
MergeImageFieldEventHandler.class);
//Represents event handling for MergeImageFieldEventHandlerCollection.
public void invoke(Object sender, MergeImageFieldEventArgs args) throws Exception
{
	mergeField_ProductImage(sender, args);
}
//Represents the method that handles MergeImageField event.
public void dynamicInvoke(Object... args) throws Exception 
{
	mergeField_ProductImage((Object) args[0], (MergeImageFieldEventArgs) args[1]);
}
//Represents the method that handles MergeImageField event to add collection item.
public void add(MergeImageFieldEventHandler delegate) throws Exception 
{
	if (delegate != null)
		delegateList.add(delegate);
}
//Represents the method that handles MergeImageField event to remove collection item.
public void remove(MergeImageFieldEventHandler delegate) throws Exception 
{
	if (delegate != null)
		elegateList.remove(delegate);
}
});
// Execute mail merge
doc.MailMerge.Execute(fieldNames, fieldValues);
// Subscribe to MergeImageField event for custom image processing
private void mergeField_ProductImage(Object sender, MergeImageFieldEventArgs args) throws Exception 
{
	//Binds image from file system during mail merge.
	if ((args.getFieldName()).equals("Photo")) 
	{
		String ProductFileName = args.getFieldValue().toString();
		//Gets the image from file system.
		FileStreamSupport imageStream = new FileStreamSupport(ProductFileName, FileMode.Open, FileAccess.Read);
		ByteArrayInputStream stream = new ByteArrayInputStream(imageStream.toArray());
		args.setImageStream(stream);
	}
}
```

---

## BeforeClearField and BeforeClearGroupField Events

### Minimal Code

```java
// Registering the handlers with the MailMerge instance
doc.getMailMerge().setClearFields(false);
doc.getMailMerge().BeforeClearGroupField.add("beforeClearGroupFields",new BeforeClearGroupFieldEventHandler() {
ListSupport<BeforeClearGroupFieldEventHandler> delegateList = new ListSupport<BeforeClearGroupFieldEventHandler>( BeforeClearGroupFieldEventHandler.class);
// Represents event handling
public void invoke(Object sender, BeforeClearGroupFieldEventArgs args) throws Exception {
    beforeClearGroupFields(sender, args);
}
// Dynamic invoke support
public void dynamicInvoke(Object... args) throws Exception {
    beforeClearGroupFields(args[0],   (BeforeClearGroupFieldEventArgs) args[1]);
}
// Add delegate
public void add(BeforeClearGroupFieldEventHandler delegate)  throws Exception {
    if (delegate != null)
        delegateList.add(delegate);
}
// Remove delegate
public void remove(BeforeClearGroupFieldEventHandler delegate) throws Exception {
    if (delegate != null)
        delegateList.remove(delegate);
}
});
doc.MailMerge.ExecuteGroup(GetDataTable());
// Handle unmerged fields
private static void beforeClearFields( Object sender,BeforeClearFieldEventArgs args) throws Exception {
        // Check if field has mapping in data source
        if (args.getHasMappedFieldInDataSource()) {     	
        	Object value = args.getFieldValue();

            // If field value is null, set error message
            if (value == null) {
                args.setFieldValue(
                    "Error! Field " + args.getFieldName() + " is Null."
                );
            } else {
                // Clear field if value exists
                args.setClearField(true);
            }

        } else {
            // Field not found in data source
            args.setFieldValue(
                "Error! Field " + args.getFieldName()
                + " not found in data source."
            );
        }
    }
// Handle unmerged group fields
private static void beforeClearGroupFields( Object sender,BeforeClearGroupFieldEventArgs args) throws Exception {
    if (!args.getHasMappedGroupInDataSource()) {
        // Group not found in data source
        string groupName = args.GroupName;
        // Optionally provide alternate data or clear group
        args.setClearGroup(true); // Remove group if no data
    }
}
```

---

## Field Mapping (Automatic)

### Minimal Code

```java
List<Map<String, String>> table = new ArrayList<>();
Map<String, String> row = new LinkedHashMap<>();
row.put("FirstName", "John"); // column name != merge field name
row.put("LastName", "Doe");
table.add(row);

WordDocument doc = new WordDocument();
IWSection section = doc.addSection();

// Add merge fields that will be used by mapped names
section.addParagraph().appendField("Name", FieldType.FieldMergeField);
section.addParagraph().appendField("Surname", FieldType.FieldMergeField);

// Map data columns to merge field names
doc.getMailMerge().getMappedFields().add("FirstName", "Name");
doc.getMailMerge().getMappedFields().add("LastName", "Surname");

// Execute with field mapping
doc.getMailMerge().executeGroup((MailMergeDataTable) table);
doc.close();
```

---

## Retrieve Merge Field Names

### Minimal Code

```java
Path templatePath = Paths.get(System.getProperty("user.dir"), "input", "template.docx");
WordDocument doc = new WordDocument(templatePath.toString(), FormatType.Docx);

String[] fieldNames = doc.getMailMerge().getMergeFieldNames();
System.out.println("Merge Fields: " + String.join(", ", fieldNames));

String[] groupNames = doc.getMailMerge().getMergeFieldNames();
System.out.println("Group Fields: " + String.join(", ", groupNames));
doc.close();
```

---

## Remove Empty Paragraphs

### Minimal Code

```java
WordDocument doc = new WordDocument();
IWSection section = doc.addSection();

section.addParagraph().appendField("OptionalField", FieldType.FieldMergeField);

// Enable removal of empty paragraphs when field has no data
doc.getMailMerge().setRemoveEmptyParagraphs(true);

doc.getMailMerge().execute(
new String[] { "OptionalField" },
new String[] { "" } // Empty value
);

doc.close();
```

---

## Clear Fields Option

### Minimal Code

```java
WordDocument doc = new WordDocument();
IWSection section = doc.addSection();

section.addParagraph().appendField("Field1", FieldType.FieldMergeField);
section.addParagraph().appendField("Field2", FieldType.FieldMergeField);

// Control unmerged field removal
doc.getMailMerge().setClearFields(true);  // Remove unmerged fields (default)
doc.getMailMerge().setClearFields(false); // Keep unmerged fields in output

doc.getMailMerge().execute(
    new String[] { "Field1" },
    new String[] { "Value1" }
);

doc.close();
```
