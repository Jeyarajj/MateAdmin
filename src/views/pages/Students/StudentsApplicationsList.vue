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
    <v-data-table :headers="headers" :items="getApplications" :hide-actions="true" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.student_id }}</td>
        <td>{{ props.item.course_id }}</td>
        <td>{{ props.item.message }}</td>
        <!-- <td class="justify-center">{{ props.item.email }}</td> -->
        <td class="justify-center">
          <v-icon small class="mr-2">edit</v-icon>
          <v-icon small>delete</v-icon>
        </td>
      </template>
      <!-- <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { imageType } from "../../../dto/imageType";
import { QUERIES } from "@/gql-constants/students";
export default {
  validations: {
  },
  validationMessages: {
  },
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
      query: QUERIES.GET_APPLICATIONS,
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
  }
};
</script>