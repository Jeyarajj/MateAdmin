import Vue from 'vue';
import 'vue-country-region-select';
import VueRouter from 'vue-router';
import router from './router/index';
import { store } from './store/index';
import Vuetify from 'vuetify';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
import 'select2'; // globally assign select2 fn to $ element
import 'select2/dist/css/select2.css';
import './stylus/main.styl';
Vue.use(VueRouter);
// apollo
import { apolloClient } from './apollo-controller/index';
import VueApollo from 'vue-apollo';
Vue.use(VueApollo);

import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import colors from 'vuetify/es5/util/colors';
import InputTag from 'vue-input-tag';
//import { createI18n } from './i18n/index'

import Vuebar from 'vuebars'
import Trend from 'vuetrend'
Vue.use(Vuebar)
Vue.use(Trend)

//import {truncate} from 'lodash'
import App from './App.vue';
const VueUploadComponent = require('vue-upload-component');
Vue.component('file-upload', VueUploadComponent);
Vue.component('input-tag', InputTag);
Vue.use(Vuetify, {
  theme: {
    primary: store.state.swatch.colorScheme.primary,
    secondary: colors.pink.base,
    accent: colors.deepPurple.accent2,
    error: colors.red.accent4,
    info: colors.blue.lighten1,
    success: colors.green.accent4,
    warning: colors.amber.darken2
  },
  options: {
    themeVariations: ['primary', 'secondary']
  }
});

Vue.config.productionTip = false;
Vue.filter('first2Char', function(str) {
  return str.substring(0, 2).toUpperCase();
});

Vue.filter('firstChar', function(str) {
  return str.charAt(0).toUpperCase();
});

// Apollo Config
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});
Vue.filter('formatSize', function(size) {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB';
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB';
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + ' KB';
  }
  return size.toString() + ' B';
});
Vue.use(require('vue-moment'));
new Vue({
  router,
  store,
  apolloProvider,
  created() {
    this.$store.dispatch('initFirebase');
    this.$store.dispatch('checkIfUserLogin');
    this.$store.dispatch('metatags');
    this.$store.dispatch('location');
  },
  render: h => h(App)
}).$mount('#app');
