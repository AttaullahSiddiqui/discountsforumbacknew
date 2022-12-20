import { NgModule } from "@angular/core";
import { NbMenuModule } from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { AddUserModule } from "./addUser/adduser.module";
import { AllUserModule } from "./allUser/alluser.module";
import { AllSettingsModule } from "./allSettings/all-settings.module";
import { AddCategoryModule } from "./addcategory/addcategory.module";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    AddUserModule,
    AllUserModule,
    AllSettingsModule,
    AddCategoryModule,
    MiscellaneousModule,
  ],
  declarations: [PagesComponent],
})
export class PagesModule {}
