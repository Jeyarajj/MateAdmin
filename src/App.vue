<template>
  <v-app :dark="colorScheme.dark" :class="colorScheme.scheme">
    <router-view name="header"/>
    <router-view name="sidebar"/>
    <v-content>
      <v-container fluid grid-list-xl class="pb-0">
        <router-view></router-view>
      </v-container>
    </v-content>
    <router-view name="footer"/>
    <!-- <app-settings :drawer="subDrawer" @toggleSubDrawer="handleSubdrawer"></app-settings> -->
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      subDrawer: false
    };
  },
  computed: {
    ...mapGetters({
      colorScheme: "colorScheme"
    })
  },
  watch: {
    "$store.getters.isAuthenticated": function(isAuthenticated) {
      if (isAuthenticated) {
        if (this.$route.query.redirect) {
          this.$router.push({
            path: decodeURIComponent(this.$route.query.redirect)
          });
        }
      }
    }
  },

  methods: {
    handleSubdrawer(value) {
      this.subDrawer = value;
    }
  }
};
</script>