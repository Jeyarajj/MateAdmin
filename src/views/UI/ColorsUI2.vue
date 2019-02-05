<template>
  <div>
    <section-definition :title="title" :breadcrumbs="breadcrumbs" :icon="icon"></section-definition>
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex class="colorbar">
          <vertical-tabs vertical-text :height="height" v-model="tab" :items="colors" class="mt-0"></vertical-tabs>
        </v-flex>
        <v-flex class="shadebar" v-if="activeTab">
          <v-layout row wrap pa-0 ma-0 class="sectionIn">
            <v-flex xs12
              pt-0
              v-for="(n, property, index) in activeTab"
              v-bind:key="index"
            >
              <v-card :class="[`box-${activeTabIndex}-${property}-glow`]">
                <v-container fluid grid-list-lg>
                  <v-layout row align-center>
                    <v-flex xs3>
                      <div
                        class="headline"
                        >{{ property }}</div>
                    </v-flex>
                    <v-flex xs4>
                      <div class="title">.{{ n.classname }}</div>
                      <div v-if="['50', '100', '200', '300', '400'].includes(property)">
                        <span v-if="property === '50'">
                          <strong>Background Class: </strong>{{activeTabIndex}} lighten-5<br>
                          <strong>Text Color Class: </strong>{{activeTabIndex}}--text text--lighten-5
                        </span>
                        <span v-else-if="property === '100'">
                          <strong>Background Class: </strong>{{activeTabIndex}} lighten-4<br>
                          <strong>Text Color Class: </strong>{{activeTabIndex}}--text text--lighten-4
                        </span>
                        <span v-else-if="property === '200'">
                          <strong>Background Class: </strong>{{activeTabIndex}} lighten-3<br>
                          <strong>Text Color Class: </strong>{{activeTabIndex}}--text text--lighten-3
                        </span>
                        <span v-else-if="property === '300'">
                          <strong>Background Class: </strong>{{activeTabIndex}} lighten-2<br>
                          <strong>Text Color Class: </strong>{{activeTabIndex}}--text text--lighten-2
                        </span>
                        <span v-else-if="property === '400'">
                          <strong>Background Class: </strong>{{activeTabIndex}} lighten-1<br>
                          <strong>Text Color Class: </strong>{{activeTabIndex}}--text text--lighten-1
                        </span>
                      </div>
                      <div
                        v-else-if="['600', '700', '800', '900'].includes(property)">
                        <span v-if="property === '600'">
                          <strong>Background Class: </strong>{{activeTabIndex}} darken-1<br>
                          <strong>Text Color Class: </strong>{{activeTabIndex}}--text text--darken-1
                        </span>
                        <span v-else-if="property === '700'">
                          <strong>Background Class: </strong>{{activeTabIndex}} darken-2<br>
                          <strong>Text Color Class: </strong>{{activeTabIndex}}--text text--darken-2
                        </span>
                        <span v-else-if="property === '800'">
                          <strong>Background Class: </strong>{{activeTabIndex}} darken-3<br>
                          <strong>Text Color Class: </strong>{{activeTabIndex}}--text text--darken-3
                        </span>
                        <span v-else-if="property === '900'">
                          <strong>Background Class: </strong>{{activeTabIndex}} darken-4<br>
                          <strong>Text Color Class: </strong>{{activeTabIndex}}--text text--darken-4
                        </span>
                      </div>
                      <div v-else-if="['a100', 'a200', 'a400', 'a700'].includes(property)">
                        <span v-if="property === 'a100'">
                          <strong>Background Class: </strong>{{activeTabIndex}} accent-1<br>
                          <strong>Text Color Class: </strong>{{activeTabIndex}}--text text--accent-1
                        </span>
                        <span v-else-if="property === 'a200'">
                          <strong>Background Class: </strong>{{activeTabIndex}} accent-2<br>
                          <strong>Text Color Class: </strong>{{activeTabIndex}}--text text--accent-2
                        </span>
                        <span v-else-if="property === 'a400'">
                          <strong>Background Class: </strong>{{activeTabIndex}} accent-3<br>
                          <strong>Text Color Class: </strong>{{activeTabIndex}}--text text--accent-3
                        </span>
                        <span v-else-if="property === 'a700'">
                          <strong>Background Class: </strong>{{activeTabIndex}} accent-4<br>
                          <strong>Text Color Class: </strong>{{activeTabIndex}}--text text--accent-4
                        </span>
                      </div>
                      <div v-else></div>
                    </v-flex>
                    <v-flex xs5>
                      <v-card :class="['elevation-1', ['50', '100', '200', '300', '400'].includes(property) ? 'black' : '']"
                        height="150px"
                      >
                        <v-card-text class="text-xs-center">
                          <p>.{{ n.classname }}</p>
                          <template v-if="['50', '100', '200', '300', '400'].includes(property)">
                            <div v-if="property === '50'">
                              <p :class="[activeTabIndex + '--text', 'text--lighten-5']">.{{ n.classname }}</p>
                              <v-btn dark :class="[activeTabIndex + '--text', 'text--lighten-5']">Button</v-btn>
                            </div>
                            <div v-else-if="property === '100'">
                              <p :class="[activeTabIndex + '--text', 'text--lighten-4']">.{{ n.classname }}</p>
                              <v-btn dark :class="[activeTabIndex + '--text', 'text--lighten-4']">Button</v-btn>
                            </div>
                            <div v-else-if="property === '200'">
                              <p :class="[activeTabIndex + '--text', 'text--lighten-3']">.{{ n.classname }}</p>
                              <v-btn dark :class="[activeTabIndex + '--text', 'text--lighten-3']">Button</v-btn>
                            </div>
                            <div v-else-if="property === '300'">
                              <p :class="[activeTabIndex + '--text', 'text--lighten-2']">.{{ n.classname }}</p>
                              <v-btn dark :class="[activeTabIndex + '--text', 'text--lighten-2']">Button</v-btn>
                            </div>
                            <div v-else-if="property === '400'">
                              <p :class="[activeTabIndex + '--text', 'text--lighten-1']">.{{ n.classname }}</p>
                              <v-btn dark :class="[activeTabIndex + '--text', 'text--lighten-1']">Button</v-btn>
                            </div>
                          </template>

                          <template v-else-if="['600', '700', '800', '900'].includes(property)">
                            <div v-if="property === '900'">
                              <p :class="[activeTabIndex + '--text', 'text--darken-4']">.{{ n.classname }}</p>
                              <v-btn :class="[activeTabIndex + '--text', 'text--darken-4']">Button</v-btn>
                            </div>
                            <div v-else-if="property === '800'">
                              <p :class="[activeTabIndex + '--text', 'text--darken-3']">.{{ n.classname }}</p>
                              <v-btn :class="[activeTabIndex + '--text', 'text--darken-3']">Button</v-btn>
                            </div>
                            <div v-else-if="property === '700'">
                              <p :class="[activeTabIndex + '--text', 'text--darken-2']">.{{ n.classname }}</p>
                              <v-btn :class="[activeTabIndex + '--text', 'text--darken-2']">Button</v-btn>
                            </div>
                            <div v-else-if="property === '600'">
                              <p :class="[activeTabIndex + '--text', 'text--darken-1']">.{{ n.classname }}</p>
                              <v-btn :class="[activeTabIndex + '--text', 'text--darken-1']">Button</v-btn>
                            </div>
                          </template>

                          <template v-else-if="['a100', 'a200', 'a400', 'a700'].includes(property)">
                            <div v-if="property === 'a700'">
                              <p :class="[activeTabIndex + '--text', 'text--accent-4']">.{{ n.classname }}</p>
                              <v-btn :class="[activeTabIndex + '--text', 'text--accent-4']">Button</v-btn>
                            </div>
                            <div v-else-if="property === 'a400'">
                              <p :class="[activeTabIndex + '--text', 'text--accent-3']">.{{ n.classname }}</p>
                              <v-btn :class="[activeTabIndex + '--text', 'text--accent-3']">Button</v-btn>
                            </div>
                            <div v-else-if="property === 'a200'">
                              <p :class="[activeTabIndex + '--text', 'text--accent-2']">.{{ n }}</p>
                              <v-btn :class="[activeTabIndex + '--text', 'text--accent-2']">Button</v-btn>
                            </div>
                            <div v-else-if="property === 'a100'">
                              <p :class="[activeTabIndex + '--text', 'text--accent-1']">.{{ n.classname }}</p>
                              <v-btn :class="[activeTabIndex + '--text', 'text--accent-1']">Button</v-btn>
                            </div>
                          </template>

                          <template v-else>
                            <p :class="[activeTabIndex + '--text']">.{{ n.classname }}</p>
                            <v-btn :class="[activeTabIndex + '--text']" light>Button</v-btn>
                          </template>
                          <!-- <p :class="[i + '--text']">.{{ n }}</p>
                          <v-btn flat :color="i">Button</v-btn> -->
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <!-- <v-flex class="shadebar" v-if="activeTab">
          <v-tabs
            light
            color="white"
            show-arrows
            hide-slider
          >
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab
              v-for="(color, i) in activeTab"
              :key="i"
              :href="'#color-' + i"
            >
              {{ i }}
            </v-tab>
            <v-tabs-items class="mt-1 px-4">
              <v-tab-item
                v-for="(n, property) in activeTab"
                :key="property"
                :id="'color-' + property"
              >
                <v-card :color="n.classname">
                  <v-container fluid grid-list-lg>
                    <v-layout row align-center>
                      <v-flex xs4>
                        <div class="title">.{{ n.classname }}</div>
                        <div v-if="['50', '100', '200', '300', '400'].includes(property)">
                          <span v-if="property === '50'">lighten-5</span>
                          <span v-else-if="property === '100'">lighten-4</span>
                          <span v-else-if="property === '200'">lighten-3</span>
                          <span v-else-if="property === '300'">lighten-2</span>
                          <span v-else-if="property === '400'">lighten-1</span>
                        </div>
                        <div
                          v-else-if="['600', '700', '800', '900'].includes(property)">
                          <span v-if="property === '600'">darken-1</span>
                          <span v-else-if="property === '700'">darken-2</span>
                          <span v-else-if="property === '800'">darken-3</span>
                          <span v-else-if="property === '900'">darken-4</span>
                        </div>
                        <div v-else-if="['a100', 'a200', 'a400', 'a700'].includes(property)">
                          <span v-if="property === 'a100'">accent-1</span>
                          <span v-else-if="property === 'a200'">accent-2</span>
                          <span v-else-if="property === 'a400'">accent-3</span>
                          <span v-else-if="property === 'a700'">accent-4</span>
                        </div>
                        <div v-else></div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-flex> -->
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {map} from 'lodash'
  import VerticalTabs from '@/components/Elements/VerticalColorTabs'
  import colors from '@/data/json/colors.json'
  export default {
    data () {
      return {
        title: 'Color',
        icon: 'color_lens',
        contentHeadline: 'Color',
        description: `Included with Vuetify is the entire Material Design color library. These color classes drastically help the prototyping phase or make the need for additional color declaration not needed.`,
        breadcrumbs: [
          {
            text: 'User Interface',
            disabled: false
          },
          {
            text: 'Color',
            disabled: true
          }
        ],
        colors,
        tab: null,
        height: document.documentElement.clientHeight - 320
      }
    },
    components: {
      VerticalTabs
    },
    computed: {
      activeTabIndex () {
        const v = map(this.colors, (c, i) => i)
        return v[this.tab]
      },
      activeTab () {
        return this.colors[this.activeTabIndex]
      }
    }
  }
</script>
<style scoped lang="stylus">
  .colorbar
    max-width: 62px
  .shadebar
    width: calc(100% - 62px)
    height: calc(100vh - 310px)
    overflow-y: auto
</style>
