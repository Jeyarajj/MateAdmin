const s3URL = 'https://s3.us-east-2.amazonaws.com/matefiles/';
export class imageType {
  filePath = '';
  fileUrl = '';
  fileData = {};
  fileName=""
  uploadStatus = false;
  constructor(file, path, $store, fileUrl) {
    this.filePath = path
    if (file){
      this.fileData = file;
      this.fileName=this.fileData.name;
      this.update($store);
    }
    else if (fileUrl)
      this.fileUrl = fileUrl
    else console.log('Empty Object')
  }

  get fileName() {
    return this.name;
  }
 
  get filePath() {
    return this.path;
  }
  get getFileURL() {
    return this.fileUrl;
  }
  get exists() {
    if (this.fileUrl) return true;
    else return false;
  }
  update($store) {
    if (this.fileData) {
      this.uploadStatus = true;
      let data = {
        folder_name: this.filePath,
        file: this.fileData
      };
      $store.dispatch('upload', data).then(res => {
        if (res)
          this.fileUrl = s3URL + encodeURI(this.filePath)+'/'+encodeURI(this.fileName);
        else
          console.log('Image upload failed')
        this.uploadStatus = false;

      }, err => {
        this.uploadStatus = false;
        console.log(err)
      })
    }
  }
  clearValues() {
    this.filePath = '';
    this.fileUrl = '';
    this.fileData = {};
    this.fileName=""
    this.uploadStatus = false;
  }
  delete($store) {
    $store.dispatch('delete', this.fileUrl);
    this.fileUrl = '';
  }
}