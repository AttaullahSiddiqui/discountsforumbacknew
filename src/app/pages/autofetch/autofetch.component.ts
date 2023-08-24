import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import * as customBuild from "../ckEditorCustomBuild/build/ckeditor.js";
import { ImageCroppedEvent, base64ToFile } from "ngx-image-cropper";
import { NbDialogService } from "@nebular/theme";
import { DeletePromptComponent } from "../allcoupons/delete-prompt/delete-prompt.component";

@Component({
  selector: "ngx-autofetch",
  styleUrls: ["./autofetch.component.scss"],
  templateUrl: "./autofetch.component.html",
})
export class AutoFetchComponent implements OnDestroy {
  private alive = true;
  selectedBrand = null;
  brandArray = [{ name: "Admitad", id: "admitad" }];
  brandData: any = null;
  isBusy = false;

  constructor(
    private _dataService: DataService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    // this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe((res) => {
    //   if (res.data) {
    //     this.dataLoaded = res.data;
    //   } else this._dataService.showErrorToast(res.message);
    // });
  }
  fetchBrandData(brand: any) {
    this._dataService
      .fetchAPIUsingId("/api/fetchBrandData", brand)
      .subscribe((res) => {
        if (res.data) {
          this.brandData = res.data;
        } else this._dataService.showErrorToast(res.message);
      });
  }
  // confirmDelete() {
  //   var self = this;
  //   this._dataService
  //     .postAPI("/api/deleteStore", { _id: this.loadedStoreId })
  //     .subscribe((res) => {
  //       if (res.data) {
  //         self._dataService.showSuccessToast(res.message);
  //         self._dataService.deleteMedia(this.storeInfo.img);
  //         self._dataService.deleteMedia(this.storeInfo.thumbImg);
  //         self.storeInfo = {};
  //         self.dataLoaded.splice(this.loadedStoreIndex, 1);
  //         self.storeInfo = null;
  //         window.scrollTo(0, 0);
  //       } else self._dataService.showErrorToast(res.message);
  //     });
  // }
  // saveEditStoreToDB(storeNode) {
  //   if (this.updatingStore) return;
  //   this.updatingStore = true;
  //   var self = this;
  //   storeNode.storeURL = storeNode.name.replace(/ /g, "-").toLowerCase();
  //   if (this.croppedImage) {
  //     var filePath = `storeImages/_${new Date().getTime()}`;
  //     this._dataService
  //       .storeImage(filePath, this.selectedImage, function (error, data) {
  //         if (error) {
  //           self._dataService.showErrorToast(
  //             "Can't upload image to the Server"
  //           );
  //           self.updatingStore = false;
  //           return;
  //         }
  //         if (data) {
  //           self._dataService.deleteMedia(storeNode.img);
  //           storeNode.img = data;
  //           self.clearCroppedImage();
  //           if (self.croppedImage2) self.uploadNewThumbnail(storeNode);
  //           else self.saveCallbackFunc(storeNode);
  //         }
  //       })
  //       .subscribe();
  //   } else {
  //     if (self.croppedImage2) self.uploadNewThumbnail(storeNode);
  //     else self.saveCallbackFunc(storeNode);
  //   }
  // }
  // uploadNewThumbnail(storeNode) {
  //   var self = this;
  //   var filePath2 = `storeThumbImages/_${new Date().getTime()}`;
  //   this._dataService
  //     .storeImage(filePath2, this.selectedImage2, function (error, data) {
  //       if (error) {
  //         self._dataService.showErrorToast("Can't upload image to the Server");
  //         self.updatingStore = false;
  //         return;
  //       }
  //       if (data) {
  //         if (storeNode.thumbImg)
  //           self._dataService.deleteMedia(storeNode.thumbImg);
  //         storeNode.thumbImg = data;
  //         self.saveCallbackFunc(storeNode);
  //         self.clearCroppedImage2();
  //       }
  //     })
  //     .subscribe();
  // }
  // saveCallbackFunc(storeData) {
  //   var self = this;
  //   if (storeData.trackUrl != this.oldStoreTrackUrl)
  //     storeData.updateCoupons = true;
  //   this._dataService.postAPI("/api/editStore", storeData).subscribe((res) => {
  //     if (res.data) {
  //       self._dataService.showSuccessToast(res.message);
  //       self.dataLoaded[this.loadedStoreIndex].name = res.data.name;
  //       self.dataLoaded[this.loadedStoreIndex]._id = res.data._id;
  //       self.storeInfo = res.data;
  //       window.scrollTo(0, 0);
  //       self.updatingStore = false;
  //     } else {
  //       self._dataService.showErrorToast(res.message);
  //       self.updatingStore = false;
  //     }
  //   });
  // }
  // openDeletePrompt() {
  //   this.dialogService
  //     .open(DeletePromptComponent)
  //     .onClose.subscribe((dltVal) => {
  //       if (dltVal) this.confirmDelete();
  //     });
  // }
  // fileChangeEvent(event: any): void {
  //   this.imageChangedEvent = event;
  // }
  // fileChangeEvent2(event: any): void {
  //   this.imageChangedEvent2 = event;
  // }

  // imageCropped(event: ImageCroppedEvent) {
  //   this.selectedImage = base64ToFile(event.base64);
  //   var reader = new FileReader();
  //   reader.readAsDataURL(this.selectedImage);
  //   reader.onloadend = () => {
  //     this.croppedImage = reader.result;
  //   };
  // }
  // imageCropped2(event: ImageCroppedEvent) {
  //   this.selectedImage2 = base64ToFile(event.base64);
  //   var reader = new FileReader();
  //   reader.readAsDataURL(this.selectedImage);
  //   reader.onloadend = () => {
  //     this.croppedImage2 = reader.result;
  //   };
  // }
  // clearCroppedImage() {
  //   this.imgModel = "";
  //   this.selectedImage = "";
  //   this.imageChangedEvent = "";
  //   this.croppedImage = "";
  // }
  // clearCroppedImage2() {
  //   this.imgModel2 = "";
  //   this.selectedImage2 = "";
  //   this.imageChangedEvent2 = "";
  //   this.croppedImage2 = "";
  // }
  ngOnDestroy() {
    this.alive = false;
  }
}
