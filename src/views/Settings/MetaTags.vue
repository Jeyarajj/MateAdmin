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
        <v-breadcrumbs v-if="breadcrumbs" class="pl-0">
          <v-icon slot="divider" color="primary">chevron_right</v-icon>
          <v-breadcrumbs-item
            v-for="item in breadcrumbs"
            :key="item.text"
            :disabled="item.disabled"
          >{{ item.text }}</v-breadcrumbs-item>
        </v-breadcrumbs>
        <slot></slot>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">
          <v-icon left dark>add_circle</v-icon>Add New MetaTag
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
                  <v-text-field v-model="editedItem.meta_label" label="Meta Label"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.value" label="Meta value"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="normal" @click="close">Cancel</v-btn>
            <v-btn color="success" @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table :headers="headers" :items="metaList" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="justify-center">{{ props.item.meta_label }}</td>
        <td class="justify-center">{{props.item.value}}</td>
        <td class="justify-center">
           <v-btn flat icon @click="editItem(props.item)">          
          <v-icon small color="primary">edit</v-icon>
          </v-btn>
          <v-btn flat icon @click="deleteItem(props.item)">
          <v-icon small color="primary">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  GET_METATAGS,
  CREATE_METATAGS,
  DELETE_META
} from "@/gql-constants/settings";

export default {
  data: () => ({
    title: "Meta Tags",
    icon: "playlist_add_check",
    breadcrumbs: [
      {
        text: "Home",
        disabled: true
      },
      {
        text: "Settings",
        disabled: true
      },
      {
        text: "Meta Tags",
        disabled: true
      }
    ],
    headers: [
      { text: "Meta Label", value: "meta_label" },
      { text: "Value", value: "value" },
      { text: "Actions", value:  "actions" }
    ],
    dialog: false,
    editedIndex: -1,
    metaList: "",
    editedItem: {
      _id: "",
      meta_label: "",
      value: ""
    },
    defaultItem: {
      meta_label: "",
      value: ""
    }
  }),
  apollo: {
    metaList: {
      query: GET_METATAGS,
      update(data) {
        // this.$store.commit("SET_PAGES_DATA", {
        //   currentIndex: data.search.university.page.from,
        //   totalPages: data.search.university.pages.total,
        //   currentPage: data.search.university.pages.current,
        //   listLimit: this.institutionListLimit
        // });
        // console.log(data);
        // if (data) return data.search.university.items;
        console.log(data.getMetaTags);
        return data.getMetaTags;
      },
      error(error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapGetters([]),
    formTitle() {
      return this.editedIndex === -1 ? "Add New MetaTag" : "Edit MetaTag";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.metaList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.deleteMetaTag(item);
    },
    deleteMetaTag(item) {
      this.$apollo
        .mutate({
          mutation: DELETE_META,
          variables: {
            _id: item._id
          }
        })
        .then(data => {
          this.$toaster.info("Meta Tag Deleted Successfully");
        })
        .catch(err => {
          console.log(err);
        });
      const index = this.metaList.indexOf(item);
      this.metaList.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      let dataSet = "";
      if (this.editedIndex > -1) {
        Object.assign(this.metaList[this.editedIndex], this.editedItem);
        dataSet = this.editedItem;
      } else {
        dataSet = {
          meta_label: this.editedItem.meta_label,
          value: this.editedItem.value
        };
      }
      this.$apollo
        .mutate({
          mutation: CREATE_METATAGS,
          variables: dataSet
        })
        .then(data => {
          this.editedItem._id = data.data.createMetaTags._id;
          if (this.editedIndex == -1) {
            this.$toaster.success("Tag Created Successfully");
            // Only on create condition
            this.metaList.push(this.editedItem);
          } else {
            this.$toaster.success("Tag Updated Successfully");
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