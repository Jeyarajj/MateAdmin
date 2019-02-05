<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Counselor</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Add New Counsellor</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
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
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="metaList" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="justify-center">{{ props.item.meta_label }}</td>
        <td class="justify-center">{{props.item.value}}</td>
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
import { GET_METATAGS, CREATE_METATAGS } from "@/gql-constants/settings";

export default {
  data: () => ({
    headers: [
      { text: "Meta Label", value: "meta_label" },
      { text: "Value", value: "value" }
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
      const index = this.metaList.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
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
          console.log(data);
          this.editedItem._id = data.data.createMetaTags._id;
          if (this.editedIndex == -1) {
            // Only on create condition
            this.metaList.push(this.editedItem);
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