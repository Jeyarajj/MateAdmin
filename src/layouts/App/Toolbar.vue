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
        <v-icon slot="activator">arrow_forward</v-icon>
        <span>Expand</span>
      </v-tooltip>
      <v-tooltip bottom v-else color="sidebar">
        <v-icon slot="activator">arrow_back</v-icon>
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
        <img
          :src="currentUserdata._profile.photo   
        ? currentUserdata._profile.photo
        : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d5'"
        >
      </v-avatar>
      <v-list dense>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <!-- <img :src="authUser.avatar" :alt="authUser.name"> -->
            <img
              :src="currentUserdata._profile.photo 
        ? currentUserdata._profile.photo
        : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d5'"
            >
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title
              v-text="currentUserdata._profile.name ? currentUserdata._profile.name.first : ''"
            ></v-list-tile-title>
            <v-list-tile-sub-title>{{currentUserdata._profile.name ? currentUserdata._profile.name.first : ''}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click="editProfile()">
          <v-list-tile-avatar>
            <v-icon>person</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Edit Profile</v-list-tile-title>
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
              :avatarurl="updatedata._profile.photo"
              :userid="this.current_userid"
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
                        v-model="updatedata._profile.name.first"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        color="primary"
                        prepend-icon="email"
                        label="Email"
                        readonly
                        v-model="email"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        color="primary"
                        prepend-icon="phone"
                        label="Phone No."
                        v-model="updatedata._profile.phone"
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
                          v-model="updatedata._profile.dob"
                          label="Date of Birth"
                          hint="MM/DD/YYYY format"
                          persistent-hint
                          prepend-icon="cake"
                        ></v-text-field>
                        <v-date-picker
                          v-model="updatedata._profile.dob"
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
                        v-model="updatedata._profile.address.city"
                        outline
                      ></v-select>
                    </v-flex>
                    <v-flex xs12>
                      <v-select
                        :items="countries"
                        item-text="name"
                        item-value="name"
                        label="Country"
                        v-model="updatedata._profile.address.country"
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
import { UPDATE_USER } from "@/gql-constants/users";
export default {
  components: {
    AvatarUpload
  },
  data() {
    return {
      title: "Vuse",
      updateDialog: false,
      datepicker: false,
      current_userid: "",
      email:"",
      updatedata: {
        _profile: {
          name: {
            first: "",
            middle: "",
            last: ""
          },
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
      console.log(data);
      this.updateDialog = true;
      //this.updatedata.userid = data ? data.id : "";
      this.current_userid = data._id; //this.userBasicInfoProfile._id;
      this.updatedata._profile.name.first = data
        ? data._profile.name.first
        : "";
      this.email = data ? data.email : "";
      this.updatedata._profile.phone = data ? data._profile.phone : "";
      this.updatedata._profile.photo = data
        ? data._profile.photo
        : "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d5";
      if (data) {
        this.updatedata._profile.dob = data._profile.dob;
        this.updatedata._profile.address.city = data._profile.address
          ? data._profile.address.city
          : "";
        this.updatedata._profile.address.country = data._profile.address
          ? data._profile.address.country
          : "";
      } else {
        this.updatedata._profile.dob = "";
        this.updatedata._profile.address.city = "";
        this.updatedata._profile.address.country = "";
      }
    },
    avatarclick(value) {
      this.updatedata._profile.photo = value;
    },
    updateclick() {
      //this.updatedata.userid = this.$route.query.uid;
      console.log(this.updatedata._profile);
      var dateobj = new Date(this.updatedata._profile.dob);
      this.updatedata._profile.dob = dateobj.toISOString();
      this.updateUser(this.updatedata);
    },
    updateUser(updatedata) {
      this.$apollo
        .mutate({
          mutation: UPDATE_USER,
          variables: {
            _id: this.current_userid,
            _profile: updatedata._profile
          }
        })
        .then(
          data => {
            this.updatedata.email = this.email;
            this.updatedata._id = this.current_userid
            this.$store.dispatch("updatecurrentInfo", updatedata);
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
