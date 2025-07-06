import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { RESTORE_VERSION } from '../../graphql/mutations';

export default function VersionHistory({ versions, noteId, onRestore }) {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [restoreVersion] = useMutation(RESTORE_VERSION, {
    onCompleted: () => {
      onRestore();
    },
  });

  const handleRestore = () => {
    if (selectedVersion) {
      restoreVersion({
        variables: {
          noteId,
          versionId: selectedVersion.id,
        },
      });
    }
  };

  if (!versions || versions.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No previous versions available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Version History</h3>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {versions.map((version) => (
          <div
            key={version.id}
            className={`p-3 border rounded cursor-pointer ${
              selectedVersion?.id === version.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedVersion(version)}
          >
            <div className="text-sm text-gray-600">
              {new Date(version.createdAt).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1 line-clamp-2">
              {version.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
            </div>
          </div>
        ))}
      </div>

      {selectedVersion && (
        <div className="flex justify-end">
          <button
            onClick={handleRestore}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Restore This Version
          </button>
        </div>
      )}
    </div>
  );
} 