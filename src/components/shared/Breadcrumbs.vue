<template>
<div class="breadcrumbs">
  <ul v-for="(path, i) in dashboardFullPath"
      :key="i"
      class="breadcrumbs__path">
    <span v-if="i !== 0" class="breadcrumbs__li-divider"> / </span>
    <li class="breadcrumbs__li"
        @click="goTo(path, i)">
      {{path}}
    </li>
  </ul>
</div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Breadcrumbs',
  computed: {
    dashboardFullPath: function () {
      let routePaths = this.$route.path.split('/')
      return _.remove(routePaths, (n) => { return n !== '' }) // remove an empty path
    }
  },
  methods: {
    goTo: function (path, place) {
      if (place === 0) {
        this.$router.push({path: `/${path}`})
      } else if (place === 1) {
        this.$router.push({path: this.pathFilter(place), query: { pageindex: 0 }})
      } else {
        this.$router.push({path: this.pathFilter(place)})
      }
    },
    pathFilter: function (place) {
      let filteredPath = []
      for (let i = place; i >= 0; i--) {
        filteredPath.push(this.dashboardFullPath[i])
      }
      return `/${_.reverse(filteredPath).join('/')}`
    }
  }
}
</script>

<style lang="scss">
  .breadcrumbs {
    .breadcrumbs__path {
      display: inline-block;
      list-style-type: none;
      .breadcrumbs__li-divider, li { display: inline-block}
      .breadcrumbs__li-divider {
        margin: 0 .5rem;
        cursor: default;
        color: var(--dark-blue-grey);
      }
      li {
        padding: 1rem .5rem;
        cursor: pointer;
        color: var(--green-blue);
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
