import React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode } from "lucide-react";
import { type CodeViewerProps, type FileNode } from "./types";
import FileContent from "../file-content";
import fs from 'fs';
import path from "path";

const getDirectoryFiles = (directory: string): FileNode[] => {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), "src/", directory));
    return files.map(file => {
      const fullPath = path.join(directory, file);
      return {
        name: file,
        path: fullPath,
        type: "file",
      };
    });
  } catch (error) {
    console.error('Erreur lors de la lecture du répertoire:', error);
    return [];
  }
};

export const CodeViewer = ({ files, directory, className }: CodeViewerProps) => {
  const fileNodes: FileNode[] = directory
  ? getDirectoryFiles(directory)
  : Array.isArray(files) && typeof files[0] === "string"
  ? (files as string[]).map((file) => ({
      name: file.split("/").pop() || file,
      path: file,
      type: "file",
    }))
  : (files as FileNode[]);

  return (
    <div
      className={cn("rounded-lg border bg-background p-4 h-[300px]", className)}
    >
      <Tabs
        orientation="vertical"
        defaultValue={fileNodes[0].path}
        className="h-full grid grid-cols-[200px_calc(100%-200px-var(--spacing)*4)] grid-rows-[100%] gap-4"
      >
        <TabsList className="flex flex-col justify-start items-start h-full">
          {fileNodes.map((file) => (
            <TabsTrigger key={file.path} value={file.path}>
              <FileCode className="w-4 h-4 mr-2" />
              {file.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="h-full">
          {fileNodes.map((file) => (
            <TabsContent
              key={file.path}
              value={file.path}
              className="mt-0 max-w-full h-full"
            >
              <FileContent
                pathFile={file.path}
                title={file.path.split("/").pop() || file.path}
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};
