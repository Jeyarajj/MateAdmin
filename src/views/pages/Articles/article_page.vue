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
    </v-toolbar>

    <v-layout row wrap>
      <v-flex v-if="$apollo.loading">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </v-flex>

      <!-- Form Section -->
      <v-flex v-else xs12 sm12>
        <v-card>
          <v-snackbar v-model="snackbar" absolute top right color="success">
            <span>Registration successful!</span>
            <v-icon dark>check_circle</v-icon>
          </v-snackbar>
          <v-card-title primary-title>
            <div class="headline">Article {{action}}</div>
          </v-card-title>
          <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
            <v-container grid-list-xl fluid>
              <v-layout wrap>
                <v-flex xs12 sm12 md8>
                  <v-text-field
                    color="primary"
                    label="Article name"
                    v-model="form.name"
                    :error-messages="fieldErrors('form.name')"
                    @blur="$v.form.name.$touch()"
                    @focusout="generateSlug()"
                    required
                    box
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md4>
                  <v-text-field
                    color="primary"
                    label="Article Slug"
                    v-model="form.slug"
                    required
                    box
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12>
                  <v-textarea
                    color="primary"
                    label="Short Description"
                    v-model="form.short_description"
                    required
                    box
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 sm12>
                  <vue-ckeditor
                    type="classic"
                    v-model="value"
                    :upload-adapter="UploadAdapter"
                    :editors="editors"
                  ></vue-ckeditor>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    color="primary"
                    label="Category"
                    v-model="form.category"
                    required
                    box
                    :items="category"
                    :error-messages="fieldErrors('form.category')"
                    @blur="$v.form.category.$touch()"
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-select :items="status" v-model="form.status" box label="Article Status"></v-select>
                </v-flex>
                <vue-cloneya :maximum="5" multiple="true" v-model="exampleMultipleData">
                  <div class="input-group">
                    <!-- Add the "v-cloneya-input" directive to elements you wish to set v-bind:value -->
                    <!-- Only input, select, radio, checkbox etc. -->
                    <select
                      class="form-control select2"
                      placeholder="Meta Tags"
                      v-cloneya-input="'meta_name'"
                    >
                      <option
                        v-for="(metatag,index) in metatags"
                        :key="index"
                        :value="metatag.value"
                      >{{metatag.meta_label}}</option>
                    </select>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Meta Value"
                      v-cloneya-input="'meta_value'"
                    >
                    
                    <span class="input-group-btn">
                      <!-- Add the "v-cloneya-add" directive to elements you wish to add the click listener
                      that will clone the root element-->
                      <button type="button" class="btn btn-success" tabindex="-1" v-cloneya-add>
                        <i class="fa fa-plus"></i>
                      </button>
                      <!-- Add the "v-cloneya-remove" directive to elements you wish to add the click listener
                      that will remove the element-->
                      <button type="button" class="btn btn-danger" tabindex="-1" v-cloneya-remove>
                        <i class="fa fa-minus"></i>
                      </button>
                    </span>
                  </div>
                </vue-cloneya>
              </v-layout>
            </v-container>
            <v-flex xs12 sm12 md6>
              <v-progress-linear
                v-if="counselorPicture.uploadStatus"
                indeterminate
                color="light-green darken-2"
                class="mb-0"
              ></v-progress-linear>
              <span v-if="counselorPicture.exists">
                <v-img :src="counselorPicture.fileUrl" aspect-ratio="1.7"></v-img>
                <v-btn
                  color="error"
                  dark
                  @click="removeImage(counselorPicture)"
                  class="removebtn_counsellor"
                >
                  <v-icon dark left>remove_circle</v-icon>Remove
                </v-btn>
              </span>

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
                <v-btn color="primary" dark>
                  <v-icon left dark>add_photo_alternate</v-icon>Upload Picture
                </v-btn>
              </file-upload>
            </v-flex>
            <v-card-actions v-if="mode != 'detail'">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click.prevent="saveArticle()" type="submit">Save</v-btn>
              <v-btn color="error" @click.stop="resetForm">Cancel</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-spacer></v-spacer>
        <template v-if=" mode== 'detail'">
          <v-card>
            <!-- need to show this page to Admin who have the publish access -->
            <v-card-title primary-title>
              <div class="headline">Article Review</div>
              <v-container grid-list-xl fluid>
                <v-layout wrap>
                  <v-flex>
                    <v-textarea v-model="comment"></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-btn color="primary" type="submit" @click="reviewSubmit()">Submit</v-btn>
              </v-card-actions>
            </v-card-title>
          </v-card>
          <v-spacer></v-spacer>
          <v-card>
            <v-toolbar card dense color="transparent">
              <v-toolbar-title>
                <h4>Reviews</h4>
              </v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-layout v-for="(comment,i) in comments" :key="i">
              <v-container>
                <v-list two-line class="pa-0">
                  <v-list-tile-content>
                    <strong>
                      <v-avatar color="primary" size="30px">
                        <v-icon dark size="16px">speaker_notes</v-icon>
                      </v-avatar>
                      &nbsp; {{ comment.comment }}
                    </strong>
                    <v-list-tile-sub-title>
                      {{comment.reviewed_by.name}} {{comment.reviewed_by.email}}
                      <small>
                        <em>&mdash; {{comment.reviewed_at | moment("YYYY-MM-DD hh:mm:ss a")}}</em>
                      </small>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list>

                <!-- <div class="title grey--text text--darken-1">{{ comment.comment }}</div>  
              <div>{{comment.reviewed_by.name}} {{comment.reviewed_by.email}} 
                <small><em>&mdash; {{comment.reviewed_at | moment("YYYY-MM-DD hh:mm:ss a")}} </em></small></div>-->
              </v-container>
            </v-layout>
          </v-card>
        </template>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { imageType } from "../../../dto/imageType";

