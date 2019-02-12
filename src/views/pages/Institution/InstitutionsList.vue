<template>
  <div>
    <v-toolbar flat extended class="transparent section-definition-toolbar">
      <v-avatar class="box-glow" tile>
        <v-icon dark v-html="icon" v-if="icon"></v-icon>
        <span v-else>{{ title | first2Char }}</span>
      </v-avatar>
      <v-toolbar-title class="primary--text">{{ title }}</v-toolbar-title>
      <v-toolbar-title class="toobar-extension" slot="extension">
        <v-breadcrumbs :items="breadcrumbs" class="pl-0">
          <v-icon slot="divider" color="primary">chevron_right</v-icon>
        </v-breadcrumbs>
        <slot></slot>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" persistent max-width="900px">
        <v-btn slot="activator" @click="openEditInstitution()" color="primary" dark class="mb-2">
          <v-icon left dark>add_circle</v-icon>Add New Institution
        </v-btn>
        <v-card id="myModal">
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
                    :error-messages="fieldErrors('defaultInstitution._details.name')"
                    @input="$v.defaultInstitution._details.name.$touch()"
                    @blur="$v.defaultInstitution._details.name.$touch()"
                    v-model="defaultInstitution._details.name"
                    label="Institution Name"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md12>
                  <v-text-field
                    :error-messages="fieldErrors('defaultInstitution.email')"
                    @input="$v.defaultInstitution.email.$touch()"
                    @blur="$v.defaultInstitution.email.$touch()"
                    v-model="defaultInstitution.email"
                    label="Institution Mail"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="defaultInstitution._details.slug"
                    label="Institution Slug"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="defaultInstitution._details.website"
                    :error-messages="fieldErrors('defaultInstitution._details.website')"
                    @input="$v.defaultInstitution._details.website.$touch()"
                    @blur="$v.defaultInstitution._details.website.$touch()"
                    label="Website URL"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="institution_type"
                    v-model="defaultInstitution._details.institutionType"
                    :error-messages="fieldErrors('defaultInstitution._details.institutionType')"
                    @input="$v.defaultInstitution._details.institutionType.$touch()"
                    @blur="$v.defaultInstitution._details.institutionType.$touch()"
                    label="Institution Type"
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <country-select
                    class="countryselectborder"
                    v-model="defaultInstitution._details.address.country"
                    :country="defaultInstitution._details.address.country"
                    topCountry="US"
                    :error-messages="fieldErrors('defaultInstitution._details.address.country')"
                    @input="$v.defaultInstitution._details.address.country.$touch()"
                    @blur="$v.defaultInstitution._details.address.country.$touch()"
                  />
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <region-select
                    class="regionselectborder"
                    v-model="defaultInstitution._details.address.city"
                    :country="defaultInstitution._details.address.country"
                    :region="defaultInstitution._details.address.city"
                  />
                </v-flex>
                <!-- <v-flex xs12 sm6 md4>
                  <v-select :items="country" label="Country" v-model="editedItem.country" outline></v-select>
                </v-flex>-->
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="defaultInstitution._details.address.addr"
                    :error-messages="fieldErrors('defaultInstitution._details.address.addr')"
                    @input="$v.defaultInstitution._details.address.addr.$touch()"
                    @blur="$v.defaultInstitution._details.address.addr.$touch()"
                    label="Institution Address"
                    auto-grow
                    rows="2"
                  ></v-textarea>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="defaultInstitution._details.description"
                    :error-messages="fieldErrors('defaultInstitution._details.description')"
                    @input="$v.defaultInstitution._details.description.$touch()"
                    @blur="$v.defaultInstitution._details.description.$touch()"
                    label="Description min 200 words"
                    auto-grow
                    rows="2"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-select
                    :items="status"
                    v-model="defaultInstitution.active"
                    label="Institution Status"
                    box
                  ></v-select>
                </v-flex>
                <template>

                   <v-flex xs12 sm12 md6>
                  <v-progress-linear
                  v-if="institutionLogo.uploadStatus"
                  indeterminate
                  color="light-green darken-2"
                  class="mb-0"
                ></v-progress-linear>
                    <span v-if="institutionLogo.exists">
                       <v-img :src="institutionLogo.fileUrl" aspect-ratio="1.7"></v-img>
                      <v-btn color="error" dark @click="removeImage(institutionLogo)" class="removebtn_counsellor">
                        <v-icon dark left>remove_circle</v-icon>Remove
                      </v-btn>
                    </span>
                    <span>
                      <v-img :src="defaultInstitution._details.logo" aspect-ratio="1.7"></v-img>
                    </span>
                  <file-upload
                    input-id="file1"
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                    :multiple="false"
                    :size="1024 * 1024 * 10"
                    @input="onInstitutionLogo"
                    ref="upload">
                    <v-btn color="primary" dark>
                        <v-icon left dark>add_photo_alternate</v-icon>Upload Picture
                    </v-btn>
                 </file-upload>
                </v-flex>


                  <!-- <v-icon v-if="institutionLogo.uploadStatus">fas fa-circle-notch fa-spin</v-icon>
                  <v-flex xs12 sm12 md12>
                    <ul>
                      <li v-if="institutionLogo.exists">
                        <img :src="institutionLogo.fileUrl" width="50" height="auto">
                        <span @click="removeImage(institutionLogo)">Remove</span>
                      </li>
                      <li v-else>
                        <img :src="defaultInstitution._details.logo" height="50" width="auto">
                      </li>
                    </ul>
                    <file-upload
                      input-id="file1"
                      class="btn btn-primary"
                      extensions="gif,jpg,jpeg,png,webp"
                      accept="image/png, image/gif, image/jpeg, image/webp"
                      :multiple="false"
                      :size="1024 * 1024 * 10"
                      @input="onInstitutionLogo"
                      ref="upload"
                    >
                      <v-btn color="primary" dark>
                        <v-icon left dark>add_photo_alternate</v-icon>Upload Logo
                      </v-btn>
                    </file-upload>
                  </v-flex> -->
                  <v-flex xs12 sm12 md12>
                    <br>
                    <br>
                    <ul>
                      <!-- <div v-if="institutionBanners.length > 0">
                        <li v-for="(image,i) in institutionBanners" :key="i">
                          <span>{{image.fileData.name}}</span> -
                          <img :src="image.fileUrl" width="50" height="auto">
                          <span @click="removeBannerImage(i)">Remove</span>
                        </li>
                      </div>-->
                      <li v-for="(image,i) in defaultInstitution._details.banners" :key="i">
                        <img :src="image" width="50" height="auto">
                      </li>
                    </ul>
                    <file-upload
                      class="btn btn-primary"
                      input-id="file2"
                      extensions="gif,jpg,jpeg,png,webp"
                      accept="image/png, image/gif, image/jpeg, image/webp"
                      :multiple="true"
                      :size="1024 * 1024 * 10"
                      @input="onInstitutionBanner"
                      ref="uploadBanners"
                    >
                      <v-btn color="primary" dark>
                        <v-icon left dark>add_photo_alternate</v-icon>Upload Banner
                      </v-btn>
                    </file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <br>
                    <br>
                    <ul>
                      <!-- <div v-if="institutionPhotos.length > 0">
                        <li v-for="(image,i) in institutionPhotos" :key="i">
                          <v-icon v-if="image.uploadStatus">fas fa-circle-notch fa-spin</v-icon>

                          <span>{{image.fileData.name}}</span> -
                          <img :src="image.fileUrl" width="50" height="auto">
                          <span @click="removeBannerImage(i)">Remove</span>
                        </li>
                      </div>-->
                      <li v-for="(image,i) in defaultInstitution._details.photos" :key="i">
                        <img :src="image" width="50" height="auto">
                      </li>
                    </ul>
                    <file-upload
                      class="btn btn-primary"
                      input-id="file3"
                      extensions="gif,jpg,jpeg,png,webp"
                      accept="image/png, image/gif, image/jpeg, image/webp"
                      :multiple="true"
                      :size="1024 * 1024 * 10"
                      @input="onInstitutionPhotos"
                      ref="uploadPhotos"
                    >
                      <v-btn color="primary" dark>
                        <v-icon left dark>add_photo_alternate</v-icon>Upload Photos
                      </v-btn>
                    </file-upload>
                  </v-flex>
                </template>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="normal" @click="close">Cancel</v-btn>
            <v-btn
              :disabled="$v.$invalid"
              :class="$v.$invalid ? '' : 'white--text'"
              color="act"
              @click.native="save"
            >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table :headers="headers" :items="institutions" :hide-actions="true" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="justify-center">{{ props.item._details.name }}</td>
        <td class="justify-center">{{ props.item._details.address.city }}</td>
        <td class="justify-center">{{ props.item._details.address.addr }}</td>
        <td class="justify-center">{{ props.item.active }}</td>

        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon v-if="props.item.active != 'disable'" small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
    <Pagination/>
  </div>
