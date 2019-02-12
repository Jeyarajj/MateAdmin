import gql from 'graphql-tag';

export const QUERIES={
  listLimit:10,
  GET_UNIVERSITIES:gql `
  query getUniversities($limit: Number,$skip:Number) {
    getUniversities(limit: $limit, skip: $skip ) { 
      university{
      _id
      active
      email
      _details{
        name
        description
        slug
        website
        institutionType
        address{
          country
          city
          addr
        }
      }
    }
    total
    current
    total_pages
   }
   }`,
    CREATE_UNIVERSITY: gql`
    mutation createUniversity(
    $email: String!
    $password: String!
    $_details: UniversityFieldsInput
    ) {
      createUniversity(
      email:$email
      password:$password
      _details:$_details
      ) {
        _id
      }
    }
  `,
    UPDATE_UNIVERSITY: gql`
    mutation updateUniversity(
    $_id: ObjectID!
    $_details: UniversityFieldsInput
    ) {
      updateUniversity(
      _id:$_id
      _details:$_details
      ) {
        _id
      }
    }
  `
}
export const GET_INSTITUTIONS_INDEX = gql`
  query universityResult($text: Text, $page: PageOption) {
    search(text: $text, page: $page) {
      university {
        items {
          ...university_search_result
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
  fragment university_search_result on University {
    _id
    name
    description
    city
    country
    address
    slug
    logourl
    bannerurl
    type
    status
    website
  }
`;

export const UPDATEUNIVERSITY = gql`
  mutation updateuniversity(
    $_id: ObjectID
    $name: Text
    $description: Text
    $slug: Text
    $logourl: Text
    $address: Text
    $bannerurl: [Text]
    $created_by: ObjectID
    $photos: [Text]
    $city: Text
    $country: Text
    $type: Text
    $website: Url
    $status: String
  ) {
    UpdateUniversity(
      _id: $_id
      name: $name
      description: $description
      slug: $slug
      logourl: $logourl
      address: $address
      bannerurl: $bannerurl
      created_by: $created_by
      photos: $photos
      city: $city
      country: $country
      type: $type
      status: $status
      website: $website
    ) {
      _id
      name
    }
  }
`;
