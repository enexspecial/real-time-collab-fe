import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_MY_NOTES } from '../graphql/queries';
import { CREATE_NOTE } from '../graphql/mutations';
import Navbar from '../components/Layout/Navbar';
import NoteList from '../components/Notes/NoteList';

export default function NotesPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(GET_MY_NOTES);
  const [createNote] = useMutation(CREATE_NOTE, {
    onCompleted: (data) => {
      navigate(`/notes/${data.createNote.id}`);
    },
  });

  const handleCreateNote = (e) => {
    e.preventDefault();
    createNote({
      variables: {
        title: newNote.title,
        content: newNote.content,
      },
    });
  };

  if (loading) return (
    <div>
      <Navbar />
      <div className="p-8 text-center">Loading...</div>
    </div>
  );

  if (error) return (
    <div>
      <Navbar />
      <div className="p-8 text-center text-red-600">Error loading notes: {error.message}</div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Notes</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            New Note
          </button>
        </div>

        {showCreateForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded">
            <form onSubmit={handleCreateNote} className="space-y-4">
              <input
                type="text"
                placeholder="Note title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <textarea
                placeholder="Note content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="w-full px-3 py-2 border rounded h-32"
                required
              />
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Create Note
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

        <NoteList notes={data?.myNotes} refetch={refetch} />
      </div>
    </div>
  );
} 