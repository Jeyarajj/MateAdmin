<template>
  <div class="animated">
    <b-card>
      <b-card-header>
        User Roles
        <div class="card-header-actions">
          <b-button
          variant="success"
          class="btn-pill float-right"
          aria-pressed="true"
          size="sm"
          @click="myModal = true"
        >
          <i class="icon-plus"></i> Add New Role
        </b-button>
        </div>
      </b-card-header>

      <b-card-body>
        <v-client-table
          :columns="headers"
          :data="getroles"
          :options="options"
          :theme="theme"
          id="dataTable1"
        >
        <a slot="actions" slot-scope="props" @click="myModal = true" :href="props.row.actions" class="icon-eye"></a>

        </v-client-table>
      </b-card-body>
    </b-card>

    <b-modal
      hide-footer
      title="Edit Role"
      no-close-on-backdrop
      no-close-on-esc
      centered
      v-model="myModal"
    >
      <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
        <b-form-group id="roleNameLabel" label="Role Name" label-for="roleName">
          <b-form-input
            id="roleName"
            type="text"
            v-model.lazy.trim="$v.defaultRole.role_name.$model"
            :state="chkState('role_name')"
            v-model="defaultRole.role_name"
            aria-describedby="roleNameLabel"
            placeholder="Role Name"
            autocomplete="given-name"
            autofocus
          />
          <b-form-invalid-feedback id="roleNameFeedback">Enter Role Name</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Role Description" label-for="roleDescription">
          <b-form-textarea
            id="textarea"
            v-model.lazy.trim="$v.defaultRole.role_description.$model"
            :state="chkState('role_description')"
            v-model="defaultRole.role_description"
            aria-describedby="roleDescriptionLabel"
            placeholder="Role Description"
            rows="4"
            max-rows="6"
          />
        </b-form-group>

        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="thead-light">
              <tr>
                <th v-for="(headers,index) in mheaders" :key="index">{{headers.text}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rolePermission,index2) in defaultRole.role_permission" :key="index2">
                <td>{{ defaultRole.role_permission[index2].module_name }}</td>
                <td v-for="(access,index3) in accessControls" :key="index3">
                  <b-form-checkbox
                    v-model="defaultRole.role_permission[index2].has_access[access]"
                    :value="true"
                  ></b-form-checkbox>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <b-button
          type="submit"
          class="ml-1 float-right"
          variant="primary"
          :disabled="$v.defaultRole.$invalid || submitted"
        >Submit</b-button>

        <b-button variant="primary" class="ml-1 float-right" @click="myModal = false">Close</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import { ClientTable, Event } from "vue-tables-2";
import sampleData from "./_data";

import { mapGetters } from "vuex";
import { Role, AccessPermission, modules } from "../../../dto/roles";

import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  email,
  sameAs,
  helpers
} from "vuelidate/lib/validators";

Vue.use(ClientTable);

