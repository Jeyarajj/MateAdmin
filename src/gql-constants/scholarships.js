import gql from "graphql-tag";

export const QUERIES = {
  GET_SCHOLARSHIPS: gql`query getScholarshipsList($limit: Number,$skip:Number) {
    getScholarshipsList(limit: $limit, skip: $skip ) {   
      total
      total_pages
      current
    scholarships{
      _id
      _details{
        name
        description
        website
        picture
        amount{
          currency
          value 
              }			
      }  		
    active
    }
    }
  }`,
  CREATE_SCHOLARSHIP: gql`
  mutation createScholarship(
  $_details: ScholarshipFieldsInput
  ) {
    createScholarship(
    _details:$_details
    ) {
      _id
    }
  }
`,
  UPDATE_SCHOLARSHIP:  gql`
  mutation updateScholarship(
  $_id:ObjectID
  $_details: ScholarshipFieldsInput
  ) {
    updateScholarship(
      _id:$_id
    _details:$_details
    ) {
      _id
    }
  }
`,
  GET_SCHOLARSHIP: ``,
  BLOCK_SCHOLARSHIP: ``,
  UNBLOCK_SCHOLARSHIP: ``,
  limit: 10
};

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
