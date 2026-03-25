#!/usr/bin/env dotnet-script
#r "nuget: Syncfusion.Markdown"
#r "nuget: Syncfusion.Licensing"

using System;
using System.IO;
using Syncfusion.Office.Markdown;

// Register Syncfusion License
var licenseFile = Path.Combine(Directory.GetCurrentDirectory(), "SyncfusionLicense.txt");
if (File.Exists(licenseFile))
{
    var license = File.ReadAllText(licenseFile).Trim();
    if (!string.IsNullOrWhiteSpace(license))
        Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense(license);
}

// Ensure output directory exists
Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "output"));

try
{
    // *** INSERT OPERATION CODE HERE ***
    
    Console.WriteLine("SUCCESS: {output-file-path}");
}
catch (Exception ex)
{
    Console.Error.WriteLine($"ERROR: {ex.Message}");
    Environment.Exit(1);
}
