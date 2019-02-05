<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Counselor</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

    </v-toolbar>
    <v-data-table :headers="headers" :items="getApplications" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.student_id }}</td>
        <td>{{ props.item.course_id }}</td>
        <td>{{ props.item.message }}</td>
        <!-- <td class="justify-center">{{ props.item.email }}</td> -->
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2">edit</v-icon>
          <v-icon small>delete</v-icon>
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
import { GET_APPLICATIONS } from "@/gql-constants/students";
export default {
  validations: {
  },
  validationMessages: {
  },
  data: () => ({
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
       {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      }
      // { text: "Mail", value: "email" },
    ],
    dialog: false,
  }),
  apollo: {
    getApplications: {
      query: GET_APPLICATIONS,
      variables() {
        return {   
          limit: 10,
          skip: 0,
        };
      }
      ,
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
    save() {   
      console.log(this.editedItem);
      this.$apollo
        .mutate({
          mutation: UPDATE_COUNSELOR,
          variables: this.editedItem
        })
        .then(data => {
          this.editedItem._id = data.data.createcounselor._id;
          if (this.editedIndex == -1) {
            // Only on create condition
            this.counselorsList.push(this.editedItem);
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