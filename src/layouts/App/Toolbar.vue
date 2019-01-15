<template>
  <v-toolbar
    :fixed="false"
    v-if="true"
    :class="md-white-500"
    :clipped-left="toolbarClippedLeft"
    app
    flat
  >
    <v-toolbar-side-icon
      class="hidden-lg-and-up"
      @click.stop="$store.dispatch('toggleDrawer', ! navDrawer)"></v-toolbar-side-icon>
    <v-toolbar-title v-text="title" class="ml-0 hidden-lg-and-up"></v-toolbar-title>
    <v-btn
      icon
      light
      class="hidden-md-and-down"
      @click.stop="toggleMiniVariantMode"
    >
      <v-tooltip bottom v-if="navMiniVarient" color="sidebar">
        <v-icon slot="activator">fas fa-arrow-circle-right</v-icon>
        <span>Expand</span>
      </v-tooltip>
      <v-tooltip bottom v-else color="sidebar">
        <v-icon slot="activator">fas fa-arrow-circle-left</v-icon>
        <span>Collapse</span>
      </v-tooltip>
    </v-btn>
    <!--  -->
    <v-btn icon :to="{name: 'Contacts'}" flat>
      <v-icon>contacts</v-icon>
    </v-btn>
    <v-btn icon :to="{name: 'Chat'}" flat>
      <v-icon>chat</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <v-avatar slot="activator" size="40">
        <img
          :src="authUser.avatar"
          :alt="authUser.name"
        >
      </v-avatar>
      <v-list dense>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img
              :src="authUser.avatar"
              :alt="authUser.name"
            >
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-text="authUser.name"></v-list-tile-title>
            <v-list-tile-sub-title>CEO of Vuse</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click="() => {}">
          <v-list-tile-avatar>
            <v-icon>person</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Edit Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="() => {}">
          <v-list-tile-avatar>
            <v-icon>settings_applications</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="() => {}">
          <v-list-tile-avatar>
            <v-icon>mail</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Inbox</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click.prevent="logout">
          <v-list-tile-avatar>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
  import { authUser } from '@/data/dummyData'
  import { mapActions,mapGetters } from 'vuex'

  export default {
    data () {
      return {
        title: 'Vuse'
      }
    },
    computed: {
      //...mapGetters(['userToken']),
      authUser () {
        return authUser
      }
    },
  //   watch: {
  //   userToken (value) {
  //     if(value === null)
  //     this.$router.push('/')
  //   }
  // },
    methods: {
      ...mapActions({
      logout: "logout"
    }),
      toggleMiniVariantMode () {
        this.$store.dispatch('toggleMiniVariantMode')
        this.$store.dispatch('toggleMiniVarient')
      }
    }
  }
</script>
