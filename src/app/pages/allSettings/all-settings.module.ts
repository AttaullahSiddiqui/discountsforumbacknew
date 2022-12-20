import { NgModule } from "@angular/core";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbSelectModule,
  NbMenuModule,
  NbLayoutModule,
  NbInputModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { AllSettingsComponent } from "./all-settings.component";
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
    NbSelectModule,
    NbSpinnerModule,
  ],
  declarations: [AllSettingsComponent],
})
export class AllSettingsModule {}
