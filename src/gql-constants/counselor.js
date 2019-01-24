import gql from 'graphql-tag';

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
