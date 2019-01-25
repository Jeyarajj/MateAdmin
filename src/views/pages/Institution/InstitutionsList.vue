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
                  <v-text-field v-model="editedItem.institution_name" label="Institution Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <v-text-field v-model="editedItem.institution_slug" label="Institution Slug"></v-text-field>
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
                <v-flex xs12 sm12 md12>
                  <ul>
                      <v-icon v-if="institutionLogo.uploadStatus">fas fa-circle-notch fa-spin</v-icon>
                    <li v-if="institutionLogo.exists">
                      <img :src="institutionLogo.fileUrl" width="50" height="auto">
                      <span @click="removeImage(institutionLogo)">Remove</span>
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
                    <li v-for="(image,i) in institutionBanners" :key="i">
                       <v-icon v-if="image.uploadStatus">fas fa-circle-notch fa-spin</v-icon>
                      <img v-if="image.exists" :src="image.fileUrl" width="50" height="auto">
                      <span @click="removeBannerImage(i)">Remove</span>
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
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.city.name }}</td>
        <td class="text-xs-right">{{ props.item.address }}</td>
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
const baseUrl = "https://s3.us-east-2.amazonaws.com/matefiles/Institution/";
export default {
  data: () => ({
    institutionLogo: imageType,
    institutionBanners: [],
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
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),
  apollo: {
    institutionsResults: {
      query: GET_INSTITUTIONS_INDEX,
      variables() {
        return {
          text: this.searchInstitution,
          page: {
            from: this.$route.query.pageindex,
            limit: this.institutionListLimit
          }
        };
      },
      // update(data) {
      //   this.$store.commit("SET_PAGES_DATA", {
      //     currentIndex: data.search.university.page.from,
      //     totalPages: data.search.university.pages.total,
      //     currentPage: data.search.university.pages.current,
      //     listLimit: this.institutionListLimit
      //   });
      //   return data.search.university.items;
      // },
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

  created() {
    this.initialize();
  },
  methods: {
    onInstitutionLogo(value) {
      let file = event.target.files[0];
      let path = "Institution";
      this.institutionLogo = new imageType(file, path, this.$store);
    },
    removeImage(imageDTO) {
      imageDTO.delete(this.$store);
    },
    onInstitutionBanner(value) {
      for (let index = 0; index < event.target.files.length; index++) {
        const element = event.target.files[index];
        let file = element;
        let path = "Institution/Banner";
        this.institutionBanners.push(new imageType(file, path, this.$store));
      }
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
    // inputFilter(newFile, oldFile, prevent) {
    //   if (newFile && !oldFile) {
    //     // Before adding a file
    //     // 添加文件前
    //     // Filter system files or hide files
    //     // 过滤系统文件 和隐藏文件
    //     if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
    //       return prevent();
    //     }
    //     // Filter php html js file
    //     // 过滤 php html js 文件
    //     if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
    //       return prevent();
    //     }
    //     // Automatic compression
    //     // 自动压缩
    //   }
    //   if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
    //     // Create a blob field
    //     // 创建 blob 字段
    //     newFile.blob = "";
    //     let URL = window.URL || window.webkitURL;
    //     if (URL && URL.createObjectURL) {
    //       newFile.blob = URL.createObjectURL(newFile.file);
    //     }
    //     // Thumbnails
    //     // 缩略图
    //     newFile.thumb = "";
    //     if (newFile.blob && newFile.type.substr(0, 6) === "image/") {
    //       newFile.thumb = newFile.blob;
    //     }
    //   }
    // },
    // // add, update, remove File Event
    // inputFile(newFile, oldFile) {
    //   if (newFile && oldFile) {
    //     // update
    //     if (newFile.active && !oldFile.active) {
    //       // beforeSend
    //       // min size
    //       if (
    //         newFile.size >= 0 &&
    //         this.minSize > 0 &&
    //         newFile.size < this.minSize
    //       ) {
    //         this.$refs.upload.update(newFile, { error: "size" });
    //       }
    //     }
    //     if (newFile.progress !== oldFile.progress) {
    //       // progress
    //     }
    //     if (newFile.error && !oldFile.error) {
    //       // error
    //     }
    //     if (newFile.success && !oldFile.success) {
    //       // success
    //     }
    //   }
    //   if (!newFile && oldFile) {
    //     // remove
    //     if (oldFile.success && oldFile.response.id) {
    //       // $.ajax({
    //       //   type: 'DELETE',
    //       //   url: '/upload/delete?id=' + oldFile.response.id,
    //       // })
    //     }
    //   }
    //   // Automatically activate upload
    //   if (
    //     Boolean(newFile) !== Boolean(oldFile) ||
    //     oldFile.error !== newFile.error
    //   ) {
    //     if (this.uploadAuto && !this.$refs.upload.active) {
    //       this.$refs.upload.active = true;
    //     }
    //   }
    // },
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>