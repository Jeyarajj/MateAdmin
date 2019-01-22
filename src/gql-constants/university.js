import gql from 'graphql-tag';

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
    city {
      name
    }
  }
`;
