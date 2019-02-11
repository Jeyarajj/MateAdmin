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
          <v-breadcrumbs :items="breadcrumbs" class="pl-0">
            <v-icon slot="divider" color="primary">chevron_right</v-icon>
          </v-breadcrumbs>
          <slot></slot>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-btn slot="activator" @click="addNewRole()" color="primary" dark class="mb-2">
            <v-icon left dark>add_circle</v-icon>Add New Role
          </v-btn>
          <v-card>
            <v-card-title>
              <v-layout>
                <v-flex row xs6>
                  <span class="headline">{{ formTitle }}</span>
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
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="defaultRole.role_name"
                      box
                      label="Role name"
                      :error-messages="fieldErrors('defaultRole.role_name')"
                      @input="$v.defaultRole.role_name.$touch()"
                      @blur="$v.defaultRole.role_name.$touch()"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-textarea
                      v-model="defaultRole.role_description"
                      auto-grow
                      box
                      rows="2"
                      label="Role Description"
                      :error-messages="fieldErrors('defaultRole.role_description')"
                      @input="$v.defaultRole.role_description.$touch()"
                      @blur="$v.defaultRole.role_description.$touch()"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex>
                    <table>
                      <tr>
                        <th v-for="(headers,index) in mheaders" :key="index">{{headers.text}}</th>
                      </tr>
                      <tr
                        v-for="(rolePermission,index2) in defaultRole.role_permission"
                        :key="index2"
                      >
                        <td>{{ defaultRole.role_permission[index2].module_name }}</td>
                        <td v-for="(access,index3) in accessControls" :key="index3">
                          <v-checkbox
                            v-model="defaultRole.role_permission[index2].has_access[access]"
                            :value="true"
                            class="Rolepermission-14"
                          ></v-checkbox>
                        </td>
                      </tr>
                    </table>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog=false">Cancel</v-btn>
              <v-btn
                flat
                @click="createRole()"
                :disabled="$v.$invalid"
                block
                :class="$v.$invalid ? '' : 'green'"
                color="act"
              >Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </v-container>

    <v-data-table :headers="headers" :items="allroles" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="justify-center">{{ props.item.role_name }}</td>
        <td class="justify-center">{{ props.item.role_description }}</td>
        <td class="justify-center">{{ props.item.created_by }}</td>
        <td class="justify-center">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <!-- <v-icon small @click="deleteItem(props.item)">delete</v-icon> -->
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { GET_ROLES } from "@/gql-constants/users";
import { mapGetters } from "vuex";

import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";
import { Role, AccessPermission, modules } from "../../dto/roles";
import { validNumber } from "@/utils/validators";
import validationMixin from "@/mixins/validationMixin";

export default {
  mixins: [validationMixin],
  validations: {
    defaultRole: {
      role_name: { required },
      role_description: { required }
    }
  },
  validationMessages: {
    defaultRole: {
      role_name: {
        required: "Role Name is required"
      },
      role_description: {
        required: "Role Description is required"
      }
    }
  },
  data: () => ({
    title: "Users Roles",
    icon: "playlist_add_check",
    breadcrumbs: [
      {
        text: "Home",
        disabled: true
      },
      {
        text: "Users Management",
        disabled: true
      },
      {
        text: "Manage User Roles",
        disabled: true
      }
    ],
    dialog: false,
    accessControls: ["create", "update", "delete", "view", "publish"],
    headers: [
      { text: "Role Name", value: "role_name" },
      { text: "Role Desc", value: "role_decription" },
      { text: "Created By", value: "created_by" },
      { text: "Actions", value: "name", sortable: false }
    ],
    mheaders: [
      { text: "Module", value: "Module" },
      { text: "Create", value: "Create" },
      { text: "Update", value: "Update" },
      { text: "Delete", value: "Delete" },
      { text: "View", value: "View" },
      { text: "Publish", value: "Publish" }
    ],
    defaultRole: Role,
    allroles: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Role" : "Edit Role";
    },

    ...mapGetters(["userBasicInfoProfile"])
  },

  watch: {},
  created() {
    this.getRoles();
  },
  // apollo: {
  //   getRoles: {
  //     query: GET_ROLES,
  //     variables() {
  //       return {
  //         limit: "10",
  //         skip: "0"
  //       };
  //     },
  //     update(data) {
  //       this.defaultRole = new Role();
  //       this.initializeRole(modules);
  //       if (data) {
  //         data.getRoles.forEach(element => {
  //           new Role(element);
  //         });
  //         return data.getRoles;
  //       }
  //     },
  //     error(error) {
  //       console.log(error);
  //     }
  //   }
  // },
  methods: {
    editItem(role) {
      this.defaultRole = role;
      this.initializeRole(role.role_permission);
      this.dialog = true;
    },
    async getRoles() {
      const roles = await Role.getRoles();
      this.defaultRole = new Role();
      this.initializeRole(modules);
      if (roles) {
        roles.data.getRoles.forEach(element => {
          this.allroles.push(new Role(element));
        });
      }
    },
    async createRole() {
      const result = await this.defaultRole.createRole();
      if (result) {
        if (result.data.hasOwnProperty("createAdminUserRole")) {
          this.defaultRole._id = result.data.createAdminUserRole._id;
          this.allroles.push(this.defaultRole);
        }
      } else console.log("Created failed check logs");
      this.dialog = false;
    },
    addNewRole() {
      this.defaultRole = new Role();
      this.initializeRole(modules);
    },
    close() {
      this.dialog = false;
    },
    initializeRole(elements) {
      this.defaultRole.role_permission = [];
      elements.forEach(element => {
        this.defaultRole.role_permission.push(new AccessPermission(element));
      });
    }
  }
};
</script>