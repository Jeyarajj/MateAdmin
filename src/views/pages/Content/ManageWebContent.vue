<template>
  <div>
      <v-toolbar flat extended class="transparent section-definition-toolbar">
        <v-avatar class="box-glow" tile>
          <v-icon dark v-html="icon" v-if="icon"></v-icon>
          <span v-else>{{ title | first2Char }}</span>
        </v-avatar>
        <v-toolbar-title class="primary--text">{{ title }}</v-toolbar-title>
        <v-toolbar-title class="toobar-extension" slot="extension">
          <v-breadcrumbs
            v-if="breadcrumbs"
            class="pl-0"
          >
            <v-icon slot="divider" color="primary">chevron_right</v-icon>
            <v-breadcrumbs-item
              v-for="item in breadcrumbs"
              :key="item.text"
              :disabled="item.disabled"
            >
              {{ item.text }}
            </v-breadcrumbs-item>
          </v-breadcrumbs>
          <slot></slot>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        </v-toolbar>
  </div>
</template>
<script>
export default {
  data: () => ({
    title: 'Manage Web Content',
    icon: 'playlist_add_check',
    breadcrumbs: [
    {
      text: 'Home',
      disabled: true
    },
    {
      text: 'Content',
      disabled: true
    },
    {
      text: 'Manage Web Content',
      disabled: true
    }
    ],
  }),
};
</script>