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
        <v-btn slot="activator" @click="openEdit()" color="primary" dark class="mb-2">
          <v-icon left dark>add_circle</v-icon>Add Scholarship
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
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="defaultScholarship._details.name" label="First Name"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md2>
                  <v-select
                    :items="availableCurrencies"
                    v-model="defaultScholarship._details.amount.currency"
                    label="Currency"
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="defaultScholarship._details.amount.value" label="Amount"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-select
                    :items="institutions"
                    item-text="_details.name"
                    item-value="_id"
                    v-model="defaultScholarship._details.university_id"
                    label="University"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="defaultScholarship._details.website" label="Website URL"></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-textarea
                    v-model="defaultScholarship._details.description"
                    label="Description min 200 words"
                    auto-grow rows="1"
                  ></v-textarea>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <ul>
                    <v-icon v-if="scholarshipPicture.uploadStatus">fas fa-circle-notch fa-spin</v-icon>
                    <li v-if="scholarshipPicture.exists">
                      <img :src="scholarshipPicture.fileUrl" width="50" height="auto">
                      <span @click="removeImage(scholarshipPicture)">Remove</span>
                    </li>
                    <li v-else>
                      <img :src="defaultScholarship._details.picture" width="50" height="auto">
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
            <v-btn color="normal" @click="close">Cancel</v-btn>
            <v-btn color="green" dark @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table :headers="headers" :items="scholarships" :hide-actions="true" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item._details.name }}</td>
        <td class="justify-center">{{ props.item._details.website }}</td>
        <!-- <td class="text-xs-right">{{ props.item.amount.currency }}{{ props.item.amount.value }}</td> -->
        <td class="justify-center">{{ props.item._details.description }}</td>
        <td class="justify-center">{{ props.item.active }}</td>

        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon v-if="props.item.status != 'disable'" small @click="deleteItem(props.item)">delete</v-icon>
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
import { mapGetters } from "vuex";
import { imageType } from "../../../dto/imageType";
import Pagination from "@/components/shared/Pagination";
import { Scholarship } from "../../../dto/scholarships.js";
import { University } from "../../../dto/university";
import { QUERIES } from "../../../gql-constants/scholarships.js"
export default {
  components: {
    Pagination
  },
  data: () => ({
    institutions:[],
    dialog:false,
    title: "Manage Scholarships",
    icon: "playlist_add_check",
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
        text: "Manage Scholarships",
        disabled: true
      }
    ],
    scholarshipPicture: imageType,
    defaultScholarship: Scholarship,
    scholarships: [],
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Website", value: "website" },
      // { text: "Amount", value: "amount" },
      { text: "Description", value: "description" },
      { text: "Status", value: "status" }
    ]
  }),
  computed: {
    ...mapGetters(["availableCurrencies", "userBasicInfoProfile"]),
    formTitle() {
      return "Edit Item";
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

  methods: {
    onPicture(value) {
      let file = event.target.files[0];
      let path = "Scholarships";
      if (this.defaultScholarship._details.picture)
        this.scholarshipPicture = new imageType(
          null,
          path,
          this.$store,
          this.defaultScholarship._details.picture
        );
    },
    removeImage(imageDTO) {
      imageDTO.delete(this.$store);
    },
    initialize() {
      this.scholarships = [];
    },

    editItem(item) {
      this.defaultScholarship = new Scholarship(item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        console.log("delete scholarship");
    },

    close() {
      this.dialog = false;
    },
    async getScholarships(page) {
      if (page === undefined) page = 0;
      const results = await Scholarship.getScholarships(page);
      console.log(results)
      this.scholarships = [];
      if (results) {
        results.data.getScholarshipsList.scholarships.forEach(element => {
          this.scholarships.push(new Scholarship(element));
        });
        this.$store.commit("SET_PAGES_DATA", {
          currentIndex: this.$route.query.pageindex,
          totalPages: results.data.getScholarshipsList.total_pages,
          currentPage: results.data.getScholarshipsList.current,
          listLimit: QUERIES.listLimit
        });
      }
    },
    openEdit() {
      this.defaultScholarship = new Scholarship();
    },
    async save() {
      const res = await this.defaultScholarship.createScholarship();
      if (res.data.hasOwnProperty("createScholarship")) {
        this.defaultScholarship._id = res.data.createScholarship._id;
        this.scholarships.push(this.defaultScholarship);
      }
      this.close();
    },
    async getInstitutes(page) {
      const result = await University.getUniversities(1);
    this.institutions = result.data.getUniversities.university;
    }
  },
  created() {
    this.getInstitutes(1)
    this.defaultScholarship = new Scholarship();
    this.getScholarships(this.$route.query.pageindex);
    console.log(this.defaultScholarship);
  }
};
</script>