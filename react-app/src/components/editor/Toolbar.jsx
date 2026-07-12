import { useRef, useState } from 'react';
import { uploadImage } from '../../lib/upload.js';

const Btn = ({ active, disabled, onClick, title, children }) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    aria-pressed={active}
    disabled={disabled}
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    className={`tb-btn ${active ? 'tb-btn-active' : ''}`}>
    {children}
  </button>
);

const Divider = () => <span className="tb-divider" aria-hidden />;

const Toolbar = ({ editor, onImageBusy }) => {
  const fileRef = useRef(null);
  const [uploadError, setUploadError] = useState('');

  if (!editor) return null;

  const addImage = async (file) => {
    if (!file) return;
    setUploadError('');
    onImageBusy?.(true);
    try {
      const url = await uploadImage(file);
      editor.chain().focus().setImage({ src: url, alt: file.name || '' }).run();
    } catch (e) {
      setUploadError(e.message);
    } finally {
      onImageBusy?.(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const setLink = () => {
    const prev = editor.getAttributes('link').href || '';
    const url = window.prompt('Link URL (leave empty to remove):', prev);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  return (
    <div className="editor-toolbar">
      <select
        aria-label="Text style"
        className="tb-select"
        value={
          editor.isActive('heading', { level: 2 })
            ? 'h2'
            : editor.isActive('heading', { level: 3 })
              ? 'h3'
              : editor.isActive('heading', { level: 4 })
                ? 'h4'
                : 'p'
        }
        onChange={(e) => {
          const v = e.target.value;
          if (v === 'p') editor.chain().focus().setParagraph().run();
          else editor.chain().focus().toggleHeading({ level: Number(v[1]) }).run();
        }}>
        <option value="p">Paragraph</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
      </select>

      <Divider />

      <Btn title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <i className="fa-solid fa-bold" />
      </Btn>
      <Btn title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <i className="fa-solid fa-italic" />
      </Btn>
      <Btn
        title="Underline"
        active={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <i className="fa-solid fa-underline" />
      </Btn>
      <Btn
        title="Strikethrough"
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}>
        <i className="fa-solid fa-strikethrough" />
      </Btn>
      <Btn
        title="Inline code"
        active={editor.isActive('code')}
        onClick={() => editor.chain().focus().toggleCode().run()}>
        <i className="fa-solid fa-terminal" />
      </Btn>

      <Divider />

      <Btn
        title="Bulleted list"
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <i className="fa-solid fa-list-ul" />
      </Btn>
      <Btn
        title="Numbered list"
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <i className="fa-solid fa-list-ol" />
      </Btn>
      <Btn
        title="Quote"
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <i className="fa-solid fa-quote-left" />
      </Btn>
      <Btn
        title="Code block"
        active={editor.isActive('codeBlock')}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <i className="fa-solid fa-code" />
      </Btn>

      <Divider />

      <Btn title="Align left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
        <i className="fa-solid fa-align-left" />
      </Btn>
      <Btn title="Align center" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
        <i className="fa-solid fa-align-center" />
      </Btn>

      <Divider />

      <Btn title="Add link" active={editor.isActive('link')} onClick={setLink}>
        <i className="fa-solid fa-link" />
      </Btn>
      <Btn title="Insert image" onClick={() => fileRef.current?.click()}>
        <i className="fa-solid fa-image" />
      </Btn>
      <Btn title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <i className="fa-solid fa-minus" />
      </Btn>

      <Divider />

      <Btn title="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
        <i className="fa-solid fa-rotate-left" />
      </Btn>
      <Btn title="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
        <i className="fa-solid fa-rotate-right" />
      </Btn>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => addImage(e.target.files?.[0])}
      />
      {uploadError && (
        <span className="ml-auto text-xs text-red-400" role="alert">
          {uploadError}
        </span>
      )}
    </div>
  );
};

export default Toolbar;
