import gql from 'graphql-tag';

export const QUERIES = {
  GET_MENTORS: gql `
     query getMentors($limit: Number, $skip: Number) {
      getMentors(limit: $limit, skip: $skip) {
        mentors{
      _id
      active
      email
      _details{
        name
        phone
        photo
        address{
          city
          country
        }
      }
    }
    total
    current
    total_pages
       }
     }`,
  CREATE_MENTOR: gql `
  mutation createMentor(
    $email: String!
    $password: String!
    $_details: MentorDataInput
  ) {
    createMentor(
      email:$email
      password:$password
      _details:$_details
    ) {
      _id
    }
  }`,
  UPDATE_MENTOR:  gql `
  mutation updateMentor(
  $_id: ObjectID!
  $_details: MentorDataInput
  ) {
    updateMentor(
    _id:$_id
    _details:$_details
    ) {
      _id
    }
  }`,
  limit: 10
};
