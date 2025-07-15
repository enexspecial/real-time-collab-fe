import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function NoteEditor({ content, onChange, editable = true, noteId }) {
  // Call useEditor directly, only once per mount
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const socketRef = useRef(null);
  const noteIdRef = useRef(noteId);

  useEffect(() => {
    noteIdRef.current = noteId;
  }, [noteId]);

  useEffect(() => {
    if (!editor) return;
    // Connect to Socket.IO server with JWT auth
    const token = localStorage.getItem('accessToken');
    const socket = io(import.meta.env.VITE_SOCKET_IO_URL || 'http://localhost:4000', {
      auth: { token },
      transports: ['websocket'],
    });
    socketRef.current = socket;

    // Join note room
    socket.emit('joinNote', { noteId });

    // Listen for remote content updates
    const handleRemoteUpdate = ({ content: remoteContent }) => {
      if (editor && remoteContent !== editor.getHTML()) {
        editor.commands.setContent(remoteContent, false);
      }
    };
    socket.on('noteContentUpdate', handleRemoteUpdate);

    // Emit content changes
    const handleEditorUpdate = () => {
      if (editor) {
        socket.emit('noteContentUpdate', {
          noteId: noteIdRef.current,
          content: editor.getHTML(),
        });
      }
    };
    editor.on('update', handleEditorUpdate);

    // Cleanup on unmount
    return () => {
      socket.emit('leaveNote', { noteId: noteIdRef.current });
      socket.disconnect();
      socket.off('noteContentUpdate', handleRemoteUpdate);
      editor.off('update', handleEditorUpdate);
    };
    // Only run this effect when noteId changes or editor is ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, editor]);

  useEffect(() => {
    if (!editor) return;
    // If parent content changes (e.g., from server), update editor
    if (content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, editor]);

  return (
    <div className="border rounded p-2">
      <EditorContent editor={editor} />
    </div>
  );
} 