// Mode 2 execution template (TypeScript, run with `npx tsx`).
// Copy to scripts/temp-<timestamp>.ts, replace the buildWorkbook() body, run, then delete the copy.
//
// Usage: npx tsx temp-<timestamp>.ts --output <file.xlsx> [--input <file.xlsx>] [--force]
import * as fs from 'node:fs';
import * as path from 'node:path';
import { registerLicense } from '@syncfusion/ej2-base';
import { Workbook } from '@syncfusion/ej2-xlsx';

interface CliOptions {
  input?: string;
  output: string;
  force: boolean;
}

function parseArgs(argv: string[]): CliOptions {
  let input: string | undefined;
  let output: string | undefined;
  let force = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--input') { input = argv[++i]; }
    else if (arg === '--output') { output = argv[++i]; }
    else if (arg === '--force') { force = true; }
    else { throw new Error(`Unknown argument: ${arg}`); }
  }
  if (!output) { throw new Error('Missing required --output <file.xlsx>'); }
  return { input, output, force };
}

// Resolve against the current working directory and keep the path inside it.
function resolveSafePath(p: string, label: string): string {
  if (p.includes('\0')) { throw new Error(`${label}: invalid path`); }
  const cwd = process.cwd();
  const resolved = path.resolve(cwd, p);
  const rel = path.relative(cwd, resolved);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new Error(`${label}: path must be inside the working directory`);
  }
  if (path.extname(resolved).toLowerCase() !== '.xlsx') {
    throw new Error(`${label}: must end with .xlsx`);
  }
  return resolved;
}

function registerSyncfusionLicense(): void {
  let key = process.env.SYNCFUSION_LICENSE_KEY?.trim();
  const licenseFile = path.join(process.cwd(), 'SyncfusionLicense.txt');
  if (!key && fs.existsSync(licenseFile)) { key = fs.readFileSync(licenseFile, 'utf8').trim(); }
  if (key) { registerLicense(key); }
}

// *** REPLACE THIS BODY WITH THE REQUESTED OPERATION ***
async function buildWorkbook(input?: string): Promise<Workbook> {
  const wb = input ? await Workbook.open(input) : Workbook.create();
  const sheet = wb.sheet(0); // zero-based sheet index
  sheet.cell('A1').text = 'Hello'; // one-based cell(row, col) also works: sheet.cell(1, 1)
  return wb;
}

async function main(): Promise<void> {
  const opts = parseArgs(process.argv.slice(2));
  const output = resolveSafePath(opts.output, 'output');
  const input = opts.input ? resolveSafePath(opts.input, 'input') : undefined;
  if (input && !fs.existsSync(input)) { throw new Error('input: file not found'); }
  if (input && path.resolve(input) === output) {
    throw new Error('output must differ from input; the input workbook is never overwritten');
  }
  if (fs.existsSync(output) && !opts.force) {
    throw new Error('output already exists; pass --force only if overwriting was requested');
  }

  registerSyncfusionLicense();
  const wb = await buildWorkbook(input);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  await wb.save(output);

  if (!fs.existsSync(output) || fs.statSync(output).size === 0) {
    throw new Error('output file was not created or is empty');
  }
  console.log(`SUCCESS: ${path.relative(process.cwd(), output)}`);
}

main().catch((err: unknown) => {
  console.error(`ERROR: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
