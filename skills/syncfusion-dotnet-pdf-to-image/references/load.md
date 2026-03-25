# Load PDF File in PDF to Image Converter

## Loading an Existing PDF Document Using Constructor

Pass the PDF document as a stream when creating an instance of `PdfToImageConverter`.

```csharp
FileStream inputPDFStream = new FileStream(@"Input.pdf", FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
PdfToImageConverter imageConverter = new PdfToImageConverter(inputPDFStream);
```

---

## Loading an Existing PDF Document Using Load Method

Create an instance of `PdfToImageConverter` and then use the `Load` method to pass the PDF document as a stream.

```csharp
PdfToImageConverter imageConverter = new PdfToImageConverter();
FileStream inputPDFStream = new FileStream(@"Input.pdf", FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
imageConverter.Load(inputPDFStream);
```

---

## Loading an Encrypted PDF Document Using Constructor

Pass the PDF document stream and the password when creating an instance of `PdfToImageConverter`.

```csharp
FileStream inputPDFStream = new FileStream(@"Input.pdf", FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
PdfToImageConverter imageConverter = new PdfToImageConverter(inputPDFStream, "password");
```

---

## Loading an Encrypted PDF Document Using Load Method

Create an instance of `PdfToImageConverter` and then use the `Load` method with the PDF document stream and password.

```csharp
PdfToImageConverter imageConverter = new PdfToImageConverter();
FileStream inputPDFStream = new FileStream(@"Input.pdf", FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
imageConverter.Load(inputPDFStream, "password");
```
