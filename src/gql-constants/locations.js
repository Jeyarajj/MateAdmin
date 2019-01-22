import gql from 'graphql-tag';

export const LOCATIONS_SEARCH = gql`
  query XSearch($text: Text!) {
    search(text: $text) {
      location {
        ...location_result
      }
    }
  }

  fragment location_result on LocationItem {
    __typename
    ...university_search_result
    ...city_search_result
    ...country_search_result
  }

  fragment university_search_result on University {
    _id
    name
    city {
      name
      country {
        name
      }
    }
  }

  fragment city_search_result on City {
    _id
    name
  }

  fragment country_search_result on Country {
    _id
    name
  }
`;

export const ALL_LOCATIONS_SEARCH = gql`
  query search_locations {
    locations(city: true, country: true, university: false) {
      ...unified_types
    }
  }

  fragment unified_types on LocationItem {
    ...city_location_search
    ...country_location_search
  }

  fragment city_location_search on City {
    _id
    name
  }

  fragment country_location_search on Country {
    _id
    name
  }
`;

export const LOCATION_CITY = gql`
  query search_locations {
    locations(city: true, country: false, university: false) {
      ... on City {
        name
        _id
      }
    }
  }
`;

export const LOCATION_COUNTRY = gql`
  query search_locations {
    locations(city: false, country: true, university: false) {
      ... on Country {
        name
        _id
      }
    }
  }
`;

export const LOCATIONS_SEARCH_OLD = gql`
  query search_locations($search: ItemSearch!) {
    university: university_search(search: $search) {
      _id
      name
      city {
        name
        country {
          name
        }
      }
    }
    city: city_search(search: $search) {
      _id
      name
      country {
        name
      }
    }
    country: country_search(search: $search) {
      _id
      name
    }
  }
`;
