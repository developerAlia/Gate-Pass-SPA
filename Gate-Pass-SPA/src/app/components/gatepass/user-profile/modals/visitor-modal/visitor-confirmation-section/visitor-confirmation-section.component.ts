import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ControlContainer, FormGroup } from "@angular/forms";
import {
  NgbActiveModal,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { RequestVerify } from "src/app/shared/models/admin/verifyData";
import {
  GatePassRequest,
  ResponsePostRequest,
} from "src/app/shared/models/gatepass/gate-pass-request";
import { zRelationship } from "src/app/shared/models/zsk/zRelationship";
import { AdminService } from "src/app/shared/services/admin.service";
import { GatePassService } from "src/app/shared/services/gatepass.service";
import { ZskService } from "src/app/shared/services/zsk.service";

@Component({
  selector: "app-visitor-confirmation-section",
  templateUrl: "./visitor-confirmation-section.component.html",
  styleUrls: ["./visitor-confirmation-section.component.scss"],
})
export class VisitorConfirmationSectionComponent implements OnInit {
  @Input() public permitDates: FormGroup;
  @Input() public visitorDetails: FormGroup;
  @Input() public inputForm: FormGroup;
  @Input() public drivingLicenseDetails: FormGroup;
  @Input() public vehicleDetails: FormGroup;
  @Input() public isSecurity: boolean = false;

  @Output() securityUpdate = new EventEmitter();
  @Output() onSubmitEmitter = new EventEmitter();
  // @Input() public inputForm: FormGroup;

  zRelationship: zRelationship[];

  selectedRelationship: zRelationship;

  constructor(
    private controlContranier: ControlContainer,
    public ngbDateParserFormatter: NgbDateParserFormatter,
    private gatePassService: GatePassService,
    private zskService: ZskService,
    private adminService: AdminService,
    private toastrService: ToastrService,
    private modal: NgbActiveModal,
    public translate: TranslateService
  ) {
    this.permitDates = <FormGroup>this.controlContranier.control;
    this.visitorDetails = <FormGroup>this.controlContranier.control;
    this.inputForm = <FormGroup>this.controlContranier.control;
    this.drivingLicenseDetails = <FormGroup>this.controlContranier.control;
    this.vehicleDetails = <FormGroup>this.controlContranier.control;

    // this.inputForm.get('visitorDetails.zNationalityID');
  }

  ngOnInit(): void {}

  test() {
    // console.log(this.permitDates.value);
    // console.log(this.visitorDetails.value);
    // console.log(this.inputForm.value);
  }

  onSubmit() {
    const sendData: GatePassRequest = {
      requestsId: +this.inputForm.get("requestsId").value,
      usersId: +this.inputForm.get("usersId").value,
      vehicleId:
        this.inputForm.get("vehicleDetails.vehicleId").value == 0
          ? null
          : +this.inputForm.get("vehicleDetails.vehicleId").value,
      visitDetailsId: +this.inputForm.get("visitDetailsId").value,
      notes: "",
      visitDetails: {
        dateFrom: this.ngbDateParserFormatter.format(
          this.permitDates.get("permitDateFrom").value
        ),
        dateTo: this.ngbDateParserFormatter.format(
          this.permitDates.get("permitDateTo").value
        ),
        status: true,
        visitDetailsId: +this.inputForm.get("visitDetailsId").value,
        visitorId: +this.visitorDetails.get("usersId").value,
        zRelationshipsId:
          this.visitorDetails.get("zRelationshipId").value == 0
            ? null
            : this.visitorDetails.get("zRelationshipId").value,
        zVisitTypeId: +this.permitDates.get("zVisitTypeId").value,
      },
    };
    console.log(sendData);
    console.log(this.inputForm);
    console.log(this.inputForm.value);

    this.gatePassService
      .postRequest(sendData)
      .subscribe((data: ResponsePostRequest) => {
        this.toastrService.success("Saved");

        // console.log(data);
        this.onSubmitEmitter.emit(data);
      });
  }

  verfiyRequest() {
    const sendData: RequestVerify = {
      notes: this.inputForm.get("securitySide.notes").value,
      requestsId: this.inputForm.get("requestsId").value,
    };
    console.log(this.inputForm.value);

    console.log(sendData);
    console.log(sendData);

    this.adminService.putRequestVerify(sendData).subscribe((data: any) => {
      this.toastrService.success("Saved");
      this.securityUpdate.emit();
      // this.wizard.goToNextStep();
    });
  }
  closeModal() {
    this.modal.close();
  }
}
