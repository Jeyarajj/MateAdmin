import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router/index'
import { store } from './store/index'
import Vuetify from 'vuetify'
import './stylus/main.styl'
Vue.use(VueRouter)
// apollo
import { apolloClient } from './apollo-controller/index'
import VueApollo from 'vue-apollo'
Vue.use(VueApollo)

import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import colors from 'vuetify/es5/util/colors'

//import { createI18n } from './i18n/index'

//import {truncate} from 'lodash'
import App from './App.vue'

const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)

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
})

Vue.config.productionTip = false
Vue.filter('first2Char', function (str) {
  return str.substring(0, 2).toUpperCase()
 })

 Vue.filter('firstChar', function (str) {
 return str.charAt(0).toUpperCase()
})

// Apollo Config
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  router,
  store,
  apolloProvider,
  created() {
    this.$store.dispatch("initFirebase");
    this.$store.dispatch("checkIfUserLogin");
  },
  render: h => h(App),
}).$mount('#app')
