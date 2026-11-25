---
name: syncfusion-javascript-excel
description: Create, open, edit, and save Excel (.xlsx) workbooks programmatically with Syncfusion `@syncfusion/ej2-xlsx` in JavaScript and TypeScript, for Node.js and browser hosts. Supports two modes — generate TypeScript/JavaScript code for the user's project (default), or execute a temporary Node.js script that produces a workbook file. Use for Excel/xlsx/workbook file processing, cells, formulas, styles, tables, charts, images, validation, conditional formatting, protection, and page setup. Not for the EJ2 Spreadsheet or Grid UI components.
metadata:
  author: Syncfusion Inc
  version: "34.1.29"
---

# Syncfusion JavaScript Excel (`@syncfusion/ej2-xlsx`)

Programmatic Excel (`.xlsx`) create / open / edit / save for **Node.js and browsers**. This is a **file-processing library**, not a spreadsheet UI.

**Package:** `@syncfusion/ej2-xlsx`  
**Import surface:** `import { … } from '@syncfusion/ej2-xlsx'` only  
**Not this skill:** EJ2 Spreadsheet component, Grid UI, formula calculation engines, VBA execution

Use this skill for file processing (reports, exports, ETL, templates, round-tripping workbooks). For an on-screen editable grid use the EJ2 Spreadsheet or Grid component instead.

## Two modes — choose from the full user intent

Infer intent from the whole request, not from keywords alone.

### Mode 1: Coding Assistant *(default)*

Use when the user wants code, examples, snippets, integration guidance, explanations, API usage, or changes to project code. Example phrases: "show me how", "write code", "snippet", "integrate", "how do I add a chart", "return bytes for download".

1. **Detect the host:** Node.js or browser; TypeScript (`tsconfig.json` or `.ts` sources → prefer TypeScript) or JavaScript; ESM or CommonJS; framework (React, Angular, Vue) when identifiable.
2. **Check the dependency:** tell the user to `npm install @syncfusion/ej2-xlsx` if it is missing from `package.json`.
3. **Generate code from the reference files only** — see the rules below.
4. **Do not** execute code, create temporary scripts, or create workbook output files.

### Mode 2: Execution *(only on explicit request)*

Use only when the user explicitly asks to run something or to receive a finished workbook file. Example phrases: "create an Excel file", "generate a workbook", "update this xlsx and save a copy", "open this workbook and change B2", "save the result to output/report.xlsx", "run the script", "produce the completed spreadsheet".

- Requires a **Node.js** environment (18+). In a browser-only workflow, stay in Mode 1 and say that execution is unavailable.
- Full procedure: [references/execution-mode.md](references/execution-mode.md). Summary:
  1. Copy `scripts/template.ts` to `{skill-root}/syncfusion-javascript-excel/scripts/temp-{timestamp}.ts` (never the workspace root).
  2. Fill in `buildWorkbook()` using only APIs from the reference files.
  3. Install dependencies inside `scripts/` (`npm install --no-save --no-package-lock @syncfusion/ej2-xlsx tsx`) if `scripts/node_modules` is absent.
  4. Run `npx tsx temp-{timestamp}.ts --output <file.xlsx> [--input <file.xlsx>]` from the workspace directory that should contain the output.
  5. Verify the output exists and is non-empty, delete the temp script, report SUCCESS/ERROR and the output path.
- Never delete the output workbook or the user's input workbook. Do not modify unrelated project files.

### Examples

| Request | Mode | Result |
|---|---|---|
| "Show me how to create a workbook with a styled header" | 1 | TypeScript snippet only |
| "Open a workbook and update B2" (code) | 1 | Snippet using `Workbook.open` / `save` |
| "Add formulas, validation, and conditional formatting" | 1 | Snippet |
| "Return XLSX bytes so the browser can download it" | 1 | `save()` bytes + `Blob` download snippet |
| "Create output/sales-report.xlsx with a chart" | 2 | File created at the path |
| "Update the uploaded `in.xlsx` and save a new copy" | 2 | New file; input untouched |
| "Generate a workbook with several sheets, formulas, and a chart" | 2 | File created |

## Documentation and navigation guide

### Execution mode
📄 **Read:** [references/execution-mode.md](references/execution-mode.md)
- Mode 2 procedure, `scripts/template.ts`, validation, cleanup

