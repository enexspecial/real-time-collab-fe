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