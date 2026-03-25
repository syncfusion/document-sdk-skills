# Pages

> Add, insert, remove, rotate pages and work with sections having different page settings in a PDF document.

---

## Add a New Page

```dart
//Create a new PDF document
PdfDocument document = PdfDocument();

//Add a page and draw text
document.pages.add().graphics.drawString(
    'Hello World!!!', PdfStandardFont(PdfFontFamily.helvetica, 27),
    brush: PdfBrushes.darkBlue,
    bounds: const Rect.fromLTWH(170, 100, 0, 0));

//Save and dispose the PDF document
File('Output.pdf').writeAsBytes(await document.save());
document.dispose();
```

---

## Insert a Page at a Specific Index in an Existing PDF

```dart
//Load an existing PDF document
PdfDocument document =
    PdfDocument(inputBytes: File('input.pdf').readAsBytesSync());

//Insert a blank page at index 0 (before the first page)
document.pages.insert(0);

//Save and dispose
File('output.pdf').writeAsBytes(await document.save());
document.dispose();
```

---

## Get Page Count from an Existing PDF

```dart
PdfDocument document =
    PdfDocument(inputBytes: File('input.pdf').readAsBytesSync());

//Get the total number of pages
int pageCount = document.pages.count;

document.dispose();
```

---

## Remove Pages from an Existing PDF

```dart
PdfDocument document =
    PdfDocument(inputBytes: File('input.pdf').readAsBytesSync());

//Get the second page
PdfPage page = document.pages[1];

//Remove by page reference
document.pages.remove(page);

//Remove the first page by index
document.pages.removeAt(0);

File('output.pdf').writeAsBytes(await document.save());
document.dispose();
```

---

## Rotate a Page

```dart
PdfDocument document = PdfDocument();

PdfSection section = document.sections!.add();
section.pageSettings.rotate = PdfPageRotateAngle.rotateAngle180;
section.pageSettings.size = PdfPageSize.a4;

section.pages.add().graphics.drawString(
    'Rotated by 180 degrees',
    PdfStandardFont(PdfFontFamily.helvetica, 14),
    brush: PdfBrushes.black,
    bounds: const Rect.fromLTWH(20, 20, 0, 0));

File('Output.pdf').writeAsBytes(await document.save());
document.dispose();
```

### Rotation Angles
```dart
PdfPageRotateAngle.rotateAngle0    // 0° (default)
PdfPageRotateAngle.rotateAngle90   // 90°
PdfPageRotateAngle.rotateAngle180  // 180°
PdfPageRotateAngle.rotateAngle270  // 270°
```

---

## Add Margin to All Pages

```dart
PdfDocument document = PdfDocument();

//Apply a uniform margin of 200 points to all pages
document.pageSettings.margins.all = 200;

document.pages.add().graphics.drawString(
    'Hello World!!!', PdfStandardFont(PdfFontFamily.helvetica, 27),
    brush: PdfBrushes.darkBlue);

List<int> bytes = await document.save();
document.dispose();
```

---

## Add Sections with Different Page Settings

```dart
PdfFont font = PdfStandardFont(PdfFontFamily.helvetica, 14);

//Section 1 — no rotation, custom size
PdfSection section = document.sections!.add();
section.pageSettings.rotate = PdfPageRotateAngle.rotateAngle0;
section.pageSettings.size = const Size(300, 400);
section.pages.add().graphics.drawString(
    'Rotated by 0 degrees', font,
    brush: PdfBrushes.black,
    bounds: const Rect.fromLTWH(20, 20, 0, 0));

//Section 2 — rotated 90°
section = document.sections!.add();
section.pageSettings.rotate = PdfPageRotateAngle.rotateAngle90;
section.pageSettings.size = const Size(300, 400);
section.pages.add().graphics.drawString(
    'Rotated by 90 degrees', font,
    brush: PdfBrushes.black,
    bounds: const Rect.fromLTWH(20, 20, 0, 0));

//Section 3 — rotated 180°, wide format
section = document.sections!.add();
section.pageSettings.rotate = PdfPageRotateAngle.rotateAngle180;
section.pageSettings.size = const Size(500, 200);
section.pages.add().graphics.drawString(
    'Rotated by 180 degrees', font,
    brush: PdfBrushes.black,
    bounds: const Rect.fromLTWH(20, 20, 0, 0));

//Section 4 — rotated 270°
section = document.sections!.add();
section.pageSettings.rotate = PdfPageRotateAngle.rotateAngle270;
section.pageSettings.size = const Size(300, 200);
section.pages.add().graphics.drawString(
    'Rotated by 270 degrees', font,
    brush: PdfBrushes.black,
    bounds: const Rect.fromLTWH(20, 20, 0, 0));
```

---

## Get Page Client Size

```dart
PdfPage page = document.pages.add();

//Get usable width and height after margins
Size clientSize = page.getClientSize();
double width = clientSize.width;
double height = clientSize.height;
```

---

## Page Properties Reference

| Property | Description |
|---|---|
| `document.pages.count` | Total number of pages |
| `document.pages.add()` | Add a new page at the end |
| `document.pages.insert(index)` | Insert a blank page at a given index |
| `document.pages.remove(page)` | Remove a page by reference |
| `document.pages.removeAt(index)` | Remove a page by index |
| `page.getClientSize()` | Returns usable drawing area (after margins) |
| `document.pageSettings.size` | Set the default page size for all pages |
| `document.pageSettings.orientation` | `portrait` or `landscape` |
| `document.pageSettings.rotate` | Page rotation angle |
| `document.pageSettings.margins` | Page margins (top, bottom, left, right, all) |

---

## Notes

- Pages are zero-indexed: `document.pages[0]` is the first page.
- `pages.add()` always appends to the end; use `pages.insert(index)` to add at a specific position.
- `page.getClientSize()` returns the size minus margins — use this for accurate drawing bounds.
- Units are in **points** (1 inch = 72 points).