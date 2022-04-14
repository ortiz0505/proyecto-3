import { gql } from '@apollo/client';

const UPSERT_PROFILE = gql`
  mutation Mutation(
    $where: ProfileFilterId!
    $create: ProfileCreateInput
    $update: ProfileUpdateInput
  ) {
    upsertProfile(where: $where, create: $create, update: $update) {
      id
    }
  }
`;

export { UPSERT_PROFILE };
