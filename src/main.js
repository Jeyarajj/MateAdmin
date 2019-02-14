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
import apolloProviderPromiseFunction from './apollo';

Vue.use(VueRouter);
// apollo
import { apolloClient } from './apollo-controller/index';
import VueApollo from 'vue-apollo';
Vue.use(VueApollo);

//lightbox
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad);
require('vue-image-lightbox/dist/vue-image-lightbox.min.css');

//Vue.use(VueApollo);
import { isEmpty as ldIsEmpty } from 'lodash';
import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import colors from 'vuetify/es5/util/colors';
import InputTag from 'vue-input-tag';
//import { createI18n } from './i18n/index'

import Vuebar from 'vuebars';
import Trend from 'vuetrend';
import VueCloneya from 'vue-cloneya';
import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.use(Loading, { 'is-full-page': true, loader: 'dots', color: 'red' });
Vue.use(Toaster, { timeout: 2000 });
Vue.use(VueCloneya);
Vue.use(Vuebar);
Vue.use(Trend);

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
    // try {
    //   apolloProviderPromiseFunction().then(apolloProvider => {
    //     // https://github.com/Akryum/vue-apollo/src/index.js @ prepare and launch
    //     this._apolloProvider = apolloProvider;
    //     Vue.use(VueApollo);
    //   });
    // } catch (error) {
    //   //test
    // }
    this.$store.dispatch('metatags');
    this.$store.dispatch('initFirebase');
    this.$store.dispatch('checkIfUserLogin');
    this.$store.dispatch('location');
  },
  render: h => h(App)
}).$mount('#app');
