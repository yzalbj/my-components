export type FileNode = {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileNode[];
};

type CodeViewerWithFiles = {
  files: FileNode[] | string[];
  directory?: never;
  className?: string;
}

type CodeViewerWithDirectory = {
  directory: string;
  files: never[];
  className?: string;
}

export type CodeViewerProps = CodeViewerWithFiles | CodeViewerWithDirectory;