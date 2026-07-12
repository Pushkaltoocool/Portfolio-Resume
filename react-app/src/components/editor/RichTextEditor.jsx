import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, common } from 'lowlight';
import Toolbar from './Toolbar.jsx';
import { uploadImage } from '../../lib/upload.js';

const lowlight = createLowlight(common);

// Rich text editor built on Tiptap. Emits { html, json } on every change so the
// parent can persist both (JSON for re-editing, HTML for rendering).
const RichTextEditor = ({ value, onChange, onImageBusy }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' } }),
      Image.configure({ inline: false, HTMLAttributes: { class: 'blog-img' } }),
      Placeholder.configure({ placeholder: "Write your entry… Paste or drop images, or use the toolbar. Type '/' isn't wired, use the buttons above." }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CharacterCount,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value || '',
    editorProps: {
      attributes: { class: 'blog-prose editor-surface focus:outline-none' },
      handlePaste: (view, event) => {
        const files = Array.from(event.clipboardData?.files || []).filter((f) => f.type.startsWith('image/'));
        if (!files.length) return false;
        event.preventDefault();
        files.forEach(async (file) => {
          onImageBusy?.(true);
          try {
            const url = await uploadImage(file);
            editor?.chain().focus().setImage({ src: url }).run();
          } catch {
            /* surfaced by toolbar upload errors elsewhere */
          } finally {
            onImageBusy?.(false);
          }
        });
        return true;
      },
      handleDrop: (view, event) => {
        const files = Array.from(event.dataTransfer?.files || []).filter((f) => f.type.startsWith('image/'));
        if (!files.length) return false;
        event.preventDefault();
        files.forEach(async (file) => {
          onImageBusy?.(true);
          try {
            const url = await uploadImage(file);
            editor?.chain().focus().setImage({ src: url }).run();
          } catch {
            /* ignore */
          } finally {
            onImageBusy?.(false);
          }
        });
        return true;
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.({ html: editor.getHTML(), json: editor.getJSON() });
    },
  });

  // Sync external content into the editor when it loads (edit mode).
  useEffect(() => {
    if (editor && value && editor.isEmpty) {
      editor.commands.setContent(value, false);
    }
  }, [editor, value]);

  return (
    <div className="editor-shell">
      <div className="editor-toolbar-wrap">
        <Toolbar editor={editor} onImageBusy={onImageBusy} />
      </div>
      <EditorContent editor={editor} />
      {editor && (
        <div className="editor-statusbar">
          <span>{editor.storage.characterCount.words()} words</span>
          <span>{editor.storage.characterCount.characters()} chars</span>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
