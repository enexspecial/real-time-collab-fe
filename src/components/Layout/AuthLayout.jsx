import React from 'react';

export default function AuthLayout({ children, title = 'Real-Time Collab' }) {
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left: Form */}
      <div className="flex w-full md:w-1/2 h-1/2 md:h-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {children}
      </div>
      {/* Right: Animated Title */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gray-900 dark:bg-gray-950 relative overflow-hidden">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight animate-title-slide-in text-center">
          <span className="inline-block animate-gradient-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        <style>{`
          @keyframes title-slide-in {
            from { opacity: 0; transform: translateY(40px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-title-slide-in {
            animation: title-slide-in 1s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes gradient-text {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-text {
            background-size: 200% 200%;
            animation: gradient-text 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
} 