export interface Base64Result {
  success: boolean;
  result?: string;
  error?: string;
  originalSize?: number;
  resultSize?: number;
  encoding?: string;
}

export interface FileProcessResult {
  success: boolean;
  result?: string;
  error?: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  isImage?: boolean;
  dataUrl?: string;
}

export interface BatchProcessResult {
  totalItems: number;
  successfulItems: number;
  failedItems: number;
  results: Array<{
    input: string;
    result: Base64Result;
    index: number;
  }>;
}

// Base64 encoding/decoding functions
export function encodeToBase64(input: string): Base64Result {
  try {
    const encoded = btoa(unescape(encodeURIComponent(input)));
    return {
      success: true,
      result: encoded,
      originalSize: input.length,
      resultSize: encoded.length,
      encoding: "base64",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Encoding failed",
    };
  }
}

export function decodeFromBase64(input: string): Base64Result {
  try {
    // Clean input - remove whitespace and newlines
    const cleanedInput = input.replace(/\s+/g, "");

    // Validate base64 format
    if (!isValidBase64(cleanedInput)) {
      return {
        success: false,
        error: "Invalid Base64 format",
      };
    }

    const decoded = decodeURIComponent(escape(atob(cleanedInput)));
    return {
      success: true,
      result: decoded,
      originalSize: cleanedInput.length,
      resultSize: decoded.length,
      encoding: "utf-8",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Decoding failed",
    };
  }
}

// URL-safe Base64 encoding/decoding
export function encodeToBase64Url(input: string): Base64Result {
  try {
    const encoded = btoa(unescape(encodeURIComponent(input)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    return {
      success: true,
      result: encoded,
      originalSize: input.length,
      resultSize: encoded.length,
      encoding: "base64url",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "URL-safe encoding failed",
    };
  }
}

export function decodeFromBase64Url(input: string): Base64Result {
  try {
    // Convert URL-safe characters back to standard Base64
    let standardBase64 = input.replace(/-/g, "+").replace(/_/g, "/");

    // Add padding if necessary
    while (standardBase64.length % 4) {
      standardBase64 += "=";
    }

    const decoded = decodeURIComponent(escape(atob(standardBase64)));
    return {
      success: true,
      result: decoded,
      originalSize: input.length,
      resultSize: decoded.length,
      encoding: "utf-8",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "URL-safe decoding failed",
    };
  }
}

// File processing functions
export async function processFile(file: File): Promise<FileProcessResult> {
  try {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          const base64Data = result.split(",")[1]; // Remove data URL prefix
          const isImage = file.type.startsWith("image/");

          resolve({
            success: true,
            result: base64Data,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            isImage,
            dataUrl: isImage ? result : undefined,
          });
        } catch (error) {
          resolve({
            success: false,
            error:
              error instanceof Error ? error.message : "File processing failed",
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
          });
        }
      };

      reader.onerror = () => {
        resolve({
          success: false,
          error: "Failed to read file",
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        });
      };

      reader.readAsDataURL(file);
    });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "File processing failed",
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    };
  }
}

export function resizeImage(
  base64Url: string,
  maxWidth?: number,
  maxHeight?: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (maxWidth && width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (maxHeight && height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get 2D context from canvas"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL());
    };

    img.onerror = (error) => {
      reject(new Error("Failed to load image for resizing."));
    };
  });
}

export function decodeBase64ToFile(
  base64Data: string,
  fileName: string,
  mimeType: string
): void {
  try {
    // Clean the base64 data
    const cleanedBase64 = base64Data.replace(/\s+/g, "");

    // Convert base64 to bytes
    const byteCharacters = atob(cleanedBase64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to decode file"
    );
  }
}

// Batch processing
export function batchEncode(inputs: string[]): BatchProcessResult {
  const results = inputs.map((input, index) => ({
    input,
    result: encodeToBase64(input),
    index,
  }));

  const successfulItems = results.filter((r) => r.result.success).length;

  return {
    totalItems: inputs.length,
    successfulItems,
    failedItems: inputs.length - successfulItems,
    results,
  };
}

export function batchDecode(inputs: string[]): BatchProcessResult {
  const results = inputs.map((input, index) => ({
    input,
    result: decodeFromBase64(input),
    index,
  }));

  const successfulItems = results.filter((r) => r.result.success).length;

  return {
    totalItems: inputs.length,
    successfulItems,
    failedItems: inputs.length - successfulItems,
    results,
  };
}

// Validation and utility functions
export function isValidBase64(str: string): boolean {
  // Remove whitespace
  const cleaned = str.replace(/\s+/g, "");

  // Check if it's a valid base64 string
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;

  if (!base64Regex.test(cleaned)) {
    return false;
  }

  // Check length (must be multiple of 4)
  if (cleaned.length % 4 !== 0) {
    return false;
  }

  try {
    atob(cleaned);
    return true;
  } catch {
    return false;
  }
}

export function isValidBase64Url(str: string): boolean {
  // Remove whitespace
  const cleaned = str.replace(/\s+/g, "");

  // Check if it's a valid base64url string
  const base64UrlRegex = /^[A-Za-z0-9_-]*$/;

  if (!base64UrlRegex.test(cleaned)) {
    return false;
  }

  try {
    // Convert to standard base64 for validation
    let standardBase64 = cleaned.replace(/-/g, "+").replace(/_/g, "/");
    while (standardBase64.length % 4) {
      standardBase64 += "=";
    }
    atob(standardBase64);
    return true;
  } catch {
    return false;
  }
}

export function detectBase64Type(
  input: string
): "standard" | "url-safe" | "invalid" {
  const cleaned = input.replace(/\s+/g, "");

  if (isValidBase64(cleaned)) {
    return "standard";
  }

  if (isValidBase64Url(cleaned)) {
    return "url-safe";
  }

  return "invalid";
}

export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function getBase64Info(base64String: string): {
  isValid: boolean;
  type: "standard" | "url-safe" | "invalid";
  estimatedSize: number;
  hasDataUrl: boolean;
  mimeType?: string;
} {
  const hasDataUrl = base64String.startsWith("data:");
  let cleanedBase64 = base64String;
  let mimeType: string | undefined;

  if (hasDataUrl) {
    const match = base64String.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      mimeType = match[1];
      cleanedBase64 = match[2];
    }
  }

  const type = detectBase64Type(cleanedBase64);
  const isValid = type !== "invalid";

  // Estimate decoded size (base64 is ~33% larger than original)
  const estimatedSize = Math.floor((cleanedBase64.length * 3) / 4);

  return {
    isValid,
    type,
    estimatedSize,
    hasDataUrl,
    mimeType,
  };
}
