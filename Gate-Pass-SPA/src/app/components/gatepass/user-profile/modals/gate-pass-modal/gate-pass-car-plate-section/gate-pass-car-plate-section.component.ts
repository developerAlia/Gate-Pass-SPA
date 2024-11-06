import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, ControlContainer } from "@angular/forms";
import {
  NgbDateStruct,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { Vehicle2Get } from "src/app/shared/models/gatepass/vehicle";
import { zPlateCode } from "src/app/shared/models/zsk/zPlateCode";
import { DateService } from "src/app/shared/services/date.service";
import { GatePassService } from "src/app/shared/services/gatepass.service";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "gate-pass-car-plate-section",
  templateUrl: "./gate-pass-car-plate-section.component.html",
  styleUrls: ["./gate-pass-car-plate-section.component.scss"],
})
export class GatePassCarPlateSectionComponent implements OnInit {
  @Input() public vehicleDetails: FormGroup;
  @Input() public isSecurity: boolean = false;

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
    private zskService: ZskService
  ) {
    this.vehicleDetails = <FormGroup>this.controlContranier.control;
  }

  ngOnInit(): void {
    this.vehicleDetails
      .get("plateDetails.zPlateCodeId")
      .valueChanges?.subscribe((id: number) => {
        if (id != null) {
          this.zskService
            .getZPlateCodeById(id)
            .subscribe((data: zPlateCode) => {
              this.vehicleDetails.get("zPlateCodeNameEn").setValue(data.nameEn);
              this.vehicleDetails.get("zPlateCodeNameAr").setValue(data.nameAr);
            });
        }
      });
  }

  getVehicleDetails() {
    if (this.vehicleDetails.value.requestsId == 0) {
      this.gatePassService
        .getVehicleByPlateAndCode(
          this.vehicleDetails.get("plateDetails.plateNumber").value,
          this.vehicleDetails.get("plateDetails.zPlateCodeId").value
        )
        .subscribe((data: Vehicle2Get) => {
          // console.log(data);

          if (data != null) {
            // console.log("Here2");

            this.vehicleDetails.get("vehicleId").setValue(data.vehicleId);
            this.vehicleDetails.get("zMakerId").setValue(data.zMakerId);
            this.vehicleDetails.get("zModelId").setValue(data.zModelId);
            this.vehicleDetails.get("year").setValue(data.year);
            // this.vehicleDetails.get("plateNumber").setValue(data.plateNumber);
            // this.vehicleDetails.get("zPlateCodeId").setValue(data.zPlateCodeId);
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
            // this.vehicleDetails.get("notes").setValue(data.notes);
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
            // this.vehicleDetails.get("plateNumber").disable();
            // this.vehicleDetails.get("zPlateCodeId").disable();
            this.vehicleDetails.get("zColorsId").disable();
            // this.vehicleDetails.get("registrationURL").disable();
            // this.vehicleDetails.get("registrationIssue").disable();
            // this.vehicleDetails.get("registrationExpairy").disable();
            this.vehicleDetails.get("rentalContract").disable();
            this.vehicleDetails.get("ownerIdCardURl").disable();
            // this.vehicleDetails.get("noObjectionAttach").disable();
            this.vehicleDetails.get("owned").disable();
            this.vehicleDetails.get("zOwnershipTypeId").disable();
          }
        });
    }
  }
}
