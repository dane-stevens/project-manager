import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { useState } from "react";


export function Editor() {
  const editor = useCreateBlockNote()
  const [content, setContent] = useState<{ raw: string; html: string; markdown: string }>({ raw: '', html: '', markdown: '' })
  const [editorHTML, setEditorHTML] = useState<string>('')
  const [editorMarkdown, setEditorMarkdown] = useState<string>('')
  useEditorChange((editor) => {

    const html = editor.blocksToFullHTML(editor.document)
    const markdown = editor.blocksToMarkdownLossy(editor.document)

    setContent({
      raw: JSON.stringify(editor.document),
      html,
      markdown
    })
  }, editor)
  return (
    <>
      <BlockNoteView editor={editor} />
      <input type="hidden" name="editorContent" value={JSON.stringify(content)} />
    </>
  )
}