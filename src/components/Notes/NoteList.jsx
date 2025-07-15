import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_NOTE, UPDATE_NOTE } from '../../graphql/mutations';

export default function NoteList({ notes, refetchNotes }) {
  const [deleteNote, { loading }] = useMutation(DELETE_NOTE, {
    onCompleted: () => {
      if (refetchNotes) refetchNotes();
    },
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote({ variables: { id } });
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    }
  };

  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No notes yet. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <div key={note.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col min-h-[180px]">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {note.title || 'Untitled'}
            </h3>
            <div className="flex space-x-3 ml-2">
              <Link
                to={`/notes/${note.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(note.id)}
                disabled={loading}
                className="text-white bg-red-600 hover:bg-red-700 text-xs font-semibold px-3 py-1 rounded disabled:opacity-50"
              >
                {loading ? '...' : 'Delete'}
              </button>
            </div>
          </div>
          <div className="text-gray-700 text-sm mb-4 line-clamp-3 flex-1">
            {note.content ? note.content.replace(/<[^>]*>/g, '').substring(0, 150) : 'No content'}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-2">
            <span>
              {note.updatedAt ? new Date(note.updatedAt).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
            </span>
            <span className="flex gap-2">
              {note.isPublic && (
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">Public</span>
              )}
              {note.sharedWith && note.sharedWith.length > 0 && (
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Shared</span>
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
} 