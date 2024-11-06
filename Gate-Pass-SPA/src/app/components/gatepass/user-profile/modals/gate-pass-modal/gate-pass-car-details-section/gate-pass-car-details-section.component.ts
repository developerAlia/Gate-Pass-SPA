import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, ControlContainer, Validators } from "@angular/forms";
import {
  NgbDateStruct,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { WizardComponent } from "angular-archwizard";
import { ToastrService } from "ngx-toastr";
import { VehicleVerify } from "src/app/shared/models/admin/verifyData";
import {
  Vehicle2Post,
  VehicleAttach,
} from "src/app/shared/models/gatepass/vehicle";
import { zOwnershipTypes } from "src/app/shared/models/zsk/zOwnershipTypes";
import { AdminService } from "src/app/shared/services/admin.service";
import { DateService } from "src/app/shared/services/date.service";
import { GatePassService } from "src/app/shared/services/gatepass.service";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "gate-pass-car-details-section",
  templateUrl: "./gate-pass-car-details-section.component.html",
  styleUrls: ["./gate-pass-car-details-section.component.scss"],
})
export class GatePassCarDetailsSectionComponent implements OnInit {
  @Input() public vehicleDetails: FormGroup;
  @Input() public registrationAttach: File;
  @Input() public ownershipCardAttach: File;
  @Input() public noObjectionAttach: File;
  @Input() public rentalContractAttach: File;
  @Input() public usersId: number;
  @Input() public isSecurity: boolean = false;
  // zOwnershipTypes: zOwnershipTypes[] = [];

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
    private controlContranier: ControlContainer,
    private zskService: ZskService
  ) {
    this.vehicleDetails = <FormGroup>this.controlContranier.control;
  }

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
      if (data == false) {
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

        if (data != null) {
          // console.log(data);

          // console.log("test");

          this.zskService
            .getzOwnershipTypesById(data)
            .subscribe((data: zOwnershipTypes) => {
              this.vehicleDetails.get("colorClass").setValue(data.colorClass);
              this.vehicleDetails.get("colorText").setValue(data.textColor);
              this.vehicleDetails
                .get("zOwnershipTypeNameEn")
                .setValue(data.nameEn);
              this.vehicleDetails
                .get("zOwnershipTypeNameAr")
                .setValue(data.nameAr);
            });
        }
      });
  }

  // getzOwnershipTypes() {
  //   this.zskService
  //     .getzOwnershipTypes()
  //     .subscribe((data: zOwnershipTypes[]) => {
  //       this.zOwnershipTypes = data;
  //     });
  // }

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
      usersId: +this.vehicleDetails.get("usersId").value,
      zModelId: +this.vehicleDetails.get("zModelId").value,
      owned: this.vehicleDetails.get("owned").value,
      zOwnershipTypeId: this.vehicleDetails.get("zOwnershipTypeId").value,
      plateNumber: this.vehicleDetails.get("plateDetails.plateNumber").value,
      zPlateCodeId: this.vehicleDetails.get("plateDetails.zPlateCodeId").value,
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
        this.vehicleDetails.get("vehicleId").setValue(data),
          this.postAttach(),
          this.setDisableControls(),
          this.wizard.goToNextStep();
      } else {
        this.toastrService.success("Updated");
        this.postAttach(),
          this.setDisableControls(),
          this.wizard.goToNextStep();
      }
    });
  }

  postAttach() {
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
        .postVehicleAttachment(sendData, this.vehicleDetails.value.vehicleId)
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
    this.vehicleDetails.get("plateDetails.plateNumber").disable();
    this.vehicleDetails.get("plateDetails.zPlateCodeId").disable();
    this.vehicleDetails.get("zColorsId").disable();
    this.vehicleDetails.get("registrationURL").disable();
    this.vehicleDetails.get("registrationURL").disable();
    this.vehicleDetails.get("registrationIssue").disable();
    this.vehicleDetails.get("registrationExpairy").disable();
    this.vehicleDetails.get("rentalContract").disable();
    this.vehicleDetails.get("ownerIdCardURl").disable();
    this.vehicleDetails.get("noObjectionAttach").disable();
    // this.vehicleDetails.get("notes").disable();
    this.vehicleDetails.get("owned").disable();
    this.vehicleDetails.get("zOwnershipTypeId").disable();
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
    // console.log(this.vehicleDetails);
  }
}
