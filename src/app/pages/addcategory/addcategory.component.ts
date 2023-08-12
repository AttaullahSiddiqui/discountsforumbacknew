import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { UtilityService } from "../../@core/utils/utility.service";
import { ImageCroppedEvent, base64ToFile } from "ngx-image-cropper";

@Component({
  selector: "ngx-addcategory",
  styleUrls: ["./addcategory.component.scss"],
  templateUrl: "./addcategory.component.html",
})
export class AddCategoryComponent implements OnDestroy {
  private alive = true;
  catData: any = {};
  isBusy = false;
  selectedImage: any = null;
  imageChangedEvent: any = "";
  imgModel = "";
  htmlContent: any;
  croppedImage: any = "";

  constructor(
    private _dataService: DataService,
    private _utlityService: UtilityService
  ) {}

  ngOnInit() {}

  uploadCategoryImage(catInfo:any) {
    if (this.isBusy) return;
    this.isBusy = true;
    var self = this;
    var filePath = `categoryImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage, function (error, data) {
        if (error) {
          self.errorHandler("Can't upload image to the Server");
          return;
        }
        if (data) {
          catInfo.img = data;
          console.log("Immage uploade dsuccessfully")
          self.createCategory(catInfo);
        }
      })
      .subscribe();
  }

  createCategory(catInfo: any) {
    if (!catInfo.catFeatured) catInfo.catFeatured = false;
    catInfo.categoryURL = catInfo.catName.replace(/ /g, "-").toLowerCase();
    this.isBusy = true;
    this._dataService
      .postAPI("/api/createCategory", catInfo)
      .subscribe((res) => {
        if (res.data) {
          this._dataService.showSuccessToast(res.message);
          this.isBusy = false;
          this.catData = {};
          this.imgModel = "";
          this.croppedImage = "";
          this.selectedImage = "";
          this.imageChangedEvent = "";
        } else {
          this._dataService.showErrorToast(res.message);
          this.isBusy = false;
        }
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
  errorHandler(msg) {
    this._dataService.showErrorToast(msg);
    window.scrollTo(0, 0);
    this.isBusy = false;
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
