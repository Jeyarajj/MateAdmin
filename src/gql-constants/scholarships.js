import gql from 'graphql-tag';

export const GET_SCHOLARSHIPS = gql`
  query scholarshipsResult($text: Text, $page: PageOption) {
    search(text: $text, page: $page) {
      scholarship {
        items {
          ...scholarship_search_result
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
  fragment scholarship_search_result on Scholarship {
    _id
    name
    value
    first_name
    last_name
    website
    description
    picture
    amount {
      currency
      value
    }
    email
    university_id
    created_by
    updated_by
    status

    institution {
      names
    }
  }
`;

//Create Scholarship

export const CREATE_SCHOLARSHIP = gql`
  mutation create_scholarship(
    $_id: ObjectID
    $first_name: Text
    $last_name: Text
    $website: Url
    $description: Text
    $picture: Text
    $amount: AmountIn
    $email: Text
    $university_id: ObjectID
    $created_by: ObjectID
    $updated_by: ObjectID
    $status: String
  ) {
    createScholarship(
      _id: $_id
      first_name: $first_name
      last_name: $last_name
      website: $website
      description: $description
      picture: $picture
      amount: $amount
      email: $email
      university_id: $university_id
      created_by: $created_by
      updated_by: $updated_by
      status: $status
    ) {
      name
      _id
    }
  }
`;
