import { apolloClient } from "../apollo-controller/index";
import { QUERIES } from "../gql-constants/university";
import { imageType } from "../dto/imageType";
export class University {
  _id = "";
  email = "";
  data = {
    password: "",
    logo: new imageType(this.getPath + "/logo"),
    banners: [],
    photos: []
  };
  _details = {
    name: "",
    slug: "",
    website: "",
    institutionType: "",
    address: {
      city: "",
      country: "",
      addr: ""
    },
    description: "",
    logo: "",
    banners: [],
    photos: []
  };
  created_by = "5c541361f5ba0f315db125d7";
  updated_by = "5c541361f5ba0f315db125d7";
  active = true;
  constructor(university) {
    if (university) {
      if (university._id) {
        if (!university._details) delete university._details;
        Object.assign(this, university);
        this.initializeImages();
      }
    }
  }
  initializeImages() {
      this.data={
        logo: new imageType(this.getPath + "/logo"),
        banners: [],
        photos: []
      }
    if (this._details.logo) this.data.logo.setFileUrl(this._details.logo);
    if (this._details.banners) {
      this._details.banners.forEach(image => {
        var img = new imageType(this.getPath + "/banners");
        img.setFileUrl(image);
        this.data.banners.push(img);
      });
    }
    if (this._details.photos) {
      this._details.photos.forEach(image => {
        var img = new imageType(this.getPath + "/photos");
        img.setFileUrl(image);
        this.data.photos.push(img);
      });
    }
  }
  setLogo(file) {
    this.data.logo.setFile(file);
  }
  removeLogo() {
    this.data.logo=new imageType(this.getPath + "/logo")
  }
  addBanner(file) {
    let img = new imageType(this.getPath + "/banners");
    img.setFile(file);
    this.data.banners.push(img);
  }
  removeBanner(index) {
    this.data.banners.splice(index, 1);
  }
  addPhoto(file) {
    let img = new imageType(this.getPath + "/photos");
    img.setFile(file);
    this.data.photos.push(img);
  }
  removePhoto(index) {
    this.data.photos.splice(index, 1);
  }
  get getPath() {
    return "Institution/" + this._id;
  }
  static async getUniversity(_id) {
    return apolloClient.query({
      query: QUERIES.GET_UNIVERSITY,
      variables: {
        _id: _id
      }
    });
  }
  async updateImages($store) {
      if(this.data.logo){
        if(this.data.logo.fileData)
          await this.data.logo.update($store)
          this._details.logo=this.data.logo.getFileURL
      }
      this._details.banners=[]
      if (this.data.banners) {
          for (let i = 0; i < this.data.banners.length; i++) {
              const image = this.data.banners[i];
              if(image.fileData)
              await image.update($store)
              this._details.banners.push(image.getFileURL)   
          }
      }
      this._details.photos=[]
      if (this.data.photos) {
          for (let i = 0; i < this.data.photos.length; i++) {
              const image = this.data.photos[i];
              if(image.fileData)
              await image.update($store)
              this._details.photos.push(image.getFileURL)   
          }
      }
  }
  static async getUniversities(limit, page) {
    return apolloClient.query({
      query: QUERIES.GET_UNIVERSITIES,
      fetchPolicy: "network-only",
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

  updateStatus() {
    var mutationQuery;
    if (!this.active) {
      mutationQuery = QUERIES.BLOCK_UNIVERSITY;
    } else {
      mutationQuery = QUERIES.UNBLOCK_UNIVERSITY;
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
  async createUniversity() {
    if (!this._id) {
      return apolloClient.mutate({
        mutation: QUERIES.CREATE_UNIVERSITY,
        variables: this.toJSON("create")
      });
    } else {
      return apolloClient.mutate({
        mutation: QUERIES.UPDATE_UNIVERSITY,
        variables: this.toJSON("update")
      });
    }
  }
  getPassword() {
    return Math.random()
      .toString(36)
      .slice(-8);
  }
  toJSON(type) {
    switch (type) {
      case "update":
        delete this._details.__typename;
        delete this._details.address.__typename;
        return {
          _id: this._id,
          _details: this._details
        };
      case "create":
        return {
          email: this.email,
          password: this.getPassword(),
          _details: this._details,
          updated_by: this.updated_by,
          created_by: this.created_by
        };
      case "default":
        console.log("default");
        break;
    }
  }
}
