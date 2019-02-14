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

      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn slot="activator" @click="addNewRole()" color="primary" dark class="mb-2">
          <v-icon left dark>add_circle</v-icon>Add New Role
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
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="defaultRole.role_name"
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
            <v-btn color="normal" @click="dialog=false">Cancel</v-btn>
            <v-btn
              @click="createRole()"
              :disabled="$v.$invalid"
              :class="$v.$invalid ? '' : 'white--text'"
              color="act"
            >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table :headers="headers" :items="allroles"  :hide-actions="true" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="justify-center">{{ props.item.role_name }}</td>
        <td class="justify-center">{{ props.item.role_description }}</td>
        <td class="justify-center">{{ props.item.username }}</td>
        <td class="justify-center">
          <v-btn flat icon @click="editItem(props.item)">
            <v-icon small color="primary">edit</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
      </template>
    </v-data-table>
    <Pagination/>
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
import Pagination from "@/components/shared/Pagination";

export default {
  components: {
    Pagination
  },
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
    loader: "",
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
    roleLimit:10,
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
    getUserName() {
      let data = this.defaultRole.username;
      return data;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Role" : "Edit Role";
    },

    ...mapGetters(["userBasicInfoProfile", "currentUserdata"])
  },

  watch: {
    $route(to, from) {
      this.getRoles(to.query.pageindex);
    }
  },
  created() {
    this.loader = this.$loading.show();
    this.getRoles();
    this.defaultRole.created_by = this.userBasicInfoProfile._id;
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
    async getRoles(page) {
      if (page === undefined) page = 0;
      const roles = await Role.getRoles(this.roleLimit,page);
      this.loader.hide();
      this.defaultRole = new Role();
      this.initializeRole(modules);
      this.allroles = []
      if (roles) {
        roles.data.getRoles.roles.forEach(element => {
          this.allroles.push(new Role(element));
        });
        this.$store.commit("SET_PAGES_DATA", {
          currentIndex: this.$route.query.pageindex,
          totalPages: roles.data.getRoles.total_pages,
          currentPage: roles.data.getRoles.current,
          listLimit: this.roleLimit
        });
      }
    },
    async createRole() {
      this.defaultRole.created_by = this.userBasicInfoProfile._id;

      const result = await this.defaultRole.createRole();
      if (result) {
        if (result.data.hasOwnProperty("createAdminUserRole")) {
          this.$toaster.success("Role Created Successfully");
          this.defaultRole._id = result.data.createAdminUserRole._id;
          this.allroles.push(this.defaultRole);
        } else if (result.data.hasOwnProperty("updateAdminUserRole")) {
          this.$toaster.success("Role Updated Successfully");
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
        console.log(element);
        this.defaultRole.role_permission.push(new AccessPermission(element));
      });
    }
  }
};
</script>
