import { apolloClient } from "../apollo-controller/index";
import { QUERIES } from "../gql-constants/counselor";
export class Counselor {
  _id = "";
  email = "";
  data = {
    password: ""
  };
  _details = {
    name: "",
    address: {
      city: "",
      country: "",
      addr: ""
    },
    website: "",
    description: "",
    slug: ""
  };
  active = true;
  constructor(counselor) {
    if (counselor) {
      if (counselor._id) {
        if (!counselor._details) delete counselor._details;
        Object.assign(this, counselor);
      }
    }
  }
  static async getCounselor(_id) {
    return apolloClient.query({
      query: QUERIES.GET,
      variables: {
        _id: _id
      }
    });
  }

  static async getCounselors(limit,skip) {
    return apolloClient.query({
      query: QUERIES.GETLIST,
      variables: {
       limit:limit,
       skip:skip
      }
    });
  }
  get status() {
    if (this.active) {
      return "Active";
    } else return "Blocked";
  }
  getPassword(){
    return Math.random()
    .toString(36)
    .slice(-8);

}
  getURL() {}
  updateStatus() {
    var mutationQuery;
    if (!this.active) {
      mutationQuery = QUERIES.BLOCK;
    } else {
      mutationQuery = QUERIES.UNBLOCK;
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

  async createCounselor() {
    if (!this._id) {
      return apolloClient.mutate({
        mutation: QUERIES.CREATE,
        variables: this.toJSON("create")
      });
    } else {
      return apolloClient.mutate({
        mutation: QUERIES.UPDATE,
        variables: this.toJSON("update")
      });
    }
  }

  toJSON(type) {
    switch (type) {
      case "update":
      delete this._details.__typename
      delete this._details.address.__typename
        return {
          _id: this._id,
          _details:this._details
        };
      case "create":
        return {
          email: this.email,
          password: this.getPassword(),
          _details:this._details
        };
      case "default":
        console.log("default");
        break;
    }
  }
}
