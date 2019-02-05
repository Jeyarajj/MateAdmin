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
        <v-dialog v-model="dialog" persistent max-width="900px">
        <v-btn slot="activator" color="primary" dark class="mb-2">
          <v-icon left dark>add_circle</v-icon> Add New Role</v-btn>
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
                  <v-text-field v-model="editedItem.role_name" box
                  :error-messages="fieldErrors('editedItem.role_name')"
                  @input="$v.editedItem.role_name.$touch()"
                  @blur="$v.editedItem.role_name.$touch()"
                  label="Role name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea v-model="editedItem.role_description" auto-grow box 
                  :error-messages="fieldErrors('editedItem.role_description')"
                  @input="$v.editedItem.role_description.$touch()"
                  @blur="$v.editedItem.role_description.$touch()"
                  rows="2" label="Role Description"></v-textarea>
                </v-flex>
              </v-layout>

              <v-layout wrap>
                <v-flex>

              <v-data-table :headers="modulesheader">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.username }}</td> 
          <td>{{ props.item.email }}</td>
          <!--<td class="text-xs-right">{{ props.item.phone }}</td>-->
          <td>{{ props.item.phone }}</td>
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>

                  <!-- <table>
                    <template>
                      <tr>
                        <th>Module Name</th>
                        <th>Create</th>
                        <th>Update</th>
                        <th>Delete</th>
                        <th>List</th>
                        <th>Publish</th>
                      </tr>
                    </template>
                    <template>
                      <tr v-for="(mod,inde) in modules_" :key="inde">
                        <td>{{inde.toUpperCase()}}</td>
                        <td v-for="(perm,index) in permission" :key="index">
                          <v-checkbox v-model="modules_[inde]" :value="perm" class="Rolepermission-14"></v-checkbox>
                        </td>
                      </tr>
                    </template>
                  </table> -->
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-toolbar>
    </v-container>
    
    <v-data-table :headers="headers" :items="desserts" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="justify-center">{{ props.item.role_name }}</td>
        <td class="justify-center">{{ props.item.created_by }}</td>
        <td class="justify-center">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { GET_ROLES, CREATEROLE } from "@/gql-constants/users";
import { mapGetters } from "vuex";

import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
import { validNumber } from '@/utils/validators'
import validationMixin from '@/mixins/validationMixin'

export default {
  mixins: [validationMixin],
  validations: {
    editedItem: {
      role_name: { required },
      role_description: { required }
    }
  },
  validationMessages: {
    editedItem: {
      role_name: {
        required: 'Role Name is required'
      },
      role_description: {
        required: 'Role Description is required'
      }
    }
  },
  data: () => ({
    title: 'Users Roles',
    icon: 'playlist_add_check',
    breadcrumbs: [
      {
        text: 'Home',
        disabled: true
      },
      {
        text: 'Users Management',
        disabled: true
      },
      {
        text: 'Manage User Roles',
        disabled: true
      }
    ],
    dialog: false,
    headers: [
      { text: "Role Name", value: "role_name" },
      { text: "Created By", value: "created_by" },
      { text: "Actions", value: "name", sortable: false }
    ],
    modulesheader: [
      { text: 'Module Name', sortable: false },
      { text: 'Create', sortable: false },
      { text: 'Update', sortable: false },
      { text: 'Delete', sortable: false },
      { text: 'List', sortable: false },
      { text: 'Publish', sortable: false },
    ],
    permission: ["create", "update", "delete", "list", "publish"],
    modules_: {
      user: [],
      university: [],
      rolepermission: [],
      courses: [],
      institution: []
    },
    desserts: [],
    editedIndex: -1,
    roledata: "",
    editedItem: {
      role_id: "",
      role_name: "",
      role_description: "",
      rolepermission: []
    },
    defaultItem: {
      role_id: "",
      role_name: "",
      role_description: "",
      rolepermission: []
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Role" : "Edit Role";
    },

    ...mapGetters(["userBasicInfoProfile"])
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {},
  apollo: {
    Rolesresults: {
      query: GET_ROLES,
      variables() {
        return {
          Id: this.userBasicInfoProfile._id // logged in user id from database
        };
      },
      update(data) {
        this.desserts = [];
        for (let i = 0; i < data.getAllRoles.length; i++) {
          this.desserts.push({
            role_id: data.getAllRoles[i]._id,
            role_name: data.getAllRoles[i].role_name,
            role_description: data.getAllRoles[i].role_description,
            created_by: data.getAllRoles[i].created_by,
            rolepermission: data.getAllRoles[i].role_permission
          });
        }
        this.users = this.desserts;
      },
      error(error) {
        console.log(error);
      }
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      if (this.editedIndex === -1) {
        //New Item
        for (let xyy in this.modules_) {
          this.modules_[xyy] = [];
        }
        this.editedItem.role_name = "";
        this.editedItem.role_id = "";
        this.editedItem.role_description = "";
      } else {
        //update Item
        this.editedItem.role_name = item.role_name;
        this.editedItem.role_id = item.role_id;
        this.editedItem.role_description = item.role_description;

        for (let xyy in this.modules_) {
          this.modules_[xyy] = [];
        }
        // this operation to update the model user.university,rolepermission
        for (let i = 0; i < item.rolepermission.length; i++) {
          let moduleName = item.rolepermission[i].module_name;
          if (item.rolepermission[i].create) {
            this.modules_[moduleName].push("create");
          }
          if (item.rolepermission[i].update) {
            this.modules_[moduleName].push("update");
          }
          if (item.rolepermission[i].delete) {
            this.modules_[moduleName].push("delete");
          }
          if (item.rolepermission[i].list) {
            this.modules_[moduleName].push("list");
          }
          if (item.rolepermission[i].publish) {
            this.modules_[moduleName].push("publish");
          }
        }
      }
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      let rolePermission = [];
      for (let xyy in this.modules_) {
        let name = {};
        for (let i = 0; i < this.modules_[xyy].length; i++) {
          name[this.modules_[xyy][i]] = true;
        }
        name["module_name"] = xyy;
        rolePermission.push(name);
      }
      if (this.editedIndex > -1) {
        //Update Operation
        this.roledata = {
          role_id: this.editedItem.role_id,
          role_name: this.editedItem.role_name,
          role_description: this.editedItem.role_description,
          created_by: this.userBasicInfoProfile._id,
          rolepermission: rolePermission
        };
        Object.assign(this.desserts[this.editedIndex], this.roledata);
      } else {
        //Create Operation
        this.roledata = {
          role_name: this.editedItem.role_name,
          role_description: this.editedItem.role_description,
          created_by: this.userBasicInfoProfile._id,
          rolepermission: rolePermission
        };
        this.desserts.push(this.roledata);
      }
      this.$apollo
        .mutate({
          mutation: CREATEROLE,
          variables: this.roledata
        })
        .then(data => {
          console.log("Role Updated Successfully");
        })
        .catch(err => {
          console.log(err);
        });
      this.close();
    }
  }
};
</script>