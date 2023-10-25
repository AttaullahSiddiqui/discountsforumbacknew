import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { HttpService, Response } from "../../@core/utils/http.service";
import * as customBuild from "../ckEditorCustomBuild/build/ckeditor.js";
import { ImageCroppedEvent, base64ToFile } from "ngx-image-cropper";

@Component({
  selector: "ngx-addstore",
  styleUrls: ["./addstore.component.scss"],
  templateUrl: "./addstore.component.html",
})
export class AddStoreComponent implements OnDestroy {
  private alive = true;
  public Editor = customBuild;
  public ckConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "fontFamily",
        "fontSize",
        "|",
        "bold",
        "italic",
        "underline",
        "superscript",
        "subscript",
        "strikeThrough",
        "|",
        "link",
        "|",
        "outdent",
        "indent",
        "|",
        "fontBackgroundColor",
        "fontColor",
        "highlight",
        "alignment",
        "horizontalLine",
        "sourceEditing",
        "undo",
        "redo",
      ],
      shouldNotGroupWhenFull: true,
      viewportTopOffset: 60,
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    fontSize: {
      options: [
        8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
      ],
      supportAllValues: true,
    },
    removeFormatAttributes: "",
    language: "en",
    placeholder: "Type the content here!",
  };
  showList: boolean;
  storeInfo: any = { shortDes: "", longDes: "", rating: 4 };
  categories: any;
  isBusy = false;
  selectedImage: any = null;
  selectedImage2: any = null;
  imageChangedEvent: any = "";
  imageChangedEvent2: any = "";
  imgModel = "";
  imgModel2 = "";
  htmlContent: any;
  htmlContent2: any;
  croppedImage: any = "";
  croppedImage2: any = "";
  signatureNode: any;
  _self = this;

  constructor(private _dataService: DataService, private _http: HttpService) {}

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchCategories").subscribe((res) => {
      if (res.data) {
        this.categories = res.data;
      } else this._dataService.showErrorToast(res.message);
    });
    // this._dataService.fetchAPI("/cloudinaryDetails").subscribe((res) => {
    //   console.log(res);
    //   this.signatureNode = res;
    // });
  }
  addStore(storeInfo) {
    if (this.isBusy) return;
    this.isBusy = true;
    var _self = this;
    if (!storeInfo.editorChoice) storeInfo.editorChoice = false;
    if (!storeInfo.topStore) storeInfo.topStore = false;
    storeInfo.storeURL = storeInfo.name.replace(/ /g, "-").toLowerCase();
    const formData = new FormData();
    for (var key in storeInfo) {
      formData.append(key, storeInfo[key]);
    }
    formData.append("uploadFile", this.selectedImage);
    this._http
      .post("/api/addStore", formData)
      .then((result: Response) => {
        _self._dataService.showSuccessToast("Store added successfully");
        _self.storeInfo = { rating: 1 };
        _self.imgModel = "";
        _self.imgModel2 = "";
        _self.croppedImage = "";
        _self.croppedImage2 = "";
        _self.selectedImage = "";
        _self.selectedImage2 = "";
        _self.imageChangedEvent = "";
        _self.imageChangedEvent2 = "";
        window.scrollTo(0, 0);
        _self.isBusy = false;
      })
      .catch((error: Response) => {
        this._dataService.showErrorToast(error.error.message);
      });
  }
  // upoloadThumbImg(storeInfo) {
  //   var self = this;
  //   var filePath2 = `storeThumbImages/_${new Date().getTime()}`;
  //   this._dataService
  //     .storeImage(filePath2, this.selectedImage2, function (error, data) {
  //       if (error) {
  //         this._dataService.showErrorToast("Can't upload image to the Server");
  //         return;
  //       }
  //       if (data) {
  //         storeInfo.thumbImg = data;
  //         self.saveStoreToDB(storeInfo);
  //       }
  //     })
  //     .subscribe();
  // }

  // saveStoreToDB(storeNode) {

  // }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  fileChangeEvent2(event: any): void {
    this.imageChangedEvent2 = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.selectedImage = this._dataService.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name
    );
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onloadend = () => {
      this.croppedImage = reader.result;
    };
  }
  
  imageCropped2(event: ImageCroppedEvent) {
    this.selectedImage2 = base64ToFile(event.base64);
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onloadend = () => {
      this.croppedImage2 = reader.result;
    };
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
