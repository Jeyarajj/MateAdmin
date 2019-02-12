// import { router } from '../../router'
// import { reloadOnceOnly } from '../../utils/general-utils'
//import defineAbilitiesFor from '../../config/ability'
import Vue from 'vue';
const now = new Date();

export const userMutations = {
  updateFiles: function(state, files) {
    state.files = files;
  },
  setUserCredential: function(state, payload) {
    let expiresIn2hrs = new Date(now.getTime() + 3600 * 2000);
    let expiresIn1week = new Date(now.getTime() + 3600 * (24000 * 7)); // 24000 = 24hrs, 7 = 7days
    let expirationDate = !state.rememberMe ? expiresIn2hrs : expiresIn1week;

    // set user's email verified
    state.isUserEmailVerified = payload.isEmailVerified;
    // change to user authenticated state
    state.isAuthenticated = true;
    state.showAuthModal = false;
    // set token to state
    state.userToken = payload.token;
    // set provider data from firebase
    state.userProviderData = payload.userProviderData[0];
    state.userDisplayname = payload.name;
    // set token to local storage
    localStorage.setItem('token', payload.token);
    // set expiration date to local storage
    localStorage.setItem('expirationDate', expirationDate);
  },
  setEmailUserSend: function(state, payload) {
    state.wasEmailSend = payload;
  },
  setErrorAuthNotification: function(state, payload) {
    state.authWarningMsg = payload;
  },
  removeUserCredentials: function(state) {
    // reset all state
    state.userToken = null;
    state.isAuthenticated = false;
    state.isUserEmailVerified = false;
    // removed all user related storage
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    // redirect to homepage
    // reloadOnceOnly()
  },
  permissionSetup: function(state, payload) {
    const data = payload.data.rolePermissionOut;
    const rolePermission = data.role_permission;
    state.rolePermission = rolePermission;
    // Vue.use(defineAbilitiesFor(rolePermission));
    state.roleid = data._id;
  },
  metaTags: function(state, payload) {
    state.metatags = payload.data.getMetaTags;
  },
  setBasicInfoUserProfile: function(state, payload) {
    state.userBasicInfoProfile = payload.data.getBasicInfo;
  },
  setcurrentUserinfo: function(state, payload) {
    state.currentUserdata = payload.data.getProfile[0];
    localStorage.setItem(
      'userInfo',
      JSON.stringify(payload.data.getProfile[0])
    );
  },
  updatecurrentUserinfo: function(state, payload) {
    state.currentUserdata = payload;
    localStorage.setItem('userInfo', JSON.stringify(payload));
  },
  setRememberMe: function(state, payload) {
    state.rememberMe = payload;
  },
  cities: function(state, payload) {
    state.cities = payload.data.locations;
  },
  countries: function(state, payload) {
    state.countries = payload.data.locations;
  }
};
