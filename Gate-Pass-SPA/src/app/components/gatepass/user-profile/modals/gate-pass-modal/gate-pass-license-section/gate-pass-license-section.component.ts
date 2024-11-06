import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, ControlContainer } from "@angular/forms";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { WizardComponent } from "angular-archwizard";
import { ToastrService } from "ngx-toastr";
import { DrivingLicenseVerify } from "src/app/shared/models/admin/verifyData";
import {
  DrivingLicensePost,
  DrivingLicenseAttach,
} from "src/app/shared/models/gatepass/drivingLicense";
import { ExternalUserDetails } from "src/app/shared/models/gatepass/externalUserDetails";
import { AdminService } from "src/app/shared/services/admin.service";
import { DateService } from "src/app/shared/services/date.service";
import { GatePassService } from "src/app/shared/services/gatepass.service";

@Component({
  selector: "gate-pass-license-section",
  templateUrl: "./gate-pass-license-section.component.html",
  styleUrls: ["./gate-pass-license-section.component.scss"],
})
export class GatePassLicenseSectionComponent implements OnInit {
  @Input() public licenseDetails: FormGroup;
  @Input() public isSecurity: boolean = false;
  @Input() public licenseAttach: File;

  @Output() fileToUpload: EventEmitter<{ file; controlName; isPDF }> =
    new EventEmitter<{ file; controlName; isPDF }>();
  @Output() viewAttachmentFile: EventEmitter<any> = new EventEmitter<any>();

  minDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  constructor(
    private controlContranier: ControlContainer,
    private gatePassService: GatePassService,
    private dateService: DateService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private toastrService: ToastrService,
    private wizard: WizardComponent,
    private adminService: AdminService
  ) {
    this.licenseDetails = <FormGroup>this.controlContranier.control;
  }

  ngOnInit(): void {
    if (this.licenseDetails.get("drivingLicenseId").value != null) {
      // console.log("Here");

      this.licenseDetails
        .get("isExpire")
        .setValue(
          this.dateService.checkExpiryDate(
            new Date(
              this.ngbDateParserFormatter.format(
                this.licenseDetails.get("expairyDate").value
              )
            )
          )
        );

      if (
        (this.licenseDetails.get("isExpire").value == true &&
          this.licenseDetails.get("licenseURL").value == null) ||
        (this.licenseDetails.get("isExpire").value == true &&
          this.licenseDetails.get("licenseURL").value != null) ||
        (this.licenseDetails.get("isExpire").value == false &&
          this.licenseDetails.get("licenseURL").value == null)
      ) {
        this.licenseDetails.enable();
        this.licenseDetails.get("isExpire").setValue(true);
      } else {
        this.licenseDetails.get("expairyDate").disable();
      }
    }
  }

  checkFileSize(file, controlName, isPDF) {
    this.fileToUpload.emit({
      file: file,
      controlName: controlName,
      isPDF: isPDF,
    });
  }

  getAttachmentFile() {
    this.gatePassService
      .getDrivingLicenseAttach(this.licenseDetails.get("licenseURL").value)
      .subscribe((data) => {
        this.viewAttachmentFile.emit(data);
      });
  }

  postDrivingLicense() {
    // console.log("post Driving");

    if (this.licenseDetails.value.isExpire == true) {
      const sendData: DrivingLicensePost = {
        usersId: this.licenseDetails.get("usersId").value,
        expairyDate: this.ngbDateParserFormatter.format(
          this.licenseDetails.get("expairyDate").value
        ),
      };
     //  console.log(sendData);
      this.gatePassService
        .postDrivingLicense(sendData)
        .subscribe((data: any) => {
          this.toastrService.success("Saved");
          // console.log(data);
          this.postAttach();
        });
    } else {
      this.wizard.goToNextStep();
    }
  }
  postAttach() {
    if (this.licenseAttach != null) {
      const sendData: DrivingLicenseAttach = {
        usersId: this.licenseDetails.get("usersId").value,
        licenseURL: this.licenseAttach,
      };
      // console.log(sendData);

      this.gatePassService
        .postDrivingLicenseAttach(sendData)
        .subscribe((data) => {
          this.toastrService.success("Saved");
          this.licenseDetails.get("expairyDate").disable();
          this.licenseDetails.get("isExpire").setValue(false);

          this.wizard.goToNextStep();
        });
    }
  }

  verifyDrivingLicense() {
    const sendData: DrivingLicenseVerify = {
      isverified: this.licenseDetails.get("securitySide.isverified").value,
      notes: this.licenseDetails.get("securitySide.notes").value,
      usersId: +this.licenseDetails.get("usersId").value,
    };
    this.adminService
      .putDrivingLicenseVerify(sendData)
      .subscribe((data: any) => {
        this.toastrService.success("Saved");
        this.wizard.goToNextStep();
      });
  }
}
