
class FXMLHttpRequest {
    constructor() {
        this.fResponseType = null;
        this.fUrl = null;
        this.fType = null;
        this.fResponse = null;
        this.fData = null;
        this.fstatus=null;
        this.fOnload = null;
    }
    set responseType(responseType) {
        this.fResponseType = responseType;
    }
    set response(response) {
        this.fResponse = response;
    }
    get type() {
        return this.fType;
    }
    get url() {
        return this.fUrl;
    }
    get data() {
        return this.fData;
    }
    set status(status) {
        this.fstatus = status;
    }
    get status() {
        return this.fstatus;
    }
    fOpen(type, url) {
        this.fUrl = url;
        this.fType = type;
    }
    fSend(data = null) {
        this.fData = data;
        netWork(this);
    }
}