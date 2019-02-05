import gql from 'graphql-tag';
export const QUERIES = {
    GET_STUDENTS: gql `
    query students($limit: Number,$skip:Number) {
      students(limit: $limit, skip: $skip ) { 
          _id 
          email
          active
          }
    }
  `,
    GET_APPLICATIONS: gql `
query getApplications($limit: Number,$skip:Number) {
  getApplications(limit: $limit, skip: $skip ) { 
    student_id
    course_id
    message }
}
`,
BLOCK_STUDENT : gql `
  mutation blockStudent($_id: ObjectID!) {
    blockStudent(_id:$_id) {
     status
    }
  }
`,
UNBLOCK_STUDENT : gql `
  mutation unblockStudent($_id: ObjectID!) {
    unblockStudent(_id:$_id) {
      status
    }
  }
`
}