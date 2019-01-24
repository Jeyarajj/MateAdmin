export default {
  state: {
    currentPageIndex: null,
    currentPage: null,
    totalPages: null,
    listLimit: null
  },
  getters: {
    currentPageIndex: state => state.currentPageIndex,
    currentPage: state => state.currentPage,
    totalPages: state => state.totalPages,
    listLimit: state => state.listLimit
  },
  mutations: {
    SET_PAGES_DATA: function (state, payload) {
      state.currentPageIndex = payload.currentIndex
      state.currentPage = payload.currentPage
      state.totalPages = payload.totalPages
      state.listLimit = payload.listLimit
    }
  }
}
