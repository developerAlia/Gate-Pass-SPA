import { SecurityRoutingModule } from "./security-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatStepperModule } from "@angular/material/stepper";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ArchwizardModule } from "angular-archwizard";
import { SharedModule } from "src/app/shared/shared.module";
import { RequestListComponent } from "./request-list/request-list.component";
import { GateListComponent } from "./gate-list/gate-list.component";
import { CheckInModalComponent } from "./modals/check-in-modal/check-in-modal.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { QrScanVisitorComponent } from "./qr-scan-visitor/qr-scan-visitor.component";
import { CheckInDetailsComponent } from "./shared/check-in-details/check-in-details.component";
import { FineListComponent } from "./fine-list/fine-list.component";
import { FineIssueComponent } from './shared/modals/fine-issue/fine-issue.component';
import { FineHistoryComponent } from './shared/modals/fine-history/fine-history.component';
import { ProfileViewModalComponent } from './shared/modals/profile-view-modal/profile-view-modal.component';

@NgModule({
  declarations: [
    RequestListComponent,
    GateListComponent,
    CheckInModalComponent,
    QrScanVisitorComponent,
    CheckInDetailsComponent,
    FineListComponent,
    FineIssueComponent,
    FineHistoryComponent,
    ProfileViewModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SecurityRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    ArchwizardModule,
    MatStepperModule,
    MatSlideToggleModule,
  ],
})
export class SecurityModule {}
