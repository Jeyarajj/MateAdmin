<template>
  <div class="animated">
    <b-card>
      <b-card-header>Users
        <div class="card-header-actions">
          <b-button
            variant="success"
            class="btn-pill float-right"
            aria-pressed="true"
            size="sm"
            @click="userModal = true"
          >
            <i class="icon-plus"></i> Add New User
          </b-button>
        </div>
      </b-card-header>

      <b-card-body>
        <v-client-table
          :columns="headers"
          :data="allusers"
          :options="options"
          :theme="theme"
          id="dataTable1"
        >
          <div slot="actions" slot-scope="props">
            <a @click="editUser(props.item)" :href="props.row.actions" class="icon-eye"></a>
            <a @click="Updatedata(props.item)" :href="props.row.actions" class="icon-pencil"></a>
          </div>

        </v-client-table>
      </b-card-body>
    </b-card>

    <b-modal
      hide-footer
      title="Add User"
      no-close-on-backdrop
      no-close-on-esc
      centered
      v-model="userModal"
    >
      <b-form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset" novalidate>
        <b-form-group id="userEmailidLabel" label="Role Name" label-for="userEmailid">
          <b-form-input
            id="userEmailid"
            type="text"
            v-model.lazy.trim="$v.defaultUser.email.$model"
            :state="chkState('email')"
            v-model="defaultUser.email"
            aria-describedby="userEmailidLabel"
            placeholder="User Email ID"
            autocomplete="given-name"
            autofocus
          />
          <b-form-invalid-feedback id="userEmailidFeedback">Enter User Name</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="userRoleLabel" label="Role Name" label-for="userRole">
          <v-select
            v-model="defaultUser._role"
            :options="allroles"
            label="role_name"
            placeholder="Select Role"
          ></v-select>
        </b-form-group>

        <b-button
          type="submit"
          class="ml-1 float-right"
          variant="primary"
          :disabled="$v.defaultUser.$invalid || submitted"
        >Submit</b-button>

        <b-button variant="primary" class="ml-1 float-right" @click="userModal = false">Close</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import { ClientTable, Event } from "vue-tables-2";
import sampleData from "./_data";

import { mapGetters } from "vuex";
import { Role } from "../../../dto/roles";

import { filter, findIndex } from "lodash";
import { Users } from "../../../dto/users";
import { imageType } from "../../../dto/imageType";

import vSelect from "vue-select";

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
    Event,
    vSelect
  },
  created() {
    this.defaultUser = new Users();
    this.getUsers();
  },
  mixins: [validationMixin],
  validations: {
    defaultUser: {
      email: { required, email },
      _role: { required }
    }
  },
  watch: {
    $route(to, from) {
      this.getUsers(to.query.pageindex);
    }
  },
  methods: {
    onSubmit() {
      this.createNewUser();
      if (this.validate()) {
        this.submitted = true;
        this.$nextTick(() => {
          this.submitted = false;
        });
      }
    },
    validate() {
      this.$v.$touch();
      this.$nextTick(() => this.findFirstError());
      return this.isValid;
    },
    onReset() {
      // Reset validation
      this.form = Object.assign({}, formShape);
      this.submitted = false;
      this.$nextTick(() => {
        this.$v.$reset();
        this.feedBack = "secondary";
      });
    },
    chkState(val) {
      const field = this.$v.defaultUser[val];
      return !field.$dirty || !field.$invalid;
    },
    formatDate(date) {
      if (!date) return null;
      date = new Date(date);
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    },
    editContact(contact) {
      this.form = contact;
      this.isEditformMod = true;
      this.contactDialog = true;
    },
    createNewUser() {
      //random password genarate
      var randomstring = Math.random()
        .toString(36)
        .slice(-8);
      this.defaultUser.data.password = randomstring;
      this.createusers();
    },
    editUser(data) {
      this.defaultUser = new Users(data);
      console.log(this.defaultUser);
      this.profileDialog = true;
    },
    Updatedata(data) {
      this.defaultUser = new Users(data);
      //this.defaultUser._id = id
      this.updateDialog = true;
    },
    async updateclick() {
      if (this.avatarPicture.fileData) {
        this.loader = this.$loading.show();
        await this.avatarPicture.update(this.$store);
        this.defaultUser._profile.photo = this.avatarPicture.getFileURL;
        this.loader.hide();
      }
      this.createusers();
    },
    avatarclick(file) {
      let path = "Users/" + this.current_userid + "/Picture";
      this.avatarPicture = new imageType(path);
      this.avatarPicture.setFile(file);
    },
    updateUser(updatedata) {},
    showdialog() {
      this.showerror = false;
      this.contactDialog = true;
    },
    closedialog() {
      this.showerror = false;
      this.contactDialog = false;
    },
    updateContact() {
      const index = this.editIndex;
      this.contacts[index] = this.form;
      this.resetContactForm();
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
    async createusers() {
      const result = await this.defaultUser.createUser();
      if (result) {
        if (result.data.hasOwnProperty("createAdminUser")) {
          this.$toaster.success("User Created Successfully");
          this.defaultUser._id = result.data.createAdminUser._id;
          this.allusers.push(this.defaultUser);
        } else if (result.data.hasOwnProperty("updateProfile")) {
          this.$toaster.success("User Updated Successfully");
          this.updateDialog = false;
        }
      } else console.log("Created failed check logs");
      this.contactDialog = false;
    },
    async getUsers(page) {
      if (page === undefined) page = 0;
      const users = await Users.getUsers(this.usersLimit, page);
      this.allusers = [];
      if (users) {
        users.data.getUsers.users.forEach(element => {
          this.allusers.push(new Users(element));
        });
        this.$store.commit("SET_PAGES_DATA", {
          currentIndex: this.$route.query.pageindex,
          totalPages: users.data.getUsers.total_pages,
          currentPage: users.data.getUsers.current,
          listLimit: this.usersLimit
        });
      }
      console.log(this.allusers);
    },
    async getRoles() {
      const roles = await Role.getRoles();
      if (roles) {
        roles.data.getRoles.roles.forEach(element => {
          this.allroles.push(new Role(element));
        });
        console.log(this.allroles);
      }
    }
  },
  created() {
    this.defaultUser = new Users();
    this.getUsers();
    this.getRoles();
  },
  data: function() {
    return {
      submitted: false,
      selected: null,
      allroles: [],
      usersLimit: 10,
      avatarPicture: new imageType("Users/" + this.current_userid + "/Picture"),
      headers: ["_profile.name.first", "email", "_profile.phone", "actions"],
      allusers: [],
      options: {
        headings: {
          '_profile.name.first': "Name",
          email: "Email",
          '_profile.phone': "Phone No.",
          actions: "Actions"
        },
        sortable: ["name", "email"],
        filterable: ["_profile.name.first", "email", "_profile.phone"],
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
      defaultUser: Users,
      useVuex: false,
      theme: "bootstrap4",
      template: "default",
      userModal: false
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
