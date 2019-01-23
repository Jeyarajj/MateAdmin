import gql from 'graphql-tag';

export const GET_COURSES_INDEX = gql`
  query coursesResult($text: Text, $page: PageOption) {
    search(text: $text, page: $page) {
      course {
        items {
          ...course_search_result
        }
        page {
          from
        }
        pages {
          current
          total
        }
      }
    }
  }
  fragment course_search_result on Course {
    _id
    name
    startdate
    enddate
    course_level
    course_duration
    website
    mode
    course_mode
    course_fee
    status
    university_id
    description
    degree
    study {
      qualification
    }
    university {
      _id
      name
      rank
    }
  }
`;

export const GET_COURSE_DETAILS = gql`
  query courseResult($course_id: ObjectID) {
    course(_id: $course_id) {
      university {
        _id
        city_id
        country_id
      }
      scholarships {
        id
      }
      dates {
        date
        description
        name
        location
        time
        timestamp
        type
      }
      ranks {
        name
      }
      study {
        admission_gpa
        duration
        mode
        qualification
        online
      }
      tuition {
        description
        name
        price
        type
        value
      }
      name
      image
      postal_address
      website
      comments
      description
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourse(
    $id: ObjectID
    $name: Text
    $mode: Text
    $duration: Text
    $website: Text
    $startdate: Date
    $enddate: Date
    $course_level: Text
    $description: Text
    $university_id: ObjectID
    $course_mode: Text
    $status: Text
    $course_fee: Text
    $course_duration: Text
    $degree: Text
  ) {
    updateCourse(
      _id: $id
      name: $name
      mode: $mode
      duration: $duration
      website: $website
      startdate: $startdate
      enddate: $enddate
      course_level: $course_level
      description: $description
      university_id: $university_id
      course_mode: $course_mode
      status: $status
      course_fee: $course_fee
      course_duration: $course_duration
      degree: $degree
    ) {
      _id
      name
    }
  }
`;
