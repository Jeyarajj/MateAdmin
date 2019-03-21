<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <!-- <img
        src="img/avatars/6.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" /> -->
        <img class="img-avatar" v-if="currentUserdata._profile" :src="currentUserdata._profile.photo ">
        <img class="img-avatar" v-else src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d5">
    </template>
    <template slot="dropdown">
      <!-- <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-bell-o" /> Updates
        <b-badge variant="info">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-envelope-o" /> Messages
        <b-badge variant="success">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-tasks" /> Tasks
        <b-badge variant="danger">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-comments" /> Comments
        <b-badge variant="warning">{{ itemsCount }}</b-badge>
      </b-dropdown-item> -->
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Account</strong>
      </b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" /> Edit Profile</b-dropdown-item>
      <!-- <b-dropdown-item><i class="fa fa-wrench" /> Settings</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-usd" /> Payments
        <b-badge variant="secondary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-file" /> Projects
        <b-badge variant="primary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item><i class="fa fa-shield" /> Lock Account</b-dropdown-item> -->
      <b-dropdown-item><i class="fa fa-lock" /> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'

import { mapActions, mapGetters } from "vuex";
import AvatarUpload from "@/components/PreviewUpload/AvatarUpload.vue";
import { UPDATE_USER } from "@/gql-constants/users";
import { imageType } from "@/dto/imageType";

export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown,
    AvatarUpload
  },
   computed: {
    ...mapGetters({
      userToken: "isAuthenticated",
      userBasicInfoProfile: "userBasicInfoProfile",
      currentUserdata: "currentUserdata",
      cities: "cities",
      countries: "countries"
    })
  },
  watch: {
    userToken(value) {
      if (value === null || value === false) this.$router.push("/");
    }
  },
  created() {
    this.currentUserdata._profile.dob = new Date(
      this.currentUserdata._profile.dob
    )
      .toISOString()
      .substring(0, 10);
  },
  methods: {
    ...mapActions({
      logout: "logout"
    }),
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
    avatarclick(file) {
      let path = "Avatar/" + this.current_userid;
      this.avatarPicture = new imageType(path);
      this.avatarPicture.setFile(file);
    },
    async updateclick() {
      //this.updatedata.userid = this.$route.query.uid;
      if (this.avatarPicture.fileData) {
        this.loader = this.$loading.show();
        await this.avatarPicture.update(this.$store);
        this.updatedata._profile.photo = this.avatarPicture.getFileURL;
        this.loader.hide();
      }
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
            // this.updatedata = updatedata;
            this.updatedata.email = this.email;
            this.updatedata._id = this.current_userid;
            // this.currentUserdata = this.updatedata;
            this.$store.dispatch("updatecurrentInfo", updatedata);
            this.$toaster.success("Profile Updated Successfully");
            this.updateDialog = false;
          },
          error => {
            console.log(error);
            this.errormessage = error.graphQLErrors[0].message;
          }
        );
    }
  },
  data: () => {
    return { itemsCount: 42,
    current_userid: "",
      avatarPicture: new imageType("Avatar/" + this.current_userid),
      email: "",
      loader:"",
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

      }
  }
}
</script>
