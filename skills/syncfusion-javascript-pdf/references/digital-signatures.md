# Digital Signatures in PDF Documents

## Table of Contents

1. [Overview](#overview)
2. [Adding Signatures](#adding-signatures)
3. [External Signing](#external-signing)
4. [Certified Signatures](#certified-signatures)
5. [Multiple Signatures](#multiple-signatures)
6. [Timestamps](#timestamps)
7. [Signature Properties](#signature-properties)
8. [Best Practices](#best-practices)

## Overview

Digital signatures ensure PDF document authenticity, integrity, and security. The Syncfusion JavaScript PDF library supports PFX certificates, external signing, timestamps, and certified signatures with comprehensive signature management capabilities.

## Adding Signatures

### Basic Digital Signature

Sign a PDF using PFX certificate:

```typescript
import {PdfDocument, PdfPage, PdfForm, PdfSignatureField, DigestAlgorithm, CryptographicStandard, PdfSignature} from '@syncfusion/ej2-pdf';

let document: PdfDocument = new PdfDocument();
let page: PdfPage = document.addPage();
let form: PdfForm = document.form;
let field: PdfSignatureField = new PdfSignatureField(page, 'Signature', {
    x: 10, y: 10, width: 100, height: 50
});
let sign: PdfSignature = PdfSignature.create(
    certData,
    password,
	{
        cryptographicStandard: CryptographicStandard.cms,
        digestAlgorithm: DigestAlgorithm.sha256
    }
);
field.setSignature(sign);
form.add(field);
document.save('output.pdf');
document.destroy();
```

### Signing Existing Documents

Add signature to existing PDF:

```typescript
import {PdfDocument, PdfPage, PdfForm, PdfSignatureField, PdfSignature, CryptographicStandard, DigestAlgorithm} from '@syncfusion/ej2-pdf';

let document: PdfDocument = new PdfDocument(data);
let page: PdfPage = document.getPage(0);
let form: PdfForm = document.form;
let field: PdfSignatureField = new PdfSignatureField(page, 'Signature', {
    x: 10, y: 10, width: 100, height: 50
});
let sign: PdfSignature = PdfSignature.create(
    certData,
    password,
    {
        cryptographicStandard: CryptographicStandard.cms,
        digestAlgorithm: DigestAlgorithm.sha256
    }
);
field.setSignature(sign);
form.add(field);
document.save('output.pdf');
document.destroy();
```

## External Signing

### Callback-Based Signing

Implement custom signing logic:

```typescript
import {PdfDocument, PdfPage, PdfForm, PdfSignatureField, PdfSignature, DigestAlgorithm, CryptographicStandard} from '@syncfusion/ej2-pdf';

let document: PdfDocument = new PdfDocument(data);
let page: PdfPage = document.getPage(0);
let form: PdfForm = document.form;
let field: PdfSignatureField = new PdfSignatureField(page, 'Signature', { x: 10, y: 10, width: 100, height: 50 });

let externalSignatureCallback = (
    data: Uint8Array,
    options: {
        algorithm: DigestAlgorithm,
        cryptographicStandard: CryptographicStandard,
    }
): { signedData: Uint8Array; timestampData?: Uint8Array } => {
    // Implement external signing logic here
    return { signedData: new Uint8Array() };
};

let signature: PdfSignature = PdfSignature.create(externalSignatureCallback, {
    cryptographicStandard: CryptographicStandard.cms,
    algorithm: DigestAlgorithm.sha256,
});

field.setSignature(signature);
form.add(field);
document.save('output.pdf');
document.destroy();
```

### With Public Certificates

External signing with certificate chain:

```typescript
let signature: PdfSignature = PdfSignature.create(
    externalSignatureCallback,
    publicCertificates,
    {
        cryptographicStandard: CryptographicStandard.cms,
        algorithm: DigestAlgorithm.sha256
    }
);
```

## Certified Signatures

### Document Certification

Certify document with restrictions:

```typescript
import { PdfDocument, PdfPage, PdfSignatureField, PdfSignature, PdfCertificationFlags } from '@syncfusion/ej2-pdf';

const document: PdfDocument = new PdfDocument();
const page: PdfPage = document.addPage();
const field: PdfSignatureField = new PdfSignatureField(page, 'field', { x: 50, y: 50, width: 100, height: 100 });
const signature: PdfSignature = PdfSignature.create(certData, password, { certify: true });
field.setSignature(signature);
document.form.add(field);
document.save('output.pdf');
document.destroy();
```

### Lock After Signing

Prevent modifications:

```typescript
const signature: PdfSignature = PdfSignature.create(certData, password, { isLocked: true });
```

## Multiple Signatures

### Adding Sequential Signatures

Apply multiple signatures:

```typescript
import { PdfDocument, PdfPage, PdfSignatureField, PdfSignature, PdfCertificationFlags } from '@syncfusion/ej2-pdf';

let document: PdfDocument = new PdfDocument();
let page: PdfPage = document.addPage();

// First signature (certifying)
let field: PdfSignatureField = new PdfSignatureField(page, 'Signature', { x: 50, y: 50, width: 100, height: 100 });
let signature: PdfSignature = PdfSignature.create(
    certData,
    password,
    {
        certify: true,
        documentPermissions: PdfCertificationFlags.allowFormFill
    },
);
field.setSignature(signature);
document.form.add(field);

// Second field for later signing
let field2: PdfSignatureField = new PdfSignatureField(page, 'Signature1', { x: 250, y: 50, width: 100, height: 100 });
document.form.add(field2);

let data: Uint8Array = document.save();
document.destroy();

// Reopen and sign second field
let ldocument: PdfDocument = new PdfDocument(data);
field = ldocument.form.fieldAt(1) as PdfSignatureField;
signature = PdfSignature.create(
    certData,
    password,
    {
        certify: true,
        documentPermissions: PdfCertificationFlags.forbidChanges
    },
);
field.setSignature(signature);
ldocument.save('output.pdf');
ldocument.destroy();
```

## Timestamps

### Adding Timestamp

Include trusted timestamp:

```typescript
import { PdfDocument, PdfPage, PdfForm, PdfSignatureField, PdfSignature } from '@syncfusion/ej2-pdf';

let document: PdfDocument = new PdfDocument(data);
let page: PdfPage = document.getPage(0);
let form: PdfForm = document.form;
let field: PdfSignatureField = new PdfSignatureField(page, 'Signature', {x: 10, y: 10, width: 100, height: 50});

async function timestampCallback(request: Uint8Array): Promise<{ response: Uint8Array }> {
    // Implement timestamp response logic here
    return { response: new Uint8Array() };
}

const signature: PdfSignature = PdfSignature.create(certData, password, 
    { cryptographicStandard: CryptographicStandard.cms, digestAlgorithm: DigestAlgorithm.sha256 }, 
    timestampCallback
);

field.setSignature(signature);
form.add(field);
await document.saveAsync('output.pdf');
document.destroy();
```

## Signature Properties

### Retrieving Information

Get signature details:

```typescript
import {PdfDocument, PdfPage, PdfSignatureField, PdfCertificateInformation, PdfSignatureOptions} from '@syncfusion/ej2-pdf';

let document: PdfDocument = new PdfDocument(data);
let page: PdfPage = document.getPage(0);
let field = document.form.fieldAt(0) as PdfSignatureField;
let signature = field.getSignature();

// Get signed date
let date = signature.getSignedDate;

// Get certificate information
let certificateInfo: PdfCertificateInformation = signature.getCertificateInformation();
let issuerName = certificateInfo.issuerName;
let serialNumber = certificateInfo.serialNumber;
let subjectName = certificateInfo.subjectName;
let validFrom = certificateInfo.validFrom;

// Get signature options
let options: PdfSignatureOptions = signature.getSignatureOptions();
let cryptographicStandard = options.cryptographicStandard;
let digestAlgorithm = options.digestAlgorithm;

document.destroy();
```

### Custom Appearance

Draw image in signature:

```typescript
import { PdfDocument, PdfPage, PdfSignatureField, PdfSignature, PdfGraphics, PdfImage, PdfBitmap } from '@syncfusion/ej2-pdf';

let document: PdfDocument = new PdfDocument();
let page: PdfPage = document.addPage();
let field: PdfSignatureField = new PdfSignatureField(page, 'field', { x: 50, y: 50, width: 100, height: 100 });
const signature: PdfSignature = PdfSignature.create(
  certData,
  password,
  {
    contactInfo: 'johndoe@owned.us',
    locationInfo: 'Honolulu, Hawaii',
    reason: 'I am author of this document.'
  },
);

let graphics: PdfGraphics = field.getAppearance().normal.graphics;
let image: PdfImage = new PdfBitmap('/9j/4AAQSkZJRgABAQEAkACQAAD/4....QB//Z');
graphics.drawImage(image, { x: 0, y: 0, width: 100, height: 100 });

document.form.add(field);
field.setSignature(signature);
document.save('output.pdf');
document.destroy();
```

## Document Revisions

### Accessing Revisions

Retrieve document history:

```typescript
import {PdfDocument, PdfForm, PdfSignatureField} from '@syncfusion/ej2-pdf';

let document: PdfDocument = new PdfDocument(data);
let form: PdfForm = document.form;
let signature: PdfSignatureField = form.fieldAt(0);
let revisions: number[] = document.getRevisions();
let revision: number = signature.getRevision();
document.destroy();
```

## Best Practices

1. **Certificate Security**: Store certificates securely
2. **Algorithm Choice**: Use SHA-256 or higher
3. **Timestamps**: Include for long-term validity
4. **Appearance**: Provide visual signature representation
5. **Validation**: Validate signatures before distribution
6. **Multiple Signatures**: Plan signature workflow carefully

## Common Gotchas

1. **Certificate Expiry**: Expired certificates invalidate signatures
2. **Timestamp Required**: Some jurisdictions require timestamps
3. **Certification Order**: Certifying signature must be first
4. **Locked Documents**: Locked signatures prevent all modifications
5. **Revision Tracking**: Each signature creates new revision
6. **External Signing**: Requires proper PKCS#7 formatting

## Related References

- [Form Fields](./form-fields.md) - Signature fields
- [Annotations](./annotations.md) - Signature annotations
