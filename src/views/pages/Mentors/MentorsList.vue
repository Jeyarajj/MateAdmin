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
        <v-breadcrumbs v-if="breadcrumbs" class="pl-0">
          <v-icon slot="divider" color="primary">chevron_right</v-icon>
          <v-breadcrumbs-item
            v-for="item in breadcrumbs"
            :key="item.text"
            :disabled="item.disabled"
          >{{ item.text }}</v-breadcrumbs-item>
        </v-breadcrumbs>
        <slot></slot>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" persistent max-width="900px">
        <v-btn slot="activator" @click="openEditMentor()" color="primary" dark class="mb-2">
          <v-icon left dark>add_circle</v-icon>Add New Mentor
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
                <v-flex xs12 sm6 md12>
                  <v-text-field
                    v-model="defaultMentor._details.name"
                    :error-messages="fieldErrors('defaultMentor._details.name')"
                    @input="$v.defaultMentor._details.name.$touch()"
                    @blur="$v.defaultMentor._details.name.$touch()"
                    label="First Name"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field
                    v-model="defaultMentor.email"
                    :error-messages="fieldErrors('defaultMentor.email')"
                    @input="$v.defaultMentor.email.$touch()"
                    @blur="$v.defaultMentor.email.$touch()"
                    label="Email *"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field
                    v-model="defaultMentor._details.phone"
                    :error-messages="fieldErrors('defaultMentor._details.phone')"
                    @input="$v.defaultMentor._details.phone.$touch()"
                    @blur="$v.defaultMentor._details.phone.$touch()"
                    label="Phone"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <country-select
                    class="countryselectborder"
                    v-model="defaultMentor._details.address.country"
                    :country="defaultMentor._details.address.country"
                    topCountry="US"
                  />
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <region-select
                    class="regionselectborder"
                    v-model="defaultMentor._details.address.city"
                    :country="defaultMentor._details.address.country"
                    :region="defaultMentor._details.address.city"
                  />
                </v-flex>
            
                <v-layout flex row pb-2 md12  v-if="defaultMentor._id">
              <v-flex md6>
              <v-card class="card--flex-toolbar">
                <v-toolbar card prominent color="blue-grey darken-3">
                  <v-toolbar-title class="body-2 white--text">Upload Picture</v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>

                <v-card-text>
                <span>
                    <v-img srcset lazy-src :src="defaultMentor.data.photo.fileUrl" width="250" height="auto"></v-img>
                    <v-btn
                      v-if="defaultMentor.data.photo.fileUrl"
                      color="error"
                      dark
                      @click="removePicture()"
                      class="removebtn_counsellor"
                    >
                     <v-icon dark left>remove_circle</v-icon>Remove
                    </v-btn>
                  </span>
                  <file-upload
                    input-id="mentorPhoto"
                    class="btn btn-primary"
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                    :multiple="false"
                    :size="1024 * 1024 * 10"
                    @input="setPicture"
                    ref="upload"
                  >
                    <v-btn color="primary" dark>
                      <v-icon left dark>add_photo_alternate</v-icon>Add Picture
                    </v-btn>
                  </file-upload>
                </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="normal" @click="close">Cancel</v-btn>
            <v-btn color="green" dark @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table :headers="headers" :items="mentorlists" :hide-actions="true" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item._details.name }}</td>
        <td class="justify-center">{{ props.item.email }}</td>
        <td class="justify-center">{{props.item._details.phone}}</td>
        <td class="justify-center">{{ props.item._details.country }}</td>
        <td class="justify-center">
          <v-btn flat icon @click="editItem(props.item)">
            <v-icon small color="primary">edit</v-icon>
          </v-btn>
          <v-btn flat icon @click="deleteItem(props.item)">
            <v-icon small color="primary">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
    <Pagination/>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { imageType } from "../../../dto/imageType";
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";
import { validNumber } from "@/utils/validators";
import validationMixin from "@/mixins/validationMixin";
import { Mentor } from "../../../dto/mentors";
import Pagination from "@/components/shared/Pagination";

export default {
  components: {
    Pagination
  },
  mixins: [validationMixin],
  validations: {
    defaultMentor: {
      email: { email },
      _details: {
        name: { required },
        phone: {
          required,
          validNumber,
          maxLength: maxLength(15),
          minLength: minLength(7)
        }
      }
    }
  },
  validationMessages: {
    defaultMentor: {
      email: {
        email: "Email required",
        required: "Email Required"
      },
      _details: {
        name: {
          required: "Name is required"
        },
        phone: {
          required: "Phone number required",
          maxLength: "Max 14 digits",
          minLength: "Min 7 digits",
          validNumber: "Phone number must be a valid number"
        }
      }
    }
  },
  data: () => ({
    defaultMentor: Mentor,
    mentorlists: [],
    mentorlimit:10,
    title: "Manage Mentors",
    icon: "playlist_add_check",
    breadcrumbs: [
      {
        text: "Home",
        disabled: true
      },
      {
        text: "Mentors",
        disabled: true
      },
      {
        text: "Manage Mentors",
        disabled: true
      }
    ],
    counselorPicture: imageType,
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Mail", value: "email" },
      { text: "Phone", value: "Phone" },
      { text: "Country", value: "Country" },
      { text: "Action", value: "action" }
    ],
    dialog: false,

    country: "",
    city: "",
    counselordata: "",
    editedIndex: -1
  }),
  computed: {
    ...mapGetters([]),
    formTitle() {
      return this.editedIndex === -1 ? "Add New Mentor" : "Edit Mentors";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    $route(to, from) {
      this.getMentors(to.query.pageindex);
    }
  },
  created() {
    this.defaultMentor = new Mentor();
    this.getMentors(this.$route.query.pageindex);
  },
  methods: {
    async getMentors(page) {
      if (page === undefined) page = 0;
      const mentors = await Mentor.getMentors(this.mentorlimit,page);
      this.mentorlists = [];
      if (mentors) {
        mentors.data.getMentors.mentors.forEach(element => {
          this.mentorlists.push(new Mentor(element));
        });
        this.$store.commit("SET_PAGES_DATA", {
          currentIndex: this.$route.query.pageindex,
          totalPages: mentors.data.getMentors.total_pages,
          currentPage: mentors.data.getMentors.current,
          listLimit: this.mentorlimit
        });
      }
    },
    setPicture() {
      let file = event.target.files[0];
      let URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
        this.defaultMentor.data.photo.setFileUrl(
          URL.createObjectURL(file)
        );
      }
      this.defaultMentor.setPhoto(file);
    },
    removePicture(index) {
      this.defaultMentor.removePhoto();
    },
    openEditMentor() {
      this.defaultMentor = new Mentor();
    },
    editItem(item) {
      this.editedIndex = 0;
      this.defaultMentor = new Mentor(item);
      this.dialog = true;
    },

    deleteItem(item) {
      // const index = this.counselorsList.indexOf(item);
      // confirm("Are you sure you want to delete this item?") &&
      //   this.counselorsList.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      if(this.defaultMentor._id)
      await this.defaultMentor.updateImages(this.$store)
      const res = await this.defaultMentor.createMentor();
      if (res.data.hasOwnProperty("createMentor")) {
        this.defaultMentor._id = res.data.createMentor._id;
        this.mentorlists.push(this.defaultMentor);
      }
      this.close();
    }
  }
};
</script>