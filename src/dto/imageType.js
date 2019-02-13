const s3URL = "https://s3.us-east-2.amazonaws.com/matefiles/";
export class imageType {
  filePath = "";
  fileUrl = "";
  fileData = {};
  fileName = "";
  constructor(path) {
    if (path) this.filePath = path;
  }

  get fileName() {
    if(this.fileData)
    return this.name;
    else
    return "No Image Selected"
  }

  setFile(file) {
    if (file) {
      this.fileData = file;
      this.fileName = this.fileData.name;
    }
  }
  setFileUrl(fileUrl) {
    if(fileUrl)
    this.fileUrl = fileUrl;
  }
  get getFileURL() {
    if(this.fileUrl)
    return this.fileUrl;
    else
    return "https://i.stack.imgur.com/l60Hf.png"
  }
  get exists() {
    if (this.fileUrl) return true;
    else return false;
  }
 async update($store) {
    if(this.filePath){      
      if (this.fileData) {
        let data = {
        folder_name: this.filePath,
        file: this.fileData
      };
      this.fileUrl =s3URL + encodeURI(this.filePath) + "/" + encodeURI(this.fileName);
      return $store.dispatch("upload", data)
      }
    }else{
      return "Path not set"
    }
  }
  clearValues() {
    this.filePath = "";
    this.fileUrl = "";
    this.fileData = {};
    this.fileName = "";
    this.uploadStatus = false;
  }
  delete($store) {
    $store.dispatch("delete", this.fileUrl);
    this.fileUrl = "";
  }
}
