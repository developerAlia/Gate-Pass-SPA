import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ControlContainer, FormGroup, Validators } from "@angular/forms";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { WizardComponent } from "angular-archwizard";
import { zVisitType } from "src/app/shared/models/zsk/zVisitType";
import { DateService } from "src/app/shared/services/date.service";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "visitor-date-section",
  templateUrl: "./visitor-date-section.component.html",
  styleUrls: ["./visitor-date-section.component.scss"],
})
export class VisitorDateSectionComponent implements OnInit {
  @Input() public permitDates: FormGroup;
  @Input() public visitorDetails: FormGroup;
  @Input() public drivingLicenseDetails: FormGroup;
  @Input() public vehicleDetails: FormGroup;
  @Input() public isOfficer: boolean = false;
  @Input() public isSecurity: boolean = false;

  @Output() numberOfDays: EventEmitter<any> = new EventEmitter<any>();

  // zVisitType: zVisitType[] = [];
  selectedVisitType: zVisitType;
  minDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  maxDate: NgbDateStruct;

  model: NgbDateStruct;
  date: { year: number };

  constructor(
    private controlContranier: ControlContainer,
    private zskService: ZskService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private dateService: DateService,
    private translate: TranslateService,
    private wizard: WizardComponent
  ) {
    this.permitDates = <FormGroup>this.controlContranier.control;
    this.visitorDetails = <FormGroup>this.controlContranier.control;
  }

  test() {
    this.wizard.goToNextStep();
  }

  ngOnInit(): void {
    this.permitDates.get("zVisitTypeId")?.valueChanges.subscribe((data) => {
      // console.log(this.zVisitType);
      // console.log(data);

      if (data != 0) {
        if (this.isSecurity == false) {
          this.selectedVisitType = null;
          this.getVisitType().then((data: zVisitType) => {
            this.selectedVisitType = data;
            // console.log(data);

            this.permitDates.get("permitDateFrom").setValue(null);
            this.permitDates.get("permitDateTo").setValue(null);

            this.visitorDetails
              .get("isCivilAttachRequired")
              .setValue(this.selectedVisitType.isCivilAttachRequired);
            this.visitorDetails
              .get("isPhotoAttachRequired")
              .setValue(this.selectedVisitType.isPhotoAttachRequired);
            this.visitorDetails.get("numberOfDays").setValue(0);
            this.visitorDetails
              .get("numberOfDays")
              .setValue(this.selectedVisitType.dayTo);
            this.permitDates
              .get("zVisitTypeNameEn")
              .setValue(this.selectedVisitType.nameEn);
            this.permitDates
              .get("zVisitTypeNameAr")
              .setValue(this.selectedVisitType.nameAr);
            this.numberOfDays.emit(this.selectedVisitType.dayTo);

            this.setRelationshipValidator();
            this.setAttachValidator();
            this.setDrivingLicenseValidator();
            this.setVehicleValidator();
            this.setDateSelectionValidator();
          });
          // this.selectedVisitType = this.zVisitType.find(
          //   (i) => i.zVisitTypeId === data
          // );
          // this.getVisitType().then();
          // console.log("Date Selection");
        }
      }
    });

    this.permitDates
      .get("permitDateFrom")
      ?.valueChanges.subscribe((data: NgbDateStruct) => {
        if (data) {
          const dateToMax = this.dateService
            .addDays(
              this.selectedVisitType.dayTo - 1,
              new Date(this.ngbDateParserFormatter.format(data))
            )
            .toISOString()
            .split("T")[0];
          this.maxDate = null;
          this.maxDate = this.ngbDateParserFormatter.parse(dateToMax);
          this.permitDates.get("permitDateTo").setValue(null);

          if (this.selectedVisitType.dayTo == 1) {
            // console.log("HEREEE");

            this.permitDates
              .get("permitDateTo")
              .setValue(this.permitDates.get("permitDateFrom").value);
          }
        }
      });
  }

  setDateSelectionValidator() {
    if (this.visitorDetails.get("numberOfDays").value > 1) {
      this.permitDates.get("permitDateTo").setValidators([Validators.required]);
    } else {
      this.permitDates.get("permitDateTo").setValidators(null);
    }
    this.permitDates.get("permitDateTo").updateValueAndValidity();
  }

  setAttachValidator() {
    if (this.visitorDetails.value.isCivilAttachRequired == true) {
      this.visitorDetails
        .get("attachIdCard")
        .setValidators([Validators.required]);
    } else {
      this.visitorDetails.get("attachIdCard").setValidators(null);
    }
    if (this.visitorDetails.value.isCivilAttachRequired == true) {
      this.visitorDetails
        .get("isPhotoAttachRequired")
        .setValidators([Validators.required]);
    } else {
      this.visitorDetails.get("isPhotoAttachRequired").setValidators(null);
    }

    this.visitorDetails.get("attachIdCard").updateValueAndValidity();
    this.visitorDetails.get("isPhotoAttachRequired").updateValueAndValidity();
  }

