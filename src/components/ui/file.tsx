import React from "react";
import fs from "fs/promises";
import path from "path";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

type FileProps = {
  pathFile: string;
};
const File = async ({ pathFile }: FileProps) => {
  const extension = pathFile.split(".").pop();
  const filePath = path.join(process.cwd(), "src", pathFile);
  const code = await fs.readFile(filePath);

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // See Options section below.
    })
    .use(rehypeStringify)
    .process(`\`\`\`${extension}\n${code}\n\`\`\``);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Accordion 1</AccordionTrigger>
        <AccordionContent>
          <section
            dangerouslySetInnerHTML={{
              __html: String(file),
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default File;
