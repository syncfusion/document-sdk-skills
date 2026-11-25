# Capability boundaries

What `@syncfusion/ej2-xlsx` does, what it deliberately does not do, and safety limits agents must respect.

## Table of contents

- [In scope](#in-scope)
- [Out of scope](#out-of-scope)
- [Formula and link rules](#formula-and-link-rules)
- [OOXML preservation](#ooxml-preservation)
- [Shared table integrity](#shared-table-integrity)
- [Protection vs encryption](#protection-vs-encryption)
- [Filter and sort metadata](#filter-and-sort-metadata)
- [Security](#security)
- [UI boundaries](#ui-boundaries)
- [Feature support matrix](#feature-support-matrix)
- [Agent do / don't](#agent-do--dont)

## In scope

- Create empty workbooks; open existing `.xlsx` packages
- Read/write cell values, formulas (text), styles, number formats
- Worksheets, names, document properties, freeze panes
- Tables, hyperlinks, merges, page setup metadata
- Charts, images, shapes, text boxes, form controls
- Comments and threaded comments
- Conditional formatting and data validation **records**
- Sheet and workbook protection **flags**
- Round-trip unknown parts the library does not model

## Out of scope

| Capability | Boundary |
|------------|----------|
| Formula calculation | Never evaluates formulas |
| External link resolution | Never fetches other workbooks/URLs for data |
| Pivot cache computation | Not a pivot engine |
| Runtime AutoFilter row hiding | Metadata only |
| Runtime sort of grid values | Metadata only |
| Conditional format painting | Stores rules; does not apply fills in-process |
| Data validation enforcement | Stores rules; setters still accept values |
| VBA / macros execution | Never execute VBA, ActiveX, OLE automation |
| Spreadsheet UI | Not EJ2 Spreadsheet / Grid |
| Password-to-open encryption | Protect ≠ encrypted package |
| Invented OOXML | No fabricated elements/attrs/namespaces |

## Formula and link rules

1. `cell.formula` stores expression text (leading `=` normalized away).
2. `cell.value = '=…'` is a **string**, not a formula.
3. Cached formula results may be read when present; nothing recalculates them.
4. External references remain textual; do not resolve or download.
5. Hyperlink targets are not fetched.

## OOXML preservation

- Load → no-op save should not destroy unsupported XML, relationships, or Markup Compatibility content the library preserves.
- Prefer public API mutations over deleting unknown parts “for cleanliness.”
- When a feature is not modeled, preserve rather than invent.

## Shared table integrity

Never renumber:

- Shared strings  
- Cell styles / fonts / fills / borders  
- Number formats  
- Differential formats (`dxf`)  
- Table ids  

Append new rows only. Existing indices must keep their meaning.

## Protection vs encryption

| Feature | Meaning |
|---------|---------|
| `Worksheet.protect` | Sheet edit restrictions (`allows*`) |
| `Workbook.protect` | Structure/windows/revision **locks** |
| File open password / AES package encryption | **Not** provided by these APIs |

Do not tell users that `protect('pw')` encrypts the file on disk.

## Filter and sort metadata

```ts
sheet.addAutoFilter('A1:D10');
sheet.addDataSorter('A1:D10');
```

These write Excel’s filter/sort descriptions. They do **not** produce a filtered array of rows or reorder cell storage by themselves.

## Security

- Treat `.xlsx` input as **untrusted** when accepting user uploads (zip bombs, entity expansion — package layer defenses apply; still validate sizes in apps).
- Never execute VBA, scripts, OLE automation, or ActiveX from packages.
- Never follow external workbook links or hyperlink targets as a side effect of open/save.
- Do not shell out to Excel unless the product explicitly requires it outside this library.

## UI boundaries

This skill is for **file processing**.

- Need an editable grid UI? Use a UI product (for example EJ2 Spreadsheet) separately.
- Need chart rendering on a web page? Use a charting UI library; this package writes Excel chart parts.

## Feature support matrix

Status for `@syncfusion/ej2-xlsx` 35.2.12, checked against its public type declarations. "Unsupported" means no public API is exposed; do not generate code for it.

| Area | Status | Notes |
|---|---|---|
| Create / open / save workbook | Fully supported | No explicit close/dispose API |
| Sheets: add, access, rename (`name`), move, remove | Fully supported | |
| Sheet copy | Unsupported | No public copy API |
| Cell values, dates, errors, rich text | Fully supported | |
| Formulas | Partially supported | Stored as text; never calculated |
| Cell styles, number formats | Fully supported | |
| Named (cell) styles | Not verified | Do not document |
| Row/column sizing, hidden state | Fully supported | |
| Autofit | Unsupported | |
| Insert/delete rows or columns | Unsupported | |
| Tables | Fully supported | |
| AutoFilter / sort | Partially supported | Metadata only; rows are not filtered or reordered |
| Charts | Fully supported | Authoring; no chart-to-image |
| Images, shapes, text boxes | Fully supported | |
| Hyperlinks | Fully supported | |
| Comments, threaded comments | Fully supported | |
| Form controls | Fully supported | |
| Data validation, conditional formatting | Partially supported | Rules stored; not enforced/painted |
| Freeze panes | Fully supported | `sheet.freeze` |
| Sheet / workbook protection | Fully supported | OOXML flags only |
| Password-to-open encryption | Unsupported | |
| CSV / JSON import-export | Unsupported | Use plain JS to read/write cells |
| Template markers / mail merge | Unsupported | |
| Pivot tables, pivot charts, slicers | Unsupported | |
| Sparklines | Unsupported | |
| Find and replace | Unsupported | Iterate cells manually |
| Sheet visibility | Fully supported | `sheet.visibility` |
| Page setup, headers/footers, print areas | Fully supported | See [page-setup.md](page-setup.md) |
| Workbook properties | Fully supported | `builtInDocumentProperties`, `author` |
| PDF / image / Markdown conversion | Unsupported | Different Syncfusion product |
| VBA macros, custom XML, what-if | Unsupported | |
| Unknown OOXML preservation | Partially supported | Design intent is round-trip preservation; not verified per part |
| Large-workbook streaming | Unsupported | See [security-and-troubleshooting.md](security-and-troubleshooting.md) |

## Agent do / don't

**Do**

- Import from `@syncfusion/ej2-xlsx`
- Use `Workbook.create` / `open` / `save`
- Use `sheet.cell` / public collections
- Document formula-as-text behavior to end users of generated code
- Keep samples copy-paste honest about Node path vs bytes

**Don't**

- Invent OOXML or private APIs
- Evaluate formulas “to help”
- Renumber shared tables
- Teach `@syncfusion/ej2-xlsx/internal/charts` for apps
- Dense-allocate the full Excel grid
- Claim filter/sort/CF/DV run as live engines inside this library
- Equate protect with encryption
- Generate VBA or enable macro execution paths

## Findings from invoice testing

| Area | Status | Detail |
|------|--------|--------|
| Fit to one page wide | Partially supported | `isFitToPage`, `fitToWidth`, `fitToHeight` are written, but the `fitToPage` flag in `sheetPr` is not, so Excel may ignore it. See [page-setup.md](page-setup.md#known-limitation-fit-to-page). |
| Style plus number format | Supported with a workaround | Setting `style` and `numberFormat` separately overwrite each other; use `numFmtId` inside `style`. |
| Text box word wrap / border | Unsupported (no public property) | The `TextBox` type exposes only `text`, `fillColor`, font name/size/bold/colour and alignment. |
| Internal hyperlinks | Supported | `hyperlinks.add(ref, 'Sheet!A1', text, tip, 'workbook')`. |
| Table totals row | Supported | Not calculated by the library. |
| Dropdown form control | Supported | Distinct from data validation. |
| Workbook / sheet password | Supported (optional) | Protection only; no password-to-open encryption. |
| Formula results and cached values | Not supported | Formula cells are saved as `<f>` with no cached `<v>` value (verified); viewers that do not recalculate show blanks. |

- External hyperlinks plus drawings on one sheet: supported in 35.2.12 (duplicate relationship id bug fixed; see `formulas-and-merged-hyperlinks.md`).
