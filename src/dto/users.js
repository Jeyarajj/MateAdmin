import { apolloClient } from '../apollo-controller/index';
import {
  GET_USERS_DATA,
  CREATEUSER,
  UPDATE_USER,
  GET_PROFILE
} from '../gql-constants/users';

export class Users {
  email = '';
  _role = '';
  _id = '';
  data = {
    password: ''
  };
  created_by = '';
  _profile = {
    email: '',
    name: {
      first: '',
      last: '',
      middle: ''
    },
    languages: [
      {
        name: ''
      }
    ],
    username: '',
    nationality: '',
    dob: '',
    phone: '',
    photo: '',
    address: {
      street: '',
      zip: '',
      city: '',
      country: ''
    }
  };
  constructor(user) {
    if (user) {
      if (user._id) {
        if (!user._profile) delete user._profile;
        Object.assign(this, user);
      }
    }
  }
  static getProfile(id) {
    return apolloClient.query({
      query: GET_PROFILE,
      variables: {
        _id: id
      },
      fetchPolicy: 'network-only'
    });
  }
  static async getUsers(limit,skip) {
    return apolloClient.query({
      query: GET_USERS_DATA,
      fetchPolicy: 'network-only',
      variables: {
        limit: limit,
        skip: skip
      }
    });
  }
  get status() {
    if (this.active) {
      return 'Active';
    } else return 'Blocked';
  }

  toJSON(type) {
    switch (type) {
      case 'update':
        return {
          name: {
            first: this._profile.name.first
          },
          dob: this._profile.dob,
          phone: this._profile.phone,
          photo: this._profile.photo,
          address: {
            city: this._profile.address.city,
            country: this._profile.address.country
          }
        };
      case 'create':
        return {
          email: this.email,
          _role: this._role,
          password: this.data.password,
          created_by: this.created_by
        };
      case 'default':
        console.log('default');
        break;
    }
  }
  async createUser() {
    if (!this._id) {
      return apolloClient.mutate({
        mutation: CREATEUSER,
        variables: this.toJSON('create')
      });
    } else {
      return apolloClient.mutate({
        mutation: UPDATE_USER,
        variables: {
          _id: this._id,
          _profile: this.toJSON('update')
        }
      });
    }
  }
}
