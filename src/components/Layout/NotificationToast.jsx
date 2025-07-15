import React from 'react';

export default function NotificationToast({ notifications, onClose }) {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end space-y-3 w-full max-w-xs pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="pointer-events-auto flex items-center w-full bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-700 shadow-xl rounded-lg px-5 py-4 transition-transform transform-gpu animate-slide-in"
          style={{ minWidth: '260px', maxWidth: '100%' }}
        >
          <div className="flex-1 text-sm text-gray-900 dark:text-gray-100 font-medium">
            {n.message}
          </div>
          <button
            onClick={() => onClose(n.id)}
            className="ml-4 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xl font-bold focus:outline-none"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(-20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
} 