// import { headerData } from '../shared/header'
import { FileAction } from './actions';
import { FileMutation } from './mutation';

export const FileUpload = {
  state: {
    updated: false,
    institutionFiles: [],
    institutionBanner: []
  },
  getters: {
    updated: state => state.updated,
    institutionFiles: state => state.institutionFiles,
    institutionBanner: state => state.institutionBanner
  },
  mutations: FileMutation,
  actions: FileAction
};
