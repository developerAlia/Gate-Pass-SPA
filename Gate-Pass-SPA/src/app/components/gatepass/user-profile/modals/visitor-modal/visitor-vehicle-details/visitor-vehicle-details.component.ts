import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { WizardComponent } from "angular-archwizard";
import { ToastrService } from "ngx-toastr";
import { VehicleVerify } from "src/app/shared/models/admin/verifyData";
import {
  Vehicle2Post,
  VehicleAttach,
  VehicleMaker,
  VehicleModel,
} from "src/app/shared/models/gatepass/vehicle";
import { zColors } from "src/app/shared/models/zsk/zColors";
import { zOwnershipTypes } from "src/app/shared/models/zsk/zOwnershipTypes";
import { AdminService } from "src/app/shared/services/admin.service";
import { DateService } from "src/app/shared/services/date.service";
import { GatePassService } from "src/app/shared/services/gatepass.service";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "visitor-vehicle-details",
  templateUrl: "./visitor-vehicle-details.component.html",
  styleUrls: ["./visitor-vehicle-details.component.scss"],
})
export class VisitorVehicleDetailsComponent implements OnInit {
  @Input() public vehicleDetails: FormGroup;
  @Input() public registrationAttach: File;
  @Input() public ownershipCardAttach: File;
  @Input() public noObjectionAttach: File;
  @Input() public rentalContractAttach: File;
  @Input() public usersId: number;
  @Input() public isSecurity: boolean = false;
  @Input() public numOfDays: number;

  minDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  maxDate: NgbDateStruct;

  @Output() fileToUpload: EventEmitter<{ file; controlName; isPDF }> =
    new EventEmitter<{ file; controlName; isPDF }>();

