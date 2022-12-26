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
import { AllCategoriesModule } from "./allcategories/allcategories.module";
import { AddCouponModule } from "./addcoupon/addcoupon.module";
import { AllCouponsModule } from "./allcoupons/allcoupons.module";
import { DeletePromptModule } from "./allcoupons/delete-prompt/delete-prompt.module";
import { SortCouponsModule } from "./sortcoupons/sort-coupons.module";
import { SortablejsModule } from "ngx-sortablejs";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    SortablejsModule.forRoot({ animation: 200 }),
    DashboardModule,
    AddUserModule,
    AllUserModule,
    AllSettingsModule,
    AddCategoryModule,
    AllCategoriesModule,
    AddCouponModule,
    AllCouponsModule,
    DeletePromptModule,
    SortCouponsModule,
    MiscellaneousModule,
  ],
  declarations: [PagesComponent],
})
export class PagesModule {}
