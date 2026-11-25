# Page setup, headers/footers, and print areas

`sheet.pageSetup` stores print settings. It does not render or print anything.

## Properties

| Property | Type / notes |
|---|---|
| `paperSize` | number; use `PaperSize.A4`, `PaperSize.Letter`, … |
| `orientation` | `'default' \| 'portrait' \| 'landscape'` |
| `margins` | `PageMargins` (`left,right,top,bottom,header,footer`) in **points** (72 = 1 inch); `Partial` accepted |
| `centerHorizontally`, `centerVertically`, `printGridlines`, `printHeadings` | boolean |
| `scale`, `fitToWidth`, `fitToHeight`, `isFitToPage` | scaling |
| `pageOrder` | `'downThenOver' \| 'overThenDown'` |
| `firstPageNumber` | number or `undefined` |
| `leftHeader`, `centerHeader`, `rightHeader`, `leftFooter`, `centerFooter`, `rightFooter` | strings (Excel header/footer codes such as `&P`, `&N`) |
| `differentFirstPage`, `firstPageHeader`, `firstPageFooter`, `firstPage` | first-page variants |
| `oddAndEvenPagesHeaderFooter`, `oddHeader`, `oddFooter`, `evenHeader`, `evenFooter`, `oddPage`, `evenPage` | odd/even variants |
| `printArea` | **sheet-qualified** absolute range, e.g. `'Sheet1!$A$1:$F$40'`; `undefined` prints the whole sheet |
| `printTitleRows` / `printTitleColumns` | **sheet-qualified**, e.g. `'Sheet1!$1:$2'` / `'Sheet1!$A:$B'` |

## Example

```ts
import { Workbook, PaperSize } from '@syncfusion/ej2-xlsx';

const wb = Workbook.create();
const sheet = wb.sheet(0);
const ps = sheet.pageSetup;
ps.paperSize = PaperSize.A4;
ps.orientation = 'landscape';
ps.margins = { left: 54, right: 54, top: 72, bottom: 72 };
ps.printArea = 'Sheet1!$A$1:$F$40'; // use the real sheet name; quote it if it has spaces
ps.printTitleRows = 'Sheet1!$1:$1';
ps.centerFooter = 'Page &P of &N';
ps.isFitToPage = true;
ps.fitToWidth = 1;
ps.fitToHeight = 0;
```

## Related worksheet APIs

```ts
sheet.freeze.freezePanes({ rows: 1 }); // freeze top row; also freezeAt('B2'), unfreeze()
sheet.visibility = false;              // hide sheet (boolean)
sheet.zoom = 100;
wb.builtInDocumentProperties.title = 'Report'; // also author, subject, keywords, company, …
```

## Known limitation: fit to page

With `@syncfusion/ej2-xlsx` 35.1.42 and 35.2.12 (rechecked), setting `isFitToPage = true` is readable back, but the saved sheet XML contains `fitToWidth`/`fitToHeight` without the `sheetPr/pageSetUpPr fitToPage` flag. Excel needs that flag to honor fit-to-page, so "fit to one page wide" may not apply when printing. Verify in Excel and report it as a limitation; do not claim it works.

## Print area and titles must be sheet-qualified

The library writes `printArea`, `printTitleRows` and `printTitleColumns` verbatim into the workbook's `_xlnm.Print_Area` / `_xlnm.Print_Titles` defined names. Unqualified values such as `'A1:H33'` or `'10:10'` produced a workbook that Excel reported as corrupted. Always use `SheetName!$A$1:$H$33` and `SheetName!$10:$10` (absolute, with the sheet name, quoted like `'Product Data'!$A$1:$C$6` when it contains spaces), and set them after renaming the sheet.
