import {
    apolloClient
} from '../apollo-controller/index';
import {
    GET_ROLES,CREATE_ROLE,UPDATE_ROLE
} from '../gql-constants/users'
export const modules = [{
        module_name: 'Student',
        // label: 'Student'
    },
    {
        module_name: 'University',
        // label: 'University'
    },
    {
        module_name: 'Counselor',
        // label: 'Role Permission'
    },
    {
        module_name: 'Roles',
        // label: 'Role Permission'
    }
]
export class Role {
    _id = ""
    role_name = ""
    role_description = ""
    created_by = "5c541361f5ba0f315db125d7"
    role_permission = []
    constructor(role) {
        if (role) {
            if (role._id)
                Object.assign(this, role)
        }
    }

    static async getRoles(){
        return apolloClient
        .query({
            query: GET_ROLES,
            variables: {
                limit: "10",
                skip: "0"
              }
        })
    }
    updateStatus() {
        console.log('ssss');
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
            return "Active"
        } else
            return "Blocked"
    }

    toJSON(){
        const roles=[]
        this.role_permission.forEach(ele=>{
            const out=ele.toJSON()
            roles.push(out)
        })
        return {
            _id:this._id,
            role_name:this.role_name,
            role_description:this.role_description,
            role_permission:roles
        }
    }
    async createRole() {
            if (this._id) {
                return apolloClient
                .mutate({
                    mutation: UPDATE_ROLE,
                    variables: this.toJSON()
                })
            } else {
                const packet=this.toJSON()
                packet.created_by=this.created_by
               return apolloClient
                    .mutate({
                        mutation: CREATE_ROLE,
                        variables: this.toJSON()
                    })
            }
    }

}
export class AccessPermission {
    module_name = ""
    // label = ""
    has_access = {
        create: false,
        update: false,
        delete: false,
        view: false,
        publish: false
    }
    toJSON(){
        return {
            module_name:this.module_name,
            has_access:{
                create: this.has_access.create,
                update: this.has_access.update,
                delete: this.has_access.delete,
                view: this.has_access.view,
                publish: this.has_access.publish
            }
        }
    }
    constructor(module) {
        Object.assign(this, module)
    }
}