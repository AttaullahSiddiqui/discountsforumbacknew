import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { UtilityService } from "../../@core/utils/utility.service";
import { ImageCroppedEvent, base64ToFile } from "ngx-image-cropper";

@Component({
  selector: "ngx-allsettings",
  styleUrls: ["./all-settings.component.scss"],
  templateUrl: "./all-settings.component.html",
})
export class AllSettingsComponent implements OnDestroy {
  private alive = true;
  dummyArr: [] = null;
  isBusy: Boolean = false;
  mainObject = {
    tags: "",
    eventName: "",
    eventBarText: "",
    img:null
  };
  selectedImage: any = null;
  imageChangedEvent: any = "";
  imgModel = "";
  htmlContent: any;
  croppedImage: any = "";

  constructor(
    private _dataService: DataService,
    private _utlityService: UtilityService
  ) {}

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchSettingsData").subscribe((res) => {
      if (res.data) {
        this.mainObject = res.data;
      } else this._dataService.showErrorToast(res.message);
    });
  }

  submitChanges(mainObj) {
    if (this.isBusy) return;
    this.isBusy = true;
    var self = this;
    if (this.croppedImage) {
      var filePath = `storeImages/_${new Date().getTime()}`;
      this._dataService
        .storeImage(filePath, this.selectedImage, function (error, data) {
          if (error) {
            self._dataService.showErrorToast(
              "Can't upload image to the Server"
            );
            return;
          }
          if (data) {
            if (mainObj.img) self._dataService.deleteMedia(mainObj.img);
            mainObj.img = data;
            self.clearCroppedImage();
            self.saveSettingCallback(mainObj);
          }
        })
        .subscribe();
    } else {
      self.saveSettingCallback(mainObj);
    }
  }
  saveSettingCallback(mainObj): void {
    this._dataService
      .postAPI("/api/updateSettings", mainObj)
      .subscribe((res) => {
        if (res.data) {
          this._dataService.showSuccessToast(res.message);
          window.scrollTo(0, 0);
          this.isBusy = false;
        } else this._dataService.showErrorToast(res.message);
      });
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.selectedImage = base64ToFile(event.base64);
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onloadend = () => {
      this.croppedImage = reader.result;
    };
  }
  clearCroppedImage() {
    this.imgModel = "";
    this.selectedImage = "";
    this.imageChangedEvent = "";
    this.croppedImage = "";
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
