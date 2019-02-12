
   import {
        apolloClient
    } from '../apollo-controller/index';
    import {
        QUERIES
    } from '../gql-constants/courses'
    export class Course {
        _id = ""
        _details={
            name:"",
            courseLevel:"",
            courseDuration:"",
            degree:"",
            courseFee:"",
            website:"",
            description:"",
            mode:"",
            courseMode:"",
            university_id:"",
            startDate:"",
            endDate:"",
            duration:""
        }
        created_by = "5c541361f5ba0f315db125d7"
        updated_by = "5c541361f5ba0f315db125d7"
        active = true;
        constructor(course) {
            if (course) {
                if (course._id) {
                    if (!course._details)
                        delete course._details
                    Object.assign(this, course)
                }
            }
        }
        static async getCourse(_id) {
            return apolloClient
                .query({
                    query: QUERIES.GET_COURSE,
                    variables: {
                        _id: _id
                    }
                })
        }
    
        static async getCourses() {
            return apolloClient
                .query({
                    query: QUERIES.GET_COURSES,
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
                mutationQuery = QUERIES.BLOCK_COURSE
            } else {
                mutationQuery = QUERIES.UNBLOCK_COURSE
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
        async createCourse() {
            if (!this._id) {
                return apolloClient
                    .mutate({
                        mutation: QUERIES.CREATE_COURSE,
                        variables: this.toJSON('create')
                    })
            } else {
                return apolloClient
                    .mutate({
                        mutation: QUERIES.UPDATE_COURSE,
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