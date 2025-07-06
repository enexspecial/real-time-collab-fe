import { gql } from '@apollo/client';

export const GET_MY_NOTES = gql`
  query GetMyNotes {
    myNotes {
      id
      title
      content
      createdAt
      updatedAt
      isShared
      sharedWith {
        id
        email
        accessLevel
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
        email
        accessLevel
      }
      versions {
        id
        content
        createdAt
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