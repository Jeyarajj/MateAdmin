// vue
import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import { config } from './secret/firebase_config';

// components
import { user } from './user/user';


Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {  
    user,
  },
  actions: {
    initFirebase: function () {
      firebase.initializeApp(config)
    }
  }
})
