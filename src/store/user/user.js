// import { headerData } from '../shared/header'
import { userActions } from './actions';
import { userMutations } from './mutations';

export const user = {
  state: {
    isAuthenticated: false,
    expirationDate: null,
    userToken: null,
    authWarningMsg: null,
    isUserEmailVerified: false,
    rememberMe: false,
    wasEmailSend: false,
    userBasicInfoProfile: null,
    userProviderData: null,
    rolePermission: [],
    userDisplayname: null,
    roleid: null,
    files: [],
    cities: [],
    countries: []
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    expirationDate: state => state.expirationDate,
    userToken: state => state.userToken,
    authWarningMsg: state => state.authWarningMsg,
    wasEmailSend: state => state.wasEmailSend,
    isUserEmailVerified: state => state.isUserEmailVerified,
    userBasicInfoProfile: state => state.userBasicInfoProfile,
    userProviderData: state => state.userProviderData,
    userDisplayname: state => state.userDisplayname,
    roleid: state => state.roleid,
    files: state => state.files,
    cities: state => state.cities,
    countries: state => state.countries,
    rolePermission: state => state.rolePermission // use this state to get the particular user permission By Bala
  },
  mutations: userMutations,
  actions: userActions
};
