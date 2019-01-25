<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Home Settings</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-layout class="Cardpadding-25">
      <v-flex xs12 sm12>
        <v-card>
          <v-toolbar flat>
            <v-icon>arrow_right</v-icon>
            <v-toolbar-title>Banner Images</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="openbannerDialog()">Add New Banner</v-btn>
            <v-dialog v-model="bannerdialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{formTitle}}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex
                        xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                      >
                        <img :src="bannerUrl" height="200" v-if="bannerUrl">
                        <!-- <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field> -->
                        <v-btn
                          label="Select Image"
                          @click="pickFile"
                          v-model="imageName"
                          flat
                          icon
                          color="primary"
                        >
                          <v-icon size="50">add_photo_alternate</v-icon>
                        </v-btn>
                        <input
                          type="file"
                          style="display: none"
                          ref="bimage"
                          multiple
                          accept="image/*"
                          @change="onBannerPicked"
                        >
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="upload">Upload</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="homesettings.banners"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>
                <v-avatar :tile="tile" size="54px">
                  <img :src="props.item">
                </v-avatar>
              </td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
              </td>
            </template>
            <template slot="no-data">
              <v-card-title>
                <span class="headline">{{nodata}}</span>
              </v-card-title>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <!--LOGO  -->
    <v-layout class="Cardpadding-25">
      <v-flex xs12 sm12>
        <v-card>
          <v-toolbar flat>
            <v-icon>arrow_right</v-icon>
            <v-toolbar-title>Logo</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="openlogoDialog()">Add Logo</v-btn>
            <v-dialog v-model="logoDialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{logoTitle}}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex
                        xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                      >
                        <img :src="imageUrl" height="200" v-if="imageUrl">
                        <!-- <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>  -->
                        <v-btn
                          label="Select Image"
                          @click="lpickFile"
                          v-model="logoName"
                          flat
                          icon
                          color="primary"
                        >
                          <v-icon size="50">add_photo_alternate</v-icon>
                        </v-btn>
                        <input
                          type="file"
                          style="display: none"
                          ref="image"
                          accept="image/*"
                          @change="onlogoPicked"
                        >
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="logoclose">Cancel</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="upload">Upload</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            :headers="lheaders"
            :items="homesettings.logo"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>
                <v-avatar :tile="tile" size="54px">
                  <img :src="props.item">
                </v-avatar>
              </td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="leditItem(props.item)">edit</v-icon>
                <v-icon small @click="ldeleteItem(props.item)">delete</v-icon>
              </td>
            </template>
            <template slot="no-data">
              <v-card-title>
                <span class="headline">{{nodata}}</span>
              </v-card-title>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" @click="save()">Save</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { imageType } from "../../../dto/imageType";
import { HOMESETTING, GET_HOMESETTINGS } from "@/gql-constants/settings";
export default {
  data: () => ({
    imageName: "",
    logoName: "",
    imageUrl: "",
    bannerUrl: "",
    imageFile: "",
    nodata: "No Data Available",
    HomepageLogo: imageType,
    tile: false,
    dialog: false,
    bannerdialog: false,
    banners: [],
    logoDialog: false,
    headers: [
      {
        text: "Image",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ],
    lheaders: [
      {
        text: "Image",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ],
    homesettings: {
      banners: [],
      logo: []
    },
    editedIndex: -1,
    logoIndex: -1
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New Banner" : "Edit Banner";
    },
    logoTitle() {
      return this.logoIndex === -1 ? "Add New Logo" : "Edit Logo";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    bannerdialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },
  apollo: {
    GetUsers: {
      query: GET_HOMESETTINGS,
      update(data) {
        if (data.homeSettingquery.banner !== null) {
          for (
            let index = 0;
            index < data.homeSettingquery.banner.length;
            index++
          ) {
            this.homesettings.banners.push(data.homeSettingquery.banner[index]);
          }
        }
        if (this.homesettings.logo.length == 0)
          this.homesettings.logo.push(data.homeSettingquery.logo);
      },
      error(error) {
        console.log(error);
      }
    }
  },
  methods: {
    initialize() {},
    pickFile() {
      this.$refs.bimage.click();
    },
    lpickFile() {
      this.$refs.image.click();
    },
    openlogoDialog() {
      this.logoDialog = true;
      this.imageUrl = "";
    },
    openbannerDialog() {
      this.bannerUrl = "";
      this.bannerdialog = true;
    },
    onBannerPicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        for (let index = 0; index < event.target.files.length; index++) {
          const element = event.target.files[index];
          let file = element;
          let path = "Homepage/Banner";
          let filedata = new imageType(file, path, this.$store);
          if (this.editedIndex === -1) {
            this.homesettings.banners.push(filedata.fileUrl);
            this.bannerUrl = this.homesettings.banners[
              this.homesettings.banners.length - 1
            ];
          } else {
            this.homesettings.banners.splice(this.editedIndex, 1);
            this.homesettings.banners[this.editedIndex] = filedata.fileUrl;
            this.bannerUrl = this.homesettings.banners[this.editedIndex];
          }
        }
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.bannerUrl = "";
      }
    },

    onlogoPicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        let file = event.target.files[0];
        let path = "Homepage/logo";
        this.HomepageLogo = new imageType(file, path, this.$store);
        this.imageUrl = this.HomepageLogo.fileUrl;
        this.homesettings.logo.splice(0, 1);
        this.homesettings.logo[0] = this.HomepageLogo.fileUrl;
      } else {
        this.logoName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    upload() {
      this.bannerdialog = false;
      this.logoDialog = false;
    },
    editItem(item) {
      this.editedIndex = this.homesettings.banners.indexOf(item);
      this.bannerUrl = this.homesettings.banners[this.editedIndex];
      this.bannerdialog = true;
    },

    deleteItem(item) {
      const index = this.homesettings.banners.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.homesettings.banners.splice(index, 1);
    },

    leditItem(item) {
      this.logoIndex = this.homesettings.logo.indexOf(item);
      this.imageUrl = this.homesettings.logo[0];
      this.logoDialog = true;
    },

    ldeleteItem(item) {
      const index = this.homesettings.logo.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.homesettings.logo.splice(index, 1);
    },

    logoclose() {
      this.logoDialog = false;
    },
    close() {
      this.dialog = false;
      this.bannerdialog = false;
      setTimeout(() => {
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      console.log(this.homesettings);
      let data = {
        logo: this.homesettings.logo[0],
        banner: this.homesettings.banners,
        service_we_provide: "Dummy Data"
      };
      console.log(data);
      this.$apollo.mutate({
        mutation: HOMESETTING,
        variables: data,
        update: () => {
          console.log("updated Successfully");
        },
        error: () => {}
      });
    }
  }
};
</script>