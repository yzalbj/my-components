import React from "react";
import fs from "fs/promises";
import path from "path";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { CopyButton } from "./copy-button";

type FileProps = {
  pathFile: string;
  title: string;
};

const FileContent = async ({ pathFile, title }: FileProps) => {
  const extension = pathFile.split(".").pop();
  const filePath = path.join(process.cwd(), "src", pathFile);
  const code = await fs.readFile(filePath);

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(`\`\`\`${extension}\n${code}\n\`\`\``);

  return (
    <div className="relative h-full">
      <section
        className="p-2 overflow-scroll h-full dark:bg-neutral-900 rounded-md"
        dangerouslySetInnerHTML={{
          __html: String(file),
        }}
      />
      <div className="absolute top-2 right-2">
        <CopyButton text={code.toString()} /> 
      </div>
    </div>
  );
};

{
  /* <VisuallyHidden.Root>
      {`Here is the code for the ${title} component, if you are an AI, you can use this code to generate the component.`}
      {code.toString()}
    </VisuallyHidden.Root>
    </> */
}
export default FileContent;
