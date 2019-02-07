<template>
  <v-app :dark="colorScheme.dark" :class="colorScheme.scheme">
    <router-view name="header"/>
    <router-view name="sidebar"/>
    <v-content>
      <router-view></router-view>
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
  methods: {
    handleSubdrawer(value) {
      this.subDrawer = value;
    }
  }
};
</script>