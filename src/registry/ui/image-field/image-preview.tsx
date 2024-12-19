import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImageDown, Maximize2, X } from "lucide-react";
import { useState } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from "next/image";

type ImageFieldProps = {
  src: string;
  width?: number;
  height?: number;

  onLoadImage: () => void;
  onRemove?: () => void;
  dragHandle?: React.ReactNode;
};

export const ImagePreview = ({
    width,
    height,
    src,
    onLoadImage,
    onRemove,
    dragHandle,
  }: ImageFieldProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  
    return (
      <div className="flex flex-col gap-2 w-full h-full"
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
                  <DialogDescription>
                    Full size preview
                  </DialogDescription>
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
  