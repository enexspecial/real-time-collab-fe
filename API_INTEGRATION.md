# API Integration Documentation

This project has been successfully integrated with the REST API from the Swagger specification at `http://localhost:4000/api`.

## API Services

### Authentication Service (`src/api/authService.js`)
- **register(userData)** - Register a new user
- **login(credentials)** - Login user
- **logout()** - Clear stored auth data
- **storeAuthData(authData)** - Store JWT token and user data
- **getStoredUser()** - Get current user from localStorage
- **isAuthenticated()** - Check if user is logged in

### Notes Service (`src/api/notesService.js`)
- **getNotes()** - Get all notes for authenticated user
- **getNote(noteId)** - Get a specific note by ID
- **createNote(noteData)** - Create a new note
- **updateNote(noteId, noteData)** - Update an existing note
- **deleteNote(noteId)** - Delete a note
- **shareNote(shareData)** - Share a note with another user
- **getNoteVersions(noteId)** - Get version history of a note
- **restoreNoteVersion(noteId, versionId)** - Restore a note to a previous version

## Custom Hooks

### useAuth Hook (`src/hooks/useAuth.js`)
Provides authentication state and functions:
```javascript
const { user, loading, error, login, register, logout, isAuthenticated } = useAuth();
```

### useNotes Hook (`src/hooks/useNotes.js`)
Provides notes state and operations:
```javascript
const { 
  notes, 
  loading, 
  error, 
  fetchNotes, 
  getNote, 
  createNote, 
  updateNote, 
  deleteNote, 
  shareNote, 
  getNoteVersions, 
  restoreNoteVersion 
} = useNotes();
```

## API Configuration

### Base Configuration (`src/api/config.js`)
- Base URL: `http://localhost:4000`
- Automatic JWT token injection in requests
- Automatic 401 error handling (redirects to login)
- Axios interceptors for request/response handling

## Data Types

The API uses the following data structures:

### Authentication
```javascript
// Register
{
  email: string,
  password: string, // min 6 chars
  name: string
}

// Login
{
  email: string,
  password: string
}

// Response
{
  accessToken: string,
  user: {
    id: string,
    email: string,
    name: string
  }
}
```

### Notes
```javascript
// Create/Update Note
{
  title: string,
  content: string,
  isPublic: boolean
}

// Note Response
{
  id: string,
  title: string,
  content: string,
  isPublic: boolean,
  createdAt: string,
  updatedAt: string,
  ownerId: string,
  owner: {
    id: string,
    email: string,
    name: string
  },
  sharedWith: Array
}
```

## Features Implemented

✅ **Authentication**
- User registration with email, password, and name
- User login with email and password
- JWT token management
- Automatic logout on token expiration

✅ **Notes CRUD**
- Create new notes with title, content, and public/private setting
- Read all notes for authenticated user
- Read individual note by ID
- Update note title, content, and public setting
- Delete notes

✅ **Note Sharing**
- Share notes with other users (requires user ID)
- Set edit permissions for shared users
- View shared users list

✅ **Version History**
- View note version history
- Restore notes to previous versions

✅ **Error Handling**
- Comprehensive error handling for all API calls
- User-friendly error messages
- Loading states for better UX

## Usage Examples

### Authentication
```javascript
import { useAuth } from '../hooks/useAuth';

function LoginComponent() {
  const { login, loading, error } = useAuth();
  
  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      // Redirect or update UI
    } catch (err) {
      // Error is handled by the hook
    }
  };
}
```

### Notes Operations
```javascript
import { useNotes } from '../hooks/useNotes';

function NotesComponent() {
  const { notes, createNote, updateNote, deleteNote, loading } = useNotes();
  
  const handleCreateNote = async (noteData) => {
    try {
      const newNote = await createNote(noteData);
      console.log('Note created:', newNote);
    } catch (err) {
      console.error('Failed to create note:', err);
    }
  };
}
```

## Notes

1. **User Sharing**: The current implementation uses email for sharing, but the API expects user IDs. You may need to implement a user search endpoint or modify the API to accept emails.

2. **Real-time Features**: The existing WebSocket/GraphQL subscription functionality is preserved and can be used alongside the REST API.

3. **Error Handling**: All API calls include comprehensive error handling with user-friendly messages.

4. **Loading States**: All operations include loading states for better user experience.

5. **Token Management**: JWT tokens are automatically managed and injected into API requests. 