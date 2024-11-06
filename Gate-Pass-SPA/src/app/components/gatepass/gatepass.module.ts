import { UserRolesComponent } from "./../administrations/user-roles/user-roles.component";
import { MyvisitorsComponent } from "./user-profile/sections/visitor-section/myvisitors/myvisitors.component";
import { MatStepperModule } from "@angular/material/stepper";
import { GatepassRoutingModule } from "./gatepass-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MygatepassComponent } from "./user-profile/sections/gate-pass-section/mygatepass/mygatepass.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "src/app/shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MyfinesComponent } from "./myfines/myfines.component";
import { GatepassmodalComponent } from "./gatepassmodal/gatepassmodal.component";
import { MatRadioModule } from "@angular/material/radio";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DrivinglicenseComponent } from "./drivinglicense/drivinglicense.component";
import { ArchwizardModule } from "angular-archwizard";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { EditUserGatepassComponent } from "./edit-user-gatepass/edit-user-gatepass.component";
import { UsersComponent } from "./users/users.component";
import { GatePassSectionComponent } from "./user-profile/sections/gate-pass-section/gate-pass-section.component";
import { VisitorSectionComponent } from "./user-profile/sections/visitor-section/visitor-section.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { AddExternalUserModalComponent } from "./users/add-external-user-modal/add-external-user-modal.component";
import { VisitorConfirmationSectionComponent } from "./user-profile/modals/visitor-modal/visitor-confirmation-section/visitor-confirmation-section.component";
import { VisitorDrivingLicenseDetailsSectionComponent } from "./user-profile/modals/visitor-modal/visitor-driving-license-details-section/visitor-driving-license-details-section.component";
import { VisitorDateSectionComponent } from "./user-profile/modals/visitor-modal/visitor-date-section/visitor-date-section.component";
import { VisitorDetailsSectionComponent } from "./user-profile/modals/visitor-modal/visitor-details-section/visitor-details-section.component";
import { VisitorVehicleDetailsComponent } from "./user-profile/modals/visitor-modal/visitor-vehicle-details/visitor-vehicle-details.component";
import { VisitorIdSectionComponent } from "./user-profile/modals/visitor-modal/visitor-id-section/visitor-id-section.component";
import { VisitorModalComponent } from "./user-profile/modals/visitor-modal/visitor-modal.component";
import { VisitorProfileViewSectionComponent } from "./user-profile/modals/visitor-modal/visitor-profile-view-section/visitor-profile-view-section.component";
import { GatePassModalComponent } from "./user-profile/modals/gate-pass-modal/gate-pass-modal.component";
import { GatePassLicenseSectionComponent } from "./user-profile/modals/gate-pass-modal/gate-pass-license-section/gate-pass-license-section.component";
import { GatePassCarPlateSectionComponent } from "./user-profile/modals/gate-pass-modal/gate-pass-car-plate-section/gate-pass-car-plate-section.component";
import { GatePassCarDetailsSectionComponent } from './user-profile/modals/gate-pass-modal/gate-pass-car-details-section/gate-pass-car-details-section.component';
import { GatePassConfirmationSectionComponent } from './user-profile/modals/gate-pass-modal/gate-pass-confirmation-section/gate-pass-confirmation-section.component';
import { FineSectionComponent } from './user-profile/sections/fine-section/fine-section.component';
import { MyFinesComponent } from './user-profile/sections/fine-section/my-fines/my-fines.component';

@NgModule({
  declarations: [
    MygatepassComponent,
    MyfinesComponent,
    GatepassmodalComponent,
    DrivinglicenseComponent,
    MyvisitorsComponent,
    UserProfileComponent,
    UserRolesComponent,
    EditUserGatepassComponent,
    UsersComponent,
    GatePassSectionComponent,
    VisitorSectionComponent,
    VisitorModalComponent,
    VisitorDateSectionComponent,
    VisitorIdSectionComponent,
    VisitorDetailsSectionComponent,
    VisitorDrivingLicenseDetailsSectionComponent,
    VisitorVehicleDetailsComponent,
    AddExternalUserModalComponent,
    VisitorConfirmationSectionComponent,
    VisitorProfileViewSectionComponent,
    GatePassModalComponent,
    GatePassLicenseSectionComponent,
    GatePassCarPlateSectionComponent,
    GatePassCarDetailsSectionComponent,
    GatePassConfirmationSectionComponent,
    FineSectionComponent,
    MyFinesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    GatepassRoutingModule,
    MatInputModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    ArchwizardModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ],
})
export class GatepassModule {}
