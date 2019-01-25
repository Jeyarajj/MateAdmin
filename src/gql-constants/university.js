import gql from 'graphql-tag';

export const GET_INSTITUTIONS_INDEX = gql`
  query universityResult($text: Text, $page: PageOption) {
    search(text: $text, page: $page) {
      university {
        items {
          ...university_search_result
        }
      }
    }
  }
  fragment university_search_result on University {
    _id
    name
    description
    city {
      name
    }
  }
`;

export const UPDATEUNIVERSITY = gql`
  mutation updateuniversity(
    $_id: ObjectID
    $name: Text
    $description: Text
    $slug: Text
    $logourl: Text
    $bannerurl: [Text]
    $created_by: ObjectID
    $photos: [Text]
    $city: Text
    $country: Text
    $type: Text
    $status: Text
    $website: Url
  ) {
    UpdateUniversity(
      _id: $_id
      name: $name
      description: $description
      slug: $slug
      logourl: $logourl
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
