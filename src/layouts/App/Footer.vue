<template>
  <v-footer
      :fixed="fixedFooter"
      :inset="!fixedFooter"
      :class="[!footer ? 'hide' : '', navFooterScheme]"
      app
    >
      <div class="pa-3"><span class="footertxt"> {{ new Date().getFullYear() }} Mate | All rights reserved.</span></div>
      <v-spacer></v-spacer>
      <!-- <div class="pa-3">Handcrafted with <v-icon right color="pink" small>favorite</v-icon></div> -->
      <div class="pa-3"><span class="footertxt">Powered by zudo</span></div>
  </v-footer>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        fixedFooter: 'fixedFooter',
        footer: 'showFooter',
        navFooterScheme: 'navFooterScheme'
      })
    }
  }
</script>
