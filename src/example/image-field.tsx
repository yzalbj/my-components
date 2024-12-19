"use client";

import { useState } from "react";
import { SingleImageField, ImageSrc } from "@/registry/ui/image-field";

export function SingleImageFieldExample() {
  const [value, setValue] = useState<ImageSrc>(undefined);

  return (
    <div className="mt-2 flex flex-col justify-center">
      <span className="text-sm text-gray-500">
        {value instanceof File ? value.name : value ?? "No file selected"}
      </span>
      <SingleImageField value={value} onChange={setValue} />
    </div>
  );
}
