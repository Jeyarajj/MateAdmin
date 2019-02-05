<template>
  <div>
    <v-container fluid grid-list-xl class="pb-0">
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
        <v-text-field
          v-model="search"
          append-icon="search"
          class="input-group--focused"
          label="Search Icon"
          solo
        ></v-text-field>
      </v-toolbar>
    </v-container>
    <v-container fluid grid-list-xl page>
      <v-layout row wrap>
        <!-- <v-flex xs10 offset-xs1>
          <v-text-field
            v-model="search"
            single-line
            prepend-icon="search"
            class="input-group--focused"
            label="Search Icon"
            solo
          ></v-text-field>
        </v-flex> -->
        <v-flex xs6 sm4 md3 lg2 v-for="icon in filteredItems" :key="icon.id">
          <v-card flat class="text-xs-center" light color="blue-grey lighten-5">
            <v-icon v-text="icon.id" large class="pt-3"></v-icon>
            <v-card-text v-text="icon.id"></v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import GoogleIcons from '@/data/json/google-material-icons.json'

  export default {
    data () {
      return {
        title: 'Icons',
        contentHeadline: 'Icons',
        icon: 'collections',
        description: `Vuse reactive forms facilitate a reactive style of programming that favors explicit management of the data flowing between a non-UI data model (typically retrieved from a server) and a UI-oriented form model that retains the states and values of the HTML controls on screen. Reactive forms offer the ease of using reactive patterns, testing, and validation.`,
        breadcrumbs: [
          {
            text: 'User Interface',
            disabled: false
          },
          {
            text: 'Google Material Icons',
            disabled: true
          }
        ],
        search: '',
        icons: GoogleIcons
      }
    },
    computed: {
      filteredItems () {
        const searchRegex = new RegExp(this.search, 'i')
        return this.icons.filter(event =>
          !this.search || searchRegex.test(event.keywords) || searchRegex.test(event.state))
      }
    }
  }
</script>
