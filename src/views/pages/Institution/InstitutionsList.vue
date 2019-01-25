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
                  <v-text-field v-model="editedItem.name" label="Institution Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.slug" label="Institution Slug"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.website" label="Website URL"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="institution_type"
                    v-model="editedItem.institution_type"
                    label="Institution Type"
                    outline
                  ></v-select>
                </v-flex>
                <!-- <v-flex xs12 sm6 md4>
                  <v-select :items="city" label="City" v-model="editedItem.city" outline></v-select>
                </v-flex>-->
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
                <!-- <v-flex xs12 sm6 md4>
                  <v-select :items="country" label="Country" v-model="editedItem.country" outline></v-select>
                </v-flex>-->
                <v-flex xs12 sm12 md12>
                  <v-textarea v-model="editedItem.address" label="Institution Address"></v-textarea>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-textarea v-model="editedItem.description" label="Description min 200 words "></v-textarea>
                </v-flex>
                <template v-if="editedIndex !== -1">
                  <v-icon v-if="institutionLogo.uploadStatus">fas fa-circle-notch fa-spin</v-icon>
                  <v-flex xs12 sm12 md12>
                    <ul>
                      <li v-if="institutionLogo.exists">
                        <img :src="institutionLogo.fileUrl" width="50" height="auto">
                        <span @click="removeImage(institutionLogo)">Remove</span>
                      </li>
                      <li v-else>
                        <img :src="editedItem.logourl" height="50" width="auto">
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
                      <i class="fa fa-plus"></i>
                      Upload Logo
                    </file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <br>
                    <br>
                    <ul>
                      <div v-if="institutionBanners.length > 0">
                        <li v-for="(image,i) in institutionBanners" :key="i">
                          <span>{{image.fileData.name}}</span> -
                          <img :src="image.fileUrl" width="50" height="auto">
                          <span @click="removeBannerImage(i)">Remove</span>
                        </li>
                      </div>
                      <li v-else v-for="(image,i) in editedItem.bannerurl" :key="i">
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
                      <i class="fa fa-plus"></i>
                      Upload Banner
                    </file-upload>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <br>
                    <br>
                    <ul>
                      <div v-if="institutionPhotos.length > 0">
                        <li v-for="(image,i) in institutionPhotos" :key="i">
                          <span>{{image.fileData.name}}</span> -
                          <img :src="image.fileUrl" width="50" height="auto">
                          <span @click="removeBannerImage(i)">Remove</span>
                        </li>
                      </div>
                      <li v-else v-for="(image,i) in editedItem.photos" :key="i">
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
                      <i class="fa fa-plus"></i>
                      Upload Photos
                    </file-upload>
                  </v-flex>
                </template>
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
    <v-data-table :headers="headers" :items="institutionsResults" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="justify-center">{{ props.item.name }}</td>
        <td class="justify-center">{{ props.item.city.name }}</td>
        <td class="justify-center">{{ props.item.address }}</td>
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
import {
  GET_INSTITUTIONS_INDEX,
  UPDATEUNIVERSITY
} from "../../../gql-constants/university";
const baseUrl = "https://s3.us-east-2.amazonaws.com/matefiles/Institution/";
export default {
  data: () => ({
    institutionLogo: imageType,
    institutionBanners: [],
    institutionPhotos: [],
    dialog: false,
    institution_type: ["University", "Language School", "Private College"],
    city: "",
    country: "",
    imageUrl: "",
    imageName: "",
    bannerUrl: "",
    bannerName: "",
    multipleUrl: "",
    multipleName: "",
    searchInstitution: "",
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "City", value: "name" },
      { text: "Address", value: "address" }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      _id: "",
      name: "",
      slug: "",
      website: "",
      institution_type: "",
      country: "",
      city: "",
      address: "",
      description: "",
      logourl: "",
      bannerurl: [],
      photos: [],
      status: "enable"
    },
    defaultItem: {
      name: "",
      slug: "",
      website: "",
      institution_type: "",
      country: "",
      city: "",
      address: "",
      description: "",
      logourl: "",
      bannerurl: [],
      photos: []
    }
  }),
  apollo: {
    institutionsResults: {
      query: GET_INSTITUTIONS_INDEX,
      variables() {
        return {
          text: this.searchInstitution,
          page: {
            from: 0,
            limit: 5
          }
        };
      },
      update(data) {
        // this.$store.commit("SET_PAGES_DATA", {
        //   currentIndex: data.search.university.page.from,
        //   totalPages: data.search.university.pages.total,
        //   currentPage: data.search.university.pages.current,
        //   listLimit: this.institutionListLimit
        // });
        return data.search.university.items;
      },
      error(error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapGetters(["institutionFiles", "institutionBanner"]),
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
      this.editedItem.photos = photos;
    },
    removeBannerImage(index) {
      this.institutionBanners[index].delete(this.$store);
      this.institutionBanners.splice(index, 1);
    },
    fileurl(name) {
      return baseUrl + encodeURI(name);
    },
    inputUpdate(value) {
      let data = {
        folder_name: "Institution",
        file: event.target.files[0]
      };
      this.$store.dispatch("upload", data);
    },
    inputUpdateBanner(value) {
      let files = event.target.files;
      let data = {
        folder_name: "Institution",
        file: files
      };
      this.$store.dispatch("uploadMultiple", data);
    },

    editItem(item) {
      this.editedIndex = this.institutionsResults.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.institutionsResults.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.institutionsResults.splice(index, 1);
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
        Object.assign(
          this.institutionsResults[this.editedIndex],
          this.editedItem
        );
      }
      this.$apollo
        .mutate({
          mutation: UPDATEUNIVERSITY,
          variables: this.editedItem
        })
        .then(data => {
          this.editedItem._id = data.data.UpdateUniversity._id;
          if (this.editedIndex == -1) {
            // Only on create condition
            this.institutionsResults.push(this.editedItem);
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