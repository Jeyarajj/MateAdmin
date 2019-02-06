import gql from 'graphql-tag';

export const GET_USERS = gql `
  query Profile($search: Text, $limit: Int) {
    public_profiles(search: $search, limit: $limit) {
      _id
      id
      name {
        first
        last
        middle
      }
      dob
      email
      username
      phone
      photo
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

export const GET_PUBLIC_PROFILE_Q = gql `
  query publicProfile($Id: ObjectID!) {
    profile(_id: $Id) {
      _id
      photo
      email

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

export const GET_USERS_DATA = gql `
  query publicProfile($skip: Number, $limit: Number) {
    getUsers(limit:$limit
 skip:$skip
 ){
   _id
   email
    _profile{
      name{
        first
      }
      phone
      photo
      address{
        city
        country
      }
      dob
    }
 }
  }
`;

export const GET_ROLES = gql `
  query Roles($limit: Number,$skip:Number) {
    getRoles(limit: $limit,skip:$skip) {
      _id
      role_name
      role_description
      created_by
      role_permission {
        module_name
        has_access{
        create
        update
        delete
        view
        publish
        }
      }
    }
  }
`;

export const CREATEUSER = gql `
  mutation createAdminUser($email: String!, $password: String!, $_role: ObjectID) {
    createAdminUser(email: $email, password: $password, _role: $_role) {
      _id
    }
  }
`;

export const UPDATE_USER = gql `
  mutation updateProfile(
    $_id: ObjectID!
    $_profile: AdminProfileInput
  ) {
    updateProfile(_id: $_id, _profile: $_profile) {
      status
    }
  }
`;

export const UPDATEUSER = gql `
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

export const
  CREATE_ROLE = gql `
  mutation rolecreation(
    $role_name: String!
    $role_description: String!
    $created_by: ObjectID
    $role_permission: [AccessPermissionInput]
  ) {
    createAdminUserRole(
      role_name: $role_name
      role_description: $role_description
      created_by: $created_by
      role_permission: $role_permission
    ) {
      _id
    }
  }
 `;

export const UPDATE_ROLE = gql `
 mutation updateRole(
  $_id: ObjectID!
  $role_name:String!
  $role_description: String!
  $role_permission: [AccessPermissionInput]
 ) {
  updateAdminUserRole(
    _id:$_id
    role_name: $role_name
    role_description: $role_description
    role_permission: $role_permission
  ) {
    _id
  }
 }
 `;

export const CREATEROLE = gql `
  mutation rolecreation(
    $role_name: String!
    $role_description: String!
    $created_by: ObjectID
    $rolepermission: [AccessPermissionInput]
  ) {
    createAdminUserRole(
      role_name: $role_name
      role_description: $role_description
      created_by: $created_by
      role_permission: $rolepermission
    ) {
      _id
    }
  }
`;