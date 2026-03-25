# Document-SDK-Skills

[Document SDK](https://www.syncfusion.com/document-sdk/) Skills are specialized instruction sets that teach AI assistants how to perform specific tasks. Think of them as expert knowledge modules for Syncfusion Document Processing libraries that AI agents can load on demand. These skills follow the [Agent Skills open standard](https://agentskills.io/) and are designed to work seamlessly across multiple AI agents.

## About This Repository

This repository contains **AI-ready skills** that empower AI agents to efficiently handle Office document processing tasks using Syncfusion .NET libraries. Each skill enables your AI to generate C# code for your project or create documents instantly via script execution.

## Included Product Skills

### .NET
- **PDF** - Create, edit, and convert PDF files with support for forms, OCR, digital signatures, encryption, conformance standards (PDF/A, PDF/X), redaction, and barcodes.
- **Word (DOCX)** - Create, edit, and convert Word documents with advanced mail merge, tracked changes, charts, shapes, encryption, and multi-format export.
- **Excel (XLSX)** - Create, edit, and convert Excel documents with support for formulas, charts, pivot tables, conditional formatting, data validation, and encryption.
- **PowerPoint (PPTX)** - Create, edit, and convert PowerPoint presentations with full support for charts, animations, transitions, encryption, and slide-to-image conversion.
- **Markdown** - Create and open Markdown documents with support for headings, tables, lists, images, hyperlinks, code blocks, and blockquotes.
- **Smart Data Extraction** - Extract text, structured fields, Identify the form field and tables from PDFs and images as JSON or new PDF document.
- **Pdf To Image Converter** - Convert the PDF document to image.

### Java
- **Word (DOCX)** - Create and edit Word documents in Java with support for mail merge, track changes, comments, shapes, tables, encryption, and multi-format export (HTML, RTF, Markdown, XML).

### JavaScript
- **PDF** - Create, read and edit PDF files with support for forms, annotations, digital signatures, merge/split, text/image extraction, redaction, and watermarks across TypeScript, JavaScript, Angular, React, Vue, and ASP.NET platforms.

### Flutter
- **PDF** - Create, edit, and convert PDF files with support for forms, digital signatures, encryption and conformance standards (PDF/A-1b, PDF/A-2b and PDF/A-3b).
- **Excel (XLSX)** - Create and manipulate Excel workbooks in Dart with support for worksheets, cell formatting, formulas, charts, data validation, conditional formatting, filtering, and CSV export.

## Getting Started

### How to Integrate Skills

**Step 1: Checkout and copy the required skills**

Clone or download the Document-SDK-Skills repository and copy the product skills you need (e.g., syncfusion-dotnet-pdf, syncfusion-dotnet-word, syncfusion-dotnet-excel, syncfusion-dotnet-powerpoint, syncfusion-dotnet-markdown, syncfusion-dotnet-smart-data-extraction, syncfusion-java-word) from the `skills/` directory.

**Step 2: Install the skills**

Place the copied skill folders in your workspace following this structure:

```
your-workspace/
├── .github/skills/                          # or .claude/skills/ or .codestudio/skills/
│   ├── syncfusion-dotnet-pdf/
│   │   └── SKILL.md
│   ├── syncfusion-dotnet-word/
│   │   └── SKILL.md
│   ├── syncfusion-dotnet-excel/
│   │   └── SKILL.md
│   ├── syncfusion-dotnet-powerpoint/
│   │   └── SKILL.md
│   ├── syncfusion-dotnet-pdf-to-image/
│   │   └── SKILL.md
│   ├── syncfusion-dotnet-markdown/
│   │   └── SKILL.md
│   ├── syncfusion-dotnet-smart-data-extraction/
│   │   └── SKILL.md
│   ├── syncfusion-javascript-pdf/
│   │   └── SKILL.md
│   ├── syncfusion-flutter-pdf/
│   │   └── SKILL.md
│   ├── syncfusion-flutter-excel/
│   │   └── SKILL.md
│   └── syncfusion-java-word/
│       └── SKILL.md
├── your-project-files...
└── Program.cs
```

Each skill directory must contain a `SKILL.md` file that defines the skill's behavior.

**Step 3: Verify and manage your skills**

Type `/skills` in the GitHub Copilot or Code Studio chat to quickly access the Configure Skills menu and manage your installed skills.

**Step 4: Use skills**

There are two ways to use skills:

1. **Automatic loading** - Simply describe your task naturally, and your AI Agent automatically loads the relevant skill:
   ```
   Create a Word document with company letterhead and a data table
   Add a digital signature to the PDF at output/report.pdf  
   ```

2. **Slash commands** - Type `/` in the GitHub Copilot chat to mention available skills. For example:
   ```
   /syncfusion-dotnet-word Create a report with a table of contents
   /syncfusion-dotnet-pdf Merge multiple PDFs into one
   ```

When a skill is loaded, AI Agent gains specialized knowledge of Syncfusion .NET libraries and can help you generate code or execute document operations efficiently.

### Prerequisites

```bash
# .NET SDK 8+
dotnet --version

# dotnet-script (required for Mode 2)
dotnet tool install -g dotnet-script
```

### Syncfusion License

Place your license key in `SyncfusionLicense.txt` at the workspace root, or set the environment variable:

```bash
# Windows
set SYNCFUSION_LICENSE_KEY=your_key_here

# macOS/Linux
export SYNCFUSION_LICENSE_KEY=your_key_here
```

Get a free license: [Syncfusion Community License](https://www.syncfusion.com/products/communitylicense)

### NuGet Packages Used in Mode 2

Install the package for the format you need:

```bash
# Word
dotnet add package Syncfusion.DocIO.Net.Core
dotnet add package Syncfusion.DocIORenderer.Net.Core   # For PDF conversion

# PowerPoint
dotnet add package Syncfusion.Presentation.Net.Core
dotnet add package Syncfusion.PresentationRenderer.Net.Core  # For PDF conversion

# Excel
dotnet add package Syncfusion.XlsIO.Net.Core
dotnet add package Syncfusion.XlsIORenderer.Net.Core   # For PDF conversion

# PDF
dotnet add package Syncfusion.Pdf.Net.Core
dotnet add package Syncfusion.Pdf.Imaging.Net.Core     # For advanced PDF functions

# Markdown
dotnet add package Syncfusion.Markdown

# Smart Data Extraction
dotnet add package Syncfusion.SmartDataExtractor.Net.Core
```

### npm Packages (JavaScript PDF)

```bash
# Core PDF library (required)
npm install @syncfusion/ej2-pdf --save

# Data Extract add-on (only for text/image extraction and redaction)
npm install @syncfusion/ej2-pdf-data-extract --save
```

### Flutter Packages (Flutter Excel)

Add to your `pubspec.yaml`:

```yaml
dependencies:
  syncfusion_flutter_xlsio: ^xx.x.xx
  syncfusion_officechart: ^xx.x.xx   # For chart support
```

Then run: `flutter pub get`

## How it works?

Every skill supports two operating modes:

### Mode 1 — Generate C# Code *(default)*
Produces production-ready C# code and inserts it into your project files (e.g., `Program.cs`). No scripts are created or run. Ideal when you want to learn or integrate document features into your own application.

**Trigger keywords:** `"code"`, `"snippet"`, `"how to"`, `"show me"`, `"sample"`, `"example"`, `"Program.cs"`

### Mode 2 — Execute via CSX Script
Creates a temporary `.csx` script, runs it with `dotnet script`, produces the output file, then cleans up — without touching your project. Ideal when you just want a document generated immediately.

**Trigger keywords:** `"create"`, `"generate"`, `"make"`, `"open"`, `"edit"`, `"modify"`, file paths (e.g., `output/report.docx`)


## Example Prompts

### Word

```
# Mode 1 — Code generation
Show me DocIO code to create a Word document with a title and a paragraph.
How do I add a header and footer with page numbers using Syncfusion DocIO?

# Mode 2 — Document generation
Create a Word document about the top 5 programming languages in 2025.
Open output/report.docx and change its page orientation to Landscape.
Convert output/report.docx to PDF.
```

### PowerPoint

```
# Mode 1 — Code generation
Generate a C# snippet to add a table to a PowerPoint slide using Syncfusion Presentation.

# Mode 2 — Presentation generation
Create a 5-slide meeting agenda presentation and save it to output/agenda.pptx.
Convert output/deck.pptx to PDF.
```

### Excel

```
# Mode 1 — Code generation
Show me XlsIO code to create a workbook with a header row and data rows.
Write Program.cs code using XlsIO to read a CSV and populate a worksheet.

# Mode 2 — Workbook generation
Create a sales summary workbook and save it to output/sales.xlsx.
Open output/report.xlsx and add a pivot table on sheet Data.
```

### PDF

```
# Mode 1 — Code generation
Show me code to merge three PDF files into one using Syncfusion PDF Library.
How do I add a digital signature to a PDF?

# Mode 2 — PDF generation
Create a PDF report with a title page and inventory table, save to output/report.pdf.
Merge output/part1.pdf and output/part2.pdf into output/combined.pdf.
```

### Markdown

```
# Mode 1 — Code generation
Show me how to create a Markdown document with a table using Syncfusion.
How do I add a list and code block to a Markdown file using Syncfusion?

# Mode 2 — Document generation
Create a Markdown report with headings and a table using Syncfusion at output/report.md.
Parse output/notes.md and add a new section with a bulleted list using Syncfusion.
```

### Java Word

```
# Mode 1 — Code generation (Java only)
Show me Java code to create a Word document with a header and footer using Syncfusion DocIO.
How do I perform mail merge with a data source in Java using Syncfusion?
Generate Java code to convert a Word document to HTML.
```

### Smart Data Extraction

```
# Mode 1 — Code generation
Show me code to extract all fields and tables from a PDF as JSON.
Generate a C# snippet to enable OCR fallback during data extraction.
```

### PDF To Image Converter

```
# Mode 1 — Code generation
Show me the C# code to convert pdf to image.
```

### Flutter PDF

```
# Mode 1 — Code generation
Show me code to create PDF files.
Can you share the code snippet how to add rectangle annotation in flutter pdf.
Create flutter sample application to create the pdf document and add bookmarks and save the document to file.
```

### JavaScript PDF

```
# Mode 1 — Code generation
Show me TypeScript code to create a PDF document with text and images using Syncfusion JavaScript PDF Library.
How do I add form fields and digital signatures to a PDF using @syncfusion/ej2-pdf?
Generate a React example to merge two PDF files using Syncfusion JavaScript PDF library.
Show me how to extract text from a PDF using @syncfusion/ej2-pdf-data-extract.
```

### Flutter Excel

```
# Mode 1 — Code generation
Show me Dart code to create an Excel workbook with multiple sheets using Syncfusion Flutter XlsIO.
How do I apply cell formatting and formulas in Flutter XlsIO?
Generate a Flutter example to create a bar chart in an Excel file using Syncfusion XlsIO.
How do I export data to CSV format using Syncfusion Flutter XlsIO?
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `dotnet script` not found | `dotnet tool install -g dotnet-script` |
| License Watermark | Add key to `SyncfusionLicense.txt` or use env var `SYNCFUSION_LICENSE_KEY` |
| Missing NuGet package | Run the appropriate `dotnet add package` command above |
| File access error | Ensure the file isn't open in another application |

## Resources

### .NET
- [Syncfusion DocIO Documentation](https://help.syncfusion.com/document-processing/word/word-library/net/overview)
- [Syncfusion Presentation Documentation](https://help.syncfusion.com/document-processing/powerpoint/powerpoint-library/net/overview)
- [Syncfusion XlsIO Documentation](https://help.syncfusion.com/document-processing/excel/excel-library/net/overview)
- [Syncfusion PDF Documentation](https://help.syncfusion.com/document-processing/pdf/pdf-library/net/overview)
- [Syncfusion PdfToImageConverter Documentation](https://help.syncfusion.com/document-processing/pdf/conversions/pdf-to-image/net/convert-pdf-to-image)
- [Syncfusion Smart Data Extractor Documentation](https://help.syncfusion.com/document-processing/data-extraction/overview)


### Java
- [Syncfusion DocIO for Java Documentation](https://help.syncfusion.com/document-processing/word/word-library/java/overview)

### JavaScript
- [Syncfusion JavaScript PDF Documentation](https://help.syncfusion.com/document-processing/pdf/pdf-library/javascript/overview)

### Flutter
- [Syncfusion Flutter PDF Documentation](https://help.syncfusion.com/document-processing/pdf/pdf-library/flutter/overview)
- [Syncfusion Flutter XlsIO Documentation](https://help.syncfusion.com/document-processing/excel/excel-library/flutter/overview)



## License

Syncfusion Document SDK libraries require a [commercial license](https://www.syncfusion.com/document-sdk) for production use. A [free Community License](https://www.syncfusion.com/products/communitylicense) is also available for individual developers and small businesses.

