import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { SortablejsModule } from "ngx-sortablejs";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbMenuModule,
  NbLayoutModule,
  NbInputModule,
  NbSpinnerModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
  NbTreeGridModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { SortCouponsComponent } from "./sort-coupons.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    NgSelectModule,
    SortablejsModule,
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    NbInputModule,
    ThemeModule,
    NbMenuModule,
    NbActionsModule,
    NbSpinnerModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbTreeGridModule,
  ],
  declarations: [SortCouponsComponent],
})
export class SortCouponsModule {}
