<template>
  <v-app >
    <router-view name="header"/>
    <router-view name="sidebar"/>
    <v-content>
    <router-view></router-view>
    </v-content>
    <router-view name="footer"/>
    <!-- <app-settings :drawer="subDrawer" @toggleSubDrawer="handleSubdrawer"></app-settings> -->
  </v-app>
</template>
