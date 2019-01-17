import Vue from 'vue';

import _ from 'lodash';

import Router from 'vue-router';
import { store } from '../store/index';
import { routes } from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes
});

/*
 * router.beforeEach((to, from, next) => { if (to.meta.requiresAuth) { const
 * authUser = localStorage.getItem('access_token') if (authUser) { next() } else {
 * next({name: 'Login'}) } } next() })
 */

/**
 * If the route can't be accessed directly for some reason, it should be redirected to somewhere else.
 * We get the route as specified in the metadata and replace any current params which are also going to be present in the target route.
 * Currently it only supports route parameters and not query parameters.
 *
 * @param {Object} to - Same as the param to which is received by Vue Router's navigation guards.
 * @param {Object} from - Same as the param from which is received by Vue Router's navigation guards.
 * @param {Function} next - Same as the param next which is received by Vue Router's navigation guards.
 * @param {Boolean} isAuthenticated - A Boolean flag which indicates if the user is authenticated or not.
 * @param {Boolean} isVerified - A Boolean flag which indicates if the user's email has been verified or not.
 *
 * @returns {Boolean} A Boolean value which will say if redirection will happen or not.
 */
function checkForDirectURLAccess(to, from, next, isAuthenticated, isVerified) {
  if (to.matched.some(route => route.meta.privateRouteGuard)) {
    return to.meta.privateRouteGuard(
      to,
      from,
      next,
      isAuthenticated,
      isVerified
    );
  }
  const toParameters = _.cloneDeep(to.params);

  if (to.matched.some(route => route.meta.redirectOnURLAccess)) {
    let newTargetURL = to.meta.redirectOnURLAccess;
    for (const parameter in toParameters) {
      if (toParameters.hasOwnProperty(parameter)) {
        const parameterValue = toParameters[parameter];
        if (parameterValue) {
          newTargetURL = newTargetURL
            .split(`:${parameter}`)
            .join(parameterValue);
        }
      }
    }
    next({
      path: newTargetURL
    });
    return true;
  } else if (to.matched.some(route => route.meta.verified) && !isVerified) {
    next({
      path: '/'
    });
    return true;
  } else {
    next();
    return false;
  }
}

/**
 * Checks if the route needs authentication before accessing it.
 * Conditionally calls for {checkForDirectURLAccess} to see if the route also needs special checking on direct URL access.
 *
 * @param {Object} to - Same as the param to which is received by Vue Router's navigation guards.
 * @param {Object} from - Same as the param from which is received by Vue Router's navigation guards.
 * @param {Function} next - Same as the param next which is received by Vue Router's navigation guards.
 * @param {Boolean} isAuthenticated - A Boolean flag which indicates if the user is authenticated or not.
 * @param {Boolean} isVerified - A Boolean flag which indicates if the user's email has been verified or not.
 *
 * @returns {Boolean} A Boolean value which will say if redirection will happen or not.
 */
function checkForAuthenticatedAccess(
  to,
  from,
  next,
  isAuthenticated,
  isVerified
) {
  if (to.matched.some(route => route.meta.authenticated)) {
    if (isAuthenticated) {
      return checkForDirectURLAccess(
        to,
        from,
        next,
        isAuthenticated,
        isVerified
      );
    } else {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
      return true;
    }
  } else {
    return checkForDirectURLAccess(to, from, next, isAuthenticated, isVerified);
  }
}

export default router;

/**
 * Main Authentication Guard for Vue Router.
 */
router.beforeEach((to, from, next) => {
  let willRedirect = false;
  let initializedStore = store.getters;
  // if (initializedStore) {
  //   const abilities = defineAbilitiesFor(initializedStore.getters.rolePermission)
  //   const canNavigate = to.matched.some(route => {
  //     return abilities.can(route.meta.action, route.meta.resource)
  //   })
  //   console.log(canNavigate)
  //   if (!canNavigate) {
  //     return next('/')
  //   }
  // }

  // Firebase might not have been initialized yet so we don't know if the authentication is valid.
  // We should wait for Firebase initialization if the user is attempting to access any router other than the root path.
  if (to.path === '/') {
    next();
  } else if (initializedStore) {
    willRedirect = checkForAuthenticatedAccess(
      to,
      from,
      next,
      initializedStore.isAuthenticated,
      initializedStore.isUserEmailVerified
    );
  } else {
    window.firebaseWaitInterval = window.setInterval(() => {
      let initializedStore = store.getters;
      if (initializedStore) {
        // Firebase has been initialized and we can see if the user has been authenticated or not
        window.clearInterval(window.firebaseWaitInterval);
        willRedirect = checkForAuthenticatedAccess(
          to,
          from,
          next,
          initializedStore.isAuthenticated,
          initializedStore.isUserEmailVerified
        );
      }
    }, 200);
  }
  if (initializedStore) {
    if (!initializedStore.isAuthenticated) {
      next('/');
      return true;
    }
  }
  // if (!willRedirect) {
  //   next('/');
  // }
  // Clear Header Bar notices when the user navigates to another route.
  // Will not disperse the notice if the route is supposed to be redirected to somewhere else.
  if (initializedStore && !willRedirect) {
    initializedStore.dispatch('disperseLastNotice');
  }
});
