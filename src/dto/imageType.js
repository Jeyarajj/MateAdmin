const s3URL = "https://s3.us-east-2.amazonaws.com/matefiles/";
export class imageType {
    path = "";
    fileUrl = "";
    fileData = {};
    constructor(file, path, $store) {
        this.fileData = file;
        this.path = path;
        this.fileUrl = s3URL + encodeURI(path+'/'+this.fileData.name)
        this.update($store)
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
            let data = {
                folder_name: this.path,
                file: this.fileData
            };
            $store.dispatch("upload", data);
        }
    }
    delete($store) {
        $store.dispatch("delete", this.fileUrl);
        this.fileUrl='';
    }
}