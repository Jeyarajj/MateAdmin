import gql from 'graphql-tag';

export const GET_USERS = gql`
  query Profile($search: Text, $limit: Int) {
    public_profiles(search: $search, limit: $limit) {
      _id
      id
      name {
        first
        last
        middle
      }
      email
      username
      phone
      nationality
      languages {
        name
      }
      address {
        street
        city
        zip
        country
      }
      # custom_claims{
      #     role
      # }
    }
  }
`;

export const GET_PUBLIC_PROFILE_Q = gql`
  query publicProfile($userId: ObjectID!) {
    profile(_id: $userId) {
      _id
      photo
      email
      name {
        first
        last
      }
      languages {
        name
      }
      nationality
      address {
        city
        country
      }
    }
  }
`;

export const GET_ROLES = gql`
  query Roles($Id: ObjectID!) {
    getAllRoles(user_id: $Id) {
      _id
      role_name
      created_by
      role_permission {
        create
        update
        delete
      }
    }
  }
`;

export const CREATEUSER = gql`
  mutation createuser($email: String!, $password: String!, $role_id: ObjectID) {
    createUser(email: $email, password: $password, role_id: $role_id) {
      _id
      email
    }
  }
`;

export const UPDATEUSER = gql`
  mutation UserProfileUpdate(
    $token: ID
    $userid: String
    $updates: UserProfileUpdates!
  ) {
    user(token: $token, user_id: $userid) {
      profile {
        update(updates: $updates) {
          _id
        }
      }
    }
  }
`;
export const CREATEROLE = gql`
  mutation rolecreation(
    $role_id: ObjectID
    $role_name: String!
    $role_description: String
    $created_by: ObjectID
    $rolepermission: [Permission]
  ) {
    roleCreation(
      role_id: $role_id
      role_name: $role_name
      role_description: $role_description
      created_by: $created_by
      rolepermission: $rolepermission
    ) {
      _id
      role_name
    }
  }
`;
