import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_NOTES } from '../graphql/queries';
import { CREATE_NOTE } from '../graphql/mutations';
import Navbar from '../components/Layout/Navbar';
import NoteList from '../components/Notes/NoteList';

export default function NotesPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', isPublic: false });
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(GET_NOTES);
  const [createNote, { loading: creating }] = useMutation(CREATE_NOTE, {
    onCompleted: (data) => {
      setShowCreateForm(false);
      setNewNote({ title: '', content: '', isPublic: false });
      if (data?.createNote?.id) {
        navigate(`/notes/${data.createNote.id}`);
      } else {
        refetch();
      }
    },
    onError: () => {},
    refetchQueries: [{ query: GET_NOTES }],
  });

  const handleCreateNote = (e) => {
    e.preventDefault();
    createNote({
      variables: {
        title: newNote.title,
        content: newNote.content,
        isPublic: newNote.isPublic,
      },
    });
  };

  if (loading) return (
    <div className="w-screen h-screen flex flex-col bg-gray-900">
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-white">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="w-screen h-screen flex flex-col bg-gray-900">
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-red-400">Error loading notes: {error.message}</div>
    </div>
  );

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-900">
      <Navbar />
      <div className="flex-1 flex flex-col p-4 md:p-10 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">My Notes</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 border border-blue-400 shadow"
          >
            New Note
          </button>
        </div>

        {showCreateForm && (
          <div className="mb-10 p-6 bg-gray-100 rounded-lg shadow-lg border border-gray-200 max-w-2xl w-full">
            <form onSubmit={handleCreateNote} className="space-y-4">
              <input
                type="text"
                placeholder="Note title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full px-3 py-2 border rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <textarea
                placeholder="Note content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="w-full px-3 py-2 border rounded h-32 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={newNote.isPublic}
                  onChange={(e) => setNewNote({ ...newNote, isPublic: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700">
                  Make this note public
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={creating}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create Note'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-8 w-full flex-1">
          <NoteList notes={data?.notes || []} refetchNotes={refetch} />
        </div>
      </div>
    </div>
  );
} 