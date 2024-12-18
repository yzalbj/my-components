"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrevious } from "@/my-components/hooks/use-previous";
import { ImageInput } from "./input";
import { ImagePreview } from "./image-preview";
import { ImageSrc } from "./types";

type UseSingleImageInputProps = {
  src: ImageSrc;
  onFileChange: (file: File) => void;
};

const getImageSrc = (object: File | string | undefined) => {
  if (object instanceof File) {
    return undefined;
  }
  return object;
};

export const useSingleImageInput = ({
  src,
  onFileChange,
}: UseSingleImageInputProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const previousSrc = usePrevious(src);
  const initialImageSrc = getImageSrc(src);
  const [imageSrc, setImageSrc] = useState(initialImageSrc);

  const onInputChange = useCallback((object: File | undefined) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result as string);
    };

    if (object instanceof File && object.type.includes("image")) {
      reader.readAsDataURL(object);
      onFileChange(object);
    } else if (!object) {
      setImageSrc(undefined);
      onFileChange(undefined);
    }
  }, []);

  // if (src instanceof File && !(previousSrc instanceof File)) {
  //   onInputChange(src);
  // }

  useEffect(() => {
    if (src instanceof File) {
      onInputChange(src);
    }
  }, []);

  return {
    imageSrc,
    imageInputRef,
    onInputChange,
  };
};

type SingleImageFieldProps = {
  value: ImageSrc;
  onChange: (file: File) => void;
};
export const SingleImageField = ({
  value,
  onChange,
}: SingleImageFieldProps) => {
  const { imageSrc, imageInputRef, onInputChange } = useSingleImageInput({
    src: value,
    onFileChange: (file) => onChange(file),
  });

  return (
    <div
      className="group inline-block border border-gray-500 rounded-md p-2 cursor-pointer hover:border-gray-100"
      style={{
        width: "200px",
        height: "200px",
        cursor: imageSrc ? "default" : "pointer",
      }}
      onClick={(e) => {
        if (!imageSrc) {
          imageInputRef.current?.click();
          e.stopPropagation();
        }
      }}
    >
      {imageSrc && (
        <ImagePreview
          src={imageSrc}
          onLoadImage={() => imageInputRef.current?.click()}
          onRemove={() => {
            onInputChange(undefined);
          }}
        />
      )}
      {!imageSrc && (
        <div className="text-gray-500 flex flex-col items-center justify-center h-full group-hover:text-accent-foreground">
          <span className="transition-colors">No cover image yet.</span>
          <Button
            variant="ghost"
            className="focus:bg-accent focus:text-accent-foreground group-hover:bg-accent cursor-pointer"
            onClick={(e) => {
              imageInputRef.current?.click();
              e.stopPropagation();
            }}
          >
            → Load an image
          </Button>
        </div>
      )}
      <ImageInput
        imageInputRef={imageInputRef}
        onInputChange={onInputChange}
      />
    </div>
  );
};
