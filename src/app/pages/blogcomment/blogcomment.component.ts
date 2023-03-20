import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { UtilityService } from "../../@core/utils/utility.service";
import { LocalDataSource } from "ng2-smart-table";
import { NbWindowService, NbDialogService } from "@nebular/theme";
import { DeletePromptComponent } from "../allcoupons/delete-prompt/delete-prompt.component";
import { CustomRenderComponent } from "./customaction.component";

@Component({
  selector: "ngx-blogcomment",
  styleUrls: ["./blogcomment.component.scss"],
  templateUrl: "./blogcomment.component.html",
})
export class BlogCommentComponent implements OnDestroy {
  private alive = true;
  author = null;
  unApprovedComments = null;
  approvedComments = null;
  settingsForUnapproved = {
    mode: "external",
    edit: {
      editButtonContent: '<i class="nb-checkmark"></i>',
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
        filter: false,
      },
      msg: {
        title: "Comment",
        type: "string",
        filter: false,
      },
      blogId: {
        title: "BlogTitle",
        type: "custom",
        renderComponent: CustomRenderComponent,
        filter: false,
      },
    },
    actions: {
      add: false,
      position: "right",
    },
    hideSubHeader: true,
    noDataMessage: "No unapporved comment found",
  };
  settingsForApproved = {
    mode: "external",
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
        filter: false,
      },
      msg: {
        title: "Comment",
        type: "string",
        filter: false,
      },
      blogId: {
        title: "BlogTitle",
        type: "custom",
        renderComponent: CustomRenderComponent,
        filter: false,
      },
    },
    actions: {
      add: false,
      edit:false,
      position: "right",
    },
    hideSubHeader: true,
    noDataMessage: "No Apporved comment found",
  };
  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();

  constructor(
    private _dataService: DataService,
    private _utlityService: UtilityService,
    private windowService: NbWindowService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this._dataService
      .fetchAPI("/api/fetchUnApprovedComments")
      .subscribe((res) => {
        if (res.data) {
          this.unApprovedComments = res.data;
          this.source.load(this.unApprovedComments);
        } else this._dataService.showErrorToast("No unapproved comment found");
      });
    this._dataService
      .fetchAPI("/api/fetchApprovedComments")
      .subscribe((res) => {
        if (res.data) {
          this.approvedComments = res.data;
          this.source2.load(this.approvedComments);
        } else this._dataService.showErrorToast("No Approved comment found");
      });
    this.author = this._utlityService.getAuthor();
  }
  approveComment(event: any) {
    var tempVar = event.data;
    this._dataService
      .postAPI("/api/approveBlogComment", {
        _id: event.data._id
      })
      .subscribe((res) => {
        if (res.data) {
          this.unApprovedComments.splice(event.index, 1);
          this.source.refresh();
          this.approvedComments.unshift(tempVar);
          this.source2.refresh();
          this._dataService.showSuccessToast(res.message);
        } else {
          this._dataService.showErrorToast(res.message);
        }
      });
  }
  openDeletePrompt(event: any) {
    this.dialogService
      .open(DeletePromptComponent)
      .onClose.subscribe((dltVal) => {
        if (dltVal) this.onDeleteConfirm(event);
      });
  }
  openDeletePrompt2(event: any) {
    this.dialogService
      .open(DeletePromptComponent)
      .onClose.subscribe((dltVal) => {
        if (dltVal) this.onDeleteConfirm2(event);
      });
  }
  onDeleteConfirm(event): void {
    this._dataService
      .postAPI("/api/deleteBlogComment", {
        _id: event.data._id
      })
      .subscribe((res) => {
        if (res.data) {
          this.unApprovedComments.splice(event.index, 1);
          this.source.refresh();
          this._dataService.showSuccessToast(res.message);
        } else {
          this._dataService.showErrorToast(res.message);
        }
      });
  }
  onDeleteConfirm2(event): void {
    this._dataService
      .postAPI("/api/deleteBlogComment", {
        _id: event.data._id,
      })
      .subscribe((res) => {
        if (res.data) {
          this.approvedComments.splice(event.index, 1);
          this.source2.refresh();
          this._dataService.showSuccessToast(res.message);
        } else {
          this._dataService.showErrorToast(res.message);
        }
      });
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
