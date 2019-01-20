// import { headerData } from '../shared/header'
import { FileAction } from './actions';
import { FileMutation } from './mutation';

export const FileUpload = {
  state: {
    updated: false,
    institutionFiles: []
  },
  getters: {
    updated: state => state.updated,
    institutionFiles: state => state.institutionFiles
  },
  mutations: FileMutation,
  actions: FileAction
};
