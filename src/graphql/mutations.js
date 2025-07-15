import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      user {
        id
        email
        name
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(data: { email: $email, password: $password, name: $name }) {
      accessToken
      user {
        id
        email
        name
      }
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation CreateNote($title: String!, $content: String!, $isPublic: Boolean) {
    createNote(input: { title: $title, content: $content, isPublic: $isPublic }) {
      id
      title
      content
      isPublic
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: String!, $title: String, $content: String, $isPublic: Boolean) {
    updateNote(id: $id, input: { title: $title, content: $content, isPublic: $isPublic }) {
      id
      title
      content
      isPublic
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