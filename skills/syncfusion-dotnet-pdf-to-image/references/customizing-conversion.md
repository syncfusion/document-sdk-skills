# Convert PDF Pages to Images

`PdfToImageConverter` provides multiple `Convert` method overloads to export single pages, page ranges, or pages with custom size/resolution as images.

---

## Convert a Single Page to Image

> **Note:** Specify the page index (zero-based). Use `keepTransparency: true` to preserve transparency and `isSkipAnnotations: true` to exclude annotations and form fields from the output.

```csharp
PdfToImageConverter imageConverter = new PdfToImageConverter();
FileStream inputStream = new FileStream("Input.pdf", FileMode.Open, FileAccess.ReadWrite);
imageConverter.Load(inputStream);
Stream outputStream = imageConverter.Convert(0, false, false);
```

**WinForms / WPF — save the output stream as a file:**
```csharp
Bitmap image = new Bitmap(outputStream);
image.Save("sample.png");
```

---

## Export a Specific Range of Pages

```csharp
PdfToImageConverter imageConverter = new PdfToImageConverter();
FileStream inputStream = new FileStream("Input.pdf", FileMode.Open, FileAccess.ReadWrite);
imageConverter.Load(inputStream);
Stream[] outputStream = imageConverter.Convert(0, imageConverter.PageCount - 1, false, false);
```

**WinForms / WPF — save each page as a file:**
```csharp
for (int i = 0; i < outputStream.Length; i++)
{
    Bitmap image = new Bitmap(outputStream[i]);
    image.Save("sample-" + i + ".png");
}
```

---

## Export with a Custom Image Size

Pass a `SizeF` with the desired width and height in pixels. Set `keepAspectRatio: true` to maintain the aspect ratio of the output image.

```csharp
PdfToImageConverter imageConverter = new PdfToImageConverter();
FileStream inputStream = new FileStream("Input.pdf", FileMode.Open, FileAccess.ReadWrite);
imageConverter.Load(inputStream);
Stream outputStream = imageConverter.Convert(0, new SizeF(1836, 2372), false, false, false);
```

**WinForms / WPF — save the output stream as a file:**
```csharp
Bitmap image = new Bitmap(outputStream);
image.Save("sample.png");
```

---

## Export with Custom DPI Resolution 

**Note:**  For Syncfusion.PdfToImageConverter.WPF, Syncfusion.PdfToImageConverter.Asp.net.Mvc5 and Syncfusion.PdfToImageConverter.WinForms NuGets this method wilol available page-range DPI (`DpiX`/`DpiY`) 

```csharp
int startPageIndex = 0;
int endPageIndex = 3;
float dpiX = 200;
float dpiY = 200;

PdfToImageConverter imageConverter = new PdfToImageConverter();
FileStream inputStream = new FileStream("Input.pdf", FileMode.Open, FileAccess.ReadWrite);
imageConverter.Load(inputStream);
Stream[] outputStream = imageConverter.Convert(startPageIndex, endPageIndex, dpiX, dpiY, false, false);
```

**WinForms / WPF — save each page as a file:**
```csharp
for (int i = 0; i < outputStream.Length; i++)
{
    Bitmap image = new Bitmap(outputStream[i]);
    image.Save("sample-" + i + ".png");
}
```

---
## Export with Zoom Factor and Tile Parameters (ASP.NET Core / Blazor)

Use zoom factor and tile matrix coordinates for fine-grained resolution control. `ScaleFactor` scales the page to enhance image quality (default: `1.5f`).

**Note:** 
Syncfusion.PdfToImageConverter.Net.Core and Syncfusion.PdfToImageConverter.Net NuGet only support the zoom-factor + tile-matrix overload (use `Convert(pageIndex, zoomFactor, tileXCount, tileYCount, tileX, tileY)`).

```csharp
float zoomFactor = 1;
int tileXCount = 2;
int tileYCount = 3;
int tileX = 0;
int tileY = 0;

PdfToImageConverter imageConverter = new PdfToImageConverter();
imageConverter.ScaleFactor = 1;
FileStream inputStream = new FileStream("Input.pdf", FileMode.Open, FileAccess.ReadWrite);
imageConverter.Load(inputStream);
Stream outputStream = imageConverter.Convert(0, zoomFactor, tileXCount, tileYCount, tileX, tileY);
```
