# Document Structure

> PDF document lifecycle — creating, loading, saving, disposing, and configuring page settings.

---

> **Required for file I/O:** `import 'dart:io';`

---

## Create Document

### Create Document using Minimal Code

```dart
//Create a new PDF document
PdfDocument document = PdfDocument();

//Add a page to the document
PdfPage page = document.pages.add();
PdfGraphics graphics = page.graphics;

// Add content here

//Save the document
File('document.pdf').writeAsBytes(await document.save());

//Dispose the document
document.dispose();
```

### Placeholders
- `'document.pdf'` → Replace with `'{filename}.pdf'`
- Add drawing operations between page creation and save

---

## Page Settings

### Get Orientation and Margins

```dart
//Create a new PDF document
PdfDocument document = PdfDocument();

//Set page orientation
document.pageSettings.orientation = PdfPageOrientation.landscape;
// or: PdfPageOrientation.portrait

//Set margins (in points)
document.pageSettings.margins.all = 50;
// or set individually:
document.pageSettings.margins.top = 72;
document.pageSettings.margins.bottom = 72;
document.pageSettings.margins.left = 72;
document.pageSettings.margins.right = 72;

//Add a page and get graphics
PdfPage page = document.pages.add();
PdfGraphics graphics = page.graphics;
```

### Get Page Size

```dart
//Standard A4 size (default)
document.pageSettings.size = PdfPageSize.a4;

//Custom size
document.pageSettings.size = Size(595, 842); // width x height in points
```

### Get Client (Content) Area Size

```dart
PdfPage page = document.pages.add();
Size clientSize = page.getClientSize();
double pageWidth = clientSize.width;
double pageHeight = clientSize.height;
```

---

## Load an Existing Document

### From File

```dart
//Load an existing PDF document
PdfDocument document =
    PdfDocument(inputBytes: File('input.pdf').readAsBytesSync());

//Get a page
PdfPage page = document.pages[0];
```

### From Encrypted File

```dart
//Load an existing encrypted PDF document
PdfDocument document = PdfDocument(
    inputBytes: File('input.pdf').readAsBytesSync(),
    password: 'password');
```

### Placeholders
- `'input.pdf'` → Replace with the actual input file path
- `'password'` → Replace with the actual password

---

## Save Document

### To File

```dart
//Save the document to a file
File('document.pdf').writeAsBytes(await document.save());

//Dispose the document
document.dispose();
```

### To Memory (List of bytes)

```dart
//Save to bytes (e.g., for web download or in-memory processing)
List<int> bytes = await document.save();

//Dispose the document
document.dispose();
```

---

## Save and Open — Platform-Specific

### Mobile (Android/iOS)

```dart
import 'dart:io';
import 'package:open_file/open_file.dart';
import 'package:path_provider/path_provider.dart';

// Required pubspec.yaml dependencies:
// path_provider: ^2.0.7
// open_file: ^3.2.1

List<int> bytes = await document.save();
document.dispose();

final directory = await getApplicationSupportDirectory();
final path = directory.path;
File file = File('$path/Output.pdf');
await file.writeAsBytes(bytes, flush: true);
OpenFile.open('$path/Output.pdf');
```

### Desktop (Windows/macOS/Linux)

```dart
import 'dart:io';
import 'package:open_file/open_file.dart';
import 'package:path_provider/path_provider.dart';

List<int> bytes = await document.save();
document.dispose();

final directory = await getApplicationSupportDirectory();
final path = directory.path;
File file = File('$path/Output.pdf');
await file.writeAsBytes(bytes, flush: true);
OpenFile.open('$path/Output.pdf');
```

### Web (JavaScript download)

```dart
import 'dart:async';
import 'dart:convert';
import 'dart:js' as js;

List<int> bytes = await document.save();
document.dispose();

js.context['pdfData'] = base64.encode(bytes);
js.context['filename'] = 'Output.pdf';
Timer.run(() {
  js.context.callMethod('download');
});
```

### Web (WASM using `web` package)

```dart
import 'dart:convert';
import 'package:web/web.dart' as web;

Future<void> saveAndLaunchFile(List<int> bytes, String fileName) async {
  final web.HTMLAnchorElement anchor =
      web.document.createElement('a') as web.HTMLAnchorElement
        ..href = "data:application/octet-stream;base64,${base64Encode(bytes)}"
        ..style.display = 'none'
        ..download = fileName;
  web.document.body!.appendChild(anchor);
  anchor.click();
  web.document.body!.removeChild(anchor);
}
```

---

## Dispose Document

```dart
//Always dispose after saving to release resources
document.dispose();
```

---

## Notes

- All measurement units in the PDF are in **points** (1 inch = 72 points).
- All elements use absolute positioning — use `PdfLayoutResult.bounds` to chain elements and prevent overlap.
- Always call `document.dispose()` after saving.
