// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './polyfill'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router/index'
import { store } from './store/index';

// apollo
import { apolloClient } from './apollo-controller/index';
import VueApollo from 'vue-apollo';
Vue.use(VueApollo);

// Apollo Config
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

// todo
// cssVars()

Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  created() {
    this.$store.dispatch('metatags');
    this.$store.dispatch('initFirebase');
    this.$store.dispatch('checkIfUserLogin');
    this.$store.dispatch('location');
  },
  template: '<App/>',
  components: {
    App
  }
})
