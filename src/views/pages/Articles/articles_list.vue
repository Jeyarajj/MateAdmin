<template>
  <div>
    <v-btn @click="addNewItem()" color="info">New Article</v-btn>

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
      variables: {
        page: 1,
        perPage: 10
      },
      update(data) {
        return data.getAllArticle;
      },
      error(error) {
        console.log(error);
      }
    }
  },
  methods: {
    addNewItem() {
      this.$router.push({
        name: "articles/ArticlePage",
        params: { mode: "create" }
      });
    },
    detailArticle(item) {
      // need to load the detailed page with item all value
      this.$router.push({
        name: "articles/ArticlePage",
        params: { article_id: item._id, mode: "detail" }
      });
    },
    editArticle(item) {
      //load the edit page with  item all value
      this.$router.push({
        name: "articles/ArticlePage",
        params: { article_id: item._id, mode: "edit" }
      });
    }
  }
};
</script>