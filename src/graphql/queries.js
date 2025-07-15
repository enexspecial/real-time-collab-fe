import { gql } from '@apollo/client';

export const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      title
      content
      createdAt
      updatedAt
      isShared
      sharedWith {
        id
        accessLevel
        user {
          email
        }
      }
    }
  }
`;

export const GET_NOTE = gql`
  query GetNote($id: String!) {
    note(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
      isShared
      sharedWith {
        id
        accessLevel
        user {
          email
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
    }
  }
`; 