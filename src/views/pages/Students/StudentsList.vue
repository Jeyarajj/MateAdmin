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
    </v-toolbar>
    <v-data-table :headers="headers" :items="studentsList" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td @click="openStudent(props.item._id)">{{ props.item.profile.name }}</td>
        <td class="justify-center">{{ props.item.email }}</td>
        <td class="justify-center">
        <v-switch
        :label="`${props.item.status}`"
        v-model="props.item.active"
        @change="props.item.updateStatus()"
        color="green"
      ></v-switch>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { imageType } from "../../../dto/imageType";
import { Student } from "../../../dto/student";
import { QUERIES } from "@/gql-constants/students";
export default {
  validations: {
  },
  validationMessages: {
  },
  data: () => ({
    title: 'Students List',
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
      text: 'Students List',
      disabled: true
    }
    ],
    studentsList:[],
    defaultStudent:Student,
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Mail", value: "email" },
      ,
      { text: "Controls", value: "control" },
    ],
    dialog: false,
  }),
  apollo: {
    students: {
      query: QUERIES.GET_STUDENTS,
      variables() {
        return {   
          limit: 10,
          skip: 0,
        };
      },
    result ({ data, loading, networkStatus }) {
      this.defaultStudent=new Student()
      this.studentsList=[]
      data.students.forEach(element => {
       this.studentsList.push(new Student(element))
      });
      },
      error(error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapGetters([]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {  
    openStudent(_id){
       this.$router.push({
        name: "studentProfile/",
        params: { student_id: _id }
      });
    } 
  }
};
</script>