<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Student</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    Student Profile
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
    acitvity: {{defaultStudent.profile.Settings.privacy.activity}}
    <br>
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