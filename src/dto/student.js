import {
    apolloClient
} from '../apollo-controller/index';
import {
    QUERIES
} from '../gql-constants/students'
export class Student {
    _id = ""
    active = true;
    email = ""
    profile={
        name:"",
        city:"",
        country:""
    }
    preference={
        profile:"",
        email:""
    }
    constructor(student) {
        if(student)
        if (student._id){
            if(!student.profile)
            delete student.profile
            if(!student.preference)
            delete student.preference
            Object.assign(this, student)
        }
    }
    updateStatus() {
        var mutationQuery;
        if (!this.active) {
            mutationQuery = QUERIES.BLOCK_STUDENT
        } else {
            mutationQuery = QUERIES.UNBLOCK_STUDENT
        }
        apolloClient
        .mutate({
            mutation: mutationQuery,
            variables: {_id:this._id}
          })
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err);
            });
    }
    get status() {
        if (this.active) {
            return "Active"
        } else
            return "Blocked"
    }
    createStudent(){

    }

}