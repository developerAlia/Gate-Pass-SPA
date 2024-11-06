import { AdministrationsRoutingModule } from "./administrations-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ColorsListsComponent } from "./colors-lists/colors-lists.component";
import { AddColorModalComponent } from "./add-color-modal/add-color-modal.component";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatStepperModule } from "@angular/material/stepper";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ArchwizardModule } from "angular-archwizard";
import { UsersProfilesComponent } from './users-profiles/users-profiles.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    ColorsListsComponent,
    AddColorModalComponent,
    UsersProfilesComponent,
  ],
  imports: [
    CommonModule,
    AdministrationsRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    ArchwizardModule,
    MatStepperModule,
    MatSlideToggleModule
  ],
})
export class AdministrationsModule {}
