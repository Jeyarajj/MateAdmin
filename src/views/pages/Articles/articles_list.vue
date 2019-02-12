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
      <v-btn @click="addNewItem()" color="primary" dark class="mb-2">
        <v-icon left dark>add_circle</v-icon>New Article
      </v-btn>
    </v-toolbar>
    <!-- <v-btn @click="addNewItem()" color="info">New Article</v-btn> -->
    <v-data-table :headers="headers" :items="articleList" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.status }}</td>
        <td>{{ props.item.created_at | moment("YYYY-MM-DD h:mm:ss a") }}</td>
        <td>{{ props.item.updated_at | moment("YYYY-MM-DD h:mm:ss a") }}</td>
        <td>
          <v-icon @click="detailArticle(props.item)">details</v-icon>
          <v-icon @click="editArticle(props.item)">edit</v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { GET_ARTICLE } from "@/gql-constants/article";

export default {
  data() {
    return {
      loader: "",
      title: "Articles List",
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
          text: "Articles List",
          disabled: true
        }
      ],
      page: 1,
      perPage: 10,
      headers: [
        {
          text: "Article Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Status", value: "status" },
        { text: "Created Date", value: "created_at" },
        { text: "Updated Date", value: "updated_at" },
        { text: "Action", value: "action" }
      ],
      articleList: []
    };
  },
  apollo: {
    articleList: {
      query: GET_ARTICLE,
      fetchPolicy: "network-only",
      variables: {
        page: 1,
        perPage: 10
      },
      update(data) {
        this.loader.hide();
        return data.getAllArticle;
      },
      error(error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.loader = this.$loading.show();
  },
  methods: {
    addNewItem() {
      this.$router.push({
        name: "articles/Article_Page",
        params: { mode: "create" }
      });
    },
    detailArticle(item) {
      // need to load the detailed page with item all value
      this.$router.push({
        name: "articles/Article_Page",
        params: { article_id: item._id, mode: "detail" }
      });
    },
    editArticle(item) {
      //load the edit page with  item all value
      this.$router.push({
        name: "articles/Article_Page",
        params: { article_id: item._id, mode: "edit" }
      });
    }
  }
};
</script>