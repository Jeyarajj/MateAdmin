import gql from 'graphql-tag';

export const HOMESETTING = gql `
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

export const GET_HOMESETTINGS = gql `
query {
    homeSettingquery {
    logo
    banner
  }
}
`;