import React from "react";

type ImageInputProps = {
  imageInputRef: React.RefObject<HTMLInputElement | null>;
  onInputChange: (file: File) => void;
};

export const ImageInput = ({
  imageInputRef,
  onInputChange,
}: ImageInputProps) => {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      onInputChange(file);
    }
  };

  return (
    <input
      type="file"
      ref={(e) => {
        imageInputRef.current = e;
      }}
      onChange={onFileChange}
      className="hidden"
      accept="image/*"
    />
  );
};
