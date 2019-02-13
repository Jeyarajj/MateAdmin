import gql from 'graphql-tag';

export const QUERIES = {
  GET_COURSES: gql `
     query getCoursesList($limit: Number, $skip: Number) {
      getCoursesList(limit: $limit, skip: $skip) {
        courses{
      _id
      active
      _details{
        name
        degree
        courseLevel
        description
        website
        courseDuration
      }
    }
    total
    current
    total_pages
       }
     }`,
  CREATE_COURSE: gql `
  mutation createCourse(
  $_details: CourseFields
  ) {
    createCourse(
    _details:$_details
    ) {
      _id
    }
  }`,
  UPDATE_COURSE:  gql `
  mutation updateCourse(
  $_id: ObjectID
  $_details: CourseFields
  ) {
    updateCourse(
    _id:$_id
    _details:$_details
    ) {
      _id
    }
  }`,
  limit: 10
};
