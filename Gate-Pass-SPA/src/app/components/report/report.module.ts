import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatStepperModule } from "@angular/material/stepper";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ArchwizardModule } from "angular-archwizard";
import { SharedModule } from "src/app/shared/shared.module";
import { ReportRoutingModule } from "./report-routing.module";
import { RequestReportComponent } from './request-report/request-report.component';
import { CheckedInReportComponent } from './checked-in-report/checked-in-report.component';

@NgModule({
  declarations: [
    RequestReportComponent,
    CheckedInReportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ReportRoutingModule,
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
export class ReportModule {}
