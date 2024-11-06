import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, ControlContainer, Validators } from "@angular/forms";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { WizardComponent } from "angular-archwizard";
import { ToastrService } from "ngx-toastr";
import { UserDataVerify } from "src/app/shared/models/admin/verifyData";
import { DrivingLicense } from "src/app/shared/models/gatepass/drivingLicense";
import {
  ExternalUserAttach,
  ExternalUserDetails,
} from "src/app/shared/models/gatepass/externalUserDetails";
import { zGender } from "src/app/shared/models/zsk/zGender";
import { zNationality } from "src/app/shared/models/zsk/zNationality";
import { zRelationship } from "src/app/shared/models/zsk/zRelationship";
import { AdminService } from "src/app/shared/services/admin.service";
import { DateService } from "src/app/shared/services/date.service";
import { GatePassService } from "src/app/shared/services/gatepass.service";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "visitor-details-section",
  templateUrl: "./visitor-details-section.component.html",
  styleUrls: ["./visitor-details-section.component.scss"],
})
export class VisitorDetailsSectionComponent implements OnInit {
  @Input() public visitorDetails: FormGroup;
  @Input() public drivingLicenseDetails: FormGroup;
  @Input() public idCardAttach: File;
  @Input() public imgAttach: File;
  @Input() public tempURLImg: any;
  @Input() public isSecurity: boolean = false;

  @Output() idCardFile: EventEmitter<{ file; controlName; isPDF }> =
    new EventEmitter<{ file; controlName; isPDF }>();

