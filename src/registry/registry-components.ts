import { Registry } from "./schema";

export const ui: Registry = [
  {
    name: "image-field",
    type: "registry:ui",
    registryDependencies: ["button", "dialog"],
    files: [
      {
        type: "registry:ui",
        path: "ui/image-field/index.ts",
      },
      {
        type: "registry:ui",
        path: "ui/image-field/image-preview.tsx",
      },
      {
        type: "registry:ui",
        path: "ui/image-field/single-image.tsx",
      },
      {
        type: "registry:ui",
        path: "ui/image-field/input.tsx",
      },
    ],
  },
];