### Browser and Node.js I/O
📄 **Read:** [references/browser-and-node-io.md](references/browser-and-node-io.md)
- Bytes vs path overloads, browser download/upload, Node file output

### Getting started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Install and import
- `Workbook.create` / `open` / `save`
- Node path vs browser bytes
- Minimal create → write cells → save

### Workbook and sheets
📄 **Read:** [references/workbook-and-sheets.md](references/workbook-and-sheets.md)
- `sheet(name|index)`, `activeSheet`, add/remove/move sheets
- Visibility, grid lines, zoom, column width / row height
- Named ranges (`names`), document properties, `date1904`
- Workbook protect / unprotect

### Cells, values, and addresses
📄 **Read:** [references/cells-values-and-addresses.md](references/cells-values-and-addresses.md)
- `cell('A1')` and `cell(row, col)` (1-based)
- `value` / `text` / `number` / `dateTime`
- Sparse grid; clear vs empty
- Error values (`isCellError`)

### Formulas, merges, and hyperlinks
📄 **Read:** [references/formulas-and-merged-hyperlinks.md](references/formulas-and-merged-hyperlinks.md)
- Formula text only (never evaluated)
- No implicit `=+/−/@` promotion on values
- Merged cells
- Hyperlinks (`url` | `file` | `unc` | `workbook`)

### Styles and number formats
📄 **Read:** [references/styles-number-formats.md](references/styles-number-formats.md)
- `CellStyle`: font, fill, border, alignment, protection
- `numberFormat` and built-in vs custom codes
- Append-only style tables (never renumber)

### Rich text and shared strings
📄 **Read:** [references/rich-text-and-shared-strings.md](references/rich-text-and-shared-strings.md)
- `workbook.createFont()` + `cell.richText`
- Shared string storage behavior

### Tables, filters, and sort
📄 **Read:** [references/tables-filters-sort.md](references/tables-filters-sort.md)
- Excel Tables (`tables.add`)
- AutoFilter and sort **metadata only** (not runtime filter/sort engines)

### Charts
📄 **Read:** [references/charts.md](references/charts.md)
- `addChart` + `ChartType.*`
- Legend, title, series
- Do not use `@syncfusion/ej2-xlsx/internal/charts` in app samples

### Images, shapes, and text boxes
📄 **Read:** [references/images-shapes-textboxes.md](references/images-shapes-textboxes.md)
- `addImage` / `addShape` / `addTextBox`
- Anchors in points; preset shapes

### Data validation
📄 **Read:** [references/data-validation.md](references/data-validation.md)
- Whole, decimal, list, date, custom, etc.
- Operators, error UI, list dropdown polarity

### Conditional formatting
📄 **Read:** [references/conditional-formatting.md](references/conditional-formatting.md)
- `conditionalFormats.add(sqref)`
- cellIs, expression, colorScale, dataBar, iconSet, top10, …
- DXF append-only; no runtime paint

### Comments, form controls, and sheet protection
📄 **Read:** [references/comments-controls-protection.md](references/comments-controls-protection.md)
- Classic notes and threaded comments
- Check boxes, combo boxes, and other form controls
- Sheet protect allow-flags; freeze panes

### Page setup, print areas, headers and footers
📄 **Read:** [references/page-setup.md](references/page-setup.md)
- `sheet.pageSetup`: orientation, margins, scaling, headers/footers, print area/titles

### API conventions
📄 **Read:** [references/api-conventions.md](references/api-conventions.md)
- Index bases (sheet 0-based; cell row/col 1-based)
- Public surface vs internal
- Async save/open; TypeScript patterns

### Capability boundaries
📄 **Read:** [references/capability-boundaries.md](references/capability-boundaries.md)
- What the library does **not** do
- OOXML preservation and security limits
- Workbook protect ≠ file encryption
- Feature support matrix
- Verified findings from invoice testing (style + number format, fit-to-page, text boxes)

### Security and troubleshooting
📄 **Read:** [references/security-and-troubleshooting.md](references/security-and-troubleshooting.md)
- Untrusted input, path safety, licensing, large workbooks, common errors

## Quick start

