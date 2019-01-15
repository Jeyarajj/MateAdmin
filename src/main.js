import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router/index'
import { store } from './store/index'
import './stylus/main.styl'
Vue.use(VueRouter)
// apollo
import { apolloClient } from './apollo-controller/index'
import VueApollo from 'vue-apollo'
Vue.use(VueApollo)

import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false


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