</template>
<script>
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";
import { validNumber } from "@/utils/validators";
import validationMixin from "@/mixins/validationMixin";

import { mapGetters } from "vuex";
import { imageType } from "../../../dto/imageType";
import { University } from "../../../dto/university";
import Pagination from "@/components/shared/Pagination";
import { QUERIES } from "../../../gql-constants/university";
export default {
  components: {
    Pagination
  },
  mixins: [validationMixin],
  validations: {
    defaultInstitution: {
      email: { required, email },
      _details: {
        name: { required },
        slug: { required },
        website: { required },
        institutionType: { required },
        address: {
          country: { required },
          addr: { required }
        },
        description: { required }
      }
    }
  },
  validationMessages: {
    defaultInstitution: {
      email: {
        required: "Email is required.",
        email: "Please provide valid email."
      },
      _details: {
        name: { required: "Institution Name is required" },
        slug: { required: "Slug required" },
        website: { required: "Institution Website" },
        institutionType: { required: "Select Type" },
        address: {
          country: { required: "Select Country" },
          addr: { required: "Enter Address" }
        }
      },
      description: { required: "Enter Description" }
    }
  },
  data: () => ({
    defaultInstitution: University,
    institutions: [],
    title: "Manage Institutions",
    icon: "playlist_add_check",
    status: ["enable", "disable"],
    country: "",
    city: "",
    breadcrumbs: [
      {
        text: "Home",
        disabled: true
      },
      {
        text: "Institutions",
        disabled: true
      },
      {
        text: "Manage Institutions",
        disabled: true
      }
    ],
    institutionLogo: imageType,
    totalPages: null,
    currentPage: null,
    institutionListLimit: 10,
    dialog: false,
    institution_type: ["University", "Language School", "Private College"],
    searchInstitution: "",
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      {
        text: "Mail",
        align: "left",
        sortable: false,
        value: "email"
      },
      { text: "City", value: "city" },
      { text: "Address", value: "address" },
      { text: "Status", value: "status" }
    ]
  }),
  computed: {
    ...mapGetters(["institutionFiles", "institutionBanner"]),
    formTitle() {
      return "Edit Institution";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    $route(to, from) {
      console.log(to.query.pageindex);
      this.getInstitutes(to.query.pageindex);
    }
  },
  mounted() {
    window.$(function() {
      window.$(".select2").select2({
        dropdownParent: window.$("#myModal")
      });
    });
  },
  methods: {
    async getInstitutes(page) {
      if (page === undefined) page = 0;
      const universities = await University.getUniversities(QUERIES.listLimit,page);
      this.institutions = [];
      if (universities) {
        universities.data.getUniversities.university.forEach(element => {
          this.institutions.push(new University(element));
        });
        this.$store.commit("SET_PAGES_DATA", {
          currentIndex: this.$route.query.pageindex,
          totalPages: universities.data.getUniversities.total_pages,
          currentPage: universities.data.getUniversities.current,
          listLimit: QUERIES.listLimit
        });
      }
    },
    openEditInstitution() {
      this.defaultInstitution = new University();
    },
    onInstitutionLogo(value) {
      let file = event.target.files[0];
      let path = "Institution/" + this.editedItem._id + "/Logo";
      this.institutionLogo = new imageType(file, path, this.$store);
      this.editedItem.logourl = this.institutionLogo.fileurl;
    },
    removeImage(imageDTO) {
      imageDTO.delete(this.$store);
    },
    onInstitutionBanner(value) {
      let bannerurl = [];
      for (let index = 0; index < event.target.files.length; index++) {
        const element = event.target.files[index];
        let file = element;
        let path = "Institution/" + this.editedItem._id + "/Banner";
        let image = new imageType(file, path, this.$store);
        console.log(image.fileUrl);

        bannerurl.push(image.fileUrl);
        this.institutionBanners.push(image);
      }
      this.editedItem.bannerurl = bannerurl;
    },
    onInstitutionPhotos(value) {
      let photos = [];
      for (let index = 0; index < event.target.files.length; index++) {
        const element = event.target.files[index];
        let file = element;
        let path = "Institution/" + this.editedItem._id + "/Photos";
        let image = new imageType(file, path, this.$store);
        photos.push(image.fileUrl);
        this.institutionPhotos.push(image);
      }
    },
    removeBannerImage(index) {
      this.institutionBanners[index].delete(this.$store);
      this.institutionBanners.splice(index, 1);
    },

    editItem(item) {
      this.defaultInstitution = new University(item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.institutionsResults.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.deleteUniversity(item);
    },
    deleteUniversity(item) {
      console.log(item);
    },
    close() {
      this.dialog = false;
    },

    async save() {
      const res = await this.defaultInstitution.createUniversity();
      if (res.data.hasOwnProperty("createUniversity")) {
        this.defaultInstitution._id = res.data.createUniversity._id;
        this.institutions.push(this.defaultInstitution);
      }
      this.close();
    }
  },
  created() {
    this.defaultInstitution = new University();
    this.getInstitutes(this.$route.query.pageindex);
    console.log(this.defaultInstitution);
  }
};
</script>