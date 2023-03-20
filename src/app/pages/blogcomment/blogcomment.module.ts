import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbMenuModule,
  NbLayoutModule,
  NbSelectModule,
  NbInputModule,
  NbSpinnerModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { BlogCommentComponent } from "./blogcomment.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    ThemeModule,
    NbMenuModule,
    NbActionsModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
  ],
  declarations: [BlogCommentComponent],
})
export class BlogCommentModule {}
