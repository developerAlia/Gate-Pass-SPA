import { Component, Input, OnInit } from "@angular/core";
import { ControlContainer, FormGroup } from "@angular/forms";
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { ExternalUserDetails } from "src/app/shared/models/gatepass/externalUserDetails";
import { DateService } from "src/app/shared/services/date.service";
import { GatePassService } from "src/app/shared/services/gatepass.service";

@Component({
  selector: "visitor-id-section",
  templateUrl: "./visitor-id-section.component.html",
  styleUrls: ["./visitor-id-section.component.scss"],
})
export class VisitorIdSectionComponent implements OnInit {
  @Input() public visitorDetails: FormGroup;
  @Input() public isSecurity: boolean = false;

  constructor(
    private controlContranier: ControlContainer,
    private gatePassService: GatePassService,
    private dateService: DateService,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {
    this.visitorDetails = <FormGroup>this.controlContranier.control;
  }

  ngOnInit(): void {}

  getVisitorDetails() {
    if (this.visitorDetails.value.requestsId == 0) {
      this.gatePassService
        .getExternalUserDetails(this.visitorDetails.get("civilNumber").value)
        .subscribe((data: ExternalUserDetails) => {
          // console.log(data);
          if (data) {
            console.log(data);

            this.visitorDetails
              .get("externalUsersId")
              .setValue(data.externalUsersId);
            this.visitorDetails.get("usersId").setValue(data.usersId);
            // console.log(this.visitorDetails.get("usersId").value);

            this.visitorDetails.get("name").setValue(data.name);
            this.visitorDetails.get("zGenderId").setValue(data.zGenderId);
            this.visitorDetails.get("civilNumber").setValue(data.civilNumber);
            this.visitorDetails.get("phone").setValue(data.phone);
            this.visitorDetails
              .get("zNationalityID")
              .setValue(data.zNationalityID);

            this.visitorDetails
              .get("civilIdExpairyDate")
              .setValue(
                this.ngbDateParserFormatter.parse(data.civilIdExpairyDate)
              );

            this.visitorDetails.get("civilIdURL").setValue(data.civilIdURL);
            this.visitorDetails.get("imgURL").setValue(data.imgURL);
            this.visitorDetails
              .get("isExpire")
              .setValue(
                this.dateService.checkExpiryDate(
                  new Date(data.civilIdExpairyDate)
                )
              );

            if (this.visitorDetails.get("isExpire").value == true) {
              this.visitorDetails.controls["civilIdExpairyDate"].enable();
              this.visitorDetails.controls["attachIdCard"].enable();
              this.visitorDetails.get("civilIdExpairyDate").setValue(null);
            } else {
              if (data.civilIdURL == null) {
                this.visitorDetails.controls["attachIdCard"].enable();
                this.visitorDetails.controls["civilIdExpairyDate"].enable();
              } else {
                this.visitorDetails.controls["attachIdCard"].disable();
                this.visitorDetails.controls["civilIdExpairyDate"].disable();
              }
              if (data.imgURL == null) {
                this.visitorDetails.controls["photoAttach"].enable();
              } else {
                this.visitorDetails.controls["photoAttach"].disable();
              }
            }

            this.visitorDetails.controls["name"].disable();
            this.visitorDetails.controls["zGenderId"].disable();
            this.visitorDetails.controls["civilNumber"].disable();
            this.visitorDetails.controls["phone"].disable();
            this.visitorDetails.controls["zNationalityID"].disable();

            console.log(this.visitorDetails.value);
          }
        });
    }
  }
}
