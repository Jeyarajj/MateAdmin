// vue
import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import { config } from './secret/firebase_config';

// components
import { user } from './user/user';
import { FileUpload } from './Fileupload/fileupload';
import navigation from './modules/navigation';
import swatch from './modules/swatch';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user,
    FileUpload,
    navigation,
    swatch
  },
  actions: {
    initFirebase: function() {
      firebase.initializeApp(config);
    }
  }
});
