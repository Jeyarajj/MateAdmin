<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>DegreeTypes</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">
          <v-icon left dark>add_circle</v-icon>Add New DegreeTypes</v-btn>
        <v-card>
          <v-card-title>
            <v-layout>
                <v-flex row xs6>
                  <span class="v-toolbar__title primary--text">{{ dformTitle }}</span>
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
                  <v-text-field v-model="editedItem.dlabel" label="Label"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.dvalue" label="Value"></v-text-field>
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
    <v-data-table :headers="headers" :items="dmetaList" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="justify-center">{{ props.item.dlabel }}</td>
        <td class="justify-center">{{props.item.dvalue}}</td>
        <td class="justify-center">
          <v-btn flat icon @click="editItem(props.item)">
          <v-icon color="primary" small>edit</v-icon>
          </v-btn>
          <v-btn flat icon @click="deleteItemType(props.item)">
          <v-icon color="primary" small>delete</v-icon>
          </v-btn>
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
import { GET_DEGREETYPES, CREATE_DEGREETYPES ,DELETE_DEGREETYPES} from "@/gql-constants/settings";

export default {
  data: () => ({
    headers: [
      { text: "Meta Label", value: "dlabel" },
      { text: "Value", value: "dvalue" },
      { text: "Actions", value: "actions" }
    ],
    dialog: false,
    editedIndex: -1,
    dmetaList: [],
    editedItem: {
      _id: "",
      dlabel: "",
      dvalue: ""
    },
    defaultItem: {
      dlabel: "",
      dvalue: ""
    }
  }),
  apollo: {
    dmetaList: {
      query: GET_DEGREETYPES,
      update(data) {
        // this.$store.commit("SET_PAGES_DATA", {
        //   currentIndex: data.search.university.page.from,
        //   totalPages: data.search.university.pages.total,
        //   currentPage: data.search.university.pages.current,
        //   listLimit: this.institutionListLimit
        // });
        // console.log(data);
        // if (data) return data.search.university.items;
        return data.getdegreetypes_settings;
      },
      error(error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapGetters([]),
    dformTitle() {
      return this.editedIndex === -1 ? "Add New DegreeTypes" : "Edit DegreeTypes";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.dmetaList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItemType(item) {
        var dataSet = {
          _id: item._id,
        };
      const index = this.dmetaList.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.dmetaList.splice(index, 1);
        this.$apollo
        .mutate({
          mutation: DELETE_DEGREETYPES,
          variables: dataSet
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
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
        Object.assign(this.dmetaList[this.editedIndex], this.editedItem);
        dataSet = this.editedItem;
      } else {
        dataSet = {
          dlabel: this.editedItem.dlabel,
          dvalue: this.editedItem.dvalue
        };
      }
      this.$apollo
        .mutate({
          mutation: CREATE_DEGREETYPES,
          variables: dataSet
        })
        .then(data => {
          console.log(data);
          this.editedItem._id = data.data.create_degree_settings._id;
          if (this.editedIndex == -1) {
            // Only on create condition
            this.dmetaList.push(this.editedItem);
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