import { gql } from '@apollo/client';

export const CREATE_NOTE = gql`
  mutation CreateNote($title: String!, $content: String!) {
    createNote(data: { title: $title, content: $content }) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: String!, $title: String, $content: String) {
    updateNote(id: $id, data: { title: $title, content: $content }) {
      id
      title
      content
      updatedAt
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id)
  }
`;

export const SHARE_NOTE = gql`
  mutation ShareNote($noteId: String!, $userId: String!, $accessLevel: AccessLevel!) {
    shareNote(noteId: $noteId, userId: $userId, accessLevel: $accessLevel) {
      id
      sharedWith {
        id
        email
        accessLevel
      }
    }
  }
`;

export const RESTORE_VERSION = gql`
  mutation RestoreVersion($noteId: String!, $versionId: String!) {
    restoreVersion(noteId: $noteId, versionId: $versionId) {
      id
      content
      updatedAt
    }
  }
`; 