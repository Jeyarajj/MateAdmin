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
                  <v-text-field v-model="editedItem.first_name" label="First Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.last_name" label="Last Name"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md12>
                  <v-text-field prepend-icon="email" v-model="editedItem.email" label="Email *"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="availableCurrencies"
                    v-model="editedItem.amount.currency"
                    label
                    outline
                  ></v-select>
                  <v-text-field v-model="editedItem.amount.value" label="Amount"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.website" label="Website URL"></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-textarea v-model="editedItem.description" label="Description min 200 words "></v-textarea>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <ul>
                    <v-icon v-if="scholarshipPicture.uploadStatus">fas fa-circle-notch fa-spin</v-icon>
                    <li v-if="scholarshipPicture.exists">
                      <img :src="scholarshipPicture.fileUrl" width="50" height="auto">
                      <span @click="removeImage(scholarshipPicture)">Remove</span>
                    </li>
                    <li v-else>
                      <img :src="editedItem.picture" width="50" height="auto">
                    </li>
                  </ul>
                  <file-upload
                    input-id="scholarshipPicture"
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
    <v-data-table :headers="headers" :items="scholarships" :hide-actions=true class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.first_name }} {{ props.item.last_name }}</td>
        <td class="justify-center">{{ props.item.email }}</td>
        <!-- <td class="text-xs-right">{{ props.item.amount.currency }}{{ props.item.amount.value }}</td> -->
        <td class="justify-center">{{ props.item.description }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
    <Pagination />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { imageType } from "../../../dto/imageType";
import Pagination from '@/components/shared/Pagination'
import {
  GET_SCHOLARSHIPS,
  CREATE_SCHOLARSHIP
} from "../../../gql-constants/scholarships";
export default {
  components: {
    Pagination
  },
  data: () => ({
    scholarshipPicture: imageType,
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Mail", value: "email" },
      // { text: "Amount", value: "amount" },
      { text: "Description", value: "description" }
    ],
    currentIndex: null,
    totalPages: null,
    currentPage: null,
    scholarshipLimit: 10,
    dialog: false,
    editedIndex: -1,

    editedItem: {
      _id: null,
      first_name: "",
      last_name: "",
      website: "",
      description: "",
      picture: "",
      amount: {
        currency: "USD",
        value: 0
      },
      email: "",
      university_id: "5a6ad428ffb81219d4932cfa",
      created_by: "5a6ad428ffb81219d4932cfa",
      updated_by: "5a6ad428ffb81219d4932cfa",
      status: true
    },
    defaultItem: {
      _id: null,
      first_name: "",
      last_name: "",
      website: "",
      description: "",
      picture: "",
      amount: {
        currency: "USD",
        value: 0
      },
      email: "",
      university_id: "5a6ad428ffb81219d4932cfa",
      created_by: "5a6ad428ffb81219d4932cfa",
      updated_by: "5a6ad428ffb81219d4932cfa",
      status: true
    }
  }),
  apollo: {
    scholarships: {
      query: GET_SCHOLARSHIPS,
      variables() {
        return {
          text: "",
          page: {
            from: this.$route.query.pageindex,
            limit: this.scholarshipLimit
          }
        };
      },
      update(data) {
        this.$store.commit("SET_PAGES_DATA", {
          currentIndex: data.search.scholarship.page.from,
          totalPages: data.search.scholarship.pages.total,
          currentPage: data.search.scholarship.pages.current,
          listLimit: this.scholarshipLimit
        });
        console.log(data);
        return data.search.scholarship.items;
      },
      error(error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapGetters(["availableCurrencies", "userBasicInfoProfile"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
      let path = "Scholarships";
      if (this.editedItem.picture)
        this.scholarshipPicture = new imageType(
          null,
          path,
          this.$store,
          this.editedItem.picture
        );
    },
    removeImage(imageDTO) {
      imageDTO.delete(this.$store);
    },
    initialize() {
      this.scholarships = [
        // {
        //   first_name: "FirstName",
        //   last_name: "SecondName",
        //   mail: "mail@gmail.com",
        //   amount: {
        //     currency: "CURRENCY",
        //     value: 200
        //   },
        //   description: "ScholarhipDescription",
        //   website: "www.scholarship.com",
        //   picture: "urltotheImage"
        // }
      ];
    },

    editItem(item) {
      this.editedIndex = this.scholarships.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.scholarships.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.scholarships.splice(index, 1);
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
        Object.assign(this.scholarships[this.editedIndex], this.editedItem);
      }
      this.$apollo
        .mutate({
          mutation: CREATE_SCHOLARSHIP,
          variables: this.editedItem
        })
        .then(data => {
          this.editedItem._id = data.data.createScholarship._id;
          if (this.editedIndex == -1) {
            // Only on create condition
            this.scholarships.push(this.editedItem);
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