  @Output() viewAttachmentFile: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dateService: DateService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private wizard: WizardComponent,
    private gatePassService: GatePassService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private zskService: ZskService
  ) {}

  ngOnInit(): void {
    this.vehicleDetails
      .get("registrationIssue")
      ?.valueChanges.subscribe((data: NgbDateStruct) => {
        if (data) {
          const dateToMax = this.dateService
            .addDays(0, new Date(this.ngbDateParserFormatter.format(data)))
            .toISOString()
            .split("T")[0];
          this.maxDate = null;
          this.maxDate = this.ngbDateParserFormatter.parse(dateToMax);
          // this.vehicleDetails.get("registrationExpairy").setValue(null);
        }
      });

    this.vehicleDetails.get("owned").valueChanges.subscribe((data: boolean) => {
      if (data == false && this.numOfDays > 14) {
        this.vehicleDetails
          .get("ownershipCardAttach")
          .setValidators([Validators.required]);
        this.vehicleDetails
          .get("noObjectionAttach")
          .setValidators([Validators.required]);
      } else {
        this.vehicleDetails.get("ownershipCardAttach").setValidators(null);
        this.vehicleDetails.get("noObjectionAttach").setValidators(null);
      }
      this.vehicleDetails.get("ownershipCardAttach").updateValueAndValidity();
      this.vehicleDetails.get("noObjectionAttach").updateValueAndValidity();
    });

    this.vehicleDetails
      .get("zOwnershipTypeId")
      .valueChanges.subscribe((data: number) => {
        if (data == 2) {
          this.vehicleDetails
            .get("rentalContractAttach")
            .setValidators([Validators.required]);
        } else {
          this.vehicleDetails.get("rentalContractAttach").setValidators(null);
        }
        this.vehicleDetails
          .get("rentalContractAttach")
          .updateValueAndValidity();
      });

    this.vehicleDetails
      .get("zMakerId")
      .valueChanges.subscribe((zMakerId: number) => {
        this.zskService
          .getZVehicleMakerById(zMakerId)
          .subscribe((data: VehicleMaker) => {
            this.vehicleDetails.get("zMakerNameEn").setValue(data.nameEn);
            this.vehicleDetails.get("zMakerNameAr").setValue(data.nameAr);
          });
      });

    this.vehicleDetails
      .get("zModelId")
      .valueChanges.subscribe((zModelId: number) => {
        this.zskService
          .getZVehicleModelById(zModelId)
          .subscribe((data: VehicleModel) => {
            this.vehicleDetails.get("zModelNameEn").setValue(data.nameEn);
            this.vehicleDetails.get("zModelNameAr").setValue(data.nameAr);
          });
      });

    this.vehicleDetails
      .get("zColorsId")
      .valueChanges.subscribe((zColorsId: number) => {
        if (zColorsId) {
          this.zskService
            .getZColorsById(zColorsId)
            .subscribe((data: zColors) => {
              this.vehicleDetails.get("zColorsNameEn").setValue(data.nameEn);
              this.vehicleDetails.get("zColorsNameAr").setValue(data.nameAr);
            });
        }
      });

    this.vehicleDetails
      .get("zOwnershipTypeId")
      .valueChanges.subscribe((zOwnershipTypeId: number) => {
        if (zOwnershipTypeId) {
          this.zskService
            .getzOwnershipTypesById(zOwnershipTypeId)
            .subscribe((data: zOwnershipTypes) => {
              this.vehicleDetails
                .get("zOwnershipTypeNameEn")
                .setValue(data.nameEn);
              this.vehicleDetails
                .get("zOwnershipTypeNameAr")
                .setValue(data.nameAr);
              this.vehicleDetails.get("colorClass").setValue(data.colorClass);
              this.vehicleDetails.get("colorText").setValue(data.textColor);
            });
        }
      });

    this.vehicleDetails
      .get("securitySide.isverified")
      .valueChanges.subscribe((data) => {
        if (data == true) {
          this.vehicleDetails.get("securitySide.notes").setValue(null);
          this.vehicleDetails.get("securitySide.notes").setValidators(null);
        } else {
          this.vehicleDetails
            .get("securitySide.notes")
            .setValidators([Validators.required]);
        }
        this.vehicleDetails.get("securitySide.notes").updateValueAndValidity();
      });
  }

  checkFileSize(file, controlName, isPDF) {
    this.fileToUpload.emit({
      file: file,
      controlName: controlName,
      isPDF: isPDF,
    });
  }

  postVehicle() {
    const sendData: Vehicle2Post = {
      vehicleId: +this.vehicleDetails.get("vehicleId").value,
      usersId: +this.usersId,
      zModelId: +this.vehicleDetails.get("zModelId").value,
      notes: this.vehicleDetails.get("note").value,
      owned: this.vehicleDetails.get("owned").value,
      zOwnershipTypeId: this.vehicleDetails.get("zOwnershipTypeId").value,
      plateNumber: this.vehicleDetails.get("plateNumber").value,
      zPlateCodeId: this.vehicleDetails.get("zPlateCodeId").value,
      year: new Date(this.vehicleDetails.get("year").value).getFullYear(),
      zColorsId: this.vehicleDetails.get("zColorsId").value,
      registrationIssue: this.ngbDateParserFormatter.format(
        this.vehicleDetails.get("registrationIssue").value
      ),
      registrationExpairy: this.ngbDateParserFormatter.format(
        this.vehicleDetails.get("registrationExpairy").value
      ),
    };
    // console.log(sendData);

    this.gatePassService.postVehicle(sendData).subscribe((data: any) => {
      if (Number.isInteger(data)) {
        this.vehicleDetails.get("vehicleId").setValue(data);
      }
      this.postAttach(this.vehicleDetails.get("vehicleId").value),
        this.setDisableControls(),
        this.wizard.goToNextStep();
    });
  }

  postAttach(vehicleId: number) {
    if (
      this.noObjectionAttach != null ||
      this.registrationAttach != null ||
      this.ownershipCardAttach != null ||
      this.rentalContractAttach != null
    ) {
      const sendData: VehicleAttach = {
        ownerIdCardURL: this.ownershipCardAttach,
        registrationURL: this.registrationAttach,
        rentalContractURL: this.rentalContractAttach,
        noObjectionLetterURL: this.noObjectionAttach,
      };
      this.gatePassService
        .postVehicleAttachment(sendData, vehicleId)
        .subscribe((data) => {
          this.toastrService.success("Saved");
        });
    }
  }

  setDisableControls() {
    this.vehicleDetails.controls["registrationIssue"].disable();
    this.vehicleDetails.controls["registrationExpairy"].disable();
    this.vehicleDetails.controls["registrationAttach"].disable();
    this.vehicleDetails.get("vehicleId").disable();
    this.vehicleDetails.get("zMakerId").disable();
    this.vehicleDetails.get("zModelId").disable();
    this.vehicleDetails.get("year").disable();
    this.vehicleDetails.get("plateNumber").disable();
    this.vehicleDetails.get("zPlateCodeId").disable();
    this.vehicleDetails.get("zColorsId").disable();
    this.vehicleDetails.get("registrationURL").disable();
    this.vehicleDetails.get("registrationURL").disable();
    this.vehicleDetails.get("registrationIssue").disable();
    this.vehicleDetails.get("registrationExpairy").disable();
    this.vehicleDetails.get("rentalContract").disable();
    this.vehicleDetails.get("ownerIdCardURl").disable();
    this.vehicleDetails.get("noObjectionAttach").disable();
    this.vehicleDetails.get("note").disable();
    this.vehicleDetails.get("owned").disable();
    this.vehicleDetails.get("zOwnershipTypeId").disable();
    this.vehicleDetails.get("isEdit").enable();
  }

  getAttachmentFile(controlName: string) {
    this.gatePassService
      .getDrivingLicenseAttach(this.vehicleDetails.get(controlName).value)
      .subscribe((data) => {
        this.viewAttachmentFile.emit(data);
      });
  }

  verifyVehicle() {
    const sendData: VehicleVerify = {
      isverified: this.vehicleDetails.get("securitySide.isverified").value,
      notes: this.vehicleDetails.get("securitySide.notes").value,
      vehicleId: this.vehicleDetails.get("vehicleId").value,
    };
    this.adminService.putVehicleVerify(sendData).subscribe((data: any) => {
      this.toastrService.success("Saved");
      this.wizard.goToNextStep();
    });
  }

  test() {
    console.log(this.vehicleDetails);
  }
}
