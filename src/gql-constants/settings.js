import gql from 'graphql-tag';

export const HOMESETTING = gql`
  mutation homesetting(
    $logo: String
    $banner: [String]
    $service_we_provide: Text
  ) {
    homeSettings(
      logo: $logo
      banner: $banner
      service_we_provide: $service_we_provide
    ) {
      logo
      banner
      service_we_provide
    }
  }
`;

export const GET_HOMESETTINGS = gql`
  query {
    homeSettingquery {
      logo
      banner
    }
  }
`;

export const GET_METATAGS = gql`
  query {
    getMetaTags {
      _id
      meta_label
      value
    }
  }
`;

export const CREATE_METATAGS = gql`
  mutation createmetatags($_id: ObjectID, $meta_label: String, $value: String) {
    createMetaTags(_id: $_id, meta_label: $meta_label, value: $value) {
      _id
      meta_label
      value
    }
  }
`;
