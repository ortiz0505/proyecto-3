import { gql } from '@apollo/client';

const CREATE_COMMENT = gql`
  mutation CreateComment($data: CommentCreateInput!) {
    createComment(data: $data) {
      id
    }
  }
`;

export { CREATE_COMMENT };
