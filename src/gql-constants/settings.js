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

export const DELETE_META = gql`
  mutation deletemeta($_id: ObjectID) {
    deleteMeta(_id: $_id)
  }
`;
//Usertypes
export const GET_USERTYPES = gql`
  query {
    getusertypes_settings {
      _id
      ulabel
      uvalue
    }
  }
`;

export const CREATE_USERTYPES = gql`
  mutation create_usertypes_settings(
    $_id: ObjectID
    $ulabel: String
    $uvalue: String
  ) {
    create_usertypes_settings(_id: $_id, ulabel: $ulabel, uvalue: $uvalue) {
      _id
      ulabel
      uvalue
    }
  }
`;

export const DELETE_USERTYPES = gql`
  mutation delete_usertypes_settings($_id: ObjectID) {
    delete_usertypes_settings(_id: $_id)
  }
`;

//Institutions
export const GET_INSTITUTIONTYPES = gql`
  query {
    getinstitutiontypes_settings {
      _id
      ilabel
      ivalue
    }
  }
`;

export const CREATE_INSTITUTIONTYPES = gql`
  mutation create_institution_settings(
    $_id: ObjectID
    $ilabel: String
    $ivalue: String
  ) {
    create_institution_settings(_id: $_id, ilabel: $ilabel, ivalue: $ivalue) {
      _id
      ilabel
      ivalue
    }
  }
`;

export const DELETE_INSTITUTIONTYPES = gql`
  mutation delete_institution_settings($_id: ObjectID) {
    delete_institution_settings(_id: $_id)
  }
`;

//Degree
export const GET_DEGREETYPES = gql`
  query {
    getdegreetypes_settings {
      _id
      dlabel
      dvalue
    }
  }
`;

export const CREATE_DEGREETYPES = gql`
  mutation create_degree_settings(
    $_id: ObjectID
    $dlabel: String
    $dvalue: String
  ) {
    create_degree_settings(_id: $_id, dlabel: $dlabel, dvalue: $dvalue) {
      _id
      dlabel
      dvalue
    }
  }
`;

export const DELETE_DEGREETYPES = gql`
  mutation delete_degree_settings($_id: ObjectID) {
    delete_degree_settings(_id: $_id)
  }
`;

//scholorship
export const GET_SCHOLORTYPES = gql`
  query {
    getscholortypes_settings {
      _id
      slabel
      svalue
    }
  }
`;

export const CREATE_SCHOLORTYPES = gql`
  mutation create_scholor_settings(
    $_id: ObjectID
    $slabel: String
    $svalue: String
  ) {
    create_scholor_settings(_id: $_id, slabel: $slabel, svalue: $svalue) {
      _id
      slabel
      svalue
    }
  }
`;

export const DELETE_SCHOLORTYPES = gql`
  mutation delete_scholor_settings($_id: ObjectID) {
    delete_scholor_settings(_id: $_id)
  }
`;
