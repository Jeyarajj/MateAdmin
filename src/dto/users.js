import {
    apolloClient
} from '../apollo-controller/index';
import {
    GET_USERS_DATA,
    CREATEUSER,
    UPDATE_USER
} from '../gql-constants/users'

export class Users {
    users = {
        email: "",
        _role: ""
    }
    _id = ""
    dataset = {
        email: "",
        name: {
            first: "",
            last: "",
            middle: ""
        },
        languages: [{
            name: ""
        }],
        username: "",
        nationality: "",
        dob: "",
        phone: "",
        address: {
            street: "",
            zip: "",
            city: "",
            country: ""
        },
        created_by: "5c541361f5ba0f315db125d7"
    }
    constructor(user) {
        if (user) {
            if (user._id)
                Object.assign(this, user)
        }
    }

    static async getUsers() {
        return apolloClient
            .query({
                query: GET_USERS_DATA,
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

    toJSON() {
        // return {
        //     _id:this._id,
        //     role_name:this.role_name,
        //     role_description:this.role_description,
        //     role_permission:role_permission
        // }
    }
    async createUser() {
        console.log('create user')
        console.log(this.users);
        if (this.users._role) {
            return apolloClient
                .mutate({
                    mutation: CREATEUSER,
                    variables: this.users
                })
        } else {
            delete this.dataset['created_by'];
            delete this.dataset['email'];
            delete this.dataset['username'];
            console.log(this.dataset)
            return apolloClient
                .mutate({
                    mutation: UPDATE_USER,
                    variables: {
                        _id: "5c5850688eea700efe9420d5",
                        dataset : this.dataset
                    }
                })
        }
    }

}