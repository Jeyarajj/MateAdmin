<template>
<div class="pagination">
  <ul class="pagination__ul">
    <li @click="goTo('firstPage')"
        :class="{'current-page': checkIfCurrentPage(1)}"
        class="pagination__li"> 1 </li>
    <li v-for="(page, i) in pageLists"
        :v-if="totalPages > 1"
        :key="i"
        @click="goTo(page)"
        :class="{'current-page': checkIfCurrentPage(page)}"
        class="pagination__li">
      {{ page }}
    </li>
    <li @click="goTo('lastPage')"
        v-if="totalPages > 1"
        :class="{'current-page': checkIfCurrentPage(totalPages)}"
        class="pagination__li"> {{ totalPages }} </li>
  </ul>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'Pagination',
  data () {
    return {
      pageLists: [2, 3, 4]
    }
  },
  computed: {
    ...mapGetters(
      [
        'currentPageIndex',
        'currentPage',
        'totalPages',
        'listLimit'
      ]
    ),
    currentSetOfPage: function () {
      if (this.currentPage !== this.pageLists.length) {
        return Math.trunc(this.currentPage / this.pageLists.length)
      } else {
        return 0
      }
    }
  },
  mounted () {
    // FIXME: if you had a better solution to get the totalPages without doing a setTimeout()
    setTimeout(() => {
      if (this.totalPages) {
        this.initSetListOfPage()
      } else {
        setTimeout(() => {
          this.initSetListOfPage()
        }, 500)
      }
    }, 300)
  },
  methods: {
    setListOfPages: function (navType) {
      let numberOfPageToDisplay = this.pageLists.length
      let newPageLists = []

      if (navType === 'onLastPage') {
        for (let i = 1; i < (this.pageLists.length + 1); i++) {
          let newPage = this.totalPages - i
          if (newPage > 1) {
            newPageLists.push(this.totalPages - i)
          }
        }
        this.pageLists = _.orderBy(newPageLists)
        return
      } else if (navType === 'onFirstPage') {
        this.pageLists = [2, 3, 4]
        return
      }

      if (this.totalPages > numberOfPageToDisplay) {
        if (navType === 'forward') {
          for (let i = 0; i < numberOfPageToDisplay; i++) {
            let newPage = _.last(this.pageLists) + i
            if (newPage < this.totalPages) {
              newPageLists.push(newPage)
            } else {
              newPageLists.push((_.first(this.pageLists) - 1) + i)
            }
          }
          this.pageLists = _.orderBy(newPageLists)
        } else if (navType === 'backward') {
          for (let i = 0; i < numberOfPageToDisplay; i++) {
            let newPage = _.first(this.pageLists) - i
            if (newPage > 1) {
              newPageLists.push(newPage)
            } else {
              newPageLists.push((_.last(this.pageLists) + 1) - i)
            }
          }
          this.pageLists = _.orderBy(newPageLists)
        } else {
          this.pageLists = [2, 3, 4]
        }
      } else {
        this.pageLists = []
        for (let i = 1; i < (this.totalPages + 1); i++) {
          if (i > 1 && i < this.totalPages) {
            newPageLists.push(i)
          }
        }
        this.pageLists = newPageLists
      }
    },
    initSetListOfPage: function () {
      if (this.currentPage !== 1) {
        for (let i = 0; i < this.currentSetOfPage; i++) {
          this.setListOfPages('forward')
        }
      } else {
        this.setListOfPages()
      }
    },
    checkIfCurrentPage: function (page) {
      return page === this.currentPage
    },
    getIndexPage: function (path) {
      return (path - 1) * this.listLimit
    },
    goTo: function (path) {
      if (path === 'lastPage') {
        this.setListOfPages('onLastPage')
        this.$router.push({query: { pageindex: this.getIndexPage(this.totalPages) }})
      } else if (path === 'firstPage') {
        this.$router.push({query: { pageindex: 0 }})
      } else {
        if (path === _.head(this.pageLists) && path > 2) { // if path is the first value of the page lists
          this.setListOfPages('backward')
          this.$router.push({query: { pageindex: this.getIndexPage(path) }})
        } else if (path === _.last(this.pageLists) && path < (this.totalPages - 1)) { // if path is the last value of the page lists
          this.setListOfPages('forward')
          this.$router.push({query: { pageindex: this.getIndexPage(path) }})
        } else { // if path is the the middle value of the page lists
          this.$router.push({query: { pageindex: this.getIndexPage(path) }})
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .pagination {
    background-color: grey;
    border-radius: 2px;
    li { display: inline-block; }
    .current-page {
      background-color: blue !important;
      color: white !important;
    }
    .pagination__ul {
      padding: 1rem;
      text-align: right;
      .pagination__li {
        font-size: 1rem;
        color: grey;
        margin: 0 1rem;
        padding: .5rem 1rem;
        cursor: pointer;
        background-color: white;
        border-radius: 3px;
        border: none;
        transition: all .3s;
        &:first-child {
          margin-right: 2.5rem;
        }
        &:last-child {
          margin-left: 2.5rem;
        }
        &:hover {
          background-color: salmon;
          color: white;
        }
      }
    }
  }
</style>
