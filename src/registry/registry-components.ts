import { Registry } from "./schema";

export const ui: Registry = [
  {
    name: "upload-image",
    type: "registry:ui",
    registryDependencies: ["button", "dialog"],
    dependencies: ["@radix-ui/react-visually-hidden"],
    files: [
      {
        type: "registry:ui",
        path: "ui/upload-image.tsx",
      }
    ],
  },
];
