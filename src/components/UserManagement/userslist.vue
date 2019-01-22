<template>
  <div>
    <v-card>
      <v-card-title>
        <v-tooltip right>
          <v-btn slot="activator" color="primary" dark fab @click.native="showdialog()">
            <v-icon dark>person_add</v-icon>
          </v-btn>
          <span>ADD USER</span>
        </v-tooltip>

        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="allusers" :search="search">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.username }}</td>
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
              <v-btn flat icon class="fx-close-model-btn" @click.native="closedialog()">
                <v-icon color="white">close</v-icon>
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
              <h3 class="headline mb-0" text-xs-center>John Doe</h3>

              <v-list justify-center sm12>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>phone</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{this.showdata.phone}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>mail</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{this.showdata.email}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>cake</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>1st Jan 1990</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>location_on</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{this.showdata.country}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>location_city</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{this.showdata.city}}</v-list-tile-title>
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
                        v-model="updatedata.updates.name.first"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        color="primary"
                        prepend-icon="email"
                        label="Email"
                        v-model="updatedata.updates.email"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        color="primary"
                        prepend-icon="phone"
                        label="Phone No."
                        v-model="updatedata.updates.phone"
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
                          v-model="updatedata.updates.birthdate"
                          label="Date of Birth"
                          hint="MM/DD/YYYY format"
                          persistent-hint
                          prepend-icon="cake"
                        ></v-text-field>
                        <v-date-picker
                          v-model="updatedata.updates.birthdate"
                          no-title
                          @input="datepicker = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12>
                      <!-- <v-select
                        :items="cities"
                        item-text="name"
                        item-value="_id"
                        label="City"
                        v-model="city"
                        outline
                      ></v-select>-->
                      <v-text-field
                        color="primary"
                        prepend-icon="location_city"
                        label="City"
                        v-model="updatedata.updates.address.city"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <!--  <v-select
                        :items="countries"
                        item-text="name"
                        item-value="_id"
                        label="Country"
                        v-model="country"
                        outline
                      ></v-select>-->
                      <v-text-field
                        color="primary"
                        prepend-icon="location_on"
                        label="Country"
                        v-model="updatedata.updates.address.country"
                        required
                      ></v-text-field>
                    </v-flex>
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
    <!-- <v-dialog v-model="updateDialog" max-width="300">
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
              <v-list justify-center sm12>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-text-field v-model="updatedata.updates.name.first" label="Name"></v-text-field>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-divider inset></v-divider>

              <v-list justify-center sm12>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>phone</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-text-field v-model="updatedata.updates.phone" label="Phone"></v-text-field>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>mail</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-text-field v-model="updatedata.updates.email" label="Email" :readonly="true"></v-text-field>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile>
                  <v-list-tile-content>
                    <v-menu
                      ref="menu"
                      :close-on-content-click="false"
                      v-model="menu"
                      :nudge-right="40"
                      :return-value.sync="date"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="date"
                        label="Picker in menu"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
    <v-date-picker v-model="updatedata.updates.dob"></v-date-picker>-->
    <!-- </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>location_city</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-text-field v-model="updatedata.updates.address.city" label="City"></v-text-field>
                  </v-list-tile-content>
                </v-list-tile>

                <v-divider inset></v-divider>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>location_on</v-icon>
                  </v-list-tile-action>

    <v-list-tile-content>-->
    <!-- <v-select
                      :items="nationalities"
                      item-text="country"
                      item-value="nationalities"
                      v-model="form.role_id"
                      label="Country"
    ></v-select>-->
    <!-- <v-text-field v-model="updatedata.updates.address.country" label="Country"></v-text-field>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </div>
          </v-card-title>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="act" class="white--text" @click="updateclick()">Save</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" @click="updateDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>-->
  </div>
</template>
  
<script>
import { rgba as Gradients } from "@/data/gradients";
import { filter, findIndex } from "lodash";

import {
  GET_USERS,
  GET_ROLES,
  CREATEUSER,
  UPDATEUSER
} from "@/gql-constants/users";
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { validNumber } from "@/utils/validators";
import validationMixin from "@/mixins/validationMixin";
import { defaultUserPic, users, authUser } from "@/data/dummyData";

import AvatarUpload from "@/components/PreviewUpload/AvatarUpload.vue";

