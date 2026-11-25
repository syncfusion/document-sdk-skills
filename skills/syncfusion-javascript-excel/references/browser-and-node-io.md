# Browser and Node.js I/O

Single source of truth for how workbooks enter and leave `@syncfusion/ej2-xlsx`.

## Table of contents

- [Support matrix](#support-matrix)
- [Node.js](#nodejs)
- [Browser](#browser)

## Support matrix

| Operation | Node.js | Browser |
|---|---|---|
| `Workbook.create()` | Yes | Yes |
| `await wb.save()` → `Uint8Array` | Yes | Yes |
| `await wb.save(filePath)` → `void` | Yes | No |
| `Workbook.open(Uint8Array \| ArrayBuffer)` | Yes | Yes |
| `await Workbook.open(filePath)` | Yes | No |

Open and save are asynchronous — always `await`. Formulas are never evaluated and external links are never resolved on open.

## Node.js

```ts
import { Workbook } from '@syncfusion/ej2-xlsx';

const wb = await Workbook.open('./in.xlsx'); // path overload
wb.sheet(0).cell('B2').value = 100;
await wb.save('./out.xlsx'); // write a copy, not the input
```

Bytes also work: `Workbook.open(new Uint8Array(await readFile(p)))` with `readFile` from `node:fs/promises`.

## Browser

Do not use file paths, `fs`, `Buffer`-only APIs, or `process`. Use bytes.

```ts
import { Workbook } from '@syncfusion/ej2-xlsx';

export async function openFromInput(file: File): Promise<Workbook> {
  return Workbook.open(new Uint8Array(await file.arrayBuffer()));
}

export async function downloadWorkbook(wb: Workbook, fileName: string): Promise<void> {
  const bytes = await wb.save();
  const blob = new Blob([bytes as BlobPart], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
```

Server endpoints should return the bytes with the same MIME type and a `Content-Disposition: attachment` header.
