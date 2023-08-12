import {
  Component,
  OnDestroy,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { UtilityService } from "../../@core/utils/utility.service";
import { LocalDataSource } from "ng2-smart-table";
import { CustomRenderComponent } from "./customaction.component";
import { NbDialogService, NbWindowService } from "@nebular/theme";
import { ImageCroppedEvent, base64ToFile } from "ngx-image-cropper";
import { DeletePromptComponent } from "../allcoupons/delete-prompt/delete-prompt.component";

@Component({
  selector: "ngx-allcategories",
  styleUrls: ["./allcategories.component.scss"],
  templateUrl: "./allcategories.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class AllCategoriesComponent {
  catArray = [];
  isBusy = false;
  deleteObject = "";

  dltIndex: any;
  editObject: any = "";
  editKey = "";
  notAdmin: Boolean = false;
  windowRef: any;
  selectedImage: any = null;
  imageChangedEvent: any = "";
  imgModel = "";
  htmlContent: any;
  croppedImage: any = "";
  settings = {
    mode: "external",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      sno: {
        title: "sNo",
        type: "number",
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        },
        editable: false,
      },
      name: {
        title: "Username",
        type: "string",
      },
      metaTitle: {
        title: "Meta Title",
        type: "string",
      },
      metaDescription: {
        title: "Meta Description",
        type: "string",
      },
      // featuredForHome: {
      //   title: "Featured on Home",
      //   type: "custom",
      //   renderComponent: CustomRenderComponent,
      // },
    },
    actions: {
      add: false,
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private _dataService: DataService,
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
    private _utlityService: UtilityService
  ) {}

  ngOnInit() {
    this.getCategoriesFunc();
  }
  getCategoriesFunc() {
    this._dataService
      .fetchAPIWithLimit("/api/fetchCategories", 0, 100)
      .subscribe((res) => {
        if (res.data) {
          const data = res.data;
          this.catArray = [];
          this.catArray = data;
          this.source.load(data);
        } else {
          this._dataService.showErrorToast(res.message);
        }
      });
  }
  uploadCategoryImage(catInfo) {
    if (this.isBusy) return;
    this.isBusy = true;
    var self = this;
    if (this.croppedImage) {
      var filePath = `categoryImages/_${new Date().getTime()}`;
      this._dataService
        .storeImage(filePath, this.selectedImage, function (error, data) {
          if (error) {
            this._dataService.showErrorToast(
              "Can't upload image to the Server"
            );
            return;
          }
          if (data) {
            catInfo.img = data;
            self.saveEditedCoupon(catInfo);
          }
        })
        .subscribe();
    } else self.saveEditedCoupon(catInfo);
  }
  openEditForm(event: any, editModal: TemplateRef<any>) {
    this.editObject = null;
    this.editObject = { ...event.data };
    this.editKey = event.index;
    this.windowRef = this.windowService.open(editModal, {
      title: `Edit Category Form`,
    });
  }
  saveEditedCoupon(catInfo) {
    this._dataService.postAPI("/api/editCategory", catInfo).subscribe((res) => {
      if (res.data) {
        this._dataService.showSuccessToast(res.message);
        this.catArray[this.editKey] = res.data;
        this.source.refresh();
        this.editObject = "";
        this.isBusy = false;
      } else {
        this._dataService.showErrorToast(res.message);
        this.isBusy = false;
      }
    });
  }
  onSaveConfirm(event): void {
    this._dataService
      .postAPI("/api/editCategory", event.newData)
      .subscribe((res) => {
        if (res.data) {
          this._dataService.showSuccessToast(res.message);
          event.confirm.resolve();
        } else {
          this._dataService.showErrorToast(res.message);
          event.confirm.reject();
        }
      });
  }
  onDeleteConfirm(event): void {
    var self = this;
    this._dataService
      .postAPI("/api/deleteCategory", {
        _id: event.data._id,
      })
      .subscribe((res) => {
        if (res.data) {
          this._dataService.showSuccessToast(res.message);
          if (event.data.img) self._dataService.deleteMedia(event.data.img);
          this.catArray.splice(this.dltIndex, 1);
          this.source.refresh();
        } else {
          this._dataService.showErrorToast(res.message);
        }
      });
  }
  openDeletePrompt(event: any) {
    this.dltIndex = event.index;
    this.dialogService
      .open(DeletePromptComponent)
      .onClose.subscribe((dltVal) => {
        if (dltVal) this.onDeleteConfirm(event);
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
}
