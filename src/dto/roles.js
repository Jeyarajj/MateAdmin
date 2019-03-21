import { apolloClient } from '../apollo-controller/index';
import {
  GET_ROLES,
  CREATE_ROLE,
  UPDATE_ROLE,
  GET_PROFILE
} from '../gql-constants/users';
import { Users } from './users';

export const modules = [
  {
    module_name: 'Student'
    // label: 'Student'
  },
  {
    module_name: 'University'
    // label: 'University'
  },
  {
    module_name: 'Counselor'
    // label: 'Role Permission'
  },
  {
    module_name: 'Roles'
    // label: 'Role Permission'
  }
];
export class Role {
  _id = '';
  role_name = '';
  role_description = '';
  created_by = '';
  role_permission = [];
  username = '';
  constructor(role) {
    if (role) {
      if (role._id) Object.assign(this, role);
      if (role.created_by) {
        Users.getProfile(this.created_by).then(data => {
          this.username = data.data.getProfile[0]._profile.name.first;
        });
        // return (async () => {
        // All async code here
        //   return this; // when done
        // })();
        // this.username = this.getProfile();
      }
    }
  }

  static async getRoles() {
    return apolloClient.query({
      query: GET_ROLES,
      fetchPolicy: 'network-only',
      variables: {
        limit: '10',
        skip: '0'
      }
    });
  }

  updateStatus() {
    // var mutationQuery;
    // if (!this.active) {
    //     mutationQuery = QUERIES.BLOCK_STUDENT
    // } else {
    //     mutationQuery = QUERIES.UNBLOCK_STUDENT
    // }
    // apolloClient
    //     .mutate({
    //         mutation: mutationQuery,
    //         variables: {
    //             _id: this._id
    //         }
    //     })
    //     .then(result => {
    //         console.log(result)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
  }
  get status() {
    if (this.active) {
      return 'Active';
    } else return 'Blocked';
  }

  toJSON() {
    const roles = [];
    this.role_permission.forEach(ele => {
      const out = AccessPermission.toJSON(ele)
      roles.push(out);
    });
    return {
      _id: this._id,
      role_name: this.role_name,
      role_description: this.role_description,
      role_permission: roles
    };
  }
  async createRole() {
    if (this._id) {
      return apolloClient.mutate({
        mutation: UPDATE_ROLE,
        variables: this.toJSON()
      });
    } else {
      // Users.getProfile(this.created_by).then(data => {
      //   this.username = data.data.getProfile[0]._profile.name.first;
      // });
      const packet = this.toJSON();
      packet.created_by = this.created_by;
      return apolloClient.mutate({
        mutation: CREATE_ROLE,
        variables: packet
      });
    }
  }
}

export class AccessPermission {
  module_name = '';
  // label = ""
  has_access = {
    create: false,
    update: false,
    delete: false,
    view: false,
    publish: false
  };
  static toJSON(param) {
    return {
      module_name: param.module_name,
      has_access: {
        create: param.has_access.create,
        update: param.has_access.update,
        delete: param.has_access.delete,
        view: param.has_access.view,
        publish: param.has_access.publish
      }
    };
  }
  constructor(module) {
    Object.assign(this, module);
  }
}
