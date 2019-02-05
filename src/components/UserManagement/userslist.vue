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
        <!-- Create Contact Modal -->
    <v-dialog v-model="contactDialog" scrollable persistent max-width="480px">
      <v-btn slot="activator" color="primary" dark class="mb-2">
        <v-icon left dark>add_circle</v-icon> Add New User</v-btn>
      <v-card class="create-dialog-card">
        <v-card-title>
          <v-layout>
            <v-flex row xs6>
              <span class="white--text">New User</span>
            </v-flex>
            <v-flex row xs6 text-xs-right>
              <v-btn flat icon class="fx-close-model-btn" @click.native="closedialog()">
                <v-icon color="primary">close</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-alert :value="showerror" type="error">{{errormessage}}</v-alert>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  :error-messages="fieldErrors('form.email')"
                  @input="$v.form.email.$touch()"
                  @blur="$v.form.email.$touch()"
                  prepend-icon="email"
                  v-model="form.email"
                  label="Email *"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  :error-messages="fieldErrors('form.role_id')"
                  @input="$v.form.role_id.$touch()"
                  @blur="$v.form.role_id.$touch()"
                  :items="GetRoles"
                  item-text="role_name"
                  item-value="_id"
                  prepend-icon="people"
                  v-model="form.role_id"
                  label="Role *"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="white--text" color="menuhover" @click.native="resetContactForm()">Close</v-btn>
          <v-btn
            class="white--text"
            color="act"
            @click.native="updateContact()"
            :disabled="$v.form.$invalid"
            v-if="isEditformMod"
          >Edit</v-btn>
          <v-btn
            :disabled="$v.$invalid"
            block
            :class="$v.$invalid ? '' : 'white--text'"
            color="act"
            @click.native="createNewUser()"
            v-else
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-toolbar>
    </v-container>

    <v-card>
      <v-data-table :headers="headers" :items="allusers" :search="search">
        <template slot="items" slot-scope="props">
          <td>{{ props.item._id }}</td>
          <td>{{ props.item.email }}</td>
          <!--<td class="text-xs-right">{{ props.item.phone }}</td>-->
          <td>{{ props.item.phone }}</td>
          <td class="text-xs-right">
            <v-flex xs12 sm3>
              <v-btn @click="editUser(props.item)" flat icon color="primary">
                <v-icon>remove_red_eye</v-icon>
              </v-btn>
            </v-flex>
          </td>
          <td class="text-xs-right">
            <v-flex xs12 sm3>
              <v-btn
                @click="Updatedata('/users', props.item._id,props.item)"
                flat
                icon
                color="primary"
              >
                <v-icon>edit</v-icon>
              </v-btn>
            </v-flex>
          </td>
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>
    </v-card>

    <!-- Create Contact Modal -->
    <v-dialog v-model="contactDialog" scrollable persistent max-width="480px">
      <v-card class="create-dialog-card">
        <v-card-title>
          <v-layout>
            <v-flex row xs6>
              <span class="white--text">New User</span>
            </v-flex>
            <v-flex row xs6 text-xs-right>
              <v-btn flat icon color="primary" @click.native="closedialog()">
                <v-icon>close</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-alert :value="showerror" type="error">{{errormessage}}</v-alert>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  @input="$v.defaultUser.users.email.$touch()"
                  @blur="$v.defaultUser.users.email.$touch()"
                  prepend-icon="email"
                  v-model="defaultUser.users.email"
                  label="Email *"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-select
                  @input="$v.defaultUser.users._role.$touch()"
                  @blur="$v.defaultUser.users._role.$touch()"
                  :items="allroles"
                  item-text="role_name"
                  item-value="_id"
                  prepend-icon="people"
                  v-model="defaultUser.users._role"
                  label="Role *"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="white--text" color="menuhover" @click.native="resetContactForm()">Close</v-btn>
          <v-btn
            class="white--text"
            color="act"
            @click.native="updateContact()"
            :disabled="$v.defaultUser.$invalid"
            v-if="isEditformMod"
          >Edit</v-btn>
          <v-btn
            :disabled="$v.$invalid"
            block
            :class="$v.$invalid ? '' : 'white--text'"
            color="act"
            @click.native="createNewUser()"
            v-else
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Profile view -->
    <v-dialog v-model="profileDialog" max-width="300">
      <v-card>
        <v-card-title class="headline">Profile Details</v-card-title>

        <v-card>
          <v-flex xs12 text-xs-center layout align-center justify-center>
            <v-avatar size="150">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="User">
            </v-avatar>
          </v-flex>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0" text-xs-center>{{defaultUser.username}}</h3>

              <v-list justify-center sm12>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>phone</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{defaultUser.phone}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>mail</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{defaultUser.email}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>cake</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{defaultUser.birthdate}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>location_on</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{defaultUser.country}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>location_city</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{defaultUser.city}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </div>
          </v-card-title>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" @click="profileDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- User Update view -->
    <v-dialog v-model="updateDialog" max-width="600">
      <v-card>
        <v-card-title class="headline">Edit Profile</v-card-title>
        <v-card>
          <v-flex xs12 text-xs-center layout align-center justify-center id="avatarpreview">
            <AvatarUpload/>
          </v-flex>

          <v-card-title primary-title>
            <div>
              <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
                <v-container grid-list-xl fluid>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field
                        color="primary"
                        prepend-icon="person"
                        label="First name"
                        v-model="defaultUser.dataset.name.first"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        color="primary"
                        prepend-icon="email"
                        label="Email"
                        v-model="defaultUser.dataset.email"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        color="primary"
                        prepend-icon="phone"
                        label="Phone No."
                        v-model="defaultUser.dataset.phone"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-menu
                        ref="datepicker"
                        :close-on-content-click="false"
                        v-model="datepicker"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="defaultUser.dataset.dob"
                          label="Date of Birth"
                          hint="MM/DD/YYYY format"
                          persistent-hint
                          prepend-icon="cake"
                        ></v-text-field>
                        <v-date-picker
                          v-model="defaultUser.dataset.dob"
                          no-title
                          @input="datepicker = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <!-- <v-flex xs12>
                      <v-select
                        :items="cities"
                        item-text="name"
                        item-value="name"
                        label="City"
                        v-model="defaultUser.address.city"
                        outline
                      ></v-select>
                    </v-flex>-->
                    <!-- <v-flex xs12>
                       <v-select
                        :items="countries"
                        item-text="name"
                        item-value="name"
                        label="Country"
                        v-model="defaultUser.address.country"
                        outline
                      ></v-select>
                    </v-flex>-->
                  </v-layout>
                </v-container>
              </v-form>
            </div>
          </v-card-title>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" @click="updateDialog = false">Close</v-btn>
          <v-btn color="success" @click="updateclick()">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script>
