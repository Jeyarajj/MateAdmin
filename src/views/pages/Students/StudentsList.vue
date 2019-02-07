<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Counselor</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table :headers="headers" :items="studentsList" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item._id }}</td>
        <td class="justify-center">{{ props.item.email }}</td>
        <td class="justify-center layout px-0">
           <v-switch
        :label="`: ${props.item.status}`"
        v-model="props.item.active"
        @change="props.item.updateStatus()"
      ></v-switch>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
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
  }
};
</script>