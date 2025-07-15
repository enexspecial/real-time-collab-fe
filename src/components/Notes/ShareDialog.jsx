import { useState } from 'react';
import { useNotes } from '../../hooks/useNotes';

export default function ShareDialog({ noteId, isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [canEdit, setCanEdit] = useState(false);
  const { shareNote, loading } = useNotes();

  const handleShare = async () => {
    if (email.trim()) {
      try {
        // For now, we'll use email instead of userId since the API expects userId
        // You might need to implement a user search endpoint or modify the API
        await shareNote({
          noteId,
          userId: email, // This should be a user ID, not email
          canEdit
        });
        setEmail('');
        setCanEdit(false);
        onClose();
      } catch (error) {
        console.error('Failed to share note:', error);
        alert('Failed to share note. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Share Note</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Note: You'll need the user's ID to share. This is a simplified version.
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="canEdit"
              checked={canEdit}
              onChange={(e) => setCanEdit(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="canEdit" className="text-sm text-gray-700">
              Allow editing
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={!email.trim() || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </div>
      </div>
    </div>
  );
} 