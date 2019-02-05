<template>
<div>
  <v-container fluid grid-list-xl class="pb-0">
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
    </v-container>

  <v-layout row wrap pa-4>
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
                  required box
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md4>
                <v-text-field
                  color="primary"
                  label="Article Slug"
                  v-model="form.slug"
                  required box
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-textarea
                  color="primary"
                  label="Short Description"
                  v-model="form.short_description"
                  required box
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
                  required box
                  :items="category"
                  :error-messages="fieldErrors('form.category')"
                  @blur="$v.form.category.$touch()"
                ></v-select>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field
                  color="primary"
                  label="Social Title"
                  v-model="form.social_title" box
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  color="primary"
                  label="Social Description"
                  v-model="form.social_description" box
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  color="primary"
                  label="Social Image Url"
                  v-model="form.social_image_url" box
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  color="primary"
                  label="Google Title"
                  v-model="form.google_title" box
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  color="primary"
                  label="Google Description"
                  v-model="form.google_description" box
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <input-tag placeholder="Google Keywords" v-model="form.google_tags"></input-tag>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select :items="status" v-model="form.status" box label="Article Status"></v-select>
              </v-flex>
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
                      <v-btn color="error" dark @click="removeImage(counselorPicture)" class="removebtn_counsellor">
                        <v-icon dark left>remove_circle</v-icon>Remove
                      </v-btn>
                </span>
            <!-- <ul>
              <v-icon v-if="counselorPicture.uploadStatus">fas fa-circle-notch fa-spin</v-icon> 
              <li v-if="counselorPicture.exists">
                <img :src="counselorPicture.fileUrl" width="50" height="auto">
                <span @click="removeImage(counselorPicture)">Remove</span>
              </li>
            </ul> -->
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
            <v-toolbar-title><h4>Reviews</h4></v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-layout v-for="(comment,i) in comments" :key="i">
            <v-container>
              <v-list two-line class="pa-0">
                
                <v-list-tile-content>
              <strong>
                <v-avatar color="primary" size="30px">
                  <v-icon dark size="16px">speaker_notes</v-icon></v-avatar>&nbsp; {{ comment.comment }} </strong>
              <v-list-tile-sub-title>{{comment.reviewed_by.name}} {{comment.reviewed_by.email}}
                 <small><em>&mdash; {{comment.reviewed_at | moment("YYYY-MM-DD hh:mm:ss a")}} </em></small>
              </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list>

              <!-- <div class="title grey--text text--darken-1">{{ comment.comment }}</div>  
              <div>{{comment.reviewed_by.name}} {{comment.reviewed_by.email}} 
                <small><em>&mdash; {{comment.reviewed_at | moment("YYYY-MM-DD hh:mm:ss a")}} </em></small></div> -->
                </v-container>
          </v-layout>
        </v-card>

         <!-- <v-card v-for="(comment,i) in comments" :key="i">
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Reviews</h4></v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list two-line class="pa-0">
        <template>
          <v-list-tile>
            <v-list-tile-avatar >
              <img :src="item.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ comment.comment }}</v-list-tile-title>
              <v-list-tile-sub-title>{{comment.reviewed_by.name}} {{comment.reviewed_by.email}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <v-divider></v-divider>
    </v-card-text>
  </v-card> -->
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
      social_title: "",
      short_description: "",
      social_description: "",
      social_image_url: "",
      google_title: "",
      google_description: "",
      google_tags: "",
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

  apollo: {
    articleList: {
      query: GET_ARTICLE_BY_ID,
      variables() {
        return {
          article_id: this.article_id
        };
      },
      update(data) {
        // return data.getIdArticle;
        if (this.mode != "create") {
          this.action = this.mode.toUpperCase();
          this.form = data.getIdArticle;
          this.value = data.getIdArticle.article_content;
          this.comments = data.getIdArticle.review_comment;
        } else {
          this.action = "Creation";
        }
      },
      error(error) {
        console.log(error);
      }
    }
  },

  data() {
    return {
      title: 'Article Page',
    icon: 'playlist_add_check',
    breadcrumbs: [
    {
      text: 'Home',
      disabled: true
    },
    {
      text: 'Articles',
      disabled: true
    },
    {
      text: 'Article Page',
      disabled: true
    }
    ],
      counselorPicture: imageType,
      mode: this.$route.params.mode,
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
  created() {},
  methods: {
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
        short_description: this.form.short_description,
        social_title: this.form.social_title,
        social_description: this.form.social_description,
        social_image_url: this.form.social_image_url,
        google_description: this.form.google_description,
        google_title: this.form.google_title,
        google_tags: this.form.google_tags,
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