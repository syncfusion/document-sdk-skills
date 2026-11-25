# Execution mode (Mode 2)

Run a temporary Node.js script to produce or modify a real `.xlsx` file. Use only when the user explicitly asks to create/update a workbook file or to run code. Otherwise stay in Mode 1 (code generation only).

## Table of contents

- [Requirements](#requirements)
- [Template format](#template-format)
- [Procedure](#procedure)
- [Template options and safety checks](#template-options-and-safety-checks)
- [Limitations](#limitations)

## Requirements

- Node.js 18+ and `npm`. Browser-only environments cannot run Mode 2; answer with Mode 1 code and say so.
- Network access to install `@syncfusion/ej2-xlsx` and `tsx` (a local, non-global install inside `scripts/`).

## Template format

`scripts/template.ts` is **TypeScript**, run with `tsx` (no global install, no build step). It imports only from `@syncfusion/ej2-xlsx` (plus `registerLicense` from `@syncfusion/ej2-base`, the package's own dependency, for licensing). Node `fs`/`path` are used because Mode 2 is Node-only.

## Procedure

1. **Create the temp script** — copy `scripts/template.ts` to `{skill-root}/syncfusion-javascript-excel/scripts/temp-{unix-timestamp}.ts`. Never create it in the workspace root.
2. **Fill `buildWorkbook()`** using only APIs documented in the other reference files. Keep `sheet(i)` zero-based and `cell(row, col)` one-based.
3. **Install dependencies** if `scripts/node_modules` is missing:
   `npm install --no-save --no-package-lock @syncfusion/ej2-xlsx tsx` (run inside the skill's `scripts/` directory; `typescript` and `@types/node` are only needed for type-checking).
4. **Execute** from the directory that should contain the output (paths are relative to it):
   `{skill-root}/syncfusion-javascript-excel/scripts/node_modules/.bin/tsx {skill-root}/syncfusion-javascript-excel/scripts/temp-{timestamp}.ts --output output/report.xlsx`
   For edits add `--input path/in.xlsx` (output must be a different file).
5. **Verify** the script printed `SUCCESS: <path>`; the template already checks that the file exists and is non-empty.
6. **Clean up** — delete `temp-{timestamp}.ts`. Never delete the output or input workbook.
7. **Report** SUCCESS or ERROR with the final output path and any fix.

## Template options and safety checks

| Behavior | Detail |
|---|---|
| `--output <file.xlsx>` | Required; must stay inside the working directory and end in `.xlsx` |
| `--input <file.xlsx>` | Optional; must exist; never overwritten |
| `--force` | Allows replacing an existing output; pass only if the user asked to overwrite |
| Parent directories | Created automatically for the output |
| Exit code | Non-zero on any error; message printed as `ERROR: …` |
| Licensing | Registers `SYNCFUSION_LICENSE_KEY` or `SyncfusionLicense.txt` (workspace root) if present; never printed |
| Logging | Prints only the output path — no cell contents |

## Limitations

- The template was verified with Node 20 and `tsx`; other runners are not covered.
- Execution of browser download/upload flows is not possible; only the Node path/bytes flow runs.
- Formulas are written as text and not calculated, so the script output has no recalculated values.

## Lessons from testing

- Run the temp script from the directory that owns the `assets/` inputs and `output/` folder (usually the repository root); module resolution still uses `scripts/node_modules` because the script lives there.
- If the requested output file already exists the template exits with `output already exists`. When the user named that exact path, re-run with `--force`; otherwise pick a new name.
- If the script throws, fix the cause in the temp script and re-run; always delete the temp script and test `node_modules` afterward.
- Verify output by unzipping and inspecting the XML parts (`xl/worksheets/*.xml`, `xl/tables/*.xml`, `xl/drawings/*.xml`); the library cannot render or calculate the workbook.
