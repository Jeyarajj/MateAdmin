import {
    apolloClient
} from '../apollo-controller/index';
import {
    QUERIES
} from '../gql-constants/mentors'
import { imageType } from './imageType';
export class Mentor {
    _id = ""
    email = ""
    data = {
        password: "",
        photo:new imageType()
    }
    _details = {
        name: "",
        phone: "",
        address: {
            city: "",
            country: "",
        },
        photo: ""
    }
    active = true;
    constructor(mentor) {
        if (mentor) {
            if (mentor._id) {
                if (!mentor._details)
                    delete mentor._details
                Object.assign(this, mentor)
                this.initializeImages()
            }
        }
    }
    initializeImages() {
        this.data={
            photo: new imageType(this.getPath + "/photo")
        }
      if (this._details.photo) this.data.photo.setFileUrl(this._details.photo);
    }
    setPhoto(file) {
      this.data.photo.setFile(file);
    }
    removePhoto() {
      this.data.photo=new imageType(this.getPath + "/photo")
    }
    async updateImages($store) {
      if(this.data.photo){
        if(this.data.photo.fileData)
          await this.data.photo.update($store)
          this._details.photo=this.data.photo.getFileURL
      }
    }
    get getPath() {
      return "Mentors/" + this._id;
    }
    static async getMentor(_id) {
        return apolloClient
            .query({
                query: QUERIES.GET_MENTOR,
                variables: {
                    _id: _id
                }
            })
    }

    static async getMentors(limit,skip) {
        return apolloClient
            .query({
                query: QUERIES.GET_MENTORS,
                fetchPolicy: 'network-only',
                variables: {
                    limit: limit,
                    skip: skip
                }
            })
    }
    get status() {
        if (this.active) {
            return "Active"
        } else
            return "Blocked"
    }

    async createMentor() {
        if (!this._id) {
            return apolloClient
                .mutate({
                    mutation: QUERIES.CREATE_MENTOR,
                    variables: this.toJSON('create')
                })
        } else {
            return apolloClient
                .mutate({
                    mutation: QUERIES.UPDATE_MENTOR,
                    variables:this.toJSON('update')
                })
        }
    }
    updateStatus() {
        var mutationQuery;
        if (!this.active) {
            mutationQuery = QUERIES.BLOCK_MENTOR
        } else {
            mutationQuery = QUERIES.UNBLOCK_MENTOR
        }
        apolloClient
            .mutate({
                mutation: mutationQuery,
                variables: {
                    _id: this._id
                }
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err);
            });
    }
    getPassword(){
        return Math.random()
        .toString(36)
        .slice(-8);
    
    }

    toJSON(type) {

        switch (type) {
            case "update":
            delete this._details.__typename
            delete this._details.address.__typename
            return {
                _id:this._id,
                _details:this._details,
            }
            case "create":
                return {
                    email: this.email,
                    password: this.getPassword(),
                    _details: this._details
                }
            case "default":
                console.log('default')
                break;
        }
    }
}