import VueCkeditor from "vue-ckeditor5";
import AWS from "aws-sdk";

import { mapGetters } from "vuex";
import {
  CREATE_ARTICLE,
  REVIEW_ARTICLE,
  GET_ARTICLE_BY_ID
} from "@/gql-constants/article";

// Initialize the Amazon Cognito credentials provider
AWS.config.region = "us-east-1"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-1:79de41e8-b5ea-415b-996b-de4fb71c50c1"
});
const s3URL = "https://s3.us-east-2.amazonaws.com/matefiles/";
const bucketName = "matefiles"; // Eter your bucket name
var bucket = new AWS.S3({
  params: {
    Bucket: bucketName
  }
});

const defaultForm = {
  name: "",
  description: "",
  category: ""
};

export default {
  components: {
    "vue-ckeditor": VueCkeditor.component
  },
  mixins: [validationMixin],
  validations: {
    form: {
      name: { required },
      cover_image: "",
      category: { required },
      slug: "",
      status: ""
    }
  },
  validationMessages: {
    form: {
      name: { required: "Article name is required" },
      category: { required: "Category is required" }
    }
  },
  computed: {
    ...mapGetters(["metatags", "currentUserdata"])
  },

  // apollo: {
  //   articleList: {
  //     query: GET_ARTICLE_BY_ID,
  //     variables() {
  //       return {
  //         article_id: this.article_id
  //       };
  //     },
  //     update(data) {
  //       // return data.getIdArticle;
  //       if (this.mode != "create") {
  //         this.action = this.mode.toUpperCase();
  //         this.form = data.getIdArticle;
  //         this.value = data.getIdArticle.article_content;
  //         this.comments = data.getIdArticle.review_comment;
  //       } else {
  //         this.action = "Creation";
  //       }
  //     },
  //     error(error) {
  //       console.log(error);
  //     }
  //   }
  // },

  data() {
    return {
      exampleMultipleData: [],
      title: "Article Page",
      icon: "playlist_add_check",
      breadcrumbs: [
        {
          text: "Home",
          disabled: true
        },
        {
          text: "Articles",
          disabled: true
        },
        {
          text: "Article Page",
          disabled: true
        }
      ],
      counselorPicture: imageType,
      mode: this.$route.params.mode ? this.$route.params.mode : "create",
      article_id: this.$route.params.article_id,
      action: "",
      comments: [],
      comment: "",
      form: Object.assign({}, defaultForm),
      category: ["Country Based", "Course Based", "University Based"],
      conditions: false,
      snackbar: false,
      terms: false,
      description: "",
      value: "",
      status: [
        { text: "Publish", value: "publish" },
        { text: "Apply Review", value: "apply_review" },
        { text: "Publish", value: "publish" },
        { text: "Need Some Changes", value: "need_some_changes" },
        { text: "Draft", value: "draft" },
        { text: "Trash", value: "trash" }
      ],
      editors: {
        classic: ClassicEditor
      },

      UploadAdapter: function(loader) {
        this.loader = loader;
        let path = "Articles";
        // Need to create the path based on the date and month like wordpress
        var d = new Date();
        var n = d.getMonth();
        var date = d.getDate();
        var year = d.getFullYear();
        let fullPath = path + "/" + year + "/" + n + "/" + date;

        let filename = this.loader.file.name;
        let fileURL = s3URL + encodeURI(fullPath) + "/" + encodeURI(filename);
        this.loader.upload = async () => {
          var objKey = fullPath + "/" + this.loader.file.name;
          var params = {
            Key: objKey,
            ContentType: this.loader.file.type,
            Body: this.loader.file
          };
          var result = await bucket.putObject(params).promise();
          console.log(result);
          if (result) {
            return {
              default: fileURL
            };
          }
        };

        this.loader.abort = () => {
          console.log("Abort upload.");
        };
      }
    };
  },
  methods: {
    addClone(event) {
      let data = [];
      let parent = event.target.closest("div.clone-wrapper");
      // need to change the dropdown value regarding the exampleMultipleData "meta_name"
      for (let i = 0; i < this.metatags.length; i++) {
        let result = this.exampleMultipleData.find(item => {
          return item.meta_name === this.metatags[i].value;
        });
        if (result) continue;
        data[i] = {
          id: this.metatags[i].value,
          text: this.metatags[i].meta_label
        };
      }

      let lastChild = parent.lastChild;

      let arr = window.$(lastChild).find(".select2");
      // if (arr.indexOf(name) == -1) {
      //   lastChild.closest(".select2").className += " " + "sundar";
      // }
      // window.$(function() {
      //   window.$(arr).select2({ data: data });
      // });
    },
    onPicture(value) {
      let file = event.target.files[0];
      let path = "Articles/CoverImage";
      // Need to create the path based on the date and month like wordpress
      var d = new Date();
      var n = d.getMonth();
      var date = d.getDate();
      var year = d.getFullYear();
      let fullPath = path + "/" + year + "/" + n + "/" + date;
      this.counselorPicture = new imageType(file, fullPath, this.$store);
      this.form.cover_image = this.counselorPicture.fileUrl;
    },
    removeImage(imageDTO) {
      imageDTO.delete(this.$store);
    },
    saveArticle() {
      // Save the article here
      let data = {
        name: this.form.name,
        article_content: this.value,
        slug: this.form.slug,
        cover_image: this.form.cover_image,
        category: this.form.category,
        meta_data: this.exampleMultipleData,
        short_description: this.form.short_description,
        created_by: this.currentUserdata._id,
        updated_by: this.currentUserdata._id,
        status: this.form.status
      };
      if (this.$route.params.mode != "create") {
        data._id = this.$route.params.article_id;
      }
      this.$apollo
        .mutate({
          mutation: CREATE_ARTICLE,
          variables: data
        })
        .then(data1 => {
          this.$router.push({
            name: "articles/Articles_List"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    reviewSubmit() {
      //send the who logged in id
      //comment data
      let data = {
        reviewed_by: this.currentUserdata._id,
        article_id: this.form._id,
        comment: this.comment
      };
      this.$apollo
        .mutate({
          mutation: REVIEW_ARTICLE,
          variables: data
        })
        .then(data => {
          this.comments = data.data.reviewarticle;
          this.comment = "";
        })
        .catch(err => {
          console.log(err);
        });
      // reviewed by
      // need to send notificahtion to who created this article
      // need to change the article status
    },
    generateSlug() {
      let articleName = this.form.name;
      this.form.slug = articleName
        .toLowerCase()
        .replace(/ /g, "_")
        .replace(/[^\w_]+/g, "");
      //Need to check the slug in database
    },
    resetForm() {
      this.form = Object.assign({}, defaultForm);
      this.$refs.form.reset();
      this.$v.$reset();
    },
    submit() {
      this.snackbar = true;
      this.resetForm();
      this.$v.$reset();
    }
  }
};
</script>
<style scoped>
.json-pre {
  min-height: 748px;
  max-height: 748px;
  height: 748px;
  overflow-y: auto;
}
</style>