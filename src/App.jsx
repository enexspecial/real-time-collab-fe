import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotesPage from './pages/NotesPage';
import NoteDetailPage from './pages/NoteDetailPage';
import NotificationToast from './components/Layout/NotificationToast';
import { useNotifications } from './hooks/useNotifications';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const { notifications, clearNotification } = useNotifications();
  return (
    <BrowserRouter>
      <NotificationToast notifications={notifications} onClose={clearNotification} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/notes" element={
          <PrivateRoute>
            <NotesPage />
          </PrivateRoute>
        } />
        <Route path="/notes/:id" element={
          <PrivateRoute>
            <NoteDetailPage />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/notes" />} />
      </Routes>
    </BrowserRouter>
  );
}
