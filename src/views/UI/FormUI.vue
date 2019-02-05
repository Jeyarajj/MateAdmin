<template>
  <div>
    <section-definition :title="page.title" :breadcrumbs="breadcrumbs" :icon="page.icon"></section-definition>
    <v-container fluid grid-list-xl page>
      <v-layout row wrap>
        <v-flex xs12 sm8 md12>
          <section-header v-text="page.headline"></section-header>
          <div class="subheading justify" v-html="page.description"></div>
          <div class="my-5"></div>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <section id="usage">
            <template v-for="example in examples">
              <example
                :header="`${example.header}`"
                :new-in="example.new"
                :file="`${data.folder}/${example.file}`"
                :inverted="example.inverted"
                :has-inverted="!example.uninverted"
                :id="`example-${camelCaseToDash(example.file)}`"
                :key="example.file"
                :desc="example.desc"
                :showgit="example.git"
                :showcodepan="example.codepan"
              ></example>
            </template>
          </section>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import VuseExampleMixin from '@/mixins/VuseExampleMixin'

  export default {
    mixins: [VuseExampleMixin],
    data () {
      return {
        section: 'vuse',
        component: 'formui',
        page: {
          icon: 'input',
          title: 'Forms UI',
          headline: 'Introduction',
          description: `Vuse reactive forms facilitate a reactive style of programming that favors explicit management of the data flowing between a non-UI data model (typically retrieved from a server) and a UI-oriented form model that retains the states and values of the HTML controls on screen. Reactive forms offer the ease of using reactive patterns, testing, and validation.`
        },
        breadcrumbs: [
          {
            text: 'User Interface',
            disabled: false
          },
          {
            text: 'Forms',
            disabled: true
          }
        ]
      }
    }
  }
</script>
