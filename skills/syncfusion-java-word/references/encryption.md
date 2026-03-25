# Encryption & Document Protection

> Encrypt with password, open encrypted documents, remove encryption, restrict editing, and manage editable ranges.

---

## Required common usings

```java
import com.syncfusion.docio.*;
import java.io.FileInputStream;
import java.io.FileOutputStream;
```

## Encrypt Document

```java
FileInputStream stream = new FileInputStream("input.docx");
WordDocument doc = new WordDocument(stream, FormatType.Automatic);
doc.encryptDocument("password");
String outputPath = "output.docx";
doc.save(outputPath, FormatType.Docx);
stream.close();
doc.close();
```

### Placeholders
- `"password"` → Replace with `"{encryption-password}"`

---

## Open Encrypted Document

```java
WordDocument doc = new WordDocument("encrypted.docx", "password");
String outputPath = "output.docx";
doc.save(outputPath, FormatType.Docx);
doc.close();
```

### Placeholders
- `"password"` → Replace with `"{decryption-password}"`

---

## Remove Encryption

```java
WordDocument doc = new WordDocument("encrypted.docx", "Password");
doc.removeEncryption();
String outputPath = "output.docx";
doc.save(outputPath, FormatType.Docx);
doc.close();
```

### Placeholders
- `"password"` → Replace with `"{existing-password}"`

---

## Protect Document from Editing

Restricts editing to a specific type. Pass `""` as password for no-password protection.

```java
FileInputStream stream = new FileInputStream("input.docx");
WordDocument doc = new WordDocument(stream, FormatType.Docx);

// ProtectionType options:
//   AllowOnlyComments   – only comments can be added/modified
//   AllowOnlyFormFields – only form field values can be changed
//   AllowOnlyRevisions  – only tracked changes allowed
//   AllowOnlyReading    – read-only; no edits
//   NoProtection        – removes all protection
doc.protect(ProtectionType.AllowOnlyFormFields, "password");

String outputPath = "output.docx";
doc.save(outputPath, FormatType.Docx);

stream.close();
doc.close();
```

### Placeholders
- `ProtectionType.AllowOnlyFormFields` → Replace with desired `ProtectionType`
- `"password"` → Replace with `"{protection-password}"` or `""` for no password

---

## Add Editable Range (within protected document)

Allows a specific portion to remain editable when the rest is read-only.

```java
WordDocument doc = new WordDocument();
doc.ensureMinimal();
WParagraph para = (WParagraph) doc.getLastParagraph();
para.appendText("Protected text. ");
EditableRangeStart rangeStart = para.appendEditableRangeStart();
// Optional: restrict to a group or single user
// rangeStart.setEditorGroup(EditorType.Everyone);
// rangeStart.setSingleUser("user@domain.com");
para.appendText("Editable text.");
para.appendEditableRangeEnd(rangeStart);
doc.protect(ProtectionType.AllowOnlyReading, "password");
String outputPath = "output.docx";
doc.save(outputPath, FormatType.Docx);
doc.close();
```

### Options

```java
rangeStart.setEditorGroup(EditorType.Everyone); // group permission
rangeStart.setSingleUser("user@domain.com");   // single-user permission (mutually exclusive with EditorGroup)
```

---

## Find & Remove Editable Range

```java
// Find by Id
EditableRange range = doc.getEditableRanges().findById("0");

// Remove by instance
doc.getEditableRanges().remove(range);

// Remove by index
doc.getEditableRanges().removeAt(0);
```
