import {
    apolloClient
} from '../apollo-controller/index';
import {
    QUERIES
} from '../gql-constants/mentors'
export class Mentor {
    _id = ""
    email = ""
    data = {
        password: ""
    }
    _details = {
        name: "",
        fieldOfStudy: "",
        universityName: "",
        Address: {
            city: "",
            country: "",
            zip: ""
        },
        coursePeriod:"",
        aboutMyself: "",
        photo: ""
    }
    active = true;
    constructor(mentor) {
        if (mentor) {
            if (mentor._id) {
                if (!mentor._details)
                    delete mentor._details
                Object.assign(this, mentor)
            }
        }
    }
    static async getMentor(_id) {
        return apolloClient
            .query({
                query: QUERIES.GET_MENTOR,
                variables: {
                    _id: _id
                }
            })
    }

    static async getMentors() {
        return apolloClient
            .query({
                query: QUERIES.GET_MENTORS,
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
            mutationQuery = QUERIES.BLOCK_MENTOR
        } else {
            mutationQuery = QUERIES.UNBLOCK_MENTOR
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

    // toJSON(type) {

    //     switch (type) {
    //         case "update":
    //             return {

    //             }
    //         case "create":
    //             return {
    //                 email: this.email,
    //                 password: this.data.password
    //             }
    //         case "default":
    //             console.log('default')
    //             break;
    //     }
    // }
}