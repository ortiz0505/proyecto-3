import { gql } from '@apollo/client';

const GET_PENDING_DOCUMENT = gql`
  query GetPendingDocument {
    getPendingDocument {
      id
      name
      url
      createdAt
      createdBy {
        id
        name
      }
      typeDocument {
        id
        name
        template
      }
    }
  }
`;

const GET_REJECTED_DOCUMENT = gql`
  query Query($where: DocumentFilterId!) {
    getRejectedDocument(where: $where) {
      id
      name
      url
      status
      comment {
        id
        comment
        response {
          response
        }
      }
    }
  }
`;

const GET_REJECTED_DOCUMENTS = gql`
  query Query {
    getRejectedDocuments {
      id
      name
      url
      status
      createdBy {
        name
      }
    }
  }
`;

export { GET_PENDING_DOCUMENT, GET_REJECTED_DOCUMENT, GET_REJECTED_DOCUMENTS };
