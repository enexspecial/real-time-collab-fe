import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_NOTE } from '../graphql/queries';
import { UPDATE_NOTE } from '../graphql/mutations';
import { useNoteSubscription } from '../hooks/useNoteSubscription';
import Navbar from '../components/Layout/Navbar';
import NoteEditor from '../components/Notes/NoteEditor';
import ShareDialog from '../components/Notes/ShareDialog';
import VersionHistory from '../components/Notes/VersionHistory';

export default function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_NOTE, { variables: { id } });
  const [updateNote, { loading: updating }] = useMutation(UPDATE_NOTE, {
    onCompleted: () => {
      refetch();
    },
  });
  const { noteUpdate, typingUsers } = useNoteSubscription(id);

  useEffect(() => {
    if (data?.note) {
      setTitle(data.note.title || '');
      setContent(data.note.content || '');
      setIsPublic(data.note.isPublic || false);
    }
  }, [data]);

  useEffect(() => {
    if (noteUpdate) {
      setContent(noteUpdate.content);
      setTitle(noteUpdate.title);
    }
  }, [noteUpdate]);

  const handleSave = async () => {
    try {
      await updateNote({ variables: { id, title, content } });
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  if (loading) return (
    <div className="w-screen h-screen flex flex-col bg-gray-900">
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-white text-xl">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="w-screen h-screen flex flex-col bg-gray-900">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded shadow text-lg">
          <span className="font-semibold">Error loading note:</span> {error.message}
        </div>
      </div>
    </div>
  );

  if (!data?.note) return (
    <div className="w-screen h-screen flex flex-col bg-gray-900">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded shadow text-lg">
          Note not found
        </div>
      </div>
    </div>
  );

  const note = data.note;

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Note</h1>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowVersionHistory(true)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Version History
              </button>
              <button
                onClick={() => setShowShareDialog(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Share
              </button>
              <button
                onClick={handleSave}
                disabled={updating}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {updating ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {typingUsers.length > 0 && (
            <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded">
              <span className="text-sm text-blue-700">
                {typingUsers.map(user => user.email).join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
              </span>
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="w-full px-3 py-2 border rounded text-xl font-semibold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="isPublic" className="text-sm text-gray-700 dark:text-gray-300">
                Make this note public
              </label>
            </div>
            <NoteEditor
              content={content}
              onChange={setContent}
              editable={true}
              noteId={id}
            />
          </div>

          {note.sharedWith && note.sharedWith.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Shared with:</h3>
              <div className="space-y-1">
                {note.sharedWith.map((share) => (
                  <div key={share.id} className="text-sm text-gray-700 dark:text-gray-300">
                    {share.user?.email} - {share.accessLevel}
                  </div>
                ))}
              </div>
            </div>
          )}

          <ShareDialog
            noteId={id}
            isOpen={showShareDialog}
            onClose={() => setShowShareDialog(false)}
          />

          {showVersionHistory && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Version History</h3>
                  <button
                    onClick={() => setShowVersionHistory(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <VersionHistory
                  noteId={id}
                  onRestore={() => {
                    setShowVersionHistory(false);
                    refetch();
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 