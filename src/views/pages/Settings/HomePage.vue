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

        </v-toolbar>

    <v-layout>
      <v-flex xs12 sm12>
        <v-card>
          <v-toolbar flat>
            <v-icon>arrow_right</v-icon>
            <v-toolbar-title>Banner Images</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="openbannerDialog()">
              <v-icon left dark>add_circle</v-icon>Add New Banner</v-btn>
            <v-dialog v-model="bannerdialog" persistent max-width="500px">
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
                      <v-flex
                        xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                      >
                        <v-icon v-if="bannerImageTemp.uploadStatus">fas fa-circle-notch fa-spin</v-icon>
                        <span
                          @click="removeImage(bannerImageTemp)"
                          v-if="bannerImageTemp.exists"
                        >Remove</span>
                        <img
                          :src="bannerImageTemp.fileUrl"
                          height="200"
                          v-if="bannerImageTemp.exists"
                        >
                        <file-upload
                          input-id="bannerImageTemp"
                          class="btn btn-primary"
                          extensions="gif,jpg,jpeg,png,webp"
                          accept="image/png, image/gif, image/jpeg, image/webp"
                          :multiple="false"
                          v-if="!bannerImageTemp.exists"
                          :size="1024 * 1024 * 10"
                          @input="onBannerPicked"
                          ref="upload"
                        >
                          <v-icon size="50">add_photo_alternate</v-icon>
                        </file-upload>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="normal" @click.native="close">Cancel</v-btn>
                  <v-btn color="green" dark @click.native="uploadBanner">Upload</v-btn>
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
              <td class="justify-center">
                <v-btn flat icon @click="editItem(props.item)">
                <v-icon color="primary" small>edit</v-icon>
                </v-btn>
                <v-btn flat icon @click="deleteItem(props.item)">
                <v-icon color="primary" small>delete</v-icon>
                </v-btn>
              </td>
            </template>
            <template slot="no-data">
              <v-card-title>
                <span class="v-toolbar__title primary--text">{{nodata}}</span>
              </v-card-title>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <!--LOGO  -->
    <v-layout>
      <v-flex xs12 sm12>
        <v-card>
          <v-toolbar flat>
            <v-icon>arrow_right</v-icon>
            <v-toolbar-title>Logo</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="openlogoDialog()">
              <v-icon left dark>add_circle</v-icon>Add Logo</v-btn>
            <v-dialog v-model="logoDialog" persistent max-width="500px">
              <v-card>
                <v-card-title>
                  <v-layout>
                <v-flex row xs6>
                  <span class="v-toolbar__title primary--text">{{logoTitle}}</span>
                </v-flex>
                <v-flex row xs6 text-xs-right>
                  <v-btn flat icon color="primary" @click.native="logoclose()">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>                  
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex
                        xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center"
                      >
                        <v-icon v-if="homePageLogo.uploadStatus">fas fa-circle-notch fa-spin</v-icon>
                        <span @click="removeImage(homePageLogo)" v-if="homePageLogo.exists">Remove</span>
                        <img :src="homePageLogo.fileUrl" height="200" v-if="homePageLogo.exists">
                        <file-upload
                          input-id="homepageLogo"
                          class="btn btn-primary"
                          extensions="gif,jpg,jpeg,png,webp"
                          accept="image/png, image/gif, image/jpeg, image/webp"
                          :multiple="false"
                          v-if="!homePageLogo.exists"
                          :size="1024 * 1024 * 10"
                          @input="onlogoPicked"
                          ref="upload"
                        >
                          <v-icon size="50">add_photo_alternate</v-icon>
                        </file-upload>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="normal" @click.native="logoclose">Cancel</v-btn>
                  <v-btn color="green" dark @click.native="uploadLogo">Upload</v-btn>
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
              <td class="justify-center">
                <v-btn flat icon @click="leditItem(props.item)">
                <v-icon color="primary" small>edit</v-icon>
                </v-btn>
                <v-btn flat icon @click="ldeleteItem(props.item)">
                <v-icon color="primary" small>delete</v-icon>
                </v-btn>
              </td>
            </template>
            <template slot="no-data">
              <v-card-title>
                <span class="v-toolbar__title primary--text">{{nodata}}</span>
              </v-card-title>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
      <v-btn color="green" dark block large @click="save()">Save</v-btn>
    <v-flex>
  <UserTypes/>
  </v-flex>
  <v-flex>
  <InstitutionTypes/>
  </v-flex>
  <v-flex>
  <ScholorshipTypes/>
  </v-flex>
  <v-flex>
  <DegreeTypes/>
  </v-flex>
  </div>
