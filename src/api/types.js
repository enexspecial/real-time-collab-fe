// API Types based on Swagger specification

// Authentication Types
export const AuthTypes = {
  // Request DTOs
  RegisterDto: {
    email: 'string',
    password: 'string',
    name: 'string'
  },
  
  LoginDto: {
    email: 'string',
    password: 'string'
  },
  
  // Response DTOs
  AuthResponseDto: {
    accessToken: 'string',
    user: {
      id: 'string',
      email: 'string',
      name: 'string'
    }
  }
};

// Notes Types
export const NoteTypes = {
  // Request DTOs
  CreateNoteDto: {
    title: 'string',
    content: 'string',
    isPublic: 'boolean'
  },
  
  UpdateNoteDto: {
    title: 'string',
    content: 'string',
    isPublic: 'boolean'
  },
  
  ShareNoteDto: {
    noteId: 'string',
    userId: 'string',
    canEdit: 'boolean'
  },
  
  // Response DTOs
  NoteResponseDto: {
    id: 'string',
    title: 'string',
    content: 'string',
    isPublic: 'boolean',
    createdAt: 'string',
    updatedAt: 'string',
    ownerId: 'string',
    owner: {
      id: 'string',
      email: 'string',
      name: 'string'
    },
    sharedWith: 'array'
  }
};

// User Types
export const UserTypes = {
  User: {
    id: 'string',
    email: 'string',
    name: 'string'
  },
  
  SharedUser: {
    id: 'string',
    canEdit: 'boolean',
    user: {
      id: 'string',
      email: 'string',
      name: 'string'
    }
  }
};

// Version Types
export const VersionTypes = {
  NoteVersion: {
    id: 'string',
    noteId: 'string',
    content: 'string',
    createdAt: 'string',
    createdBy: 'string'
  }
}; 