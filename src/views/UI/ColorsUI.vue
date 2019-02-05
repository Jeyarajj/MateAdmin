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
            icons-and-text
          >
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab
              v-for="(color, i) in colors"
              :key="i"
              :href="'#color-' + i"
            >
              {{i}}
              <!-- <v-tooltip bottom :color="i !== 'white' ? i : 'black'">
                <v-avatar
                  slot="activator"
                  :color="i"
                  size="30"
                > -->
                  <v-icon :color="i">lens</v-icon>
                <!-- </v-avatar>
                <span light>{{i}}</span>
              </v-tooltip> -->
            </v-tab>
            <v-tabs-items class="mt-1 px-4">
              <v-tab-item
                v-for="(color, i) in colors"
                :key="i"
                :id="'color-' + i"
              >
                <v-layout row wrap pa-0 ma-0>
                  <v-flex xs12 px-0
                    v-for="(n, property, index) in color"
                    v-bind:key="index"
                  >
                    <v-card :class="[`box-${i}-${property}-glow`, n.classname]">
                      <v-container fluid grid-list-lg>
                        <v-layout row align-center>
                          <div class="pos-absolute setpost">
                            <!-- <div class="headline">{{ property }}</div> -->
                            <v-btn :class="[`box-${i}-${property}-glow`, ['50', '100', '200', '300', '400'].includes(property) ? 'black--text' : 'white--text', 'ma-0', 'box-50']">{{property}}</v-btn>
                          </div>
                          <v-flex xs4>
                            <div class="title">.{{ n.classname }}</div>
                            <div v-if="['50', '100', '200', '300', '400'].includes(property)">
                              <span v-if="property === '50'">
                                <strong>Background Class: </strong>{{i}} lighten-5 <br>
                                <strong>Text Color Class: </strong>{{i}} --textltext--ighten-5 <br>
                              </span>
                              <span v-else-if="property === '100'">
                                <strong>Background Class: </strong>{{i}} lighten-4 <br>
                                <strong>Text Color Class: </strong>{{i}} --textltext--ighten-4 <br>
                              </span>
                              <span v-else-if="property === '200'">
                                <strong>Background Class: </strong>{{i}} lighten-3 <br>
                                <strong>Text Color Class: </strong>{{i}} --textltext--ighten-3 <br>
                              </span>
                              <span v-else-if="property === '300'">
                                <strong>Background Class: </strong>{{i}} lighten-2 <br>
                                <strong>Text Color Class: </strong>{{i}} --textltext--ighten-2 <br>
                              </span>
                              <span v-else-if="property === '400'">
                                <strong>Background Class: </strong>{{i}} lighten-1 <br>
                                <strong>Text Color Class: </strong>{{i}} --textltext--ighten-1 <br>
                              </span>
                            </div>
                            <div
                              v-else-if="['600', '700', '800', '900'].includes(property)">
                              <span v-if="property === '600'">
                                <strong>Background Class: </strong>{{i}} darken-1 <br>
                                <strong>Text Color Class: </strong>{{i}}--text text--darken-1 <br>
                              </span>
                              <span v-else-if="property === '700'">
                                <strong>Background Class: </strong>{{i}} darken-2 <br>
                                <strong>Text Color Class: </strong>{{i}}--text text--darken-2 <br>
                              </span>
                              <span v-else-if="property === '800'">
                                <strong>Background Class: </strong>{{i}} darken-3 <br>
                                <strong>Text Color Class: </strong>{{i}}--text text--darken-3 <br>
                              </span>
                              <span v-else-if="property === '900'">
                                <strong>Background Class: </strong>{{i}} darken-4 <br>
                                <strong>Text Color Class: </strong>{{i}}--text text--darken-4 <br>
                              </span>
                            </div>
                            <div v-else-if="['a100', 'a200', 'a400', 'a700'].includes(property)">
                              <span v-if="property === 'a100'">
                                <strong>Background Class: </strong>{{i}} accent-1 <br>
                                <strong>Text Color Class: </strong>{{i}}--text text--accent-1 <br>
                              </span>
                              <span v-else-if="property === 'a200'">
                                <strong>Background Class: </strong>{{i}} accent-2 <br>
                                <strong>Text Color Class: </strong>{{i}}--text text--accent-2 <br>
                              </span>
                              <span v-else-if="property === 'a400'">
                                <strong>Background Class: </strong>{{i}} accent-3 <br>
                                <strong>Text Color Class: </strong>{{i}}--text text--accent-3 <br>
                              </span>
                              <span v-else-if="property === 'a700'">
                                <strong>Background Class: </strong>{{i}} accent-4 <br>
                                <strong>Text Color Class: </strong>{{i}}--text text--accent-4 <br>
                              </span>
                            </div>
                            <div v-else>
                              <span>
                                <strong>Background Class: </strong>{{i}} accent-4 <br>
                                <strong>Text Color Class: </strong>{{i}}--text text--accent-4 <br>
                              </span>
                            </div>
                          </v-flex>
                          <!--  -->
                          <v-flex xs4>
                            <template v-if="['50', '100', '200', '300', '400'].includes(property)">
                              <div v-if="property === '50'">
                                <v-btn dark :class="[i + '--text', 'text--lighten-5']">Button</v-btn>
                              </div>
                              <div v-else-if="property === '100'">
                                <v-btn dark :class="[i + '--text', 'text--lighten-4']">Button</v-btn>
                              </div>
                              <div v-else-if="property === '200'">
                                <v-btn dark :class="[i + '--text', 'text--lighten-3']">Button</v-btn>
                              </div>
                              <div v-else-if="property === '300'">
                                <v-btn dark :class="[i + '--text', 'text--lighten-2']">Button</v-btn>
                              </div>
                              <div v-else-if="property === '400'">
                                <v-btn dark :class="[i + '--text', 'text--lighten-1']">Button</v-btn>
                              </div>
                            </template>

                            <template v-else-if="['600', '700', '800', '900'].includes(property)">
                              <div v-if="property === '900'">
                                <v-btn :class="[i + '--text', 'text--darken-4']">Button</v-btn>
                              </div>
                              <div v-else-if="property === '800'">
                                <v-btn :class="[i + '--text', 'text--darken-3']">Button</v-btn>
                              </div>
                              <div v-else-if="property === '700'">
                                <v-btn :class="[i + '--text', 'text--darken-2']">Button</v-btn>
                              </div>
                              <div v-else-if="property === '600'">
                                <v-btn :class="[i + '--text', 'text--darken-1']">Button</v-btn>
                              </div>
                            </template>

                            <template v-else-if="['a100', 'a200', 'a400', 'a700'].includes(property)">
                              <div v-if="property === 'a700'">
                                <v-btn :class="[i + '--text', 'text--accent-4']">Button</v-btn>
                              </div>
                              <div v-else-if="property === 'a400'">
                                <v-btn :class="[i + '--text', 'text--accent-3']">Button</v-btn>
                              </div>
                              <div v-else-if="property === 'a200'">
                                <v-btn :class="[i + '--text', 'text--accent-2']">Button</v-btn>
                              </div>
                              <div v-else-if="property === 'a100'">
                                <v-btn :class="[i + '--text', 'text--accent-1']">Button</v-btn>
                              </div>
                            </template>

                            <template v-else>
                              <v-btn :class="[i + '--text']" light>Button</v-btn>
                            </template>
                          </v-flex>
                          <v-flex xs4>
                            <v-card :class="['elevation-1', ['50', '100', '200', '300', '400'].includes(property) ? 'black' : '']"
                              height="150px"
                            >
                              <v-card-text class="text-xs-center">
                                <p>.{{ n.classname }}</p>
                                <template v-if="['50', '100', '200', '300', '400'].includes(property)">
                                  <div v-if="property === '50'">
                                    <p :class="[i + '--text', 'text--lighten-5']">.{{ n.classname }}</p>
                                    <v-btn dark :class="[i + '--text', 'text--lighten-5']">Button</v-btn>
                                  </div>
                                  <div v-else-if="property === '100'">
                                    <p :class="[i + '--text', 'text--lighten-4']">.{{ n.classname }}</p>
                                    <v-btn dark :class="[i + '--text', 'text--lighten-4']">Button</v-btn>
                                  </div>
                                  <div v-else-if="property === '200'">
                                    <p :class="[i + '--text', 'text--lighten-3']">.{{ n.classname }}</p>
                                    <v-btn dark :class="[i + '--text', 'text--lighten-3']">Button</v-btn>
                                  </div>
                                  <div v-else-if="property === '300'">
                                    <p :class="[i + '--text', 'text--lighten-2']">.{{ n.classname }}</p>
                                    <v-btn dark :class="[i + '--text', 'text--lighten-2']">Button</v-btn>
                                  </div>
                                  <div v-else-if="property === '400'">
                                    <p :class="[i + '--text', 'text--lighten-1']">.{{ n.classname }}</p>
                                    <v-btn dark :class="[i + '--text', 'text--lighten-1']">Button</v-btn>
                                  </div>
                                </template>

                                <template v-else-if="['600', '700', '800', '900'].includes(property)">
                                  <div v-if="property === '900'">
                                    <p :class="[i + '--text', 'text--darken-4']">.{{ n.classname }}</p>
                                    <v-btn :class="[i + '--text', 'text--darken-4']">Button</v-btn>
                                  </div>
                                  <div v-else-if="property === '800'">
                                    <p :class="[i + '--text', 'text--darken-3']">.{{ n.classname }}</p>
                                    <v-btn :class="[i + '--text', 'text--darken-3']">Button</v-btn>
                                  </div>
                                  <div v-else-if="property === '700'">
                                    <p :class="[i + '--text', 'text--darken-2']">.{{ n.classname }}</p>
                                    <v-btn :class="[i + '--text', 'text--darken-2']">Button</v-btn>
                                  </div>
                                  <div v-else-if="property === '600'">
                                    <p :class="[i + '--text', 'text--darken-1']">.{{ n.classname }}</p>
                                    <v-btn :class="[i + '--text', 'text--darken-1']">Button</v-btn>
                                  </div>
                                </template>

                                <template v-else-if="['a100', 'a200', 'a400', 'a700'].includes(property)">
                                  <div v-if="property === 'a700'">
                                    <p :class="[i + '--text', 'text--accent-4']">.{{ n.classname }}</p>
                                    <v-btn :class="[i + '--text', 'text--accent-4']">Button</v-btn>
                                  </div>
                                  <div v-else-if="property === 'a400'">
                                    <p :class="[i + '--text', 'text--accent-3']">.{{ n.classname }}</p>
                                    <v-btn :class="[i + '--text', 'text--accent-3']">Button</v-btn>
                                  </div>
                                  <div v-else-if="property === 'a200'">
                                    <p :class="[i + '--text', 'text--accent-2']">.{{ n.classname }}</p>
                                    <v-btn :class="[i + '--text', 'text--accent-2']">Button</v-btn>
                                  </div>
                                  <div v-else-if="property === 'a100'">
                                    <p :class="[i + '--text', 'text--accent-1']">.{{ n.classname }}</p>
                                    <v-btn :class="[i + '--text', 'text--accent-1']">Button</v-btn>
                                  </div>
                                </template>

                                <template v-else>
                                  <p :class="[i + '--text']">.{{ n.classname }}</p>
                                  <v-btn :class="[i + '--text']" light>Button</v-btn>
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
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 sm8 md12>
          <div class="subheading justify" v-html="description"></div>
          <div class="my-2"></div>
          <p class="subheading justify">You can change a background or text color by adding a class to the element. For background, use just the name, for example, <code>&lt;div class="red"&gt;</code> or use our theme-builder classes <code>&lt;div class="md-{colorname}-{pelette-code}"&gt;</code> as example <code>md-red-500</code>. To use a shade, just add the modifying type, such as, <strong>darken-3</strong>. Text is very similar, adding a modification class, <strong>red--text</strong>, you can change the color of text, or change the type with adding <strong>text--lighten-2</strong>. For some elements like the <code>v-badge</code>, you can use the <em>--after</em> type for the background, <code>&lt;span class="green--after" v-badge:5&gt;</code>.</p>
          <div class="my-2"></div>
          <p class="subheading justify">Each color from the spec gets converted to a <strong>background</strong> and <strong>text</strong> variant for styling within your application through a class, e.g. <code>&lt;div class="red"&gt;</code> or <code>&lt;span class="red--text"&gt;</code>. These class colors are defined <a href="https://github.com/vuetifyjs/vuetify/blob/master/src/stylus/settings/_colors.styl">here</a>.</p>
          <div class="my-2"></div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
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
        colors
      }
    }
  }
</script>
<style>
  .setpost {
    top: -10px;
    left: -10px;
  }
</style>