import { rgba as Gradients } from "@/data/gradients";
import { filter, findIndex } from "lodash";
import { Users } from "../../dto/users";
import { Role } from "../../dto/roles";
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { validNumber } from "@/utils/validators";
import validationMixin from "@/mixins/validationMixin";
// import { defaultUserPic, users, authUser } from "@/data/dummyData";

import AvatarUpload from "@/components/PreviewUpload/AvatarUpload.vue";

export default {
  mixins: [validationMixin],
  name: "UserList",
  components: {
    AvatarUpload
  },
  validations: {
    defaultUser: {
      users: {
        email: { required, email },
        _role: { required }
      }
    }
  },
  validationMessages: {
    defaultUser: {
      users: {
        email: {
          required: "Email is required",
          email: "Email must be valid"
        },
        _role: {
          required: "Role is required"
        }
      }
    }
  },
  data() {
    return {
    title: 'Manage Users',
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
      text: 'Manage Users',
      disabled: true
    }
    ],
      search: "",
      errormessage: "",
      showerror: false,
      city: [],
      country: [],
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Actions", value: "actions" }
      ],
      date: null,
      dateFormatted: null,
      gradient: Gradients[9],
      backgroundImg: "/static/doc-images/vbanner.jpg",
      allusers: [],
      allroles: [],
      confirmBox: {
        deleteContact: false,
        item: null
      },
      defaultUser: Users,
      contactDialog: false,
      profileDialog: false,
      updateDialog: false,
      isEditformMod: false,
      editIndex: null,
      datepicker: false
    };
  },
  methods: {
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
      this.defaultUser.users.password = randomstring;
      this.createusers();
    },
    editUser(data) {
      this.profileDialog = true;
    },
    Updatedata(path, pageType, data) {
      this.updateDialog = true;
    },
    updateclick() {
      this.createusers()
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
    async createusers() {
      this.defaultUser._id = "5c5850688eea700efe9420d5"
      const result = await this.defaultUser.createUser();
      if (result) {
        if (result.data.hasOwnProperty("createAdminUser")) {
          this.defaultUser._id = result.data.createAdminUser._id;
          this.allusers.push(this.defaultUser);
        }
      } else console.log("Created failed check logs");
      this.contactDialog = false;
    },
    async getUsers() {
      const allusers = await Users.getUsers();
      console.log(allusers);

      this.allusers = allusers.data.getUsers;
      return allusers;
    },
    async getRoles() {
      const roles = await Role.getRoles();
      if (roles) {
        roles.data.getRoles.forEach(element => {
          this.allroles.push(new Role(element));
        });
        console.log(this.allroles);
        console.log(roles);
      }
    },
  },
  created() {
    this.defaultUser = new Users();
    this.getUsers();
    this.getRoles();
  },
  computed: {
    ...mapGetters([
      "userBasicInfoProfile",
      "nationalities",
      "cities",
      "countries"
    ])
  }
};
</script>