export default {
  components: {
    ClientTable,
    Event
  },
  computed: {
     getroles() {
      return this.allroles;
    },
    formStr() {
      return JSON.stringify(this.defaultRole, null, 4);
    },
    isValid() {
      return !this.$v.defaultRole.$anyError;
    },
    isDirty() {
      return this.$v.defaultRole.$anyDirty;
    },
    invCheck() {
      return "";
    },
    getUserName() {
      let data = this.defaultRole.username;
      return data;
    },
    ...mapGetters(["userBasicInfoProfile", "currentUserdata"])
  },
  watch: {
    $route(to, from) {
      this.getRoles(to.query.pageindex);
    }
  },
  created() {
    this.getRoles();
    // this.defaultRole.created_by = this.userBasicInfoProfile._id;
  },
  mixins: [validationMixin],
  validations: {
    defaultRole: {
      role_name: {
        required
      },
      role_description: {
        required
      }
    }
  },
  methods: {
   
    editItem(role) {
      this.defaultRole = role;
      this.initializeRole(role.role_permission);
      this.dialog = true;
    },
    async getRoles(page) {
      if (page === undefined) page = 0;
      const roles = await Role.getRoles(this.roleLimit, page);
      // this.loader.hide();
      this.defaultRole = new Role();
      this.initializeRole(modules);
      this.allroles = [];
      if (roles) {
        roles.data.getRoles.roles.forEach(element => {
          this.allroles.push(new Role(element));
        });
        console.log(this.allroles);
        this.$store.commit("SET_PAGES_DATA", {
          currentIndex: this.$route.query.pageindex,
          totalPages: roles.data.getRoles.total_pages,
          currentPage: roles.data.getRoles.current,
          listLimit: this.roleLimit
        });
      }
    },
    async createRole() {
      // this.defaultRole.created_by = this.userBasicInfoProfile._id;

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
    },
    onSubmit() {
      if (this.validate()) {
        this.submitted = true;
        this.defaultRole.createRole()
        this.$nextTick(() => {
          // submit
          // console.log('submit:', this.formStr)
          this.submitted = false;
        });
      }
    },
    onReset() {
      this.addNewRole()
      // Reset validation
      this.submitted = false;
      this.$nextTick(() => {
        this.$v.$reset();
        this.feedBack = "secondary";
      });
    },
    chkState(val) {
      const field = this.$v.defaultRole[val];
      return !field.$dirty || !field.$invalid;
    },
    findFirstError(component = this) {
      if (component.state === false) {
        if (component.$refs.input) {
          component.$refs.input.focus();
          return true;
        }
        if (component.$refs.check) {
          component.$refs.check.focus();
          return true;
        }
      }
      let focused = false;
      component.$children.some(child => {
        focused = this.findFirstError(child);
        return focused;
      });

      return focused;
    },
    validate() {
      this.$v.$touch();
      this.$nextTick(() => this.findFirstError());
      return this.isValid;
    }
  },
  data: function() {
    return {
      submitted:false,
      headers: ["role_name", "role_description","username", "actions"],
      mheaders: [
        { text: "Module", value: "Module" },
        { text: "Create", value: "Create" },
        { text: "Update", value: "Update" },
        { text: "Delete", value: "Delete" },
        { text: "View", value: "View" },
        { text: "Publish", value: "Publish" }
      ],
      myModal: false,
      roleLimit: 10,
      accessControls: ["create", "update", "delete", "view", "publish"],
      defaultRole: Role,
      allroles: [],
      columns: ["name", "code", "uri", "actions"],
      data: [
        { name: "Admin", code: "Admin Can Access Everything", uri: "Bala" },
        { name: "Counsellor", code: "Counsells Students", uri: "Bala" }
      ],
      // data: sampleData,
      options1: {
        filterable: false
      },
      options: {
        headings: {
          role_name: "Role Name",
          role_description: "Role Description",
          username: "Created By",
          actions: "Actions"
        },
        sortable: ["role_name", "role_description"],
        filterable: ["role_name", "role_description"],
        sortIcon: {
          base: "fa",
          up: "fa-sort-asc",
          down: "fa-sort-desc",
          is: "fa-sort"
        },
        pagination: {
          chunk: 5,
          edge: false,
          nav: "scroll"
        }
      },
      useVuex: false,
      theme: "bootstrap4",
      template: "default"
    };
  }
};
</script>

<style lang="scss">
#dataTable {
  width: 100%;
  margin: 0 auto;

  .VuePagination {
    text-align: center;
    justify-content: center;
  }

  .vue-title {
    text-align: center;
    margin-bottom: 10px;
  }

  .VueTables__search-field {
    display: flex;
  }
  .VueTables__search-field input {
    margin-left: 0.25rem;
  }

  .VueTables__limit-field {
    display: flex;
  }

  .VueTables__limit-field select {
    margin-left: 0.25rem !important;
  }

  .VueTables__table th {
    text-align: center;
  }

  .VueTables__child-row-toggler {
    width: 16px;
    height: 16px;
    line-height: 16px;
    display: block;
    margin: auto;
    text-align: center;
  }

  .VueTables__child-row-toggler--closed::before {
    content: "+";
  }

  .VueTables__child-row-toggler--open::before {
    content: "-";
  }
}
</style>
