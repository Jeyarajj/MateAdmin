<template>
  <div>
    <section-definition :title="title" :breadcrumbs="breadcrumbs" :icon="icon"></section-definition>
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 sm8 md12>
          <section-header v-if="contentHeadline" v-text="contentHeadline"></section-header>
          <div class="subheading justify" v-html="description"></div>
          <div class="my-2"></div>
        </v-flex>
      </v-layout>
      <v-layout row wrap id="typography-view">
        <v-flex xs12>
          <div class="component-example">
            <div class="component-example__container">
              <dl class="headings">
                <dt class="primary">h1</dt>
                <dd>
                  <div class="display-4 grey--text text--darken-1">Light 112sp</div><strong>display-4</strong><span>font-weight 300</span>
                  <!-- <markup lang="html" parsedata="`<span>font-weight 300</span>`"></markup> -->
                  <markup lang="html">&lt;div class=&quot;display-4 grey--text text--darken-1&quot;&gt;Light 112sp&lt;/div&gt;</markup>
                </dd>
                <dt class="primary">h2</dt>
                <dd>
                  <div class="display-3 grey--text text--darken-1">Regular 56sp</div><strong>display-3</strong><span>font-weight 400</span>
                  <markup lang="html">&lt;div class=&quot;display-3 grey--text text--darken-1&quot;&gt;Regular 56sp&lt;/div&gt;</markup>
                </dd>
                <dt class="primary">h3</dt>
                <dd>
                  <div class="display-2 grey--text text--darken-1">Regular 45sp</div><strong>display-2</strong><span>font-weight 400</span>
                  <markup lang="html">&lt;div class=&quot;display-2 grey--text text--darken-1&quot;&gt;Regular 45sp&lt;/div&gt;</markup>
                </dd>
                <dt class="primary">h4</dt>
                <dd>
                  <div class="display-1 grey--text text--darken-1">Regular 34sp</div><strong>display-1</strong><span>font-weight 400</span>
                  <markup lang="html">&lt;div class=&quot;display-1 grey--text text--darken-1&quot;&gt;Regular 34sp&lt;/div&gt;</markup>
                </dd>
                <dt class="primary">h5</dt>
                <dd>
                  <div class="headline grey--text text--darken-1">Regular 24sp</div><strong>headline</strong><span>font-weight 400</span>
                  <markup lang="html">&lt;div class=&quot;headline grey--text text--darken-1&quot;&gt;Regular 24sp&lt;/div&gt;</markup>
                </dd>
                <dt class="primary">h6</dt>
                <dd>
                  <div class="title grey--text text--darken-1">Medium 20sp</div><strong>title</strong><span>font-weight 500</span>
                  <markup lang="html">&lt;div class=&quot;title grey--text text--darken-1&quot;&gt;Medium 20sp&lt;/div&gt;</markup>
                </dd>
                <dt class="primary">s</dt>
                <dd>
                  <div class="subheading grey--text text--darken-1">Regular 16sp</div><strong>subheading</strong><span>font-weight 400</span>
                  <markup lang="html">&lt;div class=&quot;subheading grey--text text--darken-1&quot;&gt;Regular 16sp&lt;/div&gt;</markup>
                </dd>
                <dt class="primary">b2</dt>
                <dd>
                  <div class="body-2 grey--text text--darken-1">Medium 14sp</div><strong>body-2</strong><span>font-weight 500</span>
                  <markup lang="html">&lt;div class=&quot;body-2 grey--text text--darken-1&quot;&gt;Medium 14sp&lt;/div&gt;</markup>
                </dd>
                <dt class="primary">b1</dt>
                <dd>
                  <div class="body-1 grey--text text--darken-1">Regular 14sp</div><strong>body-1</strong><span>font-weight 400</span>
                  <markup lang="html">&lt;div class=&quot;body-1 grey--text text--darken-1&quot;&gt;Regular 14sp&lt;/div&gt;</markup>
                </dd>
                <dt class="primary">c</dt>
                <dd>
                  <div class="caption grey--text text--darken-1">Regular 12sp</div><strong>caption</strong><span>font-weight 400</span>
                  <markup lang="html">&lt;div class=&quot;caption grey--text text--darken-1&quot;&gt;Regular 12sp&lt;/div&gt;</markup>
                </dd>
                <dt class="primary">BL</dt>
                <dd>
                  <blockquote>
                    &#8220;First, solve the problem. Then, write the code.&#8221;
                    <footer>
                      <small>
                        <em>&mdash;John Johnson</em>
                      </small>
                    </footer>
                  </blockquote>
                  <markup lang="html">&lt;blockquote&gt;
  &amp;#8220;First, solve the problem. Then, write the code.&amp;#8221;
  &lt;footer&gt;
    &lt;small&gt;
      &lt;em&gt;&amp;mdash;John Johnson&lt;/em&gt;
    &lt;/small&gt;
  &lt;/footer&gt;
&lt;/blockquote&gt;</markup>
                </dd>
              </dl>
            </div>
          </div>
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
        title: 'Typography',
        contentHeadline: 'Typography',
        icon: 'text_fields',
        description: `The typography of an application is just as important as its functionality. Vuetify.js uses the Material Design spec Roboto Font. Each heading size also has a corresponding helper class to style other elements the same.`,
        breadcrumbs: [
          {
            text: 'User Interface',
            disabled: false
          },
          {
            text: 'Typography',
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
<style lang="stylus" scoped>
  #typography-view
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
