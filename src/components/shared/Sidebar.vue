<template>
<div class="sidebar">
  <md-list>
    <md-list-item @click="goTo()">
      <span class="md-list-item-text sidebar__header">Dashboard</span>
    </md-list-item>

    <md-list-item @click="goTo('/admin', 'index')"">
      <md-icon>supervised_user_circle</md-icon>
      <span class="md-list-item-text">Mate Admins</span>
    </md-list-item>

    <md-list-item>
      <md-icon>people</md-icon>
      <span class="md-list-item-text">Manage All User</span>
    </md-list-item>

    <md-list-item @click="goTo('/institutions', 'index')">
      <md-icon>school</md-icon>
      <span class="md-list-item-text">Manage All Institutions</span>
    </md-list-item>

    <md-list-item @click="goTo('/courses', 'index')">
      <md-icon>class</md-icon>
      <span class="md-list-item-text">Manage All Courses</span>
    </md-list-item>

    <md-list-item @click="goTo('/scholarships', 'index')">
      <md-icon>library_books</md-icon>
      <span class="md-list-item-text">Manage All Scholarships</span>
    </md-list-item>

    <md-list-item @click="goTo('/cities', 'index')">
      <md-icon>location_city</md-icon>
      <span class="md-list-item-text">Manage All Cities</span>
    </md-list-item>

    <md-list-item @click="goTo('/countries', 'index')">
      <md-icon>terrain</md-icon>
      <span class="md-list-item-text">Manage All Countries</span>
    </md-list-item>
  </md-list>
</div>
</template>

<script>
export default {
  methods: {
    goTo: function (path, pageType) {
      if (pageType === 'index') {
        this.$router.push({path: `/dashboard${path}`, query: { pageindex: 0 }})
      } else {
        this.$router.push({path: '/dashboard'})
      }
    }
  }
}
</script>

<style lang="scss">
  .sidebar {
    min-height: 100vh;
    .sidebar__header {
      font-size: 2rem;
      font-weight: bold;
      color: var(--dark-blue-grey);
    }
    .md-list-item {
      margin-top: .5rem;
    }
    li {
      cursor: pointer;
      transition: all .3s;
      &:hover {
        background-color: var(--perrywinkle);
      }
    }
  }
</style>
