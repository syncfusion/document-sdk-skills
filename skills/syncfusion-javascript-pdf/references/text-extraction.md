# Text Extraction (PDF Library for JavaScript)

## Table of contents

- [Installation](#installation)
- [Basic text extraction](#basic-text-extraction)
- [Extract from a page range](#extract-from-a-page-range)
- [Layout-based extraction](#layout-based-extraction)
- [Bounds-based extraction: lines, words, characters](#bounds-based-extraction-lines-words-characters)
- [Practical tips](#practical-tips)
- [Example: export plain text per page (Node.js)](#example-export-plain-text-per-page-nodejs)
- [References](#references)

This document summarizes the official Syncfusion PDF Library guidance for extracting text from PDF documents in JavaScript/TypeScript. It covers basic extraction, page-range extraction, layout-aware extraction, bounds-based extraction (lines/words/characters), and practical tips.

> Note: advanced extraction features require the `@syncfusion/ej2-pdf-data-extract` package.

## Installation

```bash
npm install @syncfusion/ej2-pdf @syncfusion/ej2-pdf-data-extract
```

## Basic text extraction

Use `PdfDataExtractor` to extract plain text from a loaded `PdfDocument`.

TypeScript
```ts
import { PdfDocument } from '@syncfusion/ej2-pdf';
import { PdfDataExtractor } from '@syncfusion/ej2-pdf-data-extract';

// `data` is an ArrayBuffer/Uint8Array containing the PDF file
const document = new PdfDocument(data);
const extractor = new PdfDataExtractor(document);

// Extract all text from the document
const text: string = extractor.extractText();
console.log(text);

document.destroy();
```

JavaScript
```js
const { PdfDocument } = require('@syncfusion/ej2-pdf');
const { PdfDataExtractor } = require('@syncfusion/ej2-pdf-data-extract');

const document = new PdfDocument(data);
const extractor = new PdfDataExtractor(document);

const text = extractor.extractText();
console.log(text);

document.destroy();
```

## Extract from a page range

You can extract text from a subset of pages by specifying `startPageIndex` and `endPageIndex`.

```ts
const textRange = extractor.extractText({ startPageIndex: 0, endPageIndex: document.pageCount - 1 });
console.log(textRange);
```

## Layout-based extraction

Enable layout mode to preserve spatial arrangement (useful for columns and structured documents). Note that layout extraction may be slower.

```ts
const layoutText = extractor.extractText({ isLayout: true });
console.log(layoutText);
```

## Bounds-based extraction: lines, words, characters

For finer control, use the line/word/glyph APIs which return objects containing text and bounds.

Extract text lines across pages:

```ts
import { TextLine } from '@syncfusion/ej2-pdf-data-extract';

const lines: TextLine[] = extractor.extractTextLines({ startPageIndex: 0, endPageIndex: document.pageCount - 1 });
for (const line of lines) {
  console.log(line.pageIndex, line.bounds, line.text);
}
```

Inspect words and glyphs (characters) from the returned `TextLine` objects:

```ts
// Each TextLine has a `words` collection
for (const line of lines) {
  for (const word of line.words) {
    console.log('word:', word.text, 'bounds:', word.bounds);
    // `word.glyphs` contains glyph/character-level info
    for (const glyph of word.glyphs) {
      console.log('char:', glyph.text, 'font:', glyph.fontName, glyph.fontSize, 'bounds:', glyph.bounds);
    }
  }
}
```

## Practical tips

- Install `@syncfusion/ej2-pdf-data-extract` when using advanced extraction features.
- Prefer page-range extraction for large documents to reduce memory usage.
- Use layout extraction when preserving columns/tables is important; it may be slower.
- Scanned (image-only) PDFs cannot be extracted unless OCR is applied first.
- Validate encoding when working with unusual fonts; some glyphs may map unpredictably.

## Example: export plain text per page (Node.js)

```ts
import { PdfDocument } from '@syncfusion/ej2-pdf';
import { PdfDataExtractor } from '@syncfusion/ej2-pdf-data-extract';

const document = new PdfDocument(data);
const extractor = new PdfDataExtractor(document);
let out = '';
for (let i = 0; i < document.pageCount; i++) {
  const pageText = extractor.extractText({ startPageIndex: i, endPageIndex: i });
  out += `\n--- Page ${i + 1} ---\n` + pageText + '\n';
}
console.log(out);
document.destroy();
```

## References

- Official Syncfusion guide: https://help.syncfusion.com/document-processing/pdf/pdf-library/javascript/text-extraction
