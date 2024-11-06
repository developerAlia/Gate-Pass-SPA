import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, ControlContainer, Validators } from "@angular/forms";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { WizardComponent } from "angular-archwizard";
import { ToastrService } from "ngx-toastr";
import { DrivingLicenseVerify } from "src/app/shared/models/admin/verifyData";
import {
  DrivingLicenseAttach,
  DrivingLicensePost,
} from "src/app/shared/models/gatepass/drivingLicense";
import { Vehicle2Get } from "src/app/shared/models/gatepass/vehicle";
import { zPlateCode } from "src/app/shared/models/zsk/zPlateCode";
import { AdminService } from "src/app/shared/services/admin.service";
import { DateService } from "src/app/shared/services/date.service";
import { GatePassService } from "src/app/shared/services/gatepass.service";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "visitor-driving-license-details-section",
  templateUrl: "./visitor-driving-license-details-section.component.html",
  styleUrls: ["./visitor-driving-license-details-section.component.scss"],
})
export class VisitorDrivingLicenseDetailsSectionComponent implements OnInit {
  @Input() public drivingLicenseDetails: FormGroup;
  @Input() public vehicleDetails: FormGroup;
  @Input() public usersId: number;
  @Input() public licenseCardAttach: File;
  @Input() public isSecurity: boolean = false;
  @Input() public numOfDays: number;

  minDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  @Output() fileToUpload: EventEmitter<{ file; controlName; isPDF }> =
    new EventEmitter<{ file; controlName; isPDF }>();
  @Output() viewAttachmentFile: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private controlContranier: ControlContainer,
    private gatePassService: GatePassService,
    private toastrService: ToastrService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private dateService: DateService,
    private wizard: WizardComponent,
    private adminService: AdminService,
    private zskService: ZskService
  ) {
    this.drivingLicenseDetails = <FormGroup>this.controlContranier.control;
    this.vehicleDetails = <FormGroup>this.controlContranier.control;
  }

  ngOnInit(): void {
    console.log(this.numOfDays);

    this.drivingLicenseDetails
      .get("securitySide.isverified")
      .valueChanges.subscribe((data) => {
        if (data == true) {
          this.drivingLicenseDetails.get("securitySide.notes").setValue(null);
          this.drivingLicenseDetails
            .get("securitySide.notes")
            .setValidators(null);
        } else {
          this.drivingLicenseDetails
            .get("securitySide.notes")
            .setValidators([Validators.required]);
        }
        this.drivingLicenseDetails
          .get("securitySide.notes")
          .updateValueAndValidity();
      });

    this.drivingLicenseDetails
      .get("isExpire")
      .setValue(
        this.dateService.checkExpiryDate(
          new Date(
            this.ngbDateParserFormatter.format(
              this.drivingLicenseDetails.get("expairyDate").value
            )
          )
        )
      );

    this.vehicleDetails
      .get("zPlateCodeId")
      .valueChanges.subscribe((zPlateCodeId: number) => {
        this.zskService
          .getZPlateCodeById(zPlateCodeId)
          .subscribe((data: zPlateCode) => {
            this.vehicleDetails.get("zPlateCodeNameAr").setValue(data.nameAr);
            this.vehicleDetails.get("zPlateCodeNameEn").setValue(data.nameEn);
          });
      });
  }

  checkFileSize(file, controlName, isPDF) {
    this.fileToUpload.emit({
      file: file,
      controlName: controlName,
      isPDF: isPDF,
    });
  }

  postDrivingLicense() {
    if (this.numOfDays > 14) {
      const sendData: DrivingLicensePost = {
        usersId: this.usersId,
        expairyDate: this.ngbDateParserFormatter.format(
          this.drivingLicenseDetails.get("expairyDate").value
        ),
      };
      // console.log(sendData);
      this.gatePassService
        .postDrivingLicense(sendData)
        .subscribe((data: any) => {
          this.toastrService.success("Saved");
          // console.log(data);

          this.drivingLicenseDetails.get("drivingLicenseId").setValue(data);
          this.postAttach(), this.getVehicleDetails();
        });
    } else {
      this.getVehicleDetails();
    }
  }
  postAttach() {
    // console.log(this.licenseCardAttach);

    if (this.licenseCardAttach != null) {
      const sendData: DrivingLicenseAttach = {
        usersId: this.usersId,
        licenseURL: this.licenseCardAttach,
      };
      console.log(sendData);

      // console.log(sendData);

      this.gatePassService
        .postDrivingLicenseAttach(sendData)
        .subscribe((data) => {
          this.toastrService.success("Saved");
        });
    }
  }

  disableControls() {
    this.drivingLicenseDetails.controls["expairyDate"].disable();
    this.drivingLicenseDetails.controls["licenseAttach"].disable();
  }
  getVehicleDetails() {
    if (this.vehicleDetails.value.requestsId == 0) {
      this.vehicleDetails.get("plateNumber").value;
      this.gatePassService
        .getVehicleByPlateAndCode(
          this.vehicleDetails.get("plateNumber").value,
          this.vehicleDetails.get("zPlateCodeId").value
        )
        .subscribe((data: Vehicle2Get) => {
          if (data != null) {
            console.log(data);

            this.vehicleDetails.get("vehicleId").setValue(data.vehicleId);
            this.vehicleDetails.get("zMakerId").setValue(data.zMakerId);
            this.vehicleDetails.get("zModelId").setValue(data.zModelId);
            this.vehicleDetails.get("year").setValue(data.year);
            this.vehicleDetails.get("plateNumber").setValue(data.plateNumber);
            this.vehicleDetails.get("zPlateCodeId").setValue(data.zPlateCodeId);
            this.vehicleDetails.get("zColorsId").setValue(data.zColorsId);
            this.vehicleDetails
              .get("registrationURL")
              .setValue(data.registrationURL);

            this.vehicleDetails
              .get("registrationIssue")
              .setValue(
                this.ngbDateParserFormatter.parse(data.registrationIssue)
              );
            this.vehicleDetails
              .get("registrationExpairy")
              .setValue(
                this.ngbDateParserFormatter.parse(data.registrationExpairy)
              );

            this.vehicleDetails
              .get("rentalContract")
              .setValue(data.rentalContract);
            this.vehicleDetails
              .get("ownerIdCardURl")
              .setValue(data.ownerIdCardURl);
            this.vehicleDetails
              .get("noObjectionLetter")
              .setValue(data.noObjectionLetter);
            this.vehicleDetails.get("note").setValue(data.notes);
            this.vehicleDetails.get("owned").setValue(data.owned);
            this.vehicleDetails
              .get("zOwnershipTypeId")
              .setValue(data.zOwnershipTypeId);

            this.vehicleDetails
              .get("isExpire")
              .setValue(
                this.dateService.checkExpiryDate(
                  new Date(data.registrationExpairy)
                )
              );
            // console.log(
            //   "Is Exipre Car: ",
            //   this.vehicleDetails.get("isExpire").value
            // );

            if (this.vehicleDetails.get("isExpire").value == true) {
              this.vehicleDetails.controls["registrationIssue"].enable();
              this.vehicleDetails.controls["registrationExpairy"].enable();
              this.vehicleDetails.controls["registrationAttach"].enable();
              this.vehicleDetails.get("registrationIssue").setValue(null);
              this.vehicleDetails.get("registrationExpairy").setValue(null);
            } else {
              this.vehicleDetails.controls["registrationIssue"].disable();
              this.vehicleDetails.controls["registrationExpairy"].disable();
              this.vehicleDetails.controls["registrationAttach"].disable();
            }

            this.vehicleDetails.get("vehicleId").disable();
            this.vehicleDetails.get("zMakerId").disable();
            this.vehicleDetails.get("zModelId").disable();
            this.vehicleDetails.get("year").disable();
            this.vehicleDetails.get("plateNumber").disable();
            this.vehicleDetails.get("zPlateCodeId").disable();
            this.vehicleDetails.get("zColorsId").disable();
            this.vehicleDetails.get("registrationURL").disable();
            this.vehicleDetails.get("registrationURL").disable();
            // this.vehicleDetails.get("registrationIssue").disable();
            // this.vehicleDetails.get("registrationExpairy").disable();
            this.vehicleDetails.get("rentalContract").disable();
            this.vehicleDetails.get("ownerIdCardURl").disable();
            // this.vehicleDetails.get("noObjectionAttach").disable();
            this.vehicleDetails.get("note").disable();
            this.vehicleDetails.get("owned").disable();
            this.vehicleDetails.get("zOwnershipTypeId").disable();
          }
        });
    }
  }

  verifyDrivingLicense() {
    const sendData: DrivingLicenseVerify = {
      isverified: this.drivingLicenseDetails.get("securitySide.isverified")
        .value,
      notes: this.drivingLicenseDetails.get("securitySide.notes").value,
      usersId: +this.drivingLicenseDetails.get("usersId").value,
    };
    this.adminService
      .putDrivingLicenseVerify(sendData)
      .subscribe((data: any) => {
        this.toastrService.success("Saved");
        this.wizard.goToNextStep();
      });
  }

  getAttachmentFile() {
    this.gatePassService
      .getDrivingLicenseAttach(
        this.drivingLicenseDetails.get("licenseURL").value
      )
      .subscribe((data) => {
        this.viewAttachmentFile.emit(data);
      });
  }
}
