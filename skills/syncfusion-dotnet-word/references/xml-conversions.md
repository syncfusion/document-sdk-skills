# XML Conversions

> Bidirectional XML-DOCX conversion — converting Word Processing XML files to Word documents and Word documents to XML format (WordML), supporting Word 2007+ XML markup with cross-platform and Windows-specific approaches.

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

## Convert Word to XML (WordML)

### Minimal Code

#### Cross-Platform
```csharp
FileStream fileStream = new FileStream("Template.docx", FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
using (WordDocument document = new WordDocument(fileStream, FormatType.Docx))
{
    MemoryStream stream = new MemoryStream();
    document.Save(stream, FormatType.WordML);
    document.Close();
}
fileStream.Close();
```

#### Windows-Specific
```csharp
WordDocument document = new WordDocument("Template.docx", FormatType.Docx);
MemoryStream stream = new MemoryStream();
document.Save(stream, FormatType.WordML);
document.Close();
```

### Save to File

#### Cross-Platform
```csharp
FileStream fileStream = new FileStream("Template.docx", FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
using (WordDocument document = new WordDocument(fileStream, FormatType.Docx))
{
    var outputPath = Path.Combine(Directory.GetCurrentDirectory(), "output", "Output.xml");
    using (FileStream outStream = new FileStream(outputPath, FileMode.Create, FileAccess.ReadWrite))
    {
        document.Save(outStream, FormatType.WordML);
    }
}
fileStream.Close();
```

#### Windows-Specific
```csharp
WordDocument document = new WordDocument("Template.docx", FormatType.Docx);
document.Save("Output.xml", FormatType.WordML);
document.Close();
```

---

## Convert XML (WordML) to Word

### Minimal Code

#### Cross-Platform
```csharp
FileStream fileStream = new FileStream("Template.xml", FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
using (WordDocument document = new WordDocument(fileStream, FormatType.WordML))
{
    MemoryStream stream = new MemoryStream();
    document.Save(stream, FormatType.Docx);
    document.Close();
}
fileStream.Close();
```

#### Windows-Specific
```csharp
WordDocument document = new WordDocument("Template.xml", FormatType.WordML);
MemoryStream stream = new MemoryStream();
document.Save(stream, FormatType.Docx);
document.Close();
```

### Save to File

#### Cross-Platform
```csharp
FileStream fileStream = new FileStream("Template.xml", FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
using (WordDocument document = new WordDocument(fileStream, FormatType.WordML))
{
    var outputPath = Path.Combine(Directory.GetCurrentDirectory(), "output", "Output.docx");
    using (FileStream outStream = new FileStream(outputPath, FileMode.Create, FileAccess.ReadWrite))
    {
        document.Save(outStream, FormatType.Docx);
    }
}
fileStream.Close();
```

#### Windows-Specific
```csharp
WordDocument document = new WordDocument("Template.xml", FormatType.WordML);
document.Save("Output.docx", FormatType.Docx);
document.Close();
```

---

## XML Format Overview

| Aspect | Details |
|--------|---------|
| **Format Name** | Word Processing XML (WordML) |
| **Standard** | Office Open XML (OOXML) / WordprocessingML |
| **Versions Supported** | Word 2007 & later (2007, 2010, 2013, 2016, 2019) |
| **Human Readable** | Yes, XML-based format |
| **Use Case** | XML-based interchange for Word documents |
| **Content Retention** | Retains most formatting and all content (with limitations) |

---

## Key Properties and Methods

| Item | Type | Description |
|------|------|-------------|
| `FormatType.WordML` | Enum | Specifies Word Processing XML format for conversion |
| `FormatType.Docx` | Enum | Specifies DOCX format for conversion |
| `Save(stream, FormatType)` | Method | Save document to stream with specified format |
| `Save(path, FormatType)` | Method | Save document to file with specified format (Windows-specific) |
| `WordDocument(stream, FormatType)` | Constructor | Load document from stream with specified format |
| `WordDocument(path, FormatType)` | Constructor | Load document from file path with specified format (Windows-specific) |

---

## Supported Word Versions

| Version | Format Type | Import | Export | Notes |
|---------|-------------|--------|--------|-------|
| Word 2007 | DOCX | ✓ | ✓ | Full support |
| Word 2010 | DOCX | ✓ | ✓ | Full support |
| Word 2013 | DOCX | ✓ | ✓ | Full support |
| Word 2016 | DOCX | ✓ | ✓ | Full support |
| Word 2019 | DOCX | ✓ | ✓ | Full support |
| WordML 2003 | XML | ✓ | ✗ | Import only; custom XML removed |

---

## Unsupported Elements in Word to XML Conversion

| Element | Status |
|---------|--------|
| Custom Shapes | Not supported |
| Embedded Fonts | Not supported |
| Equations | Not supported |
| SmartArt | Not supported |
| WordArt | Not supported |
| Form Fields | Unparsed in Word Processing 2003 XML |
| OLE Objects | Unparsed in Word Processing 2003 XML |

---

## Common Properties

| Property | Type | Description |
|----------|------|-------------|
| `FormatType` | Enum | Specifies document format (WordML, Docx, etc.) |
| `FileMode.Open` | Enum | Open existing file stream |
| `FileMode.Create` | Enum | Create new file stream |
| `FileAccess.Read` | Enum | Read-only file access |
| `FileAccess.ReadWrite` | Enum | Read and write file access |
| `FileShare.ReadWrite` | Enum | Allow concurrent read and write access |

---

## Important Notes

1. **Word Processing 2007 XML:** Full import and export support
2. **Word Processing 2003 XML:** Import-only support; custom XML elements are automatically removed during import
3. **Element Limitations:** Certain elements like custom shapes, embedded fonts, equations, SmartArt, and WordArt are not supported

---

## Placeholders

- `"Template.docx"` → Replace with `"{docx-file-path}"`
- `"Template.xml"` → Replace with `"{xml-file-path}"`
- `"Output.xml"` → Replace with `"{output-xml-path}"`
- `"Output.docx"` → Replace with `"{output-docx-path}"`

---