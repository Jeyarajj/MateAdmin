<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Counselor</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Add New Counsellor</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field prepend-icon="person" v-model="editedItem.name"
                  :error-messages="fieldErrors('editedItem.name')"
                  @input="$v.editedItem.name.$touch()"
                  @blur="$v.editedItem.name.$touch()"
                  label="First Name"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md12>
                  <v-text-field prepend-icon="email" v-model="editedItem.email" 
                  :error-messages="fieldErrors('editedItem.email')"
                  @input="$v.editedItem.email.$touch()"
                  @blur="$v.editedItem.email.$touch()"
                  label="Email *"
                  required></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md12>
                  <v-text-field prepend-icon="phone" v-model="editedItem.phone" 
                  :error-messages="fieldErrors('editedItem.phone')"
                  @input="$v.editedItem.phone.$touch()"
                  @blur="$v.editedItem.phone.$touch()"
                  label="Phone"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <country-select
                    class="countryselectborder"
                    v-model="editedItem.country"
                    :country="editedItem.country"
                    topCountry="US"
                  />
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <region-select
                    class="regionselectborder"
                    v-model="editedItem.city"
                    :country="editedItem.country"
                    :region="editedItem.city"
                  />
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <ul>
                    <v-icon v-if="counselorPicture.uploadStatus">fas fa-circle-notch fa-spin</v-icon>
                    <li v-if="counselorPicture.exists">
                      <img :src="counselorPicture.fileUrl" width="50" height="auto">
                      <span @click="removeImage(counselorPicture)">Remove</span>
                    </li>
                  </ul>
                  <file-upload
                    input-id="counselorPicture"
                    class="btn btn-primary"
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                    :multiple="false"
                    :size="1024 * 1024 * 10"
                    @input="onPicture"
                    ref="upload">
                    <i class="fa fa-plus"></i>
                    Upload Picture
                  </file-upload>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
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
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
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
      { text: "Country", value: "Country" }
    ],
    dialog: false,

    country: "",
    city: "",
    counselordata: "",
    editedIndex: -1,
    editedItem: {
      _id: "",
      name: "",
      email: "",
      country: "",
      city: "",
      phone: "",
      image: ""
    },
    defaultItem: {
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