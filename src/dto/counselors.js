import {
    apolloClient
} from '../apollo-controller/index';
import {
    QUERIES
} from '../gql-constants/counselor'
export class Counselor {
    _id = ""
    email = ""
    data = {
        password: ""
    }
    _details = {
        name: "",
        phone: "",
        Address: {
            city: "",
            country: "",
            zip: ""
        },
        photo: ""
    }
    active = true;
    constructor(counselor) {
        if (counselor) {
            if (counselor._id) {
                if (!counselor._details)
                    delete counselor._details
                Object.assign(this, counselor)
            }
        }
    }
    static async getCounselor(_id) {
        return apolloClient
            .query({
                query: QUERIES.GET_COUNSELOR,
                variables: {
                    _id: _id
                }
            })
    }

    static async getCounselors() {
        return apolloClient
            .query({
                query: QUERIES.GET_COUNSELORS,
                variables: {
                    limit: "10",
                    skip: "0"
                }
            })
    }
    get status() {
        if (this.active) {
            return "Active"
        } else
            return "Blocked"
    }

    getURL() {

    }
    updateStatus() {
        var mutationQuery;
        if (!this.active) {
            mutationQuery = QUERIES.BLOCK_COUNSELOR
        } else {
            mutationQuery = QUERIES.UNBLOCK_COUNSELOR
        }
        apolloClient
            .mutate({
                mutation: mutationQuery,
                variables: {
                    _id: this._id
                }
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err);
            });
    }

    async createCounselor() {
        if (!this._id) {
            return apolloClient
                .mutate({
                    mutation: QUERIES.CREATE_COUNSELOR,
                    variables: this.toJSON('create')
                })
        } else {
            return apolloClient
                .mutate({
                    mutation: QUERIES.UPDATE_COUNSELOR,
                    variables: {
                        _id: this._id,
                        _profile: this.toJSON('update')
                    }
                })
        }
    }

    toJSON(type) {

        switch (type) {
            case "update":
                return {

                }
            case "create":
                return {
                    email: this.email,
                    password: this.data.password
                }
            case "default":
                console.log('default')
                break;
        }
    }
}