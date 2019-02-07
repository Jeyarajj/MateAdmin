import gql from 'graphql-tag';
export const QUERIES = {
    GET_STUDENTS: gql `
    query students($limit: Number,$skip:Number) {
      students(limit: $limit, skip: $skip ) { 
          _id 
          email
          active
          profile {
            name
            city
            country
            student_id
            gender
            dob
            education{
              degree
              institution
              start_date
              end_date
            }
            work{
              position
              company
              address
              start_date
              end_date
            }
            scores{
              title
              score
            }
            nationality
            Others{
              other_key
              value
            }
            Settings{
              language
              privacy{
                profile
                mail
                contact
                activity
              }
            }
            }
          }
    }
  `,
    GET_STUDENT: gql `
      query studentInfo($_id:ObjectID) {
        studentInfo(_id:$_id ) { 
          _id 
          email
          active
          profile {
            name
            city
            country
            student_id
            gender
            dob
            education{
              degree
              institution
              start_date
              end_date
            }
            work{
              position
              company
              address
              start_date
              end_date
            }
            scores{
              title
              score
            }
            nationality
            Others{
              other_key
              value
            }
            Settings{
              language
              privacy{
                profile
                mail
                contact
                activity
              }
            }
            }
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