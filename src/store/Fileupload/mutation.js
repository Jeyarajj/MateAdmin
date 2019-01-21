// import { router } from '../../router'
// import { reloadOnceOnly } from '../../utils/general-utils'
const now = new Date();

export const FileMutation = {
  updated: function(state, payload) {
    state.updated = payload;
  },
  updateFiles: function(state, files) {
    state.institutionFiles = files;
  }
};
