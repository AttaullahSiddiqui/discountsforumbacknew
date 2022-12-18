import { Component, OnInit } from "@angular/core";
import { DataService } from "../@core/utils/data.service";
import { UtilityService } from "../@core/utils/utility.service";
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
} from "@nebular/theme";

@Component({
  selector: "ngx-auth",
  styleUrls: ["auth.component.scss"],
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  userData: any = {};

  constructor(
    private _dataService: DataService,
    private _utlityService: UtilityService
  ) {}

  ngOnInit() {
    var checkAuth = this._utlityService.getToken();
    if (checkAuth) {
      this._dataService
        .postAPI("/api/verifyUserToken", { token: checkAuth })
        .subscribe((res) => {
          // if (res.data) this.router.navigateByUrl("/dashboard");
          if (res.data) console.log("ALready logged in");
        });
    }
  }

  authUser(userInfo) {
    console.log(userInfo);
    this._dataService.postAPI("/api/login", userInfo).subscribe((res) => {
      if (res.data) {
        this._utlityService.setToken(res.data);
        // this.router.navigateByUrl("/dashboard");
        console.log("Logged In", "Success");
      } else {
        console.log(res["message"], "Error");
      }
    });
  }
}