export default {
  mixins: [validationMixin],
  name: "UserList",
  components: {
    AvatarUpload
  },
  validations: {
    form: {
      email: { required, email },
      role_id: { required }
    }
  },
  validationMessages: {
    form: {
      email: {
        required: "Email is required",
        email: "Email must be valid"
      },
      role_id: {
        required: "Role is required"
      }
    }
  },
  data() {
    return {
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

      title: "Contacts",
      date: null,
      dateFormatted: null,
      gradient: Gradients[9],
      backgroundImg: "/static/doc-images/vbanner.jpg",
      form: {
        email: "",
        password: "",
        role_id: ""
      },
      allusers: [],
      drawerinternal: true,
      activeMenu: "all",
      userslimit: 10,
      authUser,
      updates: null,
      showdata: {
        phone: "",
        email: "",
        city: "",
        country: ""
      },
      updatedata: {
        token: "",
        userid: "",
        updates: {
          customClaims: {
            role: ""
          },
          name: {
            first: "",
            last: "",
            middle: ""
          },
          email: "",
          languages: [
            {
              name: ""
            }
          ],
          username: "",
          nationality: "",
          birthdate: new Date().toISOString().substr(0, 10),
          phone: "",
          address: {
            street: "",
            zip: "",
            city: "",
            country: ""
          }
        }
      },
      confirmBox: {
        deleteContact: false,
        item: null
      },
      contactDialog: false,
      profileDialog: false,
      updateDialog: false,
      isEditformMod: false,
      editIndex: null,
      datepicker: false
    };
  },
  methods: {
    resetContactForm() {
      this.form = {
        username: "",
        phone: "",
        email: "",
        country: "",
        avatar: "/static/default/user.svg",
        city: "",
        birthdate: "",
        formatedBirthday: "",
        notes: null,
        is_favourite: false,
        is_frequent: false,
        selected: false
      };
      this.contactDialog = false;
      this.isEditformMod = false;
      this.editIndex = null;
    },
    editContact(contact) {
      this.form = contact;
      this.isEditformMod = true;
      this.contactDialog = true;
      this.editIndex = findIndex(
        this.contacts,
        contact => contact === this.form
      );
    },
    createNewUser() {
      //random password genarate
      var randomstring = Math.random()
        .toString(36)
        .slice(-8);
      this.form.password = randomstring;
      this.createusers(this.form);
    },
    editUser(data) {
      this.profileDialog = true;
      this.showdata.phone = data.phone;
      this.showdata.email = data.email;
      this.showdata.city = data.address.city;
      this.showdata.coutry = data.address.country;
    },
    Updatedata(path, pageType, data) {
      if (pageType !== "index") {
        this.updateDialog = true;
        this.$router.push({
          path: `/UsersManagement/UsersList`,
          query: { id: pageType, uid: data.id }
        });
        this.updatedata.updates.email = data.email;
        this.updatedata.updates.phone = data.phone;
        this.updatedata.updates.birthdate = data.birthdate;
        if (data.address == null) {
          this.updatedata.updates.address.street = "";
          this.updatedata.updates.address.city = "";
          // this.city = {};
          // this.country = {};
        } else {
          this.updatedata.updates.address.street = data.address.street;
          this.updatedata.updates.address.city = data.address.city;
          this.updatedata.updates.address.country = data.address.country;
          // this.city = { _id: data.address.city };
          // this.country = { _id: data.address.country };
        }
      } else {
        this.$router.push({ path: "/dashboard" });
      }
    },
    updateclick() {
      this.updatedata.userid = this.$route.query.uid;
      this.updateUser(this.updatedata);
    },
    updateUser(updatedata) {
      this.updates = {
        // custom_claims: {
        //   role: updatedata.updates.custom_claims.role
        // },
        name: {
          first: updatedata.updates.name.first,
          last: updatedata.updates.name.last,
          middle: updatedata.updates.name.middle
        },
        email: updatedata.updates.email,
        birthdate: updatedata.updates.birthdate,
        languages: [
          {
            name: updatedata.updates.languages.name
          }
        ],
        _id: null,
        id: updatedata.userid,
        username: updatedata.updates.username,
        nationality: updatedata.updates.nationality,
        phone: updatedata.updates.phone,
        address: {
          street: updatedata.updates.address.street,
          zip: updatedata.updates.address.zip,
          city: updatedata.updates.address.city,
          country: updatedata.updates.address.country
        }
      };
      this.$apollo
        .mutate({
          mutation: UPDATEUSER,
          variables: updatedata
        })
        .then(
          data => {
            for (let i = 0; i < this.allusers.length; i++) {
              if (data.data.user.profile.update._id) {
                if (
                  this.allusers[i]._id === data.data.user.profile.update._id
                ) {
                  this.updates._id = data.data.user.profile.update._id;
                  this.allusers[i] = this.updates;
                  break;
                } else {
                  continue;
                }
              }
            }
            this.updateDialog = false;
          },
          error => {
            console.log(error);
            this.errormessage = error.graphQLErrors[0].message;
          }
        );
    },
    showdialog() {
      this.showerror = false;
      this.contactDialog = true;
    },
    closedialog() {
      this.form = {
        username: "",
        role_id: ""
      };
      this.showerror = false;
      this.contactDialog = false;
    },
    updateContact() {
      const index = this.editIndex;
      this.contacts[index] = this.form;
      this.resetContactForm();
    },
    createusers(userdata) {
      this.$apollo
        .mutate({
          mutation: CREATEUSER,
          variables: userdata
        })
        .then(
          data => {
            this.allusers.push({
              _id: data.data.createUser._id,
              email: data.data.createUser.email
            });
            this.contactDialog = false;
          },
          error => {
            this.showerror = true;
            this.errormessage = error.graphQLErrors[0].message;
          }
        );
    }
  },
  apollo: {
    GetUsers: {
      query: GET_USERS,
      variables() {
        return {
          search: this.search,
          limit: this.userslimit
        };
      },
      update(data) {
        this.allusers = data.public_profiles;
      },
      error(error) {
        console.log(error);
      }
    },
    GetRoles: {
      query: GET_ROLES,
      variables() {
        return {
          Id: this.userBasicInfoProfile._id
        };
      },
      update(data) {
        return data.getAllRoles;
      },
      error(error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapGetters([
      "userBasicInfoProfile",
      "nationalities",
      "cities",
      "countries"
    ])
  }
  // watch: {
  //   contactDialog(from, to) {
  //     if (to) {
  //       this.resetContactForm();
  //     }
  //   }
  // }
};
</script>
