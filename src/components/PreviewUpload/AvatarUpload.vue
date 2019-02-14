<template>
  <div class="example-avatar">
    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>Drop files to upload</h3>
    </div>
    <div class="avatar-upload" v-show="!edit">
      <div class="text-center p-2">
        <label for="avatar">
          <img
            :src="
              files.length
                ? files[0].url
                : avatarurl
            "
            class="rounded-circle"
          >
          <h4 class="pt-2">or
            <br>Drop files anywhere to upload
          </h4>
        </label>
      </div>
      <div class="text-center p-2">
        <file-upload
          extensions="gif,jpg,jpeg,png,webp"
          accept="image/png, image/gif, image/jpeg, image/webp"
          name="avatar"
          class="btn btn-primary"
          :drop="!edit"
          v-model="files"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload"
          required
        >
          <v-btn round color="primary" dark>Upload
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>
        </file-upload>
      </div>
    </div>

    <div class="avatar-edit" v-show="files.length && edit">
      <div class="avatar-edit-image" v-if="files.length">
        <img ref="editImage" :src="files[0].url">
      </div>
      <div class="text-center p-4">
        <v-btn
          color="primary"
          type="button"
          class="btn btn-secondary"
          @click.prevent="$refs.upload.clear"
        >Cancel</v-btn>
        <v-btn
          color="green"
          dark
          type="submit"
          class="btn btn-primary"
          @click.prevent="editSave"
        >Change</v-btn>
      </div>
    </div>
  </div>
</template>
<style>
.example-avatar .avatar-upload .rounded-circle {
  width: 200px;
  height: 200px;
  border-radius: 100%;
}
.example-avatar .text-center .btn {
  margin: 0 0.5rem;
}
.example-avatar .avatar-edit-image {
  max-width: 300px !important;
  max-height: 300px !important;
  margin: 1em;
}

.example-avatar .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}

.example-avatar .drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>

<script>
import Cropper from "cropperjs";
import FileUpload from "vue-upload-component";
import { imageType } from "../../dto/imageType";
import AWS from "aws-sdk";
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
export default {
  components: {
    FileUpload
  },

  data() {
    return {
      files: [],
      edit: false,
      cropper: false,
      imageurl: "",
      avatarPicture: imageType,
      mutableavatarurl: this.imageurl
    };
  },
  props: {
    avatarurl: {
      type: String
    },
    userid: {
      type: String
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },

    edit(value) {
      if (value) {
        this.$nextTick(function() {
          if (!this.$refs.editImage) {
            return;
          }
          let cropper = new Cropper(this.$refs.editImage, {
            aspectRatio: 1 / 1,
            viewMode: 1
          });
          this.cropper = cropper;
        });
      } else {
        if (this.cropper) {
          this.cropper.destroy();
          this.cropper = false;
        }
      }
    }
  },

  methods: {
    async editSave() {
      this.edit = false;

      let oldFile = this.files[0];

      let binStr = atob(
        this.cropper
          .getCroppedCanvas()
          .toDataURL(oldFile.type)
          .split(",")[1]
      );
      let arr = new Uint8Array(binStr.length);
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i);
      }

      let file = new File([arr], oldFile.name, { type: oldFile.type });

      //emit from child to parent
      this.$emit("clicked", file);

      this.$refs.upload.update(oldFile.id, {
        file,
        type: file.type,
        size: file.size,
        active: true
      });
    },

    alert(message) {
      alert(message);
    },
    inputFile(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        this.$nextTick(function() {
          this.edit = true;
        });
      }
      if (!newFile && oldFile) {
        this.edit = false;
      }
    },

    inputFilter(newFile, oldFile, prevent) {
      //upload aws s3
      // let path = "Avatar/" + this.userid;
      // this.avatarPicture = new imageType(newFile.file, path, this.$store, "");
      //upload aws s3
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.alert("Your choice is not a picture");
          return prevent();
        }
      }

      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file);
        }
      }
    }
  }
};
</script>
