"use client";

import { CopyIcon } from "lucide-react";
import { Button } from "./button";

export const CopyButton = ({ text }: { text: string }) => {
  return (
    <Button
      size="icon"
      variant="outline"
      className="cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(text);
      }}
    >
      <CopyIcon />
    </Button>
  );
};
