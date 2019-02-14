import gql from "graphql-tag";

export const QUERIES = {
  CREATE: gql`
    mutation createCounselor(
      $email: String
      $password: String
      $_details: CounselorDetailsInput
    ) {
      createCounselor(email: $email, password: $password, _details: $_details) {
        _id
      }
    }
  `,
  UPDATE: gql`
    mutation updateCounselor($_id: ObjectID, $_details: CounselorDetailsInput) {
      updateCounselor(_id: $_id, _details: $_details) {
        _id
      }
    }
  `,
  BLOCK: ``,
  UNBLOCK: ``,
  GETLIST: gql`
    query getCounselors($limit: Number, $skip: Number) {
      getCounselors(limit: $limit, skip: $skip) {
        total
        total_pages
        current
        counselor {
          _id
          email
          _details {
            name
            slug
            description
            address {
              city
              country
              addr
            }
            website
          }
          active
        }
      }
    }
  `,
  GET: ``
};

export const UPDATE_COUNSELOR = gql`
  mutation updatecounselor(
    $_id: ObjectID
    $name: String
    $phone: String
    $email: String
    $image: String
    $country: String
    $city: String
    $created_by: ObjectID
  ) {
    createcounselor(
      _id: $_id
      name: $name
      phone: $phone
      email: $email
      image: $image
      country: $country
      city: $city
      created_by: $created_by
    ) {
      _id
      name
    }
  }
`;

export const GET_COUNSELOR = gql`
  query {
    getCounselor {
      _id
      name
      email
      phone
      image
      country
      city
      created_by
    }
  }
`;
