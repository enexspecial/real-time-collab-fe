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
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_NOTE, {
    variables: { id },
  });

  const [updateNote] = useMutation(UPDATE_NOTE, {
    onCompleted: () => {
      refetch();
    },
  });

  const { noteUpdate, typingUsers } = useNoteSubscription(id);

  useEffect(() => {
    if (data?.note) {
      setTitle(data.note.title || '');
      setContent(data.note.content || '');
    }
  }, [data]);

  useEffect(() => {
    if (noteUpdate) {
      setContent(noteUpdate.content);
      setTitle(noteUpdate.title);
    }
  }, [noteUpdate]);

  const handleSave = () => {
    updateNote({
      variables: {
        id,
        title,
        content,
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
      <div className="p-8 text-center text-red-600">Error loading note: {error.message}</div>
    </div>
  );

  if (!data?.note) return (
    <div>
      <Navbar />
      <div className="p-8 text-center">Note not found</div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Note</h1>
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
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
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
            className="w-full px-3 py-2 border rounded text-xl font-semibold"
          />
          
          <NoteEditor
            content={content}
            onChange={setContent}
            editable={true}
          />
        </div>

        {data.note.sharedWith && data.note.sharedWith.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Shared with:</h3>
            <div className="space-y-1">
              {data.note.sharedWith.map((share) => (
                <div key={share.id} className="text-sm">
                  {share.email} - {share.accessLevel}
                </div>
              ))}
            </div>
          </div>
        )}

        <ShareDialog
          noteId={id}
          isOpen={showShareDialog}
          onClose={() => setShowShareDialog(false)}
          refetch={refetch}
        />

        {showVersionHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Version History</h3>
                <button
                  onClick={() => setShowVersionHistory(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <VersionHistory
                versions={data.note.versions}
                noteId={id}
                onRestore={() => {
                  refetch();
                  setShowVersionHistory(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 