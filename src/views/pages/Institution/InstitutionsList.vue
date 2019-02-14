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
                  <v-text-field v-model="defaultInstitution._details.slug" label="Institution Slug"></v-text-field>
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

                <v-flex xs12 sm12 md6 v-if="defaultInstitution._id">
                  <span>
                    <v-img srcset lazy-src :src="defaultInstitution.data.logo.fileUrl" aspect-ratio="1.7"></v-img>
                  </span>
                  <file-upload
                    input-id="file1"
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                    :multiple="false"
                    :size="1024 * 1024 * 10"
                    @input="setLogo"
                    ref="upload"
                  >
                    <v-btn color="primary" dark>
                      <v-icon left dark>add_photo_alternate</v-icon>Upload Picture
                    </v-btn>
                  </file-upload>
                </v-flex>




                <v-flex xs12 sm12 md12  v-if="defaultInstitution._id">
                  <br>
                  <br>
                  <ul>
                    <li v-for="(image,i) in defaultInstitution.data.banners" :key="i">
                      <img :src="defaultInstitution.data.banners[i].fileUrl" width="50" height="auto">
                        <v-btn color="primary" @click="removeBanner(i)">Remove</v-btn>
                    </li>
                  </ul>
                  <file-upload
                    class="btn btn-primary"
                    input-id="file2"
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                    :multiple="false"
                    :size="1024 * 1024 * 10"
                    @input="addBanner"
                    ref="uploadBanners"
                  >
                    <v-btn color="primary" dark>
                      <v-icon left dark>add_photo_alternate</v-icon>Add Banner
                    </v-btn>
                  </file-upload>
                </v-flex>
                

                <v-flex xs12 sm12 md12  v-if="defaultInstitution._id">
                  <br>
                  <br>
                  <ul>
                    <li v-for="(image,i) in defaultInstitution.data.photos" :key="i">
                      <img :src="defaultInstitution.data.photos[i].fileUrl" width="50" height="auto">
                        <v-btn color="primary" @click="removePhoto(i)">Remove</v-btn>
                    </li>
                  </ul>
                  <file-upload
                    class="btn btn-primary"
                    input-id="file3"
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                    :multiple="false"
                    :size="1024 * 1024 * 10"
                    @input="addPhoto"
                    ref="uploadPhotos"
                  >
                    <v-btn color="primary" dark>
                      <v-icon left dark>add_photo_alternate</v-icon>Add Photo
                    </v-btn>
                  </file-upload>
                </v-flex>
                
                
  
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

        <td class="justify-center">
          <v-btn flat icon @click="editItem(props.item)">
            <v-icon small color="primary">edit</v-icon>
          </v-btn>

          <v-btn flat icon @click="deleteItem(props.item)">
            <v-icon v-if="props.item.active != 'disable'" small color="primary">delete</v-icon>
          </v-btn>
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
      const universities = await University.getUniversities(
        QUERIES.listLimit,
        page
      );
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
    setLogo() {
      let file = event.target.files[0];
      let URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
      this.defaultInstitution.data.logo.setFileUrl(URL.createObjectURL(file));
      }
      this.defaultInstitution.setLogo(file)
    },
    addBanner(){
       let file = event.target.files[0];
      this.defaultInstitution.addBanner(file)
      let URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
      this.defaultInstitution.data.banners[this.defaultInstitution.data.banners.length-1].setFileUrl(URL.createObjectURL(file));
      }
    },
    removeBanner(index){
      this.defaultInstitution.removeBanner(index)
    },
    addPhoto(){
       let file = event.target.files[0];
      this.defaultInstitution.addPhoto(file)
      let URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
      this.defaultInstitution.data.photos[this.defaultInstitution.data.photos.length-1].setFileUrl(URL.createObjectURL(file));
      }
    },
    removePhoto(index){
      this.defaultInstitution.removePhoto(index)
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
      if(this.defaultInstitution._id)
      await this.defaultInstitution.updateImages(this.$store);
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