</template>

<script>
import { imageType } from "../../../dto/imageType";
import { HOMESETTING, GET_HOMESETTINGS } from "@/gql-constants/settings";
import UserTypes from "@/views/pages/Settings/UserTypes.vue";
import InstitutionTypes from "@/views/pages/Settings/InstitutionTypes.vue";
import ScholorshipTypes from  "@/views/pages/Settings/ScholorshipTypes.vue";
import DegreeTypes from "@/views/pages/Settings/DegreeTypes.vue";
export default {
  components: {
    UserTypes,
    InstitutionTypes,
    ScholorshipTypes,
    DegreeTypes
  },
  data: () => ({
    title: 'Homepage Settings',
    icon: 'playlist_add_check',
    breadcrumbs: [
    {
      text: 'Home',
      disabled: true
    },
    {
      text: 'Settings',
      disabled: true
    },
    {
      text: 'Homepage Settings',
      disabled: true
    }
    ],
    imageName: "",
    logoName: "",
    imageUrl: "",
    bannerUrl: "",
    imageFile: "",
    nodata: "No Data Available",
    homePageLogo: imageType,
    bannerImageTemp: imageType,
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
      { text: "Actions", value: "name", sortable: false }
    ],
    lheaders: [
      {
        text: "Image",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Actions", value: "name", sortable: false }
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
        console.log(data);
        if (data.hasOwnProperty("homeSettingquery")) {
          if (data.homeSettingquery.banner) {
            this.homesettings.banners = data.homeSettingquery.banner;
          }
          if (data.homeSettingquery.logo)
            this.homesettings.logo = [data.homeSettingquery.logo];
        }
      },
      error(error) {
        console.log(error);
      }
    }
  },
  methods: {
    removeImage(imageDTO) {
      imageDTO.delete(this.$store);
    },
    initialize() {},
    pickFile() {
      this.$refs.bimage.click();
    },
    lpickFile() {
      this.$refs.image.click();
    },
    openlogoDialog() {
      if (this.homePageLogo.exists) this.homePageLogo.clearValues();
      this.logoDialog = true;
      this.imageUrl = "";
    },
    openbannerDialog() {
      if (this.bannerImageTemp.exists) this.bannerImageTemp.clearValues();
      this.bannerUrl = "";
      this.bannerdialog = true;
    },
    onBannerPicked(value) {
      const file = event.target.files[0];
      let path = "HomeBanner";
      this.bannerImageTemp = new imageType(file, path, this.$store);
    },
    onlogoPicked(value) {
      const file = event.target.files[0];
      let path = "HomeLogo";
      this.homePageLogo = new imageType(file, path, this.$store);
    },
    uploadBanner() {
      this.bannerdialog = false;
      if (this.editedIndex !== -1) {
       
        Vue.set(
          this.homesettings.banners,
          this.editedIndex,
          this.bannerImageTemp.fileUrl
        );
        this.editedIndex = -1;
      } else {
        this.homesettings.banners.push(this.bannerImageTemp.fileUrl);
      }
    },
    uploadLogo() {
      this.logoDialog=false
        Vue.set(
          this.homesettings.logo,
          0,
          this.homePageLogo.fileUrl
        );
    },
    editItem(item) {
      this.editedIndex = this.homesettings.banners.indexOf(item);
      this.bannerImageTemp = new imageType(
        "",
        "",
        this.$store,
        this.homesettings.banners[this.editedIndex]
      );
      this.bannerdialog = true;
    },
    deleteItem(item) {
      const index = this.homesettings.banners.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.homesettings.banners.splice(index, 1);
    },
    leditItem(item) {
      this.homePageLogo = new imageType(
        "",
        "",
        this.$store,
        this.homesettings.logo[0]
      );
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