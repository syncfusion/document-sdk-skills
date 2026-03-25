# Encryption & Document Protection

> Encrypt with password, open encrypted documents, remove encryption, restrict editing, and manage editable ranges.

---

## Required common usings

```csharp
using Syncfusion.DocIO;
using Syncfusion.DocIO.DLS;
```

## Required usings for Windows-Specific

```csharp
using System;
using System.IO;
```

## Encrypt Document

### Common for Cross-Platform and Windows-Specific
```csharp
var stream = new FileStream("input.docx", FileMode.Open, FileAccess.Read);
var doc = new WordDocument(stream, FormatType.Automatic);
doc.EncryptDocument("password");
doc.Save(outputPath);
stream.Close();
doc.Close();
```

### Placeholders
- `"password"` → Replace with `"{encryption-password}"`

---

## Open Encrypted Document

### Common for Cross-Platform and Windows-Specific
```csharp
var stream = new FileStream("encrypted.docx", FileMode.Open, FileAccess.Read);
var doc = new WordDocument(stream, "password");
doc.Save(outputPath);
stream.Close();
doc.Close();
```

### Placeholders
- `"password"` → Replace with `"{decryption-password}"`

---

## Remove Encryption

### Common for Cross-Platform and Windows-Specific
```csharp
var stream = new FileStream("encrypted.docx", FileMode.Open, FileAccess.Read);
var doc = new WordDocument(stream, FormatType.Docx, "password");
doc.RemoveEncryption();
doc.Save(outputPath);
stream.Close();
doc.Close();
```

### Placeholders
- `"password"` → Replace with `"{existing-password}"`

---

## Protect Document from Editing

Restricts editing to a specific type. Pass `""` as password for no-password protection.
### Common for Cross-Platform and Windows-Specific
```csharp
var stream = new FileStream("input.docx", FileMode.Open, FileAccess.Read);
var doc = new WordDocument(stream, FormatType.Docx);
// ProtectionType options:
//   AllowOnlyComments   – only comments can be added/modified
//   AllowOnlyFormFields – only form field values can be changed
//   AllowOnlyRevisions  – only tracked changes allowed
//   AllowOnlyReading    – read-only; no edits
//   NoProtection        – removes all protection
doc.Protect(ProtectionType.AllowOnlyFormFields, "password");
doc.Save(outputPath);
stream.Close();
doc.Close();
```

### Placeholders
- `ProtectionType.AllowOnlyFormFields` → Replace with desired `ProtectionType`
- `"password"` → Replace with `"{protection-password}"` or `""` for no password

---

## Add Editable Range (within protected document)

Allows a specific portion to remain editable when the rest is read-only.

### Common for Cross-Platform and Windows-Specific
```csharp
var doc = new WordDocument();
doc.EnsureMinimal();
var para = doc.LastParagraph as WParagraph;
para.AppendText("Protected text. ");
var rangeStart = para.AppendEditableRangeStart();
// Optional: restrict to a group or single user
// rangeStart.EditorGroup = EditorType.Everyone;
// rangeStart.SingleUser  = "user@domain.com";
para.AppendText("Editable text.");
para.AppendEditableRangeEnd(rangeStart);
doc.Protect(ProtectionType.AllowOnlyReading, "password");
doc.Save(outputPath);
doc.Close();
```

### Options

#### Common for Cross-Platform and Windows-Specific
```csharp
rangeStart.EditorGroup = EditorType.Everyone;   // group permission
rangeStart.SingleUser  = "user@domain.com";     // single-user permission (mutually exclusive with EditorGroup)
```

---

## Find & Remove Editable Range

### Common for Cross-Platform and Windows-Specific
```csharp
// Find by Id
var range = doc.EditableRanges.FindById("0");

// Remove by instance
doc.EditableRanges.Remove(range);

// Remove by index
doc.EditableRanges.RemoveAt(0);
```
