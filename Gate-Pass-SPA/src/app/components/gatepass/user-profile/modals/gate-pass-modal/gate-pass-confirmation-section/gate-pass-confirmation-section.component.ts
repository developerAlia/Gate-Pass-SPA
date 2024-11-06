import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, ControlContainer } from "@angular/forms";
import {
  NgbActiveModal,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { ZRequestsTypeEnum } from "src/app/shared/enums/z-requests-type";
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
  selector: "gate-pass-confirmation-section",
  templateUrl: "./gate-pass-confirmation-section.component.html",
  styleUrls: ["./gate-pass-confirmation-section.component.scss"],
})
export class GatePassConfirmationSectionComponent implements OnInit {
  @Input() public inputForm: FormGroup;
  @Input() public licenseDetails: FormGroup;
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
    this.inputForm = <FormGroup>this.controlContranier.control;
    this.licenseDetails = <FormGroup>this.controlContranier.control;
    this.vehicleDetails = <FormGroup>this.controlContranier.control;

    // this.inputForm.get('visitorDetails.zNationalityID');
  }

  ngOnInit(): void {}

  test() {
    // console.log(this.inputForm.value);
  }

  onSubmit() {
    const sendData: GatePassRequest = {
      requestsId: +this.inputForm.get("requestsId").value,
      usersId: +this.inputForm.get("usersId").value,
      vehicleId: +this.inputForm.get("vehicleDetails.vehicleId").value,
      zRequestsTypesId: ZRequestsTypeEnum.Vehicle,
    };
    // console.log(sendData);

    this.gatePassService
      .postRequest(sendData)
      .subscribe((data: ResponsePostRequest) => {
        // console.log(data);
        this.toastrService.success("Saved");
        this.onSubmitEmitter.emit(data);
      });
  }

  verfiyRequest() {
    const sendData: RequestVerify = {
      notes: this.inputForm.get("securitySide.notes").value,
      requestsId: this.inputForm.get("requestsId").value,
    };
    this.adminService.putRequestVerify(sendData).subscribe((data: any) => {
      this.toastrService.success("Saved");
      this.securityUpdate.emit();
      // this.wizard.goToNextStep();
    });
  }
  closeModal() {
    this.modal.close();
    // this.vehicleDetails.value
  }
}
