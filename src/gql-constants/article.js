import gql from 'graphql-tag';

export const CREATE_ARTICLE = gql`
  mutation createarticle(
    $_id: ObjectID
    $name: String
    $slug: String
    $cover_image: String
    $category: String
    $short_description: Text
    $article_content: Text
    $social_title: String
    $social_description: String
    $social_image_url: String
    $google_title: String
    $google_description: Text
    $google_tags: [String]
    $status: String
    $created_by: ObjectID
    $updated_by: ObjectID
  ) {
    createArticle(
      _id: $_id
      name: $name
      slug: $slug
      cover_image: $slug
      category: $category
      short_description: $short_description
      article_content: $article_content
      social_title: $social_title
      social_description: $social_description
      social_image_url: $social_image_url
      google_title: $google_title
      google_description: $google_description
      google_tags: $google_tags
      status: $status
      created_by: $created_by
      updated_by: $updated_by
    ) {
      _id
      name
      slug
      cover_image
      category
      short_description
      article_content
      social_title
      social_description
      social_image_url
      google_description
      google_title
      created_by
      google_tags
    }
  }
`;

// Need to get the article based on the status and created_by
//Based on the status we need to get the article
// Based on the search
//based on the author those who login like ( contributor )
export const GET_ARTICLE = gql`
  query getAllArticle(
    $status: String
    $text: String
    $author: ObjectID
    $page: Int
    $perPage: Int
  ) {
    getAllArticle(
      status: $status
      text: $text
      author: $author
      page: $page
      perPage: $perPage
    ) {
      _id
      name
      slug
      cover_image
      category
      short_description
      article_content
      social_title
      social_description
      social_image_url
      google_description
      status
      google_tags
      created_by
      updated_by
      created_at
      updated_at
      google_title
      review_comment {
        reviewed_by
        comment
        reviewed_at
      }
      total_count
    }
  }
`;

export const GET_ARTICLE_BY_ID = gql`
  query getArticleById($article_id: ObjectID) {
    getIdArticle(article_id: $article_id) {
      _id
      name
      short_description
      slug
      cover_image
      category
      article_content
      social_title
      google_tags
      social_description
      social_image_url
      google_description
      status
      created_by {
        _id
        name
        email
      }
      updated_by {
        _id
        name
        email
      }
      created_at
      updated_at
      google_title
      review_comment {
        reviewed_by {
          _id
          name
          email
        }
        comment
        reviewed_at
      }
    }
  }
`;

export const REVIEW_ARTICLE = gql`
  mutation reviewArticle(
    $comment: Text
    $reviewed_by: ObjectID
    $article_id: ObjectID
  ) {
    reviewarticle(
      comment: $comment
      reviewed_by: $reviewed_by
      article_id: $article_id
    ) {
      reviewed_at
      comment
      reviewed_by
    }
  }
`;