```ts
import { Workbook } from '@syncfusion/ej2-xlsx';

async function main(): Promise<void> {
  const wb = Workbook.create();
  const sheet = wb.sheet(0); // first sheet; index is 0-based

  sheet.cell('A1').value = 42;
  sheet.cell(1, 2).text = 'hello'; // row 1, column 2 → B1
  sheet.cell('A3').formula = 'SUM(A1:A1)'; // stored as text; leading = stripped
  sheet.cell('A4').numberFormat = '#,##0.00';
  sheet.cell('A4').value = 1234.5;

  // Browser / any host: bytes
  const bytes = await wb.save();

  // Round-trip
  const again = await Workbook.open(bytes);
  const a1 = again.sheet(0).cell('A1').value; // 42

  // Node only: path overload
  // await wb.save('./out.xlsx');
  // const fromDisk = await Workbook.open('./out.xlsx');
  void a1;
}

main().catch((err) => { console.error(err); process.exitCode = 1; });
```

## Core rules (always apply)

1. **Formulas are text.** Never evaluate; never resolve external workbook links.
2. **No implicit formula promotion.** `cell.value = '=1+1'` stays a **string**, not a formula. Use `cell.formula`.
3. **Sparse grid.** Do not allocate cells from dimension/spans/column ranges alone.
4. **Append-only shared tables.** Shared strings, styles, number formats, `dxf` — never renumber existing indices.
5. **Preserve unknown OOXML** on load/save when the library does not model a part.
6. **Public API only** in samples: import from `@syncfusion/ej2-xlsx`. Do not teach `./internal/charts` for application authors.
7. **Indexing:** `sheet(i)` is **0-based**; `cell(row, col)` is **1-based**; A1 strings always work.
8. Prefer `sheet(0)` or `wb.activeSheet` over non-public helpers in teaching samples.
9. `getCell` is deprecated — use **`cell`**.
10. Workbook/sheet **protect** is OOXML protection, **not** AES file encryption / password-to-open.
11. `cell.style = {...}` and `cell.numberFormat = '...'` overwrite each other; put `numFmtId` inside the style object (see `references/styles-number-formats.md`).
12. `isFitToPage` does not write the `fitToPage` flag; report fit-to-one-page as a limitation (see `references/page-setup.md`).

## Safety and file-handling rules

- Never overwrite the input workbook unless explicitly asked; default to a separate output file. Never delete the user's input or output workbook.
- Validate/sanitize user-supplied paths (the template keeps them inside the working directory and requires `.xlsx`).
- Do not log cell values unless the request requires it.
- Formulas are stored, not calculated: never claim recalculation; report cached values only if present.
- Protection (`protect`) is not password-to-open encryption.
- Claim OOXML preservation only as described in [references/capability-boundaries.md](references/capability-boundaries.md).
- Never use openpyxl, pandas, ExcelJS, SheetJS, or any other workbook library when this skill is selected.
- Features not exposed by this library (CSV, JSON, PDF conversion, pivot tables, sparklines, find/replace, encryption, etc.) are not assumed here — check the matrix in capability-boundaries before offering them.

## Common patterns

### Write a column of values

```ts
const sheet = wb.sheet(0);
const rows = ['Name', 'Ada', 'Lin'];
for (let r = 0; r < rows.length; r++) {
  sheet.cell(r + 1, 1).text = rows[r];
}
```

### Style a header

```ts
sheet.cell('A1').text = 'Total';
sheet.cell('A1').style = {
  font: { bold: true, size: 12 },
  fill: { type: 'pattern', patternType: 'solid', fgColor: { rgb: 'FF4472C4' } },
  alignment: { horizontal: 'center' },
};
```

### Open → edit → save (Node)

```ts
const wb = await Workbook.open('./in.xlsx');
wb.sheet('Sheet1').cell('B2').value = 100;
await wb.save('./out.xlsx');
```

## Import checklist

Typical named imports from `@syncfusion/ej2-xlsx`:

| Need | Import |
|------|--------|
| Workbook I/O | `Workbook` |
| Sheet handle | `Worksheet` (type) |
| Cells | `Cell`, `CellValue`, `isCellError` |
| Styles | `CellStyle`, `BorderStyle`, `Font` |
| Charts | `ChartType`, `LegendPosition`, `Chart` |
| Tables | `Table`, `Tables` |
| CF / DV | `ConditionalFormats`, `DataValidations`, … |
| Protection | `SheetProtectionOptions`, `WorkbookProtectionOptions` |
| Drawing | `AutoShapeType`, `Image`, `TextBox`, `Shape` |

When unsure which reference to open: start at **getting-started**, then **api-conventions**, then the feature file that matches the user task.
