import {
    apolloClient
} from '../apollo-controller/index';
import {
    QUERIES
} from '../gql-constants/university'
export class University {
    _id = ""
    email = ""
    data = {
        password: ""
    }
    _details = {
        name: "",
        slug: "",
        website: "",
        institutionType: "",
        country: "",
        city: "",
        Address: {
            city: "",
            country: "",
            zip: ""
        },
        description: "",
        logo: "",
        banners: "",
        photos: ""
    }
    created_by = "5c541361f5ba0f315db125d7"
    updated_by = "5c541361f5ba0f315db125d7"
    active = true;
    constructor(university) {
        if (university) {
            if (university._id) {
                if (!university._details)
                    delete university._details
                Object.assign(this, university)
            }
        }
    }
    static async getUniversity(_id) {
        return apolloClient
            .query({
                query: QUERIES.GET_UNIVERSITY,
                variables: {
                    _id: _id
                }
            })
    }

    static async getUniversities() {
        return apolloClient
            .query({
                query: QUERIES.GET_UNIVERSITIES,
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
            mutationQuery = QUERIES.BLOCK_UNIVERSITY
        } else {
            mutationQuery = QUERIES.UNBLOCK_UNIVERSITY
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
    async createUniversity() {
        if (!this._id) {
            return apolloClient
                .mutate({
                    mutation: QUERIES.CREATE_UNIVERSITY,
                    variables: this.toJSON('create')
                })
        } else {
            return apolloClient
                .mutate({
                    mutation: QUERIES.UPDATE_UNIVERSITY,
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