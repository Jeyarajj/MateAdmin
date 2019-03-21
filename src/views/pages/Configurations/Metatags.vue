<template>
  <div class="animated">
    <b-card>
      <b-card-header>
        Meta Tags
        <div class="card-header-actions">
          <b-button
          variant="success"
          class="btn-pill float-right"
          aria-pressed="true"
          size="sm"
          @click="metatagModal = true"
        >
          <i class="icon-plus"></i> Add New Meta Tag
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
        <a slot="actions" slot-scope="props" @click="metatagModal = true" :href="props.row.actions" class="icon-eye"></a>

        </v-client-table>

      </b-card-body>
    </b-card>

    <b-modal
      hide-footer
      title="Add Meta Tag"
      no-close-on-backdrop
      no-close-on-esc
      centered
      v-model="metatagModal"
    >
      
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

import { GET_ARTICLE } from "@/gql-constants/article";

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
      return JSON.stringify(this.form, null, 4);
    },
    isValid() {
      return !this.$v.form.$anyError;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
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
    form: {
      roleName: {
        required
      },
      roleDescription: {
        required
      }
    }
  },
  methods: {
      addNewItem() {
      this.$router.push({
        name: "Article Page",
        params: { mode: "create" }
      });
    },
    detailArticle(item) {
      // need to load the detailed page with item all value
      this.$router.push({
        name: "articles/Article_Page",
        params: { article_id: item._id, mode: "detail" }
      });
    },
    editArticle(item) {
      //load the edit page with  item all value
      this.$router.push({
        name: "articles/Article_Page",
        params: { article_id: item._id, mode: "edit" }
      });
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
    },
    onSubmit() {
      if (this.validate()) {
        this.submitted = true;
        this.$nextTick(() => {
          // submit
          // console.log('submit:', this.formStr)
          this.submitted = false;
        });
      }
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
      const field = this.$v.form[val];
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
      headers: ["metalabel", "value", "actions"],
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
      form: {
        roleName: "",
        roleDescription: ""
      },
      options1: {
        filterable: false
      },
      metatagModal: false,
      options: {
        headings: {
          metalabel: "Meta Label",
          value: "Value",
          actions: "Actions"
        },
        sortable: ["metalabel"],
        filterable: ["metalabel"],
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
