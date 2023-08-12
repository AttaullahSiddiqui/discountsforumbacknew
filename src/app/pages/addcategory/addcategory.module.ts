import { NgModule } from "@angular/core";
import { ImageCropperModule } from "ngx-image-cropper";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbMenuModule,
  NbLayoutModule,
  NbInputModule,
  NbSpinnerModule,
  NbCheckboxModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { AddCategoryComponent } from "./addcategory.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
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
    ImageCropperModule,
  ],
  declarations: [AddCategoryComponent],
})
export class AddCategoryModule {}
