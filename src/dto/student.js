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
    constructor(student) {
        if(student)
        if (student._id)
            Object.assign(this, student)
    }
    console(){
        console.log('asdf')
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