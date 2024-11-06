import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { HrmsInfo } from "src/app/shared/models/hrms/hrmsInfo";
import { GatePassService } from "src/app/shared/services/gatepass.service";

@Component({
  selector: "app-profile-view-modal",
  templateUrl: "./profile-view-modal.component.html",
  styleUrls: ["./profile-view-modal.component.scss"],
})
export class ProfileViewModalComponent implements OnInit {
  @Input() usersId: number;
  hrmsInfo: HrmsInfo;
  constructor(
    private modal: NgbActiveModal,
    private gatePassServices: GatePassService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getData();
    }, 1);
  }

  getData(): void {
    this.gatePassServices
      .getUserById(this.usersId)
      .subscribe((data: HrmsInfo) => {
        this.hrmsInfo = data;
      });
  }

  closeModal(): void {
    this.modal.close();
  }
}
