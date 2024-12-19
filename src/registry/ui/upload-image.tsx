"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ImageDown, Maximize2, X } from "lucide-react";

import { usePrevious } from "@/my-components/hooks/use-previous";


type ImageSrc = string | File | undefined;

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

const useSingleImageInput = ({
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

type UploadImageProps = {
  value: ImageSrc;
  onChange: (file: File) => void;
};
const UploadImage = ({
  value,
  onChange,
}: UploadImageProps) => {
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
      <ImageInput imageInputRef={imageInputRef} onInputChange={onInputChange} />
    </div>
  );
};

type ImageFieldProps = {
  src: string;
  width?: number;
  height?: number;

  onLoadImage: () => void;
  onRemove?: () => void;
  dragHandle?: React.ReactNode;
};

const ImagePreview = ({
  width,
  height,
  src,
  onLoadImage,
  onRemove,
  dragHandle,
}: ImageFieldProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div
      className="flex flex-col gap-2 w-full h-full"
      // style={{width: }}
    >
      <div
        className="group relative overflow-hidden rounded-sm transition-all w-full h-full"
        //   style={{ width: `${width ?? 200}px`, height: `${height ?? 200}px` }}
      >
        <Image
          src={src}
          alt="Preview"
          fill
          // sizes={`${width ?? 200}px`}
          style={{
            objectFit: "cover",
          }}
          priority
        />

        {!!dragHandle && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
            {dragHandle}
          </div>
        )}
        <div className="absolute bottom-1 right-1 space-x-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
          <Button
            onClick={(e) => {
              e.preventDefault();
              onLoadImage();
            }}
            size="icon"
            className="bg-slate-900/40 cursor-pointer"
            variant="ghost"
            aria-label="Load new image"
          >
            <ImageDown />
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="icon"
                className="bg-slate-900/40 cursor-pointer"
                variant="ghost"
                aria-label="Zoom in"
              >
                <Maximize2 />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80vw] max-h-[80vh] h-full w-full sm:rounded-none rounded-none p-0">
              <VisuallyHidden.Root>
                <DialogTitle>Full size preview</DialogTitle>
              </VisuallyHidden.Root>
              {isDialogOpen && (
                <div className="relative translate-x-[-50%] left-[50%] h-full max-w-full">
                  <Image
                    src={src}
                    sizes="1000px"
                    alt="Full size"
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
              <VisuallyHidden.Root>
                <DialogDescription>Full size preview</DialogDescription>
              </VisuallyHidden.Root>
            </DialogContent>
          </Dialog>
        </div>
        {onRemove && (
          <div className="absolute top-1 right-1 space-x-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
            <Button
              onClick={(e) => {
                e.preventDefault();
                onRemove();
              }}
              size="icon"
              className="bg-slate-900/40"
              variant="ghost"
              aria-label="Remove image"
            >
              <X />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

type ImageInputProps = {
  imageInputRef: React.RefObject<HTMLInputElement | null>;
  onInputChange: (file: File) => void;
};

const ImageInput = ({
  imageInputRef,
  onInputChange,
}: ImageInputProps) => {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      onInputChange(file);
    }
    e.stopPropagation();
  };

  return (
    <input
      type="file"
      ref={(e) => {
        imageInputRef.current = e;
      }}
      onInput={onFileChange}
      onChange={onFileChange}
      className="hidden"
      accept="image/*"
    />
  );
};

export { 
  UploadImage,
}

export type { ImageSrc }