  @Output() viewAttachmentFile: EventEmitter<any> = new EventEmitter<any>();
  minDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate() + 1,
  };

  zNationality: zNationality;

  constructor(
    private controlContranier: ControlContainer,
    private gatePassService: GatePassService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private zskService: ZskService,
    private toastrService: ToastrService,
    private dateService: DateService,
    private adminService: AdminService,
    private wizard: WizardComponent
  ) {
    this.visitorDetails = <FormGroup>this.controlContranier.control;
    this.drivingLicenseDetails = <FormGroup>this.controlContranier.control;
  }
  ngOnInit(): void {
    this.visitorDetails
      .get("securitySide.isverified")
      .valueChanges.subscribe((data) => {
        if (data == true) {
          this.visitorDetails.get("securitySide.notes").setValue(null);
          this.visitorDetails.get("securitySide.notes").setValidators(null);
        } else {
          this.visitorDetails
            .get("securitySide.notes")
            .setValidators([Validators.required]);
        }
        this.visitorDetails.get("securitySide.notes").updateValueAndValidity();
        // this.visitorDetails.get('securitySide').valid
      });

    this.visitorDetails
      .get("zGenderId")
      .valueChanges.subscribe((zGenderId: number) => {
        this.zskService.getZGenderById(zGenderId).subscribe((data: zGender) => {
          this.visitorDetails.get("zGenderNameEn").setValue(data.nameEn);
          this.visitorDetails.get("zGenderNameAr").setValue(data.nameAr);
        });
      });
    this.visitorDetails
      .get("zNationalityID")
      .valueChanges.subscribe((zNationalityID: number) => {
        this.zskService
          .getZNationalityById(zNationalityID)
          .subscribe((data: zNationality) => {
            this.visitorDetails.get("zNationalityNameEn").setValue(data.nameEn);
            this.visitorDetails.get("zNationalityNameAr").setValue(data.nameAr);
          });
      });
    this.visitorDetails
      .get("zRelationshipId")
      .valueChanges.subscribe((zRelationshipId: number) => {
        if (zRelationshipId) {
          this.zskService
            .getZRelationshipById(zRelationshipId)
            .subscribe((data: zRelationship) => {
              this.visitorDetails
                .get("zRelationshipsNameEn")
                .setValue(data.nameEn);
              this.visitorDetails
                .get("zRelationshipsNameAr")
                .setValue(data.nameAr);
            });
        }
      });
  }

  checkFileSize(file, controlName, isPDF) {
    this.idCardFile.emit({
      file: file,
      controlName: controlName,
      isPDF: isPDF,
    });
  }

  getAttachmentFile() {
    this.gatePassService
      .getCivilIdAttach(this.visitorDetails.get("civilIdURL").value)
      .subscribe((data) => {
        this.viewAttachmentFile.emit(data);
      });
  }

  postExternalUser() {
    let skipSnipper: boolean = false;
    if (this.idCardAttach != null || this.imgAttach != null) {
      skipSnipper = true;
    }
    if (this.visitorDetails.value.usersId == 0) {
      const sendData: ExternalUserDetails = {
        externalUsersId: +this.visitorDetails.get("externalUsersId").value,
        usersId: this.visitorDetails.get("usersId").value,
        name: this.visitorDetails.get("name").value,
        zGenderId: +this.visitorDetails.get("zGenderId").value,
        zNationalityID: +this.visitorDetails.get("zNationalityID").value,
        phone: +this.visitorDetails.get("phone").value,
        civilNumber: +this.visitorDetails.get("civilNumber").value,
        zExternalUserTypeId: 1,
        // zExternalUserTypeId: +this.visitorDetails.get("zExternalUserTypeId")
        //   .value,
        civilIdExpairyDate: this.ngbDateParserFormatter.format(
          this.visitorDetails.get("civilIdExpairyDate").value
        ),
      };

      this.gatePassService
        .postExternalUser(sendData, skipSnipper)
        .subscribe((data) => {
          this.visitorDetails.get("usersId").setValue(data);
          // console.log(data);
          this.disableControls(), this.postAttach(), this.getDrivingLicense();
        });
    } else {
      if (this.visitorDetails.value.isExpire == true) {
        const sendData: ExternalUserDetails = {
          civilNumber: +this.visitorDetails.get("civilNumber").value,
          civilIdExpairyDate: this.ngbDateParserFormatter.format(
            this.visitorDetails.get("civilIdExpairyDate").value
          ),
        };
        // console.log(sendData);

        this.gatePassService
          .postExternalUser(sendData, skipSnipper)
          .subscribe((data) => {
            this.disableControls(), this.postAttach(), this.getDrivingLicense();
          });
      } else if (this.visitorDetails.value.numberOfDays > 14) {
        this.postAttach(), this.disableControls(), this.getDrivingLicense();
      } else {
        this.disableControls(), this.getDrivingLicense();
      }
    }
  }

  disableControls() {
    this.visitorDetails.controls["civilIdExpairyDate"].disable();
    this.visitorDetails.controls["attachIdCard"].disable();
    this.visitorDetails.controls["name"].disable();
    this.visitorDetails.controls["zGenderId"].disable();
    this.visitorDetails.controls["civilNumber"].disable();
    this.visitorDetails.controls["phone"].disable();
    this.visitorDetails.controls["zNationalityID"].disable();
    this.visitorDetails.controls["zRelationshipId"].disable();
  }

  postAttach() {
    let sendData: ExternalUserAttach = {
      imgUrl: null,
      civilIdUrl: null,
      civilNumber: this.visitorDetails.get("civilNumber").value,
    };
    if (this.imgAttach != null) {
      sendData.imgUrl = this.imgAttach;
    }
    if (this.idCardAttach != null) {
      sendData.civilIdUrl = this.idCardAttach;
    }
    if (this.imgAttach != null || this.idCardAttach != null) {
      // let sendData: ExternalUserAttach = {
      //   imgUrl: this.imgAttach,
      //   civilIdUrl: this.idCardAttach,
      //   civilNumber: +this.visitorDetails.get("civilNumber").value,
      // };
      // sendData.civilNumber = 321312;
      // console.log(sendData);

      this.gatePassService
        .postExternalUserAttach(sendData)
        .subscribe((data) => {
          this.toastrService.success("Saved");
        });
    }
  }

  getDrivingLicense() {
    //Temp Action
    // this.visitorDetails.get("usersId").setValue(4);

    if (this.visitorDetails.value.numberOfDays > 14) {
      this.gatePassService
        .getDrivingLicense(this.visitorDetails.get("usersId").value)
        .subscribe((data: DrivingLicense) => {
          if (data != null) {
            this.drivingLicenseDetails
              .get("drivingLicenseId")
              .setValue(data.drivingLicenseId);
            this.drivingLicenseDetails.get("usersId").setValue(data.usersId);
            this.drivingLicenseDetails
              .get("licenseURL")
              .setValue(data.licenseURL);
            this.drivingLicenseDetails
              .get("expairyDate")
              .setValue(this.ngbDateParserFormatter.parse(data.expairyDate));

            this.drivingLicenseDetails
              .get("isverified")
              .setValue(data.isverified);
            this.drivingLicenseDetails.get("notes").setValue(data.notes);

            this.drivingLicenseDetails
              .get("isExpire")
              .setValue(
                this.dateService.checkExpiryDate(new Date(data.expairyDate))
              );

            console.log(this.drivingLicenseDetails.value);

            if (this.drivingLicenseDetails.get("isExpire").value == true) {
              this.drivingLicenseDetails.controls["expairyDate"].enable();
              this.drivingLicenseDetails.controls["licenseAttach"].enable();
              this.drivingLicenseDetails.get("expairyDate").setValue(null);
            } else {
              if (this.drivingLicenseDetails.get("licenseURL").value != null) {
                this.drivingLicenseDetails.controls["expairyDate"].disable();
                this.drivingLicenseDetails.controls["licenseAttach"].disable();
              } else {
                this.drivingLicenseDetails.controls["expairyDate"].enable();
                this.drivingLicenseDetails.controls["licenseAttach"].enable();
                this.drivingLicenseDetails.get("expairyDate").setValue(null);
              }
            }
          }
        });
    }
  }

  verifyUserData() {
    const sendData: UserDataVerify = {
      isverified: this.visitorDetails.get("securitySide.isverified").value,
      notes: this.visitorDetails.get("securitySide.notes").value,
      civilNumber: +this.visitorDetails.get("civilNumber").value,
    };
    this.adminService.putUserDataVerify(sendData).subscribe((data: any) => {
      this.toastrService.success("Saved");
      this.wizard.goToNextStep();
    });
  }
}
