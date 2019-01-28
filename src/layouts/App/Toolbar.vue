<template>
  <v-toolbar
    :fixed="fixedToolbar"
    v-if="toolbar"
    :class="navToolbarScheme"
    :clipped-left="toolbarClippedLeft"
    app
    flat
  >
    <v-toolbar-side-icon
      class="hidden-lg-and-up"
      @click.stop="$store.dispatch('toggleDrawer', ! navDrawer)"
    ></v-toolbar-side-icon>
    <v-toolbar-title v-text="title" class="ml-0 hidden-lg-and-up"></v-toolbar-title>
    <v-btn icon light class="hidden-md-and-down" @click.stop="toggleMiniVariantMode">
      <v-tooltip bottom v-if="navMiniVarient" color="sidebar">
        <v-icon slot="activator">fas fa-arrow-circle-right</v-icon>
        <span>Expand</span>
      </v-tooltip>
      <v-tooltip bottom v-else color="sidebar">
        <v-icon slot="activator">fas fa-arrow-circle-left</v-icon>
        <span>Collapse</span>
      </v-tooltip>
    </v-btn>
    <!--  
    <v-btn icon :to="{name: 'Contacts'}" flat>
      <v-icon>contacts</v-icon>
    </v-btn>
    <v-btn icon :to="{name: 'Chat'}" flat>
      <v-icon>chat</v-icon>
    </v-btn>-->
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <v-avatar slot="activator" size="40">
        <!-- <img :src="authUser.avatar" :alt="authUser.name"> -->
        <img :src="this.userphoto">
      </v-avatar>
      <v-list dense>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <!-- <img :src="authUser.avatar" :alt="authUser.name"> -->
            <img :src="userphoto">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-text="this.username"></v-list-tile-title>
            <v-list-tile-sub-title>{{this.username}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click="editProfile()">
          <v-list-tile-avatar>
            <v-icon>person</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Edit Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="() => {}">
          <v-list-tile-avatar>
            <v-icon>settings_applications</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="() => {}">
          <v-list-tile-avatar>
            <v-icon>mail</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Inbox</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click.prevent="logout">
          <v-list-tile-avatar>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <!-- User Update view -->
    <v-dialog v-model="updateDialog" max-width="600">
      <v-card>
        <v-card-title class="headline">Edit Profile</v-card-title>
        <v-card>
          <v-flex xs12 text-xs-center layout align-center justify-center id="avatarpreview">
            <AvatarUpload
              :avatarurl="this.updatedata.updates.photo"
              :userid="this.UserID"
              @clicked="avatarclick"
            />
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
                        v-model="updatedata.updates.username"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        color="primary"
                        prepend-icon="email"
                        label="Email"
                         readonly
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
                          v-model="updatedata.updates.dob"
                          label="Date of Birth"
                          hint="MM/DD/YYYY format"
                          persistent-hint
                          prepend-icon="cake"
                        ></v-text-field>
                        <v-date-picker
                          v-model="updatedata.updates.dob"
                          no-title
                          @input="datepicker = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12>
                      <v-select
                        :items="cities"
                        item-text="name"
                        item-value="name"
                        label="City"
                        v-model="updatedata.updates.address.city"
                        outline
                      ></v-select>
                    </v-flex>
                    <v-flex xs12>
                      <v-select
                        :items="countries"
                        item-text="name"
                        item-value="name"
                        label="Country"
                        v-model="updatedata.updates.address.country"
                        outline
                      ></v-select>
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
  </v-toolbar>
</template>
<script>
import { authUser } from "@/data/dummyData";
import { mapActions, mapGetters } from "vuex";
import AvatarUpload from "@/components/PreviewUpload/AvatarUpload.vue";
import { UPDATEUSER } from "@/gql-constants/users";
export default {
  components: {
    AvatarUpload
  },
  data() {
    return {
      title: "Vuse",
      updateDialog: false,
      datepicker: false,
      UserID: "",
      username: this.currentUserdata ? this.currentUserdata.username : "",
      userphoto:this.currentUserdata ? this.currentUserdata.photo : "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d5",
      updatedata: {
        token: "",
        userid: "",
        updates: {
          customClaims: {
            role: ""
          },
          email: "",
          languages: [
            {
              name: ""
            }
          ],
          username: "",
          nationality: "",
          dob: "",
          phone: "",
          photo: "",
          address: {
            street: "",
            zip: "",
            city: "",
            country: ""
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      navDrawer: "navDrawer",
      toolbarClippedLeft: "toolbarClippedLeft",
      fixedToolbar: "fixedToolbar",
      toolbar: "toolbarVisibility",
      navToolbarScheme: "navToolbarScheme",
      navMiniVarient: "navMiniVarient",
      userToken: "isAuthenticated",
      currentUserdata: "currentUserdata",
      userBasicInfoProfile: "userBasicInfoProfile",
      cities: "cities",
      countries: "countries"
    }),
    authUser() {
      return authUser;
    }
  },
  watch: {
    userToken(value) {
      if (value === null || value === false) this.$router.push("/");
    }
  },
  methods: {
    ...mapActions({
      logout: "logout"
    }),
    toggleMiniVariantMode() {
      this.$store.dispatch("toggleMiniVariantMode");
      this.$store.dispatch("toggleMiniVarient");
    },
    editProfile() {
      const data = this.currentUserdata;
      this.updateDialog = true;
      this.updatedata.userid = data ? data.id : "";
      this.UserID = this.userBasicInfoProfile._id
      this.updatedata.updates.username = data ? data.username : "";
      this.updatedata.updates.email = data ? data.email:"";
      this.updatedata.updates.phone = data? data.phone:"";
      this.updatedata.updates.photo = data
        ? data.photo
        : "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d5";
      if (data) {
        
        this.updatedata.updates.dob = data.dob;
        this.updatedata.updates.address.city = data.address.city;
        this.updatedata.updates.address.country = data.address.country;
      } else {
        this.updatedata.updates.dob = "";
        this.updatedata.updates.address.city = "";
        this.updatedata.updates.address.country = "";
      }
    },
    avatarclick(value) {
      this.updatedata.updates.photo = value;
    },
    updateclick() {
      console.log(this.updatedata)
      //this.updatedata.userid = this.$route.query.uid;
      var dateobj = new Date(this.updatedata.updates.dob);
      this.updatedata.updates.dob = dateobj.toISOString();
      this.updateUser(this.updatedata);
    },
    updateUser(updatedata) {
      this.$apollo
        .mutate({
          mutation: UPDATEUSER,
          variables: updatedata
        })
        .then(
          data => {
            this.updateDialog = false;
          },
          error => {
            console.log(error);
            this.errormessage = error.graphQLErrors[0].message;
          }
        );
    }
  }
};
</script>
