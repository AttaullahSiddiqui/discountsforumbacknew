import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { AddUserComponent } from "./addUser/adduser.component";
import { UtilityService } from "../@core/utils/utility.service";
import { AllUserComponent } from "./allUser/alluser.component";
import { AllSettingsComponent } from "./allSettings/all-settings.component";
import { AddCategoryComponent } from "./addcategory/addcategory.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [UtilityService],
      },
      {
        path: "adduser",
        component: AddUserComponent,
        canActivate: [UtilityService],
      },
      {
        path: "alluser",
        component: AllUserComponent,
        canActivate: [UtilityService],
      },
      {
        path: "settings",
        component: AllSettingsComponent,
        canActivate: [UtilityService],
      },
      {
        path: "addcategory",
        component: AddCategoryComponent,
        canActivate: [UtilityService],
      },
      {
        path: "",
        redirectTo: "/auth",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
