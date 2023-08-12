import { NgModule } from "@angular/core";
import { ImageCropperModule } from "ngx-image-cropper";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbMenuModule,
  NbLayoutModule,
  NbInputModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDialogModule,
  NbWindowModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { AllCategoriesComponent } from "./allcategories.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  imports: [
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NbRadioModule,
    NbSpinnerModule,
    ThemeModule,
    NbMenuModule,
    NbActionsModule,
    Ng2SmartTableModule,
    ImageCropperModule,
  ],
  declarations: [AllCategoriesComponent],
})
export class AllCategoriesModule {}
