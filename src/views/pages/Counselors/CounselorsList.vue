<template>
  <div>
    <v-toolbar flat extended class="transparent section-definition-toolbar">
      <v-avatar class="box-glow" tile>
        <v-icon dark v-html="icon" v-if="icon"></v-icon>
        <!-- <span v-else>{{ title | first2Char }}</span> -->
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
        <v-btn @click="openEdit" slot="activator" color="primary" dark class="mb-2">
          <v-icon left dark>add_circle</v-icon>Add New Counselor
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
                    v-model="defaultCounselor._details.name"
                    :error-messages="fieldErrors('defaultCounselor._details.name')"
                    @input="$v.defaultCounselor._details.name.$touch()"
                    @blur="$v.defaultCounselor._details.name.$touch()"
                    label="Name"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field
                    prepend-icon="email"
                    v-model="defaultCounselor.email"
                    :error-messages="fieldErrors('defaultCounselor.email')"
                    @input="$v.defaultCounselor.email.$touch()"
                    @blur="$v.defaultCounselor.email.$touch()"
                    label="Email *"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="defaultCounselor._details.description" label="Description"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="defaultCounselor._details.website" label="Website"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <country-select
                    class="countryselectborder"
                    v-model="defaultCounselor._details.address.country"
                    :country="defaultCounselor._details.address.country"
                    topCountry="US"
                  />
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <region-select
                    class="regionselectborder"
                    v-model="defaultCounselor._details.address.city"
                    :country="defaultCounselor._details.address.country"
                    :region="defaultCounselor._details.address.city"
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

    <v-data-table :headers="headers" :items="counselors" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item._details.name }}</td>
        <td class="justify-center">{{ props.item.email }}</td>
        <td class="justify-center">{{props.item._details.description}}</td>
        <td class="justify-center">
          <v-btn flat icon @click="editItem(props.item)">
            <v-icon small color="primary">edit</v-icon>
          </v-btn>
          <!-- <v-btn flat icon @click="deleteItem(props.item)">
            <v-icon small color="primary">delete</v-icon>
          </v-btn>-->
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
import { Counselor } from "../../../dto/counselors";
export default {
  mixins: [validationMixin],

  validations: {
    defaultCounselor: {
      _details: {
        name: { required }
      },
      email: { email }
    }
  },
  validationMessages: {
    defaultCounselor: {
      _details: {
        name: {
          required: "Name is required"
        }
      },
      email: {
        email: "Email required",
        required: "Email Required"
      }
    }
  },
  mounted() {
    this.loader = this.$loading.show();
  },
  data: () => ({
    loader: "",
    counselors: [],
    defaultCounselor: Counselor,
    title: "Manage Counsellors",
    icon: "playlist_add_check",
    breadcrumbs: [
      {
        text: "Home",
        disabled: true
      },
      {
        text: "Counsellors",
        disabled: true
      },
      {
        text: "Manage Counsellors",
        disabled: true
      }
    ],
    counselorPicture: imageType,
    counselorsLimit: 10,
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Mail", value: "email" },
      { text: "Description", value: "Description" },
      { text: "Action", value: "action" }
    ],
    dialog: false
  }),
  computed: {
    ...mapGetters([]),
    formTitle() {
      return "Edit Counsellor";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    $route(to, from) {
      this.getCounselors(to.query.pageindex);
    }
  },

  methods: {
    openEdit() {
      this.defaultCounselor = new Counselor();
    },
    async getCounselors(page) {
      if (page === undefined) page = 0;
      const results = await Counselor.getCounselors(this.counselorsLimit, page);
      this.loader.hide();
      console.log(results);
      this.counselors = [];
      if (results) {
        results.data.getCounselors.counselor.forEach(element => {
          this.counselors.push(new Counselor(element));
        });
        this.$store.commit("SET_PAGES_DATA", {
          currentIndex: this.$route.query.pageindex,
          totalPages: results.data.getCounselors.total_pages,
          currentPage: results.data.getCounselors.current,
          listLimit: this.counselorsLimit
        });
      }
    },
    onPicture(value) {
      let file = event.target.files[0];
      let path = "Counselors";
      this.counselorPicture = new imageType(file, path, this.$store);
      this.defaultCounselor._details.photo = this.counselorPicture.fileUrl;
    },
    removeImage(imageDTO) {
      imageDTO.delete(this.$store);
    },

    editItem(item) {
      this.defaultCounselor = new Counselor(item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        console.log("delete cousnelor");
    },

    close() {
      this.dialog = false;
    },
    async save() {
      const res = await this.defaultCounselor.createCounselor();
      if (res.data.hasOwnProperty("createCounselor")) {
        this.$toaster.success("Counselor Saved Successfully");
        this.defaultCounselor._id = res.data.createCounselor._id;
        this.counselors.push(this.defaultCounselor);
      } else if (res.data.hasOwnProperty("updateCounselor")) {
        this.$toaster.success("Counselor Updated Successfully");
      }
      this.close();
    }
  },
  created() {
    this.defaultCounselor = new Counselor();
    this.getCounselors(this.$route.query.pageindex);
    console.log(this.defaultCounselor);
  }
};
</script>