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

    <v-layout row pb-2>
     <v-flex xs12>
            <v-card color="primary" class="white--text">
              <v-layout row>
                <v-flex xs5 md2>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                    height="125px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex xs7 md10>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{defaultStudent.profile.name}}</div>
                      <div>{{defaultStudent.email}}</div>
                      <div>{{defaultStudent.profile.student_id}}</div>
                      <div>{{defaultStudent.profile.gender}}</div>
                      <div>{{defaultStudent.profile.dob}}</div>
                    </div>
                  </v-card-title>
                </v-flex>                
              </v-layout>
              <v-divider light></v-divider>
            </v-card>
          </v-flex>
    </v-layout>

    <v-layout row pb-2>
      <v-flex md12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text">Education</v-toolbar-title>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text>

          <div v-for="(eduItem,eduIndex) in defaultStudent.profile.education" :key="'edu'+eduIndex">
            {{eduItem.degree}}
            <br>
            {{eduItem.institution}}
            <br>
            {{eduItem.start_date}}
            <br>
            {{eduItem.end_date}}
            <br>
          </div>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row pb-2>
      <v-flex md12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text">Work Experience</v-toolbar-title>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text>

          <div v-for="(workItem,workIndex) in defaultStudent.profile.work" :key="'work'+workIndex">
          {{workItem.position}}
          <br>
          {{workItem.company}}
          <br>
          {{workItem.address}}
          <br>
          {{workItem.start_date}}
          <br>
          {{workItem.end_date}}
          <br>
        </div>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row pb-2>
      <v-flex md12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text">Scores</v-toolbar-title>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text>

          <div v-for="(scoreItem,scoreIndex) in defaultStudent.profile.scores" :key="'score'+scoreIndex">
          {{scoreItem.title}}
          <br>
          {{scoreItem.score}}
          <br>
        </div>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row pb-2>
      <v-flex md12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text">Others</v-toolbar-title>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text>

         {{defaultStudent.profile.nationality}}
          <br>
          <div v-for="(otherItem,Otherindex) in defaultStudent.profile.Others" :key="'other'+Otherindex">
            {{otherItem.other_key}}
            <br>
            {{otherItem.value}}
            <br>
          </div>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row pb-2>
      <v-flex md12>
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text">Settings</v-toolbar-title>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text>

         Language: {{defaultStudent.profile.Settings.language}}
          <br>Privacy
          <br>
          profile: {{defaultStudent.profile.Settings.privacy.profile}}
          <br>
          mail: {{defaultStudent.profile.Settings.privacy.mail}}
          <br>
          contact: {{defaultStudent.profile.Settings.privacy.contact}}
          <br>
          activity: {{defaultStudent.profile.Settings.privacy.activity}}

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>


    <!-- Student Profile
    ID: {{defaultStudent._id}}
    <br>

    Email: {{defaultStudent.email}}
    <br>Profile
    <br>
    Name: {{defaultStudent.profile.name}}
    <br>
    City: {{defaultStudent.profile.city}}
    <br>
    country: {{defaultStudent.profile.country}}
    <br>
    Student ID: {{defaultStudent.profile.student_id}}
    <br>
    gender: {{defaultStudent.profile.gender}}
    <br>
    dob: {{defaultStudent.profile.dob}}
    <br>Education:
    <div v-for="(eduItem,eduIndex) in defaultStudent.profile.education" :key="'edu'+eduIndex">
      {{eduItem.degree}}
      <br>
      {{eduItem.institution}}
      <br>
      {{eduItem.start_date}}
      <br>
      {{eduItem.end_date}}
      <br>
    </div>
    <br>Work:
    <div v-for="(workItem,workIndex) in defaultStudent.profile.work" :key="'work'+workIndex">
      {{workItem.position}}
      <br>
      {{workItem.company}}
      <br>
      {{workItem.address}}
      <br>
      {{workItem.start_date}}
      <br>
      {{workItem.end_date}}
      <br>
    </div>
    <br>Scores:
    <template>

    <div v-for="(scoreItem,scoreIndex) in defaultStudent.profile.scores" :key="'score'+scoreIndex">
      {{scoreItem.title}}
      <br>
      {{scoreItem.score}}
      <br>
    </div>
    </template>
    <br>
    Nationality: {{defaultStudent.profile.nationality}}
    <br>Others:
    <div v-for="(otherItem,Otherindex) in defaultStudent.profile.Others" :key="'other'+Otherindex">
      {{otherItem.other_key}}
      <br>
      {{otherItem.value}}
      <br>
    </div>

    <br>
    <br>Settings
    <br>
    Language: {{defaultStudent.profile.Settings.language}}
    <br>Privacy
    <br>
    profile: {{defaultStudent.profile.Settings.privacy.profile}}
    <br>
    mail: {{defaultStudent.profile.Settings.privacy.mail}}
    <br>
    contact: {{defaultStudent.profile.Settings.privacy.contact}}
    <br>
    activity: {{defaultStudent.profile.Settings.privacy.activity}}
    <br> -->
    
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { imageType } from "../../../dto/imageType";
import { Student } from "../../../dto/student";
import { QUERIES } from "@/gql-constants/students";
export default {
  validations: {},
  validationMessages: {},
  data: () => ({
    title: 'Students Applications List',
    icon: 'playlist_add_check',
    breadcrumbs: [
    {
      text: 'Home',
      disabled: true
    },
    {
      text: 'Students',
      disabled: true
    },
    {
      text: 'Students Applications List',
      disabled: true
    }
    ],
    studentsList: [],
    defaultStudent: Student,
    dialog: false
  }),
  computed: {
    ...mapGetters([])
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    async getStudent() {
      if (this.$route.params.student_id) {
        const studentInfo = await Student.getStudent(
          this.$route.params.student_id
        );
        console.log(studentInfo.data.studentInfo);
        this.defaultStudent = new Student(studentInfo.data.studentInfo);
      }
    }
  },
  created() {
    this.defaultStudent = new Student();
    this.getStudent();
  }
};
</script>