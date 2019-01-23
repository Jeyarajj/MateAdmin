<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>My CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.name" label="First Name"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md12>
                  <v-text-field prepend-icon="email" v-model="editedItem.mail" label="Email *"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <country-select v-model="editedItem.country" :country="country" topCountry="US"/>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <region-select
                    v-model="editedItem.city"
                    :country="editedItem.country"
                    :region="city"
                  />
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <ul>
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
                    ref="upload"
                  >
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
        <td class="text-xs-right">{{ props.item.mail }}</td>
        <td class="text-xs-right">{{props.item.phone}}</td>
        <td class="text-xs-right">{{ props.item.country }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { imageType } from "../../../dto/imageType";
import { GET_INSTITUTIONS_INDEX } from "../../../gql-constants/university";
export default {
  data: () => ({
    counselorPicture: imageType,
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Mail", value: "mail" },
      { text: "Country", value: "Country" },
      { text: "Phone", value: "Phone" }
    ],
    dialog: false,
    editedIndex: -1,
    editedItem: {
      name: "",
      mail: "",
      country: "",
      city: "",
      phone: "",
      picture: ""
    },
    defaultItem: {
      name: "",
      mail: "",
      country: "",
      city: "",
      phone: "",
      picture: ""
    }
  }),
  apollo: {
    // counselorsList: {
    //   query: GET_INSTITUTIONS_INDEX,
    //   variables() {
    //     return {
    //       text: this.searchInstitution,
    //       page: {
    //         from: this.$route.query.pageindex,
    //         limit: this.institutionListLimit
    //       }
    //     };
    //   },
    //   update(data) {
    //     this.$store.commit("SET_PAGES_DATA", {
    //       currentIndex: data.search.university.page.from,
    //       totalPages: data.search.university.pages.total,
    //       currentPage: data.search.university.pages.current,
    //       listLimit: this.institutionListLimit
    //     });
    //     return data.search.university.items;
    //   },
    //   error(error) {
    //     console.log(error);
    //   }
    // }
  },
  computed: {
    ...mapGetters([]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },
  methods: {
    onPicture(value) {
      let file = event.target.files[0];
      let path = "Counselors";
      this.counselorPicture = new imageType(file, path, this.$store);
    },
    removeImage(imageDTO) {
      imageDTO.delete(this.$store);
    },
    initialize() {
      this.counselorsList = [
        {
          name: "counselorName",
          mail: "mail@gmail.com",
          phone: "000000000",
          country: "India",
          city: "Chennai",
          picture: "urltotheImage"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.counselorsList.indexOf(item);
      this.editedItem = Object.assign({}, item);
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
      } else {
        this.counselorsList.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>