import { ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

type CodeExampleProps = {
    preview: ReactNode
    code: ReactNode
}

export const CodeExample = ({ preview, code }: CodeExampleProps) => {
    return (
        <Tabs className="mt-4" defaultValue="preview">
            <TabsList>
                <TabsTrigger value="preview">
                    Preview
                </TabsTrigger>
                <TabsTrigger value="code">
                    Code
                </TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
                {preview}
            </TabsContent>
            <TabsContent value="code">
                {code}
            </TabsContent>
        </Tabs>
    )
}
