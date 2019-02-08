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
        country:"",
        student_id:"",
        gender:"",
        dob:"",
        education:[],
        work:[],
        scores:[],
        nationality:"",
        Others:[],
        Settings:{
            language:"",
            privacy:{
                profile:"",
                mail:"",
                contact:"",
                activity:""
            }
        }
    }
    preference={
        country:[],
        course:[],
        area_of_study:"",
        specialization:"",
        duration:"",
        university_type:"",
        funding:""
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
    static async getStudent(_id){
            return apolloClient
            .query({
                query: QUERIES.GET_STUDENT,
                variables: {
                   _id:_id
                  }
            })
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