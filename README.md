# Real-time Collaborative Notes App - Frontend

A modern React application for real-time collaborative note-taking with features like live editing, sharing, and version history.

## 🚀 Features

- **🔐 User Authentication** - Sign up and login with JWT tokens
- **📝 Rich Text Editor** - Powered by TipTap for formatting and live editing
- **🤝 Real-time Collaboration** - Multiple users can edit simultaneously
- **📤 Note Sharing** - Share notes with other users with view/edit permissions
- **📚 Version History** - Track and restore previous versions of notes
- **🎨 Modern UI** - Clean, responsive design with TailwindCSS
- **⚡ Real-time Updates** - WebSocket-powered live synchronization

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Apollo Client** - GraphQL client with WebSocket subscriptions
- **TipTap** - Rich text editor
- **TailwindCSS v3** - Utility-first CSS framework
- **React Router** - Client-side routing
- **GraphQL WS** - Modern WebSocket client for GraphQL subscriptions

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-time-collab-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_GRAPHQL_HTTP=http://localhost:4000/graphql
   VITE_GRAPHQL_WS=ws://localhost:4000/graphql
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── apollo/
│   └── client.js              # Apollo Client configuration
├── components/
│   ├── Auth/
│   │   ├── Login.jsx          # Login form component
│   │   └── Signup.jsx         # Signup form component
│   ├── Layout/
│   │   └── Navbar.jsx         # Navigation bar
│   └── Notes/
│       ├── NoteEditor.jsx     # Rich text editor
│       ├── NoteList.jsx       # Notes list display
│       ├── ShareDialog.jsx    # Share note dialog
│       └── VersionHistory.jsx # Version history component
├── graphql/
│   ├── queries.js             # GraphQL queries
│   ├── mutations.js           # GraphQL mutations
│   └── subscriptions.js       # GraphQL subscriptions
├── hooks/
│   ├── useAuth.js             # Authentication hook
│   └── useNoteSubscription.js # Real-time subscription hook
├── pages/
│   ├── LoginPage.jsx          # Login page
│   ├── SignupPage.jsx         # Signup page
│   ├── NotesPage.jsx          # Notes list page
│   └── NoteDetailPage.jsx     # Note editor page
├── utils/
│   └── auth.js                # Authentication utilities
├── App.jsx                    # Main app component
└── main.jsx                   # App entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔗 Backend Integration

This frontend is designed to work with a NestJS backend that provides:

- GraphQL API with queries, mutations, and subscriptions
- JWT-based authentication
- PostgreSQL database with Prisma ORM
- Redis for pub/sub events
- WebSocket support for real-time features

## 🎯 Key Features Explained

### Real-time Collaboration
- Uses GraphQL subscriptions over WebSocket
- Shows typing indicators for active users
- Instantly syncs changes across all connected clients

### Rich Text Editor
- Powered by TipTap with basic formatting
- Auto-saves changes
- Supports collaborative editing

### Authentication
- JWT token-based authentication
- Protected routes
- Automatic token management

### Sharing & Permissions
- Share notes with specific users
- Set view-only or edit permissions
- Track shared access

### Version History
- Automatic version tracking
- View previous versions
- Restore to any previous version

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

3. **Update environment variables** for production endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the repository or contact the development team.
