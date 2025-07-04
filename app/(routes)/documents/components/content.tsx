import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DocumentTextIcon,
  CalendarDaysIcon,
  UsersIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useState } from "react";
import Menubar from "./menubar";
import { Bold } from "lucide-react";

export default function DociContent() {
  const [state, setState] = useState<string>("");
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: state,
    onUpdate: ({ editor }) => {
      setState(editor.getHTML());
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-screen p-6 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <Menubar editor={editor!} />
        <Button>save</Button>
      </div>
      <div className="flex-1 overflow-auto border rounded p-4">
        <EditorContent editor={editor} className="w-full h-full" />
      </div>
    </motion.div>
  );
}
