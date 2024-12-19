"use client";

import { useState } from "react";
import { UploadImage, ImageSrc } from "@/registry/ui/upload-image";

export function UploadImageExample() {
  const [value, setValue] = useState<ImageSrc>(undefined);

  return (
    <div className="mt-2 flex flex-col justify-center">
      <span className="text-sm text-gray-500">
        {value instanceof File ? value.name : value ?? "No file selected"}
      </span>
      <UploadImage value={value} onChange={setValue} />
    </div>
  );
}
