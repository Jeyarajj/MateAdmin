import { apolloClient } from "../apollo-controller/index";
import { QUERIES } from "../gql-constants/scholarships";
import { imageType } from "../dto/imageType";
export class Scholarship {
  _id = "";
  data={
    picture:new imageType()
  }
  _details = {
    name: "",
    website: "",
    description: "",
    picture: "",
    amount: {
      currency: "USD",
      value: 0
    },
    university_id: ""
  };
  created_by = "5c541361f5ba0f315db125d7";
  updated_by = "5c541361f5ba0f315db125d7";
  active = true;
  constructor(scholarship) {
    if (scholarship) {
      if (scholarship._id) {
        if (!scholarship._details) delete scholarship._details;
        Object.assign(this, scholarship);
        this.initializeImages()
      }
    }
  }


initializeImages() {
    this.data={
      picture: new imageType(this.getPath + "/picture")
    }
  if (this._details.picture) this.data.picture.setFileUrl(this._details.picture);
}
setPicture(file) {
  this.data.picture.setFile(file);
}
removePicture() {
  this.data.picture=new imageType(this.getPath + "/picture")
}
async updateImages($store) {
  if(this.data.picture){
    if(this.data.picture.fileData)
      await this.data.picture.update($store)
      this._details.picture=this.data.picture.getFileURL
  }
}
get getPath() {
  return "Scholarships/" + this._id;
}

  static async getScholarship(_id) {
    return apolloClient.query({
      query: QUERIES.GET_SCHOLARSHIP,
      variables: {
        _id: _id
      }
    });
  }

  static async getScholarships(limit,page) {
    return apolloClient.query({
      query: QUERIES.GET_SCHOLARSHIPS,
      variables: {
        limit: limit,
        skip: page
      }
    });
  }
  get status() {
    if (this.active) {
      return "Active";
    } else return "Blocked";
  }

  getURL() {}
  updateStatus() {
    var mutationQuery;
    if (!this.active) {
      mutationQuery = QUERIES.BLOCK_SCHOLARSHIP;
    } else {
      mutationQuery = QUERIES.UNBLOCK_SCHOLARSHIP;
    }
    apolloClient
      .mutate({
        mutation: mutationQuery,
        variables: {
          _id: this._id
        }
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
  async createScholarship() {
    if (!this._id) {
      return apolloClient.mutate({
        mutation: QUERIES.CREATE_SCHOLARSHIP,
        variables: this.toJSON("create")
      });
    } else {
      return apolloClient.mutate({
        mutation: QUERIES.UPDATE_SCHOLARSHIP,
        variables: this.toJSON("update")
      });
    }
  }

  toJSON(type) {
    switch (type) {
      case "update":
      delete this._details.__typename
      delete this._details.amount.__typename
        return {
          _id: this._id,
          _details: this._details
        };
      case "create":
        return {
          _details: this._details
        };
      case "default":
        console.log("default");
        break;
    }
  }
}