  setRelationshipValidator() {
    if (this.selectedVisitType.dayTo > 14) {
      this.visitorDetails
        .get("zRelationshipId")
        .setValidators([Validators.required]);
    } else {
      this.visitorDetails.get("zRelationshipId").setValidators(null);
    }
    this.visitorDetails.get("zRelationshipId").updateValueAndValidity();
  }

  setDrivingLicenseValidator() {
    if (this.selectedVisitType.dayTo > 14) {
      // this.drivingLicenseDetails
      //   .get("drivingLicenseId")
      //   .setValidators([Validators.required]);
      this.drivingLicenseDetails
        .get("usersId")
        .setValidators([Validators.required]);
      this.drivingLicenseDetails
        .get("licenseAttach")
        .setValidators([Validators.required]);
      this.drivingLicenseDetails
        .get("expairyDate")
        .setValidators([Validators.required]);
    } else {
      this.drivingLicenseDetails.get("drivingLicenseId").setValidators(null);
      this.drivingLicenseDetails.get("usersId").setValidators(null);
      this.drivingLicenseDetails.get("licenseAttach").setValidators(null);
      this.drivingLicenseDetails.get("expairyDate").setValidators(null);
    }
    this.drivingLicenseDetails.get("drivingLicenseId").updateValueAndValidity();
    this.drivingLicenseDetails.get("usersId").updateValueAndValidity();
    this.drivingLicenseDetails.get("licenseAttach").updateValueAndValidity();
    this.drivingLicenseDetails.get("expairyDate").updateValueAndValidity();
  }

  setVehicleValidator() {
    if (this.selectedVisitType.dayTo > 14) {
      this.vehicleDetails.get("vehicleId").setValidators([Validators.required]);
      this.vehicleDetails.get("zMakerId").setValidators([Validators.required]);
      this.vehicleDetails.get("zModelId").setValidators([Validators.required]);
      this.vehicleDetails.get("year").setValidators([Validators.required]);
      this.vehicleDetails
        .get("plateNumber")
        .setValidators([Validators.required]);
      this.vehicleDetails
        .get("zPlateCodeId")
        .setValidators([Validators.required]);
      this.vehicleDetails
        .get("registrationAttach")
        .setValidators([Validators.required]);
      this.vehicleDetails
        .get("registrationIssue")
        .setValidators([Validators.required]);
      this.vehicleDetails
        .get("registrationExpairy")
        .setValidators([Validators.required]);
      this.vehicleDetails
        .get("zOwnershipTypeId")
        .setValidators([Validators.required]);
    } else {
      this.vehicleDetails.get("vehicleId").setValidators([Validators.required]);
      this.vehicleDetails.get("zMakerId").setValidators([Validators.required]);
      this.vehicleDetails.get("zModelId").setValidators([Validators.required]);
      this.vehicleDetails.get("year").setValidators([Validators.required]);
      this.vehicleDetails.get("plateNumber").setValidators([Validators.required]);
      this.vehicleDetails.get("zPlateCodeId").setValidators([Validators.required]);
      this.vehicleDetails.get("registrationAttach").setValidators(null);
      this.vehicleDetails.get("registrationIssue").setValidators([Validators.required]);
      this.vehicleDetails.get("registrationExpairy").setValidators([Validators.required]);
      this.vehicleDetails.get("zOwnershipTypeId").setValidators(null);
    }
    this.vehicleDetails.get("vehicleId").updateValueAndValidity();
    this.vehicleDetails.get("zMakerId").updateValueAndValidity();
    this.vehicleDetails.get("zModelId").updateValueAndValidity();
    this.vehicleDetails.get("year").updateValueAndValidity();
    this.vehicleDetails.get("plateNumber").updateValueAndValidity();
    this.vehicleDetails.get("zPlateCodeId").updateValueAndValidity();
    this.vehicleDetails.get("registrationAttach").updateValueAndValidity();
    this.vehicleDetails.get("registrationIssue").updateValueAndValidity();
    this.vehicleDetails.get("registrationExpairy").updateValueAndValidity();
    this.vehicleDetails.get("zOwnershipTypeId").updateValueAndValidity();
  }

  async getVisitType(): Promise<zVisitType> {
    // console.log("isOfficer:", this.isOfficer);

    return new Promise((resolve) => {
      this.zskService
        .getzVisitTypeById(this.permitDates.get("zVisitTypeId").value)
        .subscribe((data: zVisitType) => {
          // console.log(data);

          // this.selectedVisitType = data;
          resolve(data);
          // console.log(this.selectedVisitType);
        });
    });
  }
}
