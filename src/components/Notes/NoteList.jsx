import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_NOTE } from '../../graphql/mutations';

export default function NoteList({ notes, refetch }) {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote({ variables: { id } });
    }
  };

  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No notes yet. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <div key={note.id} className="bg-white p-6 rounded-lg shadow border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {note.title || 'Untitled'}
            </h3>
            <div className="flex space-x-2">
              <Link
                to={`/notes/${note.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
          
          <div className="text-gray-600 text-sm mb-4 line-clamp-3">
            {note.content ? note.content.replace(/<[^>]*>/g, '').substring(0, 150) : 'No content'}
          </div>
          
          <div className="text-xs text-gray-500">
            {new Date(note.updatedAt).toLocaleDateString()}
            {note.isShared && (
              <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Shared
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 