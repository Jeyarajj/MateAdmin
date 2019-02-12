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
          <v-btn slot="activator" color="primary" dark class="mb-2">
            <v-icon left dark>add_circle</v-icon>Add New Course</v-btn>
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
                    <v-text-field v-model="editedItem.name" label="Course name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="editedItem.degree" label="Degree"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      :items="course_level"
                      v-model="editedItem.course_level"
                      label="Course Level"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.course_fee" label="Course Fee"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.course_duration" label="Course Duration"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-menu
                      ref="menu1"
                      :close-on-content-click="false"
                      v-model="startdate"
                      :nudge-right="40"
                      :return-value.sync="editedItem.startdate"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="editedItem.startdate"
                        label="Start Date"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="editedItem.startdate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="startdate = false">Cancel</v-btn>
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.menu1.save(editedItem.startdate)"
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
                      :return-value.sync="editedItem.enddate"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="editedItem.enddate"
                        label="End Date"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="editedItem.enddate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="enddate = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu2.save(editedItem.enddate)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select :items="mode" v-model="editedItem.mode" label="Mode"></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      :items="course_mode"
                      v-model="editedItem.course_mode"
                      label="Course Mode"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      :items="institutionsResults"
                      item-text="name"
                      item-value="_id"
                      v-model="editedItem.university_id"
                      label="University"
                    ></v-select>
                    <!-- <v-text-field v-model="editedItem.university_id" label="University"></v-text-field> -->
                  </v-flex>
                  <v-flex xs12 sm6 md12>
                    <v-text-field v-model="editedItem.website" label="WebSite URL"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-select :items="status" v-model="editedItem.status" label="Course Status"></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="normal" @click="close">Cancel</v-btn>
              <v-btn color="green" dark @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

    <v-data-table :headers="headers" :items="courseResults" :hide-actions="true" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="justify-center">{{ props.item.name }}</td>
        <td class="justify-center">{{ props.item.course_level }}</td>
        <td class="justify-center">{{ props.item.degree }}</td>
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
import {
  GET_COURSES_INDEX,
  UPDATE_COURSE
} from "../../../gql-constants/courses";
import { GET_INSTITUTIONS_INDEX } from "../../../gql-constants/university";
import Pagination from "@/components/shared/Pagination";

export default {
  components: {
    Pagination
  },
  data: () => ({
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
    desserts: [],
    coursedata: "",
    editedIndex: -1,
    editedItem: {
      _id: "",
      startdate: new Date().toISOString().substr(0, 10),
      enddate: new Date().toISOString().substr(0, 10),
      name: "",
      course_level: "",
      course_duration: "",
      degree: "",
      course_fee: "",
      website: "",
      description: "",
      mode: "",
      course_mode: "",
      university_id: "",
      status: "enable"
    },
    defaultItem: {
      startdate: new Date().toISOString().substr(0, 10),
      enddate: new Date().toISOString().substr(0, 10),
      name: "",
      course_level: "",
      course_duration: "",
      course_fee: "",
      degree: "",
      website: "",
      description: "",
      mode: "",
      course_mode: "",
      university_id: "",
      status: "enable"
    }
  }),
  apollo: {
    courseResults: {
      query: GET_COURSES_INDEX,
      variables() {
        return {
          text: this.searchCourse,
          page: {
            from: this.$route.query.pageindex,
            limit: this.courseListLimit
          }
        };
      },
      update(data) {
        this.$store.commit("SET_PAGES_DATA", {
          currentIndex: data.search.course.page.from,
          totalPages: data.search.course.pages.total,
          currentPage: data.search.course.pages.current,
          listLimit: this.courseListLimit
        });
        return data.search.course.items;
      },
      error(error) {
        console.log(error);
      }
    },
    institutionsResults: {
      query: GET_INSTITUTIONS_INDEX,
      variables() {
        return {
          text: "",
          page: {
            from: 0,
            limit: 10
          }
        };
      },
      update(data) {
        return data.search.university.items;
      },
      error(error) {
        console.log(error);
      }
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Course" : "Edit Course";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [];
    },

    editItem(item) {
      this.editedIndex = this.courseResults.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      let data = item;
      const index = this.courseResults.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.deleteCourse(data);
    },
    deleteCourse(item) {
      const index = this.courseResults.indexOf(item);
      item.status = "disable";
      Object.assign(this.courseResults[index], item);

      this.coursedata = {
        id: item._id,
        name: item.name,
        mode: item.mode,
        course_level: item.course_level,
        startdate: item.startdate,
        enddate: item.enddate,
        course_duration: item.course_duration,
        description: item.description,
        status: "disable",
        course_mode: item.course_mode,
        website: item.website,
        university_id: item.university_id,
        course_fee: item.course_fee,
        degree: item.degree,
        duration: item.duration
      };
      this.$apollo
        .mutate({
          mutation: UPDATE_COURSE,
          variables: this.coursedata
        })
        .then(data => {
          console.log("Course Status Updated Successfully");
        })
        .catch(err => {
          console.log(err);
        });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        this.coursedata = {
          id: this.editedItem._id,
          name: this.editedItem.name,
          mode: this.editedItem.mode,
          course_level: this.editedItem.course_level,
          startdate: this.editedItem.startdate,
          enddate: this.editedItem.enddate,
          course_duration: this.editedItem.course_duration,
          description: this.editedItem.description,
          status: this.editedItem.status,
          course_mode: this.editedItem.course_mode,
          website: this.editedItem.website,
          university_id: this.editedItem.university_id,
          course_fee: this.editedItem.course_fee,
          degree: this.editedItem.degree,
          duration: this.editedItem.duration
        };
        Object.assign(this.courseResults[this.editedIndex], this.editedItem);
      } else {
        this.coursedata = {
          name: this.editedItem.name,
          mode: this.editedItem.mode,
          course_level: this.editedItem.course_level,
          startdate: this.editedItem.startdate,
          enddate: this.editedItem.enddate,
          course_duration: this.editedItem.course_duration,
          description: this.editedItem.description,
          status: this.editedItem.status,
          course_mode: this.editedItem.course_mode,
          website: this.editedItem.website,
          university_id: this.editedItem.university_id,
          course_fee: this.editedItem.course_fee,
          degree: this.editedItem.degree,
          duration: this.editedItem.duration
        };
        //Need to update the data in database
      }
      this.$apollo
        .mutate({
          mutation: UPDATE_COURSE,
          variables: this.coursedata
        })
        .then(data => {
          this.editedItem._id = data.data.updateCourse._id;
          if (this.editedIndex == -1) {
            // Only on create condition
            this.courseResults.push(this.editedItem);
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.close();
    }
  }
};
</script>