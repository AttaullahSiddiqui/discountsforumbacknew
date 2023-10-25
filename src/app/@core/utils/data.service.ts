import { Injectable } from "@angular/core";
import { finalize } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";
import {
  NbGlobalPhysicalPosition,
  NbToastrService,
  NbToastrConfig,
} from "@nebular/theme";

@Injectable()
export class DataService {
  config: NbToastrConfig;

  constructor(
    private _http: HttpClient,
    private toastrService: NbToastrService,
    private storage: AngularFireStorage
  ) {}
  fetchAPI(url) {
    return this._http
      .get(url)
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  postAPI(url, reqData) {
    return this._http
      .post(url, reqData)
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  putAPI(url, reqData) {
    return this._http
      .post(url, reqData)
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  deleteAPI(url, reqData) {
    return this._http
      .delete(url, reqData)
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  fetchAPIWithLimit(url, skip, limit, id?) {
    const params = {
      skipNo: skip,
      limitNo: limit,
      _id: id,
    };
    return this._http
      .get(url, { params: params })
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  fetchAPIUsingId(url, id) {
    return this._http
      .get(url, { params: { _id: id } })
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  sortAPI(url, updatedArray) {
    return this._http
      .post(url, updatedArray)
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  storeImage(filePath, selectedImage, cb) {
    const fileRef = this.storage.ref(filePath);
    return this.storage
      .upload(filePath, selectedImage)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            (url) => {
              cb(undefined, url);
            },
            (err) => {
              cb(err);
            }
          );
        })
      );
  }
  deleteMedia(downloadURL) {
    // if (!downloadURL) return;
    // const fileRef = this.storage.storage.refFromURL(downloadURL);
    // return fileRef.delete();
  }
  addUser(userInfo) {
    return this._http
      .post("/api/register", userInfo)
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }
  showSuccessToast(content: string) {
    const config = {
      status: "success",
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show("Success", `${content}`, config);
  }
  showErrorToast(content: string) {
    const config = {
      status: "danger",
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show("Error", `${content}`, config);
  }
  base64ToFile(data, filename) {
    const arr = data.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
}
