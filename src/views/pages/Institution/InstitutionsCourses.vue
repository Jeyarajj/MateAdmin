<template>
  <div>
    <v-toolbar flat extended class="transparent section-definition-toolbar">
      <v-avatar class="box-glow" tile>
        <v-icon dark v-html="icon" v-if="icon"></v-icon>
        <span v-else>{{ title | first2Char }}</span>
      </v-avatar>
      <v-toolbar-title class="primary--text">{{ title }}</v-toolbar-title>
      <v-toolbar-title class="toobar-extension" slot="extension">
        <v-breadcrumbs :items="breadcrumbs" class="pl-0">
          <v-icon slot="divider" color="primary">chevron_right</v-icon>
        </v-breadcrumbs>
        <slot></slot>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" persistent max-width="900px">
        <v-btn slot="activator" @click="openEditCourse()" color="primary" dark class="mb-2">
          <v-icon left dark>add_circle</v-icon>Add New Course
        </v-btn>
        <v-card>
          <v-card-title>
            <v-layout>
              <v-flex row xs6>
                <span class="v-toolbar__title primary--text">{{ formTitle }}</span>
              </v-flex>
              <v-flex row xs6 text-xs-right>
                <v-btn flat icon color="primary" @click.native="close()">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="defaultCourse._details.name" label="Course name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="defaultCourse._details.degree" label="Degree"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="course_level"
                    v-model="defaultCourse._details.courseLevel"
                    label="Course Level"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="defaultCourse._details.courseFee" label="Course Fee"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="defaultCourse._details.courseDuration"
                    label="Course Duration"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-menu
                    ref="menu1"
                    :close-on-content-click="false"
                    v-model="startdate"
                    :nudge-right="40"
                    :return-value.sync="defaultCourse._details.startDate"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="defaultCourse._details.startDate"
                      label="Start Date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="defaultCourse._details.startDate" color="primary" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="startdate = false">Cancel</v-btn>
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.menu1.save(defaultCourse._details.startDate)"
                      >OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-menu
                    ref="menu2"
                    :close-on-content-click="false"
                    v-model="enddate"
                    :nudge-right="40"
                    :return-value.sync="defaultCourse._details.endDate"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="defaultCourse._details.endDate"
                      label="End Date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="defaultCourse._details.endDate" color="primary" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="enddate = false">Cancel</v-btn>
                      <v-btn
                        flat
                        color="primary"
                        @click="$refs.menu2.save(defaultCourse._details.endDate)"
                      >OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select :items="mode" v-model="defaultCourse._details.mode" label="Mode"></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="course_mode"
                    v-model="defaultCourse._details.courseMode"
                    label="Course Mode"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="institutions"
                    item-text="_details.name"
                    item-value="_id"
                    v-model="defaultCourse._details.university_id"
                    label="University"
                  ></v-select>
                  <!-- <v-text-field v-model="defaultCourse.university_id" label="University"></v-text-field> -->
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="defaultCourse._details.website" label="Website URL"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea v-model="defaultCourse._details.description" auto-grow rows="1" label="Description"></v-textarea>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-select
                    :items="status"
                    v-model="defaultCourse._details.status"
                    label="Course Status"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="normal" @click="close">Cancel</v-btn>
            <v-btn color="green" dark @click="saveData">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table :headers="headers" :items="courselists" :hide-actions="true" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="justify-center">{{ props.item._details.name }}</td>
        <td class="justify-center">{{ props.item._details.courseLevel }}</td>
        <td class="justify-center">{{ props.item._details.degree }}</td>
        <td class="justify-center">{{ props.item.status }}</td>

        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon v-if="props.item.status != 'disable'" small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <Pagination/>
  </div>
</template>

<script>
import Pagination from "@/components/shared/Pagination";
import { Course } from "../../../dto/courses";
import { University } from "../../../dto/university";

export default {
  components: {
    Pagination
  },
  data: () => ({
    defaultCourse: Course,
    title: "Manage Courses",
    icon: "playlist_add_check",
    breadcrumbs: [
      {
        text: "Home",
        disabled: true
      },
      {
        text: "Institutions",
        disabled: true
      },
      {
        text: "Manage Courses",
        disabled: true
      }
    ],
    dialog: false,
    courselists: [],
    courseLimit:10,
    institutions: [],
    course_level: ["Under Graduate", "Post Graduate"],
    mode: ["Full Time", "Part Time"],
    course_mode: ["Classroom", "Online"],
    status: ["enable", "disable"],
    startdate: false,
    enddate: false,
    menu1: false,
    searchCourse: "",
    menu2: false,
    currentIndex: null,
    totalPages: null,
    currentPage: null,
    courseListLimit: 10,
    headers: [
      {
        text: "Course Name",
        align: "left",
        sortable: false,
        value: "course_name"
      },
      { text: "Couse Level", value: "course_level" },
      { text: "Degree", value: "degree" },
      { text: "Status", value: "status" }
    ],
    coursedata: "",
    editedIndex: -1
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Course" : "Edit Course";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    $route(to, from) {
      this.getCourses(to.query.pageindex);
    }
  },

  created() {
    this.defaultCourse = new Course();
    this.getCourses(this.$route.query.pageindex);
    this.getInstitutes();
    this.initialize();
  },

  methods: {
    async getCourses(page) {
      if (page === undefined) page = 0;
      const courses = await Course.getCourses(this.courseLimit,page);
      this.courselists = [];
      if (courses) {
        courses.data.getCoursesList.courses.forEach(element => {
          this.courselists.push(new Course(element));
        });
        this.$store.commit("SET_PAGES_DATA", {
          currentIndex: this.$route.query.pageindex,
          totalPages: courses.data.getCoursesList.total_pages,
          currentPage: courses.data.getCoursesList.current,
          listLimit: this.courseLimit
        });
      }
    },
    async getInstitutes() {
      const universities = await University.getUniversities(100,0);
      this.institutions = [];
      if (universities) {
        universities.data.getUniversities.university.forEach(element => {
          this.institutions.push(new University(element));
        });
      }
    },
    initialize() {},
    openEditCourse() {
      this.defaultCourse = new Course();
    },
    editItem(item) {
      this.defaultCourse = new Course(item);
      this.dialog = true;
    },

    deleteItem(item) {
      // let data = item;
      // const index = this.courseResults.indexOf(item);
      // confirm("Are you sure you want to delete this item?") &&
      //   this.deleteCourse(data);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async saveData() {
      const res = await this.defaultCourse.createCourse();
      console.log(res);
      if (res.data.hasOwnProperty("createCourse")) {
        this.defaultCourse._id = res.data.createCourse._id;
        this.courselists.push(this.defaultCourse);
      }
      this.close();
    }
  }
};
</script>