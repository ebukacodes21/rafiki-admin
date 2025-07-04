import { Button } from '@/components/ui/button'
import { Editor } from '@tiptap/react'
import { Bold, Italic } from 'lucide-react'
import React, { FC } from 'react'

type MenubarProp = {
    editor: Editor
}

const Menubar: FC<MenubarProp> = ({ editor}) => {
  return (
    <div className='flex flex-wrap gap-2'>
      <Button
          variant={"ghost"}
            className={`${editor?.isActive("bold") ? "is-active" : ""} cursor-pointer`}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editor?.can().chain().toggleBold().run()}
          >
            <Bold className="h-5 w-5" />
          </Button>
           <Button
          variant={"ghost"}
            className={`${editor?.isActive("italic") ? "is-active" : ""} cursor-pointer`}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editor?.can().chain().toggleItalic().run()}
          >
            <Italic className="h-5 w-5" />
          </Button>
    </div>
  )
}

export default Menubar
