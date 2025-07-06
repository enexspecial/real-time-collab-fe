import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../../graphql/queries';
import { SHARE_NOTE } from '../../graphql/mutations';

export default function ShareDialog({ noteId, isOpen, onClose, refetch }) {
  const [selectedUser, setSelectedUser] = useState('');
  const [accessLevel, setAccessLevel] = useState('VIEW');

  const { data: usersData } = useQuery(GET_USERS);
  const [shareNote] = useMutation(SHARE_NOTE, {
    onCompleted: () => {
      refetch();
      onClose();
    },
  });

  const handleShare = () => {
    if (selectedUser) {
      shareNote({
        variables: {
          noteId,
          userId: selectedUser,
          accessLevel,
        },
      });
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
              Select User
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a user...</option>
              {usersData?.users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Level
            </label>
            <select
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="VIEW">View Only</option>
              <option value="EDIT">Can Edit</option>
            </select>
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
            disabled={!selectedUser}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
} 