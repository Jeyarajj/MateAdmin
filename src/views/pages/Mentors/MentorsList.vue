<template>
  <div>
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
                    prepend-icon="person"
                    v-model="defaultMentor._details.name"
                    :error-messages="fieldErrors('defaultMentor._details.name')"
                    @input="$v.defaultMentor._details.name.$touch()"
                    @blur="$v.defaultMentor._details.name.$touch()"
                    label="First Name"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field
                    prepend-icon="email"
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
                    prepend-icon="phone"
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
                <v-flex xs12 sm12 md6>
                  <v-progress-linear
                    v-if="counselorPicture.uploadStatus"
                    indeterminate
                    color="light-green darken-2"
                    class="mb-0"
                  ></v-progress-linear>
                  <span v-if="counselorPicture.exists">
                    <v-img :src="counselorPicture.fileUrl" aspect-ratio="1.7"></v-img>
                    <v-btn
                      color="error"
                      dark
                      @click="removeImage(counselorPicture)"
                      class="removebtn_counsellor"
                    >
                      <v-icon dark left>remove_circle</v-icon>Remove
                    </v-btn>
                    <!-- <span @click="removeImage(counselorPicture)"> Remove</span> -->
                  </span>
                  <file-upload
                    input-id="counselorPicture"
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                    :multiple="false"
                    :size="1024 * 1024 * 10"
                    @input="onPicture"
                    ref="upload"
                  >
                    <v-btn color="primary" dark>
                      <v-icon left dark>add_photo_alternate</v-icon>Upload Picture
                    </v-btn>
                  </file-upload>
                </v-flex>
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

    <v-data-table :headers="headers" :items="mentorlists" class="elevation-1">
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

export default {
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
    }
  },
  created() {
    this.defaultMentor = new Mentor();
    this.getMentors(this.$route.query.pageindex);
  },
  methods: {
    async getMentors(page) {
      if (page === undefined) page = 0;
      const mentors = await Mentor.getMentors(page);
      this.mentorlists = [];
      if (mentors) {
        mentors.data.getMentors.mentors.forEach(element => {
          this.mentorlists.push(new Mentor(element));
        });
        // this.$store.commit("SET_PAGES_DATA", {
        //   currentIndex: this.$route.query.pageindex,
        //   totalPages: courses.data.getCoursesList.total_pages,
        //   currentPage: courses.data.getCoursesList.current,
        //   listLimit: QUERIES.listLimit
        // });
      }
    },
    onPicture(value) {
      let file = event.target.files[0];
      let path = "Counselors";
      this.counselorPicture = new imageType(file, path, this.$store);
      this.editedItem.image = this.counselorPicture.fileUrl;
    },
    removeImage(imageDTO) {
      imageDTO.delete(this.$store);
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