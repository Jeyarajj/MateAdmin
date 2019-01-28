<template>
  <div>
    <section-definition :title="title" :breadcrumbs="breadcrumbs" :icon="icon"></section-definition>
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12>
          <v-tabs
            light
            color="white"
            show-arrows
          >
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab
              v-for="(tab, i) in tabs"
              :key="i"
              :href="'#'+ tab + '-' + i"
            >
              {{ tab }}
            </v-tab>
            <v-tabs-items>
              <v-tab-item
                v-for="(tab, i) in tabs"
                :key="i"
                :id="tab + '-' + i"
              >
                <component :is="tab"></component>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import Examples from '@/examples/helpers/index'
  export default {
    components: {
      ...Examples
    },
    data () {
      return {
        title: 'Helpers',
        icon: 'help',
        // tabs: ['Visibility'],
        tabs: ['Contents', 'Alignment', 'Spacing', 'Visibility'],
        breadcrumbs: [
          {
            text: 'User Interface',
            disabled: false,
            href: 'dashboard'
          },
          {
            text: 'Helper Classes',
            disabled: true
          }
        ],
        search: ''
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .component-example__container
    > div, dl
      width: 100%
      &:after
        content:""
        display: table
        clear: both

    .headings
      dt, dd
        float: left

      dt
        width: 32px
        height: 32px
        border-radius: 50%
        text-align: center
        line-height: 32px
        color: #fff
        clear: both

      dd
        margin: 0 0 3rem 2rem

        > div
          margin-bottom: 16px

        strong
          margin-right: 16px
</style>
