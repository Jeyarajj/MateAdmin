import * as firebase from 'firebase';
// import TrashIconAsset from '@/assets/svg-icons/trash-2.svg'
import route from './../../router';
import gql from 'graphql-tag';
import { LOCATION_CITY, LOCATION_COUNTRY } from '../../gql-constants/locations';

import { apolloClient } from '../../apollo-controller/index';
export const userActions = {
  login: function(context, payload) {
    if (payload === 'facebook') {
      // fb isn't activated yet
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(() => {
          context.dispatch('checkUserAuthChanged');
        })
        .catch(error => {
          context.commit('setErrorAuthNotification', error.message);
        });
    } else if (payload === 'google') {
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(() => {
          context.dispatch('checkUserAuthChanged');
        })
        .catch(error => {
          context.commit('setErrorAuthNotification', error.message);
        });
    } else if (payload === 'twitter') {
      // fb isn't activated yet
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then(() => {
          context.dispatch('checkUserAuthChanged');
        })
        .catch(error => {
          context.commit('setErrorAuthNotification', error.message);
        });
    } else if (payload.type === 'email_and_password') {
      // checking for an email or password value
      if (!payload.email) {
        context.commit('setErrorAuthNotification', 'Please provide an email');
      } else if (!payload.password) {
        context.commit('setErrorAuthNotification', 'Please provide a password');
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then(user => {
            context.dispatch('checkUserAuthChanged');
            context.dispatch('checkpermission', user.user.uid);
            context.dispatch('basicProfileinfo', user.user.uid);
            context.commit('setErrorAuthNotification', null);
          })
          .catch(error => {
            context.commit('setErrorAuthNotification', error.message);
          });
      }
    }
  },
  logout: function(context) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        context.commit('removeUserCredentials');
      })
      .catch(error => {
        context.commit('setErrorAuthNotification', error.message);
      });

    // clear the current user data from the store
    // context.dispatch('resetModulesAfterLogout')
  },
  checkUserAuthChanged: function(context) {
    // see if a user is currently signed in
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken(true).then(token => {
          context.commit('setUserCredential', {
            token,
            isEmailVerified: user.emailVerified,
            name: user.email,
            userProviderData: user.providerData
          });
        });
      } else {
        context.commit('removeUserCredentials');
      }
    });
  },
  createUserWithEmailAndPassword: function(context, payload) {
    // checking for an email or password value
    if (!payload.email) {
      context.commit('setErrorAuthNotification', 'Please provide an email');
    } else if (!payload.password) {
      context.commit('setErrorAuthNotification', 'Please provide a password');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          context.dispatch('sendVerificationEmail');
          context.dispatch('checkUserAuthChanged');
        })
        .catch(error => {
          context.commit('setErrorAuthNotification', error.message);
        });
    }
  },
  sendVerificationEmail: function() {
    let user = firebase.auth().currentUser;
    let rootUrl = window.location.origin;
    let firebaseSetting = {
      url: `${rootUrl}/?user=${user.uid}&action=verification`
    };

    // firebase method to send Email Verification
    user.sendEmailVerification(firebaseSetting);
  },
  sendForgotPasswordEmail: function(context, payload) {
    let rootUrl = window.location.origin;

    if (!payload) {
      context.commit('setErrorAuthNotification', 'Please provide your email');
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(payload, { url: rootUrl })
        .then(() => {
          context.commit('setEmailUserSend', true);
        })
        .catch(error => {
          context.commit('setErrorAuthNotification', error.message);
        });
    }
  },
  location: function(context, payload) {
    apolloClient
      .query({
        query: LOCATION_CITY
      })
      .then(result => context.commit('cities', result))
      .catch(err => {
        console.log(err);
      });

    apolloClient
      .query({
        query: LOCATION_COUNTRY
      })
      .then(result => context.commit('countries', result))
      .catch(err => {
        console.log(err);
      });
  },
  checkpermission: function(context, payload) {
    const jobQuery = gql`
      query($token: String!) {
        rolePermissionOut(token: $token) {
          _id
          role_name
          role_description
          created_by
          role_permission {
            module_name
            create
            update
            delete
            list
            publish
          }
        }
      }
    `;
    apolloClient
      .query({
        query: jobQuery,
        variables: {
          token: payload
        }
      })
      .then(result => context.commit('permissionSetup', result))
      .catch(err => {
        console.log(err);
      });
  },
  basicProfileinfo: function(context, payload) {
    const profileInfo = gql`
      query($uid: String!) {
        getBasicInfo(uid: $uid) {
          _id
          id
        }
      }
    `;
    apolloClient
      .query({
        query: profileInfo,
        variables: {
          uid: payload
        }
      })
      .then(result => {
        context.commit('setBasicInfoUserProfile', result);
        context.dispatch('currentUserinfo', result.data.getBasicInfo._id);
      })
      .catch(err => {
        console.log(err);
      });
  },
  currentUserinfo: function(context, payload) {
    const currentUserInfo = gql`
      query($Id: ObjectID!) {
        profile(_id: $Id) {
          _id
          photo
          email
          dob
          phone
          name {
            first
          }
          username
          id
          languages {
            name
          }
          nationality
          address {
            city
            country
          }
        }
      }
    `;
    apolloClient
      .query({
        query: currentUserInfo,
        variables: {
          Id: payload //TODO : get userBasicInfoProfile._id
        }
      })
      .then(result => context.commit('setcurrentUserinfo', result))
      .catch(err => {
        console.log(err);
      });
  },
  checkIfUserLogin: function(context) {
    let expirationDate = new Date(localStorage.getItem('expirationDate'));
    let token = localStorage.getItem('token');
    let now = new Date();

    if (!token) {
      return;
    }

    // auto logout if expirationData is met
    if (now >= expirationDate) {
      context.dispatch('logout');
    } else {
      context.dispatch('checkUserAuthChanged');
    }
  },
  deleteMyAccount: function({ dispatch }) {
    // todo-JP: additional security checks
    // todo-JP: see if this can be authorized by the BE
    // todo-JP: change +new Date to something meaningful about this operation
    return new Promise((resolve, reject) => {
      dispatch('registerNewNotification', {
        id: +new Date(),
        text: `
          <img class="headerbar-notice-icon" src="" alt="trash-2" />
          Your account has been <em>deleted</em> succesfully.
        `,
        date: +new Date(),
        type: 'DELETE_ACCOUNT'
      });
      dispatch('registerNewNotification', {
        id: +new Date(),
        date: +new Date(),
        text: `
          This is just another notification to see if it works.
        `
      });
      resolve(true);
    });
  }
};
