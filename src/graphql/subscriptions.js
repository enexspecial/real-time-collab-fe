import { gql } from '@apollo/client';

export const NOTE_UPDATED = gql`
  subscription NoteUpdated($noteId: String!) {
    noteUpdated(noteId: $noteId) {
      id
      title
      content
      updatedAt
    }
  }
`;

export const USER_TYPING = gql`
  subscription UserTyping($noteId: String!) {
    userTyping(noteId: $noteId) {
      userId
      email
      isTyping
    }
  }
`;

export const NOTE_CREATED = gql`
  subscription NoteCreated {
    noteCreated {
      id
      title
      createdAt
      owner {
        id
        email
        name
      }
    }
  }
`;

export const NOTE_SHARED = gql`
  subscription NoteShared {
    noteShared {
      id
      title
      sharedWith {
        id
        email
        accessLevel
      }
    }
  }
`; 