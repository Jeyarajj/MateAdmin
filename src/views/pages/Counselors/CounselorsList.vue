<template>
  <div>
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

        <v-dialog v-model="dialog" persistent max-width="900px">
        <v-btn slot="activator" color="primary" dark class="mb-2">
          <v-icon left dark>add_circle</v-icon> Add New Counsellor</v-btn>
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
                  <v-text-field prepend-icon="person" v-model="editedItem.name"
                  :error-messages="fieldErrors('editedItem.name')"
                  @input="$v.editedItem.name.$touch()"
                  @blur="$v.editedItem.name.$touch()"
                  label="First Name" box></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field prepend-icon="email" v-model="editedItem.email" 
                  :error-messages="fieldErrors('editedItem.email')"
                  @input="$v.editedItem.email.$touch()"
                  @blur="$v.editedItem.email.$touch()"
                  label="Email *"
                  required box></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field prepend-icon="phone" v-model="editedItem.phone" 
                  :error-messages="fieldErrors('editedItem.phone')"
                  @input="$v.editedItem.phone.$touch()"
                  @blur="$v.editedItem.phone.$touch()"
                  label="Phone" box></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <country-select
                    class="countryselectborder"
                    v-model="editedItem.country"
                    :country="editedItem.country"
                    topCountry="US"
                  />
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <region-select
                    class="regionselectborder"
                    v-model="editedItem.city"
                    :country="editedItem.country"
                    :region="editedItem.city"
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
                      <v-btn color="error" dark @click="removeImage(counselorPicture)" class="removebtn_counsellor">
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
                    ref="upload">
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

    <v-data-table :headers="headers" :items="counselorsList" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="justify-center">{{ props.item.email }}</td>
        <td class="justify-center">{{props.item.phone}}</td>
        <td class="justify-center">{{ props.item.country }}</td>
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
import { UPDATE_COUNSELOR, GET_COUNSELOR } from "@/gql-constants/counselor";

import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
import { validNumber } from '@/utils/validators'
import validationMixin from '@/mixins/validationMixin'

export default {
  mixins: [validationMixin],
  validations: {
    editedItem: {
      name: { required },
      email: { email },
      phone: { 
          required,
          validNumber,
          maxLength: maxLength(15),
          minLength: minLength(7) }
    }
  },
  validationMessages: {
    editedItem: {
      name: {
        required: 'Name is required'
      },
      email: {
        email: 'Email required',
        required: 'Email Required'
      },
      phone: {
        required: 'Phone number required',
        maxLength: 'Max 14 digits',
        minLength: 'Min 7 digits',
        validNumber: 'Phone number must be a valid number'
      }
    }
  },
  data: () => ({
    title: 'Manage Counsellors',
    icon: 'playlist_add_check',
    breadcrumbs: [
    {
      text: 'Home',
      disabled: true
    },
    {
      text: 'Counsellors',
      disabled: true
    },
    {
      text: 'Manage Counsellors',
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
    editedIndex: -1,
    editedItem: {
      _id: null,
      name: "",
      email: "",
      country: "",
      city: "",
      phone: "",
      image: ""
    },
    defaultItem: {
      _id:null,
      name: "",
      mail: "",
      country: "",
      city: "",
      phone: "",
      image: ""
    }
  }),
  apollo: {
    counselorsList: {
      query: GET_COUNSELOR,
      update(data) {
        // this.$store.commit("SET_PAGES_DATA", {
        //   currentIndex: data.search.university.page.from,
        //   totalPages: data.search.university.pages.total,
        //   currentPage: data.search.university.pages.current,
        //   listLimit: this.institutionListLimit
        // });
        // console.log(data);
        // if (data) return data.search.university.items;
        console.log(data.getCounselor);
        return data.getCounselor;
      },
      error(error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapGetters([]),
    formTitle() {
      return this.editedIndex === -1 ? "Add New Counsellor" : "Edit Counsellor";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    onPicture(value) {
      let file = event.target.files[0];
      let path = "Counselors";
      this.counselorPicture = new imageType(file, path, this.$store);
      this.editedItem.image = this.counselorPicture.fileUrl;
    },
    removeImage(imageDTO) {
      imageDTO.delete(this.$store);
    },

    editItem(item) {
      this.editedIndex = this.counselorsList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      let path = "Counselors";
      if (this.editedItem.image)
        this.counselorPicture = new imageType(
          null,
          path,
          this.$store,
          this.editedItem.image
        );
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.counselorsList.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.counselorsList.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.counselorsList[this.editedIndex], this.editedItem);
      }
      console.log(this.editedItem);
      this.$apollo
        .mutate({
          mutation: UPDATE_COUNSELOR,
          variables: this.editedItem
        })
        .then(data => {
          this.editedItem._id = data.data.createcounselor._id;
          if (this.editedIndex == -1) {
            // Only on create condition
            this.counselorsList.push(this.editedItem);
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.close();
    }
  }
};